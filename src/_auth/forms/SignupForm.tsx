
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import {Form, FormControl, FormDescription, FormField, FormItem,  FormLabel,  FormMessage,} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SignupValidation } from "@/lib/validation"
import { z } from "zod"
import Loader from "@/components/ui/shared/Loader"
import { createAccount } from "@/lib/appwrite/api"
import { useToast } from "@/components/ui/use-toast"

// import { createUserAccount } from "@/lib/appwrite/api"


const SignupForm = () => {
     
    const { toast } = useToast()
    const isLoading = false
  // The source of the Form Schema which is named SignupValidation -> lib/validation 
  // 1. Define your form.
  const form = useForm<z.infer<typeof SignupValidation>>({
    resolver: zodResolver(SignupValidation),
    defaultValues: {
      name: '',
      username: "",
      email: '',
      password: ''
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignupValidation>) {
    // Do something with the form values.
    const newUser = await createAccount(values)
    if(!newUser){
      return toast({ title: "Sign up failed", })
    }
    
    // const session = await signInAccount()
  }


  return ( 

  <Form {...form}>

    <div className="sm:w-420 flex-center flex-col">
         <img src="/assets/images/logo.svg" alt="logo"/>
         <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create a new account </h2>
         <p className="text-light-3 small-medium md:base-regular">To use SnapGrap enter your account details </p>
   
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">

        {/*component for building controlled form fields. */}
         {/*Name Form */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
           //This will be the Form that will be Displayed
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text"  className="shad-input"{...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/*Username Form */}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>UserName</FormLabel>
              <FormControl>
                <Input type="text"  className="shad-input"{...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

      {/*Email Form */}
      <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email"  className="shad-input"{...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> 

       {/*Password Form */}
       <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password"  className="shad-input"{...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/*Submit Button */}
        <Button type="submit" className="shad-button_primary" >
           {isLoading ? (
            <div className="flex-center gap-2">
               <Loader /> Loading...
            </div>
           ): "Sign Up"}
        </Button>


        <p className="text-small-regular text-light-2 text-center">
           Already have an account?
           <Link to='/sign-in' className="text-primary-500 text-small-smeibod ml-1">Log in</Link>
        </p>


       </form>
      </div>
    </Form>
  )
}

export default SignupForm
