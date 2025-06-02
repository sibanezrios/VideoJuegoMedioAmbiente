// hooks/useTTS.ts
import { useEffect } from 'react';
import { useTTSContext } from './TTSContext';

export function useTTS(lines: string[], lang = 'es-Es') {
    const { ttsEnabled } = useTTSContext();

  useEffect(() => {
    if (!ttsEnabled || !lines || lines.length === 0) return;

    const synth = window.speechSynthesis;
    synth.cancel();

    let index = 0;

    const speakNext = () => {
      if (index >= lines.length) return;

      const utterance = new SpeechSynthesisUtterance(lines[index]);
      utterance.lang = lang;
      utterance.rate = 1;

      utterance.onend = () => {
        index++;
        speakNext(); // siguiente línea
      };

      synth.speak(utterance);
    };

    speakNext(); // empieza la primera

    return () => synth.cancel();
  }, [lines, ttsEnabled, lang]);
}
