# NFT Minting App For FractalFlowers Collection

This project demonstrates a basic NFT minting website.

My art pieces are generated from the Multibrot set by giving it random exponents. These are hosted and fetched from IPFS through Pinata.

To access the collection, make sure you have a MetaMask local network connected, with ChainId 31337. Next, import an account with one of the private keys generated from `npx hardhat node`.

These are the important shell commands, and can be run in this order.
```shell
npx hardhat run scripts/deploy.js
npx hardhat test
npx hardhat node

cd web3app
npm run dev
```
