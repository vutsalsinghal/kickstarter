import React, { Component } from 'react';
import {Form, Button, Message, Input} from 'semantic-ui-react';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';

class RequestNew extends Component {
	state = {
		value:'',
		description:'',
		recipient:'',
		loading:false,
		errorMessage:'',
	}

	onSubmit = async (event) => {
		event.preventDefault();

		const campaign = Campaign(this.props.address);
		const {description, value, recipient} = this.state;

		this.setState({loading:true, errorMessage:''});

		try{
			const accounts = await web3.eth.getAccounts();
			await campaign.methods.createRequest(description, web3.utils.toWei(value, 'ether'), recipient).send({from:accounts[0]});

		}catch(err){
			this.setState({errorMessage:err.message});
		}

		this.setState({loading:false});
	}

  	render() {
    	return (
    		<div>
    			<h3>Create New Request</h3>
	    		<Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
		    		<Form.Field>
		    			<label>Description</label>
		    			<Input 
		    				value={this.state.description}
		    				onChange={event => this.setState({description:event.target.value})}
		    			/>
		    		</Form.Field>
		    		<Form.Field>
		    			<label>Value (ether)</label>
		    			<Input
		    				value={this.state.value}
		    				onChange={event => this.setState({value:event.target.value})}
		    			/>
		    		</Form.Field>
		    		<Form.Field>
		    			<label>Recipient</label>
		    			<Input 
		    				value={this.state.recipient}
		    				onChange={event => this.setState({recipient:event.target.value})}
		    			/>
		    		</Form.Field>

		    		<Message error header="Oops!" content={this.state.errorMessage} />
		    		<Button primary loading={this.state.loading} secondary={this.state.loading} disabled={this.state.loading}>
		    			Create!
		    		</Button>
		    	</Form>
		    </div>
    	);
  	}
}

export default RequestNew;