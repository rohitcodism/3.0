// 0xd70b78270c93108224dbb60e21a9a76d3e9c963b
import { ethers } from "ethers";
const provider = new ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/8e7e02fcec8c42109e56ff2e933c552a`)

const walletAddress = `0xd70b78270c93108224dbb60e21a9a76d3e9c963b`

const walletABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_account",
				"type": "address"
			}
		],
		"name": "accountBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getValue",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "sendEthContract",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "_to",
				"type": "address"
			}
		],
		"name": "sendEthUser",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_num",
				"type": "uint256"
			}
		],
		"name": "setValue",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

const ScInteraction = async () => {
    const walletContract = new ethers.Contract(walletAddress, walletABI, provider);

    const contractName = await walletContract.name();
    console.log(`Contract name : ${contractName}`)

    const fetchValue = await walletContract.getValue();
    console.log(`The fetched value is : ${fetchValue}`)

    const contractBalance = await walletContract.getBalance();
    console.log(`Contract Balance : ${ethers.formatEther(contractBalance)}`)

    const userBalance = await walletContract.accountBalance(`0xe82317898d1A680Ab866DFf6b0D90711A665393B`)
    console.log(`User balance : ${ethers.formatEther(userBalance)}`);
}

ScInteraction();