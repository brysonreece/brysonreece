import { useState, useEffect, useCallback, RefObject } from 'react';

/**
 * This component includes portions of code adapted from https://github.com/kylan02/face_looker
 * Licensed under the MIT License.
 * Copyright (c) 2024 Kylan O'Connor (original), 2025 Bryson Reece (updated)
 */

// Grid configuration (must match your generation parameters)
const DEFAULT_P_MIN = -15;
const DEFAULT_P_MAX = 15;
const DEFAULT_STEP_SIZE = 3;

/**
 * Converts normalized coordinates [-1, 1] to grid coordinates.
 *
 * @param {number} val - Normalized coordinate in range [-1, 1]
 * @param {number} pMin - Minimum grid coordinate
 * @param {number} pMax - Maximum grid coordinate
 * @param {number} stepSize - Step size for quantization
 * @returns {number} Quantized grid coordinate
 */
function quantize(val: number, pMin: number, pMax: number, stepSize: number) {
  const raw = pMin + (val + 1) * (pMax - pMin) / 2; // [-1,1] -> [-15,15]
  const snapped = Math.round(raw / stepSize) * stepSize;
  return Math.max(pMin, Math.min(pMax, snapped));
}

/**
 * Converts grid coordinates to filename format
 */
function postionalFilename(posX: number, posY: number, imgSize: number) {
  const sanitize = (val: number) => val.toFixed(1).toString().replace('-', 'm').replace('.', 'p');
  return `gaze_px${sanitize(posX)}_py${sanitize(posY)}_${imgSize}.webp`;
}

export default function useGazeTracking(
    containerRef: RefObject<HTMLElement | null>,
    basePath: string = '/faces/',
    pMin: number = DEFAULT_P_MIN,
    pMax: number = DEFAULT_P_MAX,
    stepSize: number = DEFAULT_STEP_SIZE,
    imgSize: number = 256,
) {
  const [currentImage, setCurrentImage] = useState('');

  const updateGaze = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) {
        const centerX = quantize(0, pMin, pMax, stepSize);
        const centerY = quantize(0, pMin, pMax, stepSize);
        const centerFilename = postionalFilename(centerX, centerY, imgSize);

        setCurrentImage(`${basePath}/${centerFilename}`);
        return;
    }

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Convert to normalized coordinates [-1, 1]
    const nx = (clientX - centerX) / (rect.width / 2);
    const ny = (clientY - centerY) / (rect.height / 2);

    // Clamp to [-1, 1] range
    const clampedX = Math.max(-1, Math.min(1, nx));
    const clampedY = Math.max(-1, Math.min(1, ny));

    // Convert to grid coordinates
    const px = quantize(clampedX, pMin, pMax, stepSize);
    const py = quantize(-clampedY, pMin, pMax, stepSize);

    // Set the current image based on quantized coordinates
    const filename = postionalFilename(px, py, imgSize);

    setCurrentImage(`${basePath}/${filename}`);
  }, [containerRef, basePath, pMax, pMin, stepSize, imgSize]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    updateGaze(e.clientX, e.clientY);
  }, [updateGaze]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      updateGaze(touch.clientX, touch.clientY);
    }
  }, [updateGaze]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    // Add event listeners
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Set initial center gaze
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    updateGaze(centerX, centerY);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('touchmove', handleTouchMove);
    };
  }, [containerRef, handleMouseMove, handleTouchMove, updateGaze]);

  return currentImage;
};
