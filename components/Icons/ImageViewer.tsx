'use client'
import "./Icon.css"
import { CSSProperties } from "react";

type ImageViewerProps = {
   width?: string;
   height?: string;
   maxWidth?: string;
   objectFit?: CSSProperties["objectFit"];
   objectPosition?: CSSProperties["objectPosition"];
   borderRadius?: string;
   src: string;
}

export default function ImageViewer ({ width, maxWidth, height, objectFit, objectPosition, borderRadius, src }: ImageViewerProps) {
   return (
      <div className="image-viewer" style={{ width, maxWidth, height, borderRadius }}>
         <img src={src} alt="image" style={{ objectFit, objectPosition }} />
      </div>
   )
}
