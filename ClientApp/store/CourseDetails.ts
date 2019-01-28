import { fetch, addTask } from 'domain-task';
import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';

export interface CourseDetailsDto {
    id: number;
    name: string;
    length: string;
    description: string;
    contents: ContentDto[];
}

export interface ContentDto {
    id: number;
    name: string;
}

export interface CourseDetailsState {
    details: CourseDetailsDto;
    id: number;
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
        console.info(id)
        console.info(getState().courseDetails)    

        if(id !== getState().courseDetails.id) {
            console.info("Test")
            let fetchTask = fetch(`api/courses/${id}`)
                .then(response => response.json() as Promise<CourseDetailsDto>)
                .then(data => {
                    console.info("recieved")                    
                    dispatch({ type: 'RECEIVE_COURSE_DETAILS', details: data, id: data.id });
                });

            console.info("About to request")                                    
            addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
            dispatch({ type: 'REQUEST_COURSE_DETAILS', id: id });
        }
    }
}

const unloadedState: CourseDetailsState = { 
    details: {
        id: 99999,
        length: '',
        description: '',
        name: '',
        contents: []
    },
    id: 999999,
    isLoading: false
};

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