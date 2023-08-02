import { View, Text, StyleSheet } from 'react-native'

export default function App(){
  return (
    <View style={styles.container}> 
      <Text style={styles.title}>Meu primeiro App</Text>
      <Nome nome="Matheus Fraga"/>
      <Nome nome="Lucas Silva"/>
      <Nome nome="Henrique Silva"/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 400
  },
  title:{
    fontSize: 24,
    marginTop: 100
  }
})

function Nome({nome}){
  return (
    <Text>Olá, {nome}</Text>
  )
}