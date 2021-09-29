import React, { Component } from 'react';
import { Button, Form, FormGroup, Input } from 'reactstrap';

interface AddWishlistProps {
    token: string,
    fetchWishlist(wishlistData:[]): void
    toggle(): void
}

interface AddWishlistState {
    artist: string,
    album: string,
    format: string,
    cat: string,
    price: string
}

class WishlistAdd extends Component <AddWishlistProps,AddWishlistState> {
    constructor(props: AddWishlistProps) {
        super(props)
        this.state = {
            artist: '',
            album: '',
            format: '',
            cat: '',
            price: ''
        }
    }

    handleSubmit = (e: any) => {
        e.preventDefault();
        fetch('http://localhost:3000/wishlist/add/', {
            method: 'POST',
            body: JSON.stringify({ wishlist: {artist: this.state.artist, album: this.state.album, format: this.state.format, cat: this.state.cat, price: this.state.price} }),
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
                            cat: res.cat,
                            price: res.price
                    }
                    }),
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.props.token}`
                })
            })
                .then(() => {
                    this.props.fetchWishlist([]);
                })
        })
        .then((collectionData) => {
            console.log(collectionData);
            this.setState({artist:('')});
            this.setState({album:('')});
            this.setState({format:('')});
            this.setState({cat:('')});
            this.setState({price:('')});
            this.props.fetchWishlist([]);
        })
}
    render() {
    return (
        <>
            <h4 className="modalFont">Add to your Wishlist!</h4>
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
                    <Input className="recordInput" name="cat" value={this.state.cat} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.setState({cat: (e.target.value)})}} placeholder="cat" />
                </FormGroup>
                <FormGroup>
                    <Input className="recordInput" name="price" value={this.state.price} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.setState({price: (e.target.value)})}} placeholder="price" />
                </FormGroup>
                <br />
                <Button onClick={this.props.toggle} className="tableBtn" type="submit">save</Button>
            </Form>
        </>
    )
}
}

export default WishlistAdd;