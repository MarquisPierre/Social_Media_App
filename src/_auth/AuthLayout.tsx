import { Outlet, Navigate } from "react-router-dom";

export default function AuthLayout() {
  const  isAuthenticated  = false;

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            {/*This returns either the Sign in form or the Sign up form */}
            <Outlet />
          </section>

          <img
            src="/assets/images/side.jpg"
            alt="logo"
            className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
          />
        </>
      )}
    </>
  );
}