import * as React from "react";

import JSONTree from "react-json-tree";
import {reactJsonTreeTheme} from "./common";


const Tree = ({ data }) => (
  <JSONTree
    data={data}
    theme={reactJsonTreeTheme}
    invertTheme={true}
  />
);


export default Tree;
