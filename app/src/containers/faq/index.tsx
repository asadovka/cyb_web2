import * as React from "react";
import Paper from 'material-ui/Paper';
import Card, { CardActions, CardContent } from 'material-ui/Card';


const FAQ = () => (
  <div className='container' style={{ width: 1090 }}>
  <Card>
    <CardContent>
  <div className="content">

<h1>Frequently Asked Questions</h1>
<h2>Market data</h2>
<p>All the market data is obtained from connected exchanges through websocket protocol. There are several types of input data:</p>
<ul>
  <li>number of connected exchanges</li>
  <li>traded token pairs</li>
  <li>buy and sell orders</li>
</ul>

<p>All economic indicators on pages are calculated using this information.</p>

<h2>Token Price</h2>
<p>Current price of token is calculated by taking the weighted average of prices by traded pair from each exchange:</p> 
<div style={{ textAlign: 'center'}}>
  <img src={require('./image1.png')}/>
</div>
<br />
<i>where n - number of connected exchanges, <img src={require('./image2.png')}/> - weight of price by pair from exchange (<img style={{ verticalAlign: 'middle'}} src={require('./image3.png')}/>), <img src={require('./image4.png')}/> - price of the last trade from exchange.</i>

<p>Weight of exchange price is calculated according to trade volume contribution of each exchange:</p>
<div style={{ textAlign: 'center'}}>
  <img src={require('./image5.png')}/>,
</div>
<i>where total volume is sum of trade volumes of each exchange for certain token pair.</i>
<p>Thus there are several weighted prices, displayed on page (for example BTCUSD, BTCUSDT, BTCETH). This price information is also used in further calculations of market indices.</p>
<strong>Weighted Price updates every 3 seconds.</strong>
<h2>Cross calculation of price </h2>
<p>Not all tokens from exchanges are traded to USD or USDT. But there is a method for evaluation of token price in such currencies. First of all BTCUSD, BTCUSDT and ETHUSD, ETHUSDT pair weighted prices are obtained. Then ETHBTC price is calculated. All other token prices are recalculated using this data.</p>
<h2>Volume</h2>
<p>Trade volume shows how much of a given token has been traded in a given period of time for all markets. Trades are taken for all pairs, which include needed token. The value of traded volume is measured in amount of tokens. </p>
<strong>On Token Page volume value is shown for 24h period of time. </strong>
<h2>Cross calculation of volume</h2>
<p>The 24 volume data is calculated as the sum of volumes by small period of time (every hour seconds). Thus to get accurate recalculation of full volume in USD or USDT the next formula is used:</p>
<div style={{ textAlign: 'center'}}>
  <img src={require('./image6.png')}/>,
</div>
<i>where <img style={{ verticalAlign: 'middle'}} src={require('./image7.png')}/>- volume of traded token by hour, <img style={{ verticalAlign: 'middle'}} src={require('./image8.png')}/>) - weighted price for pair “token to calculated currency”</i>
<h2>Supply</h2>
<p>There are several types of supply used in calculations:  </p>
<p><i>Circulating Supply</i> - approximation of the number of tokens that are circulating in the market or between the active holders.</p>
<p><i>Total Supply</i> - total amount of existed tokens (including tokens from inactive addresses) except burned ones.</p>
<p><i>Maximum Supply</i> - maximum possible amount of tokens.</p>
<strong>All token supply data provides Chaingear.</strong>
<h2>Market capitalization</h2>
<p>Market Capitalization helps to estimate the relative size of a cryptocurrency. It's calculated by multiplying the current token weighted price by the circulating supply: </p>
<div style={{ textAlign: 'center'}}>
  <img src={require('./image9.png')}/>,
</div>
<p>Market capitalization value can be also recalculated in other currencies due to earlier described methods.</p>
<h2>Weighted Price change information</h2>
<p>The information about price change is need  to display the dynamic state of token. The general view of the price change calculation formula looks like that:</p>
<div style={{ textAlign: 'center'}}>
  <img src={require('./image10.png')}/>,
</div>
<p>Price change is measure in percents. By default there are two values of changes that are displayed on tiken page:</p>
<ul>
<li>24h price change - numerical value</li>
<li>7d price change - 7d small historical price graph (plot contains 168 price dots)</li>
</ul>
<div style={{ textAlign: 'center'}}>
  <img style={{ width: '70%'}} src={require('./image12.png')}/>,
</div>
<h2>Bitcoin and Ethereum Market Index</h2>

<h2>Checkboxes and token grouping</h2>
<p>For more comfortable work with token page grouping function was added. Any token can be found via search section at the top of token list and then added to custom list.</p>
<div style={{ textAlign: 'center'}}>
  <img style={{ width: '70%'}} src={require('./image11.png')}/>,
</div>

<h2>Token listing</h2>
<p>Currently token page displays all tokens, which are listed in Chaingear.</p>

 


  </div>
    </CardContent>
  </Card>
  </div>
);

export default FAQ;
