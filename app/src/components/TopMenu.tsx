import * as React from "react";
import {Logo} from "./logo/Logo";

export function TopMenu() {
  return (
    <nav className="level">
      <p className="level-item has-text-centered">
        <Logo/>
      </p>
    </nav>
)
}
