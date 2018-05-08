
import * as React from 'react';

const style = {
  border: '1px solid red',
  background: '#ccc'
}

export const Button = (props) => (
  <button {...props} style={style} />
);

