import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const registerUser = user => dispatch => {
    return fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(user)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .catch(err => {
            const { reason, message, location } = err;
            console.log(message, location)
            if (reason === 'ValidationError') {
                return Promise.reject(err);
            }
        });
};