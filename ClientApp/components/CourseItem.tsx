import * as React from 'react';
import { Link, RouteComponentProps, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import * as CourseItemDetailsStore from '../store/CourseItemDetails';
import { VideoCourseItem, TextCourseItem, TestCourseItem } from '../store/CourseItemDetails';
import * as TestVerifierStore from '../store/TestVerifier';
import history from '../historyObj';

type CourseItemDetailsProps =
    CourseItemDetailsStore.CourseItemDetailsState
    & typeof CourseItemDetailsStore.actionCreators
    & RouteComponentProps<{ courseId: string; courseItemName: string }>

class CourseItem extends React.Component<CourseItemDetailsProps, {answers: any, testResults: any}> {

    constructor(props: any) {
        super(props)

        this.state = {
            answers: {},
            testResults: {}
        }
    }

    verifyAnswers = () => {
        let courseId = parseInt(this.props.match.params.courseId) || 0;
        let courseItemName = this.props.match.params.courseItemName || "";
        
        let body = JSON.stringify({
            quizId: courseId,
            courseItemName: courseItemName,
            answers: this.state.answers
        });

        let headers = new Headers()
        headers.append("Content-Type", "application/json")
        let resp
        let quizResults =  fetch("api/courses/quiz-verify", {
            method: "POST",
            headers: headers, 
            body: body,
        })
        .then(response => {
            resp = response.json()
            this.setState({
                ...this.setState,
                testResults: resp
            });

            return resp;    
        });

        return quizResults;
    }

    getTestResults = () => {
        return this.state.testResults
    }

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

    updateAnswearState = (idx: number, answer: string) => {
        const answers: any = {...this.state.answers}
        answers[idx] = answer;
        this.setState({
            ...this.state,  
            answers: answers
        })
    }

    goBack() {
        history.goBack();
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
                courseItemComponent = <TestItemContent details={this.props.details as TestCourseItem} updateAnswears={this.updateAnswearState} verifyAnswers={this.verifyAnswers} getTestResults={this.getTestResults}/>;
                break;
            }
        }

        let render
        if (!(courseItemComponent instanceof TestItemContent)) {
            render = (
                <div className="component"> 
                    <div className="header-info">
                        <button onClick={this.goBack} className="buttonStart font-12"> Go back </button>
                    </div>
                    {courseItemComponent}
    
                    <div className="description">
                        {this.props.details.description}
                    </div>
                </div>
            );    
        } else {
            render = {courseItemComponent}            
        }

        return (
            <div>
                {render}
            </div>
        ) 
    }

    getLoadingView() {
        return <div>Loading...</div>;   
    }
}
const style = {
    position: 'fixed',
    top: '0px',left: '0px', bottom: '0px',
    right: '0px',
    width: '100%',
    height: '100%',
    border:'none',
    margin:'0',
    padding:0,
    overflow:'hidden',
    'z-index':'999999'
};

class VideoItemContent extends React.Component<{details: VideoCourseItem}, {}> {
    render() {
        return (
            <div>
                <h1> {this.props.details.name} </h1>
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

class TestItemContent extends React.Component<{details: TestCourseItem, updateAnswears: any, verifyAnswers: any, getTestResults: any}, {currentQuestionIdx: number, result: any }> {
    
    componentWillMount(){
        this.createQuestionComponents()
        this.setState({currentQuestionIdx: 0, result: {}})
    }

    onSubmit = () => {
        let radios = Array.from(document.getElementsByName('answears'));
        let radiosMapped: HTMLInputElement[] = radios.map(e => {
            return e as HTMLInputElement
        })
        let checkedRadioInput = radiosMapped.find((e) => {
            return e.checked
        })
        if (checkedRadioInput == undefined) {
            throw new Error("checkedRadioInput == undefined")
        }
        this.props.updateAnswears(this.state.currentQuestionIdx, checkedRadioInput.value)
        let newIdx : number = this.state.currentQuestionIdx + 1
        this.setState({currentQuestionIdx: newIdx})        
    }

    questionComponents : Array<any> = [];
    
    createQuestionComponents = () => {
        this.questionComponents = this.props.details.quizEntries.map((quizEntry, idx) => {
            let possibleAnswers = quizEntry.question.possibleAnswers.map((a, idx) => {
                return (
                    <div>
                        <input type="radio" name="answears" value={a} id={idx.toString()}/><label> {a} </label><br/>
                    </div>
                )
            })
            return (
                <div>
                    <p>{quizEntry.question.questionText}</p>
                    <ul>{possibleAnswers}</ul>
                </div>
            )
        })
    }

    render() {
        let currentQuestionComponent
        if (this.state.currentQuestionIdx < this.questionComponents.length) {
            currentQuestionComponent = this.renderCurrentQuestionComponent()
        } else {
            currentQuestionComponent = this.endTestView()
        }
        
        return (
            <div>
                {currentQuestionComponent}
            </div>
        )
    }

    endTestView = () => {
        let view
        if (this.state.result.invalidOnes != undefined){
            view = this.testResultView()
        } else {
            view  = (
                <div>
                    <h1>Test finished! Click verify to check Your answers</h1>
                    <button onClick={this.verifyAnswers}>Verify answers</button>
                </div>
            )
        }
        return (
            <div>
                {view}
            </div>
        )
    }

    verifyAnswers = () => {
        const promise = this.props.verifyAnswers();
        promise.then((x:any) => {
            this.setState({...this.state, result: x})
        });
    }


    renderCurrentQuestionComponent = () => {
        return <div>
            <h1>{this.props.details.name}</h1>
            {this.questionComponents[this.state.currentQuestionIdx]}
            <button onClick={this.onSubmit}>Submit answer</button>
        </div>        
    }

    testResultView = () => {
        const invalidAnswears = [];
        for (const key in this.state.result.invalidOnes) {
            if (this.state.result.invalidOnes.hasOwnProperty(key)) {
                const element = this.state.result.invalidOnes[key];
                invalidAnswears.push(<div>
                    <h4>Answer to question nr {key} was: {element}</h4>
                </div>);
            }
        }
        
        return (
            <div>
                <h2>Correct answers:</h2> {this.state.result.correctOnes}
                <br/>
                <h2>Faulty ones:</h2>
                {invalidAnswears}
            </div>
        )
    }
}

import { bindActionCreators } from 'redux';

export default connect(
    (state: ApplicationState) => state.courseItemDetails,
    CourseItemDetailsStore.actionCreators
)(CourseItem) as typeof CourseItem;
