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
  ActivityIndicator,
  Linking,
  Alert,
} from 'react-native';

// import LinkingBox from './newsComponents/LinkingBox';

const avatar = require('../assets/avatar.jpg');

const API_KEY = '5e4a5b1359bf4cf0a1bb9a86a81c6a90';

export default function Home() {
  const [isLoading, setLoading] = useState(true);
  const [isLoadmore, setLoadmore] = useState(true);
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function getNews() {
      console.log('GET DATA FROM PAGE: ', page);
      const response = await fetch(
        'https://newsapi.org/v2/top-headlines?sources=bbc-news,cbc-news,nbc-news,fox-news,mtv-news=&page=' +
          page +
          '&pageSize=10&apiKey=' +
          API_KEY
      );
      const jsonData = await response.json();
      if (jsonData.articles.length == 0) {
        await setLoadmore(false);
      }
      setArticles(articles.concat(jsonData.articles));

      // Lấy dữ liệu xong thì tắt biểu tượng loading
      setLoading(false);
      // setLoadmore(false);
    }

    // console.log('Call API');
    getNews();
  }, [page]);

  const handleLoadmore = () => {
    // console.log('GETDATA from PAGE ' + page);
    // setLoadmore(true);
    if (isLoadmore) {
      setPage(page + 1);
    }
    // Alert.alert('eR' + page);
  };

  const renderItem = ({ item }) => (
    <>
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(item.url);
        }}>
        <Image source={{ uri: item.urlToImage }} style={styles.imageBox} />
      </TouchableOpacity>
      <View style={styles.descBox}>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(item.url);
          }}>
          <Text style={styles.titleBox} numberOfLines={3}>
            {item.title}
          </Text>
          <Text style={styles.descrip} numberOfLines={2}>
            {item.description}
          </Text>
        </TouchableOpacity>
        <View style={styles.extra}>
          <Text style={{ color: 'white', fontSize: 11, flex: 1 }}>
            {item.publishedAt.substring(0, 10)} - {item.author}
          </Text>
          <TouchableOpacity>
            <FontAwesome5
              style={{ marginHorizontal: 15 }}
              name="share-alt"
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome5
              style={{ marginHorizontal: 15 }}
              name="bookmark"
              color="white"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome5
              style={{ marginLeft: 15 }}
              name="ellipsis-v"
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
    // <LinkingBox item={item} />
  );

  const renderFooter = () => {
    console.log('renderFooter', isLoadmore);
    return isLoadmore ? (
      <ActivityIndicator
        style={{ marginBottom: 10 }}
        size="large"
        color="#white"
      />
    ) : (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <Text
          style={{
            color: 'white',
          }}>
          NO MORE NEWS
        </Text>
      </View>
    );
  };

  return (
    <>
      <StatusBar barStyle={'light-content'} />
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Worldwide News</Text>
          <TouchableOpacity>
            <Image style={styles.avaImage} source={avatar} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
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
        </TouchableOpacity>
        <View style={styles.content}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#white" />
          ) : (
            <FlatList
              data={articles}
              renderItem={renderItem}
              keyExtractor={(item) => item.url}
              onEndReached={handleLoadmore}
              onEndReachedThreshold={1}
              ListFooterComponent={renderFooter}
              // showsVerticalScrollIndicator={false}
            />
          )}
        </View>
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
