/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const [count, setCount] = useState(0);
  const [clearIntervalId, setClearIntervalId] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  const onStart = () => {
    if (!isRunning) {
      setIsRunning(true);
      const clearId = setInterval(() => {
        setCount(prev => prev + 1);
      }, 1000);
      setClearIntervalId(clearId);
    }
  };

  const onReset = () => {
    if (clearIntervalId) {
      clearInterval(clearIntervalId);
      setClearIntervalId(null);
    }
    setCount(0);
    setIsRunning(false);
  };

  const onPause = () => {
    if (clearIntervalId) {
      clearInterval(clearIntervalId);
    }
    setIsRunning(false);
  };

  useEffect(() => {
    if (clearIntervalId) {
      return () => clearInterval(clearIntervalId);
    }
  }, [clearIntervalId]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View
        style={{margin: 12, padding: 12, flex: 1, justifyContent: 'center'}}>
        <Text style={{fontWeight: 'bold'}}>Timer</Text>
        <Text>{count}</Text>
        <View style={{gap: 4, flexDirection: 'row'}}>
          <TouchableOpacity onPress={onReset}>
            <Text>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onStart}>
            <Text>Start/Resume</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPause}>
            <Text>Pause</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
