import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Colors} from '../../constants/colors';
import OutlineButton from '../UI/OutlineButton';
import RNLocation from 'react-native-location';

function LocationPicker() {
  const [location, setLocation] = useState();

  useEffect(() => {
    // if (!RNLocation.checkPermission) {
    async function getPermissions() {
      const locationGEt = await RNLocation.requestPermission({
        ios: 'whenInUse',
        android: {
          detail: 'coarse',
        },
      }).then(granted => {
        if (granted) {
          setLocation(
            RNLocation.subscribeToLocationUpdates(location =>
              console.log(location),
            ),
          );
        }
      });
      // }
    }

    getPermissions();
  }, []);

  function getlocationHandler() {
    // Subscribe
    // const unsubscribe = RNLocation.subscribeToLocationUpdates(locations => {
    //   console.log(locations)
    // });

    RNLocation.subscribeToLocationUpdates(locations => {
      console.log(locations)
    });
    

    // Unsubscribe
    // unsubscribe();

    // await RNLocation.getLatestLocation({timeout: 60000}).then(
    //   latestLocation => {
    //     // Use the location here
    //     console.log(latestLocation);
    //     // return latestLocation
    //   },
    // );
    // console.log(location);
  }

  function pickOnMapHandler() {}

  return (
    <View>
      <View style={styles.mapPreview}></View>
      <View style={styles.actions}>
        <OutlineButton icon={'location-outline'} onPress={getlocationHandler}>
          Location User
        </OutlineButton>
        <OutlineButton icon={'map-outline'} onPress={pickOnMapHandler}>
          Pick on Map
        </OutlineButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default LocationPicker;
