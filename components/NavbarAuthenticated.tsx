import React from "react";
import { UserProfile } from "@auth0/nextjs-auth0/client";
import Link from "next/link";

export default function NavbarAuthenticated({ user }: { user: UserProfile }) {
  const accountDropdownLinks = [
    {
      title: "Account",
      url: "/account",
    },
  ];
  const recentShareLinks = [
    // todo
  ];

  return (
    <div className="flex-none">
      {/* <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            <span className="badge badge-sm indicator-item">8</span>
          </div>
        </label>
        <div
          tabIndex={0}
          className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
        >
          <div className="card-body">
            <span className="font-bold text-lg">8 Items</span>
            <span className="text-info">Subtotal: $999</span>
            <div className="card-actions">
              <button className="btn btn-primary btn-block">View cart</button>
            </div>
          </div>
        </div>
      </div> */}
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar flex flex-row w-full pl-4 pr-1">
      <p className="text-bold">{user.nickname}</p>
          <div className="w-10 rounded-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user.picture ?? "raba-logo.png"}
              alt={`profile photo for ${user.nickname}`}
            />
          </div>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          {accountDropdownLinks.map((link) => (
            <li key={link.url}>
              <Link href={"/account"} className="py-2 peer-hover:font-extralight hover:font-semibold">{link.title}</Link>
            </li>
          ))}
          <li>
            {/* this has to be separate because it's not a page we're visiting */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/api/auth/logout" className="py-2 peer-hover:font-extralight hover:font-semibold">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
