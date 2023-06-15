import { useEffect, useState } from "react";
import { getAllTrutests } from "../../utils/api/trutests.api";
import { Table } from "./Table";

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
    <div>
      <Table data={trutests} />
    </div>
  );
}
