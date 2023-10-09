
import './App.css'
import { useEffect } from 'react'
import { ethers } from 'ethers'
import { walletAddress, walletABI } from '../../../Server/interactionSC'
function App() {

  useEffect(() => {
    const writeContract = async () => {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send(`eth_requestAccounts`,[]);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(walletAddress, walletABI, signer);
      const Value = await contract.setValue(3);
    }
    writeContract();
  },[])

  return (
    <>
      <h1>Alphamask</h1>
      <h3></h3>
    </>
  )
}

export default App
