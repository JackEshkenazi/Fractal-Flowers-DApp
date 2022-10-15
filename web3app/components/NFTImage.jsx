import { useState } from "react";
import { Contract, ethers } from "ethers";
import { useEffect } from "react";

const HARDCODED_IMAGES_FOLDER = '../../art/nft_images'

const NFTImage = ({token_id, getCount}) => {
    const contentId = 'QmNvwrS13hHBgmizMdzx4BMjkaLKinoDT1Vrqd4zQQqzZa';
    const metaDataURI = `${contentId}/flowers${token_id}.json`;
    const imageURI = `../../art/nft_images/flower${token_id}.png`;

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
        const uri = await contract.tokenURI(token_id);
    }

    return (
        <div>
            <img src={isMinted ? imageURI : '../../art/nft_images/placeholder.png'}></img>
            <div>
                <h5>ID #{token_id}</h5>
                {!isMinted ? (
                    <button onClick={mintToken}>MINT</button>
                ) : (
                    <button onClick={getUri}>Show URI</button>
                )}
            </div>
        </div>
    )

};

export default NFTImage;