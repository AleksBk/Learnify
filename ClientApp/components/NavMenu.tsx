import * as React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { ApplicationState } from '../store';
import { connect } from 'react-redux';
import * as AccountState from '../store/Account';
import { RouteComponentProps } from 'react-router';

type NavMenuProps = 
    AccountState.AccountState
    & typeof AccountState.actionCreators;

export default class NavMenu extends React.Component<NavMenuProps, {}> {
    getLoginElement() {
        if(this.props.currentLogin) {
            return <div>
                <div>
                    <Link className='navbar-login float-left' to={ '/' }>
                        Hello {this.props.currentLogin}!
                    </Link>
                </div>
                <div>
                    <div className='navbar-login float-right' onClick={this.props.logout}>
                        <i className="glyphicon glyphicon-off"></i>Log Out</div>
                </div>
            </div>;
        }
        return <div>
            <Link className='navbar-login float-right' to={ '/login' }>
                <i className="glyphicon glyphicon-off"></i>Log In</Link>
        </div>;
    }

    public render() {
        return <div className='main-nav'>
                <div className='navbar navbar-inverse'>
                <div className='navbar-header'>
                    <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='.navbar-collapse'>
                        <span className='sr-only'>Toggle navigation</span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                        <span className='icon-bar'></span>
                    </button>
                    <Link className='navbar-brand' to={ '/' }>Learnify</Link>
                    {this.getLoginElement()}
                </div>
                <div className='clearfix'></div>
                <div className='navbar-collapse collapse'>
                    <ul className='nav navbar-nav'>
                        <li>
                            <NavLink exact to={ '/' } activeClassName='active'>
                                <span className='glyphicon glyphicon-home'></span> Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ '/courseslist' } activeClassName='active'>
                                <span className='glyphicon glyphicon-education'></span> Courses
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={ '/courses/1' } activeClassName='active'>
                                <span className='glyphicon glyphicon-education'></span> Details
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>;
    }
}
