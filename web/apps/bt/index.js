
function getQueryStringValue (key) {  
  return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
}  

var getBlock = function(q) {
  return axios.get(`http://api.cybersearch.io/bitcoin/tx/${q}`)
  .then(response => response.data)
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tx: null };
  }
  
  componentDidMount() {
    getBlock(getQueryStringValue('q'))
      .then(response => {
        this.setState({  tx: response })
      });
  }

  render() {
    const { tx } = this.state;

    return (
      <div>
        <h1>bitcoin tx</h1>
        {tx && <div>{JSON.stringify(tx)}</div>}
      </div>
    );
  }
}

const domContainer = document.querySelector('#app');
ReactDOM.render(<App />, domContainer);
