import React from 'react';
import { Button, Card, Tab, Tabs } from '@mui/material';
import { width } from '@mui/system';


const StakingPage = () => {
    const [value, setValue] = React.useState(2);

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
    <div style={{width:"500px",height:"300px", background:"#fff" , borderRadius:"10px"}}>
        <a style={{display:"flex" , paddingLeft:"10px" , paddingTop:"10px"}} >Available NFTs</a>
        <br/>
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