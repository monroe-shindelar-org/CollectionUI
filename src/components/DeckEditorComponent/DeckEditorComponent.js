import { Button, Grid, TextField } from "@mui/material";
import { Component } from "react";
import { filterCards } from "../../service/CardService";
import CardImage from "../CardImage/CardImage";

class DeckEditorComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            nameFilter: null,
            foundCards: [],
            page: 0
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleCardSelect = this.handleCardSelect.bind(this);
        this.handlePage = this.handlePage.bind(this);
    }

    handleNameChange(event) {
        this.setState({
            nameFilter: event.target.value
        });
    }

    handleCardSelect(card) {
        this.props.callback(card);
    }

    handlePage(page) {
        const newPage = this.state.page + page;
        this.setState({
            page: newPage
        });
    }

    async handleSearch() {
        const filter = {
            filterType: "OR",
            chain: [
                {
                    filterType: "SIMPLE",
                    filter: {
                        field: "name",
                        operator: "LIKE",
                        value: this.state.nameFilter,
                    }
                },
                {
                    filterType: "SIMPLE",
                    filter: {
                        field: "name",
                        operator: "EQUAL_TO",
                        value: this.state.nameFilter,
                    }
                }
            ]
        }

        this.setState({
            foundCards: await filterCards(filter),
            page: 0
        });
    }

    render() {

        const images = [];
        const startIdx = this.state.page * 28;
        const endIdx = startIdx + 28 > this.state.foundCards.length
            ? this.state.foundCards.length
            : startIdx + 28;

        const paginated = this.state.foundCards.slice(startIdx, endIdx);
        paginated.forEach(c => {
            const dc = {
                card: c,
                quantity: 0
            };
            images.push(<CardImage deckCard={dc} callback={this.handleCardSelect}/>)
        });

        return (
            <Grid container>
                <Grid size={12}>
                    <TextField
                        variant="outlined"
                        label="Name"
                        onChange={(e) => this.handleNameChange(e)}
                    />
                </Grid>
                <Button
                    onClick={async () => { await this.handleSearch(); }}
                >
                    Search
                </Button>
                <Grid container columns={8}>
                    {images}
                </Grid>
                <Button onClick={() => this.handlePage(-1)}>-</Button>
                <Button onClick={() => this.handlePage(1)}>+</Button>
            </Grid>
        )
    }
}

export default DeckEditorComponent;