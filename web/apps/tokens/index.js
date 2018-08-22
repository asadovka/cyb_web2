
function getQueryStringValue (key) {  
  return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
}

var getTokenList = function() {
  return axios.get(`http://api.cybermarkets.io/exchanges/tokens`)
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

  componentDidMount() {
    this.setState({ loading: true })

    getTokenList()
      .then(response => {
        this.setState({  
          tokens: response,
          loading: false
         })
      });
  }

  render() {
    const { tokens, loading } = this.state;

    if (loading) {
      return (
        <div>Loading ... </div>
        )
    } 
    
    return (
      <div>
        <h1>Tokens</h1>

        <ul>
          {
            tokens
            .map( token => {
              return (<li> <a href={`/token?q=${token.symbol}`}> {token.name} </a></li>)
            }) 
          }
        </ul>
      </div>
    );
  }
}

const domContainer = document.querySelector('#app');
ReactDOM.render(<App />, domContainer);
