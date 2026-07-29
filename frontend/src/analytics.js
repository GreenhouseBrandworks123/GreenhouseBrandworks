import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize(import.meta.env.VITE_GA_MEASUREMENT_ID);
};

export const trackPageView = (page) => {
  ReactGA.send({
    hitType: "pageview",
    page,
    title:document.title,
  });
};

export default ReactGA;