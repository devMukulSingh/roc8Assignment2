import { useAppDispatch } from "@/redux/hook";
import { removeActivEmail } from "@/redux/slice";
import { mutate } from "swr";

type Props = {
  setPageNumber: (page: number) => void;
  pageNumber: number;
};

const Pagination = ({ setPageNumber, pageNumber }: Props) => {
  const dispatch = useAppDispatch();

  const handlePageClick = (page: number) => {
    dispatch(removeActivEmail());
    setPageNumber(page);
    mutate(
      (key) => true, // which cache keys are updated
      undefined, // update cache data to `undefined`
      { revalidate: false } // do not revalidate
    );
  };
  const pages = [1, 2, 3];
  return (
    <div className="border p-2 rounded-md flex justify-center gap-5 bg-white  mt-auto ">
      {pages.map((page, index) => (
        <button
          className="rounded-full h-8 w-8 border bg-accent text-white disabled:opacity-50 hover:opacity-80"
          disabled={pageNumber === page}
          key={index}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
