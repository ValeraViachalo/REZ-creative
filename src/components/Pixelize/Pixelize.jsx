import React, { useEffect, useRef } from "react";
import "./Pixelize.scss"

export const Pixelize = ({ imageUrl, pixelSize }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      // Встановлюємо розміри канвасу відповідно до розмірів зображення
      canvas.width = img.width;
      canvas.height = img.height;

      // Зменшуємо розмір зображення
      const scaledWidth = img.width / pixelSize;
      const scaledHeight = img.height / pixelSize;

      // Рендеримо зменшене зображення
      ctx.drawImage(img, 0, 0, scaledWidth, scaledHeight);

      // Пікселізуємо зображення, збільшуючи його до початкового розміру
      ctx.mozImageSmoothingEnabled = false;
      ctx.webkitImageSmoothingEnabled = false;
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(canvas, 0, 0, scaledWidth, scaledHeight, 0, 0, img.width, img.height);
    };
  }, [imageUrl, pixelSize]);

  return <canvas ref={canvasRef} className="pixelize-canvas"/>;
};
