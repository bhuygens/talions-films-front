import React from 'react';
import "./tag.component.css"
type TagComponentProps = {
  text: string
}

function TagComponent({text}: TagComponentProps) {
  return (
    <div className={"tag"}>
      {text}
    </div>
  );
}

export default TagComponent;