import React, { useState, useEffect } from "react";

function UserForm({ addUser, updateUser, editingUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
    }
  }, [editingUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = { name, email };

    if (editingUser) {
      updateUser(editingUser.id, user);
    } else {
      addUser(user);
    }

    setName("");
    setEmail("");
  };

  return (
    <form className="mb-3" onSubmit={handleSubmit}>
      <input
        className="form-control mb-2"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="form-control mb-2"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button className="btn btn-success">
        {editingUser ? "Update" : "Add"}
      </button>
    </form>
  );
}

export default UserForm;