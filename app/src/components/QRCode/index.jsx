import * as React from "react";

var QRCode = require('qrcode.react');


const QRCodeWrapper = ({ hash }) => (
  <QRCode size={140} value={hash} />
);

export default QRCodeWrapper;
