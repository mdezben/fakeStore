import { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View, Alert } from "react-native";
import { useRouter } from 'expo-router';

export default function Login() {
    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const ruta = useRouter();

    // Función para validar la contraseña
    const validarPassword = (password) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    };

    // Función para manejar el login
    const handleLogin = () => {
        if (!validarPassword(password)) {
            Alert.alert("Error", "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial");
        } else { 
            Alert.alert("Éxito", "Acceso concedido", [
                {
                    text: "OK",
                    onPress: () => ruta.push('/(tabs)/about')
                }
            ]);
        }
    };

    return (
        <View style={estilos.container}>
            <Text style={estilos.titulo}>Login</Text>
            <Text style={estilos.labels}>Usuario</Text>
            <TextInput
                placeholder="Usuario"
                style={estilos.cajas}
                value={usuario}
                onChangeText={setUsuario}
            />
            <Text style={estilos.labels}>Password</Text>
            <TextInput
                placeholder="Password"
                style={estilos.cajas}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Entrar" color={'#D10078'} onPress={handleLogin} />
        </View>
    );
}

const estilos = StyleSheet.create({
    titulo: {
        fontSize: 30,
        color: '#D10078',
        fontWeight: 'bold',
        alignSelf: 'center'
    },
    container: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'stretch',
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    labels: {
        fontSize: 15,
        fontWeight: '700',
        color: '#D10078'
    },
    cajas: {
        borderWidth: 3,
        borderRadius: 7,
        borderColor: '#D10078',
        padding: 10,
        marginVertical: 10
    }
});

