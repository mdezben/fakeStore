import { ActivityIndicator, FlatList, StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';

const settings = () => {
    const { category } = useLocalSearchParams();
    const [productos, setProductos] = useState<any[]>([]);
    const [cargando, setCargando] = useState<boolean>(true);

    useEffect(() => {
        const cargarProductos = async () => {
            setCargando(true);
            try {
                const respuesta = await fetch('https://fakestoreapi.com/products');
                if (!respuesta.ok) {
                    throw new Error(`Error al conectar con la fuente de datos: ${respuesta.status}`);
                }
                const datos = await respuesta.json();

                // Filtrar productos por categoría
                const productosFiltrados = datos.filter((item: any) => item.category === category);
                setProductos(productosFiltrados);
                setCargando(false);
            } catch (error) {
                console.log('Error durante la obtención de datos', error);
            }
        };
        cargarProductos();
    }, [category]);

    const PantallaCarga = () => (
        <View style={styles.loadscreen}>
            <Text style={styles.titulo}>Cargando Productos...</Text>
            <ActivityIndicator />
        </View>
    );

    const PantallaProductos = () => (
        <View style={styles.loadscreen}>
            <Text style={styles.titulo}>Productos de {category}</Text>
            <FlatList 
                data={productos}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        {/* Mostrar la imagen del producto */}
                        <Image 
                            source={{ uri: item.image }} 
                            style={styles.imagenProducto} 
                            resizeMode="contain"
                        />
                        <Text style={styles.textoProducto}>{item.title}</Text>
                        <Text style={styles.textoPrecio}>${item.price}</Text>
                    </View>
                )}
                keyExtractor={(item) => item.id.toString()}
                style={styles.flatlist}
            />
        </View>
    );

    return <View style={styles.container}>{cargando ? PantallaCarga() : PantallaProductos()}</View>;
};

export default settings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: 'white',
        padding: 20,
        margin: 10,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 5,
        width: '90%',
        alignItems: 'center',
    },
    flatlist: {
        width: '100%',
    },
    loadscreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titulo: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    textoProducto: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
        textAlign: 'center', // Centrar el texto
    },
    textoPrecio: {
        fontSize: 16,
        color: 'green',
        marginTop: 5,
        textAlign: 'center', // Centrar el texto
    },
    imagenProducto: {
        width: 150, // Ajusta el ancho de la imagen
        height: 150, // Ajusta el alto de la imagen
        borderRadius: 10, // Bordes redondeados para la imagen
    },
});