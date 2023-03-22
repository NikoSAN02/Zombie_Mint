import { Checkbox, Button } from '@mui/material';
import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/data/dataActions";
import NFTImage from "./NFTImage";
import BigNumber from "bignumber.js";
import bgImage from "../styles/backgroundImage3.png"

import graybg from "../Images/GrayBackground.png"
import { fontSize } from '@mui/system';

const HomePage = () => {

  let [tokenIDs, setTokenIDs] = useState([]);
  
  const [selectedTokenIds, setSelectedTokenIds] = useState([]);
  const dispatch = useDispatch();
  var [faction1, setFaction1] = useState([]);
  var [faction2, setFaction2] = useState([]);
  var [faction3, setFaction3] = useState([]);
  var [zombieSupply, setZombieSupply] = useState([]);
  var [isApprovedForAll, setIsApprovedForAll] = useState([]);
  var [zombieCount, setZombieCount] = useState([]);

  const blockchain = useSelector((state) => state.blockchain);

  const lockerContractAddress = "0xAca1abD329cdd2B573f259b2457ac4A77b0dd6a7"; //mainnet

  async function getTokenIds(){ 
  
    if(blockchain.CGBSmartContract){
      tokenIDs = await blockchain.CGBSmartContract.methods.getWalletOfOwner(blockchain.account).call();
      //console.log(tokenIDs);
      //fetchImages();
      setTokenIDs(tokenIDs);
    }
  }
  
  async function isApprovedCGB()
  {
    if(blockchain.account && blockchain.CGBSmartContract)
    {
      isApprovedForAll = await blockchain.CGBSmartContract.methods.isApprovedForAll(blockchain.account, lockerContractAddress).call();
      //console.log("isapprovedCGB");
      //console.log(isApprovedForAll);
      setIsApprovedForAll(isApprovedForAll);
    }
  }

  async function getFactionCount(){
    
    if(blockchain.GorLocSmartContract)
    {
      faction1 = await blockchain.GorLocSmartContract.methods.factionBurnCount(0).call();
      setFaction1(faction1);
      //console.log(faction1);
      faction2 = await blockchain.GorLocSmartContract.methods.factionBurnCount(1).call();
      setFaction2(faction2);
      //console.log(faction2);
      faction3 = await blockchain.GorLocSmartContract.methods.factionBurnCount(2).call();
      setFaction3(faction3);
      //console.log(faction3);
      zombieSupply = await blockchain.ZFSmartContract.methods.totalSupply().call();
      setZombieSupply(zombieSupply);
    }
  } 

  const handleCheckboxChange = (tokenId) => {
   
    if (selectedTokenIds.includes(tokenId)) {
      setSelectedTokenIds(selectedTokenIds.filter((id) => id !== tokenId));
    } else {
      setSelectedTokenIds([...selectedTokenIds, tokenId]);
    }
    //console.log(selectedTokenIds);
  };

  async function safeApprovalCGB(){
    var safeApproval = await blockchain.CGBSmartContract.methods.setApprovalForAll(lockerContractAddress,true)
    .send({
      gas: "185000",
      from: blockchain.account,
    });
    isApprovedCGB();
  }

  async function mintNFT()  {
   
    //console.log(selectedTokenIds.length);
    if(selectedTokenIds.length < 3){
      alert("Please select atleast 3 CGB to mint");
    }
    else{
      if(selectedTokenIds.length%3 === 0)
      {
        const multiplier = selectedTokenIds.length/3;
        const mintPrice = 75*multiplier;
        const gasPriceVal = 585000*multiplier;

        //console.log(mintPrice);
        //const estGas = await blockchain.ZFSmartContract.methods.mint(selectedTokenIds).estimateGas({ from: blockchain.account });
        //console.log(estGas);
        await blockchain.ZFSmartContract.methods.mint(selectedTokenIds).send({
          gas: gasPriceVal,
          from: blockchain.account,
          value: blockchain.web3.utils.toWei((mintPrice).toString(), "ether"),
        }).once("error", (err) => {
          console.log(err);
          alert("Error occured while minting");
        })
        .then((receipt) => {
          alert("Mint Successful");
          dispatch(fetchData());
          getTokenIds();
          getWalletZombies();
        });
      }
      else{
          alert("Select NFTs in the multiple of 3");
      }
      
    }
  };

  async function getWalletZombies()  {

    if(blockchain.account && blockchain.ZFSmartContract){
      zombieCount = await blockchain.ZFSmartContract.methods.getWalletOfOwner(blockchain.account).call();
      //console.log(zombieCount.length);
      setZombieCount(zombieCount);
    }

  }

  useEffect(() => {
    getTokenIds();
    getFactionCount();
    isApprovedCGB();
    getWalletZombies();
  }, [blockchain.account]);

  return (
    <body style={{background: `url(${bgImage}) no-repeat center center fixed`, backgroundSize: 'cover', height: '100vh'}}>
    <main >
      
      <div className='Notes desc  '>

      <label className=' newFont' > To receive a Zombie you must have 3 gorillas from either Aqua, Ignis or Terra. (Excluding Mafia) + \
      75 CRO 700 Aqua, Ignis and Terra will be burnt giving us Zombies 
      Any combination of the 3 factions will work with a cap of 700 each. </label>
      </div>

      <div className='faction desc'>
         <div><label className='newFont' > BURN METER = </label> 
         
         <label className='newFont' > Aqua: </label>
          <label className='newFont' > {faction1} </label>
        
        <label className='newFont' > Ignis:</label>
          <label className='newFont' >{faction2} </label>
        
        <label className='newFont' > Terra: </label>
          <label className='newFont' >{faction3} </label>
        </div>
        <div>
        <label className='newFont' > Zombie Minted = {zombieSupply}/700 </label>
        </div>
        <div>
        <label className='newFont' > You minted {zombieCount.length} </label>
        </div>
      </div>




      <div className='imageBundle'>


        {tokenIDs.map((tokenID, index) => (
          
        <label className='imageWcheck' > 

        { tokenID <= 1000 ? null : ( 
        <> 
          { !((tokenID > 1000 && tokenID < 2701 && faction1<700) || (tokenID > 2700 && tokenID < 4401 && faction2<700) || (tokenID > 4400 && tokenID <= 6100 && faction3<700))? null : ( 
        <>
          <NFTImage  key={tokenID} imageUrl={`https://cmb.mypinata.cloud/ipfs/QmRiiD1GGx31PHDNQXywh5QTwcyE92e1BubsqhFLFPq6aC/${tokenID}`+`.png`} />
        
          <input className='checkit' type="checkbox" value={tokenID} onChange={() => handleCheckboxChange(tokenID)}/>
        </> 
        ) } </> )} 
        
        </label> ))} 
        

      </div>

      

      { blockchain.account == null ? null : ( 
      <div className='MintButton'  >
        { isApprovedForAll ? (
        <>     
        <Button style={{background:"#ef476f", borderRadius:"0px", color:"#d8d8d8" }} onClick={mintNFT}>
          <a style={{fontSize:"20px"}} className='newFont mintHover '> Mint</a>
        </Button>
        </>
            ): (
        <Button style={{background:"#ef476f", borderRadius:"0px", color:"#d8d8d8" , }} onClick={safeApprovalCGB}>
          <a style={{fontSize:"20px"}} className='newFont mintHover '>Approve</a>
        </Button>)}
      </div>)
      }


</main>
  </body>
   
  );
}


export default HomePage