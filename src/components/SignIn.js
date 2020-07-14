import React from 'react';
import ExistingUser from './ExistingUser';
import NewUser from './NewUser';

const SignIn = (props) => {

    return (
        <div>
        <h1>Sign In</h1>
        <p className="instructions">Sign in or register to keep score.</p>
        <div className="row">
            <ExistingUser />
            <NewUser />
        </div>
    </div>
    )
}

export default SignIn;