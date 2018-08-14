import React, { Component } from 'react';
import { Button, Table, Modal, Icon } from 'semantic-ui-react';
import Campaign from '../../ethereum/campaign';
import RequestRow from '../../components/RequestRow';
import RequestNew from '../requests/newRequests';

class RequestIndex extends Component {
	state = {
		requests: [],
		approversCount: '',
		requestCount:'',
	}

	async componentDidMount(props){
    	const campaign = Campaign(this.props.address);
    	const requestCount = await campaign.methods.getRequestsCount().call();
    	const approversCount = await campaign.methods.approversCount().call();

    	const requests = await Promise.all(
    		Array(parseInt(requestCount,10))
    			.fill()
    			.map((element, index) => {
    				return campaign.methods.requests(index).call()
    			})
    	)

    	this.setState({requests, approversCount, requestCount});
	}

  	renderRow(){
  		return this.state.requests.map((request, index) => {
  			return <RequestRow 
  				key={index}
  				id={index}
  				request={request}
  				address={this.props.address}
  				approversCount={this.state.approversCount}
  			/>
  		})
  	}

   	render() {
   		const {Header, Row, HeaderCell, Body} = Table;

	    return(
	      <div>
	        <h3>Requests</h3>
	        <Modal 
	      		trigger={
		      		<Button icon labelPosition='left' primary floated="right" style={{marginBottom:10}}>
		      			<Icon name='add circle' />
		      			Add Requests
		      		</Button>
	      		}>
			    <Modal.Header>Create New Request</Modal.Header>
			    <Modal.Content>
			    	<RequestNew address={this.props.address} />
			    </Modal.Content>
			</Modal>

	        <Table>
	        	<Header>
	        		<Row>
	        			<HeaderCell>ID</HeaderCell>
	        			<HeaderCell>Description</HeaderCell>
	        			<HeaderCell>Amount</HeaderCell>
	        			<HeaderCell>Recipient</HeaderCell>
	        			<HeaderCell>Approval Count</HeaderCell>
	        			<HeaderCell>Approve</HeaderCell>
	        			<HeaderCell>Finalize</HeaderCell>
	        		</Row>
	        	</Header>
	        	<Body>
	        		{this.renderRow()}
	        	</Body>
	        </Table>
	        <div>Found {this.state.requestCount} requests.</div>
	      </div>
	    );
  	}
}

export default RequestIndex;