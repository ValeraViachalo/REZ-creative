import { useState, useEffect } from 'react';

export function useIsTouchDevice() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const matchMediaTouch = window.matchMedia('(pointer: coarse)');
    const checkIfTouchDevice = () => {
      setIsTouchDevice(matchMediaTouch.matches);
    };

    checkIfTouchDevice();

    // Update the state when the window is resized or orientation changes
    matchMediaTouch.addEventListener('change', checkIfTouchDevice);

    return () => {
      matchMediaTouch.removeEventListener('change', checkIfTouchDevice);
    };
  }, []);

  console.log(isTouchDevice);
  return isTouchDevice;
}