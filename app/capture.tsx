import Spacer from "@/components/ui/spacer";
import { CameraStyles, GlobalStyles } from "@/utilities/styles";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  CameraView,
  useCameraPermissions
} from "expo-camera";
import * as ImagePicker from 'expo-image-picker';
import { router, useLocalSearchParams } from "expo-router";
import React, { useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import BarcodeMask from 'react-native-barcode-mask';



export default function CaptureScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const ref = useRef<CameraView>(null);
  const [uri, setUri] = useState<string | null>(null);
  const { mealPicked } = useLocalSearchParams();

  const normalizedMeal =
    Array.isArray(mealPicked) ? mealPicked[0] : mealPicked ?? null;  const facing = "back";

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
    if (photo?.uri) {
      setUri(photo.uri);
      router.push({
        pathname: "/results",
        params: { imageUri: photo.uri, meal: normalizedMeal },
      });
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setUri(uri);
      router.push({
        pathname: "/results",
        params: { imageUri: uri, meal: normalizedMeal },
      });
    }
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
      {renderCamera()}
    </View>
  );
}

