---
id: version-0.10-aventus-classic
title: Guides
original_id: aventus-classic
---

Find below a high-level overview of the Classic protocol and how to interact with the smart contracts currently deployed on the Ethereum Testnet (Rinkeby).

StevenTODO: review *all* responses to check for indexing, some currently don't have an indexed field and some do...?

## Contracts

_Rinkeby contract address placeholder_

AndyTODO: briefly explain how to interact with them

## AVT Mechanics

Certain interactions with the Aventus Protocol require a deposit using the Protocol's token [AVT](https://etherscan.io/token/0x0d88ed6e74bbfd96b831231638b66c05571e824f) in order to penalise improper behaviour within the network

AndyTODO: add Rinkeby AVT contract address link

As the Protocol is currently deployed to Rinkeby we've introduced an AVT Tap (similar to Ethereum's faucet) to release testnet AVTs for use with the Protocol

AndyTODO: add link and docs for Rinkeby AVT Tap

#### Event Deposit

Every new event requires a deposit of 2000 AVT (1000 AVT if the event is free), which is returned to the owner once the `eventTime` has passed. If an event is voted to be fraudulent by the community, the event deposit will be shared amongst the voting community.

#### Member Deposit

Members who wish to create events and tickets must first put up a deposit of 5000 AVT. If a member is voted to be fraudulent by the community, their member deposit will be shared amongst the voting community.

## Member Management

### Member Registration

Register the given address and member type on the Aventus Protocol, only Primary and Secondary types supported

> Requires a deposit to be made. See [`getNewMemberDeposit`](#method-getnewmemberdeposit) to know the amount required

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

### Member Deregistration

#### Method: `getDeregistrationTime`

Timestamp of when this member can be deregistered; zero if no restrictions

##### Method Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`memberAddress`| address | Address of the member to be deregistered |
|`memberType` | string  | Type of the member to be deregistered, either Primary or Secondary |

#### Response

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`deregistrationTime`| unit | Timestamp of when this member can be deregistered; zero if no restrictions |

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

## Event Management

### Create Event

Events are the bedrock of any ticket interaction on the Protocol and an event must be in place before tickets can be created. This endpoint will create an Aventus event parent object directly on the [Ethereum blockchain](https://en.wikipedia.org/wiki/Ethereum)

We refer to the user calling this endpoint as the _eventOwner_. Identity on Ethereum is represented by a 20 byte public key address and corresponding private key.

#### Method: `createEvent`

> Note: Event creation requires a deposit in AVT, and is therefor challengeable by other actors in the network. See [Event Challenges](/proposals-classic#event-challenges)

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
|`averageTicketPriceInUSCents`| uint  | Used to calculate the event deposit, the higher the average ticket price, the higher the event deposit |
|`depositInAVT`   | uint   | The amount of AVT required to create the event |

### Register Role on Event

You should now have created an event on the Protocol, and as the _eventOwner_, may wish to add third party permissions to the event to manage your tickets. Event-level roles such as _Primary_ and _Secondary_ vendors must be set using this method before they have the rights to interact with tickets for an event.

As before with the `eventOwner` address, a new role must be registered with a public key address as an identity mechanism.

#### Method: `registerRoleOnEvent`

> Note: Address must already be registered as a protocol member, see [Member registration](#member-registration)

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

### Get Event Time

Get the time of an event

#### Method: `getEventTime`

##### Method Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`eventId`    | uint    | A unique identifier for the event on the Protocol |

#### Response

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`eventTime`  | uint    | Timestamp of when the event starts; zero if no matching `eventId` |

### Get On Sale Time

Get the on sale time of an event

#### Method: `getOnSaleTime`

##### Method Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`eventId`    | uint    | A unique identifier for the event on the Protocol |

#### Response

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`eventTime`  | uint    | Timestamp of when tickets for the event go on sale; zero if no matching `eventId` |

### Get Off Sale Time

Get the off sale time of an event

#### Method: `getOffSaleTime`

##### Method Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`eventId`    | uint    | A unique identifier for the event on the Protocol |

#### Response

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`eventTime`  | uint    | Timestamp of when tickets for the event go off sale; zero if no matching `eventId` |

### End Ticket Sales

Immediately stops new ticket creations (updates `offSaleTime` to *now*), called by the `eventOwner`

#### Method: `takeEventOffSale`

> Note: Can only be called in ticket sales period.

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

Ends Event before sales start, called by the Event Owner

#### Method: `cancelEvent`

> Note: Can only be done when event is not under challenge

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

Deregisters event after `eventTime` has passed (unlocks deposit), can be called by anyone

##### Method Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`eventId`    | uint    | A unique identifier for the event on the Protocol |

#### Response: `LogEventEnded`

##### Log Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`eventId`    | uint    | A unique identifier for the event on the Protocol |

#### Method: `getNewEventDeposit`

Given the average ticket price, returns the required deposit, can be called by anyone

##### Method Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`averageTicketPriceInUSCents`| uint | Average ticket price in US Cents     |

##### Response

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`depositInAVT`| uint   | The amount of AVT required to create the event, expressed in attoavts |

#### Method: `getExistingEventDeposit`

Get the value of the AVT deposit that was paid for the given event; this must be matched to challenge the event

##### Method Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`eventId`    | uint    | A unique identifier for the event on the Protocol |

##### Response

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`eventDeposit`| uint   | The amount of AVT been deposited for the specified event, expressed in attoavts |

## Ticket Management

### Create Ticket(s)

#### Method: `sellTicket`

Uses a single ticket buyer private key for ownership and door access, can only be sent from `eventOwner` or registered Primary.

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

Can only be sent from `eventOwner` or the original Primary

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

Can only be sent from `eventOwner` or registered Secondary

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
