---
id: classic-contracts
title: Contracts
---

The Protocol is deployed in the form of [Smart Contracts](https://en.wikipedia.org/wiki/Smart_contract) on Ethereum (Rinkeby testnet). The exact location of each contract can be found below:

## Contracts

Rinkeby contract addresses:

- **AventusStorage** [0x929d67079aA9786C45e1454B25d4Fa7957b1B208](https://rinkeby.etherscan.io/address/0x929d67079aA9786C45e1454B25d4Fa7957b1B208)
- **AVT** [0x624CAb4a84b5172D39D320B7AE7191B1458ADdf4](https://rinkeby.etherscan.io/address/0x624CAb4a84b5172D39D320B7AE7191B1458ADdf4)
- **AVTFaucet** [0x3D125E619955623d463Cf1a62A316356bB3b1C2D](https://rinkeby.etherscan.io/address/0x3D125E619955623d463Cf1a62A316356bB3b1C2D)
- **AVTManager** [0xC0Cf68c40c1BD1f4EDDfac4648Fa772A21Ee0030](https://rinkeby.etherscan.io/address/0xC0Cf68c40c1BD1f4EDDfac4648Fa772A21Ee0030)
- **EventsManager** [0x3Ea603A3B80b621e3253dc3b3D80db9B5799AdA8](https://rinkeby.etherscan.io/address/0x3Ea603A3B80b621e3253dc3b3D80db9B5799AdA8)
- **MembersManager** [0xf1486E2bAC192B538e2D9906D09BeCa0Fd4F1647](https://rinkeby.etherscan.io/address/0xf1486E2bAC192B538e2D9906D09BeCa0Fd4F1647)
- **ProposalsManager** [0xE4F3A588140ec425aF307C7aED873188a9b9534e](https://rinkeby.etherscan.io/address/0xE4F3A588140ec425aF307C7aED873188a9b9534e)

## Faucet

The AVTFaucet contract can drip 10AVT per day to any address.

This is enough to create an event that does not charge for its tickets: 20AVT is required for a paid event.

Call the:
- drip() function to get your AVT.
- getNextPaymentTime() function to see when you can next get a drip.


## Interfaces

All our othercontracts are accessed via interfaces, as defined in the contracts/interfaces directory:

- **IAventusStorage** the storage contract for all data in the Aventus Protocol
- **IAVTManager** the AVT management contract: use this for depositing and withdrawing AVT into and out of the protocol
- **IERC20** the ERC20 interface: use this to access the AVT contract directly for approvals of protocol deposits
- **IEventsManager** event (create, delete, take off-sale, challenge, etc) and ticket (sell, resell, cancel, etc) management is all done here
- **IMembersManager** register or challenge addresses as Primary and Secondary members on the protocol
- **IProposalsManager** used for creating governance and community proposals; also used for voting on any proposals, including challenges

See the interfaces directly in the code [here](https://github.com/AventusProtocolFoundation/protocol-classic/tree/master/contracts/interfaces) for more infomation.
