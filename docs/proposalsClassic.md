---
id: proposals-classic
title: Proposals
---

Find below an overview of the governance and challenge functionality of the Aventus Classic Protocol, see the [Contracts](/docs/classic-contracts) page for the detailed locations showing where to reference these methods.

## Governance

Governance refers to the mechanisms by which decentralised networks adapt and change over time. AVT holders have a stake in the network and as such can propose to adapt the way the code runs by initiating a governance proposal. Other AVT holders can then vote on the proposal to determine wether the network agrees or disagrees with the change.

#### Method: `createGovernanceProposal`

Create a governance proposal to be voted on

##### Method Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`desc`       | string  | Either just a title or a pointer to IPFS details  |
|`bytecode`   | bytes   | The bytecode to be run if the proposal succeeds   |

#### Response: `LogGovernanceProposalCreated`

##### Log Parameter Descriptions

| Parameter   | Type    | Indexed | Description                                       |
| ----------- | ------- | ------- | ------------------------------------------------- |
|`proposalId`| uint | ✔ | A unique identifier for the new governance proposal been created |
|`sender`| address | ✔ | Address of the governance proposal sender |
|`desc`| string | ✘ | Either just a title or a pointer to IPFS details |
|`lobbyingStart`| uint | ✘ | UNIX epoch timestamp for the start of the vote lobbying period |
|`votingStart`| uint | ✘ | UNIX epoch timestamp for the start of the voting period |
|`revealingStart`| uint | ✘ | UNIX epoch timestamp for the start of the vote revealing period |
|`revealingEnd`| uint | ✘ | UNIX epoch timestamp for the end of the vote revealing period |
|`deposit`| uint | ✘ | The deposit value in AVT for the new governance proposal |
|`bytecode`| bytes | ✘ | The bytecode to be run if the proposal succeeds |

#### Method: `endGovernanceProposal`

End the governance proposal: will unlock the deposit.

> NOTE: Can only be called once vote revealing has finished.

##### Method Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`proposalId` | uint | A unique identifier for the governance proposal |

#### Response: `LogGovernanceProposalEnded`

##### Log Parameter Descriptions

| Parameter   | Type    | Indexed | Description                                       |
| ----------- | ------- | ------- | ------------------------------------------------- |
|`proposalId`| uint | ✔ | A unique identifier for the governance proposal |
|`votesFor`| uint | ✘ | Total number of votes *for* the governance proposal |
|`votesAgainst`| uint | ✘ | Total number of votes *against* the governance proposal |
|`implemented`| bool | ✘ | Returns true if the bytecode assigned to the governance proposal has been run successfully, otherwise returns false |

#### Method: `getGovernanceProposalDeposit`

Get the governance proposal deposit

##### Method Parameter Descriptions

None

#### Response

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`proposalDeposit`| uint | The deposit value in AVT for the governance proposal |

## Community Proposals

Community Proposals are similar to governance proposals but do not programatically affect the system, only offering advisory proposals

#### Method: `createCommunityProposal`

Create a community proposal to be voted on

##### Method Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`desc`       | string  | Description of the new community proposal, preferably with a URL for further details |

#### Response: `LogCommunityProposalCreated`

##### Log Parameter Descriptions

| Parameter   | Type    | Indexed | Description                                       |
| ----------- | ------- | ------- | ------------------------------------------------- |
|`proposalId`| uint | ✔ | A unique identifier for the new community proposal been created |
|`sender`| address | ✔ | Address of the community proposal sender |
|`desc`| string | ✘ | Description of the proposal, preferably with a URL for further details |
|`lobbyingStart`| uint | ✘ | UNIX epoch timestamp for the start of the vote lobbying period |
|`votingStart`| uint | ✘ | UNIX epoch timestamp for the start of the voting period |
|`revealingStart`| uint | ✘ | UNIX epoch timestamp for the start of the vote revealing period |
|`revealingEnd`| uint | ✘ | UNIX epoch timestamp for the end of the vote revealing period |
|`deposit`| uint | ✘ | The deposit value in AVT for the new community proposal |

#### Method: `endCommunityProposal`

End the community proposal: will unlock the deposit.

> NOTE: Can only be called once vote revealing has finished.

##### Method Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`proposalId`| uint | A unique identifier for the community proposal to be ended |

#### Response: `LogCommunityProposalCreated`

##### Log Parameter Descriptions

