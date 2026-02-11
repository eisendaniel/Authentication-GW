import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { StyleSheet, View } from 'react-native';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import Header from './src/components/header';
import Navigator from './src/components/navigation/Navigator';


export default function App() {

  const navigation = useNavigationContainerRef();
  const [active, setActive] = useState("Dashboard");


  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>

        <NavigationContainer          
          ref={navigation}
          onReady={() => setActive(navigation.getCurrentRoute()?.name ?? "Dashboard")}
          onStateChange={() => setActive(navigation.getCurrentRoute()?.name ?? "Dashboard")}
       
        >

           <View style={{ flex: 1 }}>
           <Header navigationRef={navigation} active={active} />
             <View style={{ flex: 1 }}><Navigator/></View>
           </View>

        </NavigationContainer>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
});
