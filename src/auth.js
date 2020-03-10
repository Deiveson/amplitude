import { tokenName } from "./Components/utils/restUtils";
import history from "./history";

export const login = () => {
  let CLIENT_ID = "a46706575b9944fbaf04d8cbfa3eaac0";
  let REDIRECT_URI = "http://localhost:3000/callback";

  function getLoginURL(scopes) {
    return (
      "https://accounts.spotify.com/authorize?client_id=" +
      CLIENT_ID +
      "&redirect_uri=" +
      encodeURIComponent(REDIRECT_URI) +
      "&scope=" +
      encodeURIComponent(scopes.join(" ")) +
      "&response_type=token"
    );
  }

  let url = getLoginURL([
    "user-library-modify user-library-read user-follow-modify user-follow-read user-read-private user-read-email"
  ]);

  let width = 450,
    height = 730,
    left = window.screen.width / 2 - width / 2,
    top = window.screen.height / 2 - height / 2;

  window.open(
    url,
    "_self",
    "menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=" +
      width +
      ", height=" +
      height +
      ", top=" +
      top +
      ", left=" +
      left
  );
};

export const validateToken = () => {
  return !!localStorage.getItem(tokenName);
};

export const callback = () => {
  let hash = window.location.hash.substr(1);
  const urlParams = new URLSearchParams(hash);
  let urlToken = urlParams.get("access_token");
  if (urlToken) localStorage.setItem(tokenName, urlToken);
  history.push("/");
  return null;
};
