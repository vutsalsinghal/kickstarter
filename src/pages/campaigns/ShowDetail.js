import React, {Component} from 'react';
import {Card, Button, Icon, Modal, Grid} from 'semantic-ui-react';
import Campaign from '../../ethereum/campaign';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/contributeForm';
import RequestIndex from '../requests/showRequests';

class ShowDetail extends Component{
	state = {

	}
	
	show = size => () => this.setState({ size, open: true })

	async componentDidMount(props){
		const campaign = await Campaign(this.props.address);
		const summary = await campaign.methods.getSummary().call();
		
		this.setState({minimumContribution: summary[0],
			balance: web3.utils.fromWei(summary[1], 'ether'),
			requestsCount: summary[2],
			approversCount: summary[3],
			manager: summary[4]});
	}

	renderCards(){
		
		const {
			balance, 
			manager,
			minimumContribution,
			requestsCount,
			approversCount
		} = this.state;

		const items = [
			{
				header: manager,
				meta: 'Address of Manager',
				description: 'The manager created this campaign and can create request to withdraw money',
				style: { overflowWrap: 'break-word' }
			},
			{
				header:minimumContribution,
				meta: 'Minimum Contribution (wei)',
				description: 'You must contribute atleast this much wei to become approver',
				style: { overflowWrap: 'break-word' }
			},
			{
				header: requestsCount,
				meta: 'No.of Requests',
				description: 'A reuqest tries to withdraw money from the contract. Request must be approved by approvers',
				style: { overflowWrap: 'break-word' }
			},
			{
				header: approversCount,
				meta: 'No.of Approvers',
				description: 'No.of people who have already donated to this campaign',
				style: { overflowWrap: 'break-word' }
			},
			{
				header: balance,
				meta: 'Campaign Balance (ether)',
				description: 'This balance is how much money this campaign left to spend',
				style: { overflowWrap: 'break-word' }
			}
		];

		return <Card.Group items={items} />
	}

	render(){
		return (
			<Modal
		      	trigger={
			    	<Button basic icon labelPosition='right' className="primary" floated="right">
			    		<Icon name='chevron right' />
			      		View Campaign
			      	</Button>
		      	}>
				
				<Modal.Header>Campaign Details</Modal.Header>
				<Modal.Content>
			    	<Grid>
						<Grid.Row>
							<Grid.Column width={10}>
								{this.renderCards()}
							</Grid.Column>
							<Grid.Column width={6}>
								<ContributeForm address={this.props.address} />
							</Grid.Column>
						</Grid.Row>
						<Grid.Row>
							<Grid.Column>
								<Modal size={this.size}
						      		trigger={
							      		<Button icon labelPosition='right' className="primary" basic onClick={this.show('fullscreen')}>
							      			<Icon name='tasks' />
							      			View Requests
							      		</Button>
						      		}>
						      		
								    <Modal.Header>Requests Index</Modal.Header>
								    <Modal.Content scrolling>
								    	<RequestIndex address={this.props.address} />
								    </Modal.Content>
								</Modal>

							</Grid.Column>
						</Grid.Row>
					</Grid>
				    </Modal.Content>
			</Modal>
		);
	}
};

export default ShowDetail;