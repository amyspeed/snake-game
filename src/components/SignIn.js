import React from 'react';
import ExistingUser from './ExistingUser';
import NewUser from './NewUser';

const SignIn = (props) => {

    return (
        <div>
        <h1>Sign In</h1>
        <p>Sign in or register to keep score.</p>
        <div className="row">
            <div className="col-6">
                <ExistingUser />
            </div>
            <div className="col-6">
                <NewUser />
            </div>
        </div>
    </div>
    )
}

export default SignIn;