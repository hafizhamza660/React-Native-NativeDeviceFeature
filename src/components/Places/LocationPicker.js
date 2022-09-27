import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import {Colors} from '../../constants/colors';
import OutlineButton from '../UI/OutlineButton';
import RNLocation from 'react-native-location';
import { getMapPreview } from '../../utils/location';

function LocationPicker() {
  const [locationPermissionInformation,setLocationInformation]=useState(false);
  const [location, setLocation] = useState();
  const [pickedlocation, setPickedLocation] = useState();

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
          setLocationInformation(true);
          RNLocation.subscribeToLocationUpdates(location =>{
            console.log("this",location[0].latitude)
            setPickedLocation({
              lat:location[0].latitude,
              lng:location[0].longitude
            })
          }
          )

          // setLocation(
          //   RNLocation.subscribeToLocationUpdates(location =>{
          //     setPickedLocation({
          //       lat:location.latitude,
          //       lng:location.longitude
          //     })
          //   }
              
              
          //   ),
          // );
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
      setPickedLocation({
        lat:locations.latitude,
        lng:locations.longitude
      })
      console.log("this",locations)
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
  let locationPreview = <Text>No location picked yet</Text>

  if(pickedlocation){
    console.log(pickedlocation)
    locationPreview = (
      <Image style={styles.image} source={{uri: getMapPreview(pickedlocation.lat,pickedlocation.lng)}} />
    )
  }

  return (
    <View>
      <View style={styles.mapPreview}>
       {locationPreview}
      </View>
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
    overflow:'hidden'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image:{
    width:'100%',
    height:'100%'
  }
});

export default LocationPicker;
