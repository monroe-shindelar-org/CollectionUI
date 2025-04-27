import { Component } from "react";
import { Box, Divider, ListItem, List, TextField, Select, MenuItem, FormControl, InputLabel, Button } from "@mui/material";
import { filterDeck } from "../../service/DeckService";
import { and, getNameFilter, simple } from "../../Helpers/FIlterHelper";

class DeckFilterDrawer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nameFilter: null,
            attributeFilter: null,
            typeFilter: null,
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleAttributeChange = this.handleAttributeChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
    }

    async handleApplyFilter() {
        const filters = [];
        if (this.state.nameFilter !== null) {
            filters.push(getNameFilter(this.state.nameFilter));
        }
        if (this.state.attributeFilter !== null) {
            filters.push(simple("attribute", "EQUAL_TO", this.state.attributeFilter));
        }
        if (this.state.typeFilter !== null) {
            filters.push(simple("type", "LIKE", this.state.typeFilter));
        }
        const isFiltered = this.state.deck;

        const f = filters.length === 1 ? filters[0] : and(filters);

        const deck = await filterDeck(this.props.deckId, f);

        this.props.callback(deck);
    }

    handleAttributeChange(event) {
        this.setState({
            attributeFilter: event.target.value
        });
    }

    handleTypeChange(event) {
        this.setState({
            typeFilter: event.target.value
        });
    }

    handleNameChange(event) {
        this.setState({
            nameFilter: event.target.value
        });
    }

    render() {
        return (
            <Box width={350}>
                <h1>Filters</h1>
                <Divider />
                <List>
                    <ListItem>
                        <TextField
                            variant="outlined"
                            label="Name"
                            onChange={(e) => this.handleNameChange(e)}
                        />
                    </ListItem>
                    <ListItem>
                        <FormControl fullWidth>
                            <InputLabel>Type</InputLabel>
                            <Select
                                label="Type"
                                onChange={ (e) => { this.handleTypeChange(e); } }
                            >
                                <MenuItem value={"Monster"}>Monster</MenuItem>
                                <MenuItem value={"Spell"}>Spell</MenuItem>
                                <MenuItem value={"Trap"}>Trap</MenuItem>
                            </Select>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Attribute</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Attribute"
                                onChange={ (e) => { this.handleAttributeChange(e); } }
                            >
                                <MenuItem value={"DARK"}>Dark</MenuItem>
                                <MenuItem value={"EARTH"}>Earth</MenuItem>
                                <MenuItem value={"FIRE"}>Fire</MenuItem>
                                <MenuItem value={"LIGHT"}>Light</MenuItem>
                                <MenuItem value={"WATER"}>Water</MenuItem>
                                <MenuItem value={"WIND"}>Wind</MenuItem>
                            </Select>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <Button onClick={this.handleDrawerClose}>Cancel</Button>
                        <Button onClick={async () => { await this.handleApplyFilter(); } }>Apply</Button>
                    </ListItem>
                </List>
            </Box>
        );
    }
};

export default DeckFilterDrawer;