import { Component } from "react";
import { Autocomplete, Modal, Box, TextField } from "@mui/material";

class AddCardsPopup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedCards: []
        }
    }

    render() {
        const options = [];

        this.props.cards.forEach(c => {
            options.push({ label: c.name, id: parseInt(c.id) });
        });

        return (
            <Modal
                open={this.props.open}
            >
                <Box>
                    <Autocomplete 
                        disablePortal
                        options={options}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Card" />}
                    />
                </Box>
            </Modal>
        );
    }
}

export default AddCardsPopup;