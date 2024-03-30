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
  return (dispatch)=> {
    dispatch({type: "ADD_TODO",
    payload: data
  });
};
}

export const deleteData = (id) => {
  return (dispatch)=> {
    dispatch({type: "DELETE_TODO",
    payload: id});
};
};
export const completeData = (id) => {
  return (dispatch)=> {
    dispatch({
      type: "COMPLETE_TODO",
      payload: id,
    });
};
};

export const reorderData = (sourceIndex, destinationIndex) => {
  return (dispatch)=> {
    dispatch({
      type: "REORDER_TODOS",
      payload: {
        sourceIndex,
        destinationIndex
      },
    });
};
};
