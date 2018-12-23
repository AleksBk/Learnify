import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { ApplicationState } from '../store';

export default class CoursesList extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        return (
            <ul>
                <li> Course1 </li>
            </ul>
        );
    }
}