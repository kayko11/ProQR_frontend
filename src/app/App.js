import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NoticesList from './components/NoticesList';
import '@tremor/react/dist/tremor.css'; // Import Tremor styles
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<NoticesList />} />
          {/* Add more routes here if you have more pages */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
