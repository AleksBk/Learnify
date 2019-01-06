import * as React from 'react';
import { Link, RouteComponentProps, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import * as CourseDetailsStore from '../store/CourseDetails';

type CourseDetailsProps =
    CourseDetailsStore.CourseDetailsState
    & typeof CourseDetailsStore.actionCreators
    & RouteComponentProps<{ id: string }>;

class CourseDetails extends React.Component<CourseDetailsProps, {}> {

    componentWillMount() {
        let id = parseInt(this.props.match.params.id) || 0;
        this.props.requestCourseDetails(id);
    }

    componentWillReceiveProps(nextProps: CourseDetailsProps) {
        let id = parseInt(nextProps.match.params.id) || 0;
        this.props.requestCourseDetails(id);
    }

    render() {
        return this.props.isLoading ? this.getLoadingView() : this.getDataView();
    }

    getDataView() {
        return <div className="course-details-component"> 
            <div className="header"><h1>{this.props.details.name}</h1></div>
            <div className="header-info">
                <p>Lenght: {this.props.details.length}</p>
            </div>
            <div className="video">
                <iframe height="100%" width="100%" src="https://www.youtube.com/embed/pOmu0LtcI6Y"></iframe>
            </div>
            <div className="description">
                {this.props.details.description}
            </div>
            <div className="episodes">
                <h3>Contents:</h3>
                {this.getContentsList()}
            </div>
        </div>;
    }

    getContentsList() {
        const episodesLis = this.props.details.contents.map(x => {
            return <li className="contentItem" key={x.id}>
                <NavLink to={ '/course/' + x.id }>
                    <div className="contentLink">
                        <span className='glyphicon glyphicon-play-circle'></span>
                        {x.name}
                    </div>
                </NavLink>
            </li>;
        });
        return <ul className="contents">{episodesLis}</ul>;
    }

    getLoadingView() {
        return <div>Loading...</div>;
    }
}


export default connect(
    (state: ApplicationState) => state.courseDetails, // Selects which state properties are merged into the component's props
    CourseDetailsStore.actionCreators                 // Selects which action creators are merged into the component's props
)(CourseDetails) as typeof CourseDetails;