// import React from 'react';
// import ReactDOM from 'react-dom';

// import App from './App';

// ReactDOM.render(<App /> , document.querySelector('#root'));


import React from 'react';
import ReactDOM from 'react-dom/client'; // Import createRoot from react-dom/client
import App from './App'; // Make sure to import your App component

// Create a root element
const root = ReactDOM.createRoot(document.querySelector('#root'));

// Render the App component
root.render(<App />);
