import React, { useState, useEffect } from 'react';

const NFTImageStaking = ({ imageUrl }) => {
    const [imgSrc, setImgSrc] = useState('');

  useEffect(() => {
    async function fetchImage() {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const src = URL.createObjectURL(blob);
      setImgSrc(src);
    }

    fetchImage();
  }, [imageUrl]);

  return (
    <label>
      <img className='singleImageStk' src={imgSrc} alt="" />
    </label>
  );
}

export default NFTImageStaking;