'use client';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { setEmailsList } from '@/redux/slice';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

const Header = () => {
    const router = useRouter();
    const  pathName = usePathname();
    const dispatch = useAppDispatch();
    const searchParams = useSearchParams().get("filter");
    const  { emailsList,favorites,
        readEmails,unreadEmails
     } = useAppSelector( state => state);

    const navitems = [
      {
        title: "Unread",
        isActive: searchParams === "unread",
        link: "/?filter=unread",
      },
      {
        title: "Read",
        isActive: searchParams === "read",
        link: "/?filter=read",
      },
      ,
      {
        title: "Favorite",
        isActive: searchParams === "favorite",
        link: "/?filter=favorite",
      },
    ];
    const handleClick = ( nav:typeof navitems[0] ) => {
        if(nav?.isActive){
            router.push('/');
            return;
        }
        router.push(nav?.link || "");
    }
  return (
    <div className="flex items-center gap-5 h-16 ">
      <h1>Filter By:</h1>
      {navitems.map((nav, index) => (
        <button
          className={`${nav?.isActive ? "bg-filter rounded-full px-3 transition-all  " : ""}`}
          onClick={() => handleClick(nav)}
          key={index}
        >
          {nav?.title}
        </button>
      ))}
    </div>
  );
}

export default Header