// src/App.js

import React from 'react';
import JoinAdventure from './components/JoinAdventure';
import LeaveAdventure from './components/LeaveAdventure';
import ViewContractBalance from './components/ViewContractBalance';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <h1>Pirate Adventure DApp</h1>
      <img src={`${process.env.PUBLIC_URL}/images/pirate.webp`} alt="Pirate walking" />
      <JoinAdventure />
      <LeaveAdventure />
      <ViewContractBalance />
    </div>
  );
};

export default App;
