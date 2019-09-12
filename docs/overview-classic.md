---
id: overview-classic
title: Overview
---

Aventus is an open-source, decentralised protocol that revolutionises the way digital assets are issued, owned, and transferred across supply chains.

As envisaged in the original [Aventus white paper A Blockchain-Based Event Ticketing Protocol (2017)](https://icosbull.com/whitepapers/1276/Aventus_whitepaper.pdf), Aventus Classic is an Ethereum-based ticketing protocol designed to alleviate fraud and touting in the long tail of the event ticketing industry.

For more information including a history of the design decisions taken here, see the [Aventus Classic White Paper](https://github.com/AventusProtocolFoundation/docs/blob/master/resources/Aventus%20Classic%20Whitepaper.pdf)

## Usage

Aventus Classic allows a user to issue publicly-verifiable blockchain tickets on Ethereum. Anyone is free to utilise the Protocol and build any application on top of it to facilitate ticket management.

### Typical Event Lifecycle

To give an idea of how the Protocol could be used to run an event, see the lifecycle journey below:

1. eventOwner creates an event on the Protocol
2. ticketOwner creates a private & public key-pair
3. eventOwner sells tickets referencing ticketOwner's public key
4. As the eventTime approaches the eventOwner compiles a list of ticketOwner public keys associated with the event from the public blockchain
5. ticketOwners arrive at the event and prove ownership of their public key to the eventOwner to gain access

This flow would involve a wallet-like application for the ticketOwner to prove their key-pair and an eventOwner access control application to hold a doorlist of valid public keys and present an ownership challenge to the ticketOwners

> Note: for more info on what is meant by some of these terms (eventOwner, ticketOwner, eventTime), see the [glossary](/docs/glossary)
