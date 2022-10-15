require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  paths: {
    artifacts: './web3app/artifacts',
  },
  networks: {
    matic: {
      url: 'https://polygon-mainnet.g.alchemy.com/v2/SHFMo0FpMHiI4FW7VLLlPONLVLwmCI1U',
      accounts: ["59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d"]
    }
  }
};
