import { useState } from "react";

const SignInSignUp = () => {
  return (
    <div className="card lg:card-side bg-base-100 shadow-xl">
      <figure>
        <img src="/raba-logo.png" alt="raba-logo" />
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
          <button className="btn btn-primary">Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default SignInSignUp;
