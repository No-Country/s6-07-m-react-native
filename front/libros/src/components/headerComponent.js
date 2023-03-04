import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Button, Modal, TouchableOpacity, Animated } from 'react-native';
import Avatar from '../../assets/avatar.jpeg';

import Sidebar from './sidebar';

const HeaderComponent = ({ left, right, title }) => {
  const [open, setOpen] = useState(false);
  const [animation] = useState(new Animated.Value(-300));

  const toggleOpen = () => {
    if (open) {
      Animated.timing(animation, {
        toValue: -300,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setOpen(false));
    } else {
      setOpen(true);
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const animatedStyle = {
    transform: [{ translateX: animation }],
  };

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={toggleOpen}>
        <Image   
          source={Avatar}
          style={{ width: 36, height: 36, borderRadius: 20 }}
        />
      </TouchableOpacity>
      {left && (
        <Text style={{ fontSize: 18, fontWeight: '500' }}>
          {title}
        </Text>
      )}
      <Modal visible={open} transparent={true} >
        <View style={styles.modal}>
          <Animated.View style={[styles.sidebar, animatedStyle]}>
            <Sidebar />
            <Button title="Close" onPress={toggleOpen} />
          </Animated.View>
        </View>
      </Modal>
      {right && (
        <Text style={{ fontSize: 18, fontWeight: '500' }}>
          {title}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create ({
  header: {
    marginHorizontal: 16,
    marginBottom: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  sidebar: {
    width: 300,
    height: '100%',
    backgroundColor: '#fff',
    position: 'absolute',
    left: 0,
    top: 0,
    padding: 20,
  },
});

export default HeaderComponent;
