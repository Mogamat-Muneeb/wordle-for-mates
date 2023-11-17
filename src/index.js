import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as serviceWorker from './serviceWorker';

let deferredPrompt;

// // Listen for the beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default prompt
  event.preventDefault();
  // Stash the event so it can be triggered later
  deferredPrompt = event;
  // Update UI to notify the user they can install the PWA
  // Show a custom UI element, like a button, to prompt installation
  document.getElementById('install-button').style.display = 'block';
});

serviceWorker.register();

document.getElementById('install-button').addEventListener('click', () => {
  console.log('click')
  // Check if the deferredPrompt is available
  if (deferredPrompt) {
    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }

      // Reset deferredPrompt for the next time
      deferredPrompt = null;
      // Hide the install button
      document.getElementById('install-button').style.display = 'none';
    });
  }
});
ReactDOM.render(
  <React.StrictMode>
    <ToastContainer />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)