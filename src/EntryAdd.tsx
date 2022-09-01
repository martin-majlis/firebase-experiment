import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { addEntryWithValue } from "./firebase";

function EntryAdd() {
  const [value, setValue] = useState("");
  let navigate = useNavigate();

  return (
    <div>
      <h2>Add Entry</h2>

      <input
        type="text"
        className="login__textBox"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Value to store"
      />
      <button
        onClick={() => {
          addEntryWithValue(value).then((ref: string) =>
            navigate(`/entry/${ref}`)
          );
        }}
      >
        Save
      </button>
    </div>
  );
}

export default EntryAdd;
