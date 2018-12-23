import { fetch, addTask } from 'domain-task';
import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';

export interface CourseDetailsDto {
    id: number;
    name: string;
    length: string;
}

export interface CourseDetailsState {
    details?: CourseDetailsDto;
    id?: number;
    isLoading: boolean;
}

interface RequestCourseDetailsAction {
    type: 'REQUEST_COURSE_DETAILS';
    id: number;
}

interface ReceiveCourseDetailsAction {
    type: 'RECEIVE_COURSE_DETAILS';
    id: number;
    details: CourseDetailsDto;
}

type KnownAction = RequestCourseDetailsAction | ReceiveCourseDetailsAction;

export const actionCreators = {
    requestCourseDetails: (id: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        if(id !== getState().courseDetails.id) {
            let fetchTask = fetch(`api/Courses/Get?id=${ id }`)
                .then(response => response.json() as Promise<CourseDetailsDto>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_COURSE_DETAILS', details: data, id: data.id });
                });

            addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
            dispatch({ type: 'REQUEST_COURSE_DETAILS', id: id });
        }
    }
}

const unloadedState: CourseDetailsState = { isLoading: false };

export const reducer: Reducer<CourseDetailsState> = (state: CourseDetailsState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_COURSE_DETAILS': 
            return {
                details: state.details,
                id: action.id,
                isLoading: true
            };
        case 'RECEIVE_COURSE_DETAILS':
            if(action.id === state.id) {
                return {
                    details: action.details,
                    id: action.id,
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