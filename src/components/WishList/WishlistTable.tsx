import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';

interface WishlistTableProps {
    token?: string
    fetchWishlist?: () => void
    editUpdateWishlist?: any
    updateOn: () => void,
    wishlist: any
}

interface WishlistTableState {
    id: number,
    wishlist: {
        artist: string,
        album: string,
        format: string,
        cat: string,
        price: string
    }
    
}

class WishlistTable extends Component <WishlistTableProps,WishlistTableState> {
    constructor(props: any) {
        super(props)
        this.state = {
            id: 0,
            wishlist: {
                artist: '',
                album: '',
                format: '',
                cat:'',
                price: ''
            }
        }
    }

    deleteWishlist = () => {
        fetch(`http://localhost:3000/wishList/delete/${this.state.id}`, {
        // fetch(`${APIURL}/notes/delete/${note.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        })
            .then(() => this.props.fetchWishlist)
    }


    noteMapper = () => {
        return this.props.wishlist.map((wishlist: {artist: '', album: '', format: '', cat: '', price: ''}, index: any) => {
            console.log(this.props.wishlist)
            return (
                <div>
                    <tr key={index}>
                    <th scope="row">{this.state.wishlist.artist}</th>
                    <td>{this.state.wishlist.album}</td>
                    <td>{this.state.wishlist.format}</td>
                    <td>{this.state.wishlist.cat}</td>
                    <td>{this.state.wishlist.price}</td>
                    <td>
                        <Button onClick={() => { this.props.editUpdateWishlist(wishlist); this.props.updateOn() }}>edit</Button>
                        <br />
                        <Button onClick={() => { if (window.confirm('Are you sure you want to delete this note?')) this.deleteWishlist() }}>delete</Button>
                        
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

export default WishlistTable;
