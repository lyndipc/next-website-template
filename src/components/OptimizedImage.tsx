"use client";

import React from "react";
import { ImageProps } from "next/image";
import { getImageUrl, handleImageError } from "@/lib/config/cdn";

interface OptimizedImageProps extends Omit<ImageProps, "src" | "onError"> {
  src: string;
  fallback?: boolean;
}

export default function OptimizedImage({
  src,
  fallback = true,
  width,
  height,
  alt,
  className,
  priority,
  ...props
}: OptimizedImageProps) {
  const imageUrl = getImageUrl(src);

  return (
    <img
      src={imageUrl}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={handleImageError}
      style={{
        maxWidth: "100%",
        height: "auto",
        ...props.style,
      }}
      loading={priority ? "eager" : "lazy"}
      {...(props as React.ImgHTMLAttributes<HTMLImageElement>)}
    />
  );
}
