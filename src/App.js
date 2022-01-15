import React from 'react';
import './App.css'
import Main from './components/Main.jsx';
import Navbar from './components/Navbar';

const App = () => {

  return (
    <div className="App">
      <Navbar />
      <Main />
    </div>
  );
};

export default App;