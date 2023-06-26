import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { supabase } from "../client";
import { CreatorType } from "../types/collection";
import Header from "../components/Header";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";
import { Youtube, UserCog, UserX } from "lucide-react";

const ViewCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = React.useState<CreatorType>();
  const [loadingContext, setLoadingContext] = React.useState(true);


  const handleDelete = async () => {
    const { error } = await supabase
      .from("creators")
      .delete()
      .eq("id", id)
      .select();
    if (error) {
      console.log(error);
    } else {
      navigate("/");
    }
  };

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

      <div className="flex col justify-center pt-5 min-w-fit">
        <div className="min-w-[200px] min-h-0 overflow-hidden rounded-md">
          {loadingContext && <Skeleton className="w-[300px] h-[450px]" />}
          {creator && (
            <img
              onLoad={() => setLoadingContext(false)}
              className={`${
                loadingContext ? "hidden" : ""
              } w-[300px] h-[450px] object-cover`}
              src={
                creator.imageURL
                  ? creator.imageURL
                  : "https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=300&dpr=2&q=80"
              }
              alt={creator.name ? creator.name : "creator"}
              width="300px"
              height="450px"
            />
          )}
        </div>
        <div className="pl-5">
          <h1 className="text-2xl">
            {creator ? `${creator.name}` : "Name loading"}
          </h1>
          <p className="pt-2 text-sm overflow-hidden text-ellipsis max-w-xs max-h-[450px]">
            {creator ? `${creator.description}` : "Description loading"}
          </p>
          <div className="flex justify-center gap-5 pt-3">
            <a className="" href={creator ? creator.url : ""} target="_blank">
              <Button>
                <Youtube />
              </Button>
            </a>
            <Button onClick={() => navigate(`/edit-creator/${id}`)}>
              <UserCog />
            </Button>
            <Button onClick={handleDelete}>
              <UserX />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCreator;
