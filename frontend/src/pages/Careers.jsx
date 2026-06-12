import { useState } from 'react';
import { Modal } from '../components/Modal';
import { SVGIcon } from '../components/SVGIcon';
import {
  saveJobApplication
} from '../firebaseUtils';

import ReCAPTCHA from "react-google-recaptcha";

export const Careers = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', portfolio: '', resume: '', message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
const [captchaValue, setCaptchaValue] = useState(null);
  const jobs = [
    {
      id: "graphic-designer",
      title: "Graphic Designer",
      department: "Creative Design",
      type: "Full-Time",
      location: "Bangalore, India (Hybrid)",
      description: "We are searching for a senior visual artist to design branding kits, print catalogs, social grids, and vector layouts. You must possess a high-end Figma / Adobe suite portfolio.",
      requirements: [
        "3+ years agency branding experience",
        "Expert knowledge of typography hierarchy and color balance",
        "Experience setting up print-ready layout files and bleed systems",
        "Expert Figma, Illustrator, and Photoshop skills"
      ]
    },
    {
      id: "website-designer",
      title: "Website Designer / UI Developer",
      department: "Digital Engineering",
      type: "Full-Time",
      location: "Bangalore, India (Hybrid)",
      description: "Seeking a designer with front-end React understanding to mock up premium layout wireframes and build responsive HTML/CSS structures with micro-interactions.",
      requirements: [
        "Portfolio featuring minimal, glassmorphic layout mockups",
        "Solid mastery of HTML5, CSS3, Flexbox/Grid, and responsive scaling",
        "Familiarity with React, Vite, and component structures is a major plus",
        "Ability to translate creative guidelines into fast-loading code"
      ]
    },
    {
      id: "bd-executive",
      title: "Business Development Executive",
      department: "Client Services",
      type: "Full-Time",
      location: "Bangalore, India (On-Site)",
      description: "Seeking an outgoing sales strategist to coordinate client meetings, draft pricing contracts, present project quotes, and acquire high-value branding corporate projects.",
      requirements: [
        "2+ years experience pitching design/technical agency contracts",
        "Clear, written and verbal communication styles",
        "Experience running sales CRM tools and setting up lead funnels",
        "Familiarity with agency operations and project estimation timelines"
      ]
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleApplyClick = (job) => {
    setSelectedJob(job);
    setIsSubmitted(false);
    setFormData({ name: '', email: '', phone: '', portfolio: '', resume: '', message: '' });
    setErrors({});
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate name and size limit
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length > 100) {
      newErrors.name = 'Full name must be under 100 characters';
    }

    // Validate email format and size limit
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (formData.email.trim().length > 100) {
      newErrors.email = 'Email must be under 100 characters';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    // Validate phone number format
    const phoneRegex = /^[+\d\s\-().]{7,20}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number (7-20 digits/characters)';
    }

    // Validate resume link domain and size limits
    if (!formData.resume.trim()) {
      newErrors.resume = 'Resume Google Drive link is required';
    } else if (formData.resume.trim().length > 500) {
      newErrors.resume = 'Resume link must be under 500 characters';
    } else if (!/^https:\/\//.test(formData.resume.trim())) {
      newErrors.resume = 'Resume link must be a valid HTTPS URL';
    } else {
      try {
        const ALLOWED_RESUME_DOMAINS = ['drive.google.com', 'docs.google.com', 'dropbox.com', 'onedrive.live.com', 'onedrive.com'];
        const url = new URL(formData.resume.trim());
        if (!ALLOWED_RESUME_DOMAINS.some(domain => url.hostname === domain || url.hostname.endsWith('.' + domain))) {
          newErrors.resume = 'Please use Google Drive, Dropbox, or OneDrive for hosting your resume';
        }
      } catch {
        newErrors.resume = 'Please enter a valid URL';
      }
    }

    // Validate optional portfolio link format and HTTPS
    if (formData.portfolio && formData.portfolio.trim()) {
      if (formData.portfolio.trim().length > 500) {
        newErrors.portfolio = 'Portfolio link must be under 500 characters';
      } else if (!/^https:\/\//.test(formData.portfolio.trim())) {
        newErrors.portfolio = 'Portfolio link must be a secure HTTPS URL';
      } else {
        try {
          new URL(formData.portfolio.trim());
        } catch {
          newErrors.portfolio = 'Please enter a valid URL';
        }
      }
    }

    // Validate optional message size limit
    if (formData.message && formData.message.trim().length > 2000) {
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
      // Save application to Firestore
      await saveJobApplication({
        jobId: selectedJob.id,
        jobTitle: selectedJob.title,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        portfolio: formData.portfolio ? formData.portfolio.trim() : '',
        message: formData.message ? formData.message.trim() : '',
        resumeURL: formData.resume.trim(),
        captchaToken: captchaValue,
      });

      // Success response
      setIsSubmitted(true);
      setCaptchaValue(null);
    } catch (error) {
      setErrors({ submit: 'Something went wrong. Please try again later.' });
      console.error('Error submitting application:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      {/* Careers Header */}
      <section className="section" style={{ paddingBottom: '40px' }}>
        <div className="section-container">
          <span className="section-badge">Join Our Team</span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '24px' }}>
            Build the future of design.
          </h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '700px' }}>
            We look for creatives and builders who take absolute ownership of their work and push aesthetic and technical boundaries.
          </p>
        </div>
      </section>

      {/* JobList Section */}
      <section className="section section-bg" style={{ paddingTop: '80px' }}>
        <div className="section-container">
          <div className="job-grid">
            {jobs.map((job) => (
              <div key={job.id} className="job-card">
                <div className="job-info">
                  <div className="job-tags">
                    <span className="job-tag">{job.department}</span>
                    <span className="job-tag" style={{ color: 'var(--accent)', backgroundColor: 'var(--accent-soft)' }}>
                      {job.type}
                    </span>
                  </div>
                  <h3>{job.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', verticalAlign: 'middle', marginRight: '16px' }}>
                      <SVGIcon name="mapPin" size={14} /> {job.location}
                    </span>
                  </p>
                  <p style={{ maxWidth: '750px' }}>{job.description}</p>
                </div>
                <div>
                  <button className="btn btn-primary" onClick={() => handleApplyClick(job)}>
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Dialog Modal */}
      <Modal
        isOpen={!!selectedJob}
        onClose={() => setSelectedJob(null)}
        title={isSubmitted ? "" : `Apply: ${selectedJob?.title}`}
        subtitle={isSubmitted ? "" : selectedJob?.department}
      >
        {isSubmitted ? (
          <div className="form-success-container">
            <div className="success-icon">
              <SVGIcon name="check" size={40} />
            </div>
            <h3>Application Received!</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>
              Thank you for applying to the <strong>{selectedJob?.title}</strong> role. Our creative team will review your credentials and reach out within 3 business days.
            </p>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={() => setSelectedJob(null)}>
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                className={`form-control ${errors.name ? 'invalid' : ''}`}
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
              />
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-control ${errors.email ? 'invalid' : ''}`}
                value={formData.email}
                onChange={handleInputChange}
                placeholder="you@example.com"
              />
              {errors.email && <span className="form-error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className={`form-control ${errors.phone ? 'invalid' : ''}`}
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+91 XXXXX XXXXX"
              />
              {errors.phone && <span className="form-error">{errors.phone}</span>}
            </div>

             <div className="form-group">
              <label htmlFor="portfolio">Portfolio / Web Link</label>
              <input
                type="url"
                id="portfolio"
                name="portfolio"
                className={`form-control ${errors.portfolio ? 'invalid' : ''}`}
                value={formData.portfolio}
                onChange={handleInputChange}
                placeholder="https://yourportfolio.com"
              />
              {errors.portfolio && <span className="form-error">{errors.portfolio}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="resume">Resume Google Drive Link *</label>
              <input
                type="url"
                id="resume"
                name="resume"
                className={`form-control ${errors.resume ? 'invalid' : ''}`}
                value={formData.resume}
                onChange={handleInputChange}
                placeholder="https://drive.google.com/file/d/YOUR_FILE_ID/view"
              />
              {errors.resume && <span className="form-error">{errors.resume}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="message">Message / Why Greenhouse? *</label>
              <textarea
                id="message"
                name="message"
                className={`form-control ${errors.message ? 'invalid' : ''}`}
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Introduce yourself and describe your strategic drive..."
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

            <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
              <button 
                type="submit" 
                className="btn btn-primary" 
                style={{ flex: 1 }}
                disabled={isLoading}
              >
                {isLoading ? 'Submitting...' : 'Submit Application'}
              </button>
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => setSelectedJob(null)}
                disabled={isLoading}
              >
                Cancel
              </button>
            </div>
            {errors.submit && <span className="form-error" style={{ marginTop: '12px', display: 'block', textAlign: 'center' }}>{errors.submit}</span>}
          </form>
        )}
      </Modal>
    </div>
  );
};
export default Careers;
