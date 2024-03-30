const initialState = {
  list: [],
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_TODO": {
      if (action.payload.data) {
        const userId2Todo = action.payload.data.filter(
          (todo) => todo.userId === 2
        );
        if (state.list.length > 0) {
          return state;
        } else {
          return { list: userId2Todo };
        }
      } else {
        return state;
      }
    }
    case "ADD_TODO": {
      const newTodo = action.payload;
      const newList = [...state.list, newTodo];
      return { ...state, list: newList };
    }
    case "DELETE_TODO": {
      const newList = state.list.filter((todo) => todo.id !== action.payload);
      return { ...state, list: newList };
    }
    case "COMPLETE_TODO": {
      const updatedList = [...state.list];
      const todoToUpdate = updatedList.find(
        (todo) => todo.id === action.payload
      );

      if (todoToUpdate) {
        todoToUpdate.completed = !todoToUpdate.completed;
      }

      return { ...state, list: updatedList };
    }
    case "REORDER_TODOS": {
      const { sourceIndex, destinationIndex } = action.payload;
      const newList = [...state.list];
      const [reorderedItem] = newList.splice(sourceIndex, 1);
      newList.splice(destinationIndex, 0, reorderedItem);

      return {
        ...state,
        list: newList,
      };
    }
    case "redux-persist/REHYDRATE": {
      return { ...state, ...action.payload.todoReducer };
    }
    default:
      return state;
  }
};

export default todoReducer;
