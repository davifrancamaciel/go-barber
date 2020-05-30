import Reactotron from 'reactotron-react-native'
import {reactotronRedux} from 'reactotron-redux'
import reactotronSaga from 'reactotron-redux-saga'

// Adaptador Ethernet Ethernet 4:
// Endereço IPv4. . . . . . . .  . . . . . . . : 192.168.42.142
if (__DEV__) {
  const tron = Reactotron.configure({host: '192.168.42.142'})
    .useReactNative()
    .use(reactotronRedux())
    .use(reactotronSaga())
    .connect()

  tron.clear()

  console.tron = tron
}
