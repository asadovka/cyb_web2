import React, { Component } from 'react';
import {
  Menu,
  MenuItem,
  Logo,
  HamburgerMenu
} from '../components/MenuAndLogo/MenuAndLogo';

class MenuAndLogo extends Component {
  state = {
    menuOpen: false,
  }

    toggle = () => {
      this.setState({
        menuOpen: !this.state.menuOpen
      })
    }

    click = (e, url) => {
      e.preventDefault();
      this.props.search(url);
      this.setState({
        menuOpen: false
      })
    }

  render() {

    const {
      menuOpen
    } = this.state

    const {
      search
    } = this.props

    return (
      <div>
              {/*<HamburgerMenu open={menuOpen} onClick={this.toggle}>
                <Menu open={true} >
                  <MenuItem onClick={(e) => this.click(e, '42.exp')} icon='explorer' >Ethereum</MenuItem>
                  <MenuItem onClick={(e) => this.click(e, '.chainger')} icon='chaingear' >Chaingear</MenuItem>
                  <MenuItem onClick={(e) => this.click(e, '.tokens')} icon='tokens' >Tokens</MenuItem>
                </Menu>
              </HamburgerMenu>*/}
              <Logo to='/'>logo</Logo>
            </div>
        )
  }

}

export default MenuAndLogo;
