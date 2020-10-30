import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { StyleSheet, Text, View ,Dimensions,SafeAreaView,ScrollView, TextInput,Button} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import Todo from './Todo'

export default function App() {
  const [description,setDescription]=useState('');
  const [amount,setAmount]=useState('');
  const [total,setTotal]=useState(0);
  const [labels, setLabels] = useState([])
  const [dataPoints, setDataPoints] = useState([])
  const [gigs, setGigs] = useState([
  
    {
      description: "Freelance Job",
      amount: 499.03,
      date: new Date(),
    },
  ]);
  
  useEffect(() => {
    const total = gigs.reduce((total,gig)=>{
      return total +Number(gig.amount)
    },0);
    setTotal(total);
    
  }, [gigs]);
  // const addTodo=()=>{
  //   setTodos([input,...todos]);
  //   setInput('')
  // }
  const addGig=()=>{
    setGigs([...gigs, {
      description: description,
      amount: amount,
      timestamp:new Date()
    }]);
    setAmount('');
    setDescription('');
  }
  
   return (
     <SafeAreaView style={styles.container}>
       <View>
         <Text>Bar Chart</Text>
         <BarChart
           data={{
             labels: [
               "Mon",
               "Tues",
               "wed",
               "Thurs",
               "Fri",
               "sat",
             ],
             datasets: [
               {
                 data: [
                   gigs[0].amount
                 ],
               },
             ],
           }}
           width={Dimensions.get("window").width} // from react-native
           height={220}
           yAxisLabel="$"
           
           yAxisInterval={1} // optional, defaults to 1
           chartConfig={{
             backgroundColor: "#e26a00",
             backgroundGradientFrom: "green",
             backgroundGradientTo: "green",
             decimalPlaces: null, // optional, defaults to 2dp
             color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
             labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
             style: {
               borderRadius: 16,
             },
             propsForDots: {
               r: "6",
               strokeWidth: "2",
               stroke: "#ffa726",
             },
           }}
           bezier
           style={{
             marginVertical: 8,
             borderRadius: 16,
           }}
         />
       </View>
       <Text style={styles.title}>Total Income:{total}</Text>
       {/* view style={{width:50, height:50, backgroundColor:'steelblue'}}/>*/}
       {/*<ScrollView>
      {todos.map(todo=>(
        <Todo title={todo}/>
      ))}
      </ScrollView>*/}

       <TextInput
         style={styles.input}
         value={description}
         placeholder="enter description"
         onChangeText={(text) => setDescription(text)}
       />
       <TextInput
         style={styles.input}
         value={amount}
         keyboardType="numeric"
         placeholder="enter amount in $"
         onChangeText={(text) => setAmount(text)}
       />
       <Button
         disabled={!amount || !description}
         title="Add Gig"
         onPress={addGig}
       />
       {gigs.map((gig) => (
         <View>
           <Text>{gig.description}</Text>
           <Text>${gig.amount}</Text>
         </View>
       ))}
       <StatusBar style="auto" />
     </SafeAreaView>
   );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  
  },
  title:{
    fontSize: 50,
  },
  input:{
    height:40,
    borderColor:'red',
    borderWidth:1,
    marginBottom:20
  }
});
