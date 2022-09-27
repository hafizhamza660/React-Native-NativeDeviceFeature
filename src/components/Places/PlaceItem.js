import React from 'react';
import {View, Text, Image, Pressable} from 'react-native';

function PlaceItem({place,onSelect}) {
  return (
    <Pressable onPress={onSelect}>
      <Image source={{uri: place.imageUri}}/>
      <View>
        <Text>title</Text>
        <Text>address</Text>
      </View>
    </Pressable>
  );
}

export default PlaceItem;
