import React, { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import { GlobalStyle } from './GlobalStyle/GlobalStyle';
import { getPhoto } from '../API/getPhoto';
import { Wrapper } from './Wrapper/Wrapper';
import { animateScroll as scroll } from 'react-scroll';
import Notiflix from 'notiflix';

export function App() {
  const [gallery, setGallery] = useState([]);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('stopped');
  const [page, setPage] = useState(1);
  const [searchParameter, setSearchParameter] = useState('');
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    Notiflix.Notify.init({
      width: '400px',
      position: 'center-top',
      distance: '80px',
      timeout: 1000,
      fontSize: '25px',
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!searchParameter) return;

      setStatus('pending');

      try {
        const response = await getPhoto(searchParameter, page);
        const photo = await response.json();

        if (page === 1) {
          Notiflix.Notify.success(`We found ${photo.totalHits} photos!`);
        }

        setGallery(prevGallery => [...prevGallery, ...photo.hits]);
        setShowBtn(page < Math.ceil(photo.totalHits / 12));
        setStatus('resolved');
      } catch (error) {
        setError(error);
        setStatus('rejected');
      }
    };

    fetchData();
  }, [searchParameter, page]);

  const handleLoad = () => {
    scroll.scrollMore(window.innerHeight - 125);
    setPage(prevPage => prevPage + 1);
  };

  const query = newSearchParameter => {
    if (searchParameter === newSearchParameter) {
      return Notiflix.Notify.warning('You made the same request');
    }

    setSearchParameter(newSearchParameter);
    setPage(1);
    setGallery([]);
    setShowBtn(false);
    setStatus('stopped');
  };

  return (
    <Wrapper>
      <GlobalStyle />
      <Searchbar query={query} />
      {searchParameter ? (
        <ImageGallery gallery={gallery} status={status} error={error} />
      ) : (
        <div style={{ height: '10rem' }}></div>
      )}
      {showBtn && <Button handleLoad={handleLoad} />}
    </Wrapper>
  );
}


