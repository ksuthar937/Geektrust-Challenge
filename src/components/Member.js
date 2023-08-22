import "./Member.css";

import { useData } from "../context/DataContext";

function Member({ name, email, role, id, selectedMember, index }) {
  const { dispatch, editDataIndex, filterdList } = useData();

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
      {editDataIndex === index ? (
        <>
          <td>
            <input
              type="text"
              className="inputBox"
              value={name}
              onChange={(e) => {
                const newData = [...filterdList];
                newData[index].name = e.target.value;
                dispatch({ type: "edited/data", payload: newData });
              }}
            />
          </td>
          <td>
            <input
              type="email"
              className="inputBox"
              value={email}
              onChange={(e) => {
                const newData = [...filterdList];
                newData[index].email = e.target.value;
                dispatch({ type: "edited/data", payload: newData });
              }}
            />
          </td>
          <td>
            <input
              type="text"
              className="inputBox"
              value={role}
              onChange={(e) => {
                const newData = [...filterdList];
                newData[index].role = e.target.value;
                dispatch({ type: "edited/data", payload: newData });
              }}
            />
          </td>
        </>
      ) : (
        <>
          <td>{name}</td>
          <td>{email}</td>
          <td>{role}</td>
        </>
      )}
      <td>
        <div className="d-grid gap-2 d-md-flex justify-content-md-center">
          {editDataIndex === index ? (
            <button
              type="button"
              className="btn btn-sm btn-outline-success"
              onClick={() => {
                const newData = [...filterdList];
                newData[index] = filterdList[index];
                dispatch({ type: "edited/save", payload: newData });
              }}
            >
              Save Changes
            </button>
          ) : (
            <>
              <button
                type="button"
                className="btn btn-sm btn-outline-secondary"
                onClick={() =>
                  dispatch({ type: "edited/index", payload: index })
                }
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-sm btn-outline-danger"
                onClick={() => dispatch({ type: "deleted", payload: id })}
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
