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

const getIndex = () => {
  return axios
      .get('http://localhost:5000/state')
      .then(response => response.data)
}

const search = (q) => {
  return axios.post('http://localhost:5000/txs', { "type": "search", "keyword": q })
      .then(() => getIndex())
      .then(data => {
        return Object.keys(data[q].links);        
      })
}

const linkMethod = (keyword, hash) => {
  return axios.post('http://localhost:5000/txs', { "type": "link", "keyword": keyword, hash })
      .then(() => getIndex())
      .then(data => {
        return Object.keys(data[keyword].links);        
      })  
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      index: null,
      currentPath: null,
      links: []
    }
    this.nav = this.nav.bind(this);
    this.search = this.search.bind(this);
    this.link = this.link.bind(this);
  }
  componentDidMount() {
      // getIndex()
      // .then(index => {
      //   this.setState({ index })
      // });    
  }
  link() {
    var q = this.refs.q.value; 
    var link = this.refs.link.value;
    linkMethod(q, link)
  }
  nav(e, link) {    
    e.preventDefault();
    var q = this.refs.q.value; 
    linkMethod(q, link)
      .then(() => {
        this.setState({
          currentPath: link
        })        
      })
  }
  search() {
    var q = this.refs.q.value;
    search(q)
      .then(links => {
        this.setState({
          links
        })
      })
  }
  render() {
    const { apps, currentPath, links } = this.state;
    console.log(links);
    const path = currentPath ? `https://ipfs.io/ipfs/${currentPath}/`: null;
    return (
      <div>
        <div>
          <input ref='q'/><button onClick={this.search}>search</button>
          <ul>
          {links.map((link) =>(
            <li>
              <a onClick={(e) => this.nav(e, link)}>{link}</a>
            </li>
          ))}
          </ul>
          <div>
            <input ref='link'/><button onClick={this.link}>link</button>
          </div>
        </div>
        
        {path && <div>
          <iframe src={path} width="500" height="500" >
            iframe not supported!
         </iframe>
        </div>}
      </div>
    );
  }
}

export default App;
