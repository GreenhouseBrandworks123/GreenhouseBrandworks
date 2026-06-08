import React, { useState } from 'react';
import { Modal } from '../components/Modal';
import { SVGIcon } from '../components/SVGIcon';
import { saveJobApplication, uploadResume } from '../firebaseUtils';

export const Careers = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', portfolio: '', resume: null, message: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resumeFileName, setResumeFileName] = useState('');

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
    setFormData({ name: '', email: '', phone: '', portfolio: '', resume: null, message: '' });
    setResumeFileName('');
    setErrors({});
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (file.type !== 'application/pdf') {
        setErrors({ ...errors, resume: 'Only PDF files are allowed' });
        setFormData({ ...formData, resume: null });
        setResumeFileName('');
        return;
      }
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, resume: 'File size must be less than 5MB' });
        setFormData({ ...formData, resume: null });
        setResumeFileName('');
        return;
      }
      setFormData({ ...formData, resume: file });
      setResumeFileName(file.name);
      if (errors.resume) {
        setErrors({ ...errors, resume: '' });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    if (!formData.resume) {
      newErrors.resume = 'Resume PDF is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      // Upload resume to Firebase Storage
      let resumeURL = null;
      if (formData.resume) {
        resumeURL = await uploadResume(formData.resume, selectedJob.id);
      }

      // Save application to Firestore
      await saveJobApplication({
        jobId: selectedJob.id,
        jobTitle: selectedJob.title,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        portfolio: formData.portfolio,
        message: formData.message,
        resumeURL,
      });

      // Success response
      setIsSubmitted(true);
    } catch (error) {
      setErrors({ submit: error.message });
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
                className="form-control"
                value={formData.portfolio}
                onChange={handleInputChange}
                placeholder="https://yourportfolio.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="resume">Resume PDF *</label>
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '12px',
                padding: '12px',
                border: `2px solid ${errors.resume ? '#dc3545' : '#e0e0e0'}`,
                borderRadius: '4px',
                backgroundColor: '#f9f9f9',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  accept=".pdf"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <label htmlFor="resume" style={{ 
                  flex: 1, 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  cursor: 'pointer',
                  margin: 0
                }}>
                  <SVGIcon name="upload" size={20} />
                  <span style={{ color: resumeFileName ? '#333' : '#999' }}>
                    {resumeFileName || 'Click to upload your resume (PDF only, max 5MB)'}
                  </span>
                </label>
              </div>
              {errors.resume && <span className="form-error">{errors.resume}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="message">Message / Why Greenhouse? *</label>
              <textarea
                id="message"
                name="message"
                className="form-control"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Introduce yourself and describe your strategic drive..."
              ></textarea>
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
            {errors.submit && <span className="form-error" style={{ marginTop: '12px', display: 'block' }}>{errors.submit}</span>}
          </form>
        )}
      </Modal>
    </div>
  );
};
export default Careers;
