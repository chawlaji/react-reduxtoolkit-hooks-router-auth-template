import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthService from "../services/auth.service";

const user = JSON.parse(localStorage?.getItem("user"));

interface userInputInterface {
  username: string;
  password: string;
  email?: string;
}

interface userInterface {
  msg: string;
  password: string;
  username: string;
}

export const signup = createAsyncThunk(
  "auth/signup",
  async ({ username, email, password }: userInputInterface, thunkAPI) => {
    try {
      const response = await AuthService.signup(username, email, password);
      return response.data.msg;
    } catch (error) {
      const msg = error?.response?.data?.msg;
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }: userInputInterface, thunkAPI) => {
    try {
      const data = await AuthService.login(username, password);
      return { user: data };
    } catch (error) {
      const msg = error?.response?.data?.msg;
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

// for future backsend session logout
export const logout = createAsyncThunk("auth/logout", async () => {
  AuthService.logout();
});

const initialState = user
  ? { isLoggedIn: true, user, isLoading: false ,msg: ''}
  : { isLoggedIn: false, user: null, isLoading: false ,msg:''};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        signup.fulfilled,
        (state: { isLoggedIn: boolean; isLoading: boolean ,msg:string}, action: {payload : string}) => {
          state.isLoggedIn = false;
          state.isLoading = false;
          state.msg= action.payload;
        }
      )
      .addCase(
        signup.rejected,
        (state: { isLoggedIn: boolean; isLoading: boolean }) => {
          state.isLoggedIn = false;
          state.isLoading = false;
        }
      )
      .addCase(
        login.fulfilled,
        (
          state: {
            isLoading: boolean;
            isLoggedIn: boolean;
            user: userInterface;
          },
          action: { payload: { user: userInterface } }
        ) => {
          state.isLoggedIn = true;
          state.isLoading = false;
          state.user = action.payload.user;
        }
      )
      .addCase(
        login.rejected,
        (state: { isLoading: boolean; isLoggedIn: boolean; user: null }) => {
          state.isLoggedIn = false;
          state.isLoading = false;
          state.user = null;
        }
      )
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        logout.fulfilled,
        (state: { isLoading: boolean; isLoggedIn: boolean; user: null }) => {
          state.isLoggedIn = false;
          state.user = null;
          state.isLoading = false;
        }
      )
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      });
  },
});

const { reducer } = authSlice;
export default reducer;
