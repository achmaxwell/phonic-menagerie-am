import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

interface wishlistEditProps {
    token: string
    fetchWishlist: () => void
    updateOff(): void
    wishlistToUpdate: {
        artist: string,
        album: string,
        format: string,
        cat: string,
        price: string,
        id: number
    }
} 

interface wishlistEditState {
        artist: string,
        album: string,
        format: string,
        cat: string,
        price: string
}

class WishlistEdit extends Component <wishlistEditProps,wishlistEditState> {
    constructor(props: wishlistEditProps){
        super(props)
        this.state = {
            artist: this.props.wishlistToUpdate.artist,
            album: this.props.wishlistToUpdate.album,
            format: this.props.wishlistToUpdate.format,
            cat: this.props.wishlistToUpdate.cat,
            price: this.props.wishlistToUpdate.price
        }
    }

    wishlistUpdate = async (event: any) => {
        event.preventDefault();
        fetch(`http://localhost:3000/wishlist/update/${this.props.wishlistToUpdate.id}`, {
            method: 'PUT',
            body: JSON.stringify({ wishlist: {artist: this.state.artist, album: this.state.album, format: this.state.format, cat: this.state.cat, price: this.state.price}}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        })
        .then((res) => {
            this.props.fetchWishlist();
            this.props.updateOff();
        })
    }

    render(){
    return(
        <div>
            <Form onSubmit={this.wishlistUpdate}>
            <FormGroup>
                    <Input name="artist" value={this.state.artist} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.setState({artist: (e.target.value)})}} placeholder="artist">
                </Input>
                </FormGroup>
                <FormGroup>
                    <Input name="album" value={this.state.album} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.setState({album: (e.target.value)})}} placeholder="album">
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Input name="format" value={this.state.format} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.setState({format: (e.target.value)})}} placeholder="format">
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Input name="cat" value={this.state.cat} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.setState({cat: (e.target.value)})}} placeholder="cat">
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Input name="price" value={this.state.price} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.setState({cat: (e.target.value)})}} placeholder="price">
                    </Input>
                </FormGroup>
                <br/>
                <Button type="submit" className="editBtn">update</Button>
            </Form>
            <br/>
        </div>
    )
}
}

export default WishlistEdit;