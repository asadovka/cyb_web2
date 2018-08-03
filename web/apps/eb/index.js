
function getQueryStringValue (key) {  
  return decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));  
}  

var getBlock = function(q) {
  return axios.get(`http://api.cybersearch.io/ethereum/block/${q}`)
  .then(response => response.data)
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { block: null, transactions: [] };
  }
  
  componentDidMount() {
    const q = getQueryStringValue('q');
    getBlock(q)
      .then(response => {
        this.setState({  block: response })
      });

    axios.get(`http://api.cybersearch.io/ethereum/block/${q}/transactions`)
      .then(response => response.data) 
      .then(transactions => this.setState({ transactions }))
  }

  render() {
    const { block, transactions } = this.state;

    if (!block) return null;

    return (
      <Container>
        <Title>Ethereum block #{block.number}</Title>
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
            <VerticalLabel>size:</VerticalLabel>
            <div>{block.size}</div>
            </Content>
          </SectionContent>
          <SectionContent>
            <Content>
            <VerticalLabel>Traansactions:</VerticalLabel>
            <div>{block.txNumber}</div>
            </Content>
          </SectionContent>
        </Section>


        <Section>
          <SectionContent title='Mining'>
            <Details>
              <DetailsRow>
                <Label>Miner</Label>
                <Value><LinkHash value={block.minerContractHash}/></Value>
              </DetailsRow>
              <DetailsRow>
                <Label>Miner</Label>
                <Value>{block.difficulty}</Value>
              </DetailsRow>              
            </Details>
          </SectionContent>
        </Section>

        <Section>
          <SectionContent title='Blockchain specific'>
            <Details>
              <DetailsRow>
                <Label>Sha3Uncles</Label>
                <Value>{block.sha3Uncles}</Value>
              </DetailsRow>
              <DetailsRow>
                <Label>Extra Data</Label>
                <Value>{block.extraData}</Value>
              </DetailsRow>  
              <DetailsRow>
                <Label>Uncles</Label>
                <Value>{block.uncles.length}</Value>
              </DetailsRow> 
              <DetailsRow>
                <Label>Gas used</Label>
                <Value>{block.gasUsed}</Value>
              </DetailsRow>              
              <DetailsRow>
                <Label>Gas limit</Label>
                <Value>{block.gasLimit}</Value>
              </DetailsRow>              
              <DetailsRow>
                <Label>Nonce</Label>
                <Value>????</Value>
              </DetailsRow>              
            </Details>
          </SectionContent>
        </Section>


        <Section>
          <SectionContent title='Rewards'>
            <Details>
              <DetailsRow>
                <Label>Static block reward</Label>
                <Value>{block.blockReward} ETH</Value>
              </DetailsRow>
              <DetailsRow>
                <Label>Uncle reward</Label>
                <Value>{block.unclesReward} ETH</Value>
              </DetailsRow>
              <DetailsRow>
                <Label>Fees</Label>
                <Value>{block.txFees} ETH</Value>
              </DetailsRow>       
              <DetailsRow>
                <Label>Total block reward</Label>
                <Value>{(+block.blockReward) + (+block.unclesReward) + (+block.txFees)} ETH</Value>
              </DetailsRow>         
            </Details>
          </SectionContent>
        </Section>


        <Section>
          <SectionContent title='Uncles'>
            <table>
              <thead>
                <tr>
                  <th>Hash</th>
                  <th>Level</th>
                  <th>Miner</th>
                  <th>Reward</th>
                </tr>
              </thead>
              <tbody>
                {block.uncles.map(hash => (
                  <tr>
                    <td>{hash}</td>
                    <td>???</td>
                    <td>???</td>
                    <td>???</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </SectionContent>
        </Section>

        <Section>
          <SectionContent title='Transactions'>
            <table>
              <thead>
                <tr>
                  <th>UTC time</th>
                  <th>Hash</th>
                  <th>Sender</th>
                  <th>Receiver</th>
                  <th>Value</th>
                  <th>Fee</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map(t => (
                  <tr>
                    <td>???</td>
                    <td><LinkHash to={'/apps/et?q=' + t.hash} value={t.hash}/></td>
                    <td><LinkHash value={t.from}/></td>
                    <td><LinkHash value={t.to}/></td>
                    <td>{t.value} ETH</td>
                    <td>{t.fee} ETH</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </SectionContent>
        </Section>

      </Container>
    );
  }
}

const domContainer = document.querySelector('#app');
ReactDOM.render(<App />, domContainer);
