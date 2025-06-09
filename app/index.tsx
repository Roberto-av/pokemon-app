import Checkbox from 'expo-checkbox';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  const [pokemons, setPokemons] = useState<{ name: string; url: string }[]>([]);
  const [selected, setSelected] = useState<{ [name: string]: boolean }>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=50')
      .then(res => res.json())
      .then(data => {
        setPokemons(data.results);
        setLoading(false);
      });
  }, []);

  const toggleSelection = (name: string) => {
    setSelected(prev => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#EF5350" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona tus Pokémon</Text>
      <FlatList
        data={pokemons}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Checkbox
              value={selected[item.name] || false}
              onValueChange={() => toggleSelection(item.name)}
              color={selected[item.name] ? '#3B4CCA' : undefined}
            />
            <Text style={styles.name}>{item.name.toUpperCase()}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#3B4CCA',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  name: {
    marginLeft: 10,
    fontSize: 18,
  },
});
