import React, {Component} from 'react';
import {LearningCardComponent} from "./LearningCardComponent";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import {MaterialIcon} from "../../Helper/MaterialIcon";
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
    gridContainer: {
        height: '100%',
        paddingBottom: '2rem',
        paddingTop: '1rem'
    },
    cardContainer: {
        minHeight: '75%',
    }
});


class LearningContentComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {currentCardRef: undefined, currentCardKeyIndex: undefined, backPage: false};
    }


    render() {
        console.log('ref', this.props.currentCardRefs);
        let htmlContent = '';
        const {classes} = this.props;
        console.log(this.state.currentCardRef);
        if (this.props.cards[this.state.currentCardRef] !== undefined) {
            if(this.state.backPage == false){
                htmlContent = this.props.cards[this.state.currentCardRef].frontHtml
            } else {
                htmlContent = this.props.cards[this.state.currentCardRef].backHtml
            }

        }
        return (
            <main role="main" className={" col-md-9 ml-sm-auto col-lg-10 px-4"}>
                <Grid container className={classes.gridContainer} direction={'column'} justify={'space-between'}>

                    <Grid className={classes.cardContainer} container spacing={16}>
                        <Grid item container direction={'column'} justify={'center'} xs={3} sm={1}>

                            <IconButton onClick={() => this.goToCard(this.state.currentCardKeyIndex - 1)}
                                        className={classes.button} aria-label="Back">
                                <MaterialIcon icon={'keyboard_arrow_left'}/>
                            </IconButton>

                        </Grid>
                        <Grid item xs={6} sm={10}>{this.state.currentCardRef}
                            {this.state.currentCardRef && <LearningCardComponent htmlContent={htmlContent}/>}
                        </Grid>
                        <Grid item container direction={'column'} justify={'center'} xs={3} sm={1}>
                            <IconButton onClick={() => this.goToCard(this.state.currentCardKeyIndex + 1)}
                                        className={classes.button} aria-label="Back">
                                <MaterialIcon icon={'keyboard_arrow_right'}/>
                            </IconButton>
                        </Grid>
                    </Grid>

                    <Grid container justify={'center'} spacing={32}>
                        <Grid item xs={3} sm={1}>
                            <Button onClick={() => this.handleFalseButton()} variant="fab" color="secondary"
                                    aria-label="false">
                                <MaterialIcon icon={'clear'}/>
                            </Button>
                        </Grid>
                        <Grid item xs={3} sm={1}>
                            <Button onClick={() => this.handlePageToggleButton()} variant="fab" aria-label="turnAround">
                                <MaterialIcon icon={'replay'}/>
                            </Button>
                        </Grid>
                        <Grid item xs={3} sm={1}>
                            <Button onClick={() => this.handleRightButton()} variant="fab" color="primary"
                                    aria-label="right">
                                <MaterialIcon icon={'done'}/>
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </main>
        )
    };

    goToCard(goalCardIndex) {
        let possibleCardIndex;
        if (goalCardIndex < 0) {
            possibleCardIndex = this.props.currentCardRefs.length + goalCardIndex;
        } else {
            possibleCardIndex = goalCardIndex % this.props.currentCardRefs.length;
        }
        this.setState({
            currentCardRef: this.props.currentCardRefs[possibleCardIndex],
            currentCardKeyIndex: possibleCardIndex
        });
    }

    handlePageToggleButton(){
        let togglePage = ! this.state.backPage;
        this.setState({backPage: togglePage});
    }

    handleRightButton() {
        console.log('Please save right answered Card', this.state.currentCardRef)
        this.goToCard(this.state.currentCardKeyIndex + 1);
    }

    handleFalseButton() {
        console.log('Please save false answered Card', this.state.currentCardRef)
        this.goToCard(this.state.currentCardKeyIndex + 1);
    }

    static getDerivedStateFromProps(props, state) {
        if (props.currentCardRefs.length > 0) {
            console.log('ja');
            let cardRef = props.currentCardRefs[0];
            state = {currentCardRef: cardRef, currentCardKeyIndex: 0, backPage: false};
        } else {
            state = {currentCardRef: undefined, currentCardKeyIndex: undefined, backPage: false};
        }
        return state;
    }


}

LearningContentComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LearningContentComponent)
