import * as React from "react";
import withRouter from "react-router/es/withRouter";

import App from '../app/';
     
import { connect } from 'react-redux';

import {Injector} from "../../injector";
const {
  chaingearApi
} = Injector.of();

import { showTokensDetails, getSystemLogoUrl } from '../../modules/chaingear';

class TokensDetails extends React.Component<any, any> {
  componentDidMount() {
    const { system } = this.props;
    this.props.showTokensDetails(system);
  }
  render() {
    const { crowdsalesDetails } = this.props;
    console.log(' >> ', crowdsalesDetails)
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
               statistic???
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
               price chart ?
             </div>
             <div>
               <h2>Specification</h2>
             </div>
             <div>
               <h2>First Price</h2>
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
    crowdsalesDetails: state.chaingear.tokensDetails.data
  }),
  { showTokensDetails }
)(TokensDetails));
