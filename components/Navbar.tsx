import { useContext } from "react";
import Link from "next/link";
import { NavbarTogglesContext } from "@/pages/_app";
import { useUser } from "@auth0/nextjs-auth0/client";
import NavbarAuthenticated from "./NavbarAuthenticated";

export default function Navbar() {
  const { showTitle, setShowTitle, showAccountMenu, setShowAccountMenu } =
    useContext(NavbarTogglesContext);
  const { user, isLoading } = useUser();

  return (
    <div className="navbar">
      <div className="flex-1">
        <Link href={"/"} className="btn btn-ghost normal-case text-xl">Raba</Link>
      </div>
      {user && !isLoading ? (
        <NavbarAuthenticated user={user} />
      ) : (
        // eslint-disable-next-line @next/next/no-html-link-for-pages
        <a href="/api/auth/login">
          <button className="btn btn-ghost">Login</button>
        </a>
      )}
    </div>
  );
}
