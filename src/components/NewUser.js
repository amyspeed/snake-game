import React from 'react';
import { connect } from 'react-redux';
import { registerUser } from './../actions/users';
import { login } from './../actions/auth';

const NewUser = (props) => {

    const handleRegister = (e) => {
        e.preventDefault()
        console.log('submit');
        // props.handleShowSignIn(false);

        const user={};
        user.firstName='Test';
        user.lastName='Testlast';
        user.username='TestTest5';
        user.password='Password123';
        user.score='50';

        return props
            .dispatch(registerUser(user))
            .then(() => props.dispatch(login(user.username, user.password)));
    }
    
    return (
        <div className="box">
            <form onSubmit={(e) => handleRegister(e)}>
                <legend>New Player</legend>
                <label htmlFor="firstName">First Name</label><br/>
                <input type="text" name="firstName" id="firstName" /><br/>
                <label htmlFor="lastName">Last Name</label><br/>
                <input type="text" name="lastName" id="lastName" /><br/>
                <label htmlFor="username">Username</label><br/>
                <input type="text" name="username" id="username" /><br/>
                <label htmlFor="password">Password</label><br/>
                <input type="text" name="password" id="password" /><br/>
                <label htmlFor="password2">Confirm Password</label><br/>
                <input type="text" name="password2" id="password2" /><br/>
                <input type="submit" className="button" />
            </form>
        </div>
    )

}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    error: state.auth.error
});

export default connect(mapStateToProps)(NewUser);