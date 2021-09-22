import React, { Component } from "react";

import TextField from '@mui/material/TextField';

interface LoginProps {
    updateToken(token: string): void
}
interface LoginState {
    email : string,
    password : string,
    errors : {
        email : string,
        password : string
    }
}

class Login extends Component <LoginProps, LoginState> {

    constructor(props: LoginProps) {
        super(props)
        this.state = {
            email: '',
            password: '',
            errors: {
                email: '',
                password: ''
            }
        }
    }

    handleSubmit = async (event : any) => {
        event.preventDefault();
        const apiURL = `http://localhost:3000/user/login`
        const reqBody = {
            email: this.state.email,
            password: this.state.password
        }
        try {
        const res = await fetch(apiURL, {
        // fetch(`${APIURL}/user/login`, {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            this.props.updateToken(data.token)
        })
    } catch (e) {
        console.log(e)
    }
}
    render() {
    
        return(
        <div>

            <TextField
                id="standard-password-input"
                label="Email"
                type="username"
                autoComplete="current-email"
                variant="standard"
            />
            <TextField
                id="standard-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="standard"
            />
            
        </div>
        );
    };
};

export default Login;