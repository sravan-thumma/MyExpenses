import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CommonHeader = ({ onRefresh }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity onPress={onRefresh}>
        <Icon name="refresh" size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default CommonHeader;
