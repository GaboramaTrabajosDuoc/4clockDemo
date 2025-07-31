import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function Footer() {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingVertical: 10,
        borderWidth: 2,
        borderColor: 'red',
        backgroundColor: '#f8f8f8',
        paddingTop: 25,
        paddingBottom: 23        
      }}
      className='py-1 text-center text-xl font-bold'
    >
      <TouchableOpacity onPress={() => console.log("TaskList")}>
        <Text style={{ fontSize: 16, borderWidth:2, borderColor: 'blue', paddingLeft:20, paddingRight:20, paddingTop:10 ,paddingBottom:10, borderRadius: 5}}>TaskList</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log("Habitmaker")}>
        <Text style={{ fontSize: 16, borderWidth:2, borderColor: 'green', paddingLeft:20, paddingRight:20, paddingTop:10 ,paddingBottom:10, borderRadius: 5}}>Habitmaker</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log("Calendar")}>
        <Text style={{ fontSize: 16, borderWidth:2, borderColor: 'orange', paddingLeft:20, paddingRight:20, paddingTop:10 ,paddingBottom:10, borderRadius: 5}}>Calendar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => console.log("Settings")}>
        <Text style={{ fontSize: 16, borderWidth:2, borderColor: 'purple', paddingLeft:20, paddingRight:20, paddingTop:10 ,paddingBottom:10, borderRadius: 5}}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
}
