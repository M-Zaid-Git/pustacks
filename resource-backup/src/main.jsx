import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.jsx';
import store from './redux/store.mjs';
import '@fontsource/comfortaa';
import '@fontsource/comfortaa/400.css';
import '@fontsource/comfortaa/500.css';
import '@fontsource/comfortaa/600.css';
import '@fontsource/comfortaa/700.css';
import './styles/globals.css';
import './styles/fonts.css';
import './styles/navbar.css';
import './styles/scrollbar.css';
import './styles/Monument.css';

// Check if the root element exists
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Root element not found! Make sure there is a <div id="root"></div> in your HTML.');
  // Create root element if it doesn't exist
  const rootDiv = document.createElement('div');
  rootDiv.id = 'root';
  document.body.appendChild(rootDiv);
}

// Add error handler
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
