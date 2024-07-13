import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

// Define a type for the slice state
interface UserState {
  listUser: any[]; // Change the type of listUser to any[]
  currentUser: any
}

// Define the initial state using that type
const initialState: UserState = {
  listUser: [],
  currentUser: {}
};

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setListUser: (state, action: PayloadAction<any>) => {
      state.listUser = action.payload;
    },
    addUser: (state, action: PayloadAction<any>) => {
      if (action.payload) {
        state.listUser.push(action.payload);
      }
    },
    setCurrentUser:(state,action: PayloadAction<any>) => {
      state.currentUser = action.payload
    },
    updateRole: (state, action: PayloadAction<any>) => {
      const { user_id, role } = action.payload;
      const user = state.listUser.find((item) => item.user_id === user_id);
      user.role = role;
    },
    deleteUser: (state, action: PayloadAction<any>) => {
      const user_id = action.payload;
      const index = state.listUser.findIndex((item) => item.user_id === user_id);
      state.listUser.splice(index, 1);
    }
  }
});

export const userActions = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.counter.value;

export default userSlice.reducer;
