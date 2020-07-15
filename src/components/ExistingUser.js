import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { login } from './../actions/auth';

const ExistingUser = (props) => {

    const [loading, handleLoading] = useState(false);
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        handleLoading(true);
        console.log(data);
        props.dispatch(login(data));
    }

    return (
        <div className="box">
            <form onSubmit={handleSubmit(onSubmit)}>
                <legend>Returning Player</legend>
                <label htmlFor="username">Username</label><br/>
                <input type="text" name="username" id="username" ref={register} /><br/>
                <label htmlFor="password">Password</label><br/>
                <input type="text" name="password" id="password" ref={register} /><br/>
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