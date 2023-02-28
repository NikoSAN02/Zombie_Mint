import React from "react";
import Button from "@mui/material/Button";
import '../styles/modal.css';


export default function WithdrawModal(props) {
	const { claimRewards } = props;
	return (props.trigger)? (
		<div>
		<p className='written' >Select a wallet to withdraw</p>
	  <div className="two-wallets" >
		  <Button style={{  padding:"5px" }}
		    onClick={() => {
                claimRewards(false);
			    props.setTrigger(false)
		    }}
		    w="100%">
		      <span className="wallet-meta" > Withdraw to Crotopia</span>
		  </Button>
		  <Button style={{  padding:"5px"}}
		    variant="outline"
		    onClick={() => {
                claimRewards(true);
			    props.setTrigger(false)
		    }}
		    w="100%">
		      <span className="wallet-defi" > Withdraw to Wallet</span>
		</Button>

		<div className="CloseButt" >
		<Button style={{fontSize:"22px" , fontWeight:"900" , color:"#06d6a0"}} onClick={() => props.setTrigger(false)}>X</Button>
		</div>

		</div>
		</div>
	) : "";
      }
      