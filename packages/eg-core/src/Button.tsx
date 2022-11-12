import * as React from "react";

export interface ButtonProps {
  children?: React.ReactNode;
  text?: string
}

export function Button(props: ButtonProps) {
  const {text="Default"} = props;
  return <>
  <button className="bg-green-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">{props.children}</button>
  </>
}

Button.displayName = "Button";
