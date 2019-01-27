import * as React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "ClientApp/store";
import * as AccountState from '../store/Account';
import { RouteComponentProps } from "react-router";

type LoginProps =
    AccountState.AccountState        // ... state we've requested from the Redux store
    & typeof AccountState.actionCreators      // ... plus action creators we've requested
    & RouteComponentProps<{}>;

interface LoginState {
    login: string;
    password: string;
}

export class Login extends React.Component<LoginProps, LoginState> {

    constructor(props: LoginProps) {
        super(props);
        this.state = {
            login: '',
            password: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLoginChange = this.handleLoginChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleSubmit() {
        this.props.requestLogin(this.state.login, this.state.password);
    }

    handleLoginChange(event: any) {
        this.setState(Object.assign(this.state, {login: event.target.value}));
    }

    handlePasswordChange(event: any) {
        this.setState(Object.assign(this.state, {password: event.target.value}));
    }

    render() {
        return <div className="login-page">
            <form className="login-form">
                <div>
                        <h2 className="text-center">Login</h2>
                </div>
                <div>
                    <label>
                        E-mail: <br/>
                        <input type="email" value={this.state.login} onChange={this.handleLoginChange} />
                    </label>
                </div>
                <div>
                    <label>
                        Password: <br/>
                        <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
                    </label>
                </div>
                <div className="pull-right">
                    <input className="btn btn-primary" onClick={this.handleSubmit} readOnly value="Save" />
                </div>
            </form>
        </div>;
    }
}

export default connect(
    (state: ApplicationState) => state.account,
    AccountState.actionCreators
)(Login) as typeof Login;