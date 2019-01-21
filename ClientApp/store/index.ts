import * as WeatherForecasts from './WeatherForecasts';
import * as Counter from './Counter';
import * as CourseDetails from './CourseDetails';
import * as CoursesList from './CoursesList';
import * as CourseItemDetails from './CourseItemDetails';

// The top-level state object
export interface ApplicationState {
    counter: Counter.CounterState;
    weatherForecasts: WeatherForecasts.WeatherForecastsState;
    courseDetails: CourseDetails.CourseDetailsState;
    coursesList: CoursesList.CoursesListState;
    courseItemDetails: CourseItemDetails.CourseItemDetailsState    
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    counter: Counter.reducer,
    weatherForecasts: WeatherForecasts.reducer,
    courseDetails: CourseDetails.reducer,
    coursesList: CoursesList.reducer,
    courseItemDetails: CourseItemDetails.reducer
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
