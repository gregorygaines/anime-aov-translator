import React from 'react';
import { render } from 'react-dom';

import Options from './options';
import './index.css';
import '../../assets/styles/tailwind.css';

render(
  <Options title={'Settings'} />,

  window.document.querySelector('#app-container')
);

// eslint-disable-line no-eval
if (module.hot) module.hot.accept();
