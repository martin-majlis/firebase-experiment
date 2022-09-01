import { Routes, Route, useParams } from "react-router-dom";
import { getEntry, Entry } from "./firebase";
import React, { useEffect, useState } from "react";

function EntryDetail() {
  let params = useParams();
  let [entry, setEntry] = useState(new Entry("", "", new Date(), ""));
  useEffect(() => {
    const get = async () => {
      if (params.entryId) {
        const entry = await getEntry(params.entryId);
        if (entry) {
          setEntry(entry);
        }
      }
    };
    get();
  }, [params]);

  return (
    <div className="Entry">
      {params.entryId === undefined ? (
        <h2>Parametr missing</h2>
      ) : (
        <>
          <h2>{params.entryId}</h2>
          {entry ? (
            <div>
              <dl>
                <dt>User Name: </dt>
                <dd>{entry.user_name || "Anonymous"}</dd>
                <dt>User Id: </dt>
                <dd>{entry.user_uid || "Anonymous"}</dd>
                <dt>Date</dt>
                <dd>{entry.date.toString()}</dd>
                <dt>Value: </dt>
                <dd>{entry.value}</dd>
              </dl>
            </div>
          ) : (
            <div>Does not exist</div>
          )}
        </>
      )}
    </div>
  );
}

export default EntryDetail;
