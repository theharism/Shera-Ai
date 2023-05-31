import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';

const ChatHomeItem = ({title,title1,title2}) => {
  const button = (title) => {
    return (
      <TouchableOpacity style={styles.item}>
        <Text style={styles.textStyle}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <Card mode="outlined" style={styles.card}>
      <Card.Title 
        title="Write an Email"
        titleStyle={styles.Title}
        left={() => <MaterialCommunityIcons name="email-outline" size={24} color="#7f7f7f" />}
        leftStyle={styles.leftStyle} />
      <Card.Content>
        {button(title1)}
        {button(title2)}
      </Card.Content>
    </Card>
  );
};

export default ChatHomeItem;

const styles = StyleSheet.create({
  card: {
    borderColor: '#1c1c1e',
    backgroundColor: '#000000',
    margin: 5
  },
  Title: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: '#7f7f7f'
  },
  textStyle:{
    color:'#FFFFFF',
    alignSelf:'center',
    fontSize:15
  },
  item:{
    backgroundColor:'#1c1c1e',
    height:60,
    borderRadius:10,
    marginTop:0,
    marginHorizontal:5,
    marginBottom:5,
    justifyContent:'center'
  },
  leftStyle:{
    position:'absolute',
    left:100,
    bottom:19    
  }
});
