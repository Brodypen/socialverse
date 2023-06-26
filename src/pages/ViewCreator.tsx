import React from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "../client";
import { CreatorType } from '../types/collection';
import Header from '../components/Header';
import { Button } from '../components/ui/button';
const ViewCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = React.useState<CreatorType>();

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from("creators")
        .select()
        .eq("id", id)
        .single();
      if (error) {
        // TODO: Handle error, change to 404 page
        navigate("/");
      }
      if (data) {
        setCreator(data);
      }
    };
    fetchCreator();
  }, [id, navigate]);

  return (
    <div>
      <Header />
      <Button onClick={() => navigate("/")}>Go back</Button>
      
      ViewCreator - {id} - {creator?.name}
    </div>
  );
}

export default ViewCreator