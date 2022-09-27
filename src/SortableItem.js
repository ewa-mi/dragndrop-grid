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
    isDragging
  } = useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: "150px",
    height: "100px",
    backgroundColor: "white",
    margin: "10px",
    zIndex: isDragging ? "100" : "auto",
    opacity: isDragging ? 0.3 : 1,
    backgroundImage: `url(${
      images[Object.keys(images).find((el) => el === props.value)] || noPrev
    })`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "50% 50%"
  };

  const featuredStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: "200px",
    height: "200px",
    margin: "10px",
    zIndex: isDragging ? "100" : "auto",
    opacity: isDragging ? 0.3 : 1,
    textAlign: "center",
    backgroundImage: `url(${
      images[Object.keys(images).find((el) => el === props.value)] || noPrev
    })`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "50% 50%"
  };

  const toplevelStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    width: "200px",
    height: "100px",
    margin: "10px",
    zIndex: isDragging ? "100" : "auto",
    opacity: isDragging ? 0.3 : 1,
    textAlign: "center",
    backgroundImage: `url(${
      images[Object.keys(images).find((el) => el === props.value)] || noPrev
    })`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "50% 50%"
  };

  const getItemStyle = (containerType) => {
    if (containerType === "featured") {
      return featuredStyle;
    }
    if (containerType === "toplevel") {
      return toplevelStyle;
    }
    return style;
  };

  return (
    <div ref={setNodeRef} style={getItemStyle(props.containerType)}>
      <button {...listeners} {...attributes}>
        Drag handle
      </button>
      <h1 style={{ color: "white", textShadow: "2px 2px gray" }}>
        {props.value}
      </h1>
    </div>
  );
};

export default SortableItem;
