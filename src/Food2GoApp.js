import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';

const restaurants = [
    { id: '1', name: 'Pizza Palace', menu: [{ name: 'Margherita Pizza', price: 10 }, { name: 'Pepperoni Pizza', price: 12 }] },
    { id: '2', name: 'Burger Haven', menu: [{ name: 'Cheeseburger', price: 8 }, { name: 'Veggie Burger', price: 9 }] },
    { id: '3', name: 'Sushi World', menu: [{ name: 'Salmon Roll', price: 15 }, { name: 'Tuna Roll', price: 14 }] },
];

const Food2GoApp = () => {
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const [cart, setCart] = useState([]);

    const addToCart = (item) => {
        setCart([...cart, item]);
    };

    const checkout = () => {
        alert(`Order placed! Total: $${cart.reduce((total, item) => total + item.price, 0)}`);
        setCart([]);
        setSelectedRestaurant(null);
    };

    return (
        <View style={styles.container}>
            {!selectedRestaurant ? (
                <>
                    <Text style={styles.header}>Food2Go - Restaurant List</Text>
                    <FlatList
                        data={restaurants}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.restaurant} onPress={() => setSelectedRestaurant(item)}>
                                <Text style={styles.text}>{item.name}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </>
            ) : (
                <>
                    <Text style={styles.header}>{selectedRestaurant.name} - Menu</Text>
                    <FlatList
                        data={selectedRestaurant.menu}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.menuItem} onPress={() => addToCart(item)}>
                                <Text style={styles.text}>{item.name} - ${item.price}</Text>
                            </TouchableOpacity>
                        )}
                    />
                    <Button title="Go to Checkout" onPress={checkout} disabled={cart.length === 0} />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    restaurant: {
        padding: 15,
        backgroundColor: '#f8f8f8',
        borderRadius: 5,
        marginBottom: 10,
        alignItems: 'center',
    },
    menuItem: {
        padding: 15,
        backgroundColor: '#dff0d8',
        borderRadius: 5,
        marginBottom: 10,
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
    },
});

export default Food2GoApp;
