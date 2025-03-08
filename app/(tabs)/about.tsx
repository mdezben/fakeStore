import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Boton from '../../app-temp/components/Boton';
import { useRouter } from 'expo-router';

const about = () => {
    const ruta = useRouter();

    // Estado para almacenar las categorías
    const [categorias, setCategorias] = useState<string[]>([]);
    const [Cargando, setCargando] = useState<boolean>(true);

    useEffect(() => {
        const CargaDatos = async () => {
            setCargando(true);
            try {
                const respuesta = await fetch('https://fakestoreapi.com/products');
                if (!respuesta.ok) {
                    throw new Error(`Error al conectar con la fuente de datos: ${respuesta.status}`);
                }
                const datos = await respuesta.json();

                // Extraemos las categorías únicas
                const categoriasUnicas = [...new Set(datos.map((item: any) => item.category))];
                setCategorias(categoriasUnicas);
                setCargando(false);
            } catch (error) {
                console.log('Error durante la obtención de datos', error);
            }
        };
        CargaDatos();
    }, []);

    // Pantalla de carga
    const UnLoadScreen = () => (
        <View style={styles.loadscreen}>
            <Text style={styles.titulo}>Cargando Datos...</Text>
            <ActivityIndicator />
        </View>
    );

    // Pantalla con las categorías
    const LoadScreen = () => (
        <View style={styles.loadscreen}>
            <Text style={styles.titulo}>Categorías</Text>
            <FlatList 
                data={categorias}
                renderItem={({ item }) => <CategoriaItem category={item} />}
                keyExtractor={(item, index) => index.toString()}
                style={styles.flatlist}
            />
        </View>
    );

    // Componente para mostrar cada categoría
    const CategoriaItem = ({ category }: { category: string }) => (
        <View style={styles.card}>
            <Text style={styles.textoCategoria}>{category}</Text>
            <Boton titulo="Ver Productos" onPress={() => ruta.push(`/settings?category=${category}`)} />
        </View>
    );    

    return <View style={styles.container}>{Cargando ? UnLoadScreen() : LoadScreen()}</View>;
};

export default about;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        backgroundColor: 'white',
        padding: 50, 
        margin: 10,  
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 3,
        elevation: 5,
        width: '90%', 
        alignItems: 'center',
        height: 150, 
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
    textoCategoria: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
