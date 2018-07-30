
function getQueryStringValue (key) {  
  return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
}  

// var _search = function(q) {
//   return axios.get(`http://api.cybersearch.io/search?query=${q}`)
//   .then(response => response.data)
// }

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  render() {
    const { items } = this.state;
    return (
      <div>
        app store
      </div>
    );
  }
}

const domContainer = document.querySelector('#app');
ReactDOM.render(<App />, domContainer);
