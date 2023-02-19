//React
import React, { useState, useRef, useEffect } from 'react'
import {
    View,
    Text
} from "react-native"
import { styles } from './styles'

const Balloon = ({ transmitter }) => {

    const [textWidth, setTextWidth] = useState(0);
    const textRef = useRef();

    const handleTextLayout = (event) => {
        const { width } = event.nativeEvent.layout;
        console.log(width)
        setTextWidth(width);
    };

    /* useEffect(() => {
        textRef.current.measure((x, y, width, height, pageX, pageY) => {
            console.log(width)
            setTextWidth(width);
        });
    }, [textRef]) */

    console.log(textWidth)

return (
    <View style={transmitter ? { ...styles.containerTransmitter/* , width: textWidth */ } : { ...styles.containerReceiver, /* width: textWidth */ }}>
        <Text /* ref={textRef} */ /* onLayout={handleTextLayout} */ style={styles.text}>
            Hola che. cómo andás? holaholaholahola mas holas que sigan los holas siguen los holas nomas que hola con el hola jajaja que hola che {/* holaaa como andas? jajajajajajaja */}
        </Text>
    </View>
)
}

export default Balloon