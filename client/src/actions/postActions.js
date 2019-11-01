import axios from 'axios'
import { GET_POSTS, ADD_POST, DELETE_POST, POSTS_LOADING, SHOW_ERROR } from './types'
import { tokenConfig } from './authActions'

export const getPosts = () => dispatch => {
    dispatch(setPostsLoading)
    axios
        .get('/api/posts')
        .then(res => 
            dispatch({
                type: GET_POSTS,
                payload: res.data
            })
        )
        .catch(err => dispatch(showError(err.response.data.msg)))
}

export const addPost = post => (dispatch, getState) => {
    const { title, image, body } = post

    if (!title || !image || !body) return dispatch(showError('Please Fill Out All Fields.'))

    axios
        .post('/api/posts', post, tokenConfig(getState))
        .then(res => 
            dispatch({
                type: ADD_POST,
                payload: res.data
            })    
        )
        .catch(err => dispatch(showError(err.response.data.msg)))
}

export const deletePost = postId => (dispatch, getState) => {
    axios
        .delete(`/api/posts/${postId}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: DELETE_POST,
                payload: { _id: postId }
            })
        )
        .catch(err => dispatch(showError(err.response.data.msg)))
}

export const setPostsLoading = () => ({
    type: POSTS_LOADING
})

export const showError = error => ({
    type: SHOW_ERROR,
    payload: error
})