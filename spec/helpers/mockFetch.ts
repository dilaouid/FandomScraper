export type MockRoute = {
    body: string | Uint8Array;
    status?: number;
    contentType?: string;
};

export type MockRouteInput = string | MockRoute;

function normalizeRoute(route: MockRouteInput): MockRoute {
    if (typeof route === 'string') {
        return {
            body: route,
            status: 200,
            contentType: 'text/html; charset=utf-8'
        };
    }

    return {
        status: 200,
        contentType: 'text/plain; charset=utf-8',
        ...route
    };
}

function toUint8Array(body: string | Uint8Array): Uint8Array {
    if (typeof body === 'string') {
        return new TextEncoder().encode(body);
    }

    return body;
}

function toArrayBuffer(bytes: Uint8Array): ArrayBuffer {
    return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
}

function getRequestUrl(input: RequestInfo | URL): string {
    if (typeof input === 'string') {
        return input;
    }

    if (input instanceof URL) {
        return input.toString();
    }

    return input.url;
}

function createResponse(route: MockRoute): Response {
    const bytes = toUint8Array(route.body);
    const textBody = typeof route.body === 'string'
        ? route.body
        : new TextDecoder().decode(route.body);
    const status = route.status ?? 200;

    return {
        ok: status >= 200 && status < 300,
        status,
        headers: new Headers(route.contentType ? { 'content-type': route.contentType } : {}),
        text: async () => textBody,
        arrayBuffer: async () => toArrayBuffer(bytes)
    } as Response;
}

export function installMockFetch(routes: Record<string, MockRouteInput>): () => void {
    const originalFetch = globalThis.fetch;
    const normalizedRoutes = new Map<string, MockRoute>(
        Object.entries(routes).map(([url, route]) => [url, normalizeRoute(route)])
    );

    const fetchMock = jest.fn(async (input: RequestInfo | URL) => {
        const url = getRequestUrl(input);
        const route = normalizedRoutes.get(url);

        if (!route) {
            throw new Error(`Unexpected fetch URL: ${url}`);
        }

        return createResponse(route);
    }) as typeof fetch;

    globalThis.fetch = fetchMock;

    return () => {
        globalThis.fetch = originalFetch;
    };
}
