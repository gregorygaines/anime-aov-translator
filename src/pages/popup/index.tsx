import React from 'react';
import { render } from 'react-dom';

import Popup from './popup';
import './index.css';
import '../../assets/styles/tailwind.css';

render(<Popup />, window.document.querySelector('#app-container'));

// eslint-disable-next-line no-undef
if (module.hot) module.hot.accept();
