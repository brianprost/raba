import { useState, useContext } from "react";
import { User } from "./types/User";
import Link from "next/link";
// import { useSession, signIn, signOut } from "next-auth/react";
import { NavbarTogglesContext } from "@/pages/_app";
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Navbar() {
  const { showTitle, setShowTitle, showAccountMenu, setShowAccountMenu } = useContext(NavbarTogglesContext);
  // const { data: session, status } = useSession();
  const { user, isLoading } = useUser();
  const [fakeUser] = useState<User>({
    id: 3,
    name: "Tommy Wiseau",
    email: "twiseau@theroom.com",
    phone: "314-159-2653",
    organization: "Flowers",
    avatarUrl: "https://brianprost.com/img/brian-prost-scarecrow.webp",
  });
  console.log("i'm on tha monorail")

  return (
    <div className="navbar h-full px-4">
      <div className="flex-1 justify-between">
        <h1 className="text-4xl font-bold">{showTitle && "Raba"}</h1>
        <div className="dropdown dropdown-end">
          {showAccountMenu &&
            (user != null ? (
              <div>
                <button tabIndex={0} className="btn btn-ghost">
                  <h1 className="normal-case text-lg font-[550] pr-2">
                    {user?.email ?? "nobody"}
                  </h1>
                  <div className="avatar">
                    <div className="w-8 rounded-full">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
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
                    <Link href={`/users/${user?.name}`}>Profile</Link>
                  </li>
                  <li>
                    <button type="button" onClick={() => 'signOut()'}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => 'signIn("cognito")'}
                className="btn btn-ghost"
              >
                Login
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
