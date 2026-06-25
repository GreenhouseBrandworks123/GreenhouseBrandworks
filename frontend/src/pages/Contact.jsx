import { useState } from 'react';
import { SVGIcon } from '../components/SVGIcon';
import { saveContactSubmission } from '../firebaseUtils';
import ReCAPTCHA from "react-google-recaptcha";

export const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate name and size limit
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length > 100) {
      newErrors.name = 'Name must be under 100 characters';
    }

    // Validate email format and size limit
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (formData.email.trim().length > 100) {
      newErrors.email = 'Email must be under 100 characters';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate phone number format
    const phoneRegex = /^[+\d\s\-().]{7,20}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number (7-20 digits/characters)';
    }

    // Validate optional company field size limit
    if (formData.company && formData.company.trim().length > 100) {
      newErrors.company = 'Company name must be under 100 characters';
    }

    // Validate message and size limit
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length > 2000) {
      newErrors.message = 'Message must be under 2000 characters';
    }

    // Validate reCAPTCHA
    if (!captchaValue) {
      newErrors.captcha = 'Please complete the reCAPTCHA';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      await saveContactSubmission({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        message: formData.message,
        captchaToken: captchaValue,
      });

      setIsSubmitted(true);
      setCaptchaValue(null);
    } catch (error) {
      console.error('Contact form error:', error);
      setErrors({ submit: 'Something went wrong. Please try again later.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      {/* Contact Header */}
      <section className="section" style={{ paddingBottom: '40px' }}>
        <div className="section-container">
          <span className="section-badge">Contact Us</span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '24px' }}>
            Let's start something.
          </h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '700px' }}>
            Have a project in mind, a business query, or want to discuss pricing options? Send us details and we'll schedule a discovery call.
          </p>
        </div>
      </section>

      {/* Dual Column Content */}
      <section className="section section-bg" style={{ paddingTop: '80px' }}>
        <div className="section-container">
          <div className="grid-2" style={{ alignItems: 'flex-start' }}>
            {/* Left Column - Info & Coordinates */}
            <div className="contact-details">
              <div>
                <h2 style={{ marginBottom: '16px' }}>Project inquiries & coordination.</h2>
                <p style={{ marginBottom: '32px' }}>
                  If you are in Bangalore, India, visit our studio for a premium brand planning session. Otherwise, we host virtual client boards globally.
                </p>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <SVGIcon name="mapPin" size={20} />
                </div>
                <div className="contact-info-text">
                  <h4>Office Location</h4>
                  <p>828,10th A Main Road, Indiranagar 2nd Stage, Bangalore - 560038</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <SVGIcon name="mail" size={20} />
                </div>
                <div className="contact-info-text">
                  <h4>Email Address</h4>
                 <p>info@greenhousebrandworks.com</p> 
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <SVGIcon name="phone" size={20} />
                </div>
                <div className="contact-info-text">
                  <h4>Phone Lines</h4>
                  <p>+91 80 4567 8910</p>
                </div>
              </div>

              {/* Map Mockup */}
              <div className="map-card">
               
                <h4 style={{ color: 'var(--text)', marginBottom: '4px', fontFamily: 'var(--font-title)' }}>
                  Greenhouse Brandworks Office
                </h4>
                <p style={{ fontSize: '0.85rem' }}>Indiranagar • Bangalore, India</p>
                <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                  <span className="job-tag" style={{ fontSize: '0.75rem', backgroundColor: 'var(--accent-soft)', color: 'var(--accent)' }}>Active Studio</span>
                  <span className="job-tag" style={{ fontSize: '0.75rem' }}>Open: 10:30 AM - 6:30 PM</span>
                </div>
                <div className="map-accent-line"></div>
              </div>

              {/* Social Channels */}
              <div style={{ marginTop: '16px' }}>
                <h4 style={{ fontSize: '1rem', marginBottom: '12px' }}>Follow Our Grid</h4>
                <div className="contact-socials">
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
                    <SVGIcon name="instagram" size={18} />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                    <SVGIcon name="linkedin" size={18} />
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column - Form */}
            <div style={{ backgroundColor: 'var(--bg)', border: '1px solid var(--border)', padding: '48px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--card-shadow)' }}>
              {isSubmitted ? (
                <div className="form-success-container" style={{ padding: '24px 0' }}>
                  <div className="success-icon">
                    <SVGIcon name="check" size={40} />
                  </div>
                  <h3>Message Sent!</h3>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
                    Thank you, <strong>{formData.name}</strong>. Your project inquiry was submitted successfully. One of our lead brand directors will inspect your details and email you within 24 hours to schedule a discovery call.
                  </p>
                  <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setIsSubmitted(false)}>
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 style={{ fontSize: '1.6rem', marginBottom: '8px' }}>Send a Message</h3>
                  <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Fields marked with * are required.</p>

                  <div className="form-group">
                    <label htmlFor="contact-name">Full Name *</label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      className={`form-control ${errors.name ? 'invalid' : ''}`}
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                    />
                    {errors.name && <span className="form-error">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-email">Email Address *</label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      className={`form-control ${errors.email ? 'invalid' : ''}`}
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                    />
                    {errors.email && <span className="form-error">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-phone">Phone Number *</label>
                    <input
                      type="tel"
                      id="contact-phone"
                      name="phone"
                      className={`form-control ${errors.phone ? 'invalid' : ''}`}
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 XXXXX XXXXX"
                    />
                    {errors.phone && <span className="form-error">{errors.phone}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-company">Company / Organization</label>
                    <input
                      type="text"
                      id="contact-company"
                      name="company"
                      className={`form-control ${errors.company ? 'invalid' : ''}`}
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Your company name"
                    />
                    {errors.company && <span className="form-error">{errors.company}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="contact-message">Message / Brief Project Details *</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      className={`form-control ${errors.message ? 'invalid' : ''}`}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Provide a summary of your branding requirements, website metrics, or business timelines..."
                    ></textarea>
                    {errors.message && <span className="form-error">{errors.message}</span>}
                  </div>

                  <div style={{ marginTop: '20px' }}>
                    <ReCAPTCHA
                      sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                      onChange={(value) => setCaptchaValue(value)}
                    />
                    {errors.captcha && (
                      <span className="form-error" style={{ display: 'block', marginTop: '4px' }}>
                        {errors.captcha}
                      </span>
                    )}
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary" 
                    style={{ width: '100%', marginTop: '24px' }}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Sending...' : 'Send Inquiry Details'}
                  </button>
                  {errors.submit && (
                    <span className="form-error" style={{ marginTop: '12px', display: 'block', textAlign: 'center' }}>
                      {errors.submit}
                    </span>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Contact;
