import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

interface AddCollectionProps {
    token: string,
    fetchCollection(collectionData:[]): void
    toggle(): void
}

interface AddCollectionState {
    artist: string,
    album: string,
    format: string,
    cat: string
}

class CollectionAdd extends Component <AddCollectionProps,AddCollectionState> {
    constructor(props: AddCollectionProps) {
        super(props)
        this.state = {
            artist: '',
            album: '',
            format: '',
            cat: ''
        }
    }

    handleSubmit = (e: any) => {
        e.preventDefault();
        fetch('http://localhost:3000/collection/add/', {
            method: 'POST',
            body: JSON.stringify({ collection: {artist: this.state.artist, album: this.state.album, format: this.state.format, cat: this.state.cat} }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        }).then((res) => res.json())
            .then((res) => {
                fetch(`/photo/update/${res.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(
                        {
                            collection:
                                { album: res.album,
                                artist: res.artist,
                                format: res.format,
                                cat: res.cat
                        }
                        }),
                    headers: new Headers({
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.props.token}`
                    })
                })
                    .then(() => {
                        this.props.fetchCollection([]);
                    })
            })
            .then((collectionData) => {
                console.log(collectionData);
                this.setState({artist:('')});
                this.setState({album:('')});
                this.setState({format:('')});
                this.setState({cat:('')});
                this.props.fetchCollection([]);
            })
    }
    render() {
    return (
        <>
            <h3 className="modalFont">add a record</h3>
            <Form className="form" onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Input className="recordInput" name="artist" value={this.state.artist} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.setState({artist: (e.target.value)})}} placeholder="artist" />
                </FormGroup>
                <FormGroup>
                    <Input className="recordInput" name="album" value={this.state.album} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.setState({album: (e.target.value)})}} placeholder="album" />
                </FormGroup>
                <FormGroup>
                    <Input className="recordInput" name="format" value={this.state.format} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.setState({format: (e.target.value)})}} placeholder="format" />
                </FormGroup>
                <FormGroup>
                    <Input className="recordInput" name="cat" value={this.state.cat} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.setState({cat: (e.target.value)})}} placeholder="cat#" />
                </FormGroup>
                <br />
                <Button className="tableBtn" onClick={this.props.toggle} type="submit">save</Button>
            </Form>
        </>
    )
}
}

export default CollectionAdd;