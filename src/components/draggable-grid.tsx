"use client";
import * as React from "react";
import Masonry from "react-masonry-css";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BoxCard, BoxCardSize } from "./box-card";
import clsx from "clsx";
import { restrictToParentElement } from "@dnd-kit/modifiers";

// Example box data. To add a box, add an object to this array.
// To change size, set the 'size' property to 'small', 'medium', or 'large'.
const initialBoxes = [
  { id: "profile", size: "medium" as BoxCardSize, title: "Name", content: "Your Name Here" },
  { id: "skills", size: "small" as BoxCardSize, title: "Skill 1", content: "Skill details..." },
  { id: "experience", size: "large" as BoxCardSize, title: "Experience Header", content: "Experience 1, Experience 2..." },
  { id: "projects", size: "medium" as BoxCardSize, title: "Project Header", content: "Project 1, Project 2..." },
  { id: "testimonials", size: "small" as BoxCardSize, title: "Testimonial", content: "Testimonial details..." },
];

// Sortable item wrapper for dnd-kit
function SortableBox({ id, size, title, children }: {
  id: string;
  size: BoxCardSize;
  title: string;
  children: React.ReactNode;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 20 : undefined,
    opacity: isDragging ? 0.7 : 1,
    marginBottom: 8, // consistent vertical gap
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className={clsx("cursor-grab active:cursor-grabbing w-full")}> 
      <BoxCard size={size} title={title}>{children}</BoxCard>
    </div>
  );
}

export function DraggableGrid() {
  const [boxes, setBoxes] = React.useState(initialBoxes);
  const sensors = useSensors(useSensor(PointerSensor));

  // Masonry breakpoints: adjust columns for different screen sizes
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      modifiers={[restrictToParentElement]}
      onDragEnd={(event) => {
        const { active, over } = event;
        if (over && active.id !== over.id) {
          setBoxes((items) => {
            const oldIndex = items.findIndex((b) => b.id === active.id);
            const newIndex = items.findIndex((b) => b.id === over.id);
            return arrayMove(items, oldIndex, newIndex);
          });
        }
      }}
    >
      {/*
        To add a new box, add an object to the initialBoxes array above.
        To change a box's size, set its 'size' property to 'small', 'medium', or 'large'.
        To adjust the number of columns, edit breakpointColumnsObj.
      */}
      <SortableContext items={boxes.map((b) => b.id)} strategy={rectSortingStrategy}>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-full max-w-6xl mx-auto"
          columnClassName="masonry-column px-2"
        >
          {boxes.map((box) => (
            <SortableBox key={box.id} id={box.id} size={box.size} title={box.title}>
              {box.content}
            </SortableBox>
          ))}
        </Masonry>
      </SortableContext>
    </DndContext>
  );
} 