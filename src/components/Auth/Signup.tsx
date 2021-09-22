import React, { Component } from 'react';
import TextField from '@mui/material/TextField';

interface SignupProps {
    token?: string,
    updateToken(token: string): void
}

interface SignupState {
    email: string,
    password: string
    errors: {
        email: string,
        password: string
    }
    updateToken: string
}

class Signup extends Component <SignupProps, SignupState> {
    constructor(props: SignupProps) {
        super(props)
        this.state = {
            email: '',
            password: '',
            errors: {
                email: '',
                password: '',
            },
            updateToken: ''
        }
    }

    handleSubmit = async (e : any) => {
        e.preventDefault();
        const apiURL = `http://localhost:3000/user/login`
        const reqBody = {
            email: this.state.email,
            password: this.state.password
        }
        try {
        const res = await fetch(apiURL, {
        // fetch(`${APIURL}/user/create`, {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            this.setState({updateToken: (data.token)})
            console.log(data.token)
            console.log(data)
        })
    } catch (e) {
        console.log(e)
    }
}

    render() {
    return (
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
}

export default Signup;