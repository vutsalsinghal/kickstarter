import React, { Component } from 'react';
import {Card, Button, Icon, Modal} from 'semantic-ui-react';
import factory from './ethereum/factory';
import Layout from './components/Layout';
import CampaignNew from './pages/campaigns/new';
import ShowDetail from './pages/campaigns/ShowDetail';

class App extends Component {
	state = {
		campaigns:[],
	}

	async componentDidMount(){
		const campaigns = await factory.methods.getDeployedCampaign().call();
		this.setState({campaigns: campaigns});
	}

	renderCampaigns(){
		const items = this.state.campaigns.map(address => {
			return {
				header:address,
				description: <ShowDetail address={address} />,
				fluid: true
			};
		});

		return <Card.Group items={items} />;
	}

  render() {
    return (
      <Layout>
      	<h1>Campaign Index!</h1>
      	
      	<Modal
      		trigger={
	      		<Button icon labelPosition='left' className="primary" floated="right">
	      			<Icon name='add circle' />
	      			Create Campaign
	      		</Button>
      		}>
		    <Modal.Header>Create New Campaign</Modal.Header>
		    <Modal.Content>
		    	<CampaignNew />
		    </Modal.Content>
		</Modal>

      	{this.renderCampaigns()}
      </Layout>
    );
  }
}

export default App;
