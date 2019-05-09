/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, Alert, View, Image, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import {Theme, Colors} from "./theme/Theme";
import OptionButton from "./components/OptionButton";
import rock from './assets/images/rock.png';
import paper from './assets/images/paper.png';
import scissors from './assets/images/scissors.png';
import {GameHelper, OPTIONS, RESULT} from "./helpers/GameHelper";
import Score from "./components/Score";


type Props = {};
export default class App extends Component<Props> {

    state = {
        playerScore: 0,
        computerScore: 0
    };

    //------------------------------------------------------------ LIFECYCLE


    //------------------------------------------------------------ RENDERERS

    render() {
        const {computerChoice, result, playerChoice, playerScore, computerScore} = this.state;


        return (
            <TouchableWithoutFeedback style={styles.container} onPress={this.onResetGame}>
                <View style={{flex: 1}}>
                    <View style={styles.section}>
                        <Text style={[styles.message, {color: Colors.computerColor}]}>Ordinateur</Text>
                        {this.renderOption(computerChoice, -1, false)}
                    </View>
                    <Score computerScore={computerScore} playerScore={playerScore}/>
                    {playerChoice ? this.renderResult() : this.renderOptionSelect()}
                </View>
            </TouchableWithoutFeedback>
        );
    }

    renderResult = () => {
        const {result, playerChoice} = this.state;
        return <View style={styles.section}>
            <Text style={styles.message}>{GameHelper.getResultMessage(result)}</Text>
            {this.renderOption(playerChoice, -1, true)}
        </View>
    };

    renderOptionSelect = () => {
        return <View style={styles.section}>
            <Text style={styles.message}>Que choisissez-vous ?</Text>
            <View style={{flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'center'}}>
                {OPTIONS.map(this.renderOption)}
            </View>
        </View>
    };

    renderOption = (o, index, isPlayer = false) => {
        return <OptionButton key={'option' + index} option={o} style={isPlayer && {backgroundColor: Colors.playerColor}}
                             onPress={() => isPlayer && this.onPressImageButton(o)}></OptionButton>;
    };


    //------------------------------------------------------------ HANDLERS

    onPressImageButton = (playerChoice) => {
        if (!this.state.result) {
            let {computerScore, playerScore} = this.state;
            const computerChoice = GameHelper.generateComputerChoice();
            console.log('********************************* Computer choice ' + computerChoice.id);
            const result = GameHelper.calculateWhoWins(playerChoice, computerChoice);
            switch (result) {
                case RESULT.playerLost:
                    computerScore++
                    break;
                case RESULT.playerWon:
                    playerScore++
                    break;
            }
            this.setState({computerChoice, result, playerChoice, computerScore, playerScore});
        } else {
            this.onResetGame();
        }
    };

    onResetGame = () => {
        if (this.state.result) {
            this.setState({computerChoice: null, result: null, playerChoice: null});
        }
    };

    //------------------------------------------------------------ PRIVATES




}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    section: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    message: {
        fontSize: 30,
        textAlign: 'center',
        margin: 10,
    }
});
