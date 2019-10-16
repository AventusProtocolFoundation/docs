---
id: classic-tools
title: Tools
---

We also have some general helper methods that may be useful while interacting with the Protocol

## IProposalsManager

### Method: `getAventusTime`

Timestamp of the current time on the main net or the mock time on a test network

#### Method Parameter Descriptions

None

#### Response

| Parameter | Type | Description |
| --------- | ---- | ------------------------------------------------- |
|`time`     | uint | The current time on the main net or the mock time on a test network |

## AVTFaucet

### Method: `drip`

Drip 10 AVT to msg.sender.

#### Method Parameter Descriptions

None

#### Response

None

### Method: `getNextPaymentTime`

Get the timestamp for when msg.sender can next call drip() 

#### Method Parameter Descriptions

None

#### Response

| Parameter    | Type | Description |
| ------------ | ---- | ------------------------------ |
|`nextPayment` | uint | Timestamp of next payment time |
