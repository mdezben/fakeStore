import { StyleSheet, Text, View, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import Boton from '../app-temp/components/Boton';

const index = () => {
    const ruta = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    };

    const handleLogin = () => {
        if (username && validatePassword(password)) {
            Alert.alert('Success', 'Login successful');
            ruta.push('./(tabs)/'); // Redirige a las pestañas después del login
        } else {
            Alert.alert('Error', 'Invalid username or password');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Login...</Text>
            <TextInput
                style={styles.input}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Boton onPress={handleLogin} titulo='Login' />
        </View>
    );
};

export default index;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EDE0D4',
        alignItems: 'center',
        justifyContent: 'center',
    },
    titulo: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#4B2E1E',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        height: 40,
        borderColor: '#4B2E1E',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
});