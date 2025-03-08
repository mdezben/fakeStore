import { registerRootComponent } from 'expo';

//import App from './App';
//import Login from './app/screens/Login';
//import Tienda from './app/screens/Tienda';
import listaProductos from './app-temp/screens/listaProductos';

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(listaProductos);