import { useState } from "react";

import Image from "next/image";
import Link from "next/link";

const SignInSignUp = () => {
  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
      <figure>
        <Image src="/raba-logo.png" alt="raba-logo" width={200} height={200} />
      </figure>
      <div className="card-body">
        <h2 className="card-title mb-6">Sign In</h2>
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="input input-bordered w-full mb-2"
        />
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered w-full mb-2"
        />
        <div className="card-actions justify-end">
        {/* <div className="card-actions justify-between items-center"> */}
          {/* <button className="btn btn-ghost btn-xs text-xs">Forgot password</button> */}
          <button className="btn btn-primary">Sign In</button>
        </div>
        <hr className="my-8 border-gray-300" />
      </div>
    </div>
  );
};

export default SignInSignUp;
