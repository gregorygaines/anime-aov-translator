import { config } from '../config';

const getVideoContainerSelector = (domain: string): string => {
  switch (domain) {

    case config.whiteListedDomains.crunchyroll:
      return config.videoPosSelector.crunchyroll;

    default:
      console.log("Unknown domain: " + domain);
      return "";
  }
};

const getElementOffset = (element: Element) => {
  const rect = element.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY
  };
};

const getElementDim = (element: HTMLElement | Element) => {
  return {
    width: element.offsetWidth,
    height: element.offsetHeight
  };
};

export { getVideoContainerSelector, getElementOffset, getElementDim };