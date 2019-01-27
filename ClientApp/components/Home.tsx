import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

export default class Home extends React.Component<RouteComponentProps<{}>, {}> {
    handleClick() {
        window.location.href = '/courseslist'
    }
    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    public render() {
        return <div className="home-component">

            <div className="logo">
                <img src="./pictures/logo.png"></img>
                </div>

            <div className="film">
                <iframe width="460" height="315" src="https://www.youtube.com/embed/uWLzPzf9plw"></iframe>
                </div>

            <div className="description">
                <h2> <b>What is "Learnify" ?</b></h2>
                <h4> The world's largest selection of courses. <br/>
                    Choose from over 100,000 online video courses<br />
                    with new additions published every month</h4>
            </div>
            <div className="button">
                <button onClick = {this.handleClick} className="buttonStart"> GET STARTED ! </button>
            </div>
        </div>;
    }
}
