import React, { Component } from 'react';
import { Table, Button, Row, Modal, ModalBody, ModalHeader } from 'reactstrap';
import CollectionEdit from './CollectionEdit'
import './Styles.css';

interface CollectionTableProps {
    token: string
    fetchCollection: () => void
    editUpdateCollection(collection: any): void
    updateOn: () => void,
    updateOff: () => void,
    collection: any
    collectionToUpdate: {
        artist: string,
        album: string,
        format: string,
        cat: string,
        id: number
    }
}


interface CollectionTableState {
    id: number,
    collection: Collection[],
    modalEdit: boolean
}

type Collection = {
    artist: string,
    album: string,
    format: string,
    cat: string,
    id: number
}

class CollectionTable extends Component <CollectionTableProps,CollectionTableState> {
    constructor(props: any) {
        super(props)
        this.state = {
            id: 0,
            collection: [],
            modalEdit: false
        }
    }

    deleteCollection = async(collection: any) => {
        const confirm = prompt('Are you sure you want to delete this record?', 'Yes')
        if (confirm) {
            try {
                const res = await fetch(`http://localhost:3000/collection/delete/${collection.id}`, {
        // fetch(`${APIURL}/notes/delete/${note.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        })
        console.log(res)
        this.props.fetchCollection()
            } catch(e){console.log(e)}
            
        }
        
    }


    collectionMapper = (): JSX.Element[] => {
        return this.props.collection.map((collection: {artist: Collection, album: Collection, format: Collection, cat: Collection}, index: number) => {
            console.log(this.props.collection)
            return (
                <tbody>
                    <tr key={index}>
                    <td className="artistBodyFont">{collection.artist}</td>
                    <td className="tableBodyFont">{collection.album}</td>
                    <td className="tableBodyFont">{collection.format}</td>
                    <td className="tableBodyFont">{collection.cat}</td>
                    <td>
                        <div>
                        <Button className="tableBtn" onClick={() => { this.props.editUpdateCollection(collection); this.props.updateOn() }}>edit</Button>
                        <Button className="tableBtn" onClick={() => { this.deleteCollection(collection) }}>delete</Button>
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
                            <th className="tableDisplayFont">Artist</th>
                            <th className="tableDisplayFont">Album</th>
                            <th className="tableDisplayFont">Format</th>
                            <th className="tableDisplayFont">Cat#</th>
                            
                        </tr>
                    </thead>
                    
                        {this.collectionMapper()}
                    
                </Table>
            </div>
        </>
            </div>
        
    )
    }
}

export default CollectionTable;
