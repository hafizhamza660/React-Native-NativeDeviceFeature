import React, {useState} from 'react';
import {View, Button, Image, StyleSheet,Text} from 'react-native';
import {launchCamera, CameraOptions} from 'react-native-image-picker';
import {Colors} from '../../constants/colors';
import OutlineButton from '../UI/OutlineButton'

function ImagePicker() {
  const [pickedImage, setPickedImage] = useState();
  async function takeImageHandler() {
    const image = await launchCamera({
      quality: 0.5,
      mediaType: 'photo',
      maxWidth: 1920,
      maxHeight: 1080,
    });

    setPickedImage(image.assets[0].uri);
    // console.log(image.assets[0].uri)
  }

  let imagePreview = <Text>No image picked yet!</Text>;

  if (pickedImage) {
    imagePreview = <Image source={{uri: pickedImage}} style={styles.image} />;
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlineButton onPress={takeImageHandler} icon={'camera-outline'}>Take Image!</OutlineButton>
    </View>
  );
}

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ImagePicker;
