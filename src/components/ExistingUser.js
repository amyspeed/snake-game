import React, { useState } from 'react';
import { connect } from 'react-redux';
import { login } from './../actions/auth';

const ExistingUser = (props) => {

    const [loading, handleLoading] = useState(false)

    const handleSignIn = (e) => {
        handleLoading(true);
        e.preventDefault();
        console.log('loading');

        const username='TestTest3';
        const password='Password123';


        props.dispatch(login(username, password));
    }

    return (
        <div className="box">
            <form onSubmit={(e) => handleSignIn(e)}>
                <legend>Returning Player</legend>
                <label htmlFor="username">Username</label><br/>
                <input type="text" name="username" id="username" /><br/>
                <label htmlFor="password">Password</label><br/>
                <input type="text" name="password" id="password" /><br/>
                <input type="submit" className="button" value={ loading && !props.error ? 'loading...' : 'Sign In' } />
            </form>
            <p><span>{ props.error ? props.error : null }</span></p>
    </div>
    )

}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    error: state.auth.error
});

export default connect(mapStateToProps)(ExistingUser);