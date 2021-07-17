import React from 'react';
import {View, TextInput, Text, FlatList, Alert, TouchableOpacity, StyleSheet, ScrollView} from 'react-native';
import { DataTable } from 'react-native-paper';
import FlatListItemRender from './FlastListItemRender';


class DetailPage extends React.Component {
    constructor(props) {
        super(props);
        this.data = this.props.route.params.dataGame;
        console.log(this.data)
        this.state = {
        }
    }

    render(){
        return(
            
            <View style={{backgroundColor:'#0080FE', flex:1}}>
                <FlatList
                style={{marginBottom:20}}
                key={this.data.length}    //pour update la flatlist
                data={this.data}
                renderItem={({item, index}) => <FlatListItemRender player={item} index={index}/>}
                keyExtractor={item => item.id}/>
            </View>
        );
    }
}


export default DetailPage;