"use client";

import { useState } from "react";
import { FAQ_DATA, FAQ_CATEGORIES, type FAQ } from "@/data/faq";

interface FAQItemProps {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
}

function FAQItem({ faq, isOpen, onToggle }: FAQItemProps) {
  return (
    <div className="faq-item">
      <button
        className="faq-question"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.id}`}
      >
        <span>{faq.question}</span>
        <span className={`faq-icon ${isOpen ? "open" : ""}`} aria-hidden="true">
          {isOpen ? "−" : "+"}
        </span>
      </button>
      <div
        id={`faq-answer-${faq.id}`}
        className={`faq-answer ${isOpen ? "open" : ""}`}
        aria-hidden={!isOpen}
      >
        <div className="faq-answer-content">
          <p>{faq.answer}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const [selectedCategory, setSelectedCategory] = useState("General");
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Filter and sort FAQs
  const filteredFAQs = FAQ_DATA.filter(
    (faq) => selectedCategory === "all" || faq.category === selectedCategory,
  ).sort((a, b) => a.order - b.order);

  return (
    <section id="faq" className="faq-section">
      <div className="container">
        <h2 className="fade-in">Frequently Asked Questions</h2>
        <p className="faq-subtitle fade-in">
          Find answers to common questions about Fake Company.
        </p>

        {/* Category Filter */}
        <div className="faq-categories fade-in">
          {FAQ_CATEGORIES.map((category) => (
            <button
              key={category.id}
              className={`faq-category-btn ${selectedCategory === category.id ? "active" : ""}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* FAQ Content */}
        <div className="faq-content fade-in">
          {filteredFAQs.length === 0 ? (
            <div className="faq-empty">
              <p>No FAQs found for this category.</p>
            </div>
          ) : (
            <div className="faq-list">
              {filteredFAQs.map((faq) => (
                <FAQItem
                  key={faq.id}
                  faq={faq}
                  isOpen={openItems.has(faq.id)}
                  onToggle={() => toggleItem(faq.id)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="faq-contact fade-in">
          <p>Can&apos;t find what you&apos;re looking for?</p>
          <a href="#contact" className="cta-button">
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
}
