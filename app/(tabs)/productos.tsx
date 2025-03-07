import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';

const ProductsScreen = () => {
    const { category } = useLocalSearchParams();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (category) {
            fetch(`https://fakestoreapi.com/products/category/${category}`)
                .then(response => response.json())
                .then(data => setProducts(data));
        }
    }, [category]);

    return (
        <View style={{ padding: 20 }}>
            <FlatList
                data={products}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => router.push(`/producto/${item.id}`)}>
                        <View style={{ padding: 10, borderBottomWidth: 1 }}>
                            <Text style={{ fontSize: 18 }}>{item.title}</Text>
                            <Text>${item.price}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default ProductsScreen;