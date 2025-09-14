// FAQ system for your website template
// Customize the questions and categories below for your specific use case

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

export const FAQ_DATA: FAQ[] = [
  // Getting Started Category
  {
    id: "what-is-this",
    question: "What exactly is your product/service?",
    answer:
      "Our product is a comprehensive solution that helps businesses achieve their goals more efficiently. We provide tools, resources, and support to streamline your workflow and improve outcomes.",
    category: "Getting Started",
    order: 1,
  },
  {
    id: "how-to-get-started",
    question: "How do I get started?",
    answer:
      "Getting started is easy! Simply sign up for a free account, complete our quick onboarding process, and you'll be up and running in minutes. Our team is also available to help with setup if needed.",
    category: "Getting Started",
    order: 2,
  },
  {
    id: "who-is-this-for",
    question: "Who is this solution designed for?",
    answer:
      "Our solution is perfect for small to medium businesses, entrepreneurs, and teams looking to improve their efficiency and results. Whether you're just starting out or looking to scale, we have options that fit your needs.",
    category: "Getting Started",
    order: 3,
  },
  {
    id: "time-to-see-results",
    question: "How long does it take to see results?",
    answer:
      "Most customers start seeing improvements within the first week of implementation. Full benefits typically become apparent within 30 days as you and your team become familiar with all the features.",
    category: "Getting Started",
    order: 4,
  },

  // Features Category
  {
    id: "key-features",
    question: "What are the main features included?",
    answer:
      "Our platform includes dashboard analytics, automated workflows, team collaboration tools, reporting features, mobile access, and 24/7 customer support. All features are included in every plan.",
    category: "Features",
    order: 1,
  },
  {
    id: "mobile-access",
    question: "Can I access this on my mobile device?",
    answer:
      "Yes! Our platform is fully responsive and works perfectly on all devices. We also offer native mobile apps for iOS and Android for the best mobile experience.",
    category: "Features",
    order: 2,
  },
  {
    id: "integrations",
    question: "Does it integrate with other tools I'm already using?",
    answer:
      "Absolutely! We integrate with over 100 popular business tools including CRM systems, email platforms, accounting software, and project management tools. Check our integrations page for the full list.",
    category: "Features",
    order: 3,
  },
  {
    id: "customization",
    question: "How customizable is the platform?",
    answer:
      "Very customizable! You can personalize dashboards, create custom workflows, set up automated rules, and even white-label the interface for your brand. Our team can help with advanced customizations.",
    category: "Features",
    order: 4,
  },

  // Pricing Category
  {
    id: "pricing-plans",
    question: "What pricing plans do you offer?",
    answer:
      "We offer flexible pricing starting with a free plan for small teams, plus affordable paid plans that scale with your business. All plans include core features with additional advanced tools in higher tiers.",
    category: "Pricing",
    order: 1,
  },
  {
    id: "free-trial",
    question: "Is there a free trial available?",
    answer:
      "Yes! We offer a 14-day free trial of our premium features with no credit card required. You can also use our free plan indefinitely with basic features for small teams.",
    category: "Pricing",
    order: 2,
  },
  {
    id: "cancel-anytime",
    question: "Can I cancel my subscription at any time?",
    answer:
      "Of course! You can cancel your subscription at any time with no cancellation fees. Your access will continue until the end of your current billing period, and you can always reactivate later.",
    category: "Pricing",
    order: 3,
  },
  {
    id: "refund-policy",
    question: "What is your refund policy?",
    answer:
      "We offer a 30-day money-back guarantee on all paid plans. If you're not completely satisfied within your first 30 days, we'll provide a full refund, no questions asked.",
    category: "Pricing",
    order: 4,
  },
  {
    id: "enterprise-pricing",
    question: "Do you offer enterprise pricing?",
    answer:
      "Yes! We have special enterprise plans for larger organizations with custom pricing, dedicated support, advanced security features, and on-premise deployment options. Contact our sales team for details.",
    category: "Pricing",
    order: 5,
  },

  // Technical Support Category
  {
    id: "customer-support",
    question: "What kind of customer support do you provide?",
    answer:
      "We provide 24/7 customer support through live chat, email, and phone. We also have extensive documentation, video tutorials, and a community forum where you can get help from other users.",
    category: "Support",
    order: 1,
  },
  {
    id: "technical-requirements",
    question: "What are the technical requirements?",
    answer:
      "Our platform works with any modern web browser (Chrome, Firefox, Safari, Edge). No software installation is required. For mobile apps, we support iOS 12+ and Android 8+.",
    category: "Support",
    order: 2,
  },
  {
    id: "data-backup",
    question: "How is my data backed up and protected?",
    answer:
      "Your data is automatically backed up daily to multiple secure locations. We use enterprise-grade encryption, regular security audits, and comply with GDPR and SOC 2 standards to protect your information.",
    category: "Support",
    order: 3,
  },
  {
    id: "downtime-sla",
    question: "What is your uptime guarantee?",
    answer:
      "We maintain 99.9% uptime with our robust infrastructure and monitoring systems. In the rare event of downtime, we provide real-time status updates and work quickly to resolve any issues.",
    category: "Support",
    order: 4,
  },
  {
    id: "training-available",
    question: "Do you provide training for new users?",
    answer:
      "Yes! We offer free onboarding sessions, comprehensive documentation, video tutorials, and webinar training sessions. Premium plans include one-on-one training sessions with our experts.",
    category: "Support",
    order: 5,
  },

  // Account & Security Category
  {
    id: "data-security",
    question: "How secure is my data?",
    answer:
      "Security is our top priority. We use bank-level encryption (AES-256), two-factor authentication, role-based access controls, and regular security audits. Your data is stored in SOC 2 compliant data centers.",
    category: "Security",
    order: 1,
  },
  {
    id: "team-access",
    question: "Can I give access to my team members?",
    answer:
      "Absolutely! You can invite unlimited team members and set different permission levels for each person. Admins have full access while other roles can be customized based on what each team member needs to do.",
    category: "Security",
    order: 2,
  },
  {
    id: "data-export",
    question: "Can I export my data if I need to leave?",
    answer:
      "Yes, you own your data and can export it at any time in standard formats (CSV, JSON, PDF). We believe in data portability and will never hold your information hostage.",
    category: "Security",
    order: 3,
  },
  {
    id: "compliance",
    question: "Are you compliant with data protection regulations?",
    answer:
      "Yes, we're fully compliant with GDPR, CCPA, SOC 2, and other major data protection regulations. We provide data processing agreements and can help you meet your own compliance requirements.",
    category: "Security",
    order: 4,
  },
];

export const FAQ_CATEGORIES = [
  { id: "all", label: "All Questions" },
  { id: "Getting Started", label: "Getting Started" },
  { id: "Features", label: "Features" },
  { id: "Pricing", label: "Pricing" },
  { id: "Support", label: "Support" },
  { id: "Security", label: "Security" },
] as const;

// Helper function to get FAQs by category
export function getFAQsByCategory(category: string): FAQ[] {
  if (category === "all") {
    return FAQ_DATA.sort((a, b) => a.order - b.order);
  }
  return FAQ_DATA.filter((faq) => faq.category === category).sort(
    (a, b) => a.order - b.order,
  );
}

// Helper function to get all categories with counts
export function getCategoriesWithCounts() {
  return FAQ_CATEGORIES.map((category) => ({
    ...category,
    count:
      category.id === "all"
        ? FAQ_DATA.length
        : FAQ_DATA.filter((faq) => faq.category === category.id).length,
  }));
}
