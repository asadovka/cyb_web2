import React, { Component } from 'react';
import Cyb from '../../utils/cyb';
import {
  Items,
  Item,
  ItemTitle,
  Image,
  Arrow
} from '../../components/app/AppsPanel/AppsPanel'; 

const cyb = new Cyb('http://cyberd.network');

class AppsPanel extends Component {

	state = {
		metamaskUse: false,
	}

	componentDidMount() {

		//https://github.com/MetaMask/faq/blob/master/DEVELOPERS.md#ear-listening-for-selected-account-changes
		//find better solution
		const check = () => {
		  cyb.checkMetomask()
		    .then(metamaskUse => this.setState({
		      metamaskUse
		    }))
		}
		this.timer = setInterval(check, 2000)
		check();
	}

	componentWillUnmount() {
		clearInterval(this.timer)
	}

	render() {

		const {
			metamaskUse
		} = this.state;

		const {
			search
		} = this.props

	    let buttons = (
	      <Items>
	        <Item onClick={(e) => { e.preventDefault(); search('.appstore', '/new') }}>
	          <ItemTitle>App Store</ItemTitle>
	          <Image type='appStore'/>
	          <Arrow />
	        </Item>

	        <Item  onClick={(e) => { e.preventDefault(); search('.chainger', '/new') }}>
	          <ItemTitle>Create Register</ItemTitle>
	          <Image type='createRegistry'/>
	          <Arrow />
	        </Item>
	        <Item onClick={(e) => { e.preventDefault(); search('.createapp', '/new') }}>
	          <ItemTitle>Create App</ItemTitle>
	          <Image type='createApp'/>
	          <Arrow />
	        </Item>
	      </Items>
	    );

	    if (!metamaskUse) {
	      buttons = (
	        <Items>
	          <Item to='https://metamask.io/' target="_blank">
	            <Image type='appStore'/>
	            <ItemTitle>Please use<br/> metamask</ItemTitle>
	          </Item>
	          <Item disabled={true}>
	            <ItemTitle>Create Registry</ItemTitle>
	            <Image type='createRegistry'/>
	            <Arrow />
	          </Item>
	          <Item disabled={true}>
	            <ItemTitle>Create App</ItemTitle>
	            <Image type='createApp'/>
	            <Arrow />
	          </Item>
	        </Items>
	      );
	    }

	    return buttons;
	}

}

export default AppsPanel;