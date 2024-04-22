import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import FileUploader from "../ui/shared/FileUploader"
import { PostValidation } from "@/lib/validation"
import { Models } from "appwrite"
import { toast, useToast } from "../ui/use-toast"
import { useNavigate } from "react-router-dom"
import { useCreatePost } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"

type PostFormProps = {
  post?: Models.Document;
  action: "Create" | "Update";
};

const PostForm = ({ post, action }: PostFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useUserContext();

      // Query
  const { mutateAsync: createPost, isPending: isLoadingCreate } = useCreatePost();
// const { mutateAsync: updatePost, isPending: isLoadingUpdate } = useUpdatePost();
      

      // 1. Define your form.
      const form = useForm<z.infer<typeof PostValidation>>({
        resolver: zodResolver(PostValidation),
        defaultValues: {
          caption: post ? post?.caption : "",
          file: [],
          location: post ? post.location : "",
          tags: post ? post.tags.join(",") : "",
        },
      });
     
      // 2. Define a submit handler.
      async function onSubmit(values: z.infer<typeof PostValidation>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
         // ACTION = CREATE
       const newPost = await createPost({
         ...values,
         userId: user.id,
        });

        if (!newPost) {
           toast({
           title: `${action} post failed. Please try again.`,
          });
        }
           navigate("/");
      }
  return (
<Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
      <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Caption</FormLabel>
              <FormControl>
                <Textarea
                  className="shad-textarea custom-scrollbar"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />


     <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Photos</FormLabel>
              <FormControl>
                <FileUploader
                  fieldChange={field.onChange}
                  mediaUrl={post?.imageUrl}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />






    <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">Add Location</FormLabel>
              <FormControl>
                <Input type="text" className="shad-input" {...field} />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />





     <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="shad-form_label">
                Add Tags (separated by comma " , ")
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Art, Expression, Learn"
                  type="text"
                  className="shad-input"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form_message" />
            </FormItem>
          )}
        />





        <Button type="button"className="shad-button_dark_4"> Cancel </Button> 
        <Button type="submit" className="shad-button_primary whitespace-nowrap">Submit</Button>
        
      </form>
    </Form>





  )
}

export default PostForm
