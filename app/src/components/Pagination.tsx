import * as React from "react";
import {Link} from "react-router";
import * as range from "lodash/range";

export function Pagination(props: PaginationProps) {
  if (props.loading || props.total <= 0) {
    return null;
  } else {
    return (
      <nav className="pagination is-centered" role="navigation" aria-label="pagination">
        {getPrevious(props.query, props.page, () => props.onClick(props.query, props.page - 1))}
        {getNext(props.query, props.page, props.total, () => props.onClick(props.query, props.page + 1))}

        <ul className="pagination-list">
          {range(0, props.total).map(page => {
            return (
              <li key={page}>
                <Link
                  to={getLink(props.query, page)}
                  disabled={page === props.page}
                  className="pagination-link"
                  onClick={() => props.onClick(props.query, page)}
                >
                  {page}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}

function getLink(query: string, page: number) {
  return {
    pathname: "/search",
    query: {
      q: query,
      page: page
    }
  };
}

function getPrevious(query: string, page: number, onClick) {
  const disabled = page === 0;

  if (disabled) {
    return (
      <button className="pagination-previous" disabled={true}>
        Previous page
      </button>
    );
  }

  return (
    <Link
      to={getLink(query, page)}
      className="pagination-previous"
      onClick={onClick}
    >
      Previous page
    </Link>
  );
}

function getNext(query: string, page: number, total: number, onClick) {
  const disabled = page === total - 1;

  if (disabled) {
    return (
      <button className="pagination-next" disabled={true}>
        Next page
      </button>
    );
  }

  return (
    <Link
      to={getLink(query, page + 1)}
      className="pagination-next"
      onClick={onClick}
    >
      Next page
    </Link>
  );
}

interface PaginationProps {
  readonly loading: boolean;
  readonly page: number;
  readonly query: string;
  readonly total: number;
  readonly onClick: (query: string, page: number) => void;
}
