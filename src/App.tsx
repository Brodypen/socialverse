import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { useRoutes } from "react-router-dom";
import "./App.css";
import { supabase } from "./client";
import { useEffect, useState } from "react";
import CreatorCard from "./components/CreatorCard";
import { CreatorType } from "./types/collection";
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
      <div>
        App side
        <div>
          Creator stuff
          <div>
            {creators &&
              creators.map((creator: CreatorType) => (
                <CreatorCard key={creator.id} creator={creator} />
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
