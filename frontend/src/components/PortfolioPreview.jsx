 
import p1 from '../assets/portfolio-preview/p1.webp';
import p2 from '../assets/portfolio-preview/p2.webp';
import p3 from '../assets/portfolio-preview/p3.webp';
import p4 from '../assets/portfolio-preview/p4.webp';
import p5 from '../assets/portfolio-preview/p5.webp';
import p6 from '../assets/portfolio-preview/p6.webp';
import p7 from '../assets/portfolio-preview/p7.webp';
import p8 from '../assets/portfolio-preview/p8.webp';
import p9 from '../assets/portfolio-preview/p9.webp';
import p10 from '../assets/portfolio-preview/p10.webp';
import p11 from '../assets/portfolio-preview/p11.webp';
import p12 from '../assets/portfolio-preview/p12.webp';
import p13 from '../assets/portfolio-preview/p13.webp';
import p14 from '../assets/portfolio-preview/p14.webp';
import p15 from '../assets/portfolio-preview/p15.webp';
import p16 from '../assets/portfolio-preview/p16.webp';
import p17 from '../assets/portfolio-preview/p17.webp';
import p18 from '../assets/portfolio-preview/p18.webp';
import p19 from '../assets/portfolio-preview/p19.webp';




const row1Images = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10];
const row2Images = [p11, p12, p13, p14, p15, p16, p17, p18, p19];
 
 
 
 export default function PortfolioPreview({ setCurrentPage }) {

    return (

        <>
            {/* --- PORTFOLIO PREVIEW --- */}
      <section className="section portfolio-marquee-section">
        <div className="section-container">
          <div className="glass-showcase-card">
            <div className="section-header centered-marquee-header">
              <span className="section-badge">Portfolio Preview</span>
              <h2>Our Gallery</h2>
              <p>Take a look at some of our work that we’ve done for our clients through the years.</p>
            </div>

            <div className="marquee-container">
              <div className="marquee-row">
                <div className="marquee-track track-left">
                  {row1Images.map((imgSrc, index) => (
                    <div key={`r1-main-${index}`} className="marquee-card" onClick={() => { setCurrentPage('portfolio'); window.scrollTo(0,0); }}>
                      <img src={imgSrc} alt={`Portfolio Asset ${index + 1}`} />
                    </div>
                  ))}
                  {row1Images.map((imgSrc, index) => (
                    <div key={`r1-dup-${index}`} className="marquee-card" onClick={() => { setCurrentPage('portfolio'); window.scrollTo(0,0); }}>
                      <img src={imgSrc} alt={`Portfolio Asset ${index + 1} Duplicate`} loading="lazy" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="marquee-row">
                <div className="marquee-track track-right">
                  {row2Images.map((imgSrc, index) => (
                    <div key={`r2-main-${index}`} className="marquee-card" onClick={() => { setCurrentPage('portfolio'); window.scrollTo(0,0); }}>
                      <img src={imgSrc} alt={`Portfolio Asset ${index + 13}`} />
                    </div>
                  ))}
                  {row2Images.map((imgSrc, index) => (
                    <div key={`r2-dup-${index}`} className="marquee-card" onClick={() => { setCurrentPage('portfolio'); window.scrollTo(0,0); }}>
                      <img src={imgSrc} alt={`Portfolio Asset ${index + 13} Duplicate`} loading="lazy" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="marquee-action-row">
              <button className="btn btn-secondary" onClick={() => { setCurrentPage('portfolio'); window.scrollTo(0,0); }}>
                Enter Portfolio
              </button>
            </div>
          </div>
        </div>
      </section>

        </>

    );
}