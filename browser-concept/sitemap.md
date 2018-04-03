Tha main purpose of this document is to describe the structure of browser pages.

# 1. Main Page

**Purpose:** accent the user's attention to search function. 

**Design & UI features:** simple and attractive design, hints to start usage of cyber products.

There is a status text below search panel which describes technical information about cyber.Search products:

**_Search in 134 M transactions in 2 blockchain systems with 135 parsed tokens. Database size : 369 GBs_** 

where transactions are the number of all indexed transactions from all blockchains connected to Cybernode, blockchain systems - all blockchains processed by Cybernode, tokens - all unique tokens from all blockchains that are listed in Chaingear, database size - size of Cybernode database.

There are 3 main widgets below the status string describing the cryptoeconomy, registers and portfolio:
1. Total market cap [billions of USD] - is a summ of all token capitalizations, valuated in USD.
2. Chaingear registers - number of created registers in Chaingear.
3. Portfolio volume - volume of user's portfolio (for authorized ones) valuated in BTC or hint to create portfolio (for non authorized users).

At the bottom of the page 5 project links are placed:
1. GitHub - GitHub repository of cyber.Search
2. Roadmap - roadmap of all cyber.Search projects
3. Cybernode - Cybeernode landing page
4. Dashboard - a link user's custom dashboard
5. Knowledge - a link to knowledge database of cyber.Search projects

**Proposals:**
- Place a hint to use Metamask for getting the full functionality.

# 2. Search Results Page

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

## 2.1 Contract Page

## 2.2 Transaction Page

## 2.3 Block Page

# 3. Blockchains Page

## 3.1 Blockchain Page

# 4. Tokens Page

## 4.1 Token Page

# 5. Exchanges Page

## 5.1 Exchange page

# 6. Chaingear Page

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


# 7. Cybernode Page

# 8. Labels Page

# 9. Portfolio Page

# 10. FAQ Page
