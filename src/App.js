import React, { Component } from 'react';
import {Card, Button, Icon, Modal, Grid} from 'semantic-ui-react';
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
                fluid: true,
                style: { overflowWrap: 'break-word' }
            };
        });

        return <Card.Group items={items} />;
    }

  render() {
    return (
      <Layout>
        <h1>Campaign Index!</h1>
        
        <Grid stackable>
            <Grid.Column width={12}>
                {this.renderCampaigns()}
            </Grid.Column>
            <Grid.Column width={4}>
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
            </Grid.Column>          
        </Grid>
      </Layout>
    );
  }
}

export default App;
