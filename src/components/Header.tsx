"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { SITE_CONFIG } from "@/config/site";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Close menu when clicking outside or pressing escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const nav = document.querySelector(".mobile-nav");
      const hamburger = document.querySelector(".hamburger-button");

      if (
        nav &&
        hamburger &&
        !nav.contains(target) &&
        !hamburger.contains(target)
      ) {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("click", handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("click", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  return (
    <header className="header">
      <nav className="container">
        <Link href="/" className="logo" aria-label={`${SITE_CONFIG.name} Home`}>
          <span aria-hidden="true">🚀</span>
          {SITE_CONFIG.name}
        </Link>

        {/* Desktop Navigation */}
        <ul
          className="desktop-nav"
          role="navigation"
          aria-label="Main navigation"
        >
          {SITE_CONFIG.navigation.map((item, index) => (
            <li key={index}>
              <Link href={item.href}>{item.text}</Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA Button */}
        <Link
          href={SITE_CONFIG.cta.primary.href}
          className="cta-button desktop-cta"
          aria-label={SITE_CONFIG.cta.primary.text}
        >
          {SITE_CONFIG.cta.primary.text}
        </Link>

        {/* Hamburger Button */}
        <button
          className="hamburger-button"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
        >
          <span className={`hamburger-line ${isMenuOpen ? "open" : ""}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? "open" : ""}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? "open" : ""}`}></span>
        </button>

        {/* Mobile Navigation Overlay */}
        <div
          className={`mobile-nav-overlay ${isMenuOpen ? "open" : ""}`}
          aria-hidden={!isMenuOpen}
        >
          <nav
            className="mobile-nav"
            id="mobile-menu"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <ul className="mobile-nav-links">
              {SITE_CONFIG.navigation.map((item, index) => (
                <li key={index}>
                  <Link href={item.href} onClick={closeMenu}>
                    {item.text}
                  </Link>
                </li>
              ))}
              <li className="mobile-cta-wrapper">
                <Link
                  href={SITE_CONFIG.cta.primary.href}
                  className="cta-button mobile-cta"
                  onClick={closeMenu}
                  aria-label={SITE_CONFIG.cta.primary.text}
                >
                  {SITE_CONFIG.cta.primary.text}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </nav>
    </header>
  );
}
