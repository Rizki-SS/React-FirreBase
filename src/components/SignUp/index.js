import React from "react";
import { Link, withRouter } from "react-router-dom";
import { compose } from "recompose";

import * as ROUTES from '../../constants/routes';
import { withFirebase } from "../Firebase";

const SingUpPage = () => (
    <div>
        <h1>SingUp</h1>
        <SingUpForm/>
    </div>
)

const INITIAL_STATE ={
    usename: "",
    email: "",
    passwordOne: "",
    passwordTwo: "",
    error: null,
}

class SingUpFormBase extends React.Component {
    constructor(props) {
        super(props);
        this.state ={...INITIAL_STATE};
    }

    onSubmit = (event) => {
        const {usename, email, passwordOne} = this.state;

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser=>{
                this.setState({...INITIAL_STATE});
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
            usename, email, passwordOne, passwordTwo, error
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            usename === '';

        return (
            <form onSubmit={this.onSubmit}>
                <input 
                    type="text"
                    name="usename"
                    onChange={this.onChange}
                    placeholder="Full Name"
                    value={usename}
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