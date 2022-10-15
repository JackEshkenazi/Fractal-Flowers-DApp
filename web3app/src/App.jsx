import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import { ethers } from 'ethers'
import './App.css'

import FractalFlowers from '../artifacts/contracts/FractalFlowers.sol/FractalFlowers.json'
import Install from '../components/Install'
import WalletBalance from '../components/WalletBalance'
// import NFTImage from '../components/NFTImage'

console.log(FractalFlowers.abi);
const contractAddress = "0x9A676e781A523b5d0C0e43731313A708CB607508";

const provider = new ethers.providers.Web3Provider(window.ethereum);

// This is the end user
const signer = provider.getSigner();

console.log('here though');
// This is the smart contract
const contract = new ethers.Contract(contractAddress, FractalFlowers.abi, signer);
// console.log(contract)

function App() {
  const [count, setCount] = useState(0);
  const [totalMinted, setTotalMinted] = useState(0);

  const getCount = async () => {
    const count = await contract.count();
    console.log(count);
    setTotalMinted(parseInt(count));
  }

  useEffect(() => {
    getCount();
  }, [])


  if (window.ethereum) {
    return (
      <div className="App">
        <WalletBalance/>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
        </div>
        <div>
          <h1>FractalFlowers NFT collection</h1>
          {Array(totalMinted + 1).fill(0).map((_, i) => {
            return(
            <div key={i}>
              <NFTImage tokenId={i} getCount={getCount}/>
            </div>
            )
          })}
        </div>
      </div>
    )
  } else {
    return <Install/>
  }
}

function NFTImage({ tokenId, getCount }) {
  const contentId = 'QmeEgApekEy9P1WiRqphQ9mXyiqP99UU3UZo9w2PdWkNyD';
  const metaDataURI = `${contentId}/flowers_${tokenId}.json`;
  const placeholderImageURI = `https://gateway.pinata.cloud/ipfs/QmZfiqwboNTAXvtFr6FrmShuWy35viADUju9YpoFyKiKyM`;
  const imageURI = `https://gateway.pinata.cloud/ipfs/${contentId}/flower_${tokenId}.png`;

  const [isMinted, setIsMinted] = useState(false);

  useEffect(() => {
      getMintedStatus();
      console.log('we in here');
  }, [])

  const getMintedStatus = async () => {
      const result = await contract.isContentOwned(metaDataURI);
      console.log(result);
      setIsMinted(result);
  }

  const mintToken = async () => {
      const connection = contract.connect(signer);
      const address = connection.address;
      const result = await contract.payToMint(address, metaDataURI, {
          value: ethers.utils.parseEther('0.05'),
      });

      await result.wait();
      getMintedStatus();
      getCount();
  }

  async function getUri() {
      const uri = await contract.tokenURI(tokenId);
      alert(uri);
  }

  return (
      <div>
          <img src={isMinted ? imageURI : placeholderImageURI}></img>
          <div>
              <h5>ID #{tokenId}</h5>
              {!isMinted ? (
                  <button onClick={mintToken}>MINT</button>
              ) : (
                  <button onClick={getUri}>Show URI</button>
              )}
          </div>
      </div>
  )

}

export default App
