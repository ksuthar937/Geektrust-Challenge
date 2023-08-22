import "./Pagination.css";

import { useData } from "../context/DataContext";

function Pagination() {
  const { adminDataPerPage, filterdList, dispatch, currentPage } = useData();

  const page = [];

  const totalPagesRequired = Math.ceil(filterdList.length / adminDataPerPage);

  for (let i = 1; i <= totalPagesRequired; i++) {
    page.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        <li className={currentPage <= 1 ? "page-item disabled" : "page-item"}>
          <button
            className="page-link"
            href="#"
            aria-label="Previous"
            onClick={() => dispatch({ type: "page/navigate", payload: 1 })}
          >
            <span aria-hidden="true">&laquo;</span>
          </button>
        </li>
        <li className={currentPage <= 1 ? "page-item disabled" : "page-item"}>
          <button
            className="page-link"
            href="#"
            aria-label="Previous"
            onClick={() =>
              dispatch({ type: "page/navigate", payload: currentPage - 1 })
            }
          >
            <span aria-hidden="true">&lt;</span>
          </button>
        </li>
        {page.map((element) => (
          <li
            key={element}
            className={
              currentPage === element ? "page-item active" : "page-item"
            }
          >
            <button
              className="page-link"
              href="#"
              onClick={() =>
                dispatch({ type: "page/navigate", payload: element })
              }
            >
              {element}
            </button>
          </li>
        ))}
        <li
          className={
            currentPage >= totalPagesRequired
              ? "page-item disabled"
              : "page-item"
          }
        >
          <button
            className="page-link"
            href="#"
            aria-label="Next"
            onClick={() =>
              dispatch({ type: "page/navigate", payload: currentPage + 1 })
            }
          >
            <span aria-hidden="true">&gt;</span>
          </button>
        </li>
        <li
          className={
            currentPage >= totalPagesRequired
              ? "page-item disabled"
              : "page-item"
          }
        >
          <button
            className="page-link"
            href="#"
            aria-label="Next"
            onClick={() =>
              dispatch({ type: "page/navigate", payload: totalPagesRequired })
            }
          >
            <span aria-hidden="true">&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
