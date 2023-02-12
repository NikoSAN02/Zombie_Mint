import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/data/dataActions";
import NFTImage from "./NFTImage";
import { Button, Card, Tab, Tabs } from '@mui/material';
import { width } from '@mui/system';


const StakingPage = () => {
    const [value, setValue] = React.useState(2);
    const blockchain = useSelector((state) => state.blockchain);
    const [selectedTokenIds, setSelectedTokenIds] = useState([]);
    let [tokenIDsCGB, setTokenIDsCGB] = useState([]);
    let [tokenIDsZB, setTokenIDsZB] = useState([]);
    let [tokenIDsCMB, setTokenIDsCMB] = useState([]);
    let [tokenIDsOG, setTokenIDsOG] = useState([]);
    let [tokenIDsCPT, setTokenIDsCPT] = useState([]);


    async function getNFTOwnedByUser(){
      if(blockchain.account && blockchain.CroStkSmartContract)
    {

      const collectionZB = '0x5a47420000000000000000000000000000000000000000000000000000000000';
      const collectionCGB = '0x4347420000000000000000000000000000000000000000000000000000000000';
      const collectionCMB = '0x434d420000000000000000000000000000000000000000000000000000000000';
      const collectionOG = '0x5a47420000000000000000000000000000000000000000000000000000000000';
      const collectionCPT = '0x4f47000000000000000000000000000000000000000000000000000000000000';


      tokenIDsZB = await blockchain.CroStkSmartContract.methods.tokensOfWallet(blockchain.account, collectionZB).call();
      console.log(tokenIDsZB);
      setTokenIDsZB(tokenIDsZB);
      tokenIDsCGB = await blockchain.CroStkSmartContract.methods.tokensOfWallet(blockchain.account, collectionCGB).call();
      console.log(tokenIDsCGB);
      setTokenIDsCGB(tokenIDsCGB);
      tokenIDsCMB = await blockchain.CroStkSmartContract.methods.tokensOfWallet(blockchain.account, collectionCMB).call();
      console.log(tokenIDsCMB);
      setTokenIDsCMB(tokenIDsCMB);
      tokenIDsOG = await blockchain.CroStkSmartContract.methods.tokensOfWallet(blockchain.account, collectionOG).call();
      console.log(tokenIDsOG);
      setTokenIDsOG(tokenIDsOG);
      const tokenIDsCPT = await blockchain.CroStkSmartContract.methods.tokensOfWallet(blockchain.account, collectionCPT).call();
      console.log(tokenIDsCPT);
      setTokenIDsCPT(tokenIDsCPT);

    }
    }

    const handleCheckboxChange = (tokenId) => {
   
      if (selectedTokenIds.includes(tokenId)) {
        setSelectedTokenIds(selectedTokenIds.filter((id) => id !== tokenId));
      } else {
        setSelectedTokenIds([...selectedTokenIds, tokenId]);
      }
      console.log(selectedTokenIds);
    };

    useEffect(() => {
      getNFTOwnedByUser();
    }, [blockchain.account]);

    

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };  return (
    
    <>

    
    <div style={{display:"flex" , justifyContent:"center" , paddingTop:"40px"}}>
    
    <div style={{paddingRight:"20px"}} >
    <Button style={{background:"#ef476f", borderRadius:"0px", color:"#d8d8d8" }} >
          <a style={{fontSize:"12px"}} className='newFont mintHover '> Approve CMB Staking</a>
    </Button>
    </div>

    <div style={{paddingRight:"20px"}} >
    <Button style={{background:"#ef476f", borderRadius:"0px", color:"#d8d8d8"  }} >
          <a style={{fontSize:"12px"}} className='newFont mintHover '> Approve CPTs Staking</a>
    </Button>
    </div>

    </div>


    <div style={{display:"flex" , justifyContent:"center" }}>

    <div style={{paddingRight:"10px" , paddingLeft:"40px" }}>

    <div style={{paddingBottom:"20px" , paddingTop:"40px" }} >
    <div style={{width:"500px",height:"300px", background:"#fff" , borderRadius:"10px", overflowY: "scroll"}}>
        <a style={{display:"flex" , paddingLeft:"10px" , paddingTop:"10px"}} >Available NFTs</a>
        <br/> Zombies <br/>
        {tokenIDsZB.map((tokenID, index) => (
        <>
        <NFTImage  key={tokenID} imageUrl={`https://cmb.mypinata.cloud/ipfs/QmSDx92bvTcZeL7WVyjz92e44LqjvqyKZQACsJ4sCEg4uq/${tokenID}`+`.png`} />
        <input className='checkit' type="checkbox" value={tokenID} onChange={() => handleCheckboxChange(tokenID)}/>
        </>
        )
        )}
        <br/>CGB <br/>
        {tokenIDsCGB.map((tokenID, index) => (
          <>
        <NFTImage  key={tokenID} imageUrl={`https://cmb.mypinata.cloud/ipfs/QmRiiD1GGx31PHDNQXywh5QTwcyE92e1BubsqhFLFPq6aC/${tokenID}`+`.png`} />
        <input className='checkit' type="checkbox" value={tokenID} onChange={() => handleCheckboxChange(tokenID)}/>
        </>
        )
        )}
        <br/>CMB <br/>
        {tokenIDsCMB.map((tokenID, index) => (
          <>
        <NFTImage  key={tokenID} imageUrl={`https://cmb.mypinata.cloud/ipfs/QmWaTZfpZDRbdvkQaC7wjph4nhBPetB4N1FqRp11GLVjLJ/${tokenID}`+`.png`} />
        <input className='checkit' type="checkbox" value={tokenID} onChange={() => handleCheckboxChange(tokenID)}/>
        </>
        )
        )}

        <br/>OG <br/>
        {tokenIDsOG.map((tokenID, index) => (
          <>
        <NFTImage  key={tokenID} imageUrl={`https://bafybeid2qcpqmnet42w7wjl2lurkql2fiscv5ca7quk5utvteu46s2tlau.ipfs.nftstorage.link/`} />
        <input className='checkit' type="checkbox" value={tokenID} onChange={() => handleCheckboxChange(tokenID)}/>
        </>
        )
        )}
        <br/>CPT <br/>
        {tokenIDsCPT.map((tokenID, index) => (
        <>
        <NFTImage  key={tokenID} imageUrl={`https://cmb.mypinata.cloud/ipfs/QmeBWVydfc6tuEBEP8tCUDA4QBJuPXDePHuTFqJ4hvjx3g/${tokenID}`+`.png`} />
        <input className='checkit' type="checkbox" value={tokenID} onChange={() => handleCheckboxChange(tokenID)}/>
        </>
        )
        )}<br/>
        <Button style={{background:"#ef476f", borderRadius:"0px", color:"#d8d8d8"  }} >
          <a style={{fontSize:"12px"}} className='newFont mintHover '> Stake</a>
    </Button>
    </div>
    </div>


    <div style={{paddingTop:"20px" , paddingBottom:"40px" }} >
    <div style={{width:"500px",height:"300px", background:"#fff", borderRadius:"10px"}}>
    <a style={{display:"flex" , paddingLeft:"10px" , paddingTop:"10px"}} >Staked NFT Number</a>
    <br/>
    <div style={{ display:"flex", paddingTop:"10px" , paddingLeft:"10px" , paddingBottom:"10px"}} >
    <Button style={{background:"#ef476f", borderRadius:"0px", color:"#d8d8d8" }} >
          <a style={{fontSize:"12px"}} className='newFont mintHover '> Unstake All</a>
    </Button>
    </div>

    <a style={{display:"flex" , paddingLeft:"10px" , paddingTop:"10px"}} >Staked NFT</a>
    <br/>

    <div style={{display:"flex" , paddingTop:"10px" , paddingLeft:"10px" , paddingBottom:"10px" , justifyContent:"center"}} >
        <Button style={{background:"#ef476f", borderRadius:"0px", color:"#d8d8d8"  }} >
          <a style={{fontSize:"12px"}} className='newFont mintHover '> Unstake</a>
    </Button>
    </div>
    </div>
    </div>
    </div>


    <div style={{paddingLeft:"10px" , paddingRight:"40px" , paddingTop:"40px"}}>
        <div style={{width:"500px",height:"640px", background:"#fff", borderRadius:"10px"}}>
        <Tabs value={value}  onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Your Stats" value={0} />
            <Tab label="Global Stats" value={1} />
            <Tab label="Withdraw" value={2} />
        </Tabs>

        <div style={{paddingBottom:"20px"}} >
        {value === 0 && <div style={{alignItems:""}}> 
            <a style={{display:"flex" , paddingLeft:"10px" , paddingTop:"13px"}} >Staked NFTs: 1 </a>

            <a style={{display:"flex" , paddingLeft:"10px" , paddingTop:"13px"}} >Days passed since last withdrawa: 149</a>

            <a style={{display:"flex" , paddingLeft:"10px" , paddingTop:"13px"}} >$CBP Earned: 360.33</a>

            <a style={{display:"flex" , paddingLeft:"10px" , paddingTop:"13px"}} >Current malus: 0%</a>

            <a style={{display:"flex" , paddingLeft:"10px" , paddingTop:"13px"}} >Available for withdraw: 360.33 $CPB</a>

            <a style={{display:"flex" , paddingLeft:"10px" , paddingTop:"13px"}} >Total Claimed: 0.00 $CPB</a>
          </div>
        }
        {value === 1 && <p>This is the content for Tab 2.</p>}
        {value === 2 && <p>This is the content for Tab 3.</p>}
      </div>


            <Button style={{background:"#ef476f", borderRadius:"0px", color:"#d8d8d8"  }} >
          <a style={{fontSize:"12px"}} className='newFont mintHover '> Claim All</a>
          </Button>

        </div>
    </div>
    </div>
    </>
  )
}

export default StakingPage