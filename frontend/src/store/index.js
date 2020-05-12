import createSagaMiddleware from 'redux-saga'
import createStore from './createStore'

import rootReducer from './models/rootReducer'
import rootSaga from './models/rootSaga'

const sagaMonitor =
  process.env.NODE_ENV === 'development'
    ? console.tron.createSagaMonitor()
    : null

const sagaMiddleware = createSagaMiddleware({ sagaMonitor })

const middlewares = [sagaMiddleware]

const store = createStore(rootReducer, middlewares)

sagaMiddleware.run(rootSaga)

export default store
