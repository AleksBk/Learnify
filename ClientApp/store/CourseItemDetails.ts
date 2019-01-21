import { fetch, addTask } from 'domain-task';
import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';

export interface BaseCourseItemDetails {
    name: string;    
    type: number; 
    description: string;
    length: string;        
}
export interface VideoCourseItem extends BaseCourseItemDetails {
    type: 0;
    url: string;
}
export interface TextCourseItem extends BaseCourseItemDetails {
    type: 1
    title: string
    text: string
}
export interface TestCourseItem extends BaseCourseItemDetails {
    type: 2
    quizEntries: QuizEntry[];
}

export interface QuizEntry {
    question: Question
}
export interface Question {
    questionText: string,
    possibleAnswers: string[]
}

export type CourseItemDetails = VideoCourseItem | TestCourseItem | TextCourseItem;

export interface CourseItemDetailsState {
    details: CourseItemDetails;
    currentName: string;
    isLoading: boolean;
}

interface RequestCourseItemDetailsAction {
    type: 'REQUEST_COURSE_ITEM_DETAILS';
    currentName: string;
}

interface ReceiveCourseItemDetailsAction {
    type: 'RECEIVE_COURSE_ITEM_DETAILS';
    details: CourseItemDetails;
}

type KnownAction = RequestCourseItemDetailsAction | ReceiveCourseItemDetailsAction;

export const actionCreators = {
    requestCourseItemDetails: (courseId: number, courseItemName: string): AppThunkAction<KnownAction> => (dispatch, getState) => {        
        if(courseItemName !== getState().courseItemDetails.details.name) {
            let fetchTask = fetch(`api/courses/${courseId}/item/${courseItemName}`)
                .then(response => response.json() as Promise<CourseItemDetails>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_COURSE_ITEM_DETAILS', details: data });
                });

            addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
            dispatch({ type: 'REQUEST_COURSE_ITEM_DETAILS', currentName: courseItemName});
        }
    }
}

const unloadedState: CourseItemDetailsState = { 
    details: {
        name: '',        
        type: 2,
        description: '',
        length: '',
        quizEntries: []
    },
    currentName: '',
    isLoading: false
};

export const reducer: Reducer<CourseItemDetailsState> = (state: CourseItemDetailsState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_COURSE_ITEM_DETAILS':
            return {
                details: state.details,
                currentName: action.currentName,
                isLoading: true
            };
        case 'RECEIVE_COURSE_ITEM_DETAILS':
            if(action.details.name === state.currentName) {
                return {
                    details: action.details,
                    currentName: state.currentName,
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