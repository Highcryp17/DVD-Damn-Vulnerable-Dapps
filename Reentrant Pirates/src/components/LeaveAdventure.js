// src/components/LeaveAdventure.js

import React from 'react';
import Web3 from 'web3';
import { abi, address } from '../contracts/contractInfo';

const LeaveAdventure = () => {
  const leaveAdventure = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask!');
      return;
    }

    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abi, address);
    const accounts = await web3.eth.requestAccounts();

    try {
      await contract.methods.leaveAdventure().send({ from: accounts[0] });
      alert('You have successfully left the quest!');
    } catch (error) {
      console.error('Error leaving the adventure:', error);
    }
  };

  return <button onClick={leaveAdventure}>Leave the Quest</button>;
};

export default LeaveAdventure;
