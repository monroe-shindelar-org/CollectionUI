import { Component } from "react";
import { Button, Grid } from "@mui/material";

class SelectedCardComponent extends Component {
    constructor(props) {
        super(props);

        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleUpdate(qty) {
        this.props.deckCard.quantity = this.props.deckCard.quantity + qty;
        this.props.callback(this.props.deckCard)
    }

    render() {
        if (this.props.deckCard === null) {
            return <div></div>
        }

        return (
            <Grid>
                <img 
                    src={this.props.deckCard.card.images[0].imageUrl} 
                    style={{ maxWidth: "100%" }}
                />
                { this.props.deckCard.quantity === 0 ? <Button color="success" onClick={() => this.handleUpdate(1) } >Add</Button> : "" }
                { this.props.deckCard.quantity > 0 ? <Button color="error" onClick={() => this.handleUpdate(-1) } >Remove</Button> : "" }
            </Grid>
        )
    }
}

export default SelectedCardComponent;