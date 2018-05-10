import * as React from 'react';
const styles = require("./MetamaskLogo.less");

var ModelViewer = require('metamask-logo')

class MetamaskLogo extends React.Component {
  componentDidMount() {
    // To render with fixed dimensions:
    var viewer = ModelViewer({

      // Dictates whether width & height are px or multiplied
      pxNotRatio: true,
      width: 194,
      height: 196,
      // pxNotRatio: false,
      // width: 0.9,
      // height: 0.9,

      // To make the face follow the mouse.
      followMouse: false,

      // head should slowly drift (overrides lookAt)
      slowDrift: true,

    })

    // add viewer to DOM
    var container = this.refs.container;
    container.appendChild(viewer.container)

    // look at something on the page
    viewer.lookAt({
      x: 100,
      y: 100,
    })

   // viewer.setFollowMouse(true)
  }
  render() {
    return (
      <div ref='container' className={styles.metamaskIndicator}>
      </div>
    );
  }
}

export { MetamaskLogo };
