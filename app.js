//we have required all the packages

require("dotenv").config();

const express = require("express");
const expressLayouts = require("express-ejs-layouts");

// require spotify-web-api-node package here:
const SpotifyWebApi = require("spotify-web-api-node");
const app = express();

app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

// setting the spotify-api goes here:
const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

// Retrieve an access token
spotifyApi
  .clientCredentialsGrant()
  .then((data) => spotifyApi.setAccessToken(data.body["access_token"]))
  .catch((error) =>
    console.log("Something went wrong when retrieving an access token", error)
  );
// Our routes go here:

app.get("/homePage", (req, res) => {
  res.render("homePage");
});

app.get("/artist-search", async (req, res) => {
  const searchArtist = request.query.artistId;

  try {
    const searchResult = await spotifyApi.searchArtists(searchArtist);
    const results = searchResult.body.artists.items;

    res.render("artist-search-results", { results });
  } catch (error) {
    console.log(error);
  }
});

//Display the form to create albumsPage
app.get("/albums", (req, res) => {
  response.render("albums");
});

//Get the  Id of searched artist
app.get("/albums/:artistId", async (req, res) => {
  const { artistId } = request.query.albums;
  try {
    const albumPage = await albums.findById(artistId);
    res.render("albums", albumPage);
  } catch (error) {
    console.log(error);
    response.send("Error server");
  }
});

app.listen(3000, () =>
  console.log("My Spotify project running on port 3000 🎧 🥁 🎸 🔊")
);
