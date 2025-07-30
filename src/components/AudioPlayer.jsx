const AudioPlayer = ({ audioBlob }) => {
  if (!audioBlob) return null;

  const audioUrl = URL.createObjectURL(audioBlob);

  return (
    <div style={{ marginTop: 30 }}>
      <audio controls src={audioUrl}></audio>
    </div>
  );
};

export default AudioPlayer;
