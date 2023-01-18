import axios from "axios";
import { endPoint } from "../../constants/GlobaleVariables";
// import AsyncStorage from "@react-native-async-storage/async-storage";

const CheckPromoCodeIsValid = async(data) => {
    // try {

        let response = await axios.post( endPoint + `/api/codePromo`, data)
        const json = response.data

        return json;
            
}

const OrderApi =  {
    CheckPromoCodeIsValid,
}

export default OrderApi