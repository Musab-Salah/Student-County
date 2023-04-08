import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="row">
        <div className="brand">
          <div className="footer-logo">
            <img className="vector-icon9" alt="" src="/logo.svg" />
          </div>
          <div className="footer-description">
          Maximize Student County's features in university to save money, manage time, and earn extra funds.
          </div>
        </div>
        <div className="footer-lists"> 
          <div className="footer-list">
            <div className="list-title">PAGES</div>
            <a href="/" className="footer-link">Home</a>
            <a href="/services" className="footer-link">Services</a>
            <a href="/blog" className="footer-link">Blog</a>
            <a href="/contact-us" className="footer-link">Contact us</a>
          </div>
          <div className="footer-list">
            <div className="list-title">Services</div>
            <a href="/services/book-store" className="footer-link">Book Store</a>
            <a href="/services/housing" className="footer-link">Housing Page</a>
            <a href="/services/riding" className="footer-link">Riding Page</a>
          </div>
          <div className="footer-list">
            <div className="list-title">Policies</div>
            <a href="/terms-of-use" className="footer-link">Terms of use</a>
            <a href="/privacy-policy" className="footer-link">Privacy Policy</a>
            <a href="/refund-policy" className="footer-link">Refund Policy</a>
            <a href="/supported-university" className="footer-link">Supported University</a>
          </div>
        </div>

      </div>
      {/* <div className="line3">
        <div className="rectangle-div" />
      </div>
      <div className="copyright">
        © Student County 2023. Not affiliated with AAUP, Inc
      </div> */}
    </div> 

  );
};

export default Footer;
