import { useState } from "react";
import { extractRoutesFromURL } from "../utils_/common";
import PlayListUpload from "./PlaylistUpload";

export default function FirstComponent_() {
  const [list, setList] = useState([]);

  console.log({ list });
  return (
    <div>
      FirstComponent_
      <PlayListUpload setList={setList} list={list} />
    </div>
  );
}
