import axios from "axios";

class UserTopController {
    async getTopArtists(req, res) {
        try {
            const accessToken = req.session.accessToken;
            const { data } = await axios.get('https://api.spotify.com/v1/me/top/artists', {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            res.render('topArtists', { topArtists: data.items });
        } catch (error) {
            console.error(`Error: ${error}`);
            res.redirect('/');
        }
    }

    async getTopTracks(req, res) {
        try {
            const accessToken = req.session.accessToken;
            const { data } = await axios.get('https://api.spotify.com/v1/me/top/tracks', {
                headers: { Authorization: `Bearer ${accessToken}` }
            });
            console.log(data.items);
            res.render('topTracks', { topTracks: data.items });
        } catch (error) {
            console.error(`Error: ${error}`);
            res.redirect('/');
        }
    }
}

export default UserTopController;