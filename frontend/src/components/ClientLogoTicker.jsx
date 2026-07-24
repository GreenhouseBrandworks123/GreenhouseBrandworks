import abblogo from '../assets/client-logos/ABB.png';
import AscendumLogo from '../assets/client-logos/Ascendum_Logo.png';
import axaLogo from '../assets/client-logos/AXA_Logo.png';
import bcicLogo from '../assets/client-logos/bcic.png';
import bhorukaLogo from '../assets/client-logos/bhoruka.png';
import blackNGreenLogo from '../assets/client-logos/blackngreen_logo.png';
import comvivaLogo from '../assets/client-logos/comviva.png';
import fssLogo from '../assets/client-logos/FSS.png';
import goldenPalmsLogo from '../assets/client-logos/golden-palms.png';
import investBavariaLogo from '../assets/client-logos/invest-in-bavaria.png';
import kushagramatiLogo from '../assets/client-logos/kushagramati.png';
import mobifinLogo from '../assets/client-logos/mobifin.png';
import mphasisLogo from '../assets/client-logos/mphasis.png';
import npstLogo from '../assets/client-logos/NPST.png';
import panamaxLogo from '../assets/client-logos/Panamax.png';
import panchheeLogo from '../assets/client-logos/pancheetantra.png';
import tecnotreeLogo from '../assets/client-logos/Tecnotree-logo.png';
import tessolveLogo from '../assets/client-logos/tessolve.png';
import timepayLogo from '../assets/client-logos/TimePay.png';
import toyotaLogo from '../assets/client-logos/toyota-logo.png';
import utthungaLogo from '../assets/client-logos/utthunga.png';
import zaggleLogo from '../assets/client-logos/Zaggle-logo.png';

const clientLogos = [
    { name: 'ABB', logo: abblogo },
    { name: 'Ascendum', logo: AscendumLogo },
    { name: 'AXA', logo: axaLogo },
    { name: 'BCIC', logo: bcicLogo },
    { name: 'Bhoruka', logo: bhorukaLogo },
    { name: 'Black N Green', logo: blackNGreenLogo },
    { name: 'Comviva', logo: comvivaLogo },
    { name: 'FSS', logo: fssLogo },
    { name: 'Golden Palms', logo: goldenPalmsLogo },
    { name: 'Invest Bavaria', logo: investBavariaLogo },
    { name: 'Kushagramati', logo: kushagramatiLogo },
    { name: 'Mobifin', logo: mobifinLogo },
    { name: 'Mphasis', logo: mphasisLogo },
    { name: 'NPST', logo: npstLogo },
    { name: 'Panamax', logo: panamaxLogo },
    { name: 'PANCHEE TANTRA', logo: panchheeLogo },
    { name: 'Tecnotree', logo: tecnotreeLogo },
    { name: 'Tessolve', logo: tessolveLogo },
    { name: 'TimePay', logo: timepayLogo },
    { name: 'Toyota', logo: toyotaLogo },
    { name: 'Utthunga', logo: utthungaLogo },
    { name: 'Zaggle', logo: zaggleLogo }
  ];


  export default function ClientLogoTicker(){

    return(

        <section className="logo-ticker">
        <div className="logo-ticker-track">
          {clientLogos.concat(clientLogos).map((client, index) => (
            <div key={index} className="logo-ticker-item">
              <img src={client.logo} alt={client.name} className="client-logo-img"/>
              <span>{client.name}</span>
            </div>
          ))}
        </div>
      </section>

    )

}