import Header from "./components/header/Header";
import AddProduct from "./components/product/AddProduct";
import Products from "./components/product/Products";
import {BrowserRouter , Switch, Route} from 'react-router-dom'
import {Provider} from 'react-redux'
import {productReducer} from './store/product/reducer'
import {createStore,combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'


function App() {


  
  const store = createStore(combineReducers({
    products : productReducer
  }),applyMiddleware(thunk))



  return (
    <Provider store={store}>
    <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/" exact component={Products} />
          <Route path="/addproduct" component={AddProduct} />
        </Switch>
    </BrowserRouter>
    </Provider>
    
  );
}

export default App;
