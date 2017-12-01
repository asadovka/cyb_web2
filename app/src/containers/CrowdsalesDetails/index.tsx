import * as React from "react";
import withRouter from "react-router/es/withRouter";

import App from '../app/';
     
import { connect } from 'react-redux';

import {Injector} from "../../injector";
const {
  chaingearApi
} = Injector.of();

import { showCrowdsalesDetails, getSystemLogoUrl } from '../../modules/chaingear';

class CrowdsalesDetails extends React.Component<any, any> {
  componentDidMount() {
    const { system } = this.props;
    this.props.showCrowdsalesDetails(system);
  }
  render() {
    const { crowdsalesDetails } = this.props;
    return (
      <App>
         {crowdsalesDetails.system ? (
           <div>
             <div>
               <h2>{crowdsalesDetails.system}</h2>
               <h3>{crowdsalesDetails.token.symbol}</h3>
               <h3>{crowdsalesDetails.descriptions.state}{' '}{crowdsalesDetails.descriptions.system_type}</h3>
               <img width={50} src={getSystemLogoUrl(crowdsalesDetails, chaingearApi.imageUrl())} />
             </div>
             <div>
               <h2>Links:</h2>
               {crowdsalesDetails.links.map(link => (
                 <div>
                 <a href={link.url}>
                   {link.icon && <img width={20} src={chaingearApi.imageUrl() + link.icon} />} {link.name}
                 </a>
                 </div>
                ))}
             </div>
             <div>
               <h2>Crowdsale</h2>
               <table>
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
             </div>
             <div>
               You can improve <a href={`https://github.com/cyberFund/chaingear/blob/gh-pages/sources/${crowdsalesDetails.system}/${crowdsalesDetails.system}.toml`}>{crowdsalesDetails.system}'s</a> page on Github.
             </div>
           </div>
         ) : (
           <div>
             loading...
           </div>
         )}
      </App>
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
