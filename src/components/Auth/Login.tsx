import React, { Component } from "react";
import './Styles.css';
import logo from "./assets/pm-logo.png"

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Button } from '@mui/material';
import { Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

import NavAuth from '../Common/NavAuth'

interface LoginProps {
    updateToken(token: string): void
    clickLogout: () => void
    updateToken(token: string): void
}
interface LoginState {
    email : string,
    password : string,
    isAdmin : boolean,
    errors : {
        email : string,
        password : string
    }
    handleOpen: true,
    handleClose: false,
}

class Login extends Component <LoginProps, LoginState> {

    constructor(props: LoginProps) {
        super(props)
        this.state = {
            email: '',
            password: '',
            isAdmin: false,
            errors: {
                email: '',
                password: ''
            },
            handleOpen: true,
            handleClose: false

        }
    }

    // handleChange = async (e: any) => this.setState({ isAdmin: e.target.checked })

    handleSubmit = async (event : any) => {
        event.preventDefault();
        const apiURL = `http://localhost:3000/user/login`
        const reqBody = {
            user: {
            email: this.state.email,
            password: this.state.password,
            }
        }
        try {
        const res = await fetch(apiURL, {
        // fetch(`${APIURL}/user/login`, {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        // .then(
        //     (response) => res.json()
        // ).then((data) => {
        //     this.props.updateToken(data.token)
        // })

        const json = await res.json();
            const token = json.sessionToken
            this.props.updateToken(token);

    } catch (e) {
        console.log(e)
    }
}
    render() {
    
        return(
        <div className="bgDiv">
            <NavAuth updateToken={this.props.updateToken} clickLogout={this.props.clickLogout} />
            <Box
            sx={{
                margin: "auto",
                marginTop: "3em",
                padding: "2em",
                width: 500,
                height: "auto",
                bgcolor: 'whitesmoke',
            }}>
                <b>Welcome to</b>
                <img src={logo} alt="Phonic Menagerie" className="logoImgLogin"/>
                <p>Your personal album collection in the palm of your hand! Keep track of your record collection and add albums to your wishlist. Ensures you don't buy the same record twice!</p>
            <FormControl onSubmit={this.handleSubmit}>
            <TextField
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.setState({email: (e.target.value)})}}
                id="standard-password-input"
                label="Email"
                type="username"
                autoComplete="current-email"
                variant="standard"
                required
            />
            <br/>
            <TextField
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.setState({password: (e.target.value)})}}
                id="standard-password-input"
                label="Password"
                type="password"
                autoComplete="current-password"
                variant="standard"
                required
            />
            <br/>
            {/* <FormLabel component="legend">Are you an Administrator?</FormLabel>
            <FormGroup check>
            <Label check>
                <Input type="checkbox" id="checkbox2" checked={this.state.isAdmin} onChange={this.handleChange}/>{' '}
                Are you an admin?
            </Label>
            </FormGroup> */}
            <div>
            {/* <Button 
            type="submit"
            sx={{
                color: 'white',
                background: '#a1936d',
            }}>Register</Button> */}
            <Button type="submit" className="logBtn">Login</Button>
            </div>
            </FormControl>
            </Box>
            
        </div>
        );
    };
};

export default Login;