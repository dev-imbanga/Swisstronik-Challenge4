const hre = require("hardhat");
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/swisstronik.js");

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const NUMBER = 10;
ADDRESS_TO_RECEIVE= "0x16af037878a6cAce2Ea29d39A3757aC2F6F7aac1";

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
    const mintTx = await sendShieldedTransaction(signer, CONTRACT_ADDRESS, contract.interface.encodeFunctionData("transfer", [ADDRESS_TO_RECEIVE, NUMBER]), 0);
    await mintTx.wait();
    console.log("Transaction Receipt: ", mintTx);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})

//hash: '0x8d3f3f8660cca18492552c7619d92349868e1564cc42ce9e06bf44207c5e5c0b'

