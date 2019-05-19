import reducer from './auth';

import * as actionTypes from '../actions/actionTypes';
import { exportAllDeclaration } from '@babel/types';

describe('auth reducer', () => {
    it('should return initial state', () => {
        expect( reducer(undefined, {})).toEqual({
            uid: null,
            idToken: null,
            refreshToken: null,
            error: null,
            loading: false,
            authRedirectPath: "/",
        })
    })

    it('should store token on login', () => {
        expect( reducer( {
            uid: null,
            idToken: null,
            refreshToken: null,
            error: null,
            loading: false,
            authRedirectPath: "/",
        }, 
        {
            type: actionTypes.AUTH_SUCCESS, 
            idToken: 'some-token',
            localId: 'some-id',
            refreshToken: 'some-refresh'
        }))
        .toEqual(
            {
                uid: 'some-id',
                idToken: 'some-token',
                refreshToken: 'some-refresh',
                error: null,
                loading: false,
                authRedirectPath: "/",
            }
        )
    })
})