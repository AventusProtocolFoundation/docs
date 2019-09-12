---
id: version-1.0-glossary
title: Glossary
original_id: glossary
---

## Events

- **Access Control** is the selective restriction of access to an _event_ or other resource. Within our ecosystem, permission to access is granted with a _ticket_ that is referenced as valid in the _doorlist_
- **Doorlist** is a static list of all of the valid _tickets_ for an _event_ used for _access control_. The doorlist can be compiled at any time in the event lifecycle but as _ticket_ ownership updates (_resale_ & _transfer_) can still happen in the run up to an _event_, the list is only useful for _access control_ at the _eventTime_
- **Event** A parent object on the _Aventus Protocol_ which has an _eventOwner_ and can have associated _roles_. The purpose of an event is to group children objects, _tickets_, into manageable and referenceable allocations. Events on the Protocol are designed to align with real-world physical events (ie. Live performance, sports game, conference, etc.) meaning the _eventTime_ should match the real-world time the event is due to take place
- **eventId** A unique identifier for the _event_ on the _Protocol_, see [IDs](glossary#ids) for more info
- **eventOwner** The _role_ of the user who creates the _event_ on the _Protocol_, see [Roles](glossary#roles) for more info
- **eventTime** A [Unix Epoch time](https://en.wikipedia.org/wiki/Unix_time) to signify the time of the real-world physical _event_. Also used by the _Protocol_ to calculate the required _Merkle Root_ _deposit_, see [AVT](glossary#avt) for more info

## Tickets

- **Ticket** A permission that indicates that an individual is entitled to admission to an _event_ tied to an address in a _Ticket Wallet_. A _ticketOwner_ typically pays for a ticket, but our ecosystem is focussed on ticket delivery & handling, so payment considerations are dealt with externally. Ticket's have built-in properties including additional details for that ticket, typically including fields like: grouping (ie. VIP, Earlybird), gate number, row / seat number, etc.
- **ticketId** A unique identifier for the _ticket_ on the _Protocol_, see [IDs](glossary#ids) for more info
- **ticketOwner** The bearer of a _ticket_, see [Roles](glossary#roles) for more info
- **Ticket Wallet** is a mobile application that ingests and displays _tickets_. We've built some reference Ticket Wallet applications using our [Ticket Wallet SDKs](/docs/ticket-wallet) that are compatible with Aventus _tickets_.
- **Resale** Within the Aventus ecosystem a _ticket_ owned by a _ticketOwner_ can be resold to another _Ticket Wallet_, updating the ownership associated with that _ticket_ on the blockchain
- **Cancel** Another action that can be taken on a _ticket_ is a cancellation, meaning that the _ticketOwner_ will no longer be represented on the _doorlist_ so they cannot attend the _event_

## Roles

- **eventOwner** The _role_ of the user who creates the _event_ on the _Protocol_. Identified by an _Ethereum_ _address_, the eventOwner has full admin permissions to carry out event-level actions such as; new _role_ registration, _ticket_ creation, and _ticket_ cancellation
- **Primary** A ticket administrator in the primary market (initial ticket sales). Identified by an _Ethereum_ _address_, the Primary has permissions to carry out ticket-level actions such as; _ticket_ creation, and _ticket_ cancellation
- **Secondary** A third party ticket administrator in the secondary market (pre-owned tickets for resale). Identified by an _Ethereum_ _address_, the Secondary only has permission to carry _resell_ _tickets_
- **ticketOwner** The current bearer of a _ticket_. As ownership can be updated via a _resell_ or _transfer_ this is not always the person who first purchased the ticket from a _Primary_

## Blockchain

- **Blockchain** is a distributed public ledger
- **Ether** is the name of the currency used within _Ethereum_ used to pay for computation within the _EVM_. This is done indirectly by purchasing something known as _gas_ for each transaction sent to the network with Ether
- **Ethereum** is a decentralized platform for applications that run exactly as programmed without any chance of fraud or third-party interference using network consensus. Check out the [original Whitepaper](https://github.com/ethereum/wiki/wiki/White-Paper) for more info
- **Event (Solidity)** is an activity within _Solidity_ that notifies to any listener that something happened on the originating service. These activities are usually published to a [topic](https://ethereum.stackexchange.com/questions/12950/what-are-event-topics) for listeners
- **EVM**
- **Ganache** is a [Node.js based Ethereum client](http://truffleframework.com/ganache/) for testing and development (previously referred to as 'testRPC')
- **Gas** is required for each transaction on the _Ethereum_ network and acts as an execution fee to account for computational usage of the _EVM_. _Nodes_ on the network are paid in gas to process transactions, for more info [see here](https://blockgeeks.com/guides/ethereum-gas-step-by-step-guide/)
- **Geth** is the the command line interface for running a full _Ethereum_ _node_ [implemented in Go](https://geth.ethereum.org/)
- **Libraries** in _Ethereum_ are special types of _smart contract_ which do not store data and cannot hold _ether_. They are are only required to be deployed once and their functions can then be called by any _smart contract_ via [delegate calls](https://blog.aragon.one/library-driven-development-in-solidity-2bebcaf88736)]
- **Smart Contract** allow the performance of credible transactions without third parties, see [more here](https://en.wikipedia.org/wiki/Smart_contract)
- **Solidity** is a [contract-oriented programming language](https://solidity.readthedocs.io/en/latest/) for writing _smart contracts_ that runs on the _EVM_
- **Rinkeby** is a public _Ethereum_ [testnet](https://support.coinbase.com/customer/en/portal/articles/1973566-what-is-the-testnet-) and the one used by the Aventus Protocol

## IDs

- **ticketRef** A reference provided by the _eventOwner_ (or _Primary_) used to uniquely identify a _ticket_ throughout the system. No specific structure for the string is mandated, other than the uniqueness is met per _ticket_ for each _eventOwner_. This value is then referred to as a _vendorTicketRef_ as it is unique to that particular _vendor_ for that particular _event_
- **VendorTicketRefHash** The _vendorTicketRef_ is passed in hashed, it is then appended with the vendor address and hashed again to ensure uniqueness across vendors, before being cast into the Protocol _ticketId_
- **ticketId** A unique _ticketRef_ for each _ticket_ made up of the _vendorTicketRef_ and the _vendor_ address to ensure proper uniqueness across potential multiple _primary_ vendors in a uint256 format
- **eventId** A unique (always incrementing) number associated with each event that is assigned by the _Protocol_ upon creation. Globally unique across the _Protocol_ and all _events_ to ever exist in it

## AVT

- **Aventus Community** is made up of _AVT_ token holders interested in utilising the _Aventus Protocol_
- **AVT** is the [ERC-20 token](https://en.wikipedia.org/wiki/ERC-20) used in the _Aventus Protocol_ (originally referred to as an AventCoin many moons ago)
- **Challenge** The _Aventus Community_ can challenge the legitimacy of _Merkle Leaf_ on the _Protocol_. This is incentivised by the challenger winning the _deposit_ of _AVT_ put down by the original _Validator_ if a challenge is successful
- **Deposit** An amount of _AVT_ required for certain interactions with the _Protocol_ that are open to _challenge_. The deposit is an incentive for a _Validator_ to act correctly as any unwanted behaviour will result in their deposit being lost
- **Governance Proposal** _Aventus Community_ members can propose [governance](https://blockonomi.com/blockchain-governance/) changes to the _Protocol_ parameters on the _Parameter Registry_. Once a proposal has been initiated, members can vote on wether the change should be applied or not by voting with their _AVT_ stake. Each proposal has defined time-periods in which certain actions must take place:
  - **Lobbying Period** is the 2 week time slot at the start of the _Governance Proposal_ process where the _Aventus Community_ can externally discuss and debate a new proposal, followed by the _Voting Period_
  - **Voting Period** is the 1 week time slot following a _Lobbying Period_ during the proposal process where the _Aventus Community_ can submit secret signed votes on whether a _Governance Proposal_ should be applied or not
  - **Reveal Period** is the 1 week time slot following a _Voting Period_ at the end of the proposal process where the _Aventus Community_ can reveal their vote by re-submitting a secret signed vote on a _Governance Proposal_. Once all votes have been revealed then the
  proposal process can be concluded and _AVT_ amounts for each vote option are tallied to decide a winner
- **Hashing** takes an input string of any length and gives an encrypted output of a deterministic fixed length string. Hashing is used throughout the _Protocol_ alongside _Signing_. Try out [this example here](https://emn178.github.io/online-tools/keccak_256.html)
