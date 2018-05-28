import React, { Component } from 'react';

import axios from 'axios';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      apps: [],
      currentPath: null
    }
  }
  componentDidMount() {
    axios
      .get('/api/app')
      .then(response => response.data)
      .then(apps => this.setState({ apps }));    
  }
  nav(e, app) {
    e.preventDefault();
    this.setState({
      currentPath: app.hash
    })
  }
  render() {
    const { apps, currentPath } = this.state;
    const path = currentPath ? `https://ipfs.io/ipfs/${currentPath}/`: null;
    return (
      <div>
        <div>
          <input />
        </div>
        <div>
          <ul>
            {apps.map(app => (
              <li key={app.name}>
                <a href='/' onClick={(e) => this.nav(e, app)}>{app.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <iframe src={path} width="500" height="500" >
            iframe not supported!
         </iframe>
        </div>
      </div>
    );
  }
}

export default App;
