"use client";
import { useAppDispatch } from "@/redux/hook";
import { removeActivEmail } from "@/redux/slice";
import {  useRouter, useSearchParams } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const filterParam = searchParams.get("filter");

  const navitems = [
    {
      title: "Unread",
      isActive: filterParam === "Unread",
    },
    {
      title: "Read",
      isActive: filterParam === "Read",
    },
    ,
    {
      title: "Favorite",
      isActive: filterParam === "Favorite",
    },
  ];
  const handleClick = (nav: (typeof navitems)[0]) => {
    let params = new URLSearchParams(window.location.search);
    if (nav?.isActive) {
      params.delete("filter");
      router.push(`/?${params.toString()}`);
      return;
    }
    router.push(`/?filter=${nav?.title}`);
    dispatch(removeActivEmail());
  };
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
};

export default Header;
