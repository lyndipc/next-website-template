import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-content">
          <div className="legal-links">
            <p>
              <Link href="https://fakecompany.com/#contact">Contact</Link>
              {" | "}
              <Link href="/privacy-policy">Privacy Policy</Link>
              {" | "}
              <Link href="/terms-of-service">Terms of Service</Link>
            </p>
            <p>&copy; 2025 Fake Company, LLC. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
