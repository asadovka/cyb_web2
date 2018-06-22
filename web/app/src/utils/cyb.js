
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

Cyb.prototype.checkMetomask = function() {
  return new Promise(resolve => {
    if (typeof web3 == 'undefined') {
      resolve(false);
    } else {
      web3.eth.getAccounts(function(err, accounts){
        resolve(err == null && accounts.length > 0)
      })
    }
  })
}


export default Cyb;
