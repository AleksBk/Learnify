import { fetch, addTask } from 'domain-task';
import { Action, Reducer } from 'redux';
import { AppThunkAction } from '.';


interface TestVerifierRequestAction {
    type: 'TestVerifierRequestAction';
}

interface TestVerifierResponseAction {
    type: 'TestVerifierResponseAction';
    details: TestAnswersRS;
}

export interface TestAnswersRS {
    correntOnes: number[],
    invalidOnes: any[]
}

type KnownAction = TestVerifierResponseAction | TestVerifierRequestAction;

export interface TestAnswers {
    answers: any
}

export const actionCreators = {
    verifyQuiz: (courseId: number, courseItemName: string, answers: TestAnswers): AppThunkAction<KnownAction> => (dispatch, getState) => {        
        debugger;
        console.info("dupa")
        // if(courseItemName !== getState().courseItemDetails.details.name) {
            let fetchTask = fetch(`api/quiz-verify`)
                .then(response => response.json() as Promise<TestAnswersRS>)
                .then(data => {
                    dispatch({ type: 'TestVerifierResponseAction', details: data });
                });

            addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
            dispatch({ type: 'TestVerifierRequestAction'});
        // }
    }
}

export interface QuizVerifierState {
    testResults: TestAnswersRS,
    isLoading: boolean
}

const unloadedState: QuizVerifierState = { 
    testResults: { correntOnes: [], invalidOnes: [] },
    isLoading: false
};

export const reducer: Reducer<QuizVerifierState> = (state: QuizVerifierState, incomingAction: Action) => {
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'TestVerifierRequestAction':
            return {
                testResults: state.testResults,
                isLoading: true
            };
        case 'TestVerifierResponseAction':
            // if(action.details.name === state.currentName) {
                return {
                    testResults: action.details,
                    isLoading: false
                };
            // }
            // break;
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
    }
    return state || unloadedState;
}