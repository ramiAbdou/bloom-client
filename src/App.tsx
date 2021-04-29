/* eslint-disable no-underscore-dangle */
import 'react-datepicker/dist/react-datepicker.css';
import './index.scss';
import '../public/favicon.ico';

import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import React from 'react';
import ReactDOM from 'react-dom';

import Loader from '@components/organisms/Loader/Loader';
import ModalPortal from '@components/organisms/Modal/ModalPortal';
import PanelPortal from '@components/organisms/Panel/PanelPortal';
import ToastQueue from '@components/organisms/Toast/Toast';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import AppProvider from './AppProvider';
import Router from './router/Router';

// Extend the time-based library for entire app.
day.extend(advancedFormat);
day.extend(timezone);
day.extend(utc);

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.APP_ENV,
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: process.env.APP_ENV === 'dev' ? 1.0 : 0.75
});

const App: React.FC = () => (
  <AppProvider>
    <Loader />
    <ModalPortal />
    <PanelPortal />
    <Router />
    <ToastQueue />
  </AppProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));
