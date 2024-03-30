import axios from "axios";

export const todoData = () => async (dispatch) => {
  await axios
    .get("https://jsonplaceholder.typicode.com/todos")
    .then((res) => {
      dispatch({
        type: "GET_TODO",
        payload: res,
      });
    })
    .catch((err) => {
      dispatch({
        type: "GET_TODO",
        payload: err,
      });
    });
};

export const addData = (data) => {
  return {
    type: "ADD_TODO",
    payload: data,
  };
};

export const deleteData = (id) => {
  return {
    type: "DELETE_TODO",
    payload: id,
  };
};
export const completeData = (id) => {
  return {
    type: "COMPLETE_TODO",
    payload: id,
  };
};

export const reorderData = (sourceIndex, destinationIndex) => {
  return {
    type: "REORDER_TODOS",
    payload: {
      sourceIndex,
      destinationIndex,
    },
  };
};
