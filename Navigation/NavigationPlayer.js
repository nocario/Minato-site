import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GetPlayerName from '../Component/GetPlayerName';
import PlayerPage from '../Component/PlayerPage';
import DetailPage from '../Component/DetailPage';

const Stack = createStackNavigator();


class NavigationPlayer extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <NavigationContainer>
                <Stack.Navigator >
                    <Stack.Screen name="GetPlayerName" component={GetPlayerName} options={{title:'Nouvelle partie', headerStyle: {
                        backgroundColor:'#1134A6',
                    },
                    headerTitleStyle: {
                        color:'white',
                        alignSelf:'center'
                    }}}/>
                    <Stack.Screen name="PlayerPage" component={PlayerPage} options={{title:'Score', headerStyle: {
                        backgroundColor:'#1134A6',
                    },
                    headerTitleStyle: {
                        color:'white',
                        alignSelf:'center'
                    }
                    }}/>
                    <Stack.Screen name='DetailPage' component={DetailPage} options={{title:'Details', headerStyle:{
                        backgroundColor:'#1134A6',
                    },
                    headerTitleStyle: {
                        color:'white',
                        alignSelf:'center'
                    }
                    }} />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }

}

export default NavigationPlayer;