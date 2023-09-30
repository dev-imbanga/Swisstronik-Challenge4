
const hre = require("hardhat");
const { encryptDataField, decryptNodeResponse } = require("@swisstronik/swisstronik.js");

process.on('uncaughtException', function (err) {
  console.log(err);
});

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
    const mintTx = await sendShieldedTransaction(signer, CONTRACT_ADDRESS, contract.interface.encodeFunctionData("mint", [NUMBER]), 0);
    await mintTx.wait();
    console.log("Transaction Receipt: ", mintTx);
}
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
})

//hash: '0xa2b9657a70547b3b1d2aa036c72f2e2dafeb5fe28d477a78a474aba90a1eac3d'