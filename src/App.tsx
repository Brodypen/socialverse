import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { useRoutes } from "react-router-dom";
import "./App.css";
import { supabase } from "./client";
import { useEffect, useState } from "react";
import CreatorCard from "./components/CreatorCard";
import { CreatorType } from "./types/collection";
import { Button } from "./components/ui/button";
import { Separator } from "./components/ui/separator";
import { ScrollArea, ScrollBar } from "./components/ui/scroll-area";
import { Skeleton } from "./components/ui/skeleton";

function App() {
  // const [loading, setLoading] = useState(true);
  const [creators, setCreators] = useState<CreatorType[]>([]);

  const fetchData = async () => {
    const { data, error } = await supabase.from("creators").select();

    if (error) {
      console.log(error);
      return;
    } else if (data) {
      setCreators(data);
    }
    // setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <h1 className="mb-5 text-5xl font-bold">Socialverse</h1>
      <div className="">
        App side
        <div>
          Creator stuff
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
            {/* Creators here */}
            <Separator className="my-4" />
            <div className="relative">
              <ScrollArea>
                <div className="flex space-x-4 pb-4">
                  {creators &&
                    creators.map((creator) => (
                      <CreatorCard
                        key={creator.id}
                        creator={creator}
                      />
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
