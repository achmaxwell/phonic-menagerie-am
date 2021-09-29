import React, { Component } from 'react';
import './Styles.css';
import {FormLabel } from '@mui/material';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import TextField from '@mui/material/TextField';

interface SignupProps {
    updateToken(token: string): void
    updateAdmin(admin: string): void
}

interface SignupState {
    email: string,
    password: string
    errors: {
        email: string,
        password: string
    }
    isAdmin: boolean
    token: string
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
            token: '',
            isAdmin: false
        }  ; console.log(props)
    } 

    handleChange = async () => this.setState({ isAdmin: true })

    handleSubmit = async (event: any) => {
        event.preventDefault();
        const apiURL = `http://localhost:3000/user/create`
        console.log(apiURL)
        const reqBody = {
            user: {
            email: this.state.email,
            password: this.state.password,
            isAdmin: this.state.isAdmin
            } 
        } ; console.log(reqBody)
        try {
        const res = await fetch(apiURL, {
        // fetch(`${APIURL}/user/create`, {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
            const json = await res.json();
            const token = json.sessionToken
            const admin = "" + json.user.isAdmin
            this.props.updateToken(token);
            this.props.updateAdmin(admin)
    } catch (e) {
        console.log(e)
    }
}

    render() {
    return (
        <div>
            <Form onSubmit={this.handleSubmit}>
                <TextField
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.setState({email: e.target.value})}}
                    id="standard-password-input"
                    label="Email"
                    type="email"
                    autoComplete="current-email"
                    variant="standard"
                    required
                />
                <br/>
                <TextField
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.setState({password: e.target.value})}}
                    id="standard-password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-email"
                    variant="standard"
                    required
                />
                <br/><br/>
                <FormLabel component="legend">Are you an Administrator?</FormLabel>
                <FormGroup check>
                <Label check>
                    <Input type="checkbox" id="checkbox2" checked={this.state.isAdmin} onChange={this.handleChange}/>{' '}
                    yes
                </Label>
                </FormGroup>
                <div>
                    <Button className="logBtn">Register</Button>
                </div>
            </Form>
        </div>
    );
};
}

export default Signup;