
const createRegisterPendingAsyncMiddleware = ({dispatchBefore, dispatchAfter}) => {
    return store => next => action => {
        const {dispatch} = store
        if (action.payload && typeof action.payload === 'function') {
            console.log(`register ${action.type} as pending`, action)
            if (dispatchBefore){
                dispatch(dispatchBefore(action.type))
            }
            action.payload = action.payload()
            console.log('dispatching async', action)
            const result =  next(action)
            return (result && typeof result.then === 'function') ? result.then((outcome) => {
                if (dispatchAfter){
                    console.log(`deregister ${action.type} from pending`, action)
                    dispatch(dispatchAfter(action.type))
                }
                if (outcome && outcome.error){
                    throw outcome.payload
                }
            }) : result
        }
        console.log('dispatching', action)
        return next(action)
    }
}

export default createRegisterPendingAsyncMiddleware