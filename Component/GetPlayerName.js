
import React from 'react'
import {View, TextInput, Button, Text, FlatList, Alert, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';


class GetPlayerName extends React.Component {

    constructor(props) {
        super(props);
        this.numberOfPlayerText = "";
        this.state = {
            textInput: [],
            playerName: []
        }
    }

    setNumberOfPlayerText = (text) => {

        if (Number.parseInt(text) > 100) {
            alert("erreur nombre de joueur trop élevé");
            return
        }

        let textInput = this.state.textInput;
        let playerName = this.state.playerName;

        textInput.length = 0;

        if (isNaN(Number.parseInt(text))) {
            playerName.length = 0;
        } 
        
        else playerName.length = Number.parseInt(text);

        for (let i = 0; i<playerName.length; i++) {
            playerName[i] = {nom:"", index:{i}};
        }

        this.setState({ textInput:textInput, playerName:playerName })

        for (let key = 0; key < Number.parseInt(text); key++) {
            this.addTextInput(key);
        }
    }
    
    addTextInput = (key) => {
        let textInput = this.state.textInput;
        let str = "joueur " + key;
        textInput.push(<TextInput style={styles.textInputPlayerName} 
            key={key} placeholder={str} onChangeText={(text) => this.addDataToArray(text, key)} />);
        this.setState({ textInput:textInput })
    }
    
    addDataToArray = (text, key) => {
        let playerName = this.state.playerName;

        if (playerName.length === 0 || playerName.length <= key) {
            playerName.length = key;
            playerName.push({nom:text, index:key});
        }
        else {
            playerName[Number.parseInt(key)] = {nom:text, index:key};
        }
    
        this.setState({playerName: playerName});
    }

    render() {
        return(
            <ScrollView style={{backgroundColor:'#0080FE', flex:1}}>
                <View style={styles.centerView}>
                    <TextInput style={styles.textInputNbPlayer}
                    placeholder="Nombre de joueur"
                    placeholderTextColor='white'
                    keyboardType="numeric"
                    onChangeText={(text) => this.setNumberOfPlayerText(text)}/>
                    <View style={{flex:1}}>
                        {this.state.textInput.map((value, index) => {
                            return value
                        })}
                    </View>
                    
                    <TouchableOpacity
                    style={styles.buttonStyle}
                    title="validation"
                    onPress={() => {
                        let playerName = this.state.playerName;
                        if (playerName.length < 2) {
                            alert("Vous avez besoin d'au moins 2 joueurs pour jouer")
                        }
                        else {
                            Alert.alert(
                                'Confirmation',
                                'Etes-vous sûr ?',
                                [
                                    {text:'Oui', onPress: () => {
                                        this.props.navigation.replace('PlayerPage', 
                                            {playerName:this.state.playerName, numberOfPlayer:this.numberOfPlayerText});
                                    }},
                                    {text:'annuler', onPress: () => {}},
                                ]
                            )
                            this.props.navigation.replace('PlayerPage', 
                                            {playerName:this.state.playerName, numberOfPlayer:this.numberOfPlayerText});
                        }
                        
                    }}
                    >
                        <Text style={{color:'white'}}>Valider</Text>
                    </TouchableOpacity>
                </View>
                
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    centerView: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonStyle: {
        backgroundColor:'#003151',
        borderRadius:8,
        width:150,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:20,
    },
    textInputNbPlayer: {
        marginBottom:20, 
        textAlign:'center', 
        color:'white', 
        marginTop:30,
        borderRadius:8,
        borderWidth:2,
        height: 30,
        width:150,
        backgroundColor:'#0F52BA',
        //borderColor:'yellow'
    },
    textInputPlayerName: {
        height:40,
        width:225,
        marginBottom:20,
        borderWidth:2,
        borderRadius:8,
        backgroundColor:'white',
        textAlign:'center',
    }
})


export default GetPlayerName