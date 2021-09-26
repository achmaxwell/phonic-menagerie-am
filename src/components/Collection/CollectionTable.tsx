import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';

interface CollectionTableProps {
    token?: string
    fetchCollection?: () => void
    editUpdateCollection?: any
    updateOn: () => void,
    collection: any
}


interface CollectionTableState {
    id: number,
    collection: {
        artist: string,
        album: string,
        format: string,
        cat: string
    }
    
}

class CollectionTable extends Component <CollectionTableProps,CollectionTableState> {
    constructor(props: any) {
        super(props)
        this.state = {
            id: 0,
            collection: {
                artist: '',
                album: '',
                format: '',
                cat:''
            }
        }
    }

    deleteCollection = () => {
        fetch(`http://localhost:3000/collection/delete/${this.state.id}`, {
        // fetch(`${APIURL}/notes/delete/${note.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        })
            .then(() => this.props.fetchCollection)
    }


    noteMapper = () => {
        return this.props.collection.map((collection: {artist: '', album: '', format: '', cat: ''}, index: any) => {
            console.log(this.props.collection)
            return (
                <div>
                    <tr key={index}>
                    <th scope="row">{this.state.collection.artist}</th>
                    <td>{this.state.collection.album}</td>
                    <td>{this.state.collection.format}</td>
                    <td>{this.state.collection.cat}</td>
                    <td>
                        <Button onClick={() => { this.props.editUpdateCollection(collection); this.props.updateOn() }}>edit</Button>
                        <br />
                        <Button onClick={() => { if (window.confirm('Are you sure you want to delete this note?')) this.deleteCollection() }}>delete</Button>
                        
                    </td>
                </tr>
                </div>
            )
        }
        )

    }
    render() {
    return (
        
            <div>
                <>
            <div className="notesTableDiv">
                <br />
                <Table borderless>
                    <thead>
                        <tr>
                            <th>Artist</th>
                            <th>Album</th>
                            <th>Format</th>
                            <th>Cat#</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {this.noteMapper()}
                    </tbody>
                </Table>
            </div>
        </>
            </div>
        
    )
    }
}

export default CollectionTable;
