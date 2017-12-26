import * as React from "react";
import withRouter from "react-router/es/withRouter";

import App from '../app/';
     
import { connect } from 'react-redux';

import {Injector} from "../../injector";
const {
  chaingearApi
} = Injector.of();

import { showCrowdsalesDetails } from '../../modules/chaingear';
import { getSystemLogoUrl } from '../Tokens/module'
import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from '../../components/Table/';
import Card, { CardActions, CardContent } from 'material-ui/Card';

class CrowdsalesDetails extends React.Component {
  componentDidMount() {
    const { system } = this.props;
    this.props.showCrowdsalesDetails(system);
  }
  render() {
    const { crowdsalesDetails } = this.props;
    return (
      <div>
         {crowdsalesDetails.system ? (
           <div>
             <Card>
             <CardContent>
             <div>
               <img width={50} src={getSystemLogoUrl(crowdsalesDetails, chaingearApi.imageUrl())} />
               <h2 className='title'>{crowdsalesDetails.system}</h2>
               <h3 className='subtitle'>{crowdsalesDetails.token.symbol}{' '}{crowdsalesDetails.descriptions.state}{' '}{crowdsalesDetails.descriptions.system_type}</h3>
             </div>
             <div>
               <h2 className='title'>Links:</h2>
               <div className='tags'>
               {crowdsalesDetails.links.map(link => (
                 <a key={link.url} className='tag' href={link.url}>
                   {link.icon && <img style={{ marginRight: 10 }} width={20} src={chaingearApi.imageUrl() + link.icon} />} {link.name}
                 </a>
                ))}
                 </div>
             </div>
             </CardContent>
             </Card>
             <div>
               <h2 style={{ marginTop: '1.5rem' }} className='title'>Crowdsale</h2>
               <Card>
               <CardContent>
               <table className='table is-striped '>
                 <thead>
                   <tr>
                     <td>Property</td>
                     <td>Value</td>
                   </tr>
                 </thead>
                 <tbody>
                   <tr>
                     <td>Start Date</td>
                     <td>{crowdsalesDetails.crowdsales.start_date}</td>
                   </tr>
                   <tr>
                     <td>End Date</td>
                     <td>{crowdsalesDetails.crowdsales.end_date}</td>
                   </tr>
                   <tr>
                     <td>Escrow Addresses</td>
                     <td>????</td>
                   </tr>
                   <tr>
                     <td>Funding Terms</td>
                     <td><a href={crowdsalesDetails.crowdsales.funding_url}>{crowdsalesDetails.crowdsales.funding_url}</a></td>
                   </tr>
                   <tr>
                     <td>Funding URL</td>
                     <td><a href={crowdsalesDetails.crowdsales.funding_url}>{crowdsalesDetails.crowdsales.funding_url}</a></td>
                   </tr>
                    <tr>
                     <td>Tokens Sold</td>
                     <td>{crowdsalesDetails.crowdsales.tokens_sold}</td>
                   </tr>                   
                    <tr>
                     <td>Tokens Issued</td>
                     <td>{crowdsalesDetails.crowdsales.tokens_issued}</td>
                   </tr>  
                    <tr>
                     <td>BTC Raised</td>
                     <td>????</td>
                   </tr>  
                </tbody>
               </table>
               </CardContent>
               </Card>
             </div>
             <div style={{ marginTop: 20 }}>
               You can improve <a href={`https://github.com/cyberFund/chaingear/blob/gh-pages/sources/${crowdsalesDetails.system}/${crowdsalesDetails.system}.toml`}>{crowdsalesDetails.system}'s</a> page on Github.
             </div>
           </div>
         ) : (
           <div>
             loading...
           </div>
         )}
      </div>
    );    
  }
}

export default withRouter(connect(
  (state, ownProps) => ({
    system: ownProps.routeParams.system,
    crowdsalesDetails: state.chaingear.crowdsalesDetails.data
  }),
  { showCrowdsalesDetails }
)(CrowdsalesDetails));
