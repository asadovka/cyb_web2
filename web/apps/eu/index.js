
function getQueryStringValue (key) {  
  return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
}  

var getBlock = function(q) {
  return axios.get(`http://api.cybersearch.io/ethereum/uncle/${q}`)
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

    if (!block) return null;

    return (
      <Container>
        <Title>Ethereum uncle #{block.number}</Title>
        <Section title='General'>
          <SectionContent >
            <Content>
              <VerticalLabel>UTC time:</VerticalLabel>
              <div>{(new Date(block.timestamp)).toLocaleString("en-US")}</div>
            </Content>
          </SectionContent>
          <SectionContent>
            <Content>
              <VerticalLabel>Hash:</VerticalLabel>
              <LinkHash value={block.hash}/>
            </Content>
          </SectionContent>
          <SectionContent>
            <Content>
            <VerticalLabel>Parent block:</VerticalLabel>
            <div><a href={'/apps/eb?q=' + block.blockNumber}>{block.blockNumber}</a></div>
            </Content>
          </SectionContent>
          <SectionContent>
            <Content>
            <VerticalLabel>Parent hash:</VerticalLabel>
            <LinkHash value={block.blockHash}/>
            </Content>
          </SectionContent>
        </Section>

        <Section>
          <SectionContent title='Blockchain specific'>
            <Details>
              <DetailsRow>
                <Label>level</Label>
                <Value>{block.position}</Value>
              </DetailsRow>
            </Details>
          </SectionContent>
        </Section>

        <Section>
          <SectionContent title='Mining'>
            <Details>
              <DetailsRow>
                <Label>miner</Label>
                <Value><LinkHash value={block.miner}/></Value>
              </DetailsRow>
            </Details>
             
          </SectionContent>
        </Section>

        <Section>
          <SectionContent title='Rewards'>
            <Details>
              <DetailsRow>
                <Label>uncle inclusion reward</Label>
                <Value>{block.uncleReward}</Value>
              </DetailsRow>
            </Details>
          </SectionContent>
        </Section>

      </Container>
    );
  }
}

const domContainer = document.querySelector('#app');
ReactDOM.render(<App />, domContainer);
