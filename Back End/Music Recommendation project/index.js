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

// Function to search for an artist by name and return their Spotify ID
const getArtistId = async (accessToken, artistName) => {
  try {
    const response = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      params: {
        q: artistName,
        type: 'artist',
        limit: 1
      }
    });

    const artist = response.data.artists.items[0];
    return artist ? artist.id : null;
  } catch (error) {
    console.error(`Error searching for artist ${artistName}:`, error.response ? error.response.data : error.message);
    throw new Error('Failed to get artist ID');
  }
};

// Function to get recommendations from Spotify
const getSpotifyRecommendations = async (accessToken, moodTrackId, bandIds, genres) => {
  try {
    const response = await axios.get('https://api.spotify.com/v1/recommendations', {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
      params: {
        seed_artists: bandIds,   // Comma-separated string of artist IDs
        seed_genres: genres,     // Comma-separated string of genres
        seed_tracks: moodTrackId, // Optionally, you can use mood-related tracks if available
        limit: 1,                // Limit the number of recommendations to 1
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

    // Get artist IDs for each band
    const artistIdsPromises = bands.split(',').map(band => getArtistId(accessToken, band.trim()));
    const artistIds = (await Promise.all(artistIdsPromises)).filter(id => id).join(',');

    // Convert mood to a suitable track ID (if needed)
    const moodTrackId = ""; // You might want to implement a method to get a track ID based on the mood

    const recommendedTrack = await getSpotifyRecommendations(accessToken, moodTrackId, artistIds, genres);

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
