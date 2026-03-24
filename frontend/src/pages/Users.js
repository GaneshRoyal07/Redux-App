import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import UserForm from "../components/UserForm";
import UserTable from "../components/UserTable";

import {
  fetchUsers,
  createUser,
  editUserAsync,
  deleteUserAsync,
} from "../redux/userSlice";

function Users() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.list);

  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleAddUser = (user) => {
    dispatch(createUser(user));
  };

  const handleDeleteUser = (id) => {
    dispatch(deleteUserAsync(id));
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleUpdateUser = (id, user) => {
    dispatch(editUserAsync({ id, user }));
    setEditingUser(null);
  };

  return (
    <div>
      <h2>User Management (Redux)</h2>

      <UserForm
        addUser={handleAddUser}
        updateUser={handleUpdateUser}
        editingUser={editingUser}
      />

      <UserTable
        users={users}
        deleteUser={handleDeleteUser}
        editUser={handleEditUser}
      />
    </div>
  );
}

export default Users;