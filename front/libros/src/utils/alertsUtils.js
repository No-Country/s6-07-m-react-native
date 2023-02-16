import { Alert } from "react-native";

export const alerts = {
    success: {
      title: "Registro",
      msg: "Registro exitoso",
      options: [
        {
          text: "OK",
          onPress: () => console.log("OK Pressed")
        }
      ],
      cancelable: false,
    },
    error: {
      title: "Error",
      msg: "Ocurrió un error. Intenta nuevamente mas tarde.",
      options: [
        {
          text: "OK",
          onPress: () => console.log("OK Pressed")
        }
      ],
      cancelable: false,
    },
  }

 export const showAlert = ({title, msg, options, cancelable}) => {
    Alert.alert(
      title,
      msg,
      options,
      { cancelable },
    );
  };