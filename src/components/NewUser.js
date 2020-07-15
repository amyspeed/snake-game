import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { registerUser } from './../actions/users';
import { login } from './../actions/auth';

const NewUser = (props) => {

    const [loading, handleLoading] = useState(false);
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        handleLoading(true);
        console.log(data);

        return props
            .dispatch(registerUser(data))
            .then(() => props.dispatch(login(data)));
    }
    
    return (
        <div className="box">
            <form onSubmit={handleSubmit(onSubmit)}>
                <legend>New Player</legend>
                <label htmlFor="firstName">First Name</label><br/>
                <input type="text" name="firstName" id="firstName" ref={register} /><br/>
                <label htmlFor="lastName">Last Name</label><br/>
                <input type="text" name="lastName" id="lastName" ref={register} /><br/>
                <label htmlFor="username">Username</label><br/>
                <input type="text" name="username" id="username" ref={register} /><br/>
                <label htmlFor="password">Password</label><br/>
                <input type="text" name="password" id="password" ref={register} /><br/>
                <label htmlFor="password2">Confirm Password</label><br/>
                <input type="text" name="password2" id="password2" /><br/>
                <input type="submit" className="button" value={loading ? 'Loading...' : 'Register'} />
            </form>
        </div>
    )

}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    error: state.auth.error
});

export default connect(mapStateToProps)(NewUser);