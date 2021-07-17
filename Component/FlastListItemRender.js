import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DataTable } from 'react-native-paper';


class FlatListItemRender extends React.Component {
    constructor(props) {
        super(props);
        this.listPlayer = this.props.player;
        this.index = this.props.index;
        this.state = {};
        this.ranks = [];

        this.nOfPlayPlayer = [];
        this.rankPlayer();

        

        this.tableHeader = [];
        this.generateHeader();

        this.tableRow = [];

        this.generateRow();


    }


    rankPlayer() {
        for (let i = 0; i<this.listPlayer.length; i++) {
            this.ranks.push([this.listPlayer[i].username]);
            this.nOfPlayPlayer.push(<Text style={{margin:5}}>{this.listPlayer[i].username}: {this.listPlayer[i].nOfPlay}</Text>);
            for (let j = 0; j<this.listPlayer.length; j++) {
                if (Number.parseInt(this.listPlayer[i].nOfPlay) < Number.parseInt(this.listPlayer[j].nOfPlay)) this.ranks[i].push(1);
                else if (Number.parseInt(this.listPlayer[i].nOfPlay) > Number.parseInt(this.listPlayer[j].nOfPlay))  this.ranks[i].push(-1);
                else this.ranks[i].push(0);
                
            }

        }
    }

    generateHeader() {
        for (let index = 0; index < this.listPlayer.length; index++) {
            this.tableHeader.push(<DataTable.Title style={styles.dataTableHeaderStyle}>{this.listPlayer[index].username}</DataTable.Title>);
            
        }
    }

    generateRow() {

        for (let i = 0; i< this.ranks.length; i++) {
            let t = []
            for (let j = 0; j < this.ranks[i].length; j++) {
                if (j == 0) t.push(<DataTable.Cell>{this.ranks[i][j]}</DataTable.Cell>);
                else t.push(<DataTable.Cell style={styles.dataTableCellStyle}>{this.ranks[i][j]}</DataTable.Cell>);
            }

            this.tableRow.push(<DataTable.Row style={{backgroundColor: '#FCD12A'}}>{t.map((value, index) => {return value})}</DataTable.Row>)
        }

    }

    render() {
        return(
            <View elevation={5} style={styles.viewBoxStyle}>
                <DataTable>
                    <DataTable.Header style={{backgroundColor: '#FCD12A'}}>
                        <DataTable.Title></DataTable.Title>
                        {this.tableHeader.map((value, index) => {return value})}
                    </DataTable.Header>
                    {this.tableRow.map((value, index) =>{return value})}
                </DataTable>
                <View style={{flexDirection:'row'}}>
                    <View style={{borderWidth:1, backgroundColor:'white', alignSelf:'flex-start', width:120}}>
                        <View style={{marginleft:0, marginTop:0}}>
                            <Text style={{fontFamily:'bold', fontSize:15, textDecorationLine: 'underline'}}>Coups:</Text>
                        </View>
                        <View style={{flexDirection:'column', marginTop:0, marginLeft:0, marginBottom:0}}>
                            {this.nOfPlayPlayer.map((value, index) => {return value})}
                        </View>
                    </View>
                    <View style={{justifyContent:'center', alignItems:'center'}}>
                        <Text style={{fontSize:40, color:'red', fontStyle: 'italic', fontFamily:'bold'}}>Trou n'{this.index + 1}</Text>
                    </View>
                </View>
                
                
            </View>
            
 
        );
    }
}

const styles = StyleSheet.create({
    viewBoxStyle: {
        borderWidth:1,
        alignContent:'center',
        justifyContent:'center',
        margin:20,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        backgroundColor:'green'
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
})


export default FlatListItemRender;