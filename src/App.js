import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy
} from "@dnd-kit/sortable";

import Container from "./Container";
import { images, noPrev } from "./images";

const App = () => {
  const [activeId, setActiveId] = useState(null);
  const [items, setItems] = useState({
    container1: ["one", "two", "three", "four", "five"],
    container2: ["A", "B", "C", "D"],
    container3: ["xx", "yy", "zz", "dd", "nn"]
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  // const handleDragStart = (event) => {
  //   setActiveId(event.active.id);
  // };

  // const handleDragEnd = (event) => {
  //   setActiveId(null);
  //   const { active, over } = event;

  //   if (active.id !== over.id) {
  //     setItems((items) => {
  //       const oldIndex = items.indexOf(active.id);
  //       const newIndex = items.indexOf(over.id);

  //       return arrayMove(items, oldIndex, newIndex);
  //     });
  //   }
  // };

  function findContainer(id) {
    if (id in items) {
      return id;
    }

    return Object.keys(items).find((key) => items[key].includes(id));
  }

  function handleDragStart(event) {
    const { active } = event;
    const { id } = active;

    setActiveId(id);
  }

  function handleDragOver(event) {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over;

    // Find the containers
    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setItems((prev) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];

      // Find the indexes for the items
      const activeIndex = activeItems.indexOf(id);
      const overIndex = overItems.indexOf(overId);

      let newIndex;
      if (overId in prev) {
        newIndex = overItems.length + 1;
      } else {
        newIndex = overIndex >= 0 ? overIndex : overItems.length + 1;
      }

      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter((item) => item !== active.id)
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          items[activeContainer][activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length)
        ]
      };
    });
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    const { id } = active;
    const { id: overId } = over;

    const activeContainer = findContainer(id);
    const overContainer = findContainer(overId);

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = items[activeContainer].indexOf(active.id);
    const overIndex = items[overContainer].indexOf(overId);

    if (activeIndex !== overIndex) {
      setItems((items) => ({
        ...items,
        [overContainer]: arrayMove(items[overContainer], activeIndex, overIndex)
      }));
    }

    setActiveId(null);
  }

  return (
    <div
      style={{
        display: "flex"
      }}
    >
      <DndContext
        sensors={sensors}
        //collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCenter}
      >
        <div>
          <Container
            id="container1"
            items={items.container1}
            containerType="featured"
          />
          <Container
            id="container2"
            items={items.container2}
            containerType="toplevel"
          />
        </div>
        <div
          style={{
            width: "180px",
            height: "600px",
            overflowY: "auto",
            backgroundColor: "lightgray",
            marginTop: "20px"
          }}
        >
          <Container
            id="container3"
            items={items.container3}
            containerType="panel"
          />
        </div>
        <DragOverlay>
          {activeId ? (
            <div
              style={{
                // TODO: This should have the image bckgr.

                width: "100px",
                height: "100px",
                backgroundColor: "white",
                opacity: "0.5",
                backgroundImage: `url(${
                  images[Object.keys(images).find((el) => el === activeId)] ||
                  noPrev
                })`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "50% 50%"
              }}
            ></div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default App;
