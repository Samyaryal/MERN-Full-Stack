import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import setAuthToken from './utils/setAuthToken';

const initialState = {auth: {token: null}} ;
const middleware = [thunk];
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
let currentState ={...initialState};
store.subscribe(() => {
  //keep track of the previous and current state to compare chages
  let previousState = currentState;
  currentState = store.getState();
  if(previousState.auth.token !== currentState.auth.token){
    const token = currentState.auth.token;
    setAuthToken(token);
  }
});
export default store;
