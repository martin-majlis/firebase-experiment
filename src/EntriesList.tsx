import { Link } from "react-router-dom";
import { getEntries, EntryWithId } from "./firebase";
import { useEffect, useState } from "react";

function EntriesList() {
  const [entries, setEntries] = useState<EntryWithId[]>([]);
  useEffect(() => {
    const get = async () => {
      const es = await getEntries();
      setEntries(es);
    };
    get();
  }, []);

  return (
    <div>
      <h2>List of Entries</h2>
      <p>Number of entries: {entries.length}</p>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User Id</th>
            <th>User Name</th>
            <th>Date</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr>
              <td>
                <Link to={entry.id}>{entry.id}</Link>
              </td>
              <td>{entry.entry.user_uid || "Anonymous"}</td>
              <td>{entry.entry.user_name || "Anonymous"}</td>
              <td>{entry.entry.date.toISOString()}</td>
              <td>{entry.entry.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default EntriesList;
