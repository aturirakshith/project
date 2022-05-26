import React, { useState } from "react";
function Foo() {
  return (
    <>
      <div className="div-foo">
        <h1>Iam {func()}</h1>
      </div>
      <div className="div-bar">
        <h1>Iam foo</h1>
        <Bar text="iam bar" fun={() => "bar"} />
      </div>
    </>
  );
}
export function Bar(props) {
  return (
    <>
      <h1>{props.text}</h1>
      <button onClick={props.fun}>Click me</button>
    </>
  );
}

export function func() {
  return 420;
}
export default Foo;
