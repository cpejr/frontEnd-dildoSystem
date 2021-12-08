import React, { useEffect, useState } from 'react';
import api from '../../services/api';

import './styles.css';

async function postImage({ image, description }) {
  const formData = new FormData();
  formData.append('image', image);
  formData.append('description', description);

  const result = await api.post('/imagesAWS', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
  return result.data;
}

export default function TestImagesAWS() {
  const [file, setFile] = useState();
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

  const submit = async (event) => {
    event.preventDefault();
    const result = await postImage({ image: file, description });
    setImages([result.image, ...images]);
  };

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  return (
    <div className="App-test-images">
      <form onSubmit={submit}>
        <input onChange={fileSelected} type="file" accept="image/*" />
        <input value={description} onChange={(e) => setDescription(e.target.value)} type="text" />
        <button type="submit">Submit</button>
      </form>

      { images.map((image) => (
        <div key={image}>
          <img src={image} />
        </div>
      ))}

      <img src="http://localhost:3333/imagesAWS/cd934e50d452ebf32a84d83e5a61e3ef" />

    </div>
  );
}
