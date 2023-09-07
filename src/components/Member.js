import "./Member.css";

import { useData } from "../context/DataContext";
import { useState } from "react";
import { useEffect } from "react";

function Member({ name, email, role, id, selectedMember, index }) {
  const { dispatch, editDataIndex, adminData } = useData();

  const [editedName, setEditedName] = useState(name);
  const [editedEmail, setEditedEmail] = useState(email);
  const [editedRole, setEditedRole] = useState(role);

  useEffect(() => {
    setEditedName(name);
    setEditedEmail(email);
    setEditedRole(role);
  }, [name, email, role]);

  const handelNameChange = (e) => {
    setEditedName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEditedEmail(e.target.value);
  };

  const handleRoleChange = (e) => {
    setEditedRole(e.target.value);
  };

  const handleSaveChanges = (e) => {
    if (!editedName || !editedEmail || !editedRole) {
      alert("Please fill in all fields before saving.");
      return;
    }

    const updatedData = {
      id: id,
      name: editedName,
      email: editedEmail,
      role: editedRole,
    };

    const newData = [...adminData];
    const dataIndex = newData.findIndex((item) => item.id === id);

    if (dataIndex !== -1) {
      newData[dataIndex] = updatedData;
      dispatch({ type: "edited/save", payload: newData });
    }
  };

  const handleDelete = (e) => {
    dispatch({ type: "deleted", payload: id });
  };

  const handleEdit = (e) => {
    dispatch({ type: "edited/index", payload: Number(id - 1) });
  };

  return (
    <tr className={selectedMember ? "table-active" : ""}>
      <td>
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={selectedMember}
            onChange={() =>
              dispatch({
                type: "selected",
                payload: { id, name, email, role },
              })
            }
          />
        </div>
      </td>
      {editDataIndex === Number(id - 1) ? (
        <>
          <td>
            <input
              type="text"
              className="inputBox"
              value={editedName}
              onChange={handelNameChange}
            />
          </td>
          <td>
            <input
              type="email"
              className="inputBox emailClass"
              value={editedEmail}
              onChange={handleEmailChange}
            />
          </td>
          <td>
            <input
              type="text"
              className="inputBox"
              value={editedRole}
              onChange={handleRoleChange}
            />
          </td>
        </>
      ) : (
        <>
          <td>{name}</td>
          <td className="emailClass">{email}</td>
          <td>{role}</td>
        </>
      )}
      <td>
        <div className="d-grid gap-2 d-md-flex justify-content-md-center">
          {editDataIndex === Number(id - 1) ? (
            <button
              type="button"
              className="btn btn-sm btn-outline-success"
              onClick={handleSaveChanges}
            >
              Save Changes
            </button>
          ) : (
            <>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={handleEdit}
                disabled={editDataIndex !== -1}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-danger"
                onClick={handleDelete}
                disabled={editDataIndex !== -1}
              >
                Delete
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}

export default Member;
