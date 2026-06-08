import React, { useState } from 'react';
import { SVGIcon } from '../components/SVGIcon';

export const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', company: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Process submission simulation
    setIsSubmitted(true);
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
                  <h4>Studio Location</h4>
                  <p>12 Greenhouse Arcade, Indiranagar, Bangalore, India - 560038</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <SVGIcon name="mail" size={20} />
                </div>
                <div className="contact-info-text">
                  <h4>Email Address</h4>
                  <a href="mailto:hello@greenhousebrandworks.com">hello@greenhousebrandworks.com</a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">
                  <SVGIcon name="phone" size={20} />
                </div>
                <div className="contact-info-text">
                  <h4>Phone Lines</h4>
                  <a href="tel:+918045678910">+91 80 4567 8910</a>
                </div>
              </div>

              {/* Map Mockup */}
              <div className="map-card">
                <SVGIcon name="logo" size={32} style={{ color: 'var(--accent)', marginBottom: '12px' }} />
                <h4 style={{ color: 'var(--text)', marginBottom: '4px', fontFamily: 'var(--font-title)' }}>
                  Greenhouse Brandworks Studio
                </h4>
                <p style={{ fontSize: '0.85rem' }}>12.9716° N, 77.5946° E • Bangalore, India</p>
                <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                  <span className="job-tag" style={{ fontSize: '0.75rem', backgroundColor: 'var(--accent-soft)', color: 'var(--accent)' }}>Active Studio</span>
                  <span className="job-tag" style={{ fontSize: '0.75rem' }}>Open: 9 AM - 6 PM</span>
                </div>
                <div className="map-accent-line"></div>
              </div>

              {/* Social Channels */}
              <div style={{ marginTop: '16px' }}>
                <h4 style={{ fontSize: '1rem', marginBottom: '12px' }}>Follow Our Grid</h4>
                <div className="contact-socials">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
                    <SVGIcon name="facebook" size={18} />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">
                    <SVGIcon name="twitter" size={18} />
                  </a>
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
                      className="form-control"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Your company name"
                    />
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

                  <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '8px' }}>
                    Send Inquiry Details
                  </button>
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
