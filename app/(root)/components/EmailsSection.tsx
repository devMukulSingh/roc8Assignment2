"use client";
import { IemailData } from "@/app/lib/types";
import React, { useEffect,  } from "react";
import EmailComp from "./EmailComp";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setEmailsList } from "@/redux/slice";
import {  useSearchParams } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/app/lib/utils";
import toast from "react-hot-toast";

type TapiData = {
    list : IemailData[]
};
type Props = {
    pageNumber:number;
}

const EmailsSection = ({ pageNumber }:Props) => {
  const { activeEmail, emailsList, favorites, readEmails } = useAppSelector(
    (state) => state
  );
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");
  const { data: emails } = useSWR<TapiData>(
    [`https://flipkart-email-mock.now.sh/?page=${pageNumber}`, pageNumber],
    fetcher,
    {
      onError(e) {
        toast.error(`Something went wrong, please try again later`);
        console.log(e);
      },
    }
  );

  useEffect(() => {
    if (filter)
      switch (filter) {
        case "read":
          dispatch(setEmailsList(readEmails));
          break;
        case "unread":
          const readEmailsId = readEmails?.map((email) => email.id);
          const unreadEmails = emails?.list.filter((email) => {
            if (readEmailsId?.includes(email.id)) return false;
            else return true;
          });
          console.log(unreadEmails, "unreadEmails");
          dispatch(setEmailsList(unreadEmails));
          break;
        case "favorite":
          dispatch(setEmailsList(favorites));
          break;
        default:
          null;
      }
    else dispatch(setEmailsList(emails?.list));
  }, [searchParams]);

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
      {(emailsList ? emailsList : emails?.list)?.map(
        (email: IemailData, index: number) => (
          <EmailComp email={email} key={index} />
        )
      )}


    </div>
  );
};

export default EmailsSection;
