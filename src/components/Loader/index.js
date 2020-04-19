import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {Metrix} from '../../config';

export const Loader = ({
  containerHeight = Metrix.defaultHeight,
  containerWidth = Metrix.defaultWidth,
  size = 'large',
}) => (
  <View
    style={{
      height: Metrix.VerticalSize(containerHeight),
      width: Metrix.HorizontalSize(containerWidth),
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <ActivityIndicator size={size} />
  </View>
);
