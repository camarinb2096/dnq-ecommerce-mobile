import React, { useState, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text, Image, StyleSheet, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { getProducts } from '../service/productService';
import Animated, { FadeInLeft } from 'react-native-reanimated';

const HomeScreen = ({ route, navigation }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await getProducts();
            setProducts(response.data); // Acceder a la propiedad 'data'
            setFilteredProducts(response.data); // Inicializar los productos filtrados
        };
        fetchData();
    }, []);

    const handleSearch = (text) => {
        setSearch(text);
        if (text) {
            const filtered = products.filter((item) =>
                item.name.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(products);
        }
    };

    const navigateToProduct = (id) => {
        navigation.navigate('Product', { productId: id });
    };

    return (
        <View style={styles.container}>
            {/* Encabezado con Logo y Barra de Búsqueda */}
            <View style={styles.header}>
                <Image
                    source={require('../../assets/favicon.png')} // Cambia la ruta según tu proyecto
                    style={styles.logo}
                    resizeMode="contain"
                />
                <View style={styles.searchContainer}>
                    <AntDesign name="search1" size={20} color="#aaa" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Buscar productos..."
                        value={search}
                        onChangeText={handleSearch}
                    />
                </View>
            </View>

            {/* Lista de Productos */}
            <FlatList
                data={filteredProducts}
                renderItem={({ item }) => (
                    <Animated.View entering={FadeInLeft.delay(300).duration(800)} style={styles.animatedView}>
                        <TouchableOpacity
                            style={styles.card}
                            onPress={() => navigateToProduct(item.id)}
                        >
                            {/* Imagen del Producto */}
                            <View style={styles.imageContainer}>
                                <Image
                                    source={{ uri: item.image }}
                                    style={styles.productImage}
                                    resizeMode="cover"
                                />
                                {/* Nombre del Producto */}
                                <Text style={styles.productName}>{item.name}</Text>
                            </View>

                            {/* Detalles del Producto */}
                            <View style={styles.productDetails}>
                                <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
                            </View>
                        </TouchableOpacity>
                    </Animated.View>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        flex: 1,
    },
    header: {
        width: '100%',
        paddingVertical: 10,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        alignItems: 'center',
    },
    logo: {
        width: 120, // Ajusta el tamaño del logo
        height: 40,
        marginBottom: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        width: '90%',
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        height: 40,
        fontSize: 16,
    },
    animatedView: {
        flex: 1,
        alignSelf: 'stretch',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
        marginBottom: 16,
        overflow: 'hidden',
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: 180,
    },
    productImage: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
    },
    productName: {
        position: 'absolute',
        bottom: 10,
        left: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 5,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#000',
    },
    productDetails: {
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    productPrice: {
        fontSize: 18,
        fontWeight: '600',
        color: '#4CAF50',
    },
});

export default HomeScreen;
