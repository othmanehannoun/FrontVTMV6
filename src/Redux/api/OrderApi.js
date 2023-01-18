import axios from "axios";
import { endPoint } from "../../constants/GlobaleVariables";
// import AsyncStorage from "@react-native-async-storage/async-storage";

const AddOrder = async(data) => {
    // try {
    //console.log("ACH HADA MMMM AWAAAH", data)

    let response = await axios.post( endPoint + `/api/orderM/add/${data.userId}`, data,
        {
            headers: { Authorization: `Bearer ${data.token}` },
        }
    )
    console.log("EEE", response)
    const json = response.data
    
    return json;
            
}

const UpdateUserSoldVitamix = async(data) => {

    const response = await axios.put(`${endPoint}/api/orderM/userSoldVitamix/${data.userId}`, data,
        {
            headers: { Authorization: `Bearer ${data.token}` },
        }
    ) 
    const json = response.data;
    return json;
    // const json = response.data

    // return json;
            
}

const getOneOrder = async(id) => {

    let response = await axios.get( `${endPoint}/api/orderM/findOrder/${id}`)
    const json = response.data

    return json;
            
}

const getOrderByUser = async(id) => {

        let response = await axios.get( `${endPoint}/api/orderM/findUserOrder/${id}`)
        const json = response.data
        // console.log(id)
        return json;
            
}


const OrderApi =  {
    AddOrder,
    UpdateUserSoldVitamix,
    getOneOrder,
    getOrderByUser
}

export default OrderApi