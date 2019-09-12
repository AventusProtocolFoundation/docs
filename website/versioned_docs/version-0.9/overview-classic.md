---
id: version-0.9-overview-classic
title: Overview
original_id: overview-classic
---

Aventus Classic exists as the protocol was outlined in the original [Aventus Protocol Foundation whitepaper](https://aventus.io/wp-content/uploads/2019/03/Whitepaper.pdf). Aventus Classic was built with the intention of solving the same core industry problems but the viability of this working at scale was questioned, which led to fork and the design and development of a Tier 2 Protocol solution that supports the latest version of the [whitepaper](https://aventus.io/doc/whitepaper.pdf).

Principally - the Classic protocol was too closely tied to the [Ethereum network](https://en.wikipedia.org/wiki/Ethereum) and hence inherits some of its current flaws; including the ability to scale large transaction volumes in short time periods. Despite this, the Classic protocol is still a viable solution for a grassroots event owner working with low ticket volumes offering the same functionality of an open blockchain ticketing standard.

## Usage

Aventus Classic allows a user to issue publicly-verifiable blockchain tickets on Ethereum. Anyone is free to utilize the Protocol and build any application on top of it to facilitate ticket management.

### Typical Event Lifecycle

To give an idea of how the Protocol could be used to run an event, see the lifecycle journey below:

1. eventOwner creates an event on the Protocol
2. ticketOwner creates a private & public key-pair
3. eventOwner sells tickets referencing ticketOwner's key-pair
4. As the eventTime approaches the eventOwner compiles a list of ticketOwner public keys associated with the event from the public blockchain
5. ticketOwner's arrive at the event and prove ownership of their public key to the eventOwner to gain access

This flow would involve a wallet-like application for the ticketOwner to prove their key-pair and an eventOwner access control application to hold a doorlist of valid public keys and present an ownership challenge to the ticketOwners
