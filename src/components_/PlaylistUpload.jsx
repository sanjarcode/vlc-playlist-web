import { extractRoutesFromURL } from "../utils_/common";
import { parseXSPF } from "../utils_/xspf";
import FileUpload from "./FileUpload";

export default function PlayListUpload({ list = [], setList = () => {} }) {
  const onChangeHandler = (event) => {
    const filesWithContent = event.target.files;
    const filesWithTracks = filesWithContent.map((file) => {
      file.tracks = parseXSPF(file?.content).map((track) => ({
        ...track,
        title: track.title ?? extractRoutesFromURL(track?.location).join(", "),
      }));

      return file;
    });

    setList(filesWithTracks);
  };

  return (
    <div>
      Playlist upload
      <FileUpload onChange={onChangeHandler} value={list} extractContent />
      <div aria-label="playlist-upload-files-preview">
        {list.length > 0 && (
          <div>
            <p>Selected files:</p>
            <ul>
              {list.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
