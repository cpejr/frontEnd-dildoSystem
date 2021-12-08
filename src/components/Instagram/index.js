import React, { useEffect, useRef, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import ImageLoader from 'react-loading-image';

import api from '../../services/api';

import './styles.css';

export default function Insta() {
  const [picsPerSlide, setPicsPerSlide] = useState(
    Math.max(Math.floor(window.innerWidth / 330), 1),
  );
  const [feed, _setFeed] = useState();
  const feedRef = useRef(feed);

  function setFeed(newFeed) {
    _setFeed(newFeed);
    feedRef.current = newFeed;
  }

  useEffect(() => {
    api.get('instagram').then((res) => {
      const pics = res.data;
      const newFeed = [];

      while (pics.length) {
        newFeed.push(pics.splice(0, picsPerSlide));
      }
      setFeed(newFeed);
    });
  }, []);

  useEffect(() => {
    function updateSlides() {
      const feed = feedRef.current;

      if (!feed) return;

      const newNbOfSlides = Math.max(Math.floor(window.innerWidth / 330), 1);

      const allPics = feed.reduce((acc, current) => [...acc, ...current]);

      const newFeed = [];

      while (allPics.length) {
        newFeed.push(allPics.splice(0, newNbOfSlides));
      }
      setFeed(newFeed);
      setPicsPerSlide(newNbOfSlides);
    }

    window.addEventListener('resize', updateSlides);

    return () => window.removeEventListener('resize', updateSlides);
  }, []);

  return (
    <div>
      <Carousel interval={3000}>
        {feed
          && feed.map((slide, index) => (
            <Carousel.Item key={`slide-${index}`}>
              <div className="ig-slide">
                {slide.map((img, index) => (
                  <IgImage display_url={img.media_url} key={`pic-${index}`} />
                ))}
              </div>
            </Carousel.Item>
          ))}
      </Carousel>
    </div>
  );
}

const IgImage = function ({ display_url }) {
  return (
    <div className="ig-img-wrapper" style={{ width: 300, height: 300 }}>
      <a target="_blank">
        <ImageLoader
          src={display_url}
          alt="Loja Casulus"
          image={({ src, width, height }) => (
            <img src={src} alt="Loja Casulus" />
          )}
        />
      </a>
    </div>
  );
};
