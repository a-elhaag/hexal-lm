from __future__ import annotations

import asyncio
from collections.abc import AsyncIterator

from app.llm.base import Message
from app.sse.events import HEARTBEAT, SseEvent, format_event

__all__ = ["_TokenCarry", "_client_tokens", "_with_heartbeat"]

_HEARTBEAT_INTERVAL_SECONDS = 15.0


class _TokenCarry:
    """Sentinel passed from the token iterator to the main loop with final counts.

    Not emitted to the wire. Consumed by the Oracle handler after the stream ends.
    """

    __slots__ = ("cached_tokens", "total_tokens")

    def __init__(self, total_tokens: int | None, cached_tokens: int | None) -> None:
        self.total_tokens = total_tokens
        self.cached_tokens = cached_tokens


async def _client_tokens(
    client: object,
    messages: list[Message],
    whitelabel: str,
    collected: list[str],
) -> AsyncIterator[bytes | _TokenCarry]:
    total: int | None = None
    cached: int | None = None
    async for chunk in client.stream(messages):  # type: ignore[attr-defined]
        if chunk.delta:
            collected.append(chunk.delta)
            yield format_event(
                SseEvent("token", {"hex": whitelabel, "delta": chunk.delta})
            )
        if chunk.total_tokens is not None:
            total = chunk.total_tokens
        if chunk.cached_tokens is not None:
            cached = chunk.cached_tokens
    yield _TokenCarry(total_tokens=total, cached_tokens=cached)


async def _with_heartbeat(
    src: AsyncIterator[bytes | _TokenCarry],
) -> AsyncIterator[bytes | _TokenCarry]:
    """Yield from `src`, injecting a keep-alive comment every 15s of silence."""
    iterator = src.__aiter__()
    while True:
        get_next = asyncio.ensure_future(iterator.__anext__())
        try:
            while True:
                try:
                    item = await asyncio.wait_for(
                        asyncio.shield(get_next), timeout=_HEARTBEAT_INTERVAL_SECONDS
                    )
                except TimeoutError:
                    yield HEARTBEAT
                    continue
                yield item
                break
        except StopAsyncIteration:
            return
        finally:
            get_next.cancel()
