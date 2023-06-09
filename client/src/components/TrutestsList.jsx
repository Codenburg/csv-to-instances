import { useEffect, useState } from "react";
import { getAllTrutests } from "../api/trutests.api";
import { TrutestCard } from "./TrutestCard";

export function TrutestsList() {
  const [trutests, setTrutests] = useState([]);

  useEffect(() => {
    async function loadTrutests() {
      const res = await getAllTrutests();
      setTrutests(res.data);
    }
    loadTrutests();
  }, []);

  return (
    <div className="grid grid-cols-3 gap-3">
      {trutests.map((trutest) => (
        <TrutestCard key={trutest.id} trutest={trutest} />
      ))}
    </div>
  );
}
