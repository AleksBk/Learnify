import * as React from 'react';
import { NavLink, Link } from 'react-router-dom';

export class NavMenu extends React.Component<{}, {}> {
    getLoginElement() {
        return <div>
            <Link className='navbar-login' to={ '/login' }>
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
                            <NavLink to={ '/fetchdata' } activeClassName='active'>
                                <span className='glyphicon glyphicon-th-list'></span> Fetch data
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
