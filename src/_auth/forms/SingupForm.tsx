
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "../../components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { SingupValidation } from "../../lib/validation";
import { z } from "zod";



const SingupForm = () => {

  const form = useForm<z.infer<typeof SingupValidation>>({
    resolver: zodResolver(SingupValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  })

  function onSubmit(values: z.infer<typeof SingupValidation>) {
    console.log(values)
  }

  return (
    <Form {...form}>

      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" />
        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create new account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          To use the app enher your details.
        </p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </div>
    </Form>

  )
}

export default SingupForm