import 'react-datepicker/dist/react-datepicker.css';
import './index.scss';
import '../public/favicon.ico';

// Extend the time-based library for entire app.
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import timezone from 'dayjs/plugin/timezone';
import { StoreProvider } from 'easy-peasy';
import { ClientContext, GraphQLClient } from 'graphql-hooks';
import React from 'react';
import ReactDOM from 'react-dom';
import { IconContext } from 'react-icons';
import { BrowserRouter } from 'react-router-dom';

import { APP } from '@constants';
import Loader from '@organisms/Loader/Loader';
import Modal from '@organisms/Modal/Modal';
import Panel from '@organisms/Panel/Panel';
import ToastQueue from '@organisms/Toast/Toast';
import { store } from '@store/Store';
import Router from './core/routing/Router';

day.extend(advancedFormat);
day.extend(timezone);

const client = new GraphQLClient({
  fetchOptions: { credentials: 'include' },
  url: `${APP.SERVER_URL}/graphql`
});

const App = () => (
  <ClientContext.Provider value={client}>
    <StoreProvider store={store}>
      <IconContext.Provider value={{ className: 'react-icon' }}>
        <BrowserRouter>
          <Loader />
          <Modal />
          <Panel />
          <Router />
          <ToastQueue />
        </BrowserRouter>
      </IconContext.Provider>
    </StoreProvider>
  </ClientContext.Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
