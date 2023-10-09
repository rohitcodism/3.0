import { ethers } from "ethers";
const provider = new ethers.JsonRpcProvider(`https://mainnet.infura.io/v3/8e7e02fcec8c42109e56ff2e933c552a`)

const queryBlockChain = async () => {
    const block = await provider.getBlockNumber();
    console.log(`Current Block Number : ${block}`);

    const balance = await provider.getBalance(`0xf8238a3dd9a67b8419412eDE613A06D73Ffc2D93`);
    console.log(`Your account balance is : ${balance}`);

    const formattedBalance = ethers.formatEther(balance);
    console.log(`Formatted Balance : ${formattedBalance}`);

    const formattedWEIBalance = ethers.formatUnits(`${balance}`, "wei");
    console.log(`Wei Balance : ${formattedWEIBalance}`);

    const parsedGWEIBalance = ethers.parseUnits(`${balance}`, "gwei");
    console.log(`gWei Balance : ${parsedGWEIBalance}`);
};

queryBlockChain();