import * as React from 'react';
import { Link, RouteComponentProps, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import * as CourseItemDetailsStore from '../store/CourseItemDetails';
import { VideoCourseItem, TextCourseItem, TestCourseItem } from '../store/CourseItemDetails';

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
        // let courseId = parseInt(this.props.match.params.courseId) || 0;
        // let courseItemName = this.props.match.params.courseItemName || "";    
        
        let component = this.props.details.type === 0 ? <VideoItemContent details={this.props.details as VideoCourseItem}/> : "";
        let courseItemComponent
        switch(this.props.details.type) {
            case 0: {
                courseItemComponent = <VideoItemContent details={this.props.details as VideoCourseItem}/>;
                break
            }
            case 1: {
                courseItemComponent = <ArticleItemContent details={this.props.details as TextCourseItem}/>;
                break;
            }
            case 2: {
                courseItemComponent = <TestItemContent details={this.props.details as TestCourseItem}/>;
                break;
            }
        }
        
        return (
            <div className="component"> 
                <div className="header-info">
                    <p>Lenght: {this.props.details.length}</p>
                </div>
                {courseItemComponent}

                <div className="description">
                    {this.props.details.description}
                </div>
            </div>
        );
    }

    getLoadingView() {
        return <div>Loading...</div>;   
    }
}

class VideoItemContent extends React.Component<{details: VideoCourseItem}, {}> {
    // constructor(props) {
    //     super(props)
    // }

    render() {
        return (
            <div>
                <div className="video">
                    <iframe height="100%" width="100%" src={this.props.details.url}></iframe>
                </div>
            </div>
        )
    }   
}

class ArticleItemContent extends React.Component<{details: TextCourseItem}, {}> {
    render() {
        return (
            <article>
                <h1>{this.props.details.title}</h1>
                <p>{this.props.details.text}</p>
            </article>
        )
    }
}

class TestItemContent extends React.Component<{details: TestCourseItem}, {}> {
    render() {
        let questionComponents : Array<any> = [];
        this.props.details.quizEntries.map(quizEntry => {
            let possibleAnswers = quizEntry.question.possibleAnswers.map(a => <div><input type="radio" name="q1" value="a" id="q1a"/><label> {a} </label><br/></div>)
            let component = (
                <div>
                    <p>{quizEntry.question.questionText}</p>
                    <ul>{possibleAnswers}</ul>
                </div>
            )
    
            questionComponents.push(component)
        });
        
        return (
            <div>
                <h1>{this.props.details.name}</h1>
                {questionComponents}
                <button>Submit answer</button>
            </div>
        )
    }
}

export default connect(
    (state: ApplicationState) => state.courseItemDetails, // Selects which state properties are merged into the component's props
    CourseItemDetailsStore.actionCreators                 // Selects which action creators are merged into the component's props
)(CourseItem) as typeof CourseItem;
