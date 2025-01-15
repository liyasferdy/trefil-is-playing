"use client";

import { useState, useEffect, useRef } from "react";
import { Image } from "@nextui-org/image";

export default function Home() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [backgroundPosition, setBackgroundPosition] = useState(0);
  const [direction, setDirection] = useState(1);
  const [discoColors, setDiscoColors] = useState([
    "rgba(255, 0, 0, 0.5)",
    "rgba(0, 255, 0, 0.5)",
    "rgba(0, 0, 255, 0.5)",
  ]);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const audioRef = useRef(null);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - 250,
        y: e.clientY - 250,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setPosition({ x: 0, y: 0 });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setBackgroundPosition((prev) => {
        const nextPosition = prev + direction * 1;
        if (nextPosition >= 100 || nextPosition <= 0) {
          setDirection((prevDirection) => -prevDirection);
        }
        return nextPosition;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [direction]);

  useEffect(() => {
    const colorInterval = setInterval(() => {
      const newColors = discoColors.map(
        () =>
          `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(
            Math.random() * 256
          )}, ${Math.floor(Math.random() * 256)}, 0.5)`
      );
      setDiscoColors(newColors);
    }, 500); // Change colors every 500ms

    return () => clearInterval(colorInterval);
  }, [discoColors]);

  const handlePlayAudio = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setAudioPlaying(true);
    }
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Audio Element */}
      <audio ref={audioRef} src="/assets/Conga.mp3" loop />

      {!audioPlaying ? (
        <div className="flex justify-center items-center w-full h-full">
          <button
            onClick={handlePlayAudio}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg z-50"
          >
            Play with me
          </button>
        </div>
      ) : (
        <>
          {/* Disco lights overlay */}
          <div className="absolute inset-0 w-full h-full opacity-50">
            <div
              className="absolute inset-0 mix-blend-color-dodge animate-disco-1"
              style={{ backgroundColor: discoColors[0] }}
            />
            <div
              className="absolute inset-0 mix-blend-color-dodge animate-disco-2"
              style={{ backgroundColor: discoColors[1] }}
            />
            <div
              className="absolute inset-0 mix-blend-color-dodge animate-disco-3"
              style={{ backgroundColor: discoColors[2] }}
            />
          </div>

          <div
            className="flex justify-center items-center w-full h-full"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={{
              backgroundImage: "url('/assets/face.png')",
              backgroundRepeat: "repeat",
              backgroundSize: "140px 200px",
              backgroundPosition: `0px ${backgroundPosition}px`,
            }}
          >
            <div
              className="text-center"
              style={{
                position: "absolute",
                top: position.y || "50%",
                left: position.x || "50%",
                transform:
                  position.x || position.y ? "none" : "translate(-50%, -50%)",
                cursor: isDragging ? "grabbing" : "grab",
              }}
              onMouseDown={handleMouseDown}
            >
              <Image
                alt="NextUI hero Image"
                src="/assets/face.png"
                width={500}
                className="relative z-10" // Ensure image stays above the disco effects
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
