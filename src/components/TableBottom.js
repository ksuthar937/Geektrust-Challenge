import "./TableBottom.css";

import DeleteSelected from "./DeleteSelected";
import Pagination from "./Pagination";

function TableBottom() {
  return (
    <div className="alignButtons">
      <DeleteSelected />
      <Pagination />
    </div>
  );
}

export default TableBottom;
