import * as React from 'react';
import NavMenu from './NavMenu';
import { ApplicationState } from '../store';
import { connect } from 'react-redux';
import * as AccountState from '../store/Account';
import { RouteComponentProps, withRouter } from 'react-router';

type LayoutProps =
    AccountState.AccountState        // ... state we've requested from the Redux store
    & typeof AccountState.actionCreators
    & RouteComponentProps<{}>;

export class Layout extends React.Component<LayoutProps, {}> {
    public render() {
        return <div className='container-fluid'>
            <div className='row'>
                <div className='col-sm-3'>
                    <NavMenu token={this.props.token}
                        currentLogin={this.props.currentLogin}
                        isLoading={this.props.isLoading} 
                        logout={this.props.logout}
                        requestLogin={this.props.requestLogin}/>
                </div>
                <div className='col-sm-9'>
                    { this.props.children }
                </div>
            </div>
        </div>;
    }
}

export default withRouter(connect(
    (state: ApplicationState) => state.account,
    AccountState.actionCreators
)(Layout) as any);