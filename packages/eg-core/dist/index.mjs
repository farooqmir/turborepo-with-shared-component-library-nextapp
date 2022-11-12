// src/Button.tsx
import { Fragment, jsx } from "react/jsx-runtime";
function Button(props) {
  const { text = "Default" } = props;
  return /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsx("button", {
      className: "bg-green-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded",
      children: props.children
    })
  });
}
Button.displayName = "Button";
export {
  Button
};
