// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Inbox{
    string public message;
    constructor(string memory initialMsg){
        message = initialMsg;
    }

    function setMsg (string memory newMsg) public {
        message = newMsg;
    }

}