
const hre = require("hardhat");

async function main() {
  const contract = await hre.ethers.deployContract("SwissToken");
  await contract.waitForDeployment();
  console.log(`Deployed at ${contract.target}`)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// contract address: 0x5FbDB2315678afecb367f032d93F642f64180aa3
