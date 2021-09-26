import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

interface AddWishlistProps {
    token?: string,
    fetchWishlist(wishlistData:[]): void
}

interface AddWishlistState {
    artist: string,
    album: string,
    format: string,
    cat: string
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
        fetch('http://localhost:3000/wishList/add/', {
            method: 'POST',
            body: JSON.stringify({ wishlist: {artist: '', album: '', format: '', cat: '', price: ''} }),
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
            .then((wishlistData) => {
                console.log(wishlistData);
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
            <h4 className="signupHeader">record a plant note</h4>
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
                <FormGroup>
                    <Input name="price" value={this.state.price} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.setState({price: (e.target.value)})}} placeholder="album" />
                </FormGroup>
                <br />
            </Form>
        </>
    )
}
}

export default WishlistAdd;