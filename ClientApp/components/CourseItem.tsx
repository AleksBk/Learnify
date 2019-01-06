import * as React from 'react';
import { Link, RouteComponentProps, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import * as CourseItemDetailsStore from '../store/CourseItemDetails';

type CourseItemDetailsProps =
    CourseItemDetailsStore.CourseItemDetailsState
    & typeof CourseItemDetailsStore.actionCreators
    & RouteComponentProps<{ courseId: string; courseItemName: string }>;

class CourseItem extends React.Component<CourseItemDetailsProps, {}> {

    componentWillMount() {
        let courseId = parseInt(this.props.match.params.courseId) || 0;
        let courseItemName = this.props.match.params.courseItemName || "";
        this.props.requestCourseItemDetails(courseId, courseItemName);
    }

    componentWillReceiveProps(nextProps: CourseItemDetailsProps) {
        let courseId = parseInt(this.props.match.params.courseId) || 0;
        let courseItemName = this.props.match.params.courseItemName || "";
        this.props.requestCourseItemDetails(courseId, courseItemName);
    }

    render() {
        return this.props.isLoading ? this.getLoadingView() : this.getDataView();
    }

    getDataView() {
        return <div className="component"> 
            <h1>Course item content</h1>
            <div>Lecture name: {this.props.details.name} </div>
        </div>;
    }

    getLoadingView() {
        return <div>Loading...</div>;
    }
}

export default connect(
    (state: ApplicationState) => state.courseItemDetails, // Selects which state properties are merged into the component's props
    CourseItemDetailsStore.actionCreators                 // Selects which action creators are merged into the component's props
)(CourseItem) as typeof CourseItem;
