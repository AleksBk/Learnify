import { fetch, addTask } from 'domain-task';
import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';
import { Login } from 'ClientApp/components/Login';
import history from '../history'

interface LoginResult {
    login: string;
    token: string;
}

export interface AccountState {
    token: string;
    currentLogin: string;
    isLoading: boolean;
}

interface RequestLoginAction {
    type: 'REQUEST_LOGIN_DETAILS';
    login: string;
}

interface ReceiveLoginAction {
    type: 'RECEIVE_LOGIN_DETAILS';
    token: string;
    login: string;
}

type KnownAction = RequestLoginAction | ReceiveLoginAction;

export const actionCreators = {
    requestLogin: (login: string, password: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        if(login !== getState().account.currentLogin) {
            let fetchTask = fetch(`api/Account/Login`)
                .then(response => response.json() as Promise<LoginResult>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_LOGIN_DETAILS', token: data.token, login: data.login });
                    history.push('/');
                });

            addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
            dispatch({ type: 'REQUEST_LOGIN_DETAILS', login: login });
            return fetchTask;
        }
    }
}

const unloadedState: AccountState = { 
    token: '',
    isLoading: false,
    currentLogin: ''
};


export const reducer: Reducer<AccountState> = (state: AccountState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_LOGIN_DETAILS': 
            return {
                token: state.token,
                currentLogin: action.login,
                isLoading: true
            };
        case 'RECEIVE_LOGIN_DETAILS':
            if(action.login === state.currentLogin) {
                return {
                    token: action.token,
                    currentLogin: action.login,
                    isLoading: false
                };
            }
            break;
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }
    return state || unloadedState;
}
