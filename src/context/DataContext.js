import { createContext, useContext, useEffect, useReducer } from "react";
import { searchQuery } from "../functions/searchQuery";

const URL =
  "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

const DataContext = createContext();

const initialState = {
  adminData: [],
  isLoading: false,
  error: "",
  query: "",
  filterdList: [],
  selected: [],
  deleted: null,
  editDataIndex: -1,
  currentPage: 1,
  adminDataPerPage: 10,
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "loaded":
      return {
        ...state,
        isLoading: false,
        adminData: action.payload,
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    case "search":
      return { ...state, query: action.payload, currentPage: 1 };
    case "filter":
      return { ...state, filterdList: action.payload };
    case "selected":
      if (state.selected.find((member) => member.id === action.payload.id)) {
        return {
          ...state,
          selected: state.selected.filter(
            (member) => member.id !== action.payload.id
          ),
        };
      } else {
        return { ...state, selected: [...state.selected, action.payload] };
      }
    case "selected/All":
      if (state.selected.length === action.payload.length) {
        return { ...state, selected: [] };
      }
      return { ...state, selected: action.payload };
    case "deleted":
      return {
        ...state,
        deleted: action.payload,
        filterdList: state.filterdList.filter(
          (member) => member.id !== action.payload
        ),
      };
    case "delete/selected":
      const selectedIds = state.selected.map((element) => element.id);
      return {
        ...state,
        selected: [],
        filterdList: state.filterdList.filter(
          (member) => !selectedIds.includes(member.id)
        ),
      };
    case "edited/index":
      return {
        ...state,
        editDataIndex: action.payload,
      };
    case "edited/data":
      return {
        ...state,
        adminData: action.payload,
      };
    case "edited/save":
      return {
        ...state,
        adminData: action.payload,
        editDataIndex: -1,
      };
    case "page/navigate":
      return { ...state, currentPage: action.payload };
    default:
      throw new Error("action type unknown!");
  }
}

function DataProvider({ children }) {
  const [
    {
      adminData,
      isLoading,
      query,
      error,
      filterdList,
      selected,
      deleted,
      editDataIndex,
      currentPage,
      adminDataPerPage,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  useEffect(function () {
    async function fetchData() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${URL}`);
        const data = await res.json();
        dispatch({ type: "loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "Oops..🙁 There was an error while loading Data!",
        });
      }
    }
    fetchData();
  }, []);

  useEffect(
    function () {
      const result = searchQuery(adminData, query);
      dispatch({ type: "filter", payload: result });
    },
    [adminData, query]
  );

  return (
    <DataContext.Provider
      value={{
        adminData,
        isLoading,
        error,
        query,
        dispatch,
        filterdList,
        selected,
        deleted,
        editDataIndex,
        currentPage,
        adminDataPerPage,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

function useData() {
  const context = useContext(DataContext);
  if (context === undefined)
    throw new Error("DataContext used outside the DataProvider");
  return context;
}

export { DataProvider, useData };
