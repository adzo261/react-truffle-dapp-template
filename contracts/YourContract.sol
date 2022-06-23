// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract YourContract {

	string public greeter = "hello";

	function setGreeter(string memory _greeter) public {
        greeter = _greeter;
    }

}

