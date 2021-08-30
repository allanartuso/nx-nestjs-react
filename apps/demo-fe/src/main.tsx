import { setAppConfig } from '@dm/react/shared/util-config';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { environment } from './environments/environment';

function getApiUrl() {
  if (window.location.hostname.match('localhost')) {
    return 'http://localhost:3000/api';
  } else {
    return 'https://' + window.location.hostname + '/api';
  }
}

function getWsUrl() {
  if (window.location.hostname.match('localhost')) {
    return 'ws://localhost:3030/api';
  } else {
    return 'https://' + window.location.hostname + '/api';
  }
}

async function initApp() {
  await setAppConfig({
    prod: environment.production,
    apiUrl: getApiUrl(),
    wsUrl: getWsUrl(),
  });

  const App = (await import('./app/app')).default;

  return ReactDOM.render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
    document.getElementById('root')
  );
}

initApp();
