import React from 'react';
import { Button, Card, Tab, Tabs } from '@mui/material';
import { width } from '@mui/system';


const StakingPage = () => {
    const [value, setValue] = React.useState(2);

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };  return (
    
    <>
    <div style={{display:"flex"}}>
    
    <Button style={{background:"#ef476f", borderRadius:"0px", color:"#d8d8d8" }} >
          <a style={{fontSize:"12px"}} className='newFont mintHover '> Approve CMB Staking</a>
    </Button>
    <Button style={{background:"#ef476f", borderRadius:"0px", color:"#d8d8d8"  }} >
          <a style={{fontSize:"12px"}} className='newFont mintHover '> Approve CPTs Staking</a>
    </Button>
    </div>
    <div style={{display:"flex"}}>
    <div style={{paddingRight:"40px"}}>
    <div style={{width:"500px",height:"300px", background:"#000"}}>
        Available NFTs
        <br/>
        <Button style={{background:"#ef476f", borderRadius:"0px", color:"#d8d8d8"  }} >
          <a style={{fontSize:"12px"}} className='newFont mintHover '> Stake</a>
    </Button>
    </div>
    <div style={{width:"500px",height:"300px", background:"#000"}}>
    <Button style={{background:"#ef476f", borderRadius:"0px", color:"#d8d8d8"  }} >
          <a style={{fontSize:"12px"}} className='newFont mintHover '> Unstake All</a>
          </Button>
          <br/>
        Staked NFTs
        <br/>
        <Button style={{background:"#ef476f", borderRadius:"0px", color:"#d8d8d8"  }} >
          <a style={{fontSize:"12px"}} className='newFont mintHover '> Unstake</a>
    </Button>
    </div>
    </div>
    <div style={{paddingLeft:"40px"}}>
        <div style={{width:"500px",height:"600px", background:"#fff"}}>
        <Tabs value={value}  onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Your Stats" value={0} />
            <Tab label="Global Stats" value={1} />
            <Tab label="Withdraw" value={2} />
        </Tabs>
        <div >
        {value === 0 && <div style={{alignItems:""}}> 
            Staked NFTs: 1 
            <br/>
            Days passed since last withdrawa: 149
            <br/>
            $CBP Earned: 360.33
            <br/>
            Current malus: 0%
            <br/>
            Available for withdraw: 360.33 $CPB
            <br/>
            Total Claimed: 0.00 $CPB
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