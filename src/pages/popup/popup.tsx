import React from 'react';
import { Header } from '../header';
import { SectionTabs } from './section_tabs';
import { HomeTab } from './home_tab';
import "./popup.css";
import { WhiteListedSites } from './white_listed_sites';
import { About } from './about';

const Popup = () => {
  return (
    <main>
      <Header />
      <SectionTabs sections={
        [
          {
            label: "Home",
            component: <HomeTab />
          },
          {
            label: "Allow-listed sites",
            component: <WhiteListedSites />
          },
          {
            label: "About",
            component: <About />
          },
          {
            label: "Option",
            component: <WhiteListedSites />
          }
        ]
      } />
    </main>
  );
};

export default Popup;
