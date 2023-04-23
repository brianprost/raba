import React, { useState } from "react";
import { User } from "./types/User";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar({
  disableTitle,
  disableAccountMenu,
}: {
  disableTitle?: boolean;
  disableAccountMenu?: boolean;
  // TODO: use these later to toggle for the login process;
}) {
  const { data: session, status } = useSession();
  const [fakeUser] = useState<User>({
    id: 3,
    name: "Tommy Wiseau",
    email: "twiseau@theroom.com",
    phone: "314-159-2653",
    organization: "Flowers",
    avatarUrl: "https://brianprost.com/img/brian-prost-scarecrow.webp",
  });

  return (
    <div className="navbar h-full px-4">
      <div className="flex-1 justify-between">
        <h1 className="text-4xl font-bold">Raba</h1>
        <div className="dropdown dropdown-end">
          {status == "authenticated" ? (
            <div>
              <button tabIndex={0} className="btn btn-ghost">
                <h1 className="normal-case text-lg font-[550] pr-2">
                  {session?.user!.email ?? "nobody"}
                </h1>
                <div className="avatar">
                  <div className="w-8 rounded-full">
                    <img
                      src={fakeUser.avatarUrl}
                      alt={`${fakeUser.name}'s avatar`}
                    />
                  </div>
                </div>
              </button>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  {/* TODO: link to all available links to the user */}
                  <Link href={`/users/${session?.user!.name}`}>Profile</Link>
                </li>
                <li>
                  <button type="button" onClick={() => signOut()}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => signIn("cognito")}
              className="btn btn-ghost"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
