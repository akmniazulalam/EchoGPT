"use client";

import React, { useEffect, useRef } from "react";

export default function MobileScrollbar() {
  const thumbRef = useRef<HTMLDivElement>(null);

  const isDraggingRef = useRef(false);
  const dragStartYRef = useRef(0);
  const dragStartScrollTopRef = useRef(0);

  const metricsRef = useRef({
    clientHeight: 0,
    scrollHeight: 0,
    maxScroll: 0,
    thumbHeight: 0,
    maxThumbTop: 0,
  });

  useEffect(() => {
    const container = document.getElementById(
      "landing-scroll-container"
    );

    const thumb = thumbRef.current;

    if (!container || !thumb) return;

    const updateMetrics = () => {
      const clientHeight = container.clientHeight;
      const scrollHeight = container.scrollHeight;
      const maxScroll = scrollHeight - clientHeight;

      if (maxScroll <= 0) {
        thumb.style.display = "none";

        metricsRef.current = {
          clientHeight,
          scrollHeight,
          maxScroll: 0,
          thumbHeight: 0,
          maxThumbTop: 0,
        };

        return;
      }

      thumb.style.display = "block";

      const calculatedHeight =
        (clientHeight / scrollHeight) * clientHeight;

      const minThumbHeight = 45;

      const thumbHeight = Math.min(
        clientHeight,
        Math.max(calculatedHeight, minThumbHeight)
      );

      const maxThumbTop =
        clientHeight - thumbHeight;

      metricsRef.current = {
        clientHeight,
        scrollHeight,
        maxScroll,
        thumbHeight,
        maxThumbTop,
      };

      thumb.style.height = `${thumbHeight}px`;

      updateThumbPosition();
    };

    const updateThumbPosition = () => {
      const {
        maxScroll,
        maxThumbTop,
      } = metricsRef.current;

      if (maxScroll <= 0 || maxThumbTop <= 0) {
        return;
      }

      const scrollProgress =
        container.scrollTop / maxScroll;

      const thumbTop =
        maxThumbTop * scrollProgress;

      thumb.style.transform = `translate3d(0, ${thumbTop}px, 0)`;
    };

    const handlePointerDown = (
      event: PointerEvent
    ) => {
      isDraggingRef.current = true;

      dragStartYRef.current = event.clientY;
      dragStartScrollTopRef.current =
        container.scrollTop;

      thumb.setPointerCapture(event.pointerId);

      thumb.style.cursor = "grabbing";
    };

    const handlePointerMove = (
      event: PointerEvent
    ) => {
      if (!isDraggingRef.current) return;

      const {
        maxScroll,
        maxThumbTop,
      } = metricsRef.current;

      if (maxScroll <= 0 || maxThumbTop <= 0) {
        return;
      }

      const deltaY =
        event.clientY - dragStartYRef.current;

      const scrollRatio =
        maxScroll / maxThumbTop;

      container.scrollTop =
        dragStartScrollTopRef.current +
        deltaY * scrollRatio;
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
      thumb.style.cursor = "grab";
    };

    updateMetrics();

    container.addEventListener(
      "scroll",
      updateThumbPosition,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "resize",
      updateMetrics
    );

    const resizeObserver =
      new ResizeObserver(updateMetrics);

    resizeObserver.observe(container);

    thumb.addEventListener(
      "pointerdown",
      handlePointerDown
    );

    thumb.addEventListener(
      "pointermove",
      handlePointerMove
    );

    thumb.addEventListener(
      "pointerup",
      handlePointerUp
    );

    thumb.addEventListener(
      "pointercancel",
      handlePointerUp
    );

    return () => {
      container.removeEventListener(
        "scroll",
        updateThumbPosition
      );

      window.removeEventListener(
        "resize",
        updateMetrics
      );

      resizeObserver.disconnect();

      thumb.removeEventListener(
        "pointerdown",
        handlePointerDown
      );

      thumb.removeEventListener(
        "pointermove",
        handlePointerMove
      );

      thumb.removeEventListener(
        "pointerup",
        handlePointerUp
      );

      thumb.removeEventListener(
        "pointercancel",
        handlePointerUp
      );
    };
  }, []);

  return (
    <div
      className="custom-page-scrollbar"
      aria-hidden="true"
    >
      <div
        ref={thumbRef}
        className="custom-page-scrollbar-thumb"
      />
    </div>
  );
}