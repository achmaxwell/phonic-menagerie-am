import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

interface AddCollectionProps {
    token?: string,
    fetchCollection(collectionData:[]): void
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
            body: JSON.stringify({ collection: {artist: '', album: '', format: '', cat: ''} }),
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
            <h4 className="signupHeader">add a record</h4>
            <Form className="form" onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Input name="artist" value={this.state.artist} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.setState({artist: (e.target.value)})}} placeholder="artist" />
                </FormGroup>
                <FormGroup>
                    <Input name="album" value={this.state.album} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.setState({album: (e.target.value)})}} placeholder="album" />
                </FormGroup>
                <FormGroup>
                    <Input name="format" value={this.state.format} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.setState({format: (e.target.value)})}} placeholder="album" />
                </FormGroup>
                <FormGroup>
                    <Input name="cat" value={this.state.cat} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.setState({cat: (e.target.value)})}} placeholder="album" />
                </FormGroup>
                <br />
            </Form>
        </>
    )
}
}

export default CollectionAdd;