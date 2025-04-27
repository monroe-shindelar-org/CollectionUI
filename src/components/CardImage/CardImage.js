import { Component } from "react";
import { Grid  } from "@mui/material";

class CardImage extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.callback(this.props.deckCard);
    }

    render() {
        return(
            <Grid size={2}>
                <img 
                    src={this.props.deckCard.card.images[0].smallUrl} 
                    style={{ maxWidth: "100%" }}
                    onClick={this.handleClick}
                />
            </Grid>
        );
    }
}

export default CardImage;