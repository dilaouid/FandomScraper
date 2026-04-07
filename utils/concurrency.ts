/**
 * Concurrent map with a fixed-size worker pool.
 *
 * Processes `items` by calling `fn` on each, but runs at most `concurrency`
 * calls in flight at any given time. Results are returned in the original order.
 *
 * Use this instead of `Promise.all` when the list is large and every call
 * involves a network request — it prevents saturating the remote API.
 *
 * @param items       - Input array
 * @param fn          - Async function to apply to each item
 * @param concurrency - Maximum parallel inflight calls (must be >= 1)
 * @returns Array of results in the same order as `items`
 */
export async function pMap<T, R>(
    items: T[],
    fn: (item: T, index: number) => Promise<R>,
    concurrency: number
): Promise<R[]> {
    if (items.length === 0) return [];
    const limit = Math.max(1, concurrency);
    const results: R[] = new Array(items.length);
    const queue = items.map((item, index) => ({ item, index }));

    async function worker(): Promise<void> {
        while (queue.length > 0) {
            const task = queue.shift();
            if (!task) break;
            results[task.index] = await fn(task.item, task.index);
        }
    }

    const workers = Array.from({ length: Math.min(limit, items.length) }, () => worker());
    await Promise.all(workers);
    return results;
}
