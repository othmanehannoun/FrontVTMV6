import axios from "axios";
import { endPoint } from "../../constants/GlobaleVariables";

const TresferPoints = async(data) => {

    // try {

    const response = await axios.put(`${endPoint}/api/userM/tresferPoint/${data.userId}/${data.userIdFROM}`, data) 
    const json = response.data;
    return json;
            
}

const getBeneficiary = async(id) => {

    const response = await axios.get(`${endPoint}/api/userM/getBeneficiaryByUser/${id}`) 
    const json = response.data;
    return json
              
}

const AddNewBeneficiary = async(dataUser) => {

    const response = await axios.post(`${endPoint}/api/userM/addBeneficiary/${dataUser.id_user_beneficiary}`, dataUser) 
    const json = response.data;
    return json;
    
}



const TrasferPointsApi =  {
    TresferPoints,
    getBeneficiary,
    AddNewBeneficiary
   
}

export default TrasferPointsApi