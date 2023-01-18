import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserApi from "../api/UserApi"
import AsyncStorage from "@react-native-async-storage/async-storage";

// Get user from localStorage

const initialState = {

// global state
    isLoading: false,
    message: null,
// Register state
    isError: false,
    isSuccess : false,
// login state
    LoginError: false,
    LoginSuccess : false,
    user: null,
// verify account state
    VerifyError: false,
    VerifySuccess : false,
// reset otp state
    isLoading_S: false,
    isError_S: false,
    isSuccess_S : false,
// GET USER
    getUser: null,
    isLoggedIn: false,
    
}

 //sotre data in AsyncStorage
 const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("user", jsonValue);
    } catch (e) {
      console.log(e);
    }
};

  //get data from AsyncStorage
  const getDataFromStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("user");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      console.log(e);
    }
  };


export const InsertUser = createAsyncThunk(
 'user/InserUser', async(userInfos, thunkAPI)=>{
    const {rejectWithValue} = thunkAPI
    try{
        const res = await UserApi.Insert_User(userInfos);
        // const jsonValue = JSON.stringify(res);
        // console.log("Ach hada1: ", res.data);
        // console.log("Ach hada2: ", jsonValue.data);
        await AsyncStorage.setItem("UserVerify", JSON.stringify(res.data));
        return res
    }
    catch(error){
        return rejectWithValue(error.response.data) 
    }
})


export const VerifyAccount = createAsyncThunk(
  'user/VerifyAccount', async(infos, thunkAPI)=>{
     const {rejectWithValue} = thunkAPI
     try{
         const res = await UserApi.VerifyAcc(infos);
         return res
     }
     catch(error){
         return rejectWithValue(error.response.data) 
     }
 })

 export const ResendOTP = createAsyncThunk(
  'user/ResedOTP', async(infos, thunkAPI)=>{
     const {rejectWithValue} = thunkAPI
     try{
         const res = await UserApi.resendOtp(infos);
         return res
     }
     catch(error){
         return rejectWithValue(error.response.data) 
     }
 })

// export const Login = createAsyncThunk(
//     'user/InserUser', async(userInfos, thunkAPI)=>{
//        const {rejectWithValue} = thunkAPI
//        try{
//            const res = await UserApi.Login(userInfos);
//            return res
//        }
//        catch(error){
//            return rejectWithValue(error.response.data) 
//        }
// })


export const Login = createAsyncThunk(
    'user/Login', async(userInfos, thunkAPI)=>{
       const {rejectWithValue} = thunkAPI

       try {
        const response = await UserApi.loginAPI(userInfos);
        if (response.token) {
            const loginObjectResponse = {
              email: response.email,
              name: response.name,
              phone: response.phone,
              _id: response._id,
              role: response.role,
              token: response.token,
              Point_Fidilite: response.Point_Fidilite,
              solde_vitamix: response.solde_vitamix
            };
            await storeData(loginObjectResponse);
            const userObject = await getDataFromStorage();
            if (userObject) {
                return userObject
            }
          } else {
            const error = response.error;
            console.log(error)
            return rejectWithValue(error);
          }
     
      } catch (error) {
        console.debug(error)
      }

})

export const Get_User = createAsyncThunk(
    'user/Get_User', async(data, thunkAPI)=>{
        // console.log("EE", data);
       const {rejectWithValue} = thunkAPI
       try{
            const json = await UserApi.GetUser(data);
            // console.log('GET USER:', res.user)
            const res = json.user
            return res
       }
       catch(error){
           console.log(error.response.data);
           return rejectWithValue(error.response.data) 
       }
})

export const addToken = createAsyncThunk(
    'user/addtoken',
    async ()=>{
      try{
        const result =  await getDataFromStorage();
        if (result) {
            return result
        }
        else {
            const error = response.error;
            console.log(error)
            return rejectWithValue(error);
        }
      } 
      catch(error){ 
        return rejectWithValue(error) 
    }
    }
)

export const logout = createAsyncThunk(
    "auth/logout", async () => {
    await UserApi.logout();
});


const CategorySlice = createSlice({
    name : "user",
    initialState,
    reducers:{
        reset: (state) =>{
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = null
            state.isError_S = false
            state.isSuccess_S = false
            state.isLoading_S = false
            state.LoginError = false
            state.LoginSuccess = false
            state.VerifyError = false
            state.VerifySuccess = false
        }
    },
    
    extraReducers:{

        // Add Token -----------------------------------------------
        [addToken.fulfilled]:(state,action)=>{
            state.isLoggedIn = true;
            state.user = action.payload;
        },

        // User Register------------------------------------------
        [InsertUser.pending]: (state, action) =>{
           state.isLoading = true
        },
        [InsertUser.fulfilled]: (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
        },
        [InsertUser.rejected]: (state, action) =>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        },

        // User Verification -------------------------------------------
        [VerifyAccount.pending]: (state, action) =>{
          state.isLoading = true
        },
        [VerifyAccount.fulfilled]: (state, action) =>{
            state.isLoading = false
            state.VerifySuccess = true
        },
        [VerifyAccount.rejected]: (state, action) =>{
            state.isLoading = false
            state.VerifyError = true
            state.message = action.payload
        },

        // User resendOTP -------------------------------------------
        [ResendOTP.pending]: (state, action) =>{
        state.isLoading_S = true
        },
        [ResendOTP.fulfilled]: (state, action) =>{
            state.isLoading_S = false
            state.isSuccess_S = true
            
        },
        [ResendOTP.rejected]: (state, action) =>{
            state.isLoading_S = false
            state.isError_S = true
            state.message = action.payload
        },

        // User Login------------------------------------------------------
        [Login.pending]: (state, action) =>{
            state.isLoading = true
        },
        [Login.fulfilled]: (state, action) =>{
            state.isLoading = false
            state.LoginSuccess = true
            state.isLoggedIn = true
            state.user = action.payload
        },
        [Login.rejected]: (state, action) =>{
            state.isLoading = false
            state.LoginError = true
            state.message = action.payload
        },

        // Get User -----------------------------------------------------------------
         [Get_User.fulfilled]: (state, action) =>{
             state.isLoading = false
             state.isSuccess = true
            //  console.log("action.payload:", action.payload);
             state.getUser = action.payload
         },
        
        // LogOut -------------------------------------------------------------------
        [logout.fulfilled]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
            console.log('res:', action)

        },
    }
})

export const { reset } = CategorySlice.actions
export default CategorySlice.reducer