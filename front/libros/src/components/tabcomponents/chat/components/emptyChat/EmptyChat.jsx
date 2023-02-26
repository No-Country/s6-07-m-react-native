//React
import React from 'react'
import {
    View,
    Text,
} from "react-native"
//Components
import EmptySVG from './EmptySVG'
import { styles } from './styles/styles'

const EmptyChat = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.text}>Aún no has contactado a ningún donante.</Text>
        <EmptySVG />
    </View>
  )
}

export default EmptyChat