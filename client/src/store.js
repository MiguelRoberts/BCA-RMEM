import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const initialState = {}

const middleWare = [thunk]

const c = process.env.NODE_ENV === 'development' ? compose(applyMiddleware(...middleWare), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() ) : compose(applyMiddleware(...middleWare))
const store = createStore(
    rootReducer, 
    initialState, 
    c
)

export default store