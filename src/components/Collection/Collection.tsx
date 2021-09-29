import { Component } from "react";
import { Row, Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import CollectionEdit from './CollectionEdit';
import CollectionTable from './CollectionTable';
import CollectionAdd from './CollectionAdd';
import './Styles.css';

interface collectionProps {
    token: string
    clickLogout: () => void
  } 

interface collectionState {
    collection: any
    updateActive: boolean,
    collectionToUpdate: { 
        artist: string,
        album: string,
        format: string,
        cat: string
        id: number
},
    modal: boolean,
  } 

class Collection extends Component <collectionProps, collectionState> {
    constructor(props: collectionProps) {
    super(props)
    this.state = {
        collection: [],
        updateActive: false,
        collectionToUpdate: {
                artist: '',
                album: '',
                format: '',
                cat: '',
                id: 0
        },
        modal: false,
    }
}

    toggle = () => this.setState({modal: !this.state.modal});


    fetchCollection = () => {
        fetch('http://localhost:3000/collection/myItems', {
            // fetch(`${APIURL}/collection/myItems`, {
            method: 'GET',
            headers: new Headers({
                'Content-type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`
            })
        }).then((res) => res.json())
            .then((collectionData) => {
                console.log(collectionData)
                this.setState({collection:(collectionData)})
            })
    }

    editUpdateCollection = (collection: any) => {
        this.setState({collectionToUpdate: {artist: collection.artist, album: collection.album, format: collection.format, cat: collection.cat, id: collection.id}});
        console.log("itemToUpdate " + this.state.collection);
    }

    updateOn = () => {
        this.setState({updateActive: true});
    }

    updateOff = () => {
        this.setState({updateActive: false});
    }

    componentDidMount = () => {
        this.fetchCollection();
    }

    render() {
    return (
        <div >
            <div className="collectionDiv">
                <div>
                    <div>
                        <Row>
                            <h1 className="displayFont">welcome!</h1>
                            <p className="bodyFont">Your personal album collection in the palm of your hand! Keep track of your record collection and add albums to your wishlist. Ensures you don't buy the same record twice!</p>
                            <Button className="addBtn" onClick={this.toggle}>add record</Button>
                            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                                <ModalHeader className="addHeader">
                                    <Button onClick={this.toggle} className="modalCloseBtn">X</Button>
                                </ModalHeader>
                                <ModalBody className="addBody">
                                    <CollectionAdd fetchCollection={this.fetchCollection} token={this.props.token} toggle={this.toggle}/>
                                </ModalBody>
                            </Modal>
                        </Row>
                    </div>
                    {this.state.updateActive ?
                            <CollectionEdit collectionToUpdate={this.state.collectionToUpdate} updateOff={this.updateOff} token={this.props.token} fetchCollection={this.fetchCollection} /> : <> </>}
                    <CollectionTable collection={this.state.collection} collectionToUpdate={this.state.collectionToUpdate} editUpdateCollection={this.editUpdateCollection}  updateOff={this.updateOff} updateOn={this.updateOn} fetchCollection={this.fetchCollection} token={this.props.token} />

                    {/* {this.state.updateActive ?
                            <CollectionEdit collectionToUpdate={this.state.collectionToUpdate} updateOff={this.updateOff} token={this.props.token} fetchCollection={this.fetchCollection} /> : <> </>} */}

</div>
</div>
        </div>
    )
    }
}


export default Collection;