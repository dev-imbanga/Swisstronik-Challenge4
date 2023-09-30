
const hre = require("hardhat");
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/swisstronik.js");

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const NUMBER = 10;

const sendShieldedTransaction = async (signer, destination, data, value) => {
    const RPC_URL = hre.network.config.url;
    const [encryptedData] = await encryptDataField(RPC_URL, data);
    return await signer.sendTransaction({
        from: signer.address,
        to: destination,
        data: encryptedData,
        value,
    });
}

async function main() {
    const [signer] = await hre.ethers.getSigners();
    const contractFactory = await hre.ethers.getContractFactory("SwissToken");
    const contract = contractFactory.attach(CONTRACT_ADDRESS);
    const burnTx = await sendShieldedTransaction(signer, CONTRACT_ADDRESS, contract.interface.encodeFunctionData("burn", [NUMBER]), 0);
    await burnTx.wait();
    console.log("Transaction Receipt: ", burnTx);
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})