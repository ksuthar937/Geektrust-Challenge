import "./Table.css";

import TableBottom from "./TableBottom";
import Member from "./Member";

import { useData } from "../context/DataContext";

function Table() {
  const {
    filterdList,
    selected,
    dispatch,
    currentPage,
    adminDataPerPage,
    isLoading,
    error,
  } = useData();

  const selectedMember = selected.map((member) => member.id);

  const indexOfLastAdminData = currentPage * adminDataPerPage;
  const indexOfFirstAdminData = indexOfLastAdminData - adminDataPerPage;
  const currentAdminData = filterdList.slice(
    indexOfFirstAdminData,
    indexOfLastAdminData
  );

  if (isLoading)
    return (
      <div className="d-flex justify-content-center loader">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  if (error)
    return (
      <h4 className="error">
        <div
          className="alert alert-danger d-flex align-items-center justify-content-center m-5"
          role="alert"
        >
          <div>{error}</div>
        </div>
      </h4>
    );

  return (
    <div className="container">
      <div className="content">
        <br />
        <div className="row">
          <table className="table">
            <thead>
              <tr className="table-warning">
                <th scope="col">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value="1"
                      checked={selected.length === currentAdminData.length}
                      onChange={() =>
                        dispatch({
                          type: "selected/All",
                          payload: currentAdminData,
                        })
                      }
                    />
                  </div>
                </th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col" className="action">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filterdList &&
                currentAdminData.map((member, index) => (
                  <Member
                    name={member.name}
                    email={member.email}
                    role={member.role}
                    key={member.id}
                    id={member.id}
                    selectedMember={selectedMember.includes(member.id)}
                    index={index}
                  />
                ))}
            </tbody>
          </table>
          <TableBottom />
        </div>
      </div>
    </div>
  );
}

export default Table;
