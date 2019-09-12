---
id: version-0.0.1-protocol-classic
title: Aventus Classic
original_id: protocol-classic
---

Alongside the tier 2 Protocol implementation, Aventus Classic exists as the protocol was outlined in the original [Aventus Protocol Foundation whitepaper](https://aventus.io/wp-content/uploads/2019/03/Whitepaper.pdf). Aventus Classic was built with the intention of solving the same core industry problems but during development several critical issues were highlighted which led us to revisit the implementation and led to the development of the Tier 2 Artos Cloud. Principally, the original protocol was too closely tied to the Ethereum network and hence inherits some of its flaws; including the ability to scale large transaction volumes.

The Classic protocol is still a viable solution for a grassroots event owner working with low ticket volumes. Find below a high-level overview of the Classic protocol and how to interact with the smart contracts deployed on the Ethereum mainnet.

ethanTODO: Review with DevX focus

xzibitTODO: sample call & responses for each method, a la [api guides](/docs/api-guides)

## Event Management

### Create Event

#### Method: `createEvent`

Event creation requires a deposit in AVT, and is therefor challengeable by other actors in the network

##### Method Parameter Descriptions

| Parameter       | Type   | Description                                   |
| --------------- | ------ | --------------------------------------------- |
|`eventDesc`      | string | A brief, human-readable description of the event you are hosting |
|`eventTime`      | uint   | Actual Epoch time the event starts IRL        |
|`eventSupportURL`| string | A URL referring to data that acts as evidence for the event - eg the addresses used for sale/resale - to help prevent challenges |
|`onSaleTime`| uint | When tickets go on sale: before this time is the "reporting period" so the event can be challenged before ticket sales start |
|`offSaleTime`    | uint   | The Epoch time that allows for no new tickets to be created or transfers of ownership after this time |
|`averageTicketPriceInUSCents`| uint | Used to calculate the event deposit, the higher the average ticket price, the higher the event deposit |

#### Response: `LogEventCreated`

##### Log Parameter Descriptions

| Parameter       | Type   | Description                                       |
| --------------- | ------ | ------------------------------------------------- |
|`eventId`        | uint   | A unique identifier for the event on the Protocol |
|`eventOwner`     | address | Public key of the event owner who is creating this event |
|`eventDesc`      | string | A brief, human-readable description of the event you are hosting |
|`eventTime`      | uint   | Actual Epoch time the event starts IRL  |
|`eventSupportURL`| string | A URL referring to data that acts as evidence for the event - eg the addresses used for sale/resale - to help prevent challenges |
|`onSaleTime`     | uint   | When tickets go on sale: before this time is the "reporting period" so the event can be challenged before ticket sales start |
|`offSaleTime`    | uint   | The Epoch time that allows for no new tickets to be created or transfers of ownership after this time |
|`averageTicketPriceInUSCents` | uint  | Used to calculate the event deposit, the higher the average ticket price, the higher the event deposit |
|`depositInAVT`   | uint   | The amount of AVT required to create the event |

### Register Role on Event

#### Method: `registerRoleOnEvent`

Once an event has been created, the RegisterRoleOnEvent method can be called by the Event Owner to add users with Primary or Secondary permission roles on that event. Address must already be registered as a protocol member

##### Method Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`eventId`    | uint    | A unique identifier for the event on the Protocol |
|`roleAddress`| address | The address of the role being registered          |
|`role`       | string  | A case insensitive string representing a valid blockchain role (eg. primary, secondary) |

#### Response: `LogEventRoleRegistered`

##### Log Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`eventId`    | uint    | A unique identifier for the event on the Protocol |
|`roleAddress`| address | The address of the role being registered          |
|`role`       | string  | A case insensitive string representing a valid blockchain role (eg. primary, secondary) |

### End Ticket Sales

#### Method: `takeEventOffSale`

Can only be called in ticket sales period.
Immediately stop ticket sales (updates offSaleTime to *now*), called by the Event Owner

##### Method Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`eventId`    | uint    | A unique identifier for the event on the Protocol |

#### Response: `LogEventTakenOffSale`

##### Log Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`eventId`    | uint    | A unique identifier for the event on the Protocol |

### End Event

* NOTE: Can only be done when event is not under challenge

#### Method: `cancelEvent`

Ends Event before sales start, called by the Event Owner

##### Method Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`eventId`    | uint    | A unique identifier for the event on the Protocol |

#### Response: `LogEventCancelled`

##### Log Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`eventId`    | uint    | A unique identifier for the event on the Protocol |

#### Method: `endEvent`

Deregisters event after event time has passed (unlocks deposit), can be called by anyone

##### Method Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`eventId`    | uint    | A unique identifier for the event on the Protocol |

#### Response: `LogEventEnded`

##### Log Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`eventId`    | uint    | A unique identifier for the event on the Protocol |

### Event Challenges

#### Method: `challengeEvent`

> Requires a deposit to be made. See `getExistingEventDeposit`

Create a challenge for the specified event, locks a deposit and starts voting process, can be called by anyone

##### Method Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`eventId`    | uint    | A unique identifier for the event on the Protocol |

#### Response: `LogEventChallenged`

##### Log Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`eventId`    | uint    | A unique identifier for the event on the Protocol |
|`proposalId` | uint    | A unique identifier for the challenge on the Protocol |
|`lobbyingStart`| uint  | UNIX epoch timestamp for the start of the vote lobbying period |
|`votingStart`| uint    | UNIX epoch timestamp for the start of the voting period |
|`revealingStart`| uint | UNIX epoch timestamp for the start of the vote revealing period |
|`revealingEnd`| uint   | UNIX epoch timestamp for the end of the vote revealing period |

#### Method: `endEventChallenge`

Ends a challenge on the specified event.

##### Method Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`eventId`    | uint    | A unique identifier for the event on the Protocol |

#### Response: `LogEventChallengeEnded`

##### Log Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`eventId`    | uint    | A unique identifier for the event on the Protocol |
|`proposalId` | uint    | A unique identifier for the challenge on the Protocol |
|`votesFor`   | uint    | Total number of votes *for* a challenge           |
|`votesAgainst`| uint   | Total number of votes *against* a challenge       |

#### Method: `claimVoterWinnings`

Claim winnings from a proposal if caller voted on the winning side. Results in the caller's share of any proposal winnings being put into their AVT account.

##### Method Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`proposalId` | uint    | A unique identifier for the challenge on the Protocol |

#### Response: `LogVoterWinningsClaimed`

##### Log Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`eventId`    | uint    | A unique identifier for the event on the Protocol |
|`proposalId` | uint    | A unique identifier for the challenge on the Protocol |

#### Method: `getNewEventDeposit`

Given the average ticket price, returns the required deposit, can be called by anyone

##### Method Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`eventId`    | uint    | A unique identifier for the event on the Protocol |

##### Response

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`depositInAVT`| uint   | The amount of AVT required to create the event, expressed in attoavts |

#### Method: `getExistingEventDeposit`

Get the value of the AVT deposit that was paid for the given event; this must be matched to challenge the event

##### Method Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`averageTicketPriceInUSCents`| uint | Average ticket price in US Cents     |

##### Response

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`depositInAVT`| uint   | The amount of AVT required to create the event, expressed in attoavts |

## Ticket Management

### Create Ticket(s)

#### Method: `sellTicket`

Uses a single ticket buyer private key for ownership and door access, can only be sent from Event Owner or registered Primary. No doorData

##### Method Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`eventId`    | uint    | A unique identifier for the event on the Protocol |
|`vendorTicketRefHash`| bytes32  | Hash of the vendor (event owner or primary) generated unique ticket reference for the event |
|`ticketMetadata`| string | Contextual, non-unique data associated with a ticket used by the wallets UI. includes but not exclusive to: event name, event time, venue location, etc |
|`buyer`      | address | Address of the ticket buyer |

#### Response: `LogTicketSold`

##### Log Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`eventId`    | uint    | A unique identifier for the event on the Protocol |
|`ticketId`   | uint    | A unique identifier for the ticket on the Protocol |
|`vendorTicketRefHash`| bytes32  | Hash of the vendor (event owner or primary) generated unique ticket reference for the event |
|`ticketMetadata`| string | Contextual, non-unique data associated with a ticket used by the wallets UI. includes but not exclusive to: event name, event time, venue location, etc |
|`buyer`      | address | Address of the ticket buyer |

#### Method: `sellMultipleTickets`

Primary sale of up to 100 tickets. Supports different ticket ref, metadata, and buyer. Used when metadata is unique to ticket, eg specifies row/seat/etc

##### Method Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`eventId`    | uint    | A unique identifier for the event on the Protocol |
|`tickets`    | encoded bytes | Encoded vendorTicketRefHash, ticketMetadata and buyer address for each ticket |

##### Response

Multiple `LogTicketSold` events

#### Method: `sellMultipleTicketsSameMetaData`

Primary sale of up to 100 tickets. Supports different ticket ref and buyer. Used when metadata is the same for a group of tickets, eg “General Admission”

##### Method Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`eventId`    | uint    | A unique identifier for the event on the Protocol |
|`ticketMetadata`| string | Contextual, non-unique data associated with a ticket used by the wallets UI. includes but not exclusive to: event name, event time, venue location, etc |
|`tickets`    | encoded bytes | Encoded vendorTicketRefHash and buyer address for each ticket |

##### Response

Multiple `LogTicketSold` events

### Cancel Ticket

#### Method: `cancelTicket`

Can only be sent from Event Owner or the original Primary

##### Method Parameter Descriptions

| Parameter  | Type  | Description                                        |
| ---------- | ----- | -------------------------------------------------- |
|`eventId`   | uint  | A unique identifier for the event on the Protocol  |
|`ticketId`  | uint  | A unique identifier for the ticket on the Protocol |

#### Response: `LogTicketCancelled`

##### Log Parameter Descriptions

| Parameter  | Type  | Description                                        |
| ---------- | ----- | -------------------------------------------------- |
|`eventId`   | uint  | A unique identifier for the event on the Protocol  |
|`ticketId`  | uint  | A unique identifier for the ticket on the Protocol |

### Resell Ticket

#### Method: `resellTicket`

Can only be sent from Event Owner or registered Secondary

##### Method Parameter Descriptions

| Parameter   | Type    | Description                                        |
| ----------- | ------- | -------------------------------------------------- |
|`eventId`    | uint    | A unique identifier for the event on the Protocol  |
|`ticketId`   | uint    | A unique identifier for the ticket on the Protocol |
|`ticketOwnerPermission`| bytes | A hash of eventId/ticketRef/TicketOwner Address, signed with the ticket owner key |
|`newBuyer`   | address | Address of the new buyer of the ticket             |

#### Response: `LogTicketResold`

##### Log Parameter Descriptions

| Parameter   | Type    | Description                                        |
| ----------- | ------- | -------------------------------------------------- |
|`eventId`    | uint    | A unique identifier for the event on the Protocol  |
|`ticketId`   | uint    | A unique identifier for the ticket on the Protocol |
|`newBuyer`   | address | Address of the new buyer of the ticket             |

## Member Management

### Member Registration

Register the given address and member type on the Aventus Protocol, only Primary and Secondary types supported

> Requires a deposit to be made. See `getMemberDeposit`

#### Method: `registerMember`

##### Method Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`memberAddress`| address | Address of the new member to be registered      |
|`memberType` | string  | Stipulate if the member is to be registered as a Primary or Secondary |
|`evidenceUrl`| string  | External URL to validate the legitimacy of the new member registration |
|`desc`       | string  | A brief description of the member being registered, ie. company name |

#### Response: `LogMemberRegistered`

##### Log Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`memberAddress`| address | Address of the new member to be registered      |
|`memberType` | string  | Stipulate if the member is to be registered as a Primary or Secondary |
|`evidenceUrl`| string  | External URL to validate the legitimacy of the new member registration |
|`desc`       | string  | A brief description of the member being registered, ie. company name |
|`deposit`    | uint    | The amount of AVT required to create the event, expressed in attoavts |

#### Method: `getNewMemberDeposit`

##### Method Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`memberType` | string  | Stipulate if the member is to be registered as a Primary or Secondary |

##### Response

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`memberDepositInAVT`| uint | The amount of AVT required to create the event, expressed in attoavts |

#### Method: `deregisterMember`

Primary and Secondary can only be deregistered after a cooling off period since the latest eventTime of the tickets they have sold/resold. This will stop the given member from using the Aventus Protocol and unlock the deposit that was locked when the member was registered.

##### Method Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`memberAddress`| address | Address of the new member to be registered      |
|`memberType` | string  | Stipulate if the member is to be registered as a Primary or Secondary |

#### Response: `LogMemberDeregistered`

##### Log Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`memberAddress`| address | Address of the new member to be registered      |
|`memberType` | string  | Stipulate if the member is to be registered as a Primary or Secondary |
