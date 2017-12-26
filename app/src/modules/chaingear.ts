import {Injector} from "../injector";
import {Observable} from "rxjs";
import {combineReducers} from "redux";
import {combineEpics} from "redux-observable";

import { createDateReducer, mapPayload, mapError, loadDataEpic } from '../utils/redux'

const {
  chaingearApi
} = Injector.of();


export const showAllCrowdsales = () => ({
  type: 'CROWDSALES'
})

export const showCrowdsalesDetails = (system) => ({
  type: 'CROWDSALES_DETAILS',
  payload: { system }
})


export const reducer = combineReducers({
  crowdsales: createDateReducer('CROWDSALES', []),
  crowdsalesDetails: createDateReducer('CROWDSALES_DETAILS')
})

export const epic = combineEpics(
  loadDataEpic(
    'CROWDSALES',
    () => chaingearApi.getAllCrowdsales()
  ),
  loadDataEpic(
     'CROWDSALES_DETAILS',
     ({ system }) => chaingearApi.crowdsalesDetails(system)
  )
) 
