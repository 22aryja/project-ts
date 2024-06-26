import { useEffect, useState } from "react";
import "./paginator.scss";
import { useSearchParams } from "react-router-dom";

type PaginatorProps = {
  active: number;
  setActive: (active: number) => void;
  totalPages: number;
};

export default function Paginator({
  active,
  setActive,
  totalPages,
}: PaginatorProps) {
  const [page, setPage] = useState<number>(1);
  const [_, setSearchParams] = useSearchParams();

  useEffect(() => {
    updatePageParams();
  }, [page]);

  const updatePageParams = () => {
    setSearchParams({ ["page"]: active.toString() });
  };

  return (
    <div className="paginator">
      <div className="paginator-border">
        {[...Array(totalPages)].map((_, index) => {
          const page = index + 1;
          return (
            <span
              key={page}
              className={`paginator-span ${active === page ? "current" : ""}`}
              onClick={() => {
                setActive(page), setPage(page);
              }}
            >
              {page}
            </span>
          );
        })}
      </div>
    </div>
  );
}
