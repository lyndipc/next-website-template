"use client";

import { useEffect } from "react";

export default function PrivacyClientScripts() {
  useEffect(() => {
    // Smooth scroll for anchor links
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
          });

          if (history.pushState) {
            history.pushState(null, "", `#${targetId}`);
          }
        }
      });
    });

    // Highlight current section in TOC
    const updateTOC = () => {
      const sections = document.querySelectorAll("h2[id]");
      const tocLinks = document.querySelectorAll(".toc a");

      let currentSection = "";

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 100) {
          currentSection = section.id;
        }
      });

      tocLinks.forEach((link) => {
        const href = (link as HTMLAnchorElement)
          .getAttribute("href")
          ?.substring(1);
        if (href === currentSection) {
          (link as HTMLElement).style.color = "var(--primary-color)";
          (link as HTMLElement).style.fontWeight = "bold";
        } else {
          (link as HTMLElement).style.color = "var(--text-gray)";
          (link as HTMLElement).style.fontWeight = "normal";
        }
      });
    };

    window.addEventListener("scroll", updateTOC);
    updateTOC();

    return () => {
      window.removeEventListener("scroll", updateTOC);
    };
  }, []);

  return null;
}
