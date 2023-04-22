import React, { useState } from "react";
import { User } from "./types/User";
import Link from "next/link";

export default function Navbar() {
  const [user] = useState<User>({
    id: 3,
    name: "Tommy Wiseau",
    email: "twiseau@theroom.com",
    phone: "314-159-2653",
    organization: "Flowers",
    avatarUrl: "https://brianprost.com/img/brian-prost-scarecrow.webp",
  });

  return (
    <div className="navbar h-full px-4">
      <div className="flex-1 justify-end">
        <div className="dropdown dropdown-end">
          <button type="button" tabIndex={0} className="btn btn-ghost">
            <h1 className="normal-case text-lg font-[550] pr-2">{user.name}</h1>
            <div className="avatar">
              <div className="w-8 rounded-full">
                <img src={user.avatarUrl} alt={`${user.name}'s avatar`} />
              </div>
            </div>
          </button>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
            <li>
              {/* TODO: link to all available links to the user */}
              <Link href={`/users/${user.id}`}>Profile</Link>
            </li>
            <li>
              <Link href="/login">Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
