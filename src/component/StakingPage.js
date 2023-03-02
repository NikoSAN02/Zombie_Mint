import React, { useEffect, useState} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../redux/data/dataActions";
import NFTImageStaking from "./NFTImageStaking";
import { Button, Card, Tab, Tabs } from '@mui/material';
import { width } from '@mui/system';
import WithdrawModel from "./WithdrawModel";



const StakingPage = () => {
    const [value, setValue] = React.useState(0);
    const blockchain = useSelector((state) => state.blockchain);
    var [isApprovedForAllCGB, setIsApprovedForAllCGB] = useState([]);
    var [isApprovedForAllCMB, setIsApprovedForAllCMB] = useState([]);
    var [isApprovedForAllCPT, setIsApprovedForAllCPT] = useState([]);
    var [isApprovedForAllOG, setIsApprovedForAllOG] = useState([]);
    var [isApprovedForAllZF, setIsApprovedForAllZF] = useState([]);
    var [sumNftStakedbyUser, setSumNftStakedbyUser] = useState([]);
    var [currentAirdropRound, setCurrentAirdropRound] = useState([]);
    var [userAirdropRound, setUserAirdropRound] = useState([]);
    var [userLockedBalance, setUserLockedBalance] = useState([]);
    var [daysSinceLastClaimed, setDaysSinceLastClaimed] = useState([]);
    var [userMulusVal, setUserMulusVal] = useState([]);
    var [tokensEarned, setTokensEarned] = useState([]);
    var [availabletoWithDraw, setAvailabletoWithdraw] = useState([]);
    
    var [collectionArray, setCollectionArray] = useState(null);
    var [tokenIdsArray, setTokenIDsArray] = useState(null);

    const stakingContract = process.env.REACT_APP_CRO_STK_CONTRACT_ADD;

    const [withdrawModelPopup, setWithdrawModelPopup] = useState(false);


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

    var [totalStakedCGB, setTotalStakedCGB] = useState([]);
    var [totalStakedCMB, setTotalStakedCMB] = useState([]);
    var [totalStakedCPT, setTotalStakedCPT] = useState([]);
    var [totalStakedOG, setTotalStakedOG] = useState([]);
    var [totalStakedZF, setTotalStakedZF] = useState([]);

    var [stakingCurrentAllocation, setStakingCurrentAllocation] = useState([]);

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
        stakedTokenIDsCPT = await blockchain.CroStkSmartContract.methods.getUserStakedTokensByCollection(blockchain.account, collectionCPT).call();
        
        setStakedTokenIDsCPT(stakedTokenIDsCPT);
       
    }
    unCheckAllCheckboxes();
    }

    async function unStakeAllNFTs(){
      
      let unStakeCol = [];
      let unstakeToken = [];

      
      if(stakedTokenIDsZB.length > 0){
        for (let i = 0; i < stakedTokenIDsZB.length; i++) {
          unstakeToken.push(stakedTokenIDsZB[i]);
          unStakeCol.push(collectionZB);
        }
      }

      if(stakedTokenIDsCGB.length > 0){
        for (let i = 0; i < stakedTokenIDsCGB.length; i++) {
          unstakeToken.push(stakedTokenIDsCGB[i]);
          unStakeCol.push(collectionCGB);
        }
      }

      if(stakedTokenIDsCMB.length > 0){
        for (let i = 0; i < stakedTokenIDsCMB.length; i++) {
          unstakeToken.push(stakedTokenIDsCMB[i]);
          unStakeCol.push(collectionCMB);
        }
      }

      if(stakedTokenIDsOG.length > 0){
        for (let i = 0; i < stakedTokenIDsOG.length; i++) {
          unstakeToken.push(stakedTokenIDsOG[i]);
          unStakeCol.push(collectionOG);
        }
      }

      if(stakedTokenIDsCPT.length > 0){
        for (let i = 0; i < stakedTokenIDsCPT.length; i++) {
          unstakeToken.push(stakedTokenIDsCPT[i]);
          unStakeCol.push(collectionCPT);
        }
      }
      console.log(unstakeToken);
      console.log(unStakeCol);
      
      if(unstakeToken.length > 35)
      {
        alert("Sorry you have more than 35 NFTs staked. You need to unstake it using the checkboxes");
      }
      else{
        const gasPriceVal = 1285000;
        await blockchain.CroStkSmartContract.methods.unstakePrimate(unStakeCol, unstakeToken).send({
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
      console.log(unstakeToken);
      console.log(unStakeCol);
      unCheckAllCheckboxes();
      getNFTOwnedByUser();
      getNFTStakedByUser();
      getTotalNFTStakedByUser();
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
        setIsApprovedForAllCGB(isApprovedForAllCGB);
      }
      if(blockchain.account && blockchain.CMBSmartContract)
      {
        isApprovedForAllCMB = await blockchain.CMBSmartContract.methods.isApprovedForAll(blockchain.account, stakingContract).call();
        setIsApprovedForAllCMB(isApprovedForAllCMB);
      }
      if(blockchain.account && blockchain.CPTSmartContract)
      {
        isApprovedForAllCPT = await blockchain.CPTSmartContract.methods.isApprovedForAll(blockchain.account, stakingContract).call();
        setIsApprovedForAllCPT(isApprovedForAllCPT);
      }
      if(blockchain.account && blockchain.OGSmartContract)
      {
        isApprovedForAllOG = await blockchain.OGSmartContract.methods.isApprovedForAll(blockchain.account, stakingContract).call();
        setIsApprovedForAllOG(isApprovedForAllOG);
      }
      if(blockchain.account && blockchain.ZFSmartContract)
      {
        isApprovedForAllZF = await blockchain.ZFSmartContract.methods.isApprovedForAll(blockchain.account, stakingContract).call();
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

        const gasPriceVal = 1285000;

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
        getTotalNFTStakedByUser()
    }
    else{
      alert("Please approve all first");
    }
    }

    async function unStakeNFTs(){

      getDetailsOfCheckboxUnstaking();

      const gasPriceVal = 1285000;

      if(collectionArray.length === 0)
      {
        alert("Select atleast 1 NFT to Unstake");
      }
      else{

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
      getTotalNFTStakedByUser()
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


    async function getTotalNFTStakedByUser(){
      if(blockchain.account && blockchain.CroStkSmartContract)
      {
        const ZBStaked = await blockchain.CroStkSmartContract.methods.getUsersNftBalance(blockchain.account, collectionZB).call();
        const CGBStaked = await blockchain.CroStkSmartContract.methods.getUsersNftBalance(blockchain.account, collectionCGB).call();
        const CMBStaked = await blockchain.CroStkSmartContract.methods.getUsersNftBalance(blockchain.account, collectionCMB).call();
        const OGStaked = await blockchain.CroStkSmartContract.methods.getUsersNftBalance(blockchain.account, collectionOG).call();
        const CPTStaked = await blockchain.CroStkSmartContract.methods.getUsersNftBalance(blockchain.account, collectionCPT).call();
        sumNftStakedbyUser = parseInt(ZBStaked) + parseInt(CGBStaked) + parseInt(CMBStaked) + parseInt(OGStaked) + parseInt(CPTStaked);
        setSumNftStakedbyUser(sumNftStakedbyUser);
    }
    unCheckAllCheckboxes();
    }

    async function checkAirDropRound(){
      if(blockchain.account && blockchain.CroLocSmartContract)
      {
        try{
              currentAirdropRound = await blockchain.CroLocSmartContract.methods.airdropRound().call();
              setCurrentAirdropRound(currentAirdropRound);
              const userDetails = await blockchain.CroLocSmartContract.methods.usersLocker(blockchain.account).call();
              userAirdropRound = userDetails.airdropRound;
              setUserAirdropRound(userAirdropRound);
              userLockedBalance = userDetails.lockedBalance;
              setUserLockedBalance(userLockedBalance);

              console.log(userAirdropRound); 
              console.log(userDetails);
              const mulusValue = await blockchain.CroLocSmartContract.methods.getUserTaxAmount(blockchain.account).call();
              console.log(mulusValue.taxPercentage);
              userMulusVal = mulusValue.taxPercentage;
              setUserMulusVal(userMulusVal);
            }
            catch (err)
            {
              console.log(err);
            }
      }
    }

    async function handleAirdrop() {
      const resp = await blockchain.CroLocSmartContract.methods.airdropRound().call();
      console.log(resp);
      checkAirDropRound();
    } 

    async function lastClaimedTime(){
      if(blockchain.account && blockchain.CroStkSmartContract){
        const lastClaimedTimeStamp = await blockchain.CroStkSmartContract.methods.stakers(blockchain.account).call();
        console.log(lastClaimedTimeStamp.lastClaimedTimestamp);
        let currentTimestamp = Math.floor(Date.now() / 1000);
        let difference = currentTimestamp - lastClaimedTimeStamp.lastClaimedTimestamp;

        daysSinceLastClaimed = Math.floor(difference / 86400);
        setDaysSinceLastClaimed(daysSinceLastClaimed);

        var userRewards = await blockchain.CroStkSmartContract.methods.calculateRewards(blockchain.account).call();
        userRewards = userRewards/1e18;
        userRewards = Number.parseFloat(userRewards).toFixed(3);
        tokensEarned = userRewards;
        setTokensEarned(tokensEarned);
        availabletoWithDraw = (tokensEarned + userLockedBalance)/10;
        availabletoWithDraw = availabletoWithDraw.toFixed(3);
        setAvailabletoWithdraw(availabletoWithDraw);
        console.log("Rewards:", userRewards);
      }
    }

    async function claimRewards(walletType){

      if(blockchain.account && blockchain.CroStkSmartContract){
        var userRewards = await blockchain.CroStkSmartContract.methods.claimRewards(walletType)
        .send({
          gas: "185000",
          from: blockchain.account,
        });
        lastClaimedTime();  
      }
    }

    async function totalNftStakedForEachCollection(){
      if(blockchain.account && blockchain.CGBSmartContract)
      {
        totalStakedCGB = await blockchain.CGBSmartContract.methods.balanceOf(process.env.REACT_APP_CRO_STK_CONTRACT_ADD).call();
        setTotalStakedCGB(totalStakedCGB);
      }
      if(blockchain.account && blockchain.CMBSmartContract)
      {
        totalStakedCMB = await blockchain.CMBSmartContract.methods.balanceOf(process.env.REACT_APP_CRO_STK_CONTRACT_ADD).call();
        setTotalStakedCMB(totalStakedCMB);
      }
      if(blockchain.account && blockchain.CPTSmartContract)
      {
        totalStakedCPT = await blockchain.CPTSmartContract.methods.balanceOf(process.env.REACT_APP_CRO_STK_CONTRACT_ADD).call();
        setTotalStakedCPT(totalStakedCPT);
      }
      if(blockchain.account && blockchain.OGSmartContract)
      {
        totalStakedOG = await blockchain.OGSmartContract.methods.balanceOf(process.env.REACT_APP_CRO_STK_CONTRACT_ADD).call();
        setTotalStakedOG(totalStakedOG);
      }
      if(blockchain.account && blockchain.ZFSmartContract)
      {
        totalStakedZF = await blockchain.ZFSmartContract.methods.balanceOf(process.env.REACT_APP_CRO_STK_CONTRACT_ADD).call();
        setTotalStakedZF(totalStakedZF);
      }
    }

    async function getStakingCurrentAllocation(){
      if(blockchain.account && blockchain.CroLocSmartContract){
        var maxDistribution = await blockchain.CroLocSmartContract.methods.MAX_DISTRIBUTION().call();
        var totalDistributed = await blockchain.CroLocSmartContract.methods.totalDistributed().call();
        maxDistribution = maxDistribution/1e18;
        maxDistribution = Number.parseFloat(maxDistribution).toFixed(1);
        totalDistributed = totalDistributed/1e18;
        totalDistributed = Number.parseFloat(totalDistributed).toFixed(1);
        stakingCurrentAllocation = maxDistribution - totalDistributed;
        setStakingCurrentAllocation(stakingCurrentAllocation);
        console.log(maxDistribution);
        console.log(totalDistributed);
       
      }
    }

    useEffect(() => {
      getNFTOwnedByUser();
      isApprovedAll();
      getNFTStakedByUser();
      getTotalNFTStakedByUser();
      checkAirDropRound();
      lastClaimedTime();
      totalNftStakedForEachCollection();
      getStakingCurrentAllocation();
    }, [blockchain.account]);

    

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };  return (
    
    <>
    <div style={{display:"flex" , justifyContent:"center" , paddingTop:"50px" , paddingBottom:"50px"}}>
    
    <div style={{paddingRight:"20px"}} >
    { (isApprovedForAllCGB && isApprovedForAllCPT && isApprovedForAllCMB && isApprovedForAllOG && isApprovedForAllZF)? (
    
    <span> </span>
    ):(
      <Button style={{background:"#ef476f", borderRadius:"0px", color:"#d8d8d8" }} >
          <a style={{fontSize:"12px"}} className='newFont mintHover 'onClick={safeApprovalAll}> Approve Staking</a>
    </Button>
    )}
    </div>

    </div>

 {/* STAKING CORNER    */}
 
    <div style={{display:"flex" , justifyContent:"center" }}>

    <div  style={{ paddingRight:"10px" , paddingLeft:"20px" }}>

    <div className='BigBox' style={{ width:"650px" , height:"600px",  overflowY: "scroll"}} >

    <div  style={{ paddingRight:"20px" , paddingLeft:"20px" , borderRadius:"20px"}}>

        <a className='newFont textShadow' style={{display:"flex" , justifyContent:"center" , fontSize:"20px"}} >Available NFTs</a>

        <br/> <div style={{paddingTop:"10px"}}>  <a className='newFont textShadow'   >Zombies..</a> </div>  <br/>
        {tokenIDsZB.map((tokenID, index) => (
        <>
        <NFTImageStaking key={tokenID} imageUrl={`https://cmb.mypinata.cloud/ipfs/QmSDx92bvTcZeL7WVyjz92e44LqjvqyKZQACsJ4sCEg4uq/${tokenID}`+`.png`} />
        <input className='checkit' type="checkbox" value={tokenID} data-staking="STAKING" data-collection={collectionZB}/>
        </>
        )
        )}
        <br/> <div style={{paddingTop:"10px"}}> <a className='newFont textShadow'   >CGB..</a> </div> <br/>
        {tokenIDsCGB.map((tokenID, index) => (
          <>
        <NFTImageStaking  key={tokenID} imageUrl={`https://cmb.mypinata.cloud/ipfs/QmRiiD1GGx31PHDNQXywh5QTwcyE92e1BubsqhFLFPq6aC/${tokenID}`+`.png`} />
        <input className='checkit' type="checkbox" value={tokenID} data-staking="STAKING" data-collection={collectionCGB}/>
        </>
        )
        )}
        <br/> <div style={{paddingTop:"10px"}}> <a className='newFont textShadow'   >CMB.. </a> </div> <br/>
        {tokenIDsCMB.map((tokenID, index) => (
          <>
        <NFTImageStaking  key={tokenID} imageUrl={`https://cmb.mypinata.cloud/ipfs/QmWaTZfpZDRbdvkQaC7wjph4nhBPetB4N1FqRp11GLVjLJ/${tokenID}`+`.png`} />
        <input className='checkit' type="checkbox" value={tokenID} data-staking="STAKING" data-collection={collectionCMB}/>
        </>
        )
        )}

        <br/> <div style={{paddingTop:"10px"}}> <a className='newFont textShadow'   >OG.. </a> </div> <br/>
        {tokenIDsOG.map((tokenID, index) => (
          <>
        <NFTImageStaking  key={tokenID} imageUrl={`https://bafybeid2qcpqmnet42w7wjl2lurkql2fiscv5ca7quk5utvteu46s2tlau.ipfs.nftstorage.link/`} />
        <input className='checkit' type="checkbox" value={tokenID} data-staking="STAKING" data-collection={collectionOG}/>
        </>
        )
        )}
        <br/> <div style={{paddingTop:"10px"}}> <a className='newFont textShadow'   >CPT.. </a> </div> <br/>
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
    <a className='newFont textShadow' style={{display:"flex" , justifyContent:"center" , fontSize:"20px" }} >Staked NFT Number</a>
    <br/>
    <Button style={{background:"#ef476f", borderRadius:"0px", color:"#d8d8d8" }} >
          <a style={{fontSize:"12px"}} className='newFont mintHover ' onClick={unStakeAllNFTs}> Unstake All</a>
    </Button>
    <br/>

    <a className='newFont textShadow' style={{display:"flex" , justifyContent:"center" , fontSize:"20px" , paddingTop:"20px" }} >Staked NFT</a>

    <div style={{ display:"flex", justifyContent:"center", paddingTop:"10px" , paddingLeft:"10px" , paddingBottom:"10px"}} >
    <br/>
    <div>
    <br/> <div style={{paddingTop:"10px"}}>   <a className=' textShadow newFont'  > Zombies </a> </div> <br/>
        {stakedTokenIDsZB.map((tokenID, index) => (
        <>
        <NFTImageStaking key={tokenID} imageUrl={`https://cmb.mypinata.cloud/ipfs/QmSDx92bvTcZeL7WVyjz92e44LqjvqyKZQACsJ4sCEg4uq/${tokenID}`+`.png`} />
        <input className='checkit' type="checkbox" value={tokenID} data-staking="UNSTAKING" data-collection={collectionZB}/>
        </>
        )
        )}
        <br/><div style={{paddingTop:"10px"}}>  <a className=' textShadow newFont'  > CGB </a> </div> <br/>
        {stakedTokenIDsCGB.map((tokenID, index) => (
          <>
        <NFTImageStaking  key={tokenID} imageUrl={`https://cmb.mypinata.cloud/ipfs/QmRiiD1GGx31PHDNQXywh5QTwcyE92e1BubsqhFLFPq6aC/${tokenID}`+`.png`} />
        <input className='checkit' type="checkbox" value={tokenID} data-staking="UNSTAKING" data-collection={collectionCGB}/>
        </>
        )
        )}
        <br/><div style={{paddingTop:"10px"}}>  <a className=' textShadow newFont'  > CMB </a> </div> <br/>
        {stakedTokenIDsCMB.map((tokenID, index) => (
          <>
        <NFTImageStaking  key={tokenID} imageUrl={`https://cmb.mypinata.cloud/ipfs/QmWaTZfpZDRbdvkQaC7wjph4nhBPetB4N1FqRp11GLVjLJ/${tokenID}`+`.png`} />
        <input className='checkit' type="checkbox" value={tokenID} data-staking="UNSTAKING" data-collection={collectionCMB}/>
        </>
        )
        )}

        <br/><div style={{paddingTop:"10px"}}>  <a className=' textShadow newFont'  > OG </a> </div> <br/>
        {stakedTokenIDsOG.map((tokenID, index) => (
          <>
        <NFTImageStaking  key={tokenID} imageUrl={`https://bafybeid2qcpqmnet42w7wjl2lurkql2fiscv5ca7quk5utvteu46s2tlau.ipfs.nftstorage.link/`} />
        <input className='checkit' type="checkbox" value={tokenID} data-staking="UNSTAKING" data-collection={collectionOG}/>
        </>
        )
        )}
        <br/> <div style={{paddingTop:"10px"}}> <a className=' textShadow newFont'  > CPT </a> </div> <br/>
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
        <div className='BigBox'  style={{height:"800px", width:"400px", borderRadius:"10px" }}>
        <Tabs value={value}  onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Your Stats" value={0} />
            <Tab label="Global Stats" value={1} />
        </Tabs>

        <div style={{paddingBottom:"20px"}} >
        {value === 0 && <div style={{alignItems:""}}> 
            <a className='newFont textShadow ' style={{display:"flex" , paddingLeft:"10px" , paddingTop:"13px"}} >Staked NFTs: {sumNftStakedbyUser} </a>

            <a className='newFont textShadow ' style={{display:"flex" , paddingLeft:"10px" , paddingTop:"13px"}} >Days passed since last withdrawal: {daysSinceLastClaimed}</a>

            <a className='newFont textShadow ' style={{display:"flex" , paddingLeft:"10px" , paddingTop:"13px"}} >User's Locker Balance: {userLockedBalance}</a>

            <a className='newFont textShadow ' style={{display:"flex" , paddingLeft:"10px" , paddingTop:"13px"}} >$CBP Earned: {tokensEarned}</a>

            <a className='newFont textShadow ' style={{display:"flex" , paddingLeft:"10px" , paddingTop:"13px"}} >Current malus: {userMulusVal}%</a>

            <a className='newFont textShadow ' style={{display:"flex" , paddingLeft:"10px" , paddingTop:"13px"}} >Available for withdraw at the month's end: {availabletoWithDraw} $CPB</a>

          </div>
        }
        {value === 1 && <div style={{alignItems:""}}> 
            <a className='newFont textShadow ' style={{display:"flex" , paddingLeft:"10px" , paddingTop:"13px"}} >Staking Current Allocation: {stakingCurrentAllocation} </a>

            <a className='newFont textShadow ' style={{display:"flex" , paddingLeft:"10px" , paddingTop:"13px"}} >Total NFT staked for each collection: <br/>
            CGB: {totalStakedCGB} <br/>
            CMB: {totalStakedCMB} <br/>
            CPT: {totalStakedCPT} <br/>
            OG: {totalStakedOG} <br/>
            ZF: {totalStakedZF} <br/>            
            </a>

            <a className='newFont textShadow ' style={{display:"flex" , paddingLeft:"10px" , paddingTop:"13px"}} >Current airdrop round: {currentAirdropRound}</a>

          </div>}
      </div>
      <div className='whole-modal2'>
           <WithdrawModel trigger={withdrawModelPopup} setTrigger={setWithdrawModelPopup} claimRewards={claimRewards}></WithdrawModel>
     </div>

        <div style={{display:"flex" , justifyContent:"center" , paddingTop:"10px" , paddingBottom:"10px"}} >
            <Button style={{background:"#ef476f", borderRadius:"0px", color:"#d8d8d8"  }} >
          <a style={{fontSize:"12px"}} className='newFont mintHover ' onClick={ () => setWithdrawModelPopup(true)}> Claim All</a>
          </Button> &nbsp; 
          </div>

          <div style={{display:"flex" , justifyContent:"center" , paddingTop:"10px" , paddingBottom:"10px"}} >
          { (currentAirdropRound !== userAirdropRound) ? (
          <Button style={{background:"#ef476f", borderRadius:"0px", color:"#d8d8d8"  }} >
          <a style={{fontSize:"12px"}} className='newFont mintHover ' onClick={handleAirdrop}> Claim Airdrop</a>
          </Button>
          ) : (<></>)
          }
          </div>

        </div>
    </div>
    </div>
    
    </>
  )
}

export default StakingPage