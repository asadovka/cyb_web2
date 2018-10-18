# Cyb: web3 browser


## Abstract

Cyb is a friendly software robot who helps you explore an universes. Put it simply it just a [web3](cyb/docs/web3-vision.md) browser. At the very beginning cyb is focusing on developers and advanced blockchain users who is able to work with private keys and transactions. But we see how Cyb become friendly for everyone who wants to interact with consensus computers in a web of the third generation. Web3 is designed to free developers from outdated things such as html and v8. So developers will be free to use any markup, execution and rendering engine they want. That is why we don't focus on implementation of mentioned things. Instead this paper discuss implementation agnostic concepts of browser that are simple enough to be adopted by web3 developers. Initially we design Cyb for conventional desktop browsing. But suggested concepts can be easily being used for mobile, voice, vr and robotics implementations.

## Introduction

Current state of web3 experience is non satisfactory. Still [we did not meet]() any piece of software that is able to deliver deep, emotional web3 experience. So we decide to bring to the table one contender that strictly follows [web3 principles]() defined by ourselves ;-) In a rush for this passion we define the following web3 apps which we believe together implement the full web3 vision in the context of a browsing for web3 agents and app developers:

- `.main`: main page for every joe
- `.path`: navigation bar and its backend
- `.connect`: connection manager and state widget
- `.keys`: keystore interface and id widget
- `.pins`: favourites backend and application bar
- `.sign`: phishing resistant signer for messages and transactions with scheduler
- `.crr`: Cyb implementation of a root registry concept from web3 vision
- `.access`: Permission manager that respects agents' resources
- `.feed`: Notification backend and feed app.
- `.cyber`: cyberd node manager and app for link chains
- `.ipfs`: ipfs node manager and ux
- `.eth`: ethereum node manager + ens resolver
- `.wallet`: universal wallet ux
- `.help`: educational content library
- `.dev`: web3 development tool with support of contracts
- `.cg`: all the things chaingearable

All this apps are considered as core apps and is included in every Cyb distribution. Let us describe in details every app ass a pure concept.

## .main

Purpose of the `main` app is to make agent happier in a moment she returns to surfing and between experiences. Main page of the browser consists of three main elements:

- search bar: provides all search functions
- relevance bar: the most relevant cyberlinks for a particular agent
- footer: cyberlinks to ecosystem resources which are important for education and contribution

## .path

Navigation bar in Cyb is based on the following elements:

- back button - returns user to the previous state of web3 agent
- search bar - provides direct access to certain state
- star button - allow users to pin cyberlinks
- forward button - brings user to the future state based on Cyb prediction

Search bar is used to browse web3. With the help of DURA with knowledge of application involved (<content-address>.<app>) it can get content across different content addressing protocols such as IPFS, DAT, SWARM, and inside blockchains, tangles and dags thus forming heterogeneous environment of web3. In [web3 vision doc](cyb/docs/web3-vision.md) we describe in details a concept of web3 browsing based on DURA specs.

That is, in web3 appending "dot" works very different in comparison with web3. Dot is literally a search query to a particular app that is also has a content address in heterogeneous network. All symbols after "dot" is a map with content address of an app in root registry, and all data before "dot" is a query parameter to an app.

<illustration>

For example:

`.help` query will open Cyb help app. `chaingear.help` will open `chaingear` info page in the `help` app. Query without "dot" will be automatically redirected to search in cyberd (Note: queries without dot is synonym to `<your-query>.cyber`).

Empty query always leads to the main page. `.` query returns a root registry that is being used by default in Cyb.

<api-definition>

All cyberlinks that was requested by agent can be accessed using `path` app that is integral part of Cyb experience.

## .connect

In web3 all data has the state, so it become easier to navigate through it and make agent experience better. To be sure that you are working with actual state Cyb needs to manage connection to web3 providers.

Our purpose is to build web3 browser that is agnostic from addressing, identity and consensus protocols. But currently we use ipfs, parity-light and cyberd nodes to show off possible experience at early stage of web3 development without necessity to connect to web3 provider at all (be your own web3 provider) for basic needs such as popular static content surfing and simple transfers of tokens.

<illustration>

Cyb is hiding all complexities of web3 connections under one colourful indicator that range from green to red. Ideally it works like indicator of internet connection we all are use to.  Connection indicator cyberlinked to a `connect` app that is integral part of id bar. It gives an ability for an agent to understand status of connections and chose web3 providers.

<api-definition>

Ultimate purpose of `connect` is to remove necessity of agents to manually switch between networks. Agent do not need to think about switching across networks. It is a goal of app developers and browser vendors to define an approach that allow seamless interaction during web3 experience with all network magic happens underneath. Cyb is developing in a way that allow async interactions with several peer-to-peer networks in an app context.

