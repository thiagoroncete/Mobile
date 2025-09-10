import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function SplashScreen({ navigation }: any) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("MainDrawer");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.center}>
      <Image
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/pt/a/ac/CRVascodaGama.png",
        }}
        style={styles.logo}
        resizeMode="contain"
      />
      <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
      <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
        Carregando...
      </Text>
    </View>
  );
}

function HomeScreen() {
  return (
    <View style={styles.center}>
      <Text style={styles.text}>Tela Home</Text>
    </View>
  );
}

function TitulosScreen() {
  return (
    <View style={styles.center}>
      <Text style={styles.text}>2026 Vem Ai!!!</Text>
      <Image
        source={{
          uri: "https://upload.wikimedia.org/wikipedia/pt/a/ac/CRVascodaGama.png",
        }}
        style={styles.logo}
        resizeMode="contain"
      />
      <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
      <Text style={{ marginTop: 10, fontSize: 18, fontWeight: "bold" }}>
        Carregando...
      </Text>
    </View>
    
  );
}

function HomeTab() {
  return (
    <Tab.Navigator initialRouteName="HomeTab">
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ title: "Home" }} />
      <Tab.Screen name="PerfilTab" component={TitulosScreen} options={{ title: "Titulos" }} />
    </Tab.Navigator>
  );
}

function TitulosTab() {
  return (
    <Tab.Navigator initialRouteName="PerfilTab">
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ title: "Home" }} />
      <Tab.Screen name="PerfilTab" component={TitulosScreen} options={{ title: "Titulos" }} />
    </Tab.Navigator>
  );
  
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeTab} />
      <Drawer.Screen name="Titulos" component={TitulosTab} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="MainDrawer" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  logo: {
    width: 150,
    height: 150,
  },
});
