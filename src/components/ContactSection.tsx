"use client";

import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  category: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  category?: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Category validation
    if (!formData.category) {
      newErrors.category = "Please select an inquiry type";
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = "Subject must be at least 5 characters";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        category: "",
      });

      // Track successful form submission
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (typeof window !== "undefined" && (window as any).umami) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).umami.track("contact-form-submit", {
          subject: formData.subject,
        });
      }
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Failed to send message",
      );
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <section id="contact" className="contact-section">
        <div className="container">
          <div className="contact-success">
            <div className="success-icon" aria-hidden="true">
              ✓
            </div>
            <h2>Message Sent Successfully!</h2>
            <p>
              Thank you for contacting us. We&apos;ve received your message and
              will get back to you within 24 hours.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="secondary-button"
            >
              Send Another Message
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="contact-header fade-in">
          <h2>Get in Touch</h2>
          <p>
            Have a question or need support? We&apos;re here to help! Send us a
            message and we&apos;ll get back to you as soon as possible.
          </p>
        </div>

        <div className="contact-content">
          {/*<div className="contact-visual fade-in"></div>*/}
          <div className="contact-form-section fade-in">
            <h3>Send a Message</h3>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={errors.name ? "error" : ""}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  disabled={loading}
                />
                {errors.name && (
                  <span id="name-error" className="error-message" role="alert">
                    {errors.name}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={errors.email ? "error" : ""}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  disabled={loading}
                />
                {errors.email && (
                  <span id="email-error" className="error-message" role="alert">
                    {errors.email}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="category">Inquiry Type *</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={errors.category ? "error" : ""}
                  aria-describedby={
                    errors.category ? "category-error" : undefined
                  }
                  disabled={loading}
                >
                  <option value="">Please select an inquiry type</option>
                  <option value="General Support">General Support</option>
                  <option value="Technical Issue">Technical Issue</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="Privacy Question">Privacy Question</option>
                  <option value="Billing">Billing</option>
                  <option value="Bug Report">Bug Report</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Other">Other</option>
                </select>
                {errors.category && (
                  <span
                    id="category-error"
                    className="error-message"
                    role="alert"
                  >
                    {errors.category}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={errors.subject ? "error" : ""}
                  aria-describedby={
                    errors.subject ? "subject-error" : undefined
                  }
                  disabled={loading}
                  placeholder="Brief description of your inquiry"
                />
                {errors.subject && (
                  <span
                    id="subject-error"
                    className="error-message"
                    role="alert"
                  >
                    {errors.subject}
                  </span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className={errors.message ? "error" : ""}
                  aria-describedby={
                    errors.message ? "message-error" : undefined
                  }
                  disabled={loading}
                  placeholder="Please provide details about your question or issue..."
                />
                {errors.message && (
                  <span
                    id="message-error"
                    className="error-message"
                    role="alert"
                  >
                    {errors.message}
                  </span>
                )}
              </div>

              {submitError && (
                <div className="submit-error" role="alert">
                  {submitError}
                </div>
              )}

              <button
                type="submit"
                className="cta-button"
                disabled={loading}
                aria-describedby={loading ? "loading-status" : undefined}
              >
                {loading ? (
                  <>
                    <span className="loading-spinner" aria-hidden="true"></span>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>

              {loading && (
                <div id="loading-status" className="sr-only" aria-live="polite">
                  Sending your message, please wait...
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
