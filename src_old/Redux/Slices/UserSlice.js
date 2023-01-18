import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserApi from "../api/UserApi"
import AsyncStorage from "@react-native-async-storage/async-storage";

// Get user from localStorage

const initialState = {
  user: null,
  isLoading: false,
  isLoggedIn: false,
  isError: false,
  isSuccess : false,
  message: null,
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

    //    try{
    //        const res = await UserApi.loginAPI(userInfos);
    //        console.log('rrrrrrrrrrrr:', res)
    //        // return res
    //    }
    //    catch(error){
    //        return rejectWithValue(error.response.data) 
    //    }
})

export const Get_User = createAsyncThunk(
    'user/Get_User', async(id, thunkAPI)=>{
       const {rejectWithValue} = thunkAPI
       try{
           const res = await UserApi.GetUser(id);
           console.log('GET USER:', res)
           return res
       }
       catch(error){
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
        }
    },
    
    extraReducers:{

        // Add Token
        [addToken.fulfilled]:(state,action)=>{
            state.isLoggedIn = true;
            state.user = action.payload;
        },

        // User Register
        [InsertUser.pending]: (state, action) =>{
           state.isLoading = true
        },
        [InsertUser.fulfilled]: (state, action) =>{
            state.isLoading = false
            state.isSuccess = true
            // state.isLoggedIn = true
            // state.user = action.payload
        },
        [InsertUser.rejected]: (state, action) =>{
            state.isLoading = false
            state.isError = true
            state.message = action.payload
        },
        // User Login
         [Login.pending]: (state, action) =>{
            state.isLoading = true
         },
         [Login.fulfilled]: (state, action) =>{
             state.isLoading = false
             state.isSuccess = true
             state.isLoggedIn = true
             // console.log("action.payload", action.payload)
             state.user = action.payload
         },
         [Login.rejected]: (state, action) =>{
             state.isLoading = false
             state.isError = true
             state.message = action.payload
         },
        // Get User
         [Get_User.fulfilled]: (state, action) =>{
             state.isLoading = false
             state.isSuccess = true
             state.user = action.payload
         },
        
        // LogOut
        [logout.fulfilled]: (state, action) => {
            state.isLoggedIn = false;
            state.user = null;
            console.log('res:', action)

        },
    }
})

export const { reset } = CategorySlice.actions
export default CategorySlice.reducer