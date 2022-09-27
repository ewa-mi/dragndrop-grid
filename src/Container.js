import React from "react";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";

import SortableItem from "./SortableItem";

export default function Container(props) {
  const { id, items, containerType } = props;

  const containerStyle = {
    maxWidth: "700px",
    minHeight: "180px",
    flexWrap: "wrap",
    display: "flex",
    border: containerType !== "panel" ? "1px solid gray" : "none",
    margin: "20px"
  };

  const { setNodeRef } = useDroppable({
    id
  });

  //Item style is supposed to be determined by the container type

  return (
    <SortableContext id={id} items={items} strategy={rectSortingStrategy}>
      <div ref={setNodeRef} style={containerStyle}>
        {items.map((item) => (
          <SortableItem
            key={item}
            id={item}
            value={item}
            containerType={containerType}
          />
        ))}
      </div>
    </SortableContext>
  );
}
