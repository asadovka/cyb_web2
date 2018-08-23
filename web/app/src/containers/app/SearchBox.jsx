import React, { Component } from 'react';
import axios from 'axios'; 

import {
	Legend,
	SearchForm,
	AppPrefix
} from '../../components2/app/SearchBox/SearchBox'

import { bytesToSize, nFormatter } from '../../utils/format'

class SearchBox extends Component {

	constructor(props) {
	    super(props);

	    this.state = {
	      transactionsCount: 1441341424,
	      blockchains: 2,
  	      tokensCount: 0,
	      indexSizeBytes: 547722617454,
	    }
  	}

  	componentDidMount() {
    	axios.get('http://api.cybersearch.io/search/stats')
			.then(response => {
				this.setState({
				  transactionsCount: response.data.transactionsCount,
				  blockchains: response.data.blockchains,
				  indexSizeBytes: response.data.indexSizeBytes
				})
			})

	    axios.get('http://api.cybermarkets.io/exchanges/tokens/count')
	      .then(response => {
	        this.setState({
	          tokensCount: response.data
	        })
	      })
  	}

 	componentWillReceiveProps(nextProps, nextState) {

 		console.log(nextProps, this.props)

 		if (this.props.inputText != nextProps.inputText) {
 			this.input.value = nextProps.inputText
 		}
 	}

	render() {

		const {
			transactionsCount,
			blockchains,
			tokensCount,
			indexSizeBytes
		} = this.state

		const {
			app,
			inputText,
			onSearch
		} = this.props;

		return ( 
			<div>
          <div style={{ display: 'flex'}}>
          {app && <AppPrefix>{app}</AppPrefix>}
          <SearchForm defaultValue={inputText} inputRef={node => {
            this.input = node;
          }}  onSubmit={onSearch} />
          </div>
                <Legend>
                   Search in <strong>{nFormatter(transactionsCount, 1)}</strong>&nbsp; transactions in <strong>{blockchains}</strong>&nbsp;
                   blockchains with <strong>{tokensCount}</strong> parsed tokens. Database size: <strong>{bytesToSize(indexSizeBytes)}</strong>
                </Legend>
          	</div>
          )
	}

}

export default SearchBox;