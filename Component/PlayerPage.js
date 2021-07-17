import React from 'react';
import {View, TextInput, Text, FlatList, Alert, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import { DataTable } from 'react-native-paper';



class PlayerPage extends React.Component {
    constructor(props) {
        super(props);
        this.playerName = this.props.route.params.playerName;
        this.playerScore = [];
        this.state = {
            textInput: [],
            dataInput: [],
            dataGame:[],
          }

        this.currentRanks = [];
        this.ranks = [];
        this.tableRow = [];

        this.tableHeader = [];
        this.generateHeader(); 
    }

    rankPlayer(player) {
        this.ranks = [];
        for (let i = 0; i<player.length; i++) {
            this.ranks.push([player[i].username]);
            for (let j = 0; j<player.length; j++) {
                if (Number.parseInt(player[i].nOfPlay) < Number.parseInt(player[j].nOfPlay)) this.ranks[i].push(1);
                else if (Number.parseInt(player[i].nOfPlay) > Number.parseInt(player[j].nOfPlay))  this.ranks[i].push(-1);
                else this.ranks[i].push(0);
                
            }

        }
        if (this.currentRanks.length === 0) this.currentRanks = this.ranks;
        else {
            for (let i = 0; i < this.ranks.length; i++) {
                for (let j = 1; j < this.ranks[i].length; j++) {
                    this.currentRanks[i][j] += this.ranks[i][j];
                }
            }
        }
    }

    generateHeader() {
        for (let index = 0; index < this.playerName.length; index++) {
            this.tableHeader.push(<DataTable.Title style={styles.dataTableHeaderStyle}>{this.playerName[index].nom}</DataTable.Title>);
            
        }
    }

    generateRow() {
        this.tableRow = [];
        for (let i = 0; i< this.currentRanks.length; i++) {
            let t = []
            for (let j = 0; j < this.currentRanks[i].length; j++) {
                if (j===0) t.push(<DataTable.Cell style={{}}>{this.currentRanks[i][j]}</DataTable.Cell>);
                else t.push(<DataTable.Cell style={styles.dataTableCellStyle}>{this.currentRanks[i][j]}</DataTable.Cell>);
            }
            this.tableRow.push(<DataTable.Row 
                style={{backgroundColor:'#FCD12A'}}>
                    {t.map((value, index) => {return value})}
                    </DataTable.Row>)
        }

    }

    componentDidMount() {
        this._initTextInput();
    }

    _initTextInput() {
        for (let i = 0; i<this.playerName.length; i++) {
            this.addTextInput(i);
        }
    }


    addTextInput = (key) => {
        let textInput = this.state.textInput;
        textInput.push(<View style={{flexDirection:'column'}}><Text style={{fontFamily:'bold', fontSize:20}}>{this.playerName[key].nom}</Text>
        <TextInput 
        keyboardType="numeric" placeholder='nombre de coups' style={{borderRadius:8, borderWidth:2, height:40, width:225,backgroundColor:'white', textAlign:'center', marginBottom:20}} 
        key={key} onChangeText={(text) => {
            this.addDataToArray(text, key); 
        }} /></View>);
        this.setState({ textInput:textInput})
    }


    addDataToArray = (text, key) => {
        let dataInput = this.state.dataInput;
        if (dataInput.length === 0 || dataInput.length <= key) {
            dataInput.length = key;
            dataInput.push({id:key, username:this.playerName[Number.parseInt(key)].nom, nOfPlay:text});
        }
        else {
            dataInput[Number.parseInt(key)] = {id:key, username:this.playerName[Number.parseInt(key)].nom, nOfPlay:text};
        }
    
        this.setState({dataInput:dataInput});
    }

    render() {
        
        return(
            <ScrollView style={{backgroundColor:'#0080FE', flex:1}}>
                <View>
                    <TouchableOpacity >
                        <DataTable style={styles.dataTableStyle}>
                            <DataTable.Header style={{backgroundColor: '#FCD12A'}}>
                                <DataTable.Title></DataTable.Title>
                                {this.tableHeader.map((value, index) => {return value})}
                            </DataTable.Header>
                            {this.tableRow.map((value, index) =>{return value})}
                        </DataTable>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('DetailPage', {dataGame:this.state.dataGame});
                    }}
                     style={styles.detailButton}>
                        <Text style={{color:'white'}}>Détails</Text>
                    </TouchableOpacity>
                    <View style={styles.centerView}>
                        <View style={{flexDirection:'column'}}>
                                {this.state.textInput.map((value, index) => {
                                    return value;
                                })}
                            <View style={{flexDirection:'row'}}>
                                {/*this.playerName.map((value, index) => {return <Text>{value.nom}</Text>})*/}
                                
                            </View>
                            {/*mettre les noms d'un cotés, les textinput de l'autres*/ }
                        </View>
                        {/*this.state.textInput.map((value, index) => {
                            return value;
                        })*/}
                        <TouchableOpacity
                        style={styles.buttonStyle}
                        onPress={() => {
                            let dataGame = this.state.dataGame;
                            let t = [...this.state.dataInput];
                            if (t.length < this.playerName.length) {
                                alert('Veuillez rentrer des valeurs numérique uniquement');
                                return;
                            }
                            for (let i = 0; i < t.length; i++) {
                                try {
                                    if (!t[i].nOfPlay.match(/^[0-9]+$/)) {
                                        alert('Veuillez rentrer des valeurs numérique uniquement');
                                        return;
                                    }
                                } catch (error) {
                                    alert('Veuillez rentrer des valeurs numérique uniquement');
                                    return;
                                }
                                
                            }
                            
                            dataGame.push(t);
                            this.rankPlayer(dataGame[dataGame.length - 1])
                            this.generateRow();
                            this.setState({dataGame:dataGame});
                            alert('Scores modifiés')
                            
                        }}>
                            <Text style={{color:'white'}}>Valider</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
                
            </ScrollView>
            
        );
    }
}

const styles = StyleSheet.create({
    dataTableStyle: {
        borderWidth:1,
        marginTop:30,
    },
    centerView: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    dataTableCellStyle: {
        borderWidth:1, 
        justifyContent:'center',
        alignItems:'center', 
        backgroundColor:'white'
    },
    dataTableHeaderStyle: {
        justifyContent:'center',
        alignItems:'center',
        
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
    detailButton: {
        alignSelf:'flex-end',
        backgroundColor:'#003151',
        borderRadius:8,
        width:100,
        height:40,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:30,
        marginTop:10,

    }
})

export default PlayerPage;

/*({ item }) => <Text style={{marginBottom:20}}>{item.map((value, index) => {
                    return <Text key={index}>{value.username}: {value.nOfPlay}{"\n"}</Text>
                })}</Text>*/
