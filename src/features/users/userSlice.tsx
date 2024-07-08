import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserState, TUser } from '../../types/types';
// import { usersAPI}  from './usersAPI'; // Assuming your user service handles database operations
// import { Dispatch } from 'redux';


const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateUserSuccess(state, action: PayloadAction<TUser>) {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { updateUserStart, updateUserSuccess, updateUserFailure } = userSlice.actions;

// export const updateUserAsync = (id: number, data: TIUser) => async (dispatch: Dispatch) => {
//   try {
//     dispatch(updateUserStart());
//     const updatedUser = await usersAPI.useUpdateUserMutation(id, data);
//     dispatch(updateUserSuccess(updatedUser));
//     // Optionally update local storage here
//   } catch (error) {
//     dispatch(updateUserFailure(error.message || 'Failed to update user'));
//   }
// };

export default userSlice.reducer;
