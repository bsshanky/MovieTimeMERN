import React, { useCallback } from 'react';
import Col from 'react-bootstrap/Col';
import FavoriteCard from './FavoriteCard.js';
import "./FavoriteCard.css";

const FavoritesList = ({ favorites, reorderFavorites }) => {
  
    const moveCard = useCallback((dragIndex, hoverIndex) => {
      reorderFavorites(dragIndex, hoverIndex)
    }, [reorderFavorites])

    const renderCard = useCallback((favoriteMovie, index) => {
      return (
        <FavoriteCard
          key={favoriteMovie.movieId}
          index={index}
          id={favoriteMovie.id}
          title={favoriteMovie.title}
          poster={favoriteMovie.poster}
          moveCard={moveCard}
        />
      )
    }, [moveCard])
    return (
      <Col className='favoritesContainer'>
        <div style={{paddingTop: '1em', marginLeft: '1em'}}>
          <p style={{fontSize: '2em'}}>{ (favorites.length > 0) ? 'Drag your favorites to rank them' : `You haven't chosen any favorites yet`}</p>
        </div>
        <div className='favoritesPanel'>{favorites.map((favoriteMovie, i) => renderCard(favoriteMovie, i))}</div>
      </Col>
    )
  
}

export default FavoritesList;