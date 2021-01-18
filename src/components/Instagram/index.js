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

  useEffect(() => {
    getInstagramFeedInfo('vitormsouza_').then((res) => {
      setFeed(res);
      console.log(res)
    }
    )
  }, [])


  return (
    <div>
      {
        feed && (
          `${feed.accountInfo.biography}`
        )
      }

      <Carousel autoplay>
        <div>
          { feed && feed.media.map((img) => (

            < ImageLoader
            src = {`${img.displayImage}`}
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