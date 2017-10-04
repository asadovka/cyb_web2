import * as React from "react";

export function FooterComponent(props: { links: FooterComponentLink[] }) {
  return (
    <footer className="footer" style={{backgroundColor: "white"}}>
      <div className="container">
        <div className="content has-text-centered">
          <p>
            {props.links.map((link, index, array) => {
                return (
                  <span key={link.url}>
                    <a href={link.url}>{link.name}</a>
                    {(index !== array.length - 1) && " - "}
                  </span>
                );
              }
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}

export interface FooterComponentLink {
  readonly url: string;
  readonly name: string;
}
