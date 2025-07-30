import { useState } from "react";
import Header from "./components/Header";
import Section from "./components/Section";
import AudioPlayer from "./components/AudioPlayer";
import "./App.css";
import { PollyClient, SynthesizeSpeechCommand } from "@aws-sdk/client-polly";

const pollyClient = new PollyClient({
  region: import.meta.env.VITE_REACT_APP_REGION,
  credentials: {
    accessKeyId: import.meta.env.VITE_REACT_APP_ACCESS_KEY_ID,
    secretAccessKey: import.meta.env.VITE_REACT_APP_SECRET_ACCESS_KEY,
  },
});

function App() {
  const [text, setText] = useState("");
  const [voice, setVoice] = useState("Salli");
  const [audioBlob, setAudioBlob] = useState(null);

  const convertTextToSpeech = async () => {
    if (!text.trim()) return alert("Please enter some text");

    try {
      const command = new SynthesizeSpeechCommand({
        OutputFormat: "mp3",
        Text: text,
        VoiceId: voice,
      });

      const response = await pollyClient.send(command);
      const buffer = await response.AudioStream.transformToByteArray();
      const blob = new Blob([buffer], { type: "audio/mpeg" });

      setAudioBlob(blob);
    } catch (err) {
      console.error("Polly Error:", err);
      alert("Failed to convert text to speech.");
    }
  };

  return (
    <div className="container">
      <Header />
      <Section
        text={text}
        setText={setText}
        voice={voice}
        setVoice={setVoice}
        convertTextToSpeech={convertTextToSpeech}
      />
      <AudioPlayer audioBlob={audioBlob} />
    </div>
  );
}

export default App;
