import React, { useEffect, useState } from 'react';
import { Carousel } from 'antd';
import ImageLoader from "react-loading-image";

import './styles.css'

export default function Insta() {
  const [feed, setFeed] = useState();
  const [picsPerSlide, setPicsPerSlide] = useState(Math.max(Math.floor(window.innerWidth / 330), 1));

  useEffect(() => {
    fetch(`https://www.instagram.com/graphql/query/?query_id=17888483320059182&variables=%7B%22id%22:%2219360403638%22,%22first%22:20,%22after%22:null%7D`).then(response => {
      response.json().then((formattedResponse) => {
        console.log(formattedResponse);
        const pics = formattedResponse.data.user.edge_owner_to_timeline_media.edges;
        let newFeed = [];

        while (pics.length) {
          newFeed.push(pics.splice(0, picsPerSlide));
        }
        setFeed(newFeed);

        //setFeed(formattedResponse.data.user.edge_owner_to_timeline_media.edges)

      })
    })
  }, []);


  return (
    <div>
      <Carousel /* autoplay */>
        {
          feed && feed.map((slide, index) => (
            <div className="ig-slide" key={`slide-${index}`}>
              {slide.map((img, index) => (
                <IgImage node={img.node} key={`pic-${index}`} />
              ))}
            </div>
          ))
        }
      </Carousel>
    </div>
  )
}

function IgImage({ node: { shortcode, display_url } }) {

  return (
    <div className="ig-img-wrapper" style={{ width: 300, height: 300 }}>
      <a href={`https://www.instagram.com/p/${shortcode}/`} target="_blank">
        <ImageLoader src={display_url} alt="Loja Casulus" image={({ src, width, height }) => <img src={src} alt="Loja Casulus" />} />
      </a>
    </div>

  )
}