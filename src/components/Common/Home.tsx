import { Component } from "react"
import homeImg from './assets/home-page-img.jpg'

export class Home extends Component {


    render() {
        return(

        <div>
            <div className="homeDiv">
                <p className="homeDisplayFont">Welcome!</p>
                <div className="bodyFont">This is only the beginning! Go to Collection to add, edit, or delete items on your personal library. Got a record you really want and don't want to forget? Hop over to Wishlist and add it! <p className="partyOn">Remember, Be excellent to each other and party on dudes!</p></div>
            </div>
        </div>
        )
    }
}