import React from 'react';
import { Button, Card, Tab, Tabs } from '@mui/material';
import { width } from '@mui/system';


const StakingPage = () => {
    const [value, setValue] = React.useState(2);

    function onChangeTab(){
        alert(value);
        setValue(1);
    }
  return (
    
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
        <Tabs value={value}  onChange={onChangeTab} aria-label="basic tabs example">
            <Tab label="Item One" value={0} />
            <Tab label="Item Two" value={1} />
            <Tab label="Item Three" value={2} />
        </Tabs>

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