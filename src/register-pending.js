import { registerPending } from './actions'


const registerPendingAsyncMiddleware = ({ dispatch, getState }) => next => action => {
    if (action.payload && action.payload instanceof Promise){
        console.log(`register ${action.type} as pending`, action)
        dispatch(registerPending(action.type))
    }
    console.log('dispatching', action)
    return next(action)
}

export default registerPendingAsyncMiddleware