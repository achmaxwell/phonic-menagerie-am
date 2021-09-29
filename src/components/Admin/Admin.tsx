import { Component } from "react";
import { Row} from 'reactstrap';
import AdminTable from './AdminTable'
import './Styles.css';

interface adminProps {
    token: string
    clickLogout: () => void
    isAdmin: string
  } 

interface adminState {
    user: any
  } 

class Admin extends Component <adminProps, adminState> {
    constructor(props: adminProps) {
    super(props)
    this.state = {
        user: [],
    }
}


    fetchUsers = () => {
        fetch('http://localhost:3000/user/allUsers', {
            method: 'GET',
            headers: new Headers({
                'Content-type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        }).then((res) => res.json())
            .then((userData) => {
                console.log(userData)
                this.setState({user:(userData)})
            })
    }

    componentDidMount = () => {
        this.fetchUsers();
    }

    render() {
    return (
        <div >
            <div className="adminDiv">
                <div>
                    <div>
                        <Row>
                            <h1 className="adminDisplayFont">Administration</h1>
                            <p className="bodyFont"> Here you'll find all the users that have created accounts. in the future you
                        'll be able to delete users and edit their content.</p>
                        </Row>
                    </div>
                    <AdminTable user={this.state.user} fetchUsers={this.fetchUsers} token={this.props.token} />
</div>
</div>
        </div>
    )
    }
}


export default Admin;