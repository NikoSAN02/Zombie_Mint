import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/data/dataActions";
import NFTImageStaking from "./NFTImageStaking";
import { Button, Card, Tab, Tabs } from '@mui/material';
import { width } from '@mui/system';


const StakingPage = () => {
    const [value, setValue] = React.useState(2);
    const blockchain = useSelector((state) => state.blockchain);
    var [isApprovedForAllCGB, setIsApprovedForAllCGB] = useState([]);
    var [isApprovedForAllCMB, setIsApprovedForAllCMB] = useState([]);
    var [isApprovedForAllCPT, setIsApprovedForAllCPT] = useState([]);
    var [isApprovedForAllOG, setIsApprovedForAllOG] = useState([]);
    var [isApprovedForAllZF, setIsApprovedForAllZF] = useState([]);
    
    var [collectionArray, setCollectionArray] = useState(null);
    var [tokenIdsArray, setTokenIDsArray] = useState(null);

    const stakingLockerContract = process.env.REACT_APP_STK_LOCKER_CONTRACT_ADD;//"0xf0A8a7F43e2B65261228bb6E8622308D5798743c";
    const stakingContract = process.env.REACT_APP_CRO_STK_CONTRACT_ADD;

    let [tokenIDsCGB, setTokenIDsCGB] = useState([]);
    let [tokenIDsZB, setTokenIDsZB] = useState([]);
    let [tokenIDsCMB, setTokenIDsCMB] = useState([]);
    let [tokenIDsOG, setTokenIDsOG] = useState([]);
    let [tokenIDsCPT, setTokenIDsCPT] = useState([]);

    let [stakedTokenIDsCGB, setStakedTokenIDsCGB] = useState([]);
    let [stakedTokenIDsZB, setStakedTokenIDsZB] = useState([]);
    let [stakedTokenIDsCMB, setStakedTokenIDsCMB] = useState([]);
    let [stakedTokenIDsOG, setStakedTokenIDsOG] = useState([]);
    let [stakedTokenIDsCPT, setStakedTokenIDsCPT] = useState([]);


    const collectionZB = '0x5a47420000000000000000000000000000000000000000000000000000000000';
    const collectionCGB = '0x4347420000000000000000000000000000000000000000000000000000000000';
    const collectionCMB = '0x434d420000000000000000000000000000000000000000000000000000000000';
    const collectionOG = '0x4f47000000000000000000000000000000000000000000000000000000000000';
    const collectionCPT = '0x4350540000000000000000000000000000000000000000000000000000000000';

    async function getNFTOwnedByUser(){
      if(blockchain.account && blockchain.CroStkSmartContract)
      {
        tokenIDsZB = await blockchain.CroStkSmartContract.methods.tokensOfWallet(blockchain.account, collectionZB).call();
        setTokenIDsZB(tokenIDsZB);
        tokenIDsCGB = await blockchain.CroStkSmartContract.methods.tokensOfWallet(blockchain.account, collectionCGB).call();
        setTokenIDsCGB(tokenIDsCGB);
        tokenIDsCMB = await blockchain.CroStkSmartContract.methods.tokensOfWallet(blockchain.account, collectionCMB).call();
        setTokenIDsCMB(tokenIDsCMB);
        tokenIDsOG = await blockchain.CroStkSmartContract.methods.tokensOfWallet(blockchain.account, collectionOG).call();
        setTokenIDsOG(tokenIDsOG);
        const tokenIDsCPT = await blockchain.CroStkSmartContract.methods.tokensOfWallet(blockchain.account, collectionCPT).call();
        setTokenIDsCPT(tokenIDsCPT);
    }
    unCheckAllCheckboxes();
    }

    async function getNFTStakedByUser(){
      if(blockchain.account && blockchain.CroStkSmartContract)
      {
        stakedTokenIDsZB = await blockchain.CroStkSmartContract.methods.getUserStakedTokensByCollection(blockchain.account, collectionZB).call();
        setStakedTokenIDsZB(stakedTokenIDsZB);
        stakedTokenIDsCGB = await blockchain.CroStkSmartContract.methods.getUserStakedTokensByCollection(blockchain.account, collectionCGB).call();
        setStakedTokenIDsCGB(stakedTokenIDsCGB);
        stakedTokenIDsCMB = await blockchain.CroStkSmartContract.methods.getUserStakedTokensByCollection(blockchain.account, collectionCMB).call();
        setStakedTokenIDsCMB(stakedTokenIDsCMB);
        stakedTokenIDsOG = await blockchain.CroStkSmartContract.methods.getUserStakedTokensByCollection(blockchain.account, collectionOG).call();
        setStakedTokenIDsOG(stakedTokenIDsOG);
        const stakedTokenIDsCPT = await blockchain.CroStkSmartContract.methods.getUserStakedTokensByCollection(blockchain.account, collectionCPT).call();
        setStakedTokenIDsCPT(stakedTokenIDsCPT);
    }
    unCheckAllCheckboxes();
    }

    //uncheck all the checkboxes on refresh
    function unCheckAllCheckboxes(){
      // Get a reference to each checkbox element
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');

      // Loop through each checkbox and uncheck it
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
    }

    async function isApprovedAll()
    {
      if(blockchain.account && blockchain.CGBSmartContract)
      {
        isApprovedForAllCGB = await blockchain.CGBSmartContract.methods.isApprovedForAll(blockchain.account, stakingContract).call();
        console.log(isApprovedForAllCGB);
        setIsApprovedForAllCGB(isApprovedForAllCGB);
      }
      if(blockchain.account && blockchain.CMBSmartContract)
      {
        isApprovedForAllCMB = await blockchain.CMBSmartContract.methods.isApprovedForAll(blockchain.account, stakingContract).call();
        console.log(isApprovedForAllCMB);
        setIsApprovedForAllCMB(isApprovedForAllCMB);
      }
      if(blockchain.account && blockchain.CPTSmartContract)
      {
        isApprovedForAllCPT = await blockchain.CPTSmartContract.methods.isApprovedForAll(blockchain.account, stakingContract).call();
        console.log(isApprovedForAllCPT);
        setIsApprovedForAllCPT(isApprovedForAllCPT);
      }
      if(blockchain.account && blockchain.OGSmartContract)
      {
        isApprovedForAllOG = await blockchain.OGSmartContract.methods.isApprovedForAll(blockchain.account, stakingContract).call();
        console.log(isApprovedForAllOG);
        setIsApprovedForAllOG(isApprovedForAllOG);
      }
      if(blockchain.account && blockchain.ZFSmartContract)
      {
        isApprovedForAllZF = await blockchain.ZFSmartContract.methods.isApprovedForAll(blockchain.account, stakingContract).call();
        console.log(isApprovedForAllZF);
        setIsApprovedForAllZF(isApprovedForAllZF);
      }
    }


    async function safeApprovalAll(){
      
      if(!isApprovedForAllCGB){
        var safeApprovalCGB = await blockchain.CGBSmartContract.methods.setApprovalForAll(stakingContract,true)
        .send({
          gas: "185000",
          from: blockchain.account,
        });
      }

      if(!isApprovedForAllCMB){
        var safeApprovalCMB = await blockchain.CMBSmartContract.methods.setApprovalForAll(stakingContract,true)
        .send({
          gas: "185000",
          from: blockchain.account,
        });
      }

      if(!isApprovedForAllCPT){
        var safeApprovalCPT = await blockchain.CPTSmartContract.methods.setApprovalForAll(stakingContract,true)
        .send({
          gas: "185000",
          from: blockchain.account,
        });
      }

      if(!isApprovedForAllOG){
        var safeApprovalOG = await blockchain.OGSmartContract.methods.setApprovalForAll(stakingContract,true)
        .send({
          gas: "185000",
          from: blockchain.account,
        });
      }

      if(!isApprovedForAllZF){
        var safeApprovalZF = await blockchain.ZFSmartContract.methods.setApprovalForAll(stakingContract,true)
        .send({
          gas: "185000",
          from: blockchain.account,
        });
      }
      isApprovedAll();
    }
  
    async function stakeNFTs(){

      if(isApprovedForAllCGB && isApprovedForAllCPT && isApprovedForAllCMB && isApprovedForAllOG && isApprovedForAllZF){

        getDetailsOfCheckbox();

        const gasPriceVal = 585000;

        if(collectionArray.length == 0)
        {
          alert("select atleast 1 NFT to stake");
        }
        else{

          console.log(collectionArray.toString());
          console.log(tokenIdsArray.toString());

        await blockchain.CroStkSmartContract.methods.stakePrimate(collectionArray, tokenIdsArray).send({
            gas: gasPriceVal,
            from: blockchain.account,
          }).once("error", (err) => {
            console.log(err);
            alert("Error occured while staking");
          })
          .then((receipt) => {
            alert("Staked Successful");
            
          });
        }
        getNFTOwnedByUser();
        getNFTStakedByUser();
    }
    else{
      alert("Please approve all first");
    }
    }

    async function unStakeNFTs(){

      getDetailsOfCheckboxUnstaking();

      const gasPriceVal = 585000;

      if(collectionArray.length == 0)
      {
        alert("Select atleast 1 NFT to Unstake");
      }
      else{

        console.log(collectionArray.toString());
        console.log(tokenIdsArray.toString());

       await blockchain.CroStkSmartContract.methods.unstakePrimate(collectionArray, tokenIdsArray).send({
          gas: gasPriceVal,
          from: blockchain.account,
        }).once("error", (err) => {
          console.log(err);
          alert("Error occured while Unstaking");
        })
        .then((receipt) => {
          alert("Unstaked Successful");
          
        });
      }
      getNFTOwnedByUser();
      getNFTStakedByUser();
    }

    function getDetailsOfCheckbox() {
      const selectedCheckboxes = document.querySelectorAll("input[type=checkbox]:checked");
      const selectedCollections = {};
      const collectionOrder = [];
    
      selectedCheckboxes.forEach((checkbox) => {
        if(checkbox.getAttribute("data-staking") === "STAKING"){
          const collectionName = checkbox.getAttribute("data-collection");
          const checkboxValue = checkbox.value;
      
          if (!selectedCollections[collectionName]) {
            selectedCollections[collectionName] = [];
            collectionOrder.push(collectionName);
          }
      
          selectedCollections[collectionName].push(checkboxValue);
      
          if (!collectionOrder.includes(collectionName)) {
            collectionOrder.push(collectionName);
          }
        }
        });

      
    
      collectionArray = collectionOrder.flatMap((collectionName) => Array(selectedCollections[collectionName].length).fill(collectionName));
      tokenIdsArray = collectionOrder.flatMap((collectionName) => selectedCollections[collectionName]);
    
      setCollectionArray(collectionArray);
      setTokenIDsArray(tokenIdsArray);
      console.log(collectionArray, tokenIdsArray);
    }

    function getDetailsOfCheckboxUnstaking() {
      const selectedCheckboxes = document.querySelectorAll("input[type=checkbox]:checked");
      const selectedCollections = {};
      const collectionOrder = [];
    
      selectedCheckboxes.forEach((checkbox) => {
        if(checkbox.getAttribute("data-staking") === "UNSTAKING"){
          const collectionName = checkbox.getAttribute("data-collection");
          const checkboxValue = checkbox.value;
      
          if (!selectedCollections[collectionName]) {
            selectedCollections[collectionName] = [];
            collectionOrder.push(collectionName);
          }
      
          selectedCollections[collectionName].push(checkboxValue);
      
          if (!collectionOrder.includes(collectionName)) {
            collectionOrder.push(collectionName);
          }
        }
        });

      
    
      collectionArray = collectionOrder.flatMap((collectionName) => Array(selectedCollections[collectionName].length).fill(collectionName));
      tokenIdsArray = collectionOrder.flatMap((collectionName) => selectedCollections[collectionName]);
    
      setCollectionArray(collectionArray);
      setTokenIDsArray(tokenIdsArray);
      console.log(collectionArray, tokenIdsArray);
    }


    useEffect(() => {
      getNFTOwnedByUser();
      isApprovedAll();
      getNFTStakedByUser();
    }, [blockchain.account]);

    

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };  return (
    
    <>
    <div style={{display:"flex" , justifyContent:"center" , paddingTop:"50px" , paddingBottom:"50px"}}>
    
    <div style={{paddingRight:"20px"}} >
    { (isApprovedForAllCGB && isApprovedForAllCPT && isApprovedForAllCMB && isApprovedForAllOG && isApprovedForAllZF)? (
    
    <Button style={{background:"#ef476f", borderRadius:"0px", color:"#d8d8d8" }} >
          <a style={{fontSize:"12px"}} className='newFont mintHover '> Approved</a>
    </Button>
    ):(
      <Button style={{background:"#ef476f", borderRadius:"0px", color:"#d8d8d8" }} >
          <a style={{fontSize:"12px"}} className='newFont mintHover 'onClick={safeApprovalAll}> Approve CMB Staking</a>
    </Button>
    )}
    </div>

    </div>

 {/* STAKING CORNER    */}
 
    <div  style={{display:"flex" , justifyContent:"center" }}>

    <div  style={{ paddingRight:"10px" , paddingLeft:"20px" }}>

    <div className='BigBox' style={{ width:"650px" , height:"600px",  overflowY: "scroll"}} >

    <div  style={{ paddingRight:"20px" , paddingLeft:"20px" , borderRadius:"20px"}}>

        <a className='newFont' style={{display:"flex" , justifyContent:"center" , fontSize:"20px"}} >Available NFTs</a>

        <br/> <div style={{paddingTop:"10px"}}>  <a className='newFont'   >Zombies..</a> </div>  <br/>
        {tokenIDsZB.map((tokenID, index) => (
        <>
        <NFTImageStaking key={tokenID} imageUrl={`https://cmb.mypinata.cloud/ipfs/QmSDx92bvTcZeL7WVyjz92e44LqjvqyKZQACsJ4sCEg4uq/${tokenID}`+`.png`} />
        <input className='checkit' type="checkbox" value={tokenID} data-staking="STAKING" data-collection={collectionZB}/>
        </>
        )
        )}
        <br/> <div style={{paddingTop:"10px"}}> <a className='newFont'   >CGB..</a> </div> <br/>
        {tokenIDsCGB.map((tokenID, index) => (
          <>
        <NFTImageStaking  key={tokenID} imageUrl={`https://cmb.mypinata.cloud/ipfs/QmRiiD1GGx31PHDNQXywh5QTwcyE92e1BubsqhFLFPq6aC/${tokenID}`+`.png`} />
        <input className='checkit' type="checkbox" value={tokenID} data-staking="STAKING" data-collection={collectionCGB}/>
        </>
        )
        )}
        <br/> <div style={{paddingTop:"10px"}}> <a className='newFont'   >CMB.. </a> </div> <br/>
        {tokenIDsCMB.map((tokenID, index) => (
          <>
        <NFTImageStaking  key={tokenID} imageUrl={`https://cmb.mypinata.cloud/ipfs/QmWaTZfpZDRbdvkQaC7wjph4nhBPetB4N1FqRp11GLVjLJ/${tokenID}`+`.png`} />
        <input className='checkit' type="checkbox" value={tokenID} data-staking="STAKING" data-collection={collectionCMB}/>
        </>
        )
        )}

        <br/> <div style={{paddingTop:"10px"}}> <a className='newFont'   >OG.. </a> </div> <br/>
        {tokenIDsOG.map((tokenID, index) => (
          <>
        <NFTImageStaking  key={tokenID} imageUrl={`https://bafybeid2qcpqmnet42w7wjl2lurkql2fiscv5ca7quk5utvteu46s2tlau.ipfs.nftstorage.link/`} />
        <input className='checkit' type="checkbox" value={tokenID} data-staking="STAKING" data-collection={collectionOG}/>
        </>
        )
        )}
        <br/> <div style={{paddingTop:"10px"}}> <a className='newFont'   >CPT.. </a> </div> <br/>
        {tokenIDsCPT.map((tokenID, index) => (
        <>
        <NFTImageStaking  key={tokenID} imageUrl={`https://cmb.mypinata.cloud/ipfs/QmeBWVydfc6tuEBEP8tCUDA4QBJuPXDePHuTFqJ4hvjx3g/${tokenID}`+`.png`} />
        <input className='checkit' type="checkbox" value={tokenID} data-staking="STAKING" data-collection={collectionCPT}/>
        </>
        )
        )}<br/>
        <div style={{paddingTop:"20px" , paddingBottom:"20px"}}>
        <Button style={{background:"#ef476f", borderRadius:"0px", color:"#d8d8d8" }} >
          <a style={{fontSize:"12px"}} className='newFont mintHover ' onClick={stakeNFTs}> Stake</a>
    </Button>
    </div>
    </div>
    </div>

{/* STAKED CORNER */}
  <div style={{paddingTop:"20px"}}>

    <div className='BigBox'  style={{ display:"flex"}} >
    <div style={{width:"650px", height:"600px" , borderRadius:"10px", overflowY: "scroll" }}>
    <a className='newFont' style={{display:"flex" , justifyContent:"center" , fontSize:"20px" }} >Staked NFT Number</a>
    <br/>
    <Button style={{background:"#ef476f", borderRadius:"0px", color:"#d8d8d8" }} >
          <a style={{fontSize:"12px"}} className='newFont mintHover '> Unstake All</a>
    </Button>
    <br/>

    <a className='newFont' style={{display:"flex" , justifyContent:"center" , fontSize:"20px" , paddingTop:"20px" }} >Staked NFT</a>

    <div style={{ display:"flex", justifyContent:"center", paddingTop:"10px" , paddingLeft:"10px" , paddingBottom:"10px"}} >
    <br/>
    <div>
    <br/> <div style={{paddingTop:"10px"}}>   <a className='newFont'  > Zombies </a> </div> <br/>
        {stakedTokenIDsZB.map((tokenID, index) => (
        <>
        <NFTImageStaking key={tokenID} imageUrl={`https://cmb.mypinata.cloud/ipfs/QmSDx92bvTcZeL7WVyjz92e44LqjvqyKZQACsJ4sCEg4uq/${tokenID}`+`.png`} />
        <input className='checkit' type="checkbox" value={tokenID} data-staking="UNSTAKING" data-collection={collectionZB}/>
        </>
        )
        )}
        <br/><div style={{paddingTop:"10px"}}>  <a className='newFont'  > CGB </a> </div> <br/>
        {stakedTokenIDsCGB.map((tokenID, index) => (
          <>
        <NFTImageStaking  key={tokenID} imageUrl={`https://cmb.mypinata.cloud/ipfs/QmRiiD1GGx31PHDNQXywh5QTwcyE92e1BubsqhFLFPq6aC/${tokenID}`+`.png`} />
        <input className='checkit' type="checkbox" value={tokenID} data-staking="UNSTAKING" data-collection={collectionCGB}/>
        </>
        )
        )}
        <br/><div style={{paddingTop:"10px"}}>  <a className='newFont'  > CMB </a> </div> <br/>
        {stakedTokenIDsCMB.map((tokenID, index) => (
          <>
        <NFTImageStaking  key={tokenID} imageUrl={`https://cmb.mypinata.cloud/ipfs/QmWaTZfpZDRbdvkQaC7wjph4nhBPetB4N1FqRp11GLVjLJ/${tokenID}`+`.png`} />
        <input className='checkit' type="checkbox" value={tokenID} data-staking="UNSTAKING" data-collection={collectionCMB}/>
        </>
        )
        )}

        <br/><div style={{paddingTop:"10px"}}>  <a className='newFont'  > OG </a> </div> <br/>
        {stakedTokenIDsOG.map((tokenID, index) => (
          <>
        <NFTImageStaking  key={tokenID} imageUrl={`https://bafybeid2qcpqmnet42w7wjl2lurkql2fiscv5ca7quk5utvteu46s2tlau.ipfs.nftstorage.link/`} />
        <input className='checkit' type="checkbox" value={tokenID} data-staking="UNSTAKING" data-collection={collectionOG}/>
        </>
        )
        )}
        <br/> <div style={{paddingTop:"10px"}}> <a className='newFont'  > CPT </a> </div> <br/>
        {stakedTokenIDsCPT.map((tokenID, index) => (
        <>
        <NFTImageStaking  key={tokenID} imageUrl={`https://cmb.mypinata.cloud/ipfs/QmeBWVydfc6tuEBEP8tCUDA4QBJuPXDePHuTFqJ4hvjx3g/${tokenID}`+`.png`} />
        <input className='checkit' type="checkbox" value={tokenID} data-staking="UNSTAKING" data-collection={collectionCPT}/>
        </>
        )
        )}<br/>
    </div>

  </div>

    
    <div style={{display:"flex" , paddingTop:"10px" , paddingLeft:"10px" , paddingBottom:"10px" , justifyContent:"center"}} >
        <Button style={{background:"#ef476f", borderRadius:"0px", color:"#d8d8d8"  }} >
          <a style={{fontSize:"12px"}} className='newFont mintHover' onClick={unStakeNFTs}> Unstake</a>
    </Button>
    </div>
    </div>
    </div>
    </div>
    </div>
 {/* RIGHT CARD */}
    <div style={{paddingLeft:"100px"}}>
        <div className='BigBox'  style={{height:"600px", borderRadius:"10px" }}>
        <Tabs value={value}  onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Your Stats" value={0} />
            <Tab label="Global Stats" value={1} />
            <Tab label="Withdraw" value={2} />
        </Tabs>

        <div style={{paddingBottom:"20px"}} >
        {value === 0 && <div style={{alignItems:""}}> 
            <a className='newFont' style={{display:"flex" , paddingLeft:"10px" , paddingTop:"13px"}} >Staked NFTs: 1 </a>

            <a className='newFont' style={{display:"flex" , paddingLeft:"10px" , paddingTop:"13px"}} >Days passed since last withdrawa: 149</a>

            <a className='newFont' style={{display:"flex" , paddingLeft:"10px" , paddingTop:"13px"}} >$CBP Earned: 360.33</a>

            <a className='newFont' style={{display:"flex" , paddingLeft:"10px" , paddingTop:"13px"}} >Current malus: 0%</a>

            <a className='newFont' style={{display:"flex" , paddingLeft:"10px" , paddingTop:"13px"}} >Available for withdraw: 360.33 $CPB</a>

            <a className='newFont' style={{display:"flex" , paddingLeft:"10px" , paddingTop:"13px"}} >Total Claimed: 0.00 $CPB</a>
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