import React, { useEffect, useState } from 'react';

import withInstagramFeed, { getInstagramFeedInfo } from 'origen-react-instagram-feed';
import { Carousel } from 'antd';
import ImageLoader from "react-loading-image";

const contentStyle = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};


export default function Insta() {
  const [feed, setFeed] = useState();

  /* useEffect(() => {
    getInstagramFeedInfo('vitormsouza_').then((res) => {
      setFeed(res);
      console.log(res)
    }
    )
  }, []) */

  useEffect(() => {
    /*  const response = await fetch(proxyUrl + targetUrl, requestOptions); */
    fetch(`https://www.instagram.com/graphql/query/?query_id=17888483320059182&variables=%7B%22id%22:%2219360403638%22,%22first%22:20,%22after%22:null%7D`).then(response => {
      response.json().then((formattedResponse) => {
        console.log(formattedResponse)
      })
    })
  }, []);


  return (
    <div>
      {
        feed && (
          `${feed.accountInfo.biography}`
        )
      }

      <Carousel autoplay>
        <div>
          {feed && feed.media.map((img) => (

            < ImageLoader
              src={`${img.displayImage}`}
              // loading={() => <img src={loading} alt="Loading..." />}
              error={() => <div>Error</div>}
            />

          ))}
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>

    </div>
  )
}