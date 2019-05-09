import {Text, StyleSheet, TouchableOpacity, Image} from "react-native";
import React, {Component} from 'react';
import {Colors} from "../theme/Theme";
import type {Option} from "../helpers/GameHelper";

type Props = {
    option: Option,
    onPress: Function
};

export default class OptionButton extends Component<Props> {

    constructor() {
        super();
    }

    render() {
        const {option, onPress, style} = this.props;
        return (<TouchableOpacity style={[styles.option, style]} onPress={onPress}>
            {option ? <Image style={styles.optionImg} source={option.img}></Image> : <Text style={{fontSize:45, fontWeight: 'bold', color:Colors.white}}>?</Text>}
        </TouchableOpacity>);
    }

}

const styles = StyleSheet.create({
    option: {
        margin: 10,
        textAlign: 'center',
        color: '#FFF',
        marginBottom: 5,
        width: 80,
        height: 80,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.computerColor
    },
    optionImg:{
        width: 60,
        height: 60,
    }
});