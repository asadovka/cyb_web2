import * as React from "react";
import { Link } from 'react-router';
import {connect} from "react-redux";

// import {Pagination} from "../../../components/Pagination";
import withRouter from "react-router/es/withRouter";

import {
  Plain, BitcoinAddress, 
} from '../../../components/SearchItems/';

import BitcoinCashBlock from './items/BitcoinCashBlock';
import BitcoinCashTx from './items/BitcoinCashTx';
import BitcoinTx from './items/BitcoinTx';
import BitcoinBlock from './items/BitcoinBlock';

import EthereumBlock from './items/EthereumBlock';
import EthereumUncle from './items/EthereumUncle';
import EthereumTx from './items/EthereumTx';
import EthereumAddress from './items/EthereumAddress';

import EthereumClassicBlock from './items/EthereumClassicBlock';
import EthereumClassiUncle from './items/EthereumClassiUncle';
import EthereumClassicTx from './items/EthereumClassicTx';
import EthereumClassicContract from './items/EthereumClassicContract';

import Paper from 'material-ui/Paper';

import { Container } from '../../../components/SearchItems/';
import { SectionTitle, SectionsContainer } from '../../../components/SectionTitle/';


    {/*<div>
    {results(searchResult.items, searchResult.loading, searchResult.error, searchResult.success)}
    </div>
    {(searchResult.showMore) && <div style={{ textAlign: 'center', marginTop: 40 }}>
      <button onClick={() => showMore({ query, chains, entities })} className='button is-large'>show more</button>
    </div>} */}

const Content = ({
  searchResult,
  chains,
  entities,
  search,
  query,
  showMore
}) => {
  console.log(' >> ', searchResult);
  return (
    <div>
    {results(searchResult.items, searchResult.loading, searchResult.error, searchResult.success)}
    </div>
  )
//   console.log(' >> ', searchResult);

//   return (
//     <Container>
//       <EthereumBlock
//         tx_number={2}
//         number={1000000}
//         hash={'0xfc7cf07b83d66c4abaeb522a15719f90e070b16d090b432661811629736e59f8'}
//         size='534'
//         timestamp={(new Date('2015-07-30 06:31')).getTime()}
//       />
//       <EthereumTx
//         timestamp={(new Date('2015-07-30 06:31')).getTime()}
//         hash={'0xfc7cf07b83d66c4abaeb522a15719f90e070b16d090b432661811629736e59f8'}
//         tx_number={1}
//         fee={1}
//         value='534'
//       />
//       <EthereumTx
//         timestamp={(new Date('2015-07-30 06:31')).getTime()}
//         hash={'0xfc7cf07b83d66c4abaeb522a15719f90e070b16d090b432661811629736e59f8'}
//         tx_number={1}
//         fee={1}
//         value='534'
//       />
//       <EthereumTx
//         timestamp={(new Date('2015-07-30 06:31')).getTime()}
//         hash={'0xfc7cf07b83d66c4abaeb522a15719f90e070b16d090b432661811629736e59f8'}
//         tx_number={1}
//         fee={1}
//         value='534'
//       />
//       <EthereumTx
//         timestamp={(new Date('2015-07-30 06:31')).getTime()}
//         hash={'0xfc7cf07b83d66c4abaeb522a15719f90e070b16d090b432661811629736e59f8'}
//         tx_number={1}
//         fee={1}
//         value='534'
//       />
//       <EthereumTx
//         timestamp={(new Date('2015-07-30 06:31')).getTime()}
//         hash={'0xfc7cf07b83d66c4abaeb522a15719f90e070b16d090b432661811629736e59f8'}
//         tx_number={1}
//         fee={1}
//         value='534'
//       />
//       <EthereumTx
//         timestamp={(new Date('2015-07-30 06:31')).getTime()}
//         hash={'0xfc7cf07b83d66c4abaeb522a15719f90e070b16d090b432661811629736e59f8'}
//         tx_number={1}
//         fee={1}
//         value='534'
//       />
//       <EthereumTx
//         timestamp={(new Date('2015-07-30 06:31')).getTime()}
//         hash={'0xfc7cf07b83d66c4abaeb522a15719f90e070b16d090b432661811629736e59f8'}
//         tx_number={1}
//         fee={1}
//         value='534'
//       />
//       <EthereumTx
//         timestamp={(new Date('2015-07-30 06:31')).getTime()}
//         hash={'0xfc7cf07b83d66c4abaeb522a15719f90e070b16d090b432661811629736e59f8'}
//         tx_number={1}
//         fee={1}
//         value='534'
//       />
//       <EthereumTx
//         timestamp={(new Date('2015-07-30 06:31')).getTime()}
//         hash={'0xfc7cf07b83d66c4abaeb522a15719f90e070b16d090b432661811629736e59f8'}
//         tx_number={1}
//         fee={1}
//         value='534'
//       />
//     </Container>
// );
}



