import React from 'react';

const ExistingUser = (props) => {

    const handleSignIn = (e) => {
        e.preventDefault()
        console.log('submit')
        // props.handleShowSignIn(false);
    }

    return (
        <div className="col-6">
        <form onSubmit={(e) => handleSignIn(e)}>
            <legend>Returning Player</legend>
            <label htmlFor="username">Username</label><br/>
            <input type="text" name="username" id="username" /><br/>
            <label htmlFor="password">Password</label><br/>
            <input type="text" name="password" id="password" /><br/>
            <input type="submit" className="button" />
        </form>
    </div>
    )

}

export default ExistingUser;