import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';

export interface CourseItem {
    name: string;
    id: number;
    type: string;
    pictureUrl: string;
}

interface ReceiveCoursesAction {
    type: 'RECEIVE_COURSES_LIST';
    courses: CourseItem[];
}

interface RequestCoursesAction {
    type: 'REQUEST_COURSES_LIST';
}

type KnownAction = ReceiveCoursesAction | RequestCoursesAction;

export interface CoursesListState {
    courses: CourseItem[];
    isLoading: boolean;
}

export const actionCreators = {
    requestCoursesList: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let fetchTask = fetch(`api/Courses/GetAll`)
            .then(response => response.json() as Promise<CourseItem[]>)
            .then(data => {
                dispatch({ type: 'RECEIVE_COURSES_LIST', courses: data });
            });

        addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
        dispatch({ type: 'REQUEST_COURSES_LIST' });
    }
};


const unloadedState: CoursesListState = { courses: [], isLoading: false };

export const reducer: Reducer<CoursesListState> = (state: CoursesListState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_COURSES_LIST':
            return {
                courses: state.courses,
                isLoading: true
            };
        case 'RECEIVE_COURSES_LIST':
            return {
                courses: action.courses,
                isLoading: false
            };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }
    return state || unloadedState;
}
