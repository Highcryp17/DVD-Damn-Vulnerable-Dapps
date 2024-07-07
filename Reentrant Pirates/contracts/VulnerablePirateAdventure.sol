// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VulnerablePirateAdventure {
    mapping(address => uint256) public pirates;
    uint256 public constant entryFee = 2 ether;
    uint256 public constant earlyExitFee = 1 ether;

    // Function for players to join the adventure
    function joinAdventure() public payable {
        require(msg.value >= entryFee, "Deposit must be at least 2 Ether");

        // Record only the entry fee
        pirates[msg.sender] = entryFee;

        // Refund any excess amount
        if (msg.value > entryFee) {
            uint256 excessAmount = msg.value - entryFee;
            (bool refundSuccess, ) = msg.sender.call{value: excessAmount}("");
            require(refundSuccess, "Refund failed");
        }

        // Log the received value
        emit LogReceived(msg.sender, msg.value);
    }

    event LogReceived(address indexed sender, uint256 value);
    event LogLeaving(address indexed sender, uint256 deposit, uint256 refund);

    // Function to claim the treasure (i.e., withdraw the initial deposit)
    function claimTreasure() public {
        uint256 treasure = pirates[msg.sender];
        require(treasure > 0, "No treasure to claim");

        // Update state before making the external call
        pirates[msg.sender] = 0;

        // Send the Ether back to the user
        (bool success, ) = msg.sender.call{value: treasure}("");
        require(success, "Transfer failed");
    }

    // Function to leave the adventure early with a fee
    function leaveAdventure() public {
        uint256 deposit = pirates[msg.sender];
        require(deposit == entryFee, "Invalid deposit amount");

        uint256 refund = deposit - earlyExitFee;
        require(refund > 0, "Refund amount must be greater than zero");

        // Log the leaving event
        emit LogLeaving(msg.sender, deposit, refund);

        // Vulnerable part: external call is made before state update
        (bool success, ) = msg.sender.call{value: refund}("");
        require(success, "Transfer failed");

        // Update state after making the external call
        pirates[msg.sender] = 0;
    }

    // Function to view the contract balance
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
