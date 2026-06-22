const CLOUD_NAME = "df2qs2fi4";

/**
 * Generates an optimized Cloudinary image URL.
 * @param publicId  — the name/path of the image in your Cloudinary Media Library
 * @param w         — desired width in pixels
 * @param h         — desired height in pixels
 *
 * Cloudinary handles format (WebP/AVIF), compression, and CDN delivery automatically.
 *
 * Example:
 *   img("travel/lisbon-tram", 800, 533)
 *   → https://res.cloudinary.com/df2qs2fi4/image/upload/w_800,h_533,c_fill,f_auto,q_auto/travel/lisbon-tram
 */
export function img(publicId: string, w: number, h: number): string {
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/w_${w},h_${h},c_fill,f_auto,q_auto/${publicId}`;
}
