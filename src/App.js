import React from 'react';
import './App.css'
import Main from './components/Canvas/Main';

const App = () => {

  return (
    <div className="App">
      <header className="App-header">
        {/* <nav className="topnav">
        <ul>
          <li><a href="https://silvia-odwyer.github.io/photon/docs/photon/index.html">Docs</a></li>
          <li><a href="https://github.com/silvia-odwyer/photon">GitHub</a></li>
        </ul>
            
        </nav> */}

        <Main />
      </header>

    </div>
  );
};

export default App;