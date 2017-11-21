import * as React from "react";
import { Link } from 'react-router';

const TopMenu = () => (
  <nav className='navbar-end'>
    <Link activeClassName='is-active' className='navbar-item' to='/'>Assets</Link>
    <Link activeClassName='is-active' className='navbar-item' to='/'>Funds</Link>
    <Link activeClassName='is-active' className='navbar-item' to='/'>Crowdsales</Link>
    <Link activeClassName='is-active' className='navbar-item ' to='/search?q=42'>Blockchains</Link>
    <Link activeClassName='is-active' className='navbar-item' to='/analitics'>Analytics</Link>
    <Link activeClassName='is-active' className='navbar-item' to='/'>Cybernode</Link>                           
  </nav>
);

export default TopMenu;
