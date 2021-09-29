import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

interface collectionEditProps {
    token: string
    fetchCollection: () => void
    updateOff(): void
    collectionToUpdate: {
        artist: string,
        album: string,
        format: string,
        cat: string,
        id: number
    }
} 

interface collectionEditState {
        artist: string,
        album: string,
        format: string,
        cat: string
}

class CollectionEdit extends Component <collectionEditProps,collectionEditState> {
    constructor(props: collectionEditProps){
        super(props)
        this.state = {
            artist: this.props.collectionToUpdate.artist,
            album: this.props.collectionToUpdate.album,
            format: this.props.collectionToUpdate.format,
            cat: this.props.collectionToUpdate.cat,
        }
    }

    collectionUpdate = async (event: any) => {
        event.preventDefault();
        fetch(`http://localhost:3000/collection/update/${this.props.collectionToUpdate.id}`, {
            method: 'PUT',
            body: JSON.stringify({ collection: {artist: this.state.artist, album: this.state.album, format: this.state.format, cat: this.state.cat}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        })
        .then((res) => {
            this.props.fetchCollection();
            this.props.updateOff();
        })
    }

    render(){
    return(
        <div>
            <Form onSubmit={this.collectionUpdate}>
            <FormGroup>
                    <Input className="recordInput" name="artist" value={this.state.artist} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.setState({artist: (e.target.value)})}} placeholder="artist">
                </Input>
                </FormGroup>
                <FormGroup>
                    <Input className="recordInput"name="album" value={this.state.album} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.setState({album: (e.target.value)})}} placeholder="album">
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Input className="recordInput" name="format" value={this.state.format} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.setState({format: (e.target.value)})}} placeholder="format">
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Input className="recordInput" name="cat" value={this.state.cat} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.setState({cat: (e.target.value)})}} placeholder="cat#">
                    {this.props.collectionToUpdate.cat}
                    </Input>
                </FormGroup>
                <br/>
                <Button className="updateBtn" type="submit">update</Button>
            </Form>
            <br/>
        </div>
    )
}
}

export default CollectionEdit;