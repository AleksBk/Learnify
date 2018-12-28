import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';


interface ReceiveWeatherForecastsAction {
    type: 'RECEIVE_WEATHER_FORECASTS';
    forecasts: string[];
}

type KnownAction = ReceiveWeatherForecastsAction;


export const actionCreators = {
    requestWeatherForecasts: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        let fetchTask = fetch(`api/CoursesList/Courses`)
                .then(response => response.json() as Promise<string[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_WEATHER_FORECASTS', forecasts: data });
                });

        addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
    }
};
