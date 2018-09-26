import * as React from 'react';
const cx = require('classnames');

const styles = require("./Layout.css");

export const Container = ({ children }) => (
  <div className={styles.container}>
    {children}
  </div>
);

export const SearchFormPanel = (props) => (
  <div {...props} className={styles.searchForm}/>
);;

export const Panel = ({ open, ...props }) => (
  <div {...props} className={cx(styles.panel, { [styles.panelOpen]: open })} />
);

export const PanelLeft = ({ open, ...props }) => (
  <div {...props} className={styles.panelLeft} />
);

export const PanelRight = ({ open, ...props }) => (
  <div {...props} className={styles.panelRight} />
);

export const AppContainer = ({ children }) => (
	<div style={{ background: '#eff3f6', display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
		{children}
	</div>
)

export const AppHeader = ({ open, children }) => (
	<div style={{  left: 0, right: 0, minHeight: (!open) ? 550 : 109 }}>
		{ children }
	</div>
)

export const AppContent = (props) => (
    <div style={{  flexGrow: 1, display: 'flex' }} {...props} />
)

class AppIframe extends React.Component {

	onLoad = () => {
	    const innerWindow = this.refs.iframe.contentWindow;

	    this.props.iframeOnLoad(innerWindow)
  	}

  	render() {
  		const { iframeOnLoad, ...props  } = this.props;
  		return (
			<iframe style={{ boxSizing: 'border-box', minHeight: '100vh', border: 'none' }} onLoad={this.onLoad} ref="iframe" {...props} >
			</iframe>
  		)
  	}
}

export { AppIframe };
