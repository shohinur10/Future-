import { serverApi } from "../config";

/**
 * Gets a cache-busted image URL to ensure fresh images are loaded
 * @param imagePath - The image path from the server
 * @param timestamp - Optional timestamp for cache busting (uses current time if not provided)
 * @returns Cache-busted image URL
 */
export const getCacheBustedImageUrl = (imagePath: string, timestamp?: string | number): string => {
  if (!imagePath) return "/icons/default-user.svg";
  
  // If it's already a full URL (like data:// or http://), return as is
  if (imagePath.startsWith('data:') || imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // If it starts with /, it's a local path, use as is with cache busting
  if (imagePath.startsWith('/')) {
    const cacheBuster = timestamp || Date.now();
    return `${imagePath}?v=${cacheBuster}`;
  }
  
  // Use provided timestamp or current time for cache busting
  const cacheBuster = timestamp || Date.now();
  
  return `${serverApi}/${imagePath}?v=${cacheBuster}`;
};

/**
 * Gets a member avatar URL with cache busting based on member's update time
 * @param memberImage - The member's image path
 * @param updatedAt - The member's last update timestamp
 * @returns Cache-busted avatar URL
 */
export const getMemberAvatarUrl = (memberImage?: string, updatedAt?: string | Date): string => {
  if (!memberImage) return "/icons/default-user.svg";
  
  // Use member's update time for cache busting if available
  let timestamp: number;
  if (updatedAt) {
    timestamp = new Date(updatedAt).getTime();
  } else {
    timestamp = Date.now();
  }
  
  return getCacheBustedImageUrl(memberImage, timestamp);
};

/**
 * Forces a refresh of all images by clearing browser cache
 */
export const clearImageCache = (): void => {
  // Clear all cached images by forcing reload
  const images = document.querySelectorAll('img[src*="memberImage"], img[src*="member"]');
  images.forEach((img) => {
    const htmlImg = img as HTMLImageElement;
    const originalSrc = htmlImg.src;
    htmlImg.src = '';
    setTimeout(() => {
      htmlImg.src = originalSrc.includes('?v=') 
        ? originalSrc.replace(/\?v=\d+/, `?v=${Date.now()}`)
        : `${originalSrc}?v=${Date.now()}`;
    }, 10);
  });
}; 