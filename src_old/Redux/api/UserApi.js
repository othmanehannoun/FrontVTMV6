import axios from "axios";
import { endPoint } from "../../constants/GlobaleVariables";
import AsyncStorage from "@react-native-async-storage/async-storage";



const Insert_User = async(data) => {
    // try {

        let response = await axios.post( endPoint + `/api/user/signUp`, data)
        const json = response.data

        return json;
            
}

// const Login = async(data) => {
    
//         let response = await axios.post( endPoint + `/api/user/signIn`, data)
//         const json = response.data

//         if(json){
//             AsyncStorage.setItem("user", JSON.stringify(json));
//         }
//         return json;
            
// }

const loginAPI = async (data) => {
    
    try {
      let response = await fetch(endPoint + "/api/user/signIn", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
  
        body: JSON.stringify(data)
      });
     
      let json = await response.json();
  
      return json;
    } catch (error) {
      console.log(error);
    }
  };

const GetUser = async(id) => {
    
    let response = await axios.post( endPoint + `/api/user`, id)
    const json = response.data

    return json;
        
}


const logout = () => {
    AsyncStorage.removeItem("user");
};


const UserApi =  {
    Insert_User,
    // Login,
    GetUser,
    logout,

    loginAPI
   
}

export default UserApi