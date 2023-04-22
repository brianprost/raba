import React from "react";

function Login() {
  return (
    <div className="container mx-auto justify-center items-center w-1/2">
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <figure>
          <img
            src="/raba-logo.png"
            alt="raba-logo"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">Sign In</h2>
          <input type="text" placeholder="Username" className="input input-bordered w-full mb-2" />
          <input type="password" placeholder="Password" className="input input-bordered w-full mb-2" />
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Listen</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