function results(items, loading, error, success) {
  if (loading) {
    return (
       <Container>
      <div className="tile is-child">
        <h1 className="title">Loading...</h1>
      </div>
      </Container>
    );
  } 

  if (error) {
    return (
      <Container>
      <div className="tile is-child">
        <h1 className="title">Some error occurred, please try later.</h1>
      </div>
      </Container>
    );
  }

  if (success && !items.length) {
    return (
       <Container>
      <div className="tile is-child">
        <h1 className="title">Nothing is found in cyber•Space.</h1>
      </div>
      </Container>
    );
  }

  return (
    <Container>
      {items.map(item => (
        <RenderByType 
          key={JSON.stringify(item)}
          chain={item.chain} 
          entity={item.entity} 
          data={item.data} 
        />
      ))}
      {/*<RenderByType 
        key={1}
        chain={'ethereum'} 
        entity={'block'} 
        data={{ 
          number: 5000000, 
          timestamp: 1517319693, 
          hash: '0x7d5a4369273c723454ac137f48a4f142b097aa2779464e6505f1b1c5e37b5382', 
          txNumber: 109 
        }} 
      />
      <RenderByType 
        key={2}
        chain={'ethereum'} 
        entity={'tx'} 
        data={{ 
          hash: '0x569c5b35f203ca6db6e2cec44bceba756fad513384e2bd79c06a8c0181273379', 
          value: 3.18096329,
          timestamp: 1517319693, // ???
          from: "0x0681d8db095565fe8a346fa0277bffde9c0edbbf",
          to: "0xd850942ef8811f2a866692a623011bde52a462c1",
        }} 
      />
      <RenderByType 
        key={3}
        chain={'ethereum'} 
        entity={'uncle'} 
        data={{ 
          number: 5000000, 
          hash: '0x569c5b35f203ca6db6e2cec44bceba756fad513384e2bd79c06a8c0181273379', 
          // Uncle position ??
          timestamp: 1517319693, // ???
        }} 
      />
      <RenderByType 
        key={4}
        chain={'ethereum'} 
        entity={'address_summary'} 
        data={{ 
          hash: '0x569c5b35f203ca6db6e2cec44bceba756fad513384e2bd79c06a8c0181273379', 
          value: 45, // ??
          timestamp: 1517319693, // ???
        }} 
      />*/}
    </Container>
  );
  
  // const blocks = items.filter(item => item.entity === 'BLOCK');
  // const transactions = items.filter(item => item.entity === 'TRANSACTION');


  // return (
  //   <SectionsContainer>
  //     {blocks.length > 0 && (<div>
  //       <SectionTitle>Blocks</SectionTitle>
  //       <div className='columns is-multiline'>
  //       {blocks.map((item, index) => (
  //         <div key={JSON.stringify(item)} className="column is-one-third">
  //           <ul style={{ overflow: 'hidden' }}>
  //             <li><RenderByType chain={item.chain} entity={item.entity} data={item.data} /></li>
  //           </ul>
  //         </div>
  //       ))}
  //       </div>
  //     </div>)}

  //     {transactions.length > 0 && (<div>
  //       <SectionTitle>Transactions</SectionTitle>
  //       <div className='columns is-multiline'>
  //       {transactions.map((item, index) => (
  //         <div key={JSON.stringify(item)} className="column is-one-third">
  //           <ul style={{ overflow: 'hidden' }}>
  //             <li><RenderByType chain={item.chain} entity={item.entity} data={item.data} /></li>
  //           </ul>
  //         </div>
  //       ))}
  //       </div>
  //     </div>)}
  //   </SectionsContainer>
  //  ); 
}




const items = {
  block: {
    // BITCOIN: BitcoinBlock,
    ethereum: EthereumBlock,
    // BITCOIN_CASH: BitcoinCashBlock,
    ethereum_classic: EthereumClassicBlock
  },
  tx: {
    // BITCOIN: BitcoinTx,
    // BITCOIN_CASH: BitcoinCashTx,
    ethereum: EthereumTx,
    ethereum_classic: EthereumClassicTx,
    // ethereum_classic: EthereumClassicTx
  },
  uncle: {
    ethereum: EthereumUncle,
    ethereum_classic: EthereumClassiUncle
  },
  contract_summary: {
     ethereum: EthereumAddress,
     ethereum_classic: EthereumClassicContract
  }
}

function RenderByType({ chain, data , entity} ) {
  const Component = items[entity][chain];
  if (Component) {
    return (<Component {...data} />)
  }
  return (
    <Plain {...data}/>
  );
}

import { showMore } from '../../../modules/search';

export default withRouter(connect(((state, ownProps) => ({
    searchResult: state.search.searchResults,
    query: ownProps.location.query.q,
    page: ownProps.location.query.page || 0,
    chains: ownProps.location.query.chains,
    entities: ownProps.location.query.entities  
})), { showMore })(Content));

