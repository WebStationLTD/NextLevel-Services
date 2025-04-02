"use client";

import { useEffect, useRef } from "react";

/**
 * Компонент, който следи кога LCP изображението влиза във viewport
 * и ще маркира, че е заредено успешно
 */
export default function LazyImageObserver() {
  const observerRef = useRef(null);
  const lcpImageLoadedRef = useRef(false);

  useEffect(() => {
    // Функция за докладване на LCP метрика
    const reportLCP = (targetElement) => {
      if (lcpImageLoadedRef.current) return; // Предотвратяваме повторно докладване

      lcpImageLoadedRef.current = true;

      if (window.performance && window.performance.mark) {
        window.performance.mark("lcp-detected");
      }

      // Маркираме атрибут на изображението, че е заредено
      if (targetElement) {
        targetElement.setAttribute("data-lcp-loaded", "true");
      }

      console.log("LCP изображението е заредено успешно!");
    };

    // Използваме Intersection Observer API за да проверим кога изображението е видимо
    const initIntersectionObserver = () => {
      // Търсим LCP изображенията според viewport размера
      const isMobile = window.innerWidth <= 640;
      const targetSelector = isMobile
        ? 'img[src="/lawyer-mobile-lcp.webp"]'
        : 'img[src="/lawyer-desktop-lcp.webp"]';

      const targetImage = document.querySelector(targetSelector);

      if (targetImage && "IntersectionObserver" in window) {
        observerRef.current = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                reportLCP(entry.target);
                // Изчистваме observer-а след като изображението е заредено
                if (observerRef.current) {
                  observerRef.current.disconnect();
                  observerRef.current = null;
                }
              }
            });
          },
          {
            root: null,
            threshold: 0.1, // 10% от изображението да бъде видимо
            rootMargin: "0px 0px 0px 0px",
          }
        );

        observerRef.current.observe(targetImage);

        // Проверяваме и за случая, когато изображението вече е заредено
        if (targetImage.complete) {
          reportLCP(targetImage);
        } else {
          // Добавяме и onload handler за директно изображение
          targetImage.onload = () => reportLCP(targetImage);
        }
      }
    };

    // Изчакваме малко, за да сме сигурни, че DOM е зареден
    const timer = setTimeout(() => {
      initIntersectionObserver();
    }, 50);

    // Cleanup при unmount
    return () => {
      clearTimeout(timer);
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, []);

  // Този компонент не рендерира нищо
  return null;
}
