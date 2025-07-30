const Section = ({ text, setText, voice, setVoice, convertTextToSpeech }) => {
  return (
    <div className="section-container">
      <textarea
        className="textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
      />

      <select
        value={voice}
        onChange={(e) => setVoice(e.target.value)}
        className="dropdown"
      >
        <option value="Salli">Salli</option>
        <option value="Joanna">Joanna</option>
        <option value="Matthew">Matthew</option>
        <option value="Ivy">Ivy</option>
      </select>

      <button className="btn-converter" onClick={convertTextToSpeech}>
        Convert to Speech
      </button>
    </div>
  );
};

export default Section;
