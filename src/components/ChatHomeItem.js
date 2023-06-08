import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';

const ChatHomeItem = ({title,title1,title2,setMessage}) => {
  const button = (title) => {
    return (
      <TouchableOpacity style={styles.item} onPress={()=>setMessage(title)}>
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
      <Card.Content style={styles.content}>
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
    marginHorizontal: 8,
    marginVertical:10,
    height:180
  },
  Title: {
    alignSelf: 'center',
    //fontWeight: 'bold',
    fontSize: 16,
    bottom:5,
    color: '#7f7f7f',
    fontFamily:'JosefinSans-Medium'
  },
  textStyle:{
    color:'#FFFFFF',
    alignSelf:'center',
    fontSize:15,
    fontFamily:'JosefinSans-Medium'
  },
  item:{
    backgroundColor:'#1c1c1e',
    height:50,
    borderRadius:10,
    marginVertical:5,
    justifyContent:'center'
  },
  leftStyle:{
    position:'absolute',
    left:95,
    bottom:21 
  },
  content:{
    bottom:17
  }
});
