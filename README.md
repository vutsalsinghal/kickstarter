# Kickstarter Ðapp

**Problem**: In crowfunding platforms such as [Kickstarter](https://www.kickstarter.com/), once the money is raised from contributors, there is no guarantee that the person that started the crowdfunding campaign will use the money appropriately. Sometimes people are outright malicious and can simply take the money and [*run away*](https://www.digitaltrends.com/cool-tech/biggest-kickstarter-and-indiegogo-scams).

**Solution**: To prevent this, we can safely rely on [Ethereum blockchain](https://www.ethereum.org/) with which the contributors give deposit ether to the campaign and can keep track of where exactly the money is being spent. By contributing to a campaign they can also participate in the approval process of where the money should be spent. This provids assurance and improved standards on how crowdfunding campaigns can be run.

Rules:
- The Person that creates the Campaign becomes the manager
- Once a Campaign is created, multiple people can contribute to the campaign by clicking View Campaign
- Within each campaign page, you can look at related funding Requests by clicking View Requests
- Once Manager creates a request, people that contributed to Campaign, can Approve the Request
- Finally, once the request has 50% or more approvals, Manager can finalize the request so recepient can receive the funds


## Requirements 
- Clone this repo
- Navigate to root dir with package.json file
- Run `npm install` to install all related dependencies
- Install [Metamask](https://metamask.io/) extension to interact with the dapp

## Run on localhost
- Run `npm install -g server` to install local static server
- Now run `serve -s build` and then navigate to `localhost:3000` on your browser (with Metamask signed in)
