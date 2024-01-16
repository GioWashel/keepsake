import { StyleSheet, Text, View, Button, Image, Pressable } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import { FlipType, ImageManipulator, SaveFormat, manipulateAsync } from 'expo-image-manipulator';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import { StatusBar } from 'expo-status-bar';
import Colors from '../../constants/Colors';
const CameraScreen = () => {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [flash, setFlash] = useState(FlashMode.off);
   /*we need two states of the photos, one for displaying in the app after the photo is taken, 
    and another for saving to the camera roll. there are a couple reasons why this is done. 

      1) we use the expo-image-manipulator to flip/reverse photos taken from the front camera. 
         these photos for whatever reason cannot be displayed since they don't have options, however
         they save perfectly. 
        
      2) expo-camera does not have a method for flipping images, only for flipping videos 
  */


  const [photoToDisplay, setPhotoToDisplay] = useState();
  const [photoToSave, setPhotoToSave] = useState();


  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in settings.</Text>
  }
  function toggleCamera() {
    setCameraType(currentType => (currentType === CameraType.back ? CameraType.front: CameraType.back));
  }
  function toggleFlash() {
    setFlash(currentType => (currentType === FlashMode.off ? FlashMode.on: FlashMode.off));
    console.log("clicked");
  }
  const takePicture = async () => {
    let options = {
      quality: 1,
      base64: true,
      exif: false
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhotoToDisplay(newPhoto);
    //flip the photo if it's taken from the front camera 
    if (cameraType === CameraType.front) {
        newPhoto = await manipulateAsync(
          newPhoto.uri, 
          [{flip: FlipType.Horizontal}],
          { format: SaveFormat.JPEG}
      );
    }
    setPhotoToSave(newPhoto);

  };

  const discardPhoto = () => {
    setPhotoToDisplay(undefined);
    setPhotoToSave(undefined);
  }

  const savePhoto = async  () => {
    MediaLibrary.saveToLibraryAsync(photoToSave.uri).then(() => {
      setPhotoToDisplay(undefined);
      setPhotoToSave(undefined);
    });
  };

  //if back camera is selected, don't flip the camera
  if (photoToDisplay) {
    const imageStyle = cameraType === CameraType.front ? styles.frontImage : styles.backImage;
    return (
      <View style={styles.container}>
         <Button title="Discard" onPress={discardPhoto}></Button>
        <Button title="Save" onPress={savePhoto} />
        <Image style={imageStyle} source={{ uri: "data:image/jpg;base64," + photoToDisplay.base64 }}/>
       
      </View>
    );
  }
  return ( 
    <View style={styles.container} >
     
      <Camera type={cameraType} style={styles.container} ref={cameraRef} flashMode={flash}>
        <View style={styles.iconContainer}>
            <Pressable style={styles.flipIcon} onPress={toggleCamera}>
                <MaterialCommunityIcons   name="camera-flip-outline" color={'#FFFF'} size={35}/>
            </Pressable>
            <Pressable style={styles.takePhotoIcon} onPress={takePicture}>
                <Image style={{width: 75, height: 75}}source={require('./assets/take-picture.png')}/>
            </Pressable>
            <Pressable style={styles.flashIcon} onPress={toggleFlash}>
              {(flash === FlashMode.off ? <MaterialCommunityIcons  name= 'flash-outline' color={'#FFFF'} size={35}/> :  <MaterialCommunityIcons style={styles.flashIcon} name= 'flash' color={'#FFFF'} size={35}/>) }
            </Pressable>
        </View>
          

      </Camera>
    </View>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 16,
  },
  buttons: {
    marginHorizontal: 8,
  },
  frontImage: {
    transform: [{ scaleX: -1 }],
  },
  backImage: {
  },
  iconContainer: {
    bottom: '1%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.green
    
  },
  takePhotoIcon: {
    alignSelf: 'center',
      // Adjust the percentage value based on your desired position
    borderColor: '#fff',
  },
  flipIcon: {
    // Adjust the percentage value based on your desired position
  },
  flashIcon: {
  }
});
export default CameraScreen;