import * as React from "react";
import * as ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {Root} from "./root";
import {configureStore} from "./configureStore";
import {ConfigConstants} from "./config/ConfigConstants";
import {getLogger} from "./http/Logger";

import "./global.less";

getLogger().info("Application version:", ConfigConstants.APP_VERSION);

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Root/>
  </Provider>,
  document.getElementById("root")
);
