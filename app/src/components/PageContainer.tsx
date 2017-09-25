import * as React from "react";
import {TopMenu} from "./TopMenu";

export function PageContainer({children}) {
  return (
    <div className="container is-fullhd">
      {children}
    </div>
  );
}
