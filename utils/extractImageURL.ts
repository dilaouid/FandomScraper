export function extractImageURL(url: string): string {
    const regex = /^(https?:\/\/.*\.(?:png|jpe?g|gif|bmp|svg|webp|tiff?))(?=[\/?]|$)/i;
    const match = url.match(regex);
    return match ? match[1] : url;
}
