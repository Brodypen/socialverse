import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
const formSchema = z.object({
  name: z.string().min(1).max(50),
  imageURL: z.string().url(),
  url: z.string().url(),
  description: z.string().min(1).max(1000),
});
import { supabase } from "../client";
import { CreatorType } from "../types/collection";

const ViewCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState<CreatorType>();

  const onSubmit = async (info: z.infer<typeof formSchema>) => {
    const { data, error } = await supabase.from("creators").update(
      {
        name: info.name,
        imageURL: info.imageURL,
        description: info.description,
        url: info.url,
      }).eq("id", id)

    if (error) {
      console.log(error);
    } else {
      navigate("/");
    }
  };
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        imageURL: "",
        description: "",
        url: "",
      },
    });

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from("creators")
        .select()
        .eq("id", id).single();
      if (error) {
        // TODO: Handle error, change to 404 page
        navigate("/");
      }
      if (data) {
        // console.log(data)
        setCreator(data);
        form.reset(data);
      }
    };
    fetchCreator();
    console.log("fetched again?")
  }, [id, navigate]);



  return (
    <div className="min-h-screen">
      <Header />
      <Button onClick={() => navigate("/")}>Go back</Button>

      <div className="pt-5">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="imageURL"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ImageURL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://" {...field} />
                  </FormControl>
                  <FormDescription>Profile Pic Image URL</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Social url</FormLabel>
                  <FormControl>
                    <Input placeholder="https://www.youtube.com/" {...field} />
                  </FormControl>
                  <FormDescription>
                    Link to their main platform!
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Creator is a x..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ViewCreator;
