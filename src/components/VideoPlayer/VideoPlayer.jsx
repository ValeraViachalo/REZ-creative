import React, { useState, useEffect, useRef } from "react";
import "./VideoPlayer.scss";
import { motion, useTransform, useMotionValue } from "framer-motion";
import ReactPlayer from "react-player";
import classNames from "classnames";

export const VideoPlayer = ({ url, customClass = "", ...rest }) => {
  const [muted, setMuted] = useState(false);
  const [seeking, setSeeking] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [played, setPlayed] = useState(0);
  const [volume, setVolume] = useState(1);

  const playerRef = useRef(null);
  const containerRef = useRef(null);

  const playedMotionValue = useMotionValue(0);
  const volumeMotionValue = useMotionValue(1);
  const clipPathDuration = useTransform(
    playedMotionValue,
    [0, 1],
    ["inset(0 100% 0 0)", "inset(0 0% 0 0)"]
  );

  const handleProgress = (state) => {
    if (!seeking) {
      setPlayed(state.played);
      playedMotionValue.set(state.played);
    }
  };

  const handleMuted = () => {
    if (!muted) {
      setMuted(true);
      setVolume(0);
      volumeMotionValue.set(0);
    } else {
      setMuted(false);
      setVolume(1);
      volumeMotionValue.set(1);
    }
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  const handleSeekChange = (e) => {
    const newValue = parseFloat(e.target.value);
    setPlayed(newValue);
    playedMotionValue.set(newValue);
  };

  const handleSeekMouseUp = (e) => {
    setSeeking(false);
    playerRef.current.seekTo(parseFloat(e.target.value));
  };

  const handleFullscreen = () => {
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current.mozRequestFullScreen) {
        containerRef.current.mozRequestFullScreen();
      } else if (containerRef.current.webkitRequestFullscreen) {
        containerRef.current.webkitRequestFullscreen();
      } else if (containerRef.current.msRequestFullscreen) {
        containerRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div
      className={`video-wrapper ${customClass}`}
      ref={containerRef}
      {...rest}
    >
      <ReactPlayer
        ref={playerRef}
        url={url}
        className="video"
        playing={isPlaying}
        volume={volume}
        muted={muted}
        onEnded={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        playsinline={true}
        progressInterval={100}
        onProgress={handleProgress}
      />
      <div
        className="video__play-btn-wrapper"
        onClick={() => setIsPlaying(!isPlaying)}
      >
        <svg
          viewBox="0 0 126 81"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={classNames("video__play-btn", {
            "video__play-btn--playing": isPlaying,
          })}
        >
          <rect
            x="1.625"
            y="1.625"
            width="122.75"
            height="77.75"
            fill="white"
            stroke="#D333EA"
            stroke-width="2.75"
          />
          <path d="M79 40L53 56L53 24L79 40Z" fill="black" />
        </svg>
      </div>
      <div
        className={classNames("video-controll", {
          "video-controll--not-playing": !isPlaying && !isFullscreen,
        })}
      >
        <div
          className="video__stop-button"
          onClick={() => setIsPlaying(!isPlaying)}
        >
          {!isPlaying ? (
            <svg
              viewBox="0 0 42 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M34 21L8.5 4.5V37L34 21Z" fill="white" stroke="white" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 42 42"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="10" y="4" width="6" height="34" fill="white" />
              <rect x="26" y="4" width="6" height="34" fill="white" />
            </svg>
          )}
        </div>
        <div className="video-controll__center">
          <div className="video-thumb">
            <motion.span
              className="video__thumb-progress"
              style={{ clipPath: clipPathDuration }}
            />
            <input
              type="range"
              min={0}
              max={0.999999}
              step="any"
              value={played}
              onMouseDown={handleSeekMouseDown}
              onMouseUp={handleSeekMouseUp}
              onTouchStart={handleSeekMouseDown}
              onTouchEnd={handleSeekMouseUp}
              onChange={handleSeekChange}
              className="video__thumb-progress--seek"
            />
          </div>
          <div className="video-volume">
            <div className="video-volume__button" onClick={() => handleMuted()}>
              {!muted ? (
                <svg
                  viewBox="0 0 45 45"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.1429 29.8044H1.40669C1.0339 29.8044 0.676623 29.6336 0.412153 29.3277C0.149099 29.0235 0 28.6087 0 28.1776V16.2515C0 15.8204 0.147705 15.4072 0.412153 15.1013C0.675208 14.7971 1.03393 14.6247 1.40669 14.6247H5.1429L15.4286 4H17.2967C17.6849 4 18 4.3644 18 4.81339V39.6152C18 40.0642 17.6849 40.4286 17.2967 40.4286H15.4286L5.1429 29.8044Z"
                    fill="white"
                  />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 45 45"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.1429 29.0841H1.40669C1.0339 29.0841 0.676623 28.9247 0.412153 28.6392C0.149099 28.3553 0 27.9681 0 27.5658V16.4347C0 16.0323 0.147705 15.6467 0.412153 15.3612C0.675208 15.0773 1.03393 14.9164 1.40669 14.9164H5.1429L15.4286 5H17.2967C17.6849 5 18 5.34011 18 5.75916V38.2408C18 38.6599 17.6849 39 17.2967 39H15.4286L5.1429 29.0841Z"
                    fill="white"
                  />
                  <rect
                    width="4.1431"
                    height="23.8228"
                    transform="matrix(0.705422 -0.708787 0.705422 0.708787 25.2715 15.1147)"
                    fill="white"
                  />
                  <rect
                    width="4.1431"
                    height="23.8228"
                    transform="matrix(0.705422 0.708787 -0.705422 0.708787 41.8047 12)"
                    fill="white"
                  />
                </svg>
              )}
            </div>
          </div>
        </div>
        <div className="video-fullscreen" onClick={handleFullscreen}>
          <svg
            viewBox="0 0 42 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M26 3.17448e-08L42 1.43051e-06L42 4L26 4L26 3.17448e-08Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M42 -1.74846e-07L42 16L38 16L38 0L42 -1.74846e-07Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M-2.22547e-07 16L4.76837e-07 -1.74846e-07L4 0L4 16L-2.22547e-07 16Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M-3.49691e-07 -3.17469e-08L16 -1.43051e-06L16 4L0 4L-3.49691e-07 -3.17469e-08Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16 42L0 42L0 38L16 38L16 42Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M1.90798e-07 42L-1.90735e-06 26L4 26L4 42L1.90798e-07 42Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M42 26L42 42L38 42L38 26L42 26Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M42 42L26 42L26 38L42 38L42 42Z"
              fill="white"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};
