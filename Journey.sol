// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.13;

contract Journey{
    //responsible for storing all informations about;
    struct returningEverything{string data; string publisher; string travel; string lastLocation;}
    returningEverything informations;
    //creating smart contract with information which can't change
    constructor(string memory _data, string memory _publisher, string memory _travel, string memory _lastLocation) payable{
        //finding out if the last recorded position by the sensor is the same that destiny.
        //require(keccak256(bytes(_lastLocation)) == keccak256(bytes(_travel[1])), "has not arrived yet.");
        informations.data = _data;
        informations.publisher = _publisher;
        informations.travel = _travel;
        informations.lastLocation = _lastLocation;
    }
    //function that returns everything
    function getAllInfo() public view returns(returningEverything memory){
        return informations;
    }
    //function that returns just the information that the sensor got
    function getData() public view returns(string memory){
        return informations.data;
    }
    //we do not need to return all data, just the hash of them.
    function getHashData() public view returns(bytes32){
        return sha256(bytes(informations.data));
    }
    //function that returns the person who publicated the journey
    function getpublisher() public view returns(string memory){
        return informations.publisher;
    }
    //function that returns the origin and destiny of the journey
    function getTravel() public view returns(string memory){
        return informations.travel;
    }
}
