import React, { Component } from 'react'
import { Text, View } from 'react-native'

 const Todo =({title="default value"})=> {
    
        return (
            <View>
                <Text> {title}  </Text>


            </View>
        )
    
}


export default Todo