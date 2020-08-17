import React, { useState, useEffect } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Dimensions,
  StatusBar,
  Image,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

const avatar = require('../assets/avatar.jpg');

const API_KEY = '5e4a5b1359bf4cf0a1bb9a86a81c6a90';

// const DATA = [
//   {
//     id: '1',
//     title:
//       'ABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABCABC',
//     image: require('../assets/avatar.jpg'),
//     desc:
//       'abcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabcabc',
//     publishTime: '41 minutes ago',
//   },
//   {
//     id: '2',
//     title: 'ABC',
//     image: require('../assets/avatar.jpg'),
//     desc: 'abc',
//     publishTime: '41 minutes ago',
//   },
//   {
//     id: '3',
//     title: 'ABC',
//     image: require('../assets/avatar.jpg'),
//     desc: 'abc',
//     publishTime: '41 minutes ago',
//   },
// ];

export default function News() {
  const [isLoading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function getNews() {
      const response = await fetch(
        'http://newsapi.org/v2/everything?q=bitcoin&sortBy=publishedAt&apiKey=' +
          API_KEY
      );
      const jsonData = await response.json();
      setArticles(jsonData.articles);

      // Lấy dữ liệu xong thì tắt biểu tượng loading
      setLoading(false);
    }

    // console.log('Call API');
    getNews();
  }, []);

  const renderItem = ({ item }) => (
    <>
      <Image source={{ uri: item.urlToImage }} style={styles.imageBox} />
      <View style={styles.descBox}>
        <Text style={styles.titleBox} numberOfLines={3}>
          {item.title}
        </Text>
        <Text style={styles.descrip} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.extra}>
          <Text style={{ color: 'white', fontSize: 11, flex: 1 }}>
            {item.publishedAt}
          </Text>
          <FontAwesome5
            style={{ marginHorizontal: 15 }}
            name="share-alt"
            color="white"
          />
          <FontAwesome5
            style={{ marginHorizontal: 15 }}
            name="bookmark"
            color="white"
          />
          <FontAwesome5
            style={{ marginLeft: 15 }}
            name="ellipsis-v"
            color="white"
          />
        </View>
      </View>
    </>
  );

  return (
    <>
      <StatusBar barStyle={'light-content'} />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Worldwide News</Text>
          <Image style={styles.avaImage} source={avatar} />
        </View>
        <ScrollView>
          <View style={styles.weather}>
            <FontAwesome5
              style={{ marginHorizontal: 15 }}
              name="cloud-sun-rain"
              size={30}
              color="white"
            />
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={{ flex: 1 }}>
                <Text style={[styles.textWeather, { marginBottom: 5 }]}>
                  78*F in Hanoi
                </Text>
                <Text style={styles.textWeather}>Rain</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={[styles.textWeather, { marginBottom: 5 }]}>
                  87* / 77*
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <FontAwesome5 name="umbrella" color="white" size={12} />
                  <Text style={styles.textWeather}> 40% today</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.content}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#white" />
            ) : (
              <FlatList
                data={articles}
                renderItem={renderItem}
                keyExtractor={(item) => item.url}
                // showsVerticalScrollIndicator={false}
              />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1d1e',
  },
  header: {
    height: 50,
    marginHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avaImage: {
    height: 30,
    width: 30,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  headerText: {
    flex: 1,
    color: 'red',
    fontSize: 28,
    fontWeight: 'bold',
  },
  weather: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#313235',
    marginHorizontal: 15,
  },
  textWeather: {
    color: 'white',
    fontSize: 12,
  },
  content: {
    flex: 1,
    marginHorizontal: 15,
    marginTop: 15,
  },
  imageBox: {
    backgroundColor: 'white',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    resizeMode: 'cover',
  },
  descBox: {
    backgroundColor: '#313235',
    height: 154,
    marginBottom: 15,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  titleBox: {
    height: 60,
    marginHorizontal: 15,
    marginTop: 10,
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  descrip: {
    height: 36,
    marginHorizontal: 15,
    color: 'white',
    fontSize: 13,
  },
  extra: {
    height: 15,
    marginHorizontal: 15,
    marginTop: 10,
    flexDirection: 'row',
  },
});
