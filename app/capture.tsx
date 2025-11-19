import Spacer from "@/components/ui/spacer";
import { CameraStyles, GlobalStyles } from "@/utilities/styles";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  CameraView,
  useCameraPermissions
} from "expo-camera";
import { Image } from "expo-image";
import * as ImagePicker from 'expo-image-picker';
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import BarcodeMask from 'react-native-barcode-mask';



export default function CaptureScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const ref = useRef<CameraView>(null);
  const [uri, setUri] = useState<string | null>(null);
  const facing = "back";

  if (!permission) {
    return null;
  }

  if (!permission.granted) {
    return (
      <View style={CameraStyles.container}>
        <Text style={GlobalStyles.title}>
          We need your permission to use the camera
        </Text>
        <Spacer size={100}/>
        <Pressable onPress={requestPermission} style={GlobalStyles.primaryButton}> 
            <Text style={GlobalStyles.primaryButtonText}>Grant Permissions</Text>
        </Pressable>
      </View>
    );
  }

  const takePicture = async () => {
    const photo = await ref.current?.takePictureAsync();
    if (photo?.uri) setUri(photo.uri);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setUri(result.assets[0].uri);
    }
  };

  const renderPicture = (uri: string) => {
    return (
      <View style={{flex:1, flexDirection: "column", justifyContent: "space-evenly",}}>
        <View style={{flex:2, justifyContent: "center", alignItems:"center"}}>
          <Text style={GlobalStyles.title}>Preview</Text>
          <Image
            source={{ uri }}
            contentFit="contain"
            style={{ width: '90%', aspectRatio: 1,}}
          />
        </View>
        <View style={{flex:1, padding: 5, justifyContent: "space-around"}}>
          <View>
            <Pressable onPress={() => setUri(null)} style={GlobalStyles.primaryButton}> 
              <Text style={GlobalStyles.primaryButtonText}>Retake Picture</Text>
            </Pressable>
          </View>
          <View>
            <Pressable onPress={() => router.push({
            pathname: "/results",
            params: { imageUri: uri },
        })} style={GlobalStyles.primaryButton}> 
              <Text style={GlobalStyles.primaryButtonText}>Submit</Text>
            </Pressable>
          </View>
        </View>        
      </View>
    );
  };



  const renderCamera = () => {
    return (
      <View style={CameraStyles.cameraContainer}>
        <CameraView
            style={CameraStyles.camera}
            ref={ref}
            mode="picture"
            facing={facing}
            mute={false}
            responsiveOrientationWhenOrientationLocked
        >
          <BarcodeMask
            width={250}   // width of the transparent rectangle
            height={300}  // height of the transparent rectangle
            showAnimatedLine={false}
            edgeColor="white"
            edgeHeight= {40}
            edgeWidth={40}
            outerMaskOpacity={0.4} // overlay opacity
          />
        </CameraView>
        {/* Shutter button centered */}
        <View style={CameraStyles.shutterContainer}>
            <Pressable onPress={takePicture}>
            {({ pressed }) => (
                <View style={[CameraStyles.shutterBtn, { opacity: pressed ? 0.5 : 1 }]}>
                <View style={[CameraStyles.shutterBtnInner, { backgroundColor: 'white' }]} />
                </View>
            )}
            </Pressable>
        </View>

        {/* Image picker bottom left */}
        <View style={CameraStyles.imagePickerContainer}>
            <Pressable onPress={pickImage}>
            <FontAwesome name="file-photo-o" size={60} color="white" />
            </Pressable>
        </View>
      </View>
    );
  };

  return (
    <View style={CameraStyles.container}>
      {uri ? renderPicture(uri) : renderCamera()}
    </View>
  );
}

