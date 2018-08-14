import web3 from './web3';

import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(JSON.parse(CampaignFactory.interface), "0x059D4bB639B9D59a522aCd70238cfB9a71a4Eff2");

export default instance;