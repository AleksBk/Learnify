import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import * as CourseDetailsStore from '../store/CourseDetails';

type CourseDetailsProps =
    CourseDetailsStore.CourseDetailsState
    & typeof CourseDetailsStore.actionCreators
    & RouteComponentProps<{ id: number }>;

class CourseDetails extends React.Component<CourseDetailsProps, {}> {

    render() {
        return <div> HELLO !!!</div>
    }
}


export default connect(
    (state: ApplicationState) => state.courseDetails, // Selects which state properties are merged into the component's props
    CourseDetailsStore.actionCreators                 // Selects which action creators are merged into the component's props
)(CourseDetails) as typeof CourseDetails;