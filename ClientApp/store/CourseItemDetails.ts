import { fetch, addTask } from 'domain-task';
import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';

export interface CourseItemDetails {
    name: string;    
    type: string    
    length: string;
    description: string;
    content: {};
}

export interface CourseItemDetailsState {
    details: CourseItemDetails;
    isLoading: boolean;
}

interface RequestCourseItemDetailsAction {
    type: 'REQUEST_COURSE_ITEM_DETAILS';
}

interface ReceiveCourseItemDetailsAction {
    type: 'RECEIVE_COURSE_ITEM_DETAILS';
    details: CourseItemDetails;
}

type KnownAction = RequestCourseItemDetailsAction | ReceiveCourseItemDetailsAction;

export const actionCreators = {
    requestCourseItemDetails: (courseId: number, courseItemName: string): AppThunkAction<KnownAction> => (dispatch, getState) => {
        if(courseId !== getState().courseDetails.id && courseItemName !== getState().courseItemDetails.details.name) {
            let fetchTask = fetch(`api/courses/${courseId}/item/${courseItemName}`)
                .then(response => response.json() as Promise<CourseItemDetails>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_COURSE_ITEM_DETAILS', details: data });
                });

            addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
            dispatch({ type: 'REQUEST_COURSE_ITEM_DETAILS' });
        }
    }
}

const unloadedState: CourseItemDetailsState = { 
    details: {
        name: '',        
        type: '',
        length: '',
        description: '',
        content: {}
    },
    isLoading: false
};

export const reducer: Reducer<CourseItemDetailsState> = (state: CourseItemDetailsState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_COURSE_ITEM_DETAILS': 
            return {
                details: state.details,
                isLoading: true
            };
        case 'RECEIVE_COURSE_ITEM_DETAILS':
            if(action.details.name === state.details.name) {
                return {
                    details: action.details,
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