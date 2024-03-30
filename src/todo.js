import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addData,
  todoData,
  deleteData,
  completeData,
  reorderData,
} from "./redux/action";
import deleteimg from "./assets/delete.svg";
import { v4 as uuidv4 } from "uuid";
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";

function Todo() {
  const [title, setTitle] = useState("");
  const [todoList, setTodoList] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(todoData());
  }, []);

  const todos = useSelector((s) => s.todoReducer);
  useEffect(() => {
    dispatch(todoData());
    setTodoList(todos.list);
  }, [dispatch, todos]);

  function addTodo(e) {
    e.preventDefault();
    const data = {
      userId: 2,
      id: uuidv4(),
      title: title,
      completed: false,
    };
    dispatch(addData(data));
    setTitle("");
  }
  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;
    dispatch(reorderData(sourceIndex, destinationIndex));
  };

  return (
    <div className="w-full flex flex-col justify-center items-center">
        <h1 className="text-pink-300 font-bold text-4xl mb-8">TODO LIST</h1>
      <form onSubmit={(e) => addTodo(e)} className="w-full flex flex-col justify-center items-center">
        <textarea
          required
          placeholder="Add a todo task"
          maxLength={200}
          className="resize-none w-full p-6 rounded-xl mb-4 border-2 border-black outline-none"
          rows={2}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></textarea>
        <button type="submit" className="bg-[#7a99d6] px-6 py-2 text-white rounded-lg">Add</button>
      </form>
      <DragDropContext onDragEnd={(results) => handleDragEnd(results)}>
        <Droppable droppableId="todoList">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="w-full"
            >
              {provided.placeholder}
              {todoList &&
                todoList.map((e, ind) => (
                  <Draggable draggableId={String(e.id)} index={ind} key={e.id}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="w-full flex justify-between bg-gradient-to-r from-[#7a99d6] to-[#e9a9c9] shadow-lg shadow-gray-400 px-6 py-8 sm:p-8 my-4 rounded-2xl border-2 border-gray-400"
                        style={{
                          ...(provided.draggableProps?.style || {}),
                          opacity: snapshot.isDragging ? 0.5 : 1,
                        }}
                      >
                        <p
                          className={
                            e.completed === true
                              ? "line-through font-medium"
                              : "font-medium"
                          }
                        >
                          {e.title}
                        </p>
                        <div className="flex gap-2 justify-center items-center">
                            <img
                              src={deleteimg}
                              className="cursor-pointer pl-4"
                              onClick={() => {
                                if (!snapshot.isDragging) {
                                  dispatch(deleteData(e.id));
                                }
                              }}
                            ></img>
                          <input
                            type="checkbox"
                            checked={e.completed}
                            onChange={() => dispatch(completeData(e.id))}
                          />
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default Todo;
