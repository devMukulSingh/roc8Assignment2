"use client";
import { IemailData } from "@/app/lib/types";
import React, { useEffect } from "react";
import EmailComp from "./EmailComp";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setEmailsList } from "@/redux/slice";
import { useParams, useSearchParams } from "next/navigation";

type Props = {
  emails: IemailData[];
};

const EmailsSection = ({ emails }: Props) => {
  const { activeEmail, emailsList, favorites, readEmails } = useAppSelector(
    (state) => state
  );
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter');
  useEffect(() => {
    
    if (filter)
      switch (filter) {
        case "read":
          dispatch(setEmailsList(readEmails));
          break;
        case "unread":
          const readEmailsId = readEmails?.map((email) => email.id);
          const unreadEmails = emails.filter((email) => {
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
    else dispatch(setEmailsList(emails));
  }, [searchParams]);

  return (
    <div
      className={`flex 
      flex-col 
      gap-5  
      overflow-auto 
      max-h-[calc(100vh-8rem)]
      ${activeEmail ? "w-1/3" : "w-full"}
    `}
    >
      {emailsList?.map((email: IemailData, index: number) => (
        <EmailComp email={email} key={index} />
      ))}
    </div>
  );
};

export default EmailsSection;
