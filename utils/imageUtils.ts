/**
 * Convert an image from the given URL to a base64 string
 * Due to some issues about CORS, this method is sometimes necessary to print the image in your application
 * @param imageUrl - The URL of the image to convert
 * @returns The base64 string of the image
 * @throws An error if the image cannot be fetched or converted
 */
export async function convertImageToBase64(imageUrl: string): Promise<string> {
    try {
        const response = await fetch(imageUrl);
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const base64Image = buffer.toString('base64');
        return base64Image;
    } catch (error) {
        console.error('Error fetching or converting image:', error);
        throw error;
    }
}

