
const createRegisterPendingAsyncMiddleware = ({dispatchBefore, dispatchAfter}) => {
    return store => next => action => {
        const {dispatch} = store
        if (action.payload && action.payload instanceof Function) {
            console.log(`register ${action.type} as pending`, action)
            if (dispatchBefore){
                dispatch(dispatchBefore(action.type))
            }
            action.payload = action.payload()
            console.log('dispatching async', action)
            const result =  next(action)
            return result && result.then ? next(action).then(() => {
                if (dispatchAfter){
                    console.log(`deregister ${action.type} from pending`, action)
                    dispatch(dispatchAfter(action.type))
                }
            }) : result
        }
        console.log('dispatching', action)
        return next(action)
    }
}

export default createRegisterPendingAsyncMiddleware