| Parameter   | Type    | Indexed | Description                                       |
| ----------- | ------- | ------- | ------------------------------------------------- |
|`proposalId`| uint | ✔ | A unique identifier for the proposal to be ended |
|`votesFor`| uint | ✘ | Total number of votes *for* the community proposal |
|`votesAgainst`| uint | ✘ | Total number of votes *against* the community proposal |

#### Method: `getCommunityProposalDeposit`

Get the community proposal deposit

##### Method Parameter Descriptions

None

#### Response

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`proposalDeposit`| uint | The deposit value in AVT for the community proposal |

## Challenges

Challenges are a way for any AVT holder to challenge a user of the network if they deem them to be a bad actor. The community then has a chance to penalise the Protocol user based on the evidence provided by the challenger.

Each member and each event has a deposit of AVT put up by the Protocol user and crucially AVT must be put up by the challenger in order to initiate. Both these amounts of AVT are at stake and depending on the outcome of the vote will be shared with the winning side.

### Event Challenges

Create a challenge for the specified event, locks a deposit and starts voting process, can be called by anyone

#### Method: `challengeEvent`

> Note: Requires a deposit to be made. See [`getExistingEventDeposit`](#method-getexistingeventdeposit)

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

Ends a challenge on the specified event

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

### Member Challenges

#### Method: `challengeMember`

Create a challenge for the specified member

##### Method Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`memberAddress`| address | Address of the member to be challenged |
|`memberType` | string | Type of the member to be challenged, ie Primary or Secondary |

#### Response: `LogMemberChallenged`

##### Log Parameter Descriptions

| Parameter   | Type    | Indexed | Description                                       |
| ----------- | ------- | ------- | ------------------------------------------------- |
|`memberAddress`| address |	✔ |	Address of the member being challenged |
|`memberType` | string  | ✘ | Type of the member being challenged, ie Primary or Secondary |
|`proposalId`| uint | ✔ | A unique identifier for the challenge on the Protocol |
|`lobbyingStart`| uint | ✘ | UNIX epoch timestamp for the start of the vote lobbying period |
|`votingStart`| uint | ✘ | UNIX epoch timestamp for the start of the voting period |
|`revealingStart`| uint | ✘ | UNIX epoch timestamp for the start of the vote revealing period |
|`revealingEnd`| uint | ✘ | UNIX epoch timestamp for the end of the vote revealing period |

#### Method: `endMemberChallenge`

Ends a challenge on the specified member

##### Method Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`memberAddress`| address | Address of the member for which the challenge should end|
|`memberType` | string | Type of the member, ie Primary or Secondary |

#### Response: `LogMemberChallengeEnded`

##### Log Parameter Descriptions

| Parameter   | Type    | Indexed | Description                                       |
| ----------- | ------- | ------- | ------------------------------------------------- |
|`memberAddress`| address |	✔ |	Address of the member for which the challenge has ended |
|`memberType` | string  | ✘ | Type of the member, ie Primary or Secondary |
|`proposalId`| uint | ✔ | A unique identifier for the challenge on the Protocol |
|`votesFor`| uint | ✘ | Total number of votes *for* a challenge |
|`votesAgainst`| uint | ✘ | Total number of votes *against* a challenge |

#### Method: `memberIsActive`

Check if the given member is allowed to use the Aventus Protocol or not.

##### Method Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`memberAddress`| address | Address of the member to be checked |
|`memberType` | string | Type of the member to be checked, ie Primary or Secondary |

#### Response

| Parameter   | Type    | Indexed | Description                                       |
| ----------- | ------- | ------- | ------------------------------------------------- |
|`isActive`| bool | ✘ | Returns true if the given member is registered AND not fraudulent, otherwise returns false
 |

#### Method: `getExistingMemberDeposit`

Gets the deposit paid by the specified member

##### Method Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`memberAddress`| address | Address of the member |
|`memberType` | string | Type of the member, ie Primary or Secondary |

#### Response

| Parameter   | Type    | Indexed | Description                                       |
| ----------- | ------- | ------- | ------------------------------------------------- |
|`memberDepositInAVT`| uint | ✘ | The amount of AVT that has been deposited by the member, expressed in attoavts |

## Voting

AVT holders can vote on governance proposals, community proposals and event challenges; their voting weight determined by the amount of AVT they hold, acting as their stake in the vote.

#### Method: `getVotingStartTime`

Get the starting time of a vote

##### Method Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`proposalId`| uint | A unique identifier for the challenge on the Protocol |

#### Response

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`votingStartTime`| uint | UNIX epoch timestamp for the start of the voting period |

#### Method: `getVotingRevealStartTime`

Get the ending time of a vote / start of the vote's reveal period

##### Method Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`proposalId`| uint | A unique identifier for the challenge on the Protocol |

#### Response

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`votingRevealStartTime`| uint | UNIX epoch timestamp for voting period ends/revealing period starts; zero if no matching proposalId |

#### Method: `getVotingRevealEndTime`

Get the ending time of a vote's revealing period

##### Method Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`proposalId`| uint | A unique identifier for the challenge on the Protocol |

#### Response

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`votingRevealEndTime`| uint | UNIX epoch timestamp for when the revealing period ends; zero if no matching proposalId. |

#### Method: `castVote`

Cast a vote on one of a given proposal's options

> NOTE: Vote must be revealed within the proposal revealing period to count.

##### Method Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`proposalId` | uint | A unique identifier for the challenge on the Protocol |
|`secret` | bytes32 | The secret vote: hashed(signedSecret) where signedSecret is signed(hashed((proposalId * 10) + option ID))) |

