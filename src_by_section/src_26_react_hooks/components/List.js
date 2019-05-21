import React from "react";

const List = props => {
  console.log("rendering list");
  return (
    <div>
      <ul>
        {props.items.map(td => {
          return (
            <li onClick={props.clickHandler.bind(this, td)} key={td.id}>
              {td.data}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default List;
