
const createRegisterPendingAsyncMiddleware = (callback) => {
    return store => next => action => {
        const {dispatch} = store
        if (action.payload && action.payload instanceof Function) {
            console.log(`register ${action.type} as pending`, action)
            dispatch(callback(action.type))
            action.payload = action.payload()
        }
        console.log('dispatching', action)
        return next(action)
    }
}

export default createRegisterPendingAsyncMiddleware