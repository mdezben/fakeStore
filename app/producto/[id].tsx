import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

const ProductDetailScreen = () => {
    const { id } = useLocalSearchParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (id) {
            fetch(`https://fakestoreapi.com/products/${id}`)
                .then(response => response.json())
                .then(data => setProduct(data));
        }
    }, [id]);

    if (!product) return <Text>Loading...</Text>;

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{product.title}</Text>
            <Text>{product.description}</Text>
            <Text>Price: ${product.price}</Text>
            <Text>Category: {product.category}</Text>
        </View>
    );
};

export default ProductDetailScreen;