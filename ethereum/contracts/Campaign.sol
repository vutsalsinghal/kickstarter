pragma solidity^0.4.24;


contract CampaignFactory{
    address[] public deployedCampaigns;
    
    function createCampaign(uint minContribution) public {
        address newCampaign = new Campaign(msg.sender, minContribution);
        deployedCampaigns.push(newCampaign);
    }
    
    function getDeployedCampaign() public view returns(address[]){
        return deployedCampaigns;
    }
}

contract Campaign{
    struct Request{
        string description;
        uint value;
        uint approvalCount;
        address recipient;
        bool complete;
        mapping(address=>bool) approvals;
    }
    
    Request[] public requests;
    address public manager;
    uint public minContribution;
    uint public approversCount;
    mapping (address=>bool) public approvers;
    
    modifier restricted{
        require(msg.sender == manager);
        _;
    }
    
    constructor(address creator, uint minCon) public{
        manager = creator;
        minContribution = minCon;
    }
    
    function contribute() public payable{
        require(msg.value >= minContribution);
        approvers[msg.sender] = true;
        approversCount++;
    }
    
    function createRequest(string description, uint value, address recipient) external restricted{
        Request memory newRequest = Request(description, value, 0, recipient, false);
        requests.push(newRequest);
    }
    
    function approveRequest(uint index) public {
        Request storage request = requests[index];
        
        require(approvers[msg.sender]);  // is a approver?
        require(!request.approvals[msg.sender]); // has not participated in approval process
        
        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }
    
    function finalizeRequest(uint index) public restricted{
        Request storage request = requests[index];
        
        require(request.approvalCount > (approversCount/2));
        require(!request.complete);
        
        request.complete = true;
        request.recipient.transfer(request.value);
    }

    function getSummary() public view returns(uint, uint, uint, uint, address){
        return (minContribution,address(this).balance,requests.length,approversCount,manager);
    }

    function getRequestsCount() public view returns(uint){
        return requests.length;
    }
}
