import * as React from 'react';
import { RouteComponentProps, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';
import * as CoursesListStore from '../store/CoursesList';
import { CoursesListRow } from '../containers/CoursesListRow';

type CoursesListProps =
    CoursesListStore.CoursesListState
    & typeof CoursesListStore.actionCreators
    & RouteComponentProps<{}>;

class CoursesList extends React.Component<CoursesListProps, {}> {
    componentWillMount() {
        this.props.requestCoursesList();
    }

    public render() {
        return this.props.isLoading ? this.getLoadingView() : this.getDataView();
    }

    getDataView() {
        return <div className="course-list-component">
            <div className="header"><h1>Courses</h1></div>
            <div className="table">
                <CoursesListRow name="Math" elements={this.getContentList("Math")}>
                </CoursesListRow>
                <CoursesListRow name="Phisics" elements={this.getContentList("Phisics")}>
                </CoursesListRow>
                <CoursesListRow name="English" elements={this.getContentList("English")}>
                </CoursesListRow>
            </div>
        </div>;
    }

    getContentList(type: string) {
        const courses = this.props.courses.filter(x => x.type === type);
        return courses;
    }

    getLoadingView() {
        return <div>Loading...</div>;
    }
}

export default connect(
    (state: ApplicationState) => state.coursesList, // Selects which state properties are merged into the component's props
    CoursesListStore.actionCreators                 // Selects which action creators are merged into the component's props
)(CoursesList) as typeof CoursesList;