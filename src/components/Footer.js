import React from "react";

const Footer = props => {
  return (
    <footer>
      <p className="footer-links">
        <a
          href="https://github.com/satyam22/apni-dukan"
          target="_blank"
        >
          View Source on Github
        </a>
        <span> / </span>
        <a href="mailto:satyamsgsits1994@gmail.com" target="_blank">
          Need any help?
        </a>
        <span> / </span>
      </p>
      <p>
        &copy; 2018 <strong>Apni Dukan</strong> - E-commerce store
      </p>
    </footer>
  );
};

export default Footer;
