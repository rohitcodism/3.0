
import './App.css'
import { ethers } from 'ethers'
import { walletAddress, walletABI } from '../../../Server/interactionSC'
import { useState } from 'react';
function App() {


  const [clicked, setClicked] = useState(false);

  const [uClicked, setUClicked] = useState(false);

  const [balance, setBalance] = useState(0);

  const [address, setAddress] = useState(``);

  const [userAddress, setUserAddress] = useState(``);

  const [userBalance, setUserBalance] = useState(0);



  const writeContract = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send(`eth_requestAccounts`, []);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(walletAddress, walletABI, signer);
    const valueC = await contract.getBalance();
    setBalance(valueC);
    await contract.sendEthContract({ value: ethers.parseEther("0.02") })
  }

  const fetchContractBalance = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(walletAddress, walletABI, signer);
    const valueC = ethers.formatEther(await contract.getBalance());
    setBalance(valueC);
  }

  const sendEtherUser = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send(`eth_requestAccounts`, []);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(walletAddress, walletABI, signer);
    try{
      await contract.sendEthUser(`${address}`, {value : ethers.parseEther("0.0005")})
    }catch(error){
      console.log(error);
    }
  }

  const fetchUserBalance = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(walletAddress, walletABI, signer);
    const valueU = ethers.formatEther(await contract.accountBalance(userAddress));
    console.log(valueU);
    setUserBalance(valueU);
  }



  return (
    <>
      <h1>Alphamask</h1>
      <div>
        <button onClick={() => { writeContract() }}>Send Ether to Contract</button>
        <br />
        {clicked ? <h3>{balance} ethers</h3> : null}
        <br />
        {!clicked ? <button onClick={() => { setClicked(!clicked); fetchContractBalance(); }}>Fetch contract balance</button> : <button onClick={() => {setClicked(!clicked)}}>Hide Contract Balance</button>}
        {console.log(balance)}
        <br />
        <br />
        <form>
          <input type="text"  onChange={(e) => {setAddress(e.target.value)}}/>
        </form>
        <br />
        <button onClick={() => {sendEtherUser(); document.getElementById('addr').value = "";}}>Send Ether</button>
        <br />
        <br />
        <form >
          <input type="text"  onChange={(e) => {setUserAddress(e.target.value)}}/>
        </form>
        <br />
        {uClicked ? <h3>{userBalance} ethers</h3> : null}
        <br />
        {!uClicked ? <button onClick={() => { setUClicked(!uClicked); fetchUserBalance(); }}>Fetch User balance</button> : <button onClick={() => {setUClicked(!uClicked)}}>Hide User Balance</button>}
      </div>
    </>
  )
}

export default App
