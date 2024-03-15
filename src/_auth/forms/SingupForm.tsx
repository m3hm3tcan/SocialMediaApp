
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "../../components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { SingupValidation } from "../../lib/validation";
import { z } from "zod";
import { Loader } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "../../components/ui/use-toast"
import { useCreateUserAccount, useSignInAccount } from "../../lib/react-query/queriesAndMutatios";
import { useNavigate } from 'react-router-dom';
import { useUserContext  } from "../../context/AuthContext";

const SingupForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const {checkAuthUser, isLoading: isUserLoading} = useUserContext();

  const { mutateAsync: createUserAccount, isPending: isCreatingAccount } = useCreateUserAccount();

  const { mutateAsync: signInAccount, isPending: isSigningIn } = useSignInAccount();

  const form = useForm<z.infer<typeof SingupValidation>>({
    resolver: zodResolver(SingupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof SingupValidation>) {
    const newUser = await createUserAccount(values);
    if (!newUser) {
      return toast({
        title: "Sign up failed! Please try again.",
      });
    }

    const session = await signInAccount({
      email: values.email,
      password: values.password
    });

    if (!session) {
      return toast({
        title: "Sign in failed! Please try again.",
      });
    }

    const isLoggedIn = await checkAuthUser();

    if(isLoggedIn) {
      form.reset();
      navigate('/');
    }else {
      return toast({
        title: "Sign up failed! Please try again.",
      });
    }

  }

  return (
    <Form {...form}>

      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create new account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use MJgram, please enter your details.
        </p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary w-full">
            {isCreatingAccount ? (
              <div className="flex-center gap-2">
                <Loader /> Loading...
              </div>
            ) : (
              "Sing up"
            )
            }
          </Button>

          <p className="text-small-regular text-light text-center mt-2">
            Already have an account?
            <Link to="/sign-in" className="text-primary-500 ml-1">Log in</Link>
          </p>
        </form>
      </div>
    </Form>

  )
}

export default SingupForm