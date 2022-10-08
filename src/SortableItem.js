import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { images, noPrev } from "./images";

const SortableItem = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.id });

  const style = {
    cursor: "pointer",
    transform: CSS.Transform.toString(transform),
    transition,
    margin: "10px",
    textAlign: "center",
    opacity: isDragging ? 0.3 : 1,
    backgroundImage: `url(${
      images[Object.keys(images).find((el) => el === props.value)] || noPrev
    })`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "50% 50%",
  };

  const panelStyle = {
    ...style,
    width: "150px",
    height: "100px",
  };

  const featuredStyle = {
    ...style,
    width: "200px",
    height: "200px",
  };

  const toplevelStyle = {
    ...style,
    width: "200px",
    height: "100px",
  };

  const getItemStyle = (containerType) => {
    if (containerType === "featured") {
      return featuredStyle;
    }
    if (containerType === "toplevel") {
      return toplevelStyle;
    }
    return panelStyle;
  };

  return (
    <div
      ref={setNodeRef}
      style={getItemStyle(props.containerType)}
      {...listeners}
      {...attributes}
    >
      <h1 style={{ color: "white", textShadow: "2px 2px gray" }}>
        {props.value}
      </h1>
    </div>
  );
};

export default SortableItem;
