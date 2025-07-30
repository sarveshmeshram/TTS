import { useEffect, useRef, useState } from "react";
import { FaPlayCircle, FaPauseCircle, FaDownload } from "react-icons/fa";



const AudioPlayer = ({ audioFile }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef();
  const [audioUrl, setAudioUrl] = useState(null);

  useEffect(() => {
    if (audioFile && audioFile.AudioStream) {
      const audioArrayBuffer = audioFile.AudioStream.buffer;
      const url = URL.createObjectURL(new Blob([audioArrayBuffer], { type: "audio/mpeg" }));
      setAudioUrl(url);
      const audio = audioRef.current;
      audio.src = url;

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [audioFile]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return audioUrl ? (
    <div className="audio-player">
      <audio ref={audioRef} />
      <button onClick={togglePlay}>
        {isPlaying ? <FaPauseCircle size={30} /> : <FaPlayCircle size={30} />}
      </button>
      <a href={audioUrl} download="speech.mp3">
        <FaDownload size={24} style={{ marginLeft: "16px" }} />
      </a>
    </div>
  ) : null;
};

export default AudioPlayer;
