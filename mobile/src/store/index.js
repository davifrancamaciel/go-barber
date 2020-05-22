import {persistStore} from 'redux-persist'
import createSagaMiddleware from 'redux-saga'

import createStore from './createStore'
import persistReducers from './persistReducers'

import rootReducer from './models/rootReducer'
import rootSaga from './models/rootSaga'

const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null

const sagaMiddleware = createSagaMiddleware({sagaMonitor})

const middlewares = [sagaMiddleware]

const store = createStore(persistReducers(rootReducer), middlewares)
const persistor = persistStore(store)

sagaMiddleware.run(rootSaga)

export {store, persistor}
