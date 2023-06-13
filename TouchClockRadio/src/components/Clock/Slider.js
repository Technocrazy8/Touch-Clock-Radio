import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, PanResponder } from 'react-native';

const CustomSlider = ({ minimumValue, maximumValue, onValueChange }) => {
  const [sliderWidth, setSliderWidth] = useState(0);
  const [thumbPosition, setThumbPosition] = useState(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const newThumbPosition = calculateThumbPosition(gestureState);
        setThumbPosition(newThumbPosition);
        const newValue = calculateValueFromPosition(newThumbPosition);
        // onValueChange(newValue);
        console.log(newValue);
      },
      onPanResponderRelease: () => {console.log('release')},
    })
  ).current;

  const calculateThumbPosition = (gestureState) => {
    const { dx } = gestureState;
    const newPosition = Math.min(Math.max(0, thumbPosition + dx), sliderWidth);
    return newPosition;
  };

  const calculateValueFromPosition = (position) => {
    const valueRange = maximumValue - minimumValue;
    const ratio = position / sliderWidth;
    const newValue = minimumValue + valueRange * ratio;
    console.log(newValue);
    return newValue;
  };

  const handleSliderLayout = (event) => {
    const { width } = event.nativeEvent.layout;
    setSliderWidth(width);
  };

  return (
    <View>
      <TouchableOpacity
        style={{
          height: 10,
          backgroundColor: '#ccc',
          width: '100%',
        }}
        onLayout={handleSliderLayout}
        {...panResponder.panHandlers}
        // onAnimatedValueChange={(value) => console.log(value)}
        // onAnimatedValueUpdate={(value) => console.log(value)}
      >
        <View
          style={{
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: 'blue',
            position: 'absolute',
            top: -5,
            left: thumbPosition,
            animated: true,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CustomSlider;
