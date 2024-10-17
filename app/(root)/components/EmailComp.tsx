"use client";
import { IemailData } from "@/app/lib/types";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setActiveEmail, setReadEmail } from "@/redux/slice";
import { format } from "date-fns";
import React, { useState } from "react";
import Avatar from "./Avatar";

type Props = {
  email: IemailData;
};

const EmailComp = ({ email }: Props) => {
  const dispatch = useAppDispatch();

  const { activeEmail, readEmails } = useAppSelector((state) => state);
  const isReadEmail = readEmails?.find(
    (readEmail) => readEmail.id === email.id,
  );

  const handleEmailClick = () => {
    dispatch(setActiveEmail(email));
    dispatch(setReadEmail(email));
  };

  return (
    <div
      style={
        isReadEmail
          ? { backgroundColor: "#f2f2f2" }
          : { backgroundColor: "#ffffff" }
      }
      onClick={handleEmailClick}
      className={`
    ${activeEmail?.id === email.id ? "border-accent" : ""}

    min-w-[18rem]
    flex
    gap-5 
    border-2 
    px-2
    md:px-5 
    py-2 
    rounded-md 
    text-sm
    cursor-pointer
    `}
    >
      <Avatar letter={email.from.name[0].toUpperCase()} />
      <section className="flex flex-col gap-2">
        <div>
          <h1>
            From :&nbsp;
            <span className="font-semibold">
              {email.from.name} &lt;{email.from.email}&gt;
            </span>
          </h1>
          <h1>
            Subject :&nbsp;
            <span className="font-semibold">{email.subject}</span>
          </h1>
        </div>
        <h1>{email.short_description}</h1>
        <footer className="flex gap-5 ">
          <h1>{format(email.date, "dd/MM/yyyy hh:mm a")}</h1>
        </footer>
      </section>
    </div>
  );
};

export default EmailComp;
