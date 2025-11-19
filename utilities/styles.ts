import { Dimensions, StyleSheet } from "react-native";
import { COLORS } from "./constants";

const { width: screenWidth } = Dimensions.get('window');
const primaryButtonWidth = screenWidth * 0.5;
const primaryButtonHeight = primaryButtonWidth * 0.27; 

export const GlobalStyles = StyleSheet.create({
  container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: COLORS.primaryDark,
      alignItems: 'center',
      justifyContent: "space-between",
  },
  title: {
    fontSize: 40,
    fontFamily: 'Inter_700Bold',
    fontWeight: "bold",
    color: COLORS.secondaryLight,
  },
  primaryButton: {
    width: primaryButtonWidth,
    height: primaryButtonHeight,
    maxWidth: 300,
    maxHeight: 100,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.highlight,
  },
  primaryButtonText: {
    fontSize: 24,
    fontFamily: 'OpenSans_400Regular',
    fontWeight: "regular",
    color: COLORS.secondaryLight,
  },
});

export const CameraStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryDark,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraContainer: StyleSheet.absoluteFillObject,
  camera: StyleSheet.absoluteFillObject,
  shutterContainer: {
    position: "absolute",
    bottom: 44,
    left: 0,
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  shutterBtn: {
    backgroundColor: "transparent",
    borderWidth: 5,
    borderColor: "white",
    width: 85,
    height: 85,
    borderRadius: 45,
    alignItems: "center",
    justifyContent: "center",
  },
  shutterBtnInner: {
    width: 70,
    height: 70,
    borderRadius: 50,
  },
  imagePickerContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
});

export const ImagePickerStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});