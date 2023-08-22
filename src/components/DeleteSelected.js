import "./DeleteSelected.css";

import { useData } from "../context/DataContext";

function DeleteSelected() {
  const { dispatch, selected } = useData();
  return (
    <div className="DeleteButtonAlign">
      <button
        type="button"
        className="btn btn-danger"
        onClick={() => dispatch({ type: "delete/selected" })}
        disabled={!selected.length}
      >
        Delete Selected
      </button>
    </div>
  );
}

export default DeleteSelected;
