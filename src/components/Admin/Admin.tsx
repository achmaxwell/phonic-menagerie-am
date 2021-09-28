import { Component } from "react";
import { Row} from 'reactstrap';
import AdminTable from './AdminTable'
import '../Collection/Styles.css';

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
            <div className="collectionDiv">
                <div>
                    <div>
                        <Row>
                            <h3>welcome!</h3>
                            <p>Your personal album collection in the palm of your hand! Keep track of your record collection and add albums to your wishlist. Ensures you don't buy the same record twice!</p>
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