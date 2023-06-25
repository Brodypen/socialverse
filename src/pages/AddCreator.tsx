import React from "react";
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
import { supabase } from "../client";
import { useNavigate } from "react-router-dom";
const formSchema = z.object({
  name: z.string().min(1).max(50),
  imageURL: z.string().url(),
  url: z.string().url(),
  description: z.string().min(1).max(1000),
});

const AddCreator = () => {
  // const [name, setName] = React.useState('')
  // const [imageURL, setImageURL] = React.useState('')
  // const [description, setDescription] = React.useState('')
  // const [url, setURL] = React.useState('')
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageURL: "",
      description: "",
      url: "",
    },
  });
  const onSubmit = async (info: z.infer<typeof formSchema>, event: any) => {
    event.preventDefault();
    const {data, error} = await supabase.from('creators').insert([
      {name: info.name, imageURL: info.imageURL, description: info.description, url: info.url}
    ])
    if (error){
      console.log(error)
    }
    if (data){
      navigate('/')
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field} />
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
                  <FormDescription>Link to any channel!</FormDescription>
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
                    <Input placeholder="Youtuber is a x..." {...field} />
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

export default AddCreator;
