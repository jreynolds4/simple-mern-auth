import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';

if ('serviceWorker' in navigator){
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
            console.log('SW registered: ', registration); //eslint-disable-line
        })
        .catch((registrationError) => {
            console.log('SW registeration failed: ', registrationError); //eslint-disable-line
        });
    });
}

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>, 
    document.getElementById('root'));