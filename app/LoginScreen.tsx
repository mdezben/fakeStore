import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text } from 'react-native';
import { router } from 'expo-router';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const validatePassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    };

    const handleLogin = () => {
        if (username && validatePassword(password)) {
            Alert.alert('Success', 'Login successful');
            router.replace('/(tabs)'); // Redirige a las pestañas después del login
        } else {
            Alert.alert('Error', 'Invalid username or password');
        }
    };

    return (
        <View style={{ padding: 20 }}>
            <Text>Username:</Text>
            <TextInput
                value={username}
                onChangeText={setUsername}
                placeholder="Enter username"
                style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
            />
            <Text>Password:</Text>
            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Enter password"
                secureTextEntry
                style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
};

export default LoginScreen;