#### Response: `LogVoteCast`

##### Log Parameter Descriptions

| Parameter   | Type    | Indexed | Description                                       |
| ----------- | ------- | ------- | ------------------------------------------------- |
|`proposalId`| uint | ✔ | A unique identifier for the challenge on the Protocol |
|`sender`| address | ✔ | Address of the proposal sender |
|`secret`| bytes32 | ✘ | The secret vote: Sha3(signed Sha3(option ID)) |

#### Method: `cancelVote`

Cancel a vote on one of a given proposal's options

> NOTE: Vote must be cancelled within the voting period.

##### Method Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`proposalId` | uint | A unique identifier for the challenge on the Protocol |

#### Response: `LogVoteCancelled`

##### Log Parameter Descriptions

| Parameter   | Type    | Indexed | Description                                       |
| ----------- | ------- | ------- | ------------------------------------------------- |
|`proposalId`| uint | ✔ | A unique identifier for the challenge on the Protocol |
|`sender`| address | ✔ | Address of the proposal sender |

#### Method: `revealVote`

Reveal a vote on a proposal

> NOTE: Votes only count if the caller has AVT when they reveal their vote (see IAVTManager.sol)

##### Method Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`signedMessage` | bytes | The signed secret: signed(hashed((proposalId * 10) + optionId)) |
|`proposalId` | uint | A unique identifier for the challenge on the Protocol |
|`optId` | uint | ID of option that was voted on |

#### Response: `LogVoteRevealed`

##### Log Parameter Descriptions

| Parameter   | Type    | Indexed | Description                                       |
| ----------- | ------- | ------- | ------------------------------------------------- |
|`proposalId`| uint | ✔ | A unique identifier for the challenge on the Protocol |
|`sender`| address | ✔ | Address of the proposal sender |
|`optId`| uint | ✔ | ID of option that was voted on |
|`revealingStart`| uint | ✘ | UNIX epoch timestamp for the start of the vote revealing period |
|`revealingEnd`| uint | ✘ | UNIX epoch timestamp for the end of the vote revealing period |

#### Method: `claimVoterWinnings`

Claim winnings from a proposal if caller voted on the winning side. Results in the caller's share of any proposal winnings being put into their AVT account.

##### Method Parameter Descriptions

| Parameter   | Type    | Description                                       |
| ----------- | ------- | ------------------------------------------------- |
|`proposalId` | uint    | A unique identifier for the challenge on the Protocol |

#### Response: `LogVoterWinningsClaimed`

##### Log Parameter Descriptions

| Parameter   | Type    | Indexed | Description                                       |
| ----------- | ------- | ------- | ------------------------------------------------- |
|`proposalId`| uint | ✔ | A unique identifier for the challenge on the Protocol |

## General

We also have some general helper methods that may be useful while interacting with the Protocol

#### Method: `getAventusTime`

Timestamp of the current time on the main net or the mock time on a test network

##### Method Parameter Descriptions

None

#### Response

| Parameter | Type | Description |
| --------- | ---- | ------------------------------------------------- |
|`time`     | uint | The current time on the main net or the mock time on a test network |
