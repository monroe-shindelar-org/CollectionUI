import { Component } from "react";
import { filterDeck, getDeck, updateDeck } from "../../service/DeckService"
import { Grid, Button, Drawer, IconButton, touchRippleClasses, fabClasses } from "@mui/material";
import "./DeckComponent.css";
import DeckEditorComponent from "../DeckEditorComponent/DeckEditorComponent";
import CardImage from "../CardImage/CardImage";
import SelectedCardComponent from "../SelectedCardComponent/SelectedCardComponent";
import FilterListAltIcon from '@mui/icons-material/FilterListAlt';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import DeckFilterDrawer from "../DeckFilterDrawer/DeckFilterDrawer";


class DeckComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            deckId: "046b8738-fcfd-472a-803a-78e1e3072421",
            deck: null,
            page: 0,
            selectedCard: null,
            cardsToUpdate: [],
            drawerOpen: false,
            isFiltered: null
        };

        this.handleCardUpdate = this.handleCardUpdate.bind(this); 
        this.handleCardSelect = this.handleCardSelect.bind(this);
        this.handlePage = this.handlePage.bind(this);
        this.handleUpdateDeck = this.handleUpdateDeck.bind(this);
        this.handleFilterButton = this.handleFilterButton.bind(this);
        this.handleDrawerClose = this.handleDrawerClose.bind(this);
        this.handleRemoveFilters = this.handleRemoveFilters.bind(this);
        this.handleDrawerCallback = this.handleDrawerCallback.bind(this);
    }

    async componentDidMount() {
        if (!this.state.deck) {
            (async () => {
                try {
                    this.setState({
                        deck: await getDeck(this.state.deckId)
                    })
                } catch (err) {
                    console.log("error", err);
                }
            })();
        }
    }
    
    async handleUpdateDeck() {
        const cardIds = [];
        this.state.cardsToUpdate.forEach(dc => {
            cardIds.push(dc.card.id);
        });

        this.setState({
            deck: await updateDeck(this.state.deckId, cardIds),
            cardsToAdd: []
        });
    }

    handleCardUpdate(card) {
        const cards = this.state.cardsToUpdate;
        cards.push(card);

        if (card.quantity === 0) {
            const main = this.state.deck.main.filter(c => c.id === card.id);

            const deck = this.state.deck;
            deck.main = main;
            this.setState({
                deck: deck
            });
        }

        this.setState({
            cardsToUpdate: cards,
        });
    }

    handleCardSelect(card) {
        this.setState({
            selectedCard: card
        });
    }

    handlePage(page) {
        const newPage = this.state.page + page;
        this.setState({
            page: newPage
        });
    }

    handleFilterButton() {
        this.setState({
            drawerOpen: true
        });
    }

    handleDrawerClose() {
        this.setState({
            drawerOpen: false
        });
    }

    handleRemoveFilters() {
        this.setState({
            deck: this.state.isFiltered,
            isFiltered: null
        });
    }

    handleDrawerCallback(deck) {
        if (deck === null) {
            this.setState({
                drawerOpen: false
            });
            return;
        }
        
        const preFiltered = this.state.deck;

        this.setState({
            deck: deck,
            drawerOpen: false,
            isFiltered: preFiltered
        });
    }

    render() {
        if (!this.state.deck) {
            return <h1>Loading</h1>
        } else {
            const allCards = [];
            this.state.deck.main.forEach(c => allCards.push(c));
            allCards.push(...this.state.cardsToUpdate);

            const images = [];
            const startIdx = this.state.page * 60;
            const endIdx = startIdx + 60 > (allCards.length)
                ? allCards.length
                : startIdx + 60;

            const paginated = allCards.slice(startIdx, endIdx);
            paginated.forEach(c => {
                images.push(<CardImage deckCard={c} callback={this.handleCardSelect}/>)
            });
        
            return (
                <div>
                <Drawer open={this.state.drawerOpen}>
                    <DeckFilterDrawer deckId={this.state.deckId} callback={this.handleDrawerCallback}/>
                </Drawer>
                <Grid container>
                    <Grid size={3}>
                        <SelectedCardComponent deckCard={this.state.selectedCard} callback={this.handleCardUpdate}/>
                    </Grid>
                    <Grid size={6}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleFilterButton}
                            edge="start"
                            sx={[
                                {
                                    mr: 2,
                                },
                                (this.state.drawerOpen || this.state.isFiltered !== null) && { display: 'none' },
                            ]}
                        >
                            <FilterListAltIcon />
                        </IconButton>
                        <IconButton
                            color="inherit"
                            onClick={this.handleRemoveFilters}
                            edge="start"
                            sx={[
                                {
                                    mr: 2,
                                },
                                this.state.isFiltered === null && { display: 'none' },
                            ]}
                        >
                            <DeleteForeverIcon />
                        </IconButton>
                        <h2>Total Cards: {allCards.length}</h2>
                        <Grid container spacing={0.5} columns={20}>
                            {images}
                        </Grid>
                        <Button onClick={() => this.handlePage(-1)}>-</Button>
                        <Button onClick={() => this.handlePage(1)}>+</Button>
                        <Button onClick={async () => { await this.handleUpdateDeck(); }}>Update</Button>
                    </Grid>
                    <Grid size={3}>
                        <DeckEditorComponent callback={this.handleCardSelect} />
                    </Grid>
                </Grid>
                </div>
            )
        }
    }
}

export default DeckComponent;