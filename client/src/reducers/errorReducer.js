import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types'

const initialState = {
    msg: '',
    status: null,
    id: null
}

export default function(state=initialState, { type, payload }) {
    switch (type) {
        case GET_ERRORS:
            return {
                msg: payload.msg,
                status: payload.status,
                id: payload.id
            }
    
        case CLEAR_ERRORS:
            return initialState

        default:
            return state
    }
}