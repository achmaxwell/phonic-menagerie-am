import { Component } from "react";
import { Row, Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import WishlistEdit from './WishlistEdit';
import WishlistTable from './WishlistTable';
import WishlistAdd from './WishlistAdd';
import './Styles.css';

interface wishlistProps {
    token: string
    clickLogout: () => void
  } 

interface wishlistState {
    wishlist: any
    updateActive: boolean,
    wishlistToUpdate: { 
        artist: string,
        album: string,
        format: string,
        cat: string,
        price: string,
        id: number
},
    modal: boolean,
  } 

class Wishlist extends Component <wishlistProps, wishlistState> {
    constructor(props: wishlistProps) {
    super(props)
    this.state = {
        wishlist: [],
        updateActive: false,
        wishlistToUpdate: {
                artist: '',
                album: '',
                format: '',
                cat: '',
                price: '',
                id: 0
        },
        modal: false,
    }
}

    toggle = () => this.setState({modal: !this.state.modal});


    fetchWishlist = () => {
        fetch('http://localhost:3000/wishlist/myWishItems', {
            // fetch(`${APIURL}/wishlist/myItems`, {
            method: 'GET',
            headers: new Headers({
                'Content-type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        }).then((res) => res.json())
            .then((wishlistData) => {
                console.log(wishlistData)
                this.setState({wishlist:(wishlistData)})
            })
    }

    editUpdateWishlist = (wishlist: any) => {
        this.setState({wishlistToUpdate: {artist: wishlist.artist, album: wishlist.album, format: wishlist.format, cat: wishlist.cat, price: wishlist.price, id: wishlist.id}});
        console.log("itemToUpdate " + this.state.wishlist);
    }

    updateOn = () => {
        this.setState({updateActive: true});
    }

    updateOff = () => {
        this.setState({updateActive: false});
    }

    componentDidMount = () => {
        this.fetchWishlist();
    }

    render() {
    return (
        <div >
            <div className="wishlistDiv">
                <div>
                    <div>
                        <Row>
                            <h3>welcome!</h3>
                            <p>Your personal album collection in the palm of your hand! Keep track of your record collection and add albums to your wishlist. Ensures you don't buy the same record twice!</p>
                            <Button className="addBtn" onClick={this.toggle}>add record</Button>
                            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                                <ModalHeader className="modalHeader">
                                    <Button onClick={this.toggle} className="modalCloseBtn">X</Button>
                                </ModalHeader>
                                <ModalBody>
                                    <WishlistAdd fetchWishlist={this.fetchWishlist} token={this.props.token} toggle={this.toggle}/>
                                </ModalBody>
                            </Modal>
                        </Row>
                    </div>
                    {this.state.updateActive ?
                            <WishlistEdit wishlistToUpdate={this.state.wishlistToUpdate} updateOff={this.updateOff} token={this.props.token} fetchWishlist={this.fetchWishlist} /> : <> </>}
                    <WishlistTable wishlist={this.state.wishlist} wishlistToUpdate={this.state.wishlistToUpdate} editUpdateWishlist={this.editUpdateWishlist}  updateOff={this.updateOff} updateOn={this.updateOn} fetchWishlist={this.fetchWishlist} token={this.props.token} />

</div>
</div>
        </div>
    )
    }
}


export default Wishlist;