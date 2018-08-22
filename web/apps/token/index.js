
function getQueryStringValue (key) {  
  return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
}

var getTokenList = function(q) {
  return axios.get(`http://api.cybermarkets.io/token?symbol=${symbol}`)
    .then(response => response.data)
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tokens: [],
      loading: true
    };
  }

  // componentDidMount() {
  //   this.setState({ loading: true })

  //   getTokenList()
  //     .then(response => {
  //       this.setState({  
  //         tokens: response,
  //         loading: false
  //        })
  //     });
  //}

  render() {
    const { tokens, loading } = this.state;
    
    return (
      <div>
        <h1>Token</h1>
      </div>
    );
  }
}

const domContainer = document.querySelector('#app');
ReactDOM.render(<App />, domContainer);
