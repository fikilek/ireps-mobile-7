import { useRef } from "react";
import { Animated, PanResponder, StyleSheet, Text } from "react-native";
import { truncateString } from "../../utils/utilsCommon";
import { useDrag } from "./DragDropContext";

/**
 * Props:
 *  - user: { id, name, ... }  // the user object to be moved
 */

const DraggableUser = ({ user }) => {
  const pan = useRef(new Animated.ValueXY()).current;
  const { update } = useDrag();

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({ x: pan.x._value || 0, y: pan.y._value || 0 });
        pan.setValue({ x: 0, y: 0 });
        update({
          isDragging: true,
          activeUser: user,
        });
      },
      onPanResponderMove: (evt, gesture) => {
        // Move the visual element
        Animated.event([null, { dx: pan.x, dy: pan.y }], {
          useNativeDriver: false,
        })(evt, gesture);
        // Also update context with current screen coords so droppables can test overlap
        // gesture.moveX and gesture.moveY are screen coordinates
        update({
          position: { x: gesture.moveX, y: gesture.moveY },
        });
      },
      onPanResponderRelease: (evt, gesture) => {
        // finalize drag
        pan.flattenOffset();
        update({
          isDragging: false,
          position: { x: gesture.moveX, y: gesture.moveY }, // final drop coords
        });

        // animate the draggable back to initial position (you can change to desired behavior)
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
      onPanResponderTerminationRequest: () => false,
      onPanResponderTerminate: () => {
        // treat as cancelled
        pan.flattenOffset();
        update({ isDragging: false, activeUser: null, overTeamId: null });
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.card,
        { transform: pan.getTranslateTransform(), key: user.id },
      ]}
    >
      <Text style={styles.name}>{truncateString(user.email, 15)}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 6,
    backgroundColor: "#4fa3ff",
    borderRadius: 5,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    marginVertical: 8,
    marginHorizontal: 5,
    zIndex: 1000,
  },
  name: { color: "white", fontSize: 12 },
});

export default DraggableUser;
