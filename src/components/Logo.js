import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = () => (
  <Image source={require('../assets/deepdesk-1.png')} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    width: '100%',
    resizeMode: 'contain',
    marginBottom: 12,
  },
});

export default memo(Logo);
