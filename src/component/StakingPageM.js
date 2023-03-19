import React, { useEffect, useState} from 'react';
import { useSelector } from "react-redux";
import NFTImageStaking from "./NFTImageStaking";
import { Button, Card, Tab, Tabs } from '@mui/material';
import { width } from '@mui/system';
import WithdrawModel from "./WithdrawModel";
import crotopia_image from "../Images/Crotopia_Image.png";
import bgImageStk from "../Images/Background_Staking_1.png"




const StakingPageM = () => {
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
    var [userAirdropAmount, setUserAirdropAmount] = useState([]);
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

    //function to get the NFTs of each collection owned by the user
    async function getNFTOwnedByUser(){
      if(blockchain.account && blockchain.CroStkSmartContract)
      {
        try{
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
      }catch (err)
      {
        console.log(err);
      }
    }
    unCheckAllCheckboxes();
    }

    //Get the info of NFTs staked by the user
    async function getNFTStakedByUser(){

      if(blockchain.account && blockchain.CroStkSmartContract)
      {
        try{
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
      }catch(err)
      {
        console.log(err);
      }
    }
    unCheckAllCheckboxes();
    }

    //unstake all the NFTs using the unstake all button
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
      
      if(unstakeToken.length > 35)
      {
        alert("Sorry you have more than 35 NFTs staked. You need to unstake it using the checkboxes");
      }
      else{
          if(blockchain.account && blockchain.CroStkSmartContract){
          var gasPriceVal = 1285000;
          gasPriceVal =   await blockchain.CroStkSmartContract.methods.unstakePrimate(unStakeCol, unstakeToken).estimateGas({from: blockchain.account});
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
        else{
          alert("Please connect your wallet first");
        }
      }

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

    //check if all the contracts are approved
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

    //approve all the contracts to enable staking

    async function safeApprovalAll(){

      if(blockchain.account){
      
      if(!isApprovedForAllCGB){
        try{
        var safeApprovalCGB = await blockchain.CGBSmartContract.methods.setApprovalForAll(stakingContract,true)
        .send({
          gas: "185000",
          from: blockchain.account,
        });
      }catch(err)
      {
        console.log(err);
      }
      }

      if(!isApprovedForAllCMB){
        try{
          var safeApprovalCMB = await blockchain.CMBSmartContract.methods.setApprovalForAll(stakingContract,true)
          .send({
            gas: "185000",
            from: blockchain.account,
          });
        }catch(err)
        {
          console.log(err);
        }
      }

      if(!isApprovedForAllCPT){
        try{
          var safeApprovalCPT = await blockchain.CPTSmartContract.methods.setApprovalForAll(stakingContract,true)
          .send({
            gas: "185000",
            from: blockchain.account,
          });
        }catch(err)
        {
          console.log(err);
        }
      }

      if(!isApprovedForAllOG){
        try{
          var safeApprovalOG = await blockchain.OGSmartContract.methods.setApprovalForAll(stakingContract,true)
          .send({
            gas: "185000",
            from: blockchain.account,
          });
        }catch(err)
        {
          console.log(err);
        }
      }

      if(!isApprovedForAllZF){
        try{
          var safeApprovalZF = await blockchain.ZFSmartContract.methods.setApprovalForAll(stakingContract,true)
          .send({
            gas: "185000",
            from: blockchain.account,
          });
        }catch(err)
        {
          console.log(err);
        }
      }
    }else{
      alert("Please connect your wallet first");
    }
      isApprovedAll();
    }
  
    //stake NFts
    async function stakeNFTs(){
      if(blockchain.account){
        if(isApprovedForAllCGB && isApprovedForAllCPT && isApprovedForAllCMB && isApprovedForAllOG && isApprovedForAllZF){

          getDetailsOfCheckbox();

          var gasPriceVal = 1285000;

          if(collectionArray.length == 0)
          {
            alert("select atleast 1 NFT to stake");
          }
          else{

          gasPriceVal =   await blockchain.CroStkSmartContract.methods.stakePrimate(collectionArray, tokenIdsArray).estimateGas({from: blockchain.account});
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
        alert("Please approve all contracts first");
      }
    }else{
      alert("Please connect your wallet first");
    }
  }

    //unstake NFTs
    async function unStakeNFTs(){

      getDetailsOfCheckboxUnstaking();

      var gasPriceVal = 1285000;

      if(collectionArray.length === 0)
      {
        alert("Select atleast 1 NFT to Unstake");
      }
      else{
        if(blockchain.account && blockchain.CroStkSmartContract){
      
        gasPriceVal =   await blockchain.CroStkSmartContract.methods.unstakePrimate(collectionArray, tokenIdsArray).estimateGas({from: blockchain.account});
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
      }else{ alert("Please connect your wallet first");}
    }
      getNFTOwnedByUser();
      getNFTStakedByUser();
      getTotalNFTStakedByUser()
    }

    //add the checked NFTs to an array
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
    }

    //get the details of all checked NFTs for unstaking and storing it in an array to unstake
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
    }


    //get all the NFTs staked by the user to display the count on screen.
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

    //Check airdrop round and other user staking info
    async function checkAirDropRound(){
      if(blockchain.account && blockchain.CroLocSmartContract)
      {
        try{
              currentAirdropRound = await blockchain.CroLocSmartContract.methods.airdropRound().call();
              setCurrentAirdropRound(currentAirdropRound);
              userAirdropAmount = await blockchain.CroLocSmartContract.methods.usersAirdropAmount(blockchain.account).call();
              setUserAirdropAmount(userAirdropAmount);
              const userDetails = await blockchain.CroLocSmartContract.methods.usersLocker(blockchain.account).call();
              userAirdropRound = userDetails.airdropRound;
              setUserAirdropRound(userAirdropRound);
              userLockedBalance = userDetails.lockedBalance;
              userLockedBalance = userLockedBalance/1e18;
              userLockedBalance = Number.parseFloat(userLockedBalance).toFixed(3);

              setUserLockedBalance(userLockedBalance);

              const mulusValue = await blockchain.CroLocSmartContract.methods.getUserTaxAmount(blockchain.account).call();
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
      if(blockchain.account && blockchain.CroLocSmartContract){
        const resp = await blockchain.CroLocSmartContract.methods.airdropRound().call();
        checkAirDropRound();
      }else{alert("Please connect your wallet");}
    } 

    //check last claimed and user rewards.
    async function lastClaimedTime(){
      if(blockchain.account && blockchain.CroStkSmartContract){
        const lastClaimedTimeStamp = await blockchain.CroStkSmartContract.methods.stakers(blockchain.account).call();

        let currentTimestamp = Math.floor(Date.now() / 1000);
        if(lastClaimedTimeStamp.lastClaimedTimestamp >0 ){
          let difference = currentTimestamp - lastClaimedTimeStamp.lastClaimedTimestamp;
          daysSinceLastClaimed = Math.floor(difference / 86400);
          setDaysSinceLastClaimed(daysSinceLastClaimed);
        }else{
          daysSinceLastClaimed = 0;
          setDaysSinceLastClaimed(daysSinceLastClaimed);
        }

        var userRewards = await blockchain.CroStkSmartContract.methods.calculateRewards(blockchain.account).call();
        if(userRewards > 0){
        userRewards = userRewards/1e18;
        userRewards = Number.parseFloat(userRewards).toFixed(3);
        tokensEarned = userRewards;
        setTokensEarned(tokensEarned);
        }
        else{
          tokensEarned = userRewards;
          setTokensEarned(tokensEarned);
        }
        availabletoWithDraw = (tokensEarned + userLockedBalance)/10;
        availabletoWithDraw = availabletoWithDraw.toFixed(3);
        setAvailabletoWithdraw(availabletoWithDraw);
      }
    }

    async function claimRewards(walletType){

      if(blockchain.account && blockchain.CroStkSmartContract){
        try{
          var userRewards = await blockchain.CroStkSmartContract.methods.claimRewards(walletType)
          .send({
            gas: "185000",
            from: blockchain.account,
          });
          lastClaimedTime();
        }catch(err)
        {
          console.log(err);
        }  
      }else{alert("Please connect your wallet");}
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
        <body style={{background: `url(${bgImageStk})`, backgroundSize: 'cover', backgroundAttachment: 'fixed'}}>
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

    <div className='BigBox' style={{ width:"350px" , height:"400px",  overflowY: "scroll"}} >

    <div  style={{ paddingRight:"20px" , paddingLeft:"20px" , borderRadius:"20px"}}>

        <a className='newFont textShadow' style={{display:"flex" , justifyContent:"center" , fontSize:"20px" , color:"#fff"}} >Available NFTs</a>

        <br/> <div style={{paddingTop:"10px" ,color:"#fff"}}>  <a className='newFont textShadow'   >Zombies..</a> </div>  <br/>
        {tokenIDsZB.map((tokenID, index) => (
        <>
        <NFTImageStaking key={tokenID} imageUrl={`https://cmb.mypinata.cloud/ipfs/QmSDx92bvTcZeL7WVyjz92e44LqjvqyKZQACsJ4sCEg4uq/${tokenID}`+`.png`} />
        <input className='checkit' type="checkbox" value={tokenID} data-staking="STAKING" data-collection={collectionZB}/>
        </>
        )
        )}
        <br/> <div style={{paddingTop:"10px" ,color:"#fff"}}> <a className='newFont textShadow'   >Cronos Gorilla Business </a> </div> <br/>
        {tokenIDsCGB.map((tokenID, index) => (
          <>
        <NFTImageStaking  key={tokenID} imageUrl={`https://cmb.mypinata.cloud/ipfs/QmRiiD1GGx31PHDNQXywh5QTwcyE92e1BubsqhFLFPq6aC/${tokenID}`+`.png`} />
        <input className='checkit' type="checkbox" value={tokenID} data-staking="STAKING" data-collection={collectionCGB}/>
        </>
        )
        )}
        <br/> <div style={{paddingTop:"10px" ,color:"#fff"}}> <a className='newFont textShadow'   >Cronos Monkey Business </a> </div> <br/>
        {tokenIDsCMB.map((tokenID, index) => (
          <>
        <NFTImageStaking  key={tokenID} imageUrl={`https://cmb.mypinata.cloud/ipfs/QmWaTZfpZDRbdvkQaC7wjph4nhBPetB4N1FqRp11GLVjLJ/${tokenID}`+`.png`} />
        <input className='checkit' type="checkbox" value={tokenID} data-staking="STAKING" data-collection={collectionCMB}/>
        </>
        )
        )}

        <br/> <div style={{paddingTop:"10px" , color:"#fff"}}> <a className='newFont textShadow'   >Crotopia OG Pass </a> </div> <br/>
        {tokenIDsOG.map((tokenID, index) => (
          <>
        <NFTImageStaking  key={tokenID} imageUrl={crotopia_image} />
        <input className='checkit' type="checkbox" value={tokenID} data-staking="STAKING" data-collection={collectionOG}/>
        </>
        )
        )}
        <br/> <div style={{paddingTop:"10px" , color:"#fff"}}> <a className='newFont textShadow'   >Corrupted Primates </a> </div> <br/>
        {tokenIDsCPT.map((tokenID, index) => (
        <>
        <NFTImageStaking  key={tokenID} imageUrl={`https://cmb.mypinata.cloud/ipfs/QmeBWVydfc6tuEBEP8tCUDA4QBJuPXDePHuTFqJ4hvjx3g/${tokenID}`+`.png`} />
        <input className='checkit' type="checkbox" value={tokenID} data-staking="STAKING" data-collection={collectionCPT}/>
        </>
        )
        )}<br/>
        <div style={{paddingTop:"20px" , paddingBottom:"20px"}}>
        <Button style={{background:"#ef476f", borderRadius:"0px", color:"#d8d8d8" }} >
          <a style={{fontSize:"12px" , color:"#fff"}} className='newFont mintHover ' onClick={stakeNFTs}> Stake</a>
    </Button>
    </div>
    </div>
    </div>

{/* STAKED CORNER */}
  <div style={{paddingTop:"20px"}}>

    <div className='BigBox'  style={{ display:"flex"}} >
    <div style={{width:"350px", height:"400px" , borderRadius:"10px", overflowY: "scroll" }}>
    <a className='newFont textShadow' style={{display:"flex" , justifyContent:"center" , fontSize:"20px" , color:"#fff" }} >Staked NFT Number</a>
    <br/>
    <Button style={{background:"#ef476f", borderRadius:"0px", color:"#d8d8d8" }} >
          <a style={{fontSize:"12px" , color:"#fff"}} className='newFont mintHover ' onClick={unStakeAllNFTs}> Unstake All</a>
    </Button>
    <br/>

    <a className='newFont textShadow' style={{display:"flex" , justifyContent:"center" , fontSize:"20px" , paddingTop:"20px" , color:"#fff" }} >Staked NFT</a>

    <div style={{ display:"flex", justifyContent:"center", paddingTop:"10px" , paddingLeft:"10px" , paddingBottom:"10px"}} >
    <br/>
    <div>
    <br/> <div style={{paddingTop:"10px" , color:"#fff"}}>   <a className=' textShadow newFont'  > Zombies </a> </div> <br/>
        {stakedTokenIDsZB.map((tokenID, index) => (
        <>
        <NFTImageStaking key={tokenID} imageUrl={`https://cmb.mypinata.cloud/ipfs/QmSDx92bvTcZeL7WVyjz92e44LqjvqyKZQACsJ4sCEg4uq/${tokenID}`+`.png`} />
        <input className='checkit' type="checkbox" value={tokenID} data-staking="UNSTAKING" data-collection={collectionZB}/>
        </>
        )
        )}
        <br/><div style={{paddingTop:"10px" , color:"#fff"}}>  <a className=' textShadow newFont'  > Cronos Gorilla Business </a> </div> <br/>
        {stakedTokenIDsCGB.map((tokenID, index) => (
          <>
        <NFTImageStaking  key={tokenID} imageUrl={`https://cmb.mypinata.cloud/ipfs/QmRiiD1GGx31PHDNQXywh5QTwcyE92e1BubsqhFLFPq6aC/${tokenID}`+`.png`} />
        <input className='checkit' type="checkbox" value={tokenID} data-staking="UNSTAKING" data-collection={collectionCGB}/>
        </>
        )
        )}
        <br/><div style={{paddingTop:"10px" , color:"#fff"}}>  <a className=' textShadow newFont'  > Cronos Monkey Business </a> </div> <br/>
        {stakedTokenIDsCMB.map((tokenID, index) => (
          <>
        <NFTImageStaking  key={tokenID} imageUrl={`https://cmb.mypinata.cloud/ipfs/QmWaTZfpZDRbdvkQaC7wjph4nhBPetB4N1FqRp11GLVjLJ/${tokenID}`+`.png`} />
        <input className='checkit' type="checkbox" value={tokenID} data-staking="UNSTAKING" data-collection={collectionCMB}/>
        </>
        )
        )}

        <br/><div style={{paddingTop:"10px" , color:"#fff"}}>  <a className=' textShadow newFont'  > Crotopia OG Pass </a> </div> <br/>
        {stakedTokenIDsOG.map((tokenID, index) => (
          <>
        <NFTImageStaking  key={tokenID} imageUrl={crotopia_image} />
        <input className='checkit' type="checkbox" value={tokenID} data-staking="UNSTAKING" data-collection={collectionOG}/>
        </>
        )
        )}
        <br/> <div style={{paddingTop:"10px" , color:"#fff"}}> <a className=' textShadow newFont'  > Corrupted Primates  </a> </div> <br/>
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
          <a style={{fontSize:"12px" , color:"#fff"}} className='newFont mintHover' onClick={unStakeNFTs}> Unstake</a>
    </Button>
    </div>
    </div>
    </div>
    <div style={{paddingTop:"20px"}}>
        <div className='BigBox '  style={{height:"400px", width:"350px", borderRadius:"10px", overflowY: "scroll", paddingBottom:"20px" }}>
        <Tabs value={value} className="" indicatorColor="#000000" onChange={handleChange} aria-label="basic tabs example" >
            <Tab className="  newFont textShadow" style={{color:"#fff"}} label="Your Stats" value={0} />
            <Tab className="newFont textShadow" style={{color:"#fff"}} label="Global Stats" value={1} />
        </Tabs>

        <div style={{paddingBottom:"20px"}} >
        {value === 0 && <div style={{alignItems:""}}> 
            <a className='newFont textShadow ' style={{display:"flex" , paddingLeft:"10px" , paddingTop:"13px" , color:"#fff"}} >Staked NFTs: {sumNftStakedbyUser} </a>

            <a className='newFont textShadow ' style={{display:"flex" , paddingLeft:"10px" , paddingTop:"13px" , color:"#fff"}} >Days passed since last withdrawal: {daysSinceLastClaimed}</a>

            <a className='newFont textShadow ' style={{display:"flex" , paddingLeft:"10px" , paddingTop:"13px" , color:"#fff"}} >User's Locker Balance: {userLockedBalance}</a>

            <a className='newFont textShadow ' style={{display:"flex" , paddingLeft:"10px" , paddingTop:"13px" , color:"#fff"}} >$CTP Earned: {tokensEarned}</a>

            <a className='newFont textShadow ' style={{display:"flex" , paddingLeft:"10px" , paddingTop:"13px" , color:"#fff"}} >Current malus: {userMulusVal}%</a>

            <a className='newFont textShadow ' style={{display:"flex" , paddingLeft:"10px" , paddingTop:"13px" , color:"#fff"}} >Available for withdraw at the month's end: {availabletoWithDraw} $CTP</a>

          </div>
        }
        {value === 1 && <div style={{alignItems:""}}> 
            <a className='newFont textShadow ' style={{display:"flex" , paddingLeft:"10px" , paddingTop:"13px" , color:"#fff"}} >Staking Current Allocation: {stakingCurrentAllocation} </a>

            <a className='newFont textShadow ' style={{ display:"flex", paddingLeft:"10px" , paddingTop:"13px" , color:"#fff" , paddingBottom:"20px"}} >Total NFT staked for each collection: <br/>
            </a>

            <a className='newFont textShadow ' style={{display:"flex" , justifyContent:"left" , paddingLeft:"15px" , color:"#fff"}} >Cronos Gorilla Business = {totalStakedCGB}  </a> 
            <a className='newFont textShadow ' style={{display:"flex" , justifyContent:"left" , paddingLeft:"15px" , color:"#fff"}} >Cronos Monkey Business = {totalStakedCMB} </a> 
            <a className='newFont textShadow ' style={{display:"flex" , justifyContent:"left" , paddingLeft:"15px" , color:"#fff"}} >Corrupted Primates = {totalStakedCPT} </a> 
            <a className='newFont textShadow ' style={{display:"flex" , justifyContent:"left" , paddingLeft:"15px" , color:"#fff"}} >Crotopia OG Pass = {totalStakedOG} </a> 
            <a className='newFont textShadow ' style={{display:"flex" , justifyContent:"left" , paddingLeft:"15px" , color:"#fff"}} >Zombies = {totalStakedZF} </a>  



            <a className='newFont textShadow ' style={{display:"flex" , paddingLeft:"10px" , paddingTop:"13px" , color:"#fff"}} >Current airdrop round: {currentAirdropRound}</a>

          </div>}
      </div>
      <div className='whole-modal2'>
           <WithdrawModel trigger={withdrawModelPopup} setTrigger={setWithdrawModelPopup} claimRewards={claimRewards}></WithdrawModel>
     </div>
     
        {(daysSinceLastClaimed >= 30) ? (
          <div style={{display:"flex" , justifyContent:"center" , paddingTop:"10px" , paddingBottom:"10px"}} >
            <Button style={{background:"#ef476f", borderRadius:"0px", color:"#d8d8d8"  }} >
          <a style={{fontSize:"12px" }} className='newFont mintHover ' onClick={ () => setWithdrawModelPopup(true)}> Claim All</a>
          </Button> &nbsp; 
          </div>
        ) : (<></>)
        }
          <div style={{display:"flex" , justifyContent:"center" , paddingTop:"10px" , paddingBottom:"10px"}} >
          { (currentAirdropRound !== userAirdropRound && userAirdropAmount !== 0) ? (
          <Button style={{background:"#ef476f", borderRadius:"0px", color:"#d8d8d8"  }} >
          <a style={{fontSize:"12px" ,}} className='newFont mintHover ' onClick={handleAirdrop}> Claim Airdrop</a>
          </Button>
          ) : (<></>)
          }
          </div>

        </div>
    </div>
    </div>
    </div>
    
 {/* RIGHT CARD */}
    
    </div>
    
    </>
    </body>
  )
}

export default StakingPageM