import React, { useState } from 'react';

interface SafeImageProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  width?: string | number;
  height?: string | number;
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

const SafeImage: React.FC<SafeImageProps> = ({
  src,
  fallbackSrc = "/img/furniture.webp",
  alt,
  className,
  style,
  width,
  height,
  onError
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasErrored, setHasErrored] = useState(false);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!hasErrored && fallbackSrc !== currentSrc) {
      setCurrentSrc(fallbackSrc);
      setHasErrored(true);
    }
    onError?.(e);
  };

  // Ensure we're using the correct image path
  const getImageSrc = (imageSrc: string) => {
    // If it's already a full URL, use as is
    if (imageSrc.startsWith('http')) {
      return imageSrc;
    }
    // If it starts with /, it's a local path, use as is
    if (imageSrc.startsWith('/')) {
      return imageSrc;
    }
    // Otherwise, it's a relative path, use as is (will be served from public folder)
    return imageSrc;
  };

  return (
    <img
      src={getImageSrc(currentSrc)}
      alt={alt}
      className={className}
      style={style}
      width={width}
      height={height}
      onError={handleError}
    />
  );
};

export default SafeImage; 