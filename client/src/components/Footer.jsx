import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-unique">
      <div className="footer-unique-container">
        <div className="footer-unique-section footer-unique-brand">
          <h3 className="footer-unique-logo">UniversityBuzz</h3>
          <p className="footer-unique-description">
            Connecting campus communities since 2023
          </p>
        </div>

        <div className="footer-unique-section">
          <h4 className="footer-unique-title">Resources</h4>
          <ul className="footer-unique-list">
            <li><a href="/help" className="footer-unique-link">Help Center</a></li>
            <li><a href="/docs" className="footer-unique-link">Documentation</a></li>
            <li><a href="/guides" className="footer-unique-link">Guides</a></li>
          </ul>
        </div>

        <div className="footer-unique-section">
          <h4 className="footer-unique-title">Legal</h4>
          <ul className="footer-unique-list">
            <li><a href="/privacy" className="footer-unique-link">Privacy</a></li>
            <li><a href="/terms" className="footer-unique-link">Terms</a></li>
            <li><a href="/cookies" className="footer-unique-link">Cookies</a></li>
          </ul>
        </div>

        <div className="footer-unique-section">
          <h4 className="footer-unique-title">Follow Us</h4>
          <ul className="footer-unique-list">
            <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-unique-link">Twitter</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-unique-link">Instagram</a></li>
            <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-unique-link">Facebook</a></li>
          </ul>
        </div>

        <div className="footer-unique-section">
          <h4 className="footer-unique-title">Contact</h4>
          <ul className="footer-unique-list">
            <li><a href="/support" className="footer-unique-link">Support</a></li>
            <li><a href="/feedback" className="footer-unique-link">Feedback</a></li>
            <li><a href="/partners" className="footer-unique-link">Partners</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-unique-bottom">
        <p>© 2025 University Buzz. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;