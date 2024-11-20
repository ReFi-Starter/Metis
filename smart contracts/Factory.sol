//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.20;

import "./erc20token.sol";

contract Factory {
   Token[] public ContractArray;
   mapping(address =>Token[]) public ContractAddresses;


   function CreateNewtoken(string memory name,string memory symbol,address payable __mktgWallet,uint256 _totalsupply,uint256 _mrktingfee,uint256 _devfee,uint256 _liqdtyfee ) public returns(Token _token){
     Token token = new Token(name,symbol,__mktgWallet,_totalsupply,_mrktingfee,_devfee,_liqdtyfee,payable(msg.sender));
     ContractAddresses[msg.sender]=[token];
     ContractArray.push(token);
     return(token);

   }

}