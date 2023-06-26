import "./App.css";
import { supabase } from "./client";
import { useEffect, useState } from "react";
import CreatorCard from "./components/CreatorCard";
import { CreatorType } from "./types/collection";
import { Separator } from "./components/ui/separator";
import { ScrollArea, ScrollBar } from "./components/ui/scroll-area";
import AddCreatorCard from "./components/AddCreatorCard";
import Header from "./components/Header";
import { Button } from "./components/ui/button";

function App() {
  // const [loading, setLoading] = useState(true);
  const [creators, setCreators] = useState<CreatorType[]>([]);
  const [orderBy, setOrderBy] = useState("created_at");
  const [ascender, setAscender] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      
      const { data, error } = await supabase
        .from("creators")
        .select()
        .order(orderBy, {ascending: ascender});
      

      if (error) {
        console.log(error);
        return;
      } else if (data) {
        setCreators(data.reverse());
      }
      // setLoading(false);
    };
    fetchData();
  }, [orderBy, ascender]);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="">
        <div>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold tracking-tight">
                Your favorite creators
              </h2>
              <p className="text-sm text-muted-foreground">
                From anywhere and everywhere
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 pt-2">
            <Button
              variant={orderBy == "created_at" ? `default` : `outline`}
              onClick={() => setOrderBy("created_at")}
            >
              Created at
            </Button>
            <Button
              variant={orderBy == "name" ? `default` : `outline`}
              onClick={() => setOrderBy("name")}
            >
              Alphabetical
            </Button>
            <Button
              variant={`outline`}
              onClick={() => setAscender((prev) => !prev)}
            >
              Reverse
            </Button>
          </div>
          {/* Creators here */}
          <Separator className="my-4" />
          <div className="relative">
            <ScrollArea>
              <div className="flex space-x-4 pb-4">
                <AddCreatorCard />
                {creators &&
                  creators.map((creator) => (
                    <CreatorCard key={creator.id} creator={creator} />
                  ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
