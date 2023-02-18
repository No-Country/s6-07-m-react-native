//React
import React, {useState} from 'react'
import {
    View,
    Text
} from "react-native"
import { styles } from './styles'

const Balloon = ({ transmitter }) => {

    const [textWidth, setTextWidth] = useState(0);

    const handleTextLayout = (event) => {
        const { width } = event.nativeEvent.layout;
        console.log(width)
        setTextWidth(width);
    };
    return (
        <View style={transmitter ? {...styles.containerTransmitter, width: textWidth} : {...styles.containerReceiver, width: textWidth}}>
            <Text onLayout={handleTextLayout} style={styles.text}>
                Hola che. cómo andás??
            </Text>
        </View>
    )
}

export default Balloon