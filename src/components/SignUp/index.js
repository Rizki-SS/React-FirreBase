import React from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";

import * as ROUTES from '../../constants/routes';
import { withFirebase } from "../Firebase";

import * as ROLES from '../../constants/roles';

const SingUpPage = () => (
    <div>
        <h1>SingUp</h1>
        <SingUpForm/>
    </div>
)

const INITIAL_STATE ={
    username: "",
    email: "",
    passwordOne: "",
    passwordTwo: "",
    isAdmin:false,
    error: null,
}

class SingUpFormBase extends React.Component {
    constructor(props) {
        super(props);
        this.state ={...INITIAL_STATE};
    }

    onChangeCheckbox = event => {
        this.setState({[event.target.name]:event.target.checked});
    }

    onSubmit = (event) => {
        const {username, email, passwordOne, isAdmin} = this.state;

        const roles ={};

        if (isAdmin) {
            roles[ROLES.ADMIN] = ROLES.ADMIN;
        }else{
            roles[ROLES.USER] = ROLES.USER;
        }

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser=>{
                //create user in firebase realtime
                return this.props.firebase
                .user(authUser.user.uid)
                .set({
                    username,
                    email,
                    roles
                });
            })
            .then(() => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error=>{
                this.setState({error});
            });
        event.preventDefault();
    }

    onChange = (event) => {
        this.setState({[event.target.name]:event.target.value});
    }

    render() {
        const {
            username, email, passwordOne, passwordTwo, error, isAdmin
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return (
            <form onSubmit={this.onSubmit}>
                <label>
                    Admin:
                    <input
                        name="isAdmin"
                        type="checkbox"
                        checked={isAdmin}
                        onChange={this.onChangeCheckbox}
                    />
                </label>

                <input 
                    type="text"
                    name="username"
                    onChange={this.onChange}
                    placeholder="Full Name"
                    value={username}
                />
                <input
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                />
                <input
                    name="passwordOne"
                    value={passwordOne}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password"
                />
                <input
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Confirm Password"
                />
                <button disabled={isInvalid} type="submit">Sing Up</button>
                {isInvalid}

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}


const SingUpLink = () =>(
    <p>
        Don't have an account? <Link to ={ROUTES.SIGN_UP}>Sign Up </Link>
    </p>
)

const SingUpForm = compose(
    withRouter,
    withFirebase
)(SingUpFormBase);

export default SingUpPage;
export {SingUpForm,SingUpLink};