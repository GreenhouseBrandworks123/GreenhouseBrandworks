import { useState } from 'react';
import { SVGIcon } from '../components/SVGIcon';
import { Modal } from '../components/Modal';

export const Services = ({ setCurrentPage }) => {
  const [selectedService, setSelectedService] = useState(null);

  const servicesData = [
  {
    id: "website-design",
    icon: "web",
    title: "Electronic Media",
    shortDesc: "Stunning, high-conversion interface frameworks optimized for lightning-fast speeds and responsive mobile grids.",
    details: "Your website is your 24/7 digital storefront. We construct modern layouts designed to decrease loading times, engage users, and drive them toward action buttons.",
    deliverables: [
      "Website design",
      "Presentations (PPT, Flash)",
      "eDirect Mailers",
      "eNewsletters",
      "eInvitations (Webinars, Seminars)",
      "Social media campaigns",
      "Device compatible designs (Mobile, Tablet, PC, etc)",
      "Infographics"
    ],
    
  },
  {
    id: "print-design",
    icon: "print",
    title: "Print Media",
    shortDesc: "Editorial magazines, catalogs, premium coffee-table booklets, and luxury packaging assets.",
    details: "Tactile materials create strong physical connections. We print on premium stocks with high-end typography layout rules.",
    deliverables: [
      "Brochures",
      "Flyers",
      "Folders",
      "Posters",
      "Packaging design",
      "Danglers",
      "POP Collerals",
      "Ambient Media (Office branding, etc)",
      "Newsletters",
      "Annual Reports (Creative Concept, Design, Content Collation and Writing)"
    ],
  },
  {
    id: "digital-marketing",
    icon: "marketing",
    title: "Digital Marketing",
    shortDesc: "PPC campaigns, organic keyword targeting, and focused funnels to capture and nurture business leads.",
    details: "Marketing without analysis is spending without return. We deploy strategic digital funnels that track conversions from initial impressions to final sales.",
    deliverables: [
      "Ad Campaign Setup (Google/Meta)",
      "Audience Segmentation Map",
      "Landing Page Configurations",
      "Analytics Performance Dashboard"
    ],
    
  },
  {
    id: "outdoor-advertising",
    icon: "outdoor",
    title: "Outdoor Advertising",
    shortDesc: "Large-format display layouts: banners, digital highway billboards, transit boards, and office banners.",
    details: "High-visibility boards require instant comprehension. We layout massive visuals that grab drivers' attention and deliver messaging clearly.",
    deliverables: [
      "Designs for Billboards",
      "Pole ads",
      "Gantries",
      "Median Props"
    ],
    
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
