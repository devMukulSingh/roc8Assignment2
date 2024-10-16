"use client";
import { IemailBody } from "@/app/lib/types";
import { fetcher } from "@/app/lib/utils";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setFavoriteEmail } from "@/redux/slice";
import React from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import Avatar from "./Avatar";

const EmailBody = () => {
  const dispatch = useAppDispatch();
  const { activeEmail, favorites } = useAppSelector((state) => state);
  const { data: emailBody } = useSWR<IemailBody>(
    [`https://flipkart-email-mock.now.sh/?id=${activeEmail?.id}`],
    fetcher,
    {
      onError(e) {
        toast.error(`Something went wrong, please try again later`);
        console.log(e);
      },
      revalidateOnFocus: false,
    },
  );
  const isFavorite = favorites?.find((fav) => fav.id === activeEmail?.id);
  if (!activeEmail) return null;
  return (
    <div
      className={`
    w-2/3
    flex 
    border-2 
    h-fit 
    rounded-lg  
    flex-col 
    gap-3 
    bg-white 
    md:pr-14 
    md:pl-8 
    md:py-8  
    p-3
    overflow-auto 
    max-h-[calc(100vh-12rem)] 
    `}
    >
      <div className="  flex gap-3  sm:gap-5 md:gap-8 min-h-[20rem]  ">
        <Avatar letter={activeEmail.from.name[0].toUpperCase()} />
        <section className="flex flex-col gap-5 w-full ">
          <div className="flex justify-between w-full ">
            <h1 className="text-xl font-bold">Lorem Ipsum</h1>
            <button
              onClick={() => dispatch(setFavoriteEmail(activeEmail))}
              className={`${
                isFavorite ? "bg-red-400 scale-95 transition" : "bg-accent"
              } text-xs text-white rounded-full px-4 py-1`}
            >
              {isFavorite ? "Remove favorite" : "Mark as favorite"}
            </button>
          </div>
          <p className="text-sm">26/2/2020 10:11am</p>
          <p className="text-sm break-words">{emailBody?.body}</p>
        </section>
      </div>
    </div>
  );
};

export default EmailBody;
