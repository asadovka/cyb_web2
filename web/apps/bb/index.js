
function getQueryStringValue (key) {  
  return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
}  

var getBlock = function(q) {
  return axios.get(`http://api.cybersearch.io/bitcoin/block/${q}`)
  .then(response => response.data)
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { block: null };
  }
  
  componentDidMount() {
    getBlock(getQueryStringValue('q'))
      .then(response => {
        this.setState({  block: response })
      });
  }

  render() {
    const { block } = this.state;

    return (
      <div>
        <h1>bitcoin block</h1>
        {block && <div>{JSON.stringify(block)}</div>}
      </div>
    );
  }
}

const domContainer = document.querySelector('#app');
ReactDOM.render(<App />, domContainer);
