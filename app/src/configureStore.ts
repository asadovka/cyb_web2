import {Store} from "react-redux";
import {createEpicMiddleware} from "redux-observable";
import {createLogger} from "redux-logger";
import {createStore, applyMiddleware, GenericStoreEnhancer} from "redux";
import {combinedReducers} from "./reducers/reducers";
import {EnvironmentConstants} from "./config/EnvironmentConstants";
import {rootEpic} from "./epics/rootEpic";
import {CfState} from "./model/CfState";
import thunk from 'redux-thunk';

export function configureStore(): Store<CfState> {
  return createStore(
    combinedReducers,
    getMiddlewares()
  );
}

function getMiddlewares(): GenericStoreEnhancer {
  const logger = createLogger({
    collapsed: true
  });

  /**
   * Split middlewares which we using in development and in production.
   */
  if (process.env.NODE_ENV === EnvironmentConstants.development) {
    return applyMiddleware(createEpicMiddleware(rootEpic), logger, thunk);
  } else {
    return applyMiddleware(createEpicMiddleware(rootEpic), thunk);
  }
}