## .id

Purpose of id bar is to enable the concept of identity. Using identity an agent is able to authenticate messages and sign transactions in web3. Cyb assumes that an agent interacting with web3 is using active identity, but offers ability to change id of a signed transaction during signing.

Agent understand which id is active using identicon. Cyb computes unique and deterministic identicons for every id, but offer agent to set any identicon for local pleasure. Clicking on id bar allow agent to choose active identity from a `keys` app.

<illustration>

Keys app is inherent component of id bar and embedded in Cyb. This app allows to store cryptographic secrets. Think of it as lastpass you don't need to trust that is able to compute different addresses, one time passwords and signatures in the context of an app.

The following convention is used for `keys`:

```
id: String,
chainId: Number
keystore: Promise <String>
mnemonic: String
derivationPath?: Promise <String>
otherAddresses: Array <String>
privateKey: String
publicKey: Promise <String>
type: String
subtype: String
```

The following API is being used to programmatically interact with id bar:

```
setDefaultId(addressIndex: Number): Promise <Boolean>
sign(transactionObject: Object): Promise <String>
signMessage(messageObject: Object): Promise <String>
verifyMessage(verificationObject: Object): Promise <Boolean>
```

## .cyber

It happens then agent knows some content address but have no idea in which network it can be retrieved as well as what app can deal with it. That is why Cyb has default integration with cyber [CYBER] protocol. Cyb append `.cyber` app for all request without a dot. `.cyber` is an app that has simple interface to cyberd, which returns prediction of related cyberlinks thus agent can get required resource directly through peer-to-peer network. Cyb has a setting of default search engine, thus an agent can plug a search she wants.



## Apps

App bar is a place where user can quickly get access to most used web3 objects. User can pin such objects by clicking on button "favorite" on navigation bar and then it will appear in app bar. Cyberlink manager is an attached app that allow agents to group and tag pins.

## Sign

`Sign` allows users to sign messages and transactions in a way that brings web3 experience to the whole new level.

Browser use own app for signing transactions so user can be always sure that transaction details are valid. Thus we decrease probability of phishing. Also browser has it's own key for signing big lists of transactions.


## Root registry

Root registry or `rr` of Cyb is a hard mix between top-level domains and file extensions.

Programming languages:
500 (200) (domains of language developers) https://gist.github.com/aymen-mouelhi/82c93fbcd25f091f2c13faa5e0d61760

Common programs:
500 (100) (domains of app developers) https://fileinfo.com/filetypes/common https://github.com/dyne/file-extension-list https://www.computerhope.com/issues/ch001789.htm

Top english words:
1000 (300) (grants, competitions. community feedback) https://github.com/first20hours/google-10000-english/blob/master/google-10000-english-no-swears.txt

Tokens:
1000 (100) (domain based distribution) https://coinmarketcap.com/

Tlds:
1000 (100) Write a program that is able to display web2 sites. Map all iana tlds to this programm https://en.wikipedia.org/wiki/List_of_Internet_top-level_domains http://data.iana.org/TLD/tlds-alpha-by-domain.txt

Symbols

## Permissions

Web3 apps should strictly limited in computational resources. We describe detailed specifications [here](cyb/docs/dapp-guidelines.md).

## Feed

Notification panel displaying all pending transactions and web3 events corresponding to certain account.
Settings button leads to settings page where user can manage connection to IPFS, Ethereum and Cyber nodes (local or remote ways).

## App store
We understand that it is very hard to bootstrap awesome agent experience
For good initial experience we develop core browser apps such as:



These apps are delivered with every browser build.

## Contributions,

As an open source project we are welcome for contributions. Gitcoin is an excellent instrument that we use for delegating tasks for community a processing payments for completed ones.

## Feature development

We have our vision of how to develop browser and what kind of features develop first. But we give an opportunity for community to decide and vote with tokens what kind of browser we need to see in near future. Our product [Chaingear](https://github.com/cybercongress/chaingear) is also made for this.

## Feedback and bug collection

We use user's feedback to make products better. So we provide options for bug reporting and feedback leaving on every page.


## Saga on privacy and anonymity

In web3 Principle of respect to agent the most fundamental principle. Respect agents as you would love to agents respect you. So we offer 3 clear custom types of user behaviour:

- anonymous activity [no tracking is possible]
- private activity [abstract ID + events tracking ]
- public activity [address + events tracking by web 3 provider]

By default all activity is anonymous. Others must be explicitly asks permissions. Worth to note that some neighbours in some segments of web3 will want to compromise you anonymity during peer-to-peer interactions. It
For successful browser development application developers need to collect at least public and private data. Thus users of these 2 groups will be incentivized by giving nice perks from dapp developers.

## On censorship resistance
