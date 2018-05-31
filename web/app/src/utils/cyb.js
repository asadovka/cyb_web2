
import axios from 'axios';


function Cyb(root) {
  this.root = root;
}


Cyb.prototype.getIndex = function() {
  return axios
      .get(`${this.root}/state`)
      .then(response => response.data)
}

Cyb.prototype.search = function(q) {
  return axios.post(`${this.root}/txs`, { "type": "search", "keyword": q })
      .then(() => this.getIndex())
      .then(data => {
        return Object.keys(data[q].links);        
      })
}

Cyb.prototype.linkMethod = function(keyword, hash) {
  return axios.post(`${this.root}/txs`, { "type": "link", "keyword": keyword, hash })
      .then(() => this.getIndex())
      .then(data => {
        return Object.keys(data[keyword].links);        
      })  
}



export default Cyb;
