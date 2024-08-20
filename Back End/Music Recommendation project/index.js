import express from "express";
import axios from "axios";
import querystring from "querystring";

const app = express();
const port = 3000;

// Spotify API credentials
const clientId = 'c988a3bb2d0643fba5df4294d83af09e'; // Replace with your Spotify client ID
const clientSecret = '257971d2d2374a47bd0f05d17a1b7a09'; // Replace with your Spotify client secret

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Function to get access token from Spotify
const getSpotifyToken = async () => {
  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      querystring.stringify({
        grant_type: 'client_credentials'
      }),
      {
        headers: {
          'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    console.log('Access token:', response.data.access_token); // Log the token
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting Spotify token:', error.response ? error.response.data : error.message);
    throw new Error('Failed to get Spotify token');
  }
};

// Function to get recommendations from Spotify
const getSpotifyRecommendations = async (accessToken, mood, bands, genres) => {
  try {
    const response = await axios.get('https://api.spotify.com/v1/recommendations', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      params: {
        seed_artists: bands,   // Comma-separated string of artist IDs
        seed_genres: genres,   // Comma-separated string of genres
        seed_tracks: mood,     // Optionally, you can use mood-related tracks if available
        limit: 1,              // Limit the number of recommendations to 1
        market: 'US'
      }
    });
    console.log('Spotify Recommendations:', response.data.tracks);
    return response.data.tracks[0];
  } catch (error) {
    console.error('Error getting recommendations from Spotify:', error.response ? error.response.data : error.message);
    throw new Error('Failed to get Spotify recommendations');
  }
};

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/recommend", async (req, res) => {
  const { mood, bands, genres } = req.body;
  
  try {
    const accessToken = await getSpotifyToken();

    // Convert mood, bands, and genres to suitable seeds
    const moodTrackId = ""; // This needs to be a valid Spotify track ID related to the mood
    const bandIds = ""; // You need to fetch artist IDs based on the band names provided
    const genreList = genres; // Ensure this matches Spotify's supported genres

    const recommendedTrack = await getSpotifyRecommendations(accessToken, moodTrackId, bandIds, genreList);

    res.json({
      name: recommendedTrack.name,
      artist: recommendedTrack.artists[0].name,
      preview_url: recommendedTrack.preview_url
    });
  } catch (error) {
    console.error('Error fetching recommendations:', error.message);
    res.status(500).json({ error: 'Failed to fetch recommendations' });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
