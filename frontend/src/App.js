import Header from "./components/header/Header";
import AddProduct from "./components/product/AddProduct";
import Products from "./components/product/Products";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { productReducer } from "./store/product/reducer";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import ErrorBoundary from "./components/error/ErrorBoundary";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import { authReducer } from "./store/auth/reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import TryLogin from "./components/auth/TryLogin";

function App() {
  const store = createStore(
    combineReducers({
      products: productReducer,
      auth: authReducer,
    }),
    composeWithDevTools(applyMiddleware(thunk))
  );

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <TryLogin>
            <Header />
            <Switch>
              <Route path="/" exact component={Products} />
              <Route path="/login" exact component={Login} />
              <Route path="/signup" exact component={SignUp} />
              <Route path="/addproduct" component={AddProduct} />
            </Switch>
          </TryLogin>
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
