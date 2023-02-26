import React from 'react'
import {
    View,
    Text,
} from "react-native"
//Styles
import { styles } from './styles';
import { colors } from '../../utils/constants';
//Spinner
import { Circle } from 'react-native-progress';

const Spinner = ({display}) => {
    return (
        <View style={{...styles.container, display: display || "none" }}>
            <Circle
                size={50}
                borderWidth={4}
                indeterminate={true}
                color={colors.background}
                strokeCap={"square"}
                endAngle={0.5}
            />
        </View>
    )
}

export default Spinner