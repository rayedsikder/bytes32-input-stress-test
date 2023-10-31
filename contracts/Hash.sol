// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Lock {

    mapping (bytes32 => bytes32) public hashes;

    event hashPushed (bytes32[] indexed hashKey, bytes32[] indexed hashValue);

    function insertHash(bytes32[] calldata key, bytes32[] calldata value) external  {
        for (uint i = 0; i < key.length; i++) {
            if (hashes[key[i]] != 0x0) {
                revert("Key already exists");
            }
            hashes[key[i]] = value[i];
        }
        emit hashPushed(key, value);
    }
}
