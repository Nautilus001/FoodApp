// components/Spacer.tsx
import React from 'react';
import { View } from 'react-native';

type SpacerProps = {
  size?: number; // default spacing in pixels
  horizontal?: boolean; // true for horizontal spacing
};

const Spacer: React.FC<SpacerProps> = ({ size = 16, horizontal = false }) => {
  return <View style={horizontal ? { width: size } : { height: size }} />;
};

export default Spacer;
