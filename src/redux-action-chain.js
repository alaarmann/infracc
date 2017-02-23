
const isChained = action => action.meta && (action.meta.before || action.meta.next || action.meta.throw)

const createReduxActionChain = () => {
    return store => next => action => {
        const {dispatch} = store
        if (isChained(action)) {
            const dispatchBefore = action.meta.before
            const dispatchNext = action.meta.next
            const dispatchThrow = action.meta.throw

            delete action.meta['before']
            delete action.meta['next']
            delete action.meta['throw']

            return Promise.resolve()
                .then(
                    (outcome) => {
                        if (typeof dispatchBefore === 'function') {
                            return dispatch(dispatchBefore(outcome))
                        } else if(typeof dispatchBefore !== 'undefined'){
                            return dispatch(dispatchBefore)
                        }
                        return outcome
                    }
                )
                .then(
                    () => dispatch(action)
                )
                .then(
                    (outcome) => {
                        if (typeof dispatchNext === 'function') {
                            return dispatch(dispatchNext(outcome))
                        } else if(typeof dispatchNext !== 'undefined'){
                            return dispatch(dispatchNext)
                        }
                        return outcome
                    },
                    (error) => {
                        if (typeof dispatchThrow === 'function') {
                            return Promise.reject(dispatch(dispatchThrow(error)))
                        } else if(typeof dispatchThrow !== 'undefined'){
                            return dispatch(dispatchThrow)
                        }
                        return Promise.reject(error)
                    }
                )
        }
        return next(action)
    }
}

export default createReduxActionChain