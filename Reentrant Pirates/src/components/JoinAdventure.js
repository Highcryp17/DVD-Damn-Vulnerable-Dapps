// src/components/JoinAdventure.js

import React, { useState } from 'react';
import Web3 from 'web3';
import { abi, address } from '../contracts/contractInfo';

const JoinAdventure = () => {
  const [playerName, setPlayerName] = useState('');

  const joinAdventure = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask!');
      return;
    }

    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abi, address);
    const accounts = await web3.eth.requestAccounts();

    try {
      await contract.methods.joinAdventure().send({ from: accounts[0], value: web3.utils.toWei('2', 'ether') });
      alert(`${playerName}, you have successfully joined the treasure hunt!`);
    } catch (error) {
      console.error('Error joining the adventure:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />
      <button onClick={joinAdventure}>Enter the Treasure Hunt</button>
    </div>
  );
};

export default JoinAdventure;
