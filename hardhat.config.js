require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.9",
  networks:{
    swisstronik:{
      url: process.env.SWISS_RPC_URL,
      accounts:[process.env.PRIVATE_KEY],
    }
  }
};
