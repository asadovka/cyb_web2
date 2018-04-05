Tha main purpose of this document is to describe requirements and the structure of browser pages. With installed draw.io application or using the online version you can open mockups and check the current state of work.

# Requirements

## 1. Business Requirements

- lead users to make payable actions (create registry, develop custom browser app, pay for developing functionality)

## 2. Business rules

- focusing on developers and Metamask users
- developing in terms of web 3.0 principles
- integration with Metamask 
- full tokenization of economy processes (valuation, transfering data)
- collect feedback and create analytics with use of instruments that aviod collect personal data
- IPFS integration

## 3. Common functional requirements

- avoid pagination in all tables (use scrolling instead)
- prefered type of data structure - tables

## 3. Common non-functional requirements 

- simple and attractive design
- intuitive UI

## 3. System requirements

- less than 1 second for loading page
- less than 3 seconds for loading all data
- Web version of browser (React)
- Desktop version (Electron + React) 

# Browser Pages

## 1. Main Page

**Purpose:** accent the user's attention to search function. 

**Design & UI features:** simple and attractive design, hints to start usage of cyber products.

There is a status text below search panel which describes technical information about cyber.Search products:

**_Search in 134 M transactions in 2 blockchain systems with 135 parsed tokens. Database size : 369 GBs_** 

where transactions are the number of all indexed transactions from all blockchains connected to Cybernode, blockchain systems - all blockchains processed by Cybernode, tokens - all unique tokens from all blockchains indexed, database size - size of Cassandra (index) database.

There are 3 main widgets below the status string describing the cryptoeconomy, registers and portfolio:
1. Total market cap [billions of USD] - is a summ of all token capitalizations, valuated in USD. 

    _**Call to action:** transition to cybernomics page.
  
2. Chaingear registers [number] - number of user's registers (for authorized ones with created registers) or number of created registers in Chaingear.

    _**Call to action:** transition to Chaingear page.
  
3. Portfolio volume [valuation in BTC] - volume of user's portfolio (for authorized ones) valuated in BTC or hint to create portfolio (for non authorized users).

    _**Call to action:** transition to Portfolio page.

At the bottom of the page 5 project links are placed:
1. GitHub - GitHub repository of cyber.Search
2. Roadmap - roadmap of all cyber.Search projects
3. Cybernode - Cybeernode landing page
4. Dashboard - a link user's custom dashboard
5. Knowledge - a link to knowledge database of cyber.Search projects

**Proposals:**
- Place a hint to use Metamask for getting the full functionality (when page requires metamask - make the icon active/ otherwise - non active).
- Plugs for developing functionality
- Transition


## 2. Search Results Page

**Purpose:** provide easy and quick functionality for working with blockchain search.

**Design & UI  features:** strictly logical UI, adaptive preferenses of filtration. 

#### Objects of search. 

There are 2 types of search provided by browser:
1. Global search (searching in whole ecosystem of Cybernode)
2. Local search (searching the data in certain pages)

There are 3 types of objects that can be foung via global search:

1. Transaction
2. Contract
3. Block

The search pannel in general should include next functions:
1. Global and local search (GitHub style)
2. Autocomplete function

#### Search results.

Left menu includes next functions:

1. filtering (by transactions, contracts and blocks)
2. sorting function (is applied only for one category - transaction or contract or block)
3. total results found

Search results in general are shown as a list of objects. Each object has similar structure:
1. Name of blockchain (Bitcoin, Ethereum)
2. Type of object (transaction, contract, block)
3. Hash string (contract address, transaction hash, block hash)
4. Value of object (transaction value [amount of tokens], contract valuation [amount of tokens], block size [memory size])
5. Time data (block mining time, contract generation time, transaction creation time)

By default search results are sorted by time data.

Sorting function is active after selecting the one category of search results and provide sorting by next parameters:
1. Time data
2. Value (valuation/size)

### 2.1 Contract Page

### 2.2 Transaction Page

### 2.3 Block Page

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
2. Create register (multiregister)
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
