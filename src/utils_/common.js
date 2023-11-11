export function extractRoutesFromURL(inputURL) {
  const url = new URL(inputURL);
  const pathSegments = url.pathname
    .split("/")
    .filter((segment) => segment.trim() !== "");
  const humanReadableRoutes = pathSegments.map((segment) =>
    decodeURIComponent(segment)
  );
  return humanReadableRoutes;
}

extractRoutesFromURL.example = () => {
  // Example usage:
  const url =
    "http://192.168.0.100:8080/3.%20Layout/5-%20Flexbox-%20Direction.mp4";
  const routes = extractRoutesFromURL(url);
  console.log(routes);
};
