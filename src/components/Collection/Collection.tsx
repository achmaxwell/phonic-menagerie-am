import { Component } from "react";

interface collectionProps {
    token: string
    clickLogout(): void
  } 

interface collectionState {
    collection: [],
    updateActive: boolean,
    collectionToUpdate: {}
  } 

class Collection extends Component <collectionProps, collectionState> {
    constructor(props: collectionProps) {
    super(props)
    this.state = {
        collection: [],
        updateActive: false,
        collectionToUpdate: {},
    }
}

    fetchCollection = () => {
        fetch('http://localhost:3000/collection/myItems', {
            // fetch(`${APIURL}/collection/myItems`, {
            method: 'GET',
            headers: new Headers({
                'Content-type': 'application/json',
                'Authorization': `Bearer ${this.props.token}`//won't have this until after user stuff is done
            })
        }).then((res) => res.json())
            .then((collectionData) => {
                this.setState({collection:(collectionData)})
            })
    }

    editUpdateCollection = () => {
        this.setState({collectionToUpdate:(this.state.collection)});
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
        <div>
        </div>
    )
    }
}


export default Collection;