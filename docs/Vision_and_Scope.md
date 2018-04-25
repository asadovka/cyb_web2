Tha main purpose of this document is to describe requirements and the structure of browser pages. With installed draw.io application or using the online version you can open mockups and check the current state of work.

# Project description

Cyber browser - an entrance point to start working with blockchains.

# Requirements

## 1. Business Requirements

- Lead users to make payable actions (create registry, develop custom browser app, pay for developing functionality)
- Attract mimimum 100 000 active users till token distribution

## 2. Business rules

- Focusing on developers and Metamask users
- Developing in terms of web 3.0 principles
- Full tokenization of economy processes (valuation, transfering data)
- Collect feedback and create analytics with use of instruments that aviod collect personal data

## 3. Common functional requirements

- Integration with Metamask 
- IPFS integration
- Avoid pagination in all tables (use scrolling instead)
- Prefered type of data structure - tables

## 3. Common non-functional requirements 

- Simple and attractive design
- Intuitive UI
- Adaptive design for mobile devices
- all hashes should be easy to copy

## 3. System requirements

- less than 1 second for loading page
- less than 3 seconds for loading all data
- Web version of browser (React)
- Desktop version (Electron + React) 
- Mobile web version

# Browser Pages

## 1. Main Page

**Purpose:** accent the user's attention to search function. 

**Design & UI features:** simple and attractive design, hints to start usage of cyber products.

There is a status text below search panel which describes technical information about cyber.Search products:

**_Search in 134 M transactions in 2 blockchain systems with 135 parsed tokens. Database size : 369 GBs_** 

where transactions are the number of all indexed transactions from all blockchains connected to Cybernode, blockchain systems - all blockchains processed by Cybernode, tokens - all unique tokens from all blockchains indexed, database size - size of Cassandra (index) database.

There are 3 main widgets below the status string describing the cryptoeconomy, registers and portfolio:
1. Total market cap [billions of USD] - is a summ of all token capitalizations, valuated in USD. 

    _**Call to action:** transition to cybernomics page_.
  
2. Chaingear registers [number] - number of user's registers (for authorized ones with created registers) or number of created registers in Chaingear.

    _**Call to action:** transition to Chaingear page_.
  
3. Portfolio volume [valuation in BTC] - volume of user's portfolio (for authorized ones) valuated in BTC or hint to create portfolio (for non authorized users).

    _**Call to action:** transition to Portfolio page_.

At the bottom of the page 5 project links are placed:
1. GitHub - GitHub repository of cyber.Search
2. Roadmap - roadmap of all cyber.Search projects
3. Cybernode - Cybeernode landing page
4. Dashboard - a link user's custom dashboard
5. Knowledge - a link to knowledge database of cyber.Search projects

**Proposals:**

- Place a hint to use Metamask for getting the full functionality (when page requires metamask - make the icon active/ otherwise - non active).
- Plugs for developing functionality
- Place transition to roadmap where users can donate for developing options


## 2. Search Results Page

**Purpose:** provide easy and quick functionality for working with blockchain search.

**Design & UI  features:** strictly logical UI, adaptive preferenses of filtration and sorting. 

#### Objects of search. 

There are 2 types of search provided by browser:
1. Global search (searching in whole ecosystem of indexed objects)
2. Context search (searching the data in certain pages)

There are 4 systems (blockchains) in which you can find data:

- Bitcoin
- Bitcoin Cash
- Ethereum
- Ethereum Classic

There are 4 types of objects that can be foung in listed systems:

1. Contracts
2. Transactions
3. Blocks
4. Uncle blocks

Objects can be found by entering next types of queries:

1. Full hash (address, block, uncle, transaction)
2. Number (block/uncle)

The search pannel in general should include next functions:
1. Global and local search (GitHub style)
2. Autocomplete function

#### Search results.

Left menu includes next hardcoded functions:

1. Display listed systems (blockchains)
2. Display listed objects

Search results in general are shown as a list of object preview. Each object preview its own structure:

1. Transaction:
- Hash
- Value
- Time of finalization (or time of confirmation or "Mempool" status)
- "From" address hash (Only for Ethereum and Ethereum Classic)
- "To" address hash (Only for Ethereum and Ethereum Classic) 

2. Block
- Block number
- Hash
- Number of transactions
- Time of creation

3. Uncle
- Hash
- Uncle position
- Time  of creation

4. Contract
- Hash
- Value
- Time of creation

Each preview has clickable hash string, that leads to block/uncle, contract or transaction page.

There is a pagination function on results page. It should be implemented via button "show more" at the bottom of the page.

### 2.1 Contract Page

### 2.2 Transaction Page

Currently browser shows 3 types of transaction pages:

1. Ethereum (Ethereum Classic) transaction page
2. Bitcoin (Bitcoin Cash) transaction page

### 2.3 Block Page

Currently browser shows 3 types of block pages:

1. Ethereum (Ethereum Classic) block page
2. Ethereum (Ethereum Classic) uncle block page
3. Bitcoin (Bitcoin Cash) block page

#### 2.3.1 Bitcoin block

Data which is displayed (including options and user actions):

- Bitcoin block number [number] (header of page)
- Time (UTC) [date] - time of block generation
- Block hash [string] - hash of block
- Merkle root [string] - hash of merkle tree
- Block version [number] - number of block
- Block size [number + bytes]
- Nonce [string] - answer to PoW


- Miner [string] - miner hash
- Difficulty [number] - mining difficulty
- Static block reward [number + currency] - static reward for block mining in BTC
- Fees [number + currency] - accumulated fees in BTC
- Total blobk reward [number + currency] - sum of static reward and fees


- Transactions[number] - number of transactions in block

Transaction table. Headers:

- Hash [string] - transaction hash
- Confirmation delay [number + seconds] - time of confirmation minus time of getting into mempool
- Inputs [number] - number in inputs
- Input value [number + currency] - summ of all input values in BTC
- Outputs [number] - number in outputs
- Output value [number + currency] - summ of all output values in BTC
- Fee [number + currency] - fees per transaction in BTC

Actions:

1. Info by pointing:
- Time (UTC) - show age of block (current time minus block generation time)
- Miner - show label of miner
- Total block reward - string "Static block reward + Fees"

#### 2.3.2 Ethereum block

- Ethereum block number [number] (header of page)
- Time (UTC) [date] - time of block generation
- Block hash [string] - hash of block
- Sha3Uncles [string] - hash of uncles
- Block size [number + bytes]
- Nonce [string] - answer to PoW
- Extra Data [string] - extra mining date


- Miner [string] - miner hash
- Difficulty [number] - mining difficulty
- Gas used [number] - used gas
- Gas limit [number] - limit of gas


- Static block reward [number + currency] - static reward for block mining in ETH
- Fees [number + currency] - accumulated fees in ETH
- Uncle inclusion rewards [number + currency] - rewards in ETH for uncle inclusion
- Total blobk reward [number + currency] - sum of static reward, fees and uncle inclusion


- Transactions [number] - number of transactions in block
- Uncle blocks [number] - number of uncle blocks

Transaction table. Headers:

- Hash [string] - transaction hash
- Confirmation delay [number + seconds] - time of confirmation minus time of getting into mempool
- From [hash] - hash of input
- To [hash] - hash of output
- Value [number + currency] - transaction value in ETH
- Fee [number + currency] - fees per transaction in ETH

Uncle table. Headers:

- Hash [string] - uncle hash
- Level [number] - uncle position
- Miner [hash] - hash of miner
- Reward [number + currency] - rewards of uncle

Actions:

1. Info by pointing:
- Time (UTC) - show age of block (current time minus block generation time)
- Extra - show converted hash
- Miner - show label of miner
- Gas used - 100% * (gas used / gas limit )
- Total block reward - string "Static block reward + Uncle block reward + Fees"


#### 2.3.3 Ethereum uncle block

- Ethereum uncle block number [number] (header of page)
- Time (UTC) [date] - time of block generation
- Uncle hash [string] - hash of uncle block
- Parent block hash [string] - hash of parent block
- Uncle level [number] - uncle position

- Miner [hash] - hash of miner

- Uncle inclusion rewards [number + currency] - rewards in ETH for uncle inclusion

Actions:

1. Info by pointing:
- Time (UTC) - show age of block (current time minus block generation time)
- Miner - show label of miner

## 3. Blockchains Page

### 3.1 Blockchain Page

## 4. Tokens Page

### 4.1 Token Page

## 5. Exchanges Page

### 5.1 Exchange page

## 6. Chaingear Page

**Purpose:** provide easy integration with Chaingear. 
**Design & UI  features:** simple UI, autoupdate register data, preview of changes.

All functionality is available after Metamask authorization.

Main functions of the page:

1. Watch and label created registers.
2. Create register
3. Edit register (entry)
3. Delete register
4. Transfer the rights of usage to another account
5. Upload content to register via IPFS
6. JSON import of custom fields
6. Real time calculation of registry creation costs
7. Data import from smart contract


## 7. Cybernode Page

## 8. Labels Page

## 9. Portfolio Page

## 10. FAQ Page
