Variants to fork:
- Parity shell
- Mist
- Beaker
- Atom
- VScode
- Electron based

| |Parity  | Mist  | Beaker  | VScode  | Electron  | Atom |
|---|---|---|---|---|---|---|
| Wallet  | +  | +  |   |   |   |   |
| App Store | +  |   |   |   |   |   |
| App publisher |  + |   | +  |   |   |   |
| App permissions  | +  |   |   |   |   |   |
| Core apps |   |   | +  |   |   |   |
| Node monitor | +  | +  |   |   |   |   |


### `Mist (Ethereum Foundation)`

**Features**:
- Web2/dapps browsing page browsing
- Wallet
- Contracts deploying, watching
- Light/Remotes nodes support
- Electron based
- Released for all platforms
- Swarm support
- ENS support

**Pros**:
- Integrated both Light/Remote nodes
- Swarm support (in beta)
- ENS support (contacts/tokens)

**Cons**:
- Non functional wallet at all
- Bad transaction fee management
- Proposed as non-secure by default
- Don't have permissions
- dapps browsing not stable and functional, actually not work
- Buggy user experience
- working only with Geth from box
- Use remote Infura nodes
- There are no any big features set delivery since 2016
- Not frequent releases
- There is no community
- Used Meteor (migrates to react in progress)

**Totals**:
- **-** In general not developed and maintained
- **-** Non functional and buggy

**Extracts**:
- with `parity --geth` Mist works with parity node (maybe)

### `Shell (Parity)`

**Features**:
- Wallet
- Core dapps integration
- Contracts deploying, watching
- Basic marketplace from box
- Permissions for applications
- Light/Remotes nodes support
- Electron based
- Released for all platforms

**Pros**:
- Functional wallet
- Good account management
- Address book
- Active development and releases
- Permissions and dapps sandboxing
- Development and support by Parity tech
- Light client support
- Set of core dapps
- Notification
- Open marketplace
- Extra security (generated wallpapers)

**Cons**:
- Buggy
- Non stable working, sometimes

**Totals**:
- **+** Function wallet and good first steps to web3 browser
- **+** Permission and security features for users
- **+** In active development and releasing by Parity Tech
- **-** Non stable working

### `Beaker`

**Features**:
- Working web2 browser
- DAT support
- Electron based
- Released for all platforms
- Built in editor

**Pros**:
- Fully functional UI (navigation,core apps: history, settings)
- Custom project/website publisher
- DAT support (network status, seed options)

**Cons**:
- No wallet
- No app store
- No frequent releases
- Weak community

**Totals**:
- Stable UI
- Core apps
- DAT support
- No blockchain integration

### `VScode`

**Pros**:
- Editor
- A lot of users
- Good UI

**Cons**:
- Development and support by Microsoft
- Need to build wallet/browser/app as plugins from scratch

### `Atom`

**Pros**:
- Very good editor
- Huge community
- Huge amount of users
- Development and support by Github
- Good plugin system
- Tons of goods (plugins)
- Good UI
- Stable working

**Cons**:
- Development and support by Github (Microsoft owns GitHub)
- Need to build wallet/browser/app as plugins from scratch

### `Raw Electron`
**Pros**:
- Way to build wallet/browser/app from scratch

**Cons**:
- Very hard to build wallet/browser/app from scratch

**Extracts**:
There is also [Muon](https://github.com/brave/muon), but there is the question about their future and maintenance
