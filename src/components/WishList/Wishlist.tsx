import { Component } from "react";
import { Row, Button, Modal, ModalBody, ModalHeader } from 'reactstrap';

import WishlistEdit from './WishlistEdit';
import WishlistTable from './WishlistTable';
import WishlistAdd from './WishlistAdd';

interface wishlistProps {
    token: string
    clickLogout(): void
  } 

interface wishlistState {
    wishlist: any
    updateActive: boolean,
    wishlistToUpdate: { 
        artist: string,
        album: string,
        format: string,
        cat: string,
        price: string
},
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
                price: ''
        },
    }
}

    fetchWishlist = () => {
        fetch('http://localhost:3000/wishList/myWishItems', {
            // fetch(`${APIURL}/wishList/myItems`, {
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
        this.setState({wishlistToUpdate:(wishlist)});
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
        <div>
            <div className="bgDiv">
                <div className="notesViewDiv">
                    <div className="noteDivBtn">
                        <Row>
                            <h3>welcome!</h3>
                            <p>keep track of all your gardening and plant progress by adding a note! If you find additional information edit your note, and if you no longer need the information (way to go gardening master!) simply delete it.</p>
                            <Button id="logoutBtn" size="sm" onClick={this.props.clickLogout} className="logoutBtn">logout</Button>
                            {/* <Button onClick={this.state.toggle} className="addNoteBtn">add note</Button> */}
                            {/* <Modal isOpen={modal} toggle={toggle} className={className}>
                                <ModalHeader className="modalHeader">
                                    <Button onClick={toggle} className="modalCloseBtn">X</Button>
                                </ModalHeader>
                                <ModalBody>
                                    <CollectionAdd fetchCollection={this.fetchCollection} token={this.props.token} toggle={toggle} />
                                </ModalBody>
                            </Modal> */}
                        </Row>
                    </div>
                    <WishlistTable wishlist={this.state.wishlist} editUpdateWishlist={this.editUpdateWishlist}  updateOn={this.updateOn} fetchWishlist={this.fetchWishlist} token={this.props.token} />

                    {this.state.updateActive ?
                        <WishlistEdit wishlistUpdate={this.state.wishlistToUpdate} updateOff={this.updateOff} token={this.props.token} fetchWishlist={this.fetchWishlist} /> : <> </>}

</div>
</div>
        </div>
    )
    }
}


export default Wishlist;