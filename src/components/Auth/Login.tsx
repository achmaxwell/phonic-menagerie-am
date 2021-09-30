import React, { Component } from "react";
import './Styles.css';
import logo from "./assets/pm-logo.png"
import Signup from './Signup';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { Form, Modal, ModalBody, ModalHeader, Button } from 'reactstrap';

import NavAuth from '../Common/NavAuth'

interface LoginProps {
    updateToken(token: string): void
    clickLogout: () => void
    updateAdmin(admin: string): void
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
    token: string,
    modal: boolean
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
            handleClose: false,
            token: '',
            modal: false

        }
    }

    toggle = () => this.setState({modal: !this.state.modal});

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

        const json = await res.json();
            const token = json.sessionToken
            const admin = "" + json.user.isAdmin
            this.props.updateToken(token);
            this.props.updateAdmin(admin);

    } catch (e) {
        console.log(e)
    }
}
    render() {
    
        return(
        <div className="bgDiv">
            <NavAuth updateToken={this.props.updateToken} clickLogout={this.props.clickLogout} />
            <Box
            className="loginDiv"
            sx={{
                margin: "auto",
                marginTop: "3em",
                padding: "2em",
                width: 500,
                height: "auto",
                // bgcolor: 'whitesmoke',
            }}>
                <h6 className="authDisplayFont">Welcome to</h6>
                <img src={logo} alt="Phonic Menagerie" className="logoImgLogin"/>
                <p className="authBodyFont">Your personal album collection in the palm of your hand! Keep track of your record collection and add albums to your wishlist. Ensures you don't buy the same record twice!</p>
            <Form className="formDiv" onSubmit={this.handleSubmit}>
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
            <div>
            <Button className="logBtn" onClick={this.toggle}>Register</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader className="modalHeader signUpHeader">
                        <Button onClick={this.toggle} className="modalCloseBtn">X</Button>
                        </ModalHeader>
                    <ModalBody className="signUpBody">
                    <h3 className="modalFont">Let's get you registered!</h3>
                        <Signup updateToken={this.props.updateToken} updateAdmin={this.props.updateAdmin}/>
                    </ModalBody>
                </Modal>
            <Button type="submit" className="logBtn">Login</Button>
            </div>
            </Form>
            </Box>
            
        </div>
        );
    };
};

export default Login;