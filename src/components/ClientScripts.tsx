"use client";

import { useEffect } from "react";

// Type definition for the umami analytics object
interface UmamiWindow extends Window {
  umami?: {
    track: (event: string, data?: Record<string, string | number>) => void;
  };
}

declare const window: UmamiWindow;

export default function ClientScripts() {
  useEffect(() => {
    const initializeAnimations = () => {
      // Smooth scrolling for anchor links
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", (e) => {
          e.preventDefault();
          const targetId = (anchor as HTMLAnchorElement)
            .getAttribute("href")
            ?.substring(1);
          const targetElement = targetId
            ? document.getElementById(targetId)
            : null;

          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: "smooth",
              block: "start",
              inline: "nearest",
            });

            if (history.pushState) {
              history.pushState(null, "", `#${targetId}`);
            }

            targetElement.focus({ preventScroll: true });
          }
        });
      });

      // Intersection Observer for fade-in animations
      const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      };

      const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Use requestAnimationFrame for smoother animations
            requestAnimationFrame(() => {
              entry.target.classList.add("visible");
            });
            // Stop observing once the element is visible
            fadeInObserver.unobserve(entry.target);
          }
        });
      }, observerOptions);

      // Observe all elements with fade-in class
      const elementsToAnimate = document.querySelectorAll(".fade-in");
      elementsToAnimate.forEach((el) => {
        fadeInObserver.observe(el);
      });

      // Enhanced feature card interactions with better performance
      document.querySelectorAll(".feature-card").forEach((card) => {
        let isHovered = false;
        let rafId: number | null = null;

        const handleMouseEnter = () => {
          if (!isHovered) {
            isHovered = true;
            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
              (card as HTMLElement).style.transform =
                "translateY(-10px) scale(1.02)";
            });
          }
        };

        const handleMouseLeave = () => {
          if (isHovered) {
            isHovered = false;
            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
              (card as HTMLElement).style.transform = "translateY(0) scale(1)";
            });
          }
        };

        card.addEventListener("mouseenter", handleMouseEnter);
        card.addEventListener("mouseleave", handleMouseLeave);
        card.addEventListener("touchstart", handleMouseEnter, {
          passive: true,
        });
        card.addEventListener("touchend", handleMouseLeave, {
          passive: true,
        });

        // Cleanup function for RAF
        return () => {
          if (rafId) cancelAnimationFrame(rafId);
        };
      });

      // Analytics tracking
      const trackDownload = (browser: string) => {
        if (window.umami) {
          window.umami.track("download-click", { browser });
        }
        console.log(`Download clicked: ${browser}`);
      };

      document.querySelectorAll("[data-browser]").forEach((button) => {
        button.addEventListener("click", () => {
          const browser = (button as HTMLElement).dataset.browser;
          if (browser) trackDownload(browser);
        });
      });

      // Keyboard navigation improvements
      document.addEventListener("keydown", function (e) {
        if (e.altKey && e.key.toLowerCase() === "s") {
          e.preventDefault();
          const main = document.querySelector("main");
          if (main) {
            main.focus();
            main.scrollIntoView({ behavior: "smooth" });
          }
        }
      });

      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        // If user prefers reduced motion, make all fade-in elements visible immediately
        document.querySelectorAll(".fade-in").forEach((el) => {
          el.classList.add("visible");
        });
      }
    };

    // Wait for DOM to be ready and then initialize
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initializeAnimations);
    } else {
      // DOM is already loaded
      initializeAnimations();
    }

    // Cleanup function
    return () => {
      document.removeEventListener("DOMContentLoaded", initializeAnimations);
    };
  }, []);

  return null; // This component only handles side effects
}
