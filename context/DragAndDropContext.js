// DragDropContext.js
import { createContext, useContext, useRef, useState } from "react";

const DragDropContext = createContext();

export const useDragDrop = () => {
  const context = useContext(DragDropContext);
  if (!context) {
    throw new Error("useDragDrop must be used within a DragDropProvider");
  }
  return context;
};

export const DragDropProvider = ({ children }) => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dropPosition, setDropPosition] = useState(null);
  const droppableRefs = useRef(new Map());

  const registerDroppable = (id, layout) => {
    droppableRefs.current.set(id, layout);
  };

  const unregisterDroppable = (id) => {
    droppableRefs.current.delete(id);
  };

  const getDroppableLayout = (id) => {
    return droppableRefs.current.get(id);
  };

  const isPointInDroppable = (pageX, pageY, droppableId) => {
    const layout = getDroppableLayout(droppableId);
    if (!layout) return false;

    return (
      pageX >= layout.x &&
      pageX <= layout.x + layout.width &&
      pageY >= layout.y &&
      pageY <= layout.y + layout.height
    );
  };

  const findDroppableAtPoint = (pageX, pageY) => {
    for (const [id, layout] of droppableRefs.current.entries()) {
      if (
        pageX >= layout.x &&
        pageX <= layout.x + layout.width &&
        pageY >= layout.y &&
        pageY <= layout.y + layout.height
      ) {
        return id;
      }
    }
    return null;
  };

  const value = {
    draggedItem,
    setDraggedItem,
    isDragging,
    setIsDragging,
    dropPosition,
    setDropPosition,
    registerDroppable,
    unregisterDroppable,
    getDroppableLayout,
    isPointInDroppable,
    findDroppableAtPoint,
  };

  return (
    <DragDropContext.Provider value={value}>
      {children}
    </DragDropContext.Provider>
  );
};
