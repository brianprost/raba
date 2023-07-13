import SignInSignUp from '@/components/SignInSignUp'
import React from 'react'
import { useUser } from '@auth0/nextjs-auth0/client';

export default function AccountPage() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  return (
    user && (
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={user.picture!} alt={user.name!} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );

  // return (
  //   <div className="flex flex-col justify-center items-center h-full">
  //     <SignInSignUp />
  //   </div>
  // )
}
