"use client";

import { useEffect, useState } from "react";

interface ScrollbarState {
  height: number;
  top: number;
}

export default function MobileScrollbar() {
  const [scrollbar, setScrollbar] =
    useState<ScrollbarState>({
      height: 0,
      top: 0,
    });

  useEffect(() => {
    const container = document.getElementById(
      "landing-scroll-container"
    );

    if (!container) return;

    const updateScrollbar = () => {
      const {
        scrollTop,
        scrollHeight,
        clientHeight,
      } = container;

      const maxScroll =
        scrollHeight - clientHeight;

      // No scrolling available
      if (maxScroll <= 0) {
        setScrollbar({
          height: 0,
          top: 0,
        });
        return;
      }

      /*
       * Thumb height is proportional to:
       * visible area / total content
       */
      const calculatedHeight =
        (clientHeight / scrollHeight) *
        clientHeight;

      /*
       * Prevent the thumb from becoming
       * too small on long pages.
       */
      const minThumbHeight = 45;

      const thumbHeight = Math.min(
        clientHeight,
        Math.max(
          calculatedHeight,
          minThumbHeight
        )
      );

      /*
       * Scroll progress:
       * 0 = top
       * 1 = bottom
       */
      const scrollProgress =
        scrollTop / maxScroll;

      /*
       * Maximum distance the thumb
       * can travel.
       */
      const maxThumbTop =
        clientHeight - thumbHeight;

      const thumbTop =
        maxThumbTop * scrollProgress;

      setScrollbar({
        height: thumbHeight,
        top: thumbTop,
      });
    };

    // Initial calculation
    updateScrollbar();

    // Update while scrolling
    container.addEventListener(
      "scroll",
      updateScrollbar,
      {
        passive: true,
      }
    );

    // Update when viewport changes
    window.addEventListener(
      "resize",
      updateScrollbar
    );

    /*
     * Detect changes in content height.
     * Useful for images, accordions, dynamic sections, etc.
     */
    const resizeObserver =
      new ResizeObserver(updateScrollbar);

    resizeObserver.observe(container);

    return () => {
      container.removeEventListener(
        "scroll",
        updateScrollbar
      );

      window.removeEventListener(
        "resize",
        updateScrollbar
      );

      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      className="custom-page-scrollbar"
      aria-hidden="true"
    >
      {scrollbar.height > 0 && (
        <div
          className="custom-page-scrollbar-thumb"
          style={{
            height: `${scrollbar.height}px`,
            transform: `translate3d(0, ${scrollbar.top}px, 0)`,
          }}
        />
      )}
    </div>
  );
}