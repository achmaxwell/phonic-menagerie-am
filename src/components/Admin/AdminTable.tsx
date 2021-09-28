import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import './Styles.css';

interface AdminTableProps {
    token: string
    fetchUsers: () => void
    user: any
}


interface AdminTableState {
    user: User[],
    id: number
}

type User = {
    email: string,
    createdAt: string,
    updatedAt: string
}

class AdminTable extends Component <AdminTableProps,AdminTableState> {
    constructor(props: any) {
        super(props)
        this.state = {
            id: 0,
            user: [],
        }
    }

    userMapper = (): JSX.Element[] => {
        return this.props.user.map((user: {email: User, createdAt: User, updatedAt: User}, index: number) => {
            console.log(this.props.user)
            return (
                <tbody>
                    <tr key={index}>
                    <td>{user.email}</td>
                    <td>{user.createdAt}</td>
                    <td>{user.updatedAt}</td>
                    <td>
                        <div>
                        </div>
                        
                    </td>
                </tr>
                </tbody>
            )
        }
        )

    }
    render() {
    return (
        
            <div>
                <>
            <div className="tableDiv overflow-x:auto">
                <br />
                <Table borderless>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Created</th>
                            <th>Updated</th>
                        </tr>
                    </thead>
                    
                        {this.userMapper()}
                    
                </Table>
            </div>
        </>
            </div>
        
    )
    }
}

export default AdminTable;
