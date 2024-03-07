import { Routes, Route } from "react-router-dom";
import AuthLayout from './_auth/AuthLayout';
import SignupForm from "./_auth/forms/SignupForm";
import SigninForm from "./_auth/forms/SigninForm";
import RootLayout from "./_root/RootLayout";
import { Toaster } from "@/components/ui/toaster"
import { Home } from "./_root/pages";
import "./globals.css";

const App = () => {
  return (
    <main className="flex h-screen">
    <Routes>
        {/* public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-up" element={<SignupForm />} />
          <Route path="/sign-in" element={<SigninForm />} />
        </Route>

        {/* private routes */}
        <Route element={<RootLayout  />}>
           <Route index element={<Home />} />
        </Route>
       </Routes>
       <Toaster />
    </main>
  )
}

export default App
