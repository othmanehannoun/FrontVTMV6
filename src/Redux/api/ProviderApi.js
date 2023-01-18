import axios from "axios";
import { endPoint } from "../../constants/GlobaleVariables";

const getCatregory = async() => {
    try{
        const response = await axios.get(`${endPoint}/api/category/getAll`) 
        const data = response.data;
       
        return data
    }
    catch (error){
        return error.message
    }

};

const getSubCByCategory = async(id) => {

        const response = await axios.get(`${endPoint}/api/subcategory/getSubC/${id}`) 
        const data = response.data
        
        return data
    
};

const getProductByCategory = async(id) => {
    // console.log('id', id);
        const response = await axios.get(`${endPoint}/api/product/getProductByCategory/${id}`) 
        const data = response.data;
          
        return data
   

};

const getProductBySubCategory = async() => {
    
    // console.log('ZZZZ', id)
    // const ff = '62262d32fb7f3341e0b6bcf8'
    const response = await axios.get(`${endPoint}/api/product/getProductByCategory/62262c09fb7f3341e0b6bcf2`) 
    // console.log('ZZZZ', `${endPoint}/api/product/getProductBySubCategory/${ff}`)
    const data = response.data;
    // console.log('ZZZZ', data)
    return data


};



const ProviderApi = {
    getCatregory,
    getSubCByCategory,
    getProductByCategory,
    getProductBySubCategory

  };
  
  export default ProviderApi;

