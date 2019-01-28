import * as React from 'react';
import { Link, RouteComponentProps, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState }  from '../store';
import * as CourseItemDetailsStore from '../store/CourseItemDetails';
import { VideoCourseItem, TextCourseItem, TestCourseItem } from '../store/CourseItemDetails';
import * as TestVerifierStore from '../store/TestVerifier';



type CourseItemDetailsProps =
    CourseItemDetailsStore.CourseItemDetailsState
    & typeof CourseItemDetailsStore.actionCreators
    & RouteComponentProps<{ courseId: string; courseItemName: string }>
    & TestVerifierStore.QuizVerifierState 
    & typeof TestVerifierStore.actionCreators

class CourseItem extends React.Component<CourseItemDetailsProps, {answers: any}> {

    constructor(props: any) {
        super(props)

        this.state = {
            answers: {}
        }
    }

    verifyAnswers = () => {
        let courseId = parseInt(this.props.match.params.courseId) || 0;
        let courseItemName = this.props.match.params.courseItemName || "";
        // debugger;
        // let fetchTask = postMessage(`api/quiz-verify`)
        //     .then(response => response.json() as Promise<TestAnswersRS>)
        //     .then(data => {
           
        // });
        // this.props.verifyQuiz(courseId, courseItemName, this.state.answers);
        console.log(this.props.testResults)
       
    }

    getTestResults = () => {
        return this.props.testResults
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

    updateAnswearState = (idx: number, answear: number) => {
        this.setState({
            ...this.state,  
            answers: {...this.state.answers, idx: answear}
        })
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
            // let test: <HTMLInputElement> = e
            return e.checked
        })
        if (checkedRadioInput == undefined) {
            throw new Error("checkedRadioInput == undefined")
        }
        this.props.updateAnswears(checkedRadioInput.id)
        // this.setState({answears: { }})
        let newIdx : number = this.state.currentQuestionIdx + 1
        this.setState({currentQuestionIdx: newIdx})        
        console.log(checkedRadioInput)
    }

    questionComponents : Array<any> = [];
    
    createQuestionComponents = () => {
        console.log(this.props.details.quizEntries)
        this.questionComponents = this.props.details.quizEntries.map((quizEntry, idx) => {
            console.log(idx)            
            let possibleAnswers = quizEntry.question.possibleAnswers.map((a, idx) => {
                return (
                    <div>
                        <input type="radio" name="answears" value="a" id={idx.toString()}/><label> {a} </label><br/>
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
        console.log("Render, current ids: " + this.state.currentQuestionIdx)
        console.log(this.questionComponents)
        let currentQuestionComponent

        if (this.state.currentQuestionIdx < this.questionComponents.length) {
            currentQuestionComponent = this.renderCurrentQuestionComponent()
        } else {
            currentQuestionComponent = this.endTestView()
        }
        // currentQuestionComponent
        console.info(this.state.result)
        
        return (
            <div>
                {currentQuestionComponent}
            </div>
        )
    }

    renderCurrentQuestionComponent = () => {
        return (
            <div>
                <h1>{this.props.details.name}</h1>
                {this.questionComponents[this.state.currentQuestionIdx]}
                <button onClick={this.onSubmit}>Submit answer</button>
            </div>
        )
    }

    endTestView = () => {
        return (
            <div>
                <h1>Test finished! Click verify to check Your answers</h1>
                 <button onClick={this.verifyAnswers}>Verify answers</button>
                 {/* && this.testResultView() */}
            </div>
        )
    }

    verifyAnswers = () => {
        this.props.verifyAnswers()
        let testResult = this.props.getTestResults()
        
        console.info(testResult)

        let mock = {
            correctOnes: [1,2,3],
            invalidOnes: [
                {
                    4: {correctAnswear: "Poprawna odpowiedz"}
                }
            ]
        }
       
        this.setState({...this.state, result: mock})//testResult
    }

    testResultView = () => {
        let invalidAnswears = this.state.result.invalidOnes.map((e: any, idx: any) => {
            return (
                <div>
                    <h4>Answer to question nr {e.idx} was: {e.answear}</h4>
                </div>
            )
        })
        
        return (
            <div>
                <h2>Correct answears:</h2> {this.state.result.correntOnes}
                <br/>
                <h2>Faulty ones:</h2>
                {invalidAnswears}
            </div>
        )
    }
}

import { bindActionCreators } from 'redux';

// function mapDispatchToProps(dispatch: any) {
//     return {
//       actions: {
//         courseItemDetailsActions: bindActionCreators(CourseItemDetailsStore.actionCreators, dispatch),
//         testVerifyActions: bindActionCreators(TestVerifierStore.actionCreators, dispatch)
//       }
//     };
//   }

export default connect(
    (state: ApplicationState) => state.courseItemDetails, // Selects which state properties are merged into the component's props
    CourseItemDetailsStore.actionCreators//mapDispatchToProps                    // Selects which action creators are merged into the component's props
)(CourseItem) as typeof CourseItem;
