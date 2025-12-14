import { createContext, useContext, useState } from "react";

/**
 * dragState shape:
 * {
 *   isDragging: boolean,
 *   activeUser: object | null,
 *   position: { x: number, y: number }, // screen coords (gesture.moveX/moveY)
 *   overTeamId: string | null, // team id currently hovered
 * }
 */

const DragContext = createContext(null);

export const DragDropProvider = ({ children }) => {
  const [dragState, setDragState] = useState({
    isDragging: false,
    activeUser: null,
    position: { x: 0, y: 0 },
    overTeamId: null,
    droppableScrollOffSet: { x: 0, y: 0 },
  });
  // console.log(
  //   `dragState?.droppableScrollOffSet`,
  //   dragState?.droppableScrollOffSet
  // );

  const update = (patch) => setDragState((s) => ({ ...s, ...patch }));

  return (
    <DragContext.Provider value={{ dragState, update }}>
      {children}
    </DragContext.Provider>
  );
};

export const useDrag = () => {
  const ctx = useContext(DragContext);
  if (!ctx) throw new Error("useDrag must be used inside DragDropProvider");
  return ctx;
};
