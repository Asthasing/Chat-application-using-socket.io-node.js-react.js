import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Join from './components/Join/Join';
import Chat from './components/chat/Chat';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Join />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  </Router>
);

export default App;

