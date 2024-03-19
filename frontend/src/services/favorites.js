import axios from 'axios';

class FavoritesDataService {

    // TODO: get favorites for the particular userId
    getFavorites(userId) {
        return axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/favorites/${userId}`);
    }


    // TODO: update favorite status for a particular movie
    updateFavorites(userId, favorites) {
        return axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/v1/movies/favorites`, {
          _id: userId,
          favorites: favorites,
        });
      }
}

export default new FavoritesDataService();
