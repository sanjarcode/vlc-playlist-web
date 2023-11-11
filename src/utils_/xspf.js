import convert from "xml-js";

/**
 * Get array equivalent of XSPF file
 * @param {String} xspfContent XSPF (XML)
 * @param {Object} xspfContent XSPF (XML)
 *
 * @returns {<Array<Object>>}
 */
export function parseXSPF(
  xspfContent,
  options = {
    compact: true,
    ignoreComment: true,
    ignoreDeclaration: true,
    ignoreAttributes: false,
    ignoreCdata: true,
  }
) {
  const result = convert.xml2js(xspfContent, options);

  // Access the parsed JSON object and extract the necessary information
  const tracks = result.playlist.trackList.track.map((track) => {
    return {
      title: track?.title?._text,
      location: track?.location?._text,
      vlcId: track?.extension?.["vlc:id"]?._text,
    };
  });

  return tracks;
}

// Example usage:
parseXSPF.example = () => {
  const xspfContent = `
      <?xml version="1.0" encoding="UTF-8"?>
      <playlist version="1" xmlns="http://xspf.org/ns/0/" xmlns:vlc="http://www.videolan.org/vlc/playlist/0">
        <trackList>
          <track>
            <title>Track 1</title>
            <location>http://example.com/track1.mp3</location>
            <extension application="http://www.videolan.org/vlc/playlist/0">
              <vlc:id>1</vlc:id>
            </extension>
          </track>
          <track>
            <title>Track 2</title>
            <location>http://example.com/track2.mp3</location>
            <extension application="http://www.videolan.org/vlc/playlist/0">
              <vlc:id>2</vlc:id>
            </extension>
          </track>
          <!-- Add more tracks as needed -->
        </trackList>
      </playlist>
    `;
  const parsedTracks = parseXSPF(xspfContent);
  console.log(parsedTracks);
};
