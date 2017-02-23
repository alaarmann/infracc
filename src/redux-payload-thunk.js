
const reduxPayloadThunkMiddleware = store => next => action => {
        const {dispatch} = store
        if (action.payload && typeof action.payload === 'function') {
            action.payload = action.payload(dispatch)
            const result =  next(action)
            return (result && typeof result.then === 'function') ? result.then((outcome) => {
                if (outcome && outcome.error){
                    throw outcome.payload
                }
            }) : result
        }
        return next(action)
    }


export default reduxPayloadThunkMiddleware