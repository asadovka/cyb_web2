import React, { Component } from 'react';

import axios from 'axios';


const AllApps = ({ apps, nav }) => (
  <div>
    <ul>
      {apps.map(app => (
        <li key={app.name}>
          <a href='/' onClick={(e) => {
            e.preventDefault();
            nav(app)
          }}>{app.name}</a>
        </li>
      ))}
    </ul>
  </div>
)

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      apps: [],
      currentPath: null
    }
    this.nav = this.nav.bind(this);
  }
  componentDidMount() {
    axios
      .get('/api/app')
      .then(response => response.data)
      .then(apps => this.setState({ apps }));    
  }
  nav(app) {    
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
        
        {path ? <div>
          <iframe src={path} width="500" height="500" >
            iframe not supported!
         </iframe>
        </div> : (
          <AllApps
            apps={apps}
            nav={this.nav}
          />
        )}
      </div>
    );
  }
}

export default App;
