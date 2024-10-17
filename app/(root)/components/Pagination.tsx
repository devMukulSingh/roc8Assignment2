import { TapiData } from "@/app/lib/types";
import { fetcher } from "@/app/lib/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { removeActivEmail } from "@/redux/slice";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import useSWR, { mutate } from "swr";

type Props = {};

const Pagination = ({}: Props) => {
  const searchParams = useSearchParams();
  const selectedPage = searchParams.get("page") || 1;
  const filter = searchParams.get("filter");
  const { emailsList } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data: emails } = useSWR<TapiData>(
    [`https://flipkart-email-mock.now.sh/?page=${selectedPage}`, selectedPage],
    fetcher,
    {
      onError(e) {
        toast.error(`Something went wrong, please try again later`);
        console.log(e);
      },
    }
  );
  
  const totalEmails = filter ? emailsList?.length : emails?.total;

  const pages = Array.from({
    length: Math.ceil((totalEmails || 1) / 10),
  });

  const handlePageClick = (page: number) => {
    dispatch(removeActivEmail());
    let params = new URLSearchParams(window.location.search);
    params.set("page", page.toString());
    router.push(`/?${params.toString()}`);
  };
  return (
    <div className="border p-2 rounded-md flex justify-center gap-5 bg-white  mt-auto ">
      {pages.map((_, index) => (
        <button
          className="rounded-full h-8 w-8 border bg-accent text-white disabled:opacity-50 hover:opacity-80"
          disabled={Number(selectedPage) === index + 1}
          key={index}
          onClick={() => handlePageClick(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
