import { forwardRef, MouseEventHandler, RefObject, useRef, useState } from 'react';
import useGazeTracking from '@/hooks/use-gaze-tracking';

/**
 * This component includes portions of code adapted from https://github.com/kylan02/face_looker
 * Licensed under the MIT License.
 * Copyright (c) 2024 Kylan O'Connor (original), 2025 Bryson Reece (updated)
 */

type GazeTrackerProps = {
    className?: string;
    basePath?: string;
    showDebug?: boolean;
    pMin?: number;
    pMax?: number;
    stepSize?: number;
    imgSize?: number;
    containerRef?: RefObject<HTMLDivElement | null>;
};

export const GazeTracker = forwardRef<HTMLDivElement, GazeTrackerProps>(({
  className,
  basePath = '/faces/',
  showDebug = false,
  pMin,
  pMax,
  stepSize,
  imgSize,
  containerRef: externalRef,
}, forwardedRef) => {
  const internalRef = useRef<HTMLDivElement>(null);
  const containerRef = externalRef || (forwardedRef as RefObject<HTMLDivElement>) || internalRef;
  const currentImage = useGazeTracking(containerRef, basePath, pMin, pMax, stepSize, imgSize);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (event) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    });
  };

  return (
    <div
      ref={containerRef}
      className={`gaze-tracker ${className}`}
      onMouseMove={handleMouseMove}
    >
      {currentImage && (
        <img
          src={currentImage}
          alt="Cosmo, our goldendoodle, tracking your input position"
          className="face-image"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            transition: 'opacity 0.1s ease-out'
          }}
        />
      )}

      {showDebug && (
        <div className="face-debug">
          <div>Mouse: ({Math.round(mousePos.x)}, {Math.round(mousePos.y)})</div>
          <div>Image: {currentImage?.split('/').pop()}</div>
        </div>
      )}
    </div>
  );
});
