import { useRef } from "react";

export default function Settings() {
  const headingRef = useRef();
  const subHeadingRef = useRef();

  // function changeColor() {
  //   const textEl = document.getElementById("text");
  //   textEl.style.color = "red";
  // }

  function changeColor() {
    headingRef.current.style.color = "red";
    headingRef.current.style.fontWeight = "200";
    subHeadingRef.current.style.color = "orange";
    subHeadingRef.current.style.fontWeight = "100";
  }

  return (
    <div>
      <h1 ref={headingRef}>Settings</h1>
      <h3 ref={subHeadingRef}>Settings page for changing ap settings</h3>
      <button onClick={changeColor}>Change</button>
    </div>
  );
}
