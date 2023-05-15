// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

contract GameVault {
    mapping(address => mapping(address => bool)) public accessAsset; // mapping to store access control list
    mapping(address => uint256) public earnings; // mapping to store expert earnings

    function buyAsset(address author, address user) external payable {
        require(msg.value > 0, "Payment required to buy asset");
        accessAsset[author][user] = true; // grant access to user
        earnings[author] += msg.value; // register earnings for author
    }

    function withdrawEarnings() external {
        uint256 amount = earnings[msg.sender]; // get earnings for author
        earnings[msg.sender] = 0; // set earnings to 0
        require(amount > 0, "No earnings to withdraw");

        earnings[msg.sender] = 0; // set earnings to 0
        (bool sent, bytes memory data) = msg.sender.call{value: amount}(""); // transfer earnings to author
        require(sent, "Failed to send Ether");
    }
}
