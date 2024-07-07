// src/components/ViewContractBalance.js

import React, { useState } from 'react';
import Web3 from 'web3';
import { abi, address } from '../contracts/contractInfo';

const ViewContractBalance = () => {
  const [balance, setBalance] = useState('');

  const getContractBalance = async () => {
    if (!window.ethereum) {
      alert('Please install MetaMask!');
      return;
    }

    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(abi, address);

    try {
      const balance = await contract.methods.getContractBalance().call();
      setBalance(web3.utils.fromWei(balance, 'ether'));
    } catch (error) {
      console.error('Error getting contract balance:', error);
    }
  };

  return (
    <div>
      <button onClick={getContractBalance}>View Contract Balance</button>
      {balance && <p id="contractBalance">Contract Balance: {balance} ETH</p>}
    </div>
  );
};

export default ViewContractBalance;
