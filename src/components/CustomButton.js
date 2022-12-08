import React from 'react'
import { Button, Text, useTheme } from 'native-base';
import { StyleSheet } from 'react-native';

const CustomButton = ({type="button", bsType="primary", onPress, children}) => {

  const {colors} = useTheme();

  const styles = StyleSheet.create({
    primary: {
      borderColor: colors.primary.pale_green,
      backgroundColor: colors.primary.pale_green
      //on click
      // borderColor=colors.primary.green
      // backgroundColor=colors.primary.green
    }, 
    secondary: {
      borderColor: colors.primary.pale_green,
      backgroundColor: '#FFF'
      //on click
      // borderColor=colors.primary.green
    },
  })
  
  return (
    <Button
      type={type}
      style={ (bsType === 'primary') ? styles.primary : styles.secondary } 
      onPress={onPress()}
      px={5}
      py={3.5}
      rounded={7}
      borderWidth={2} >
        <Text color={colors.primary.dark_grey}>{children}</Text>
    </Button>
  )
}

export default CustomButton