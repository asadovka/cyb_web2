import * as React from "react";

interface SearchTimeProps {
  readonly time: number;
  readonly results: number;
}

export function SearchTime({time, results}: SearchTimeProps) {
  return (
    <p className="help has-text-centered">
      {`About ${results} results (${time/1000} seconds).`}
    </p>
  );
}
