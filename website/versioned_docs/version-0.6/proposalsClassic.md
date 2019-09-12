---
id: version-0.6-proposals-classic
title: Proposals
original_id: proposals-classic
---

## Proposals

### Governance

ethanTODO: what are governance proposals and how to vote

StevenTODO: find methods

### Community Proposals

ethanTODO: what are community proposals and how to vote

StevenTODO: find methods

### Challenges

ethanTODO: what are challenges and how to vote, claim winnings

#### Event Challenges

Create a challenge for the specified event, locks a deposit and starts voting process, can be called by anyone

##### Method: `challengeEvent`

> Note: Requires a deposit to be made. See [`getExistingEventDeposit`](#method-getexistingeventdeposit)

###### Method Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`eventId`    | uint    | A unique identifier for the event on the Protocol |

##### Response: `LogEventChallenged`

###### Log Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`eventId`    | uint    | A unique identifier for the event on the Protocol |
|`proposalId` | uint    | A unique identifier for the challenge on the Protocol |
|`lobbyingStart`| uint  | UNIX epoch timestamp for the start of the vote lobbying period |
|`votingStart`| uint    | UNIX epoch timestamp for the start of the voting period |
|`revealingStart`| uint | UNIX epoch timestamp for the start of the vote revealing period |
|`revealingEnd`| uint   | UNIX epoch timestamp for the end of the vote revealing period |

##### Method: `endEventChallenge`

Ends a challenge on the specified event

###### Method Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`eventId`    | uint    | A unique identifier for the event on the Protocol |

##### Response: `LogEventChallengeEnded`

###### Log Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`eventId`    | uint    | A unique identifier for the event on the Protocol |
|`proposalId` | uint    | A unique identifier for the challenge on the Protocol |
|`votesFor`   | uint    | Total number of votes *for* a challenge           |
|`votesAgainst`| uint   | Total number of votes *against* a challenge       |

##### Method: `claimVoterWinnings`

Claim winnings from a proposal if caller voted on the winning side. Results in the caller's share of any proposal winnings being put into their AVT account.

###### Method Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`proposalId` | uint    | A unique identifier for the challenge on the Protocol |

##### Response: `LogVoterWinningsClaimed`

###### Log Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`proposalId` | uint    | A unique identifier for the challenge on the Protocol |

#### Member Challenges

##### Method: `challengeMember`

Create a challenge for the specified member

###### Method Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`memberAddress`| address | address of member to be challenged              |
|`memberType` | string calldata | type of member to be challenged           |

##### Response: `LogMemberChallenged`

###### Log Parameter Descriptions

| Parameter   | Type    | Indexed | Description                                       |
| ----------- | ------- | ------- | ------------------------------------------------- |
|`memberAddress`| address |	✔ |	Address of the new member to be registered      |
|`memberType` | string  | ✘ | Stipulate if the member is to be registered as a Primary or Secondary |
|`proposalId`| uint | ✔ |   |
|`lobbyingStart`| uint | ✘ |   |
|`votingStart`| uint | ✘ |   |
|`revealingStart`| uint | ✘ |   |
|`revealingEnd`| uint | ✘ |   |

##### Method: `endMemberChallenge`

Ends a challenge on the specified member

###### Method Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`memberAddress`| address | address of member to be challenged              |
|`memberType` | string calldata | type of member to be challenged           |

##### Response: `LogMemberChallengeEnded`

###### Log Parameter Descriptions

| Parameter   | Type    | Indexed | Description                                       |
| ----------- | ------- | ------- | ------------------------------------------------- |
|`memberAddress`| address |	✔ |	Address of the new member to be registered      |
|`memberType` | string  | ✘ | Stipulate if the member is to be registered as a Primary or Secondary |
|`proposalId`| uint | ✔ |   |
|`votesFor`| uint | ✘ |   |
|`votesAgainst`| uint | ✘ |   |

##### Method: `memberIsActive`

Returns true if the given member is allowed to use the Aventus Protocol (ie. registered AND not fraudulent)

###### Method Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`memberAddress`| address | address of member to be challenged              |
|`memberType` | string calldata | type of member to be challenged           |

##### Response: `StevenTODO what's this called?`

###### Log Parameter Descriptions

| Parameter   | Type    | Indexed | Description                                       |
| ----------- | ------- | ------- | ------------------------------------------------- |
|`isActive`| bool | ✘ |   |

##### Method: `getExistingMemberDeposit`

Gets the deposit paid for the specified member

###### Method Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`memberAddress`| address | address of member to be challenged              |
|`memberType` | string calldata | type of member to be challenged           |

##### Response: `StevenTODO what's this called?`

###### Log Parameter Descriptions

| Parameter   | Type    | Indexed | Description                                       |
| ----------- | ------- | ------- | ------------------------------------------------- |
|`memberDepositInAVT`| uint | ✘ |   |

### Voting

StevenTODO: find methods
