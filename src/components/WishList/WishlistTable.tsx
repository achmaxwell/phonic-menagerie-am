import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import './Styles.css';

interface WishlistTableProps {
    token: string
    fetchWishlist: () => void
    editUpdateWishlist(wishlist: any): void
    updateOn: () => void,
    updateOff: () => void,
    wishlist: any
    wishlistToUpdate: {
        artist: string,
        album: string,
        format: string,
        cat: string,
        price: string,
        id: number
    }
}

interface WishlistTableState {
    id: number,
    wishlist: Wishlist[],
    modalEdit: boolean
}

type Wishlist = {
    artist: string,
    album: string,
    format: string,
    cat: string,
    price: string,
    id: number
}

class WishlistTable extends Component <WishlistTableProps,WishlistTableState> {
    constructor(props: any) {
        super(props)
        this.state = {
            id: 0,
            wishlist: [],
            modalEdit: false
        }
    }

    deleteWishlist = async(wishlist: any) => {
        const confirm = prompt('Are you sure you want to delete this record?', 'Yes')
        if (confirm) {
            try {
                const res = await fetch(`http://localhost:3000/wishlist/delete/${wishlist.id}`, {
        // fetch(`${APIURL}/notes/delete/${note.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        })
        console.log(res)
        this.props.fetchWishlist()
            } catch(e){console.log(e)}
            
        }
        
    }

    wishlistMapper = (): JSX.Element[] => {
        return this.props.wishlist.map((wishlist: {artist: Wishlist, album: Wishlist, format: Wishlist, cat: Wishlist, price: Wishlist}, index: number) => {
            console.log(this.props.wishlist)
            return (
                <tbody>
                    <tr key={index}>
                        <td className="artistBodyFont">{wishlist.artist}</td>
                        <td className="tableBodyFont">{wishlist.album}</td>
                        <td className="tableBodyFont">{wishlist.format}</td>
                        <td className="tableBodyFont">{wishlist.cat}</td>
                        <td className="tableBodyFont">{wishlist.price}</td>
                    <td>
                    <div>
                        <Button className="tableBtn" onClick={() => { this.props.editUpdateWishlist(wishlist); this.props.updateOn() }}>edit</Button>
                        <Button className="tableBtn" onClick={() => { this.deleteWishlist(wishlist) }}>delete</Button>
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
                                <th className="tableDisplayFont">Price</th>
                                
                            </tr>
                        </thead>
                        
                            {this.wishlistMapper()}
                        
                    </Table>
                </div>
            </>
                </div>
            
        )
    }
}

export default WishlistTable;
