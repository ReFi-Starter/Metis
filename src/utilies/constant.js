
export const TokenCreator_Contract_Address = "0xdcB3987514A96F7675De5a2Aa245A5628b3293ed";
export const TokenCreator_Contract_ABI = [
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "ContractAddresses",
      "outputs": [
        {
          "internalType": "contract Token",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "ContractArray",
      "outputs": [
        {
          "internalType": "contract Token",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "symbol",
          "type": "string"
        },
        {
          "internalType": "address payable",
          "name": "__mktgWallet",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_totalsupply",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_mrktingfee",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_devfee",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_liqdtyfee",
          "type": "uint256"
        }
      ],
      "name": "CreateNewtoken",
      "outputs": [
        {
          "internalType": "contract Token",
          "name": "_token",
          "type": "address"
        }
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]