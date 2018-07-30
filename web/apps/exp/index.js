
function getQueryStringValue (key) {  
  return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
}  

var _search = function(q) {
  return axios.get(`http://api.cybersearch.io/search?query=${q}`)
  .then(response => response.data)
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }
  componentDidMount() {
    _search(getQueryStringValue('q'))
      .then(response => {
        this.setState({ items: response.items })
      });
  }
  generateLink(item) {
    if (item.chain === 'ethereum' && item.entity === 'block') {
      return (
        <a href={`/eb/?q=${item.data.number}`} target="iframe">{item.data.number}</a>
      );
    }

    if (item.chain === 'bitcoin' && item.entity === 'block') {
      return (
        <a href={`/bb/?q=${item.data.number}`} target="iframe">{item.data.number}</a>
      );
    }    
    return (
      <a href='#'>item</a>
    );
  }
  render() {
    const { items } = this.state;
    return (
      <div>
        {items.map((item, index) => (
          <div key={index}>
            <div>
              {item.chain}
            </div>
            <div>
              {item.entity}
            </div>
            <div>
              {JSON.stringify(item.data) }
            </div>
            {this.generateLink(item)}
          </div>
        ))}
      </div>
    );
  }
}

const domContainer = document.querySelector('#app');
ReactDOM.render(<App />, domContainer);
