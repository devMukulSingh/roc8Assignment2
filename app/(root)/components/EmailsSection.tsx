"use client";
import { IemailData, TapiData } from "@/app/lib/types";
import React, { useEffect, useMemo, useState } from "react";
import EmailComp from "./EmailComp";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setEmailsList } from "@/redux/slice";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/app/lib/utils";
import toast from "react-hot-toast";

type Props = {};

const EmailsSection = ({}: Props) => {
  
  const page = Number(useSearchParams().get("page")) || 1;
    const { activeEmail, emailsList, favorites, readEmails } = useAppSelector(
      (state) => state
    );
  const { data: emails } = useSWR<TapiData>(
    [`https://flipkart-email-mock.now.sh/?page=${page}`, page],
    fetcher,
    {
      onError(e) {
        toast.error(`Something went wrong, please try again later`);
        console.log(e);
      },
    }
  );

  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");
  const paginatedMails = (filter ? emailsList?.slice( (page-1) * 10 , ((page-1) * 10 ) + 10 ) : emails?.list) || [];


  useEffect(() => {
    if (filter)
      switch (filter) {
        case "Read":
          dispatch(setEmailsList(readEmails));
          break;
        case "Unread":
          const readEmailsId = readEmails?.map((email) => email.id);
          const unreadEmails = emails?.list.filter((email) => {
            if (readEmailsId?.includes(email.id)) return false;
            else return true;
          });
          dispatch(setEmailsList(unreadEmails));
          break;
        case "Favorite":
          dispatch(setEmailsList(favorites));
          break;
        default:
          null;
      }
    else dispatch(setEmailsList(emails?.list));
  }, [filter]);

  return (
    <div
      className={`flex 
      flex-col 
      gap-5  
      overflow-auto 
      h-[calc(100vh-12rem)]
      
      max-h-[calc(100vh-12rem)]
      ${activeEmail ? "w-1/3" : "w-full"}
    `}
    >
      {
        paginatedMails.length > 0  ? paginatedMails?.map((email: IemailData, index: number) => (
        <EmailComp email={email} key={index} />
      ))
      : 
      <h1 className="text-center text-xl font-medium"> No Emails found</h1>
    }
    </div>
  );
};

export default EmailsSection;
