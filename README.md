Token Minter DApp on Metis Blockchain
Overview
This repository contains the smart contracts and DApp interface for a Token Minter application built on the Metis Blockchain. The Token Minter allows users to create and deploy custom ERC-20 tokens seamlessly, leveraging Metis's Layer 2 scalability, low transaction costs, and developer-friendly environment.

Features
Token Customization: Users can specify token name, symbol, total supply, and decimals.
ERC-20 Standard: Generated tokens are fully compliant with the ERC-20 standard.
Metis Integration: Deployed smart contracts run on Metis Layer 2, ensuring high performance and low gas fees.
Secure and Audited: Smart contracts are optimized for security and have been reviewed for vulnerabilities.
User-Friendly DApp: Intuitive interface for token deployment and wallet connectivity.
Installation
Clone the Repository:

bash
Copy code
git clone https://github.com/<your-repo-name>.git
cd <your-repo-name>
Install Dependencies:

bash
Copy code
npm install
Setup Environment Variables: Create a .env file with the following variables:

env
Copy code
PRIVATE_KEY=your_wallet_private_key
METIS_RPC_URL=https://andromeda.metis.io/?owner=<owner_address>
Compile Smart Contracts:

bash
Copy code
npx hardhat compile
Deploy Contracts:

bash
Copy code
npx hardhat run scripts/deploy.js --network metis
Usage
Connect Wallet: The DApp supports Metamask. Ensure your wallet is connected to the Metis network.

Token Deployment:

Enter token details (name, symbol, supply, decimals) on the DApp interface.
Click "Mint Token" to deploy the token on the Metis Blockchain.
View Tokens: Once minted, the contract address and token details will be displayed.

Project Structure
contracts/: Contains the Solidity smart contracts for the Token Minter.
scripts/: Deployment and interaction scripts.
frontend/: DApp interface built with ReactJS.
test/: Unit tests for the smart contracts using Hardhat and Chai.
Requirements
Node.js v16+
Metamask Wallet
Hardhat Framework
Metis RPC endpoint
Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or features you’d like to add.

License
This project is licensed under the MIT License.
