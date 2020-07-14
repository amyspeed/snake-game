import React from 'react';

const SignIn = () => {

    const handleSubmit = () => {
        console.log('submit')
    }
    
    return (
        <div>
        <h1>Sign In</h1>
        <p className="instructions">Sign in or register to keep score.</p>
        <div className="row">
            <div className="col-6">
                <form>
                    <legend>Returning Player</legend>
                    <label htmlFor="username">Username</label><br/>
                    <input type="text" name="username" id="username" /><br/>
                    <label htmlFor="password">Password</label><br/>
                    <input type="text" name="password" id="password" /><br/>
                    <input type="submit" className="button" onSubmit={() => handleSubmit()} />
                </form>
            </div>
            <div className="col-6">
                <form>
                    <legend>New Player</legend>
                    <label htmlFor="username">Username</label><br/>
                    <input type="text" name="username" id="username" /><br/>
                    <label htmlFor="password">Password</label><br/>
                    <input type="text" name="password" id="password" /><br/>
                    <input type="submit" className="button" onSubmit={() => handleSubmit()} />
                </form>
            </div>
        </div>
    </div>
    )
}

export default SignIn;