import React from 'react';
import { Menu, Modal } from 'semantic-ui-react';
import CampaignNew from '../pages/campaigns/new';

export default () => {
    return (
        <Menu style={{ marginTop:'10px' }}>
            <Menu.Item>CrowdCoin</Menu.Item>

            <Menu.Menu position="right">
                <Modal trigger={<Menu.Item>+</Menu.Item>}>
                    <Modal.Header>Create New Campaign</Modal.Header>
                    <Modal.Content>
                        <CampaignNew />
                    </Modal.Content>
                </Modal>
            </Menu.Menu>
        </Menu>
    );
};
