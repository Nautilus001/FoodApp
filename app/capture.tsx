import Spacer from "@/components/ui/spacer";
import { MEALTYPE, useAppContext } from "@/context/app-context";
import { CameraStyles, GlobalStyles } from "@/utilities/styles";
import { buildMealFromServer } from "@/utilities/utils";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {
  CameraView,
  useCameraPermissions
} from "expo-camera";
import * as ImagePicker from 'expo-image-picker';
import { router, useLocalSearchParams } from "expo-router";
import React, { useRef, useState } from "react";
import { Platform, Pressable, Text, View } from "react-native";
import BarcodeMask from 'react-native-barcode-mask';


export default function CaptureScreen() {
  const { state, dispatch } = useAppContext();
  const [permission, requestPermission] = useCameraPermissions();
  const ref = useRef<CameraView>(null);
  const [uri, setUri] = useState<string | null>(null);
  const { mealPicked } = useLocalSearchParams();
  const raw = Array.isArray(mealPicked) ? mealPicked[0] : mealPicked;
  const normalizedMeal: MEALTYPE = state.mealPicked ?? (Object.values(MEALTYPE).includes(raw as MEALTYPE) ? (raw as MEALTYPE) : MEALTYPE.SNACK);  
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
  try {
    // 1. Capture photo
    const photo = await ref.current?.takePictureAsync();
    if (!photo?.uri) return;

    setUri(photo.uri);

    // 2. Prepare FormData
    const form = new FormData();

    // On web, fetch returns File-like objects, on RN you need { uri, name, type }
    const isWeb = Platform.OS === "web";

    form.append("photo", isWeb
      ? new File([await (await fetch(photo.uri)).blob()], "photo.jpg", { type: "image/jpeg" })
      : { uri: photo.uri, name: "photo.jpg", type: "image/jpeg" } as any
    );

    // 3. POST to server
    const res = await fetch("http://localhost:3000/analyze", {
      method: "POST",
      body: form,
      // Do NOT set Content-Type manually! Let fetch handle it
    });

    const data = await res.json();
    console.log("Server response:", data);

    // 4. Build currentMeal and dispatch
    const mealFromServer = buildMealFromServer(normalizedMeal, data.result);
    dispatch({ type: "SET_CURRENT_MEAL", payload: mealFromServer });

    router.push({
      pathname: "/results",
      params: { imageUri: photo.uri, mealPicked: normalizedMeal },
    });

  } catch (err) {
    console.error("Failed to upload photo:", err);
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

