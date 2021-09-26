import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

interface wishlistEditProps {
    token: string
    fetchWishlist: () => void
    updateOff(): void
    wishlistUpdate: any
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
            artist: '',
            album: '',
            format: '',
            cat: '',
            price: ''
        }
    }

    wishlistUpdate = (event: any) => {
        event.preventDefault();
        fetch(`http://localhost:3000/wishList/update/${this.props.wishlistUpdate.id}`, {
            method: 'PUT',
            body: JSON.stringify({wishlist: {artist: '', album: '', format: '', cat: '', price: ''}}),
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
                    <Label htmlFor="wishlist" className="noteHeaderText">edit your wishlist</Label>
                    <Input name="yourWishlist" value={this.state.artist} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {this.setState({artist: (e.target.value)})}} placeholder="edit artist name" className="formInputName"/>
                </FormGroup>
                <FormGroup>
                    
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