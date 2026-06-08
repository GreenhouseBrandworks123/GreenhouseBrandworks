import React, { useState } from 'react';
import { SVGIcon } from '../components/SVGIcon';
import { Modal } from '../components/Modal';

export const Services = ({ setCurrentPage }) => {
  const [selectedService, setSelectedService] = useState(null);

  const servicesData = [
    {
      id: "logo-design",
      icon: "logoDesign",
      title: "Logo Design",
      shortDesc: "Crafting iconic, timeless logo marks that encapsulate your brand identity and stick in customers' minds.",
      details: "A logo is the anchor of your visual system. We design bespoke vector marks that communicate your brand's core values in a fraction of a second.",
      deliverables: ["Primary Logo Mark", "Alternative Layouts & Locks", "Monochrome Variants", "High-Resolution Formats (SVG, EPS, PNG)"],
      duration: "2-3 Weeks",
      impact: "Creates a distinct visual anchor that sets you apart from generic clip-art competition."
    },
    {
      id: "branding-identity",
      icon: "branding",
      title: "Branding & Identity",
      shortDesc: "Complete brand guidelines: color palettes, typography selections, stationery guidelines, and tone rules.",
      details: "Consistency is credibility. We build comprehensive visual identity guidelines that ensure every customer touchpoint reflects your corporate message.",
      deliverables: ["Color Palette Hierarchy", "Typography Guidelines", "Stationery Mockups", "Brand Style Guide Book (PDF)"],
      duration: "4-6 Weeks",
      impact: "Aligns your internal teams and external outputs to build trust across all markets."
    },
    {
      id: "website-design",
      icon: "web",
      title: "Website Design",
      shortDesc: "Stunning, high-conversion interface frameworks optimized for lightning-fast speeds and responsive mobile grids.",
      details: "Your website is your 24/7 digital storefront. We construct modern layouts designed to decrease loading times, engage users, and drive them toward action buttons.",
      deliverables: ["Figma Wireframes & Mockups", "Responsive Code Structures", "Interactive Micro-Animations", "SEO Meta Schemas"],
      duration: "6-8 Weeks",
      impact: "Boosts user retention, engagement metrics, and drives online customer acquisition."
    },
    {
      id: "print-design",
      icon: "print",
      title: "Print Design",
      shortDesc: "Editorial magazines, catalogs, premium coffee-table booklets, and luxury packaging assets.",
      details: "Tactile materials create strong physical connections. We print on premium stocks with high-end typography layout rules.",
      deliverables: ["Brochures & Flyers", "Product Packaging Keylines", "Corporate Report Layouts", "Press-Ready Vector Layouts"],
      duration: "3-4 Weeks",
      impact: "Differentiates your products on retail shelves and leaves premium physical reminders."
    },
    {
      id: "digital-marketing",
      icon: "marketing",
      title: "Digital Marketing",
      shortDesc: "PPC campaigns, organic keyword targeting, and focused funnels to capture and nurture business leads.",
      details: "Marketing without analysis is spending without return. We deploy strategic digital funnels that track conversions from initial impressions to final sales.",
      deliverables: ["Ad Campaign Setup (Google/Meta)", "Audience Segmentation Map", "Landing Page Configurations", "Analytics Performance Dashboard"],
      duration: "Ongoing (Monthly)",
      impact: "Establishes a steady stream of incoming leads to scale your monthly sales volumes."
    },
    {
      id: "social-media-design",
      icon: "social",
      title: "Social Media Design",
      shortDesc: "Vibrant social templates, grid setups, stories, and cover sets across major networking platforms.",
      details: "Social channels are key discovery platforms. We design customized feed grids that elevate your authority and encourage active engagement.",
      deliverables: ["Instagram Feed Templates", "LinkedIn Header Graphics", "Stories & Reel Layout Sets", "Editable Canva Templates"],
      duration: "2 Weeks",
      impact: "Ensures your profiles look premium and consistent when prospective clients search your brand."
    },
    {
      id: "presentation-design",
      icon: "presentation",
      title: "Presentation Design",
      shortDesc: "High-impact sales decks, annual investor slides, and keynotes designed to close major accounts.",
      details: "Pitch with total confidence. We format data-heavy documents into clean infographics and structural slides that support your speaker notes.",
      deliverables: ["Custom Master Templates", "Data Charts & Infographics", "Dynamic Slide Transitions", "Editable Deck File (PPTX Keynote)"],
      duration: "1-2 Weeks",
      impact: "Impresses clients and venture partners during key sales pitches and fundraise rounds."
    },
    {
      id: "outdoor-advertising",
      icon: "outdoor",
      title: "Outdoor Advertising",
      shortDesc: "Large-format display layouts: banners, digital highway billboards, transit boards, and office banners.",
      details: "High-visibility boards require instant comprehension. We layout massive visuals that grab drivers' attention and deliver messaging clearly.",
      deliverables: ["Billboard Displays", "Transit Ads (Bus/Metro)", "Exhibition Stand Banners", "Large-Format Print File Formats"],
      duration: "2-3 Weeks",
      impact: "Captures attention in high-traffic physical zones, building local brand authority."
    },
    {
      id: "email-design",
      icon: "email",
      title: "Email Design",
      shortDesc: "Responsive HTML templates for newsletters, product launches, and automated email drip campaigns.",
      details: "Email yields one of the highest ROIs. We design beautiful, readable email layouts compatible with dark modes and all email clients.",
      deliverables: ["Newsletter Layout Wireframes", "Responsive Coding (MJML/HTML)", "Email Platform Integration", "A/B Subject Line Map"],
      duration: "2 Weeks",
      impact: "Builds close connections with existing clients and turns email prospects into buyers."
    },
    {
      id: "product-video",
      icon: "video",
      title: "Product Video",
      shortDesc: "High-production promotional videos, animations, and social shorts to demonstrate your features.",
      details: "Motion captures attention. We draft storyboards, execute animations, and render premium visual spots that show off your products.",
      deliverables: ["Storyboard Framework", "Video Editing & Sound Grading", "Motion Graphic Overlays", "Optimized Web Formats (MP4, WebM)"],
      duration: "4-6 Weeks",
      impact: "Explains complex tech products or showcases luxury goods within seconds."
    }
  ];

  return (
    <div className="page-container">
      {/* Services Header */}
      <section className="section" style={{ paddingBottom: '40px' }}>
        <div className="section-container">
          <span className="section-badge">Capabilities</span>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '24px' }}>
            What we do best.
          </h1>
          <p style={{ fontSize: '1.2rem', maxWidth: '700px' }}>
            We provide a complete suite of creative and technical services to shape modern brands. Explore our capabilities and discover how we can collaborate.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section section-bg" style={{ paddingTop: '80px' }}>
        <div className="section-container">
          <div className="grid-3">
            {servicesData.map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-icon">
                  <SVGIcon name={service.icon} size={28} />
                </div>
                <h3>{service.title}</h3>
                <p>{service.shortDesc}</p>
                <button 
                  className="service-link" 
                  style={{ background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', padding: 0 }}
                  onClick={() => setSelectedService(service)}
                >
                  Learn More <SVGIcon name="arrowRight" size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Details Modal */}
      <Modal
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        title={selectedService?.title}
        subtitle="Capability Details & Strategy"
      >
        {selectedService && (
          <div>
            <p style={{ fontSize: '1.1rem', marginBottom: '24px', color: 'var(--text)' }}>
              {selectedService.details}
            </p>

            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '1rem', color: 'var(--text)', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Key Deliverables
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedService.deliverables.map((item, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem' }}>
                    <span style={{ color: 'var(--accent)', display: 'inline-flex' }}>
                      <SVGIcon name="check" size={14} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', borderTop: '1px solid var(--border)', paddingTop: '20px', marginBottom: '32px' }}>
              <div>
                <strong style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Average Timeframe
                </strong>
                <p style={{ color: 'var(--text)', fontWeight: '600' }}>{selectedService.duration}</p>
              </div>
              <div>
                <strong style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Strategic Impact
                </strong>
                <p style={{ color: 'var(--text)', fontWeight: '600' }}>High Performance</p>
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '20px', borderRadius: 'var(--radius-md)', marginBottom: '32px', borderLeft: '3px solid var(--accent)' }}>
              <strong style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                Value Proposition
              </strong>
              <p style={{ fontSize: '0.95rem', fontStyle: 'italic' }}>
                {selectedService.impact}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '16px' }}>
              <button 
                className="btn btn-primary" 
                style={{ flex: 1 }}
                onClick={() => {
                  setSelectedService(null);
                  setCurrentPage('contact');
                  window.scrollTo(0,0);
                }}
              >
                Request Quote
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={() => setSelectedService(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};
export default Services;
