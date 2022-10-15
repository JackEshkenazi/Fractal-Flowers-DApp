const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Nft", function () {
    it("Should mint and transfer an NFT to someone", async function () {
        const FractalFlowers = await ethers.getContractFactory("FractalFlowers");
        const fractalFlowers = await FractalFlowers.deploy();
        await fractalFlowers.deployed();

        // This is account #1 gotten from running `npx hardhat node`
        const recipient = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';

        const metaDataURI = 'cid/test.png';
        
        let balance = await fractalFlowers.balanceOf(recipient);
        expect(balance).to.equal(0);

        const newlyMintedToken = await fractalFlowers.payToMint(recipient, metaDataURI, { value: ethers.utils.parseEther('0.05') });

        // wait until the transaction is mined
        await newlyMintedToken.wait();

        balance = await fractalFlowers.balanceOf(recipient);
        expect(balance).to.equal(1);

        expect(await fractalFlowers.isContentOwned(metaDataURI)).to.equal(true);
        const newlyMintedToken2 = await fractalFlowers.payToMint(recipient, 'foo', { value: ethers.utils.parseEther('0.05') })
    });
});