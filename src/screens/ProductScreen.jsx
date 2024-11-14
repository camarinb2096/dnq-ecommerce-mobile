import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';

import { getProductById } from '../service/productService';

const ProductScreen = ({ route, navigation }) => {
    const { productId } = route.params;
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getProductById(productId);
            setProduct(response.data);
        };
        fetchData();
    }, [productId]);

    return (
        <View style={{ backgroundColor: '#dfe6ec', flex: 1, paddingHorizontal: 20, paddingVertical: 30 }}>
            {/* Botón para regresar */}
            <TouchableOpacity
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 16,
                }}
                onPress={() => navigation.goBack()}
            >
                <AntDesign name="arrowleft" size={24} color="#797979" />
                <Text style={{ fontSize: 16, color: '#797979', marginLeft: 8 }}>Regresar</Text>
            </TouchableOpacity>

            <Animated.View entering={FadeInDown.delay(500).duration(1000)} style={{ flex: 1 }}>
                {product && (
                    <View style={{ flex: 1 }}>
                        {/* Contenedor del Producto */}
                        <View style={{ flex: 1, backgroundColor: '#FFF', marginVertical: 8, borderRadius: 10, padding: 30 }}>
                            <Text style={{ fontSize: 18, fontWeight: '600', color: '#333', textAlign: 'center', marginBottom: 8 }}>
                                {product.name}
                            </Text>
                            <Image
                                style={{ width: '100%', height: 250, resizeMode: 'contain', borderRadius: 10 }}
                                source={{ uri: product.image }}
                            />
                            <Text style={{ fontSize: 14, fontWeight: '400', marginTop: 16, color: '#555', textAlign: 'center' }}>
                                {product.description}
                            </Text>
                            <Text style={{ fontSize: 18, fontWeight: '600', color: '#71acf5', textAlign: 'center', marginTop: 16 }}>
                                {'$' + product.price.toFixed(2)}
                            </Text>
                            <Text style={{ fontSize: 14, fontWeight: '400', color: '#555', textAlign: 'center', marginTop: 8 }}>
                                Disponible: {product.quantity} {product.quantity > 1 ? 'unidades' : 'unidad'}
                            </Text>
                        </View>

                        {/* Botón de Compra */}
                        <TouchableOpacity
                            style={{
                                padding: 12,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#FF0000', // Botón rojo
                                borderWidth: 0,
                                marginTop: 8,
                                borderRadius: 10,
                            }}
                            onPress={() => {
                                console.log('Compra realizada');
                            }}
                        >
                            <Text style={{ fontSize: 16, fontWeight: '600', color: '#FFF' }}>Comprar Ahora</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Animated.View>
        </View>
    );
};

export default ProductScreen;
