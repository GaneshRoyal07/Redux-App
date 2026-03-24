import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUsers, addUser, updateUser, deleteUser } from "../services/api";

// Fetch Users
export const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const res = await getUsers();
  return res.data;
});

// Add User
export const createUser = createAsyncThunk("users/add", async (user) => {
  await addUser(user);
  return user;
});

// Update User
export const editUserAsync = createAsyncThunk(
  "users/update",
  async ({ id, user }) => {
    await updateUser(id, user);
    return { id, ...user };
  }
);

// Delete User
export const deleteUserAsync = createAsyncThunk(
  "users/delete",
  async (id) => {
    await deleteUser(id);
    return id;
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(editUserAsync.fulfilled, (state, action) => {
        const index = state.list.findIndex(
          (u) => u.id === action.payload.id
        );
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(deleteUserAsync.fulfilled, (state, action) => {
        state.list = state.list.filter(
          (u) => u.id !== action.payload
        );
      });
  },
});

export default userSlice.reducer;