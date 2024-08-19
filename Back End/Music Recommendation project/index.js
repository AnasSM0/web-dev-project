import express from "express";
import axios from "axios";
import querystring from "querystring";

const app = express();
const port = 3000;

// Spotify API credentials
const clientId = 'c988a3bb2d0643fba5df4294d83af09e';
const clientSecret = '257971d2d2374a47bd0f05d17a1b7a09';

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // To parse form data

// Function to get access token from Spotify
const getSpotifyToken = async () => {
  const response = await axios.post('https://accounts.spotify.com/api/token', querystring.stringify({
    grant_type: 'client_credentials'
  }), {
    headers: {
      'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
  return response.data.access_token;
};

// Function to get recommendations from Spotify
const getSpotifyRecommendations = async (accessToken, mood, bands, genres) => {
  const response = await axios.get('https://api.spotify.com/v1/recommendations', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    },
    params: {
      seed_artists: bands,
      seed_genres: genres,
      market: 'US',
      limit: 1 // Limit the number of recommendations
    }
  });

  return response.data.tracks[0];
};

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/recommend", async (req, res) => {
  const { mood, bands, genres } = req.body;
  
  try {
    const accessToken = await getSpotifyToken();
    const recommendedTrack = await getSpotifyRecommendations(accessToken, mood, bands, genres);

    res.json({
      name: recommendedTrack.name,
      artist: recommendedTrack.artists[0].name,
      preview_url: recommendedTrack.preview_url
    });
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).json({ error: 'Failed to fetch recommendations' });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
