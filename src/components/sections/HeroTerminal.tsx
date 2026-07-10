"use client";

import { useEffect, useState } from "react";

const terminalLines = [
  { kind: "command", text: "$ cat profile.json" },
  { kind: "output", text: '{ "role": "Full-Stack Developer",' },
  { kind: "output", text: '  "stack": ["Next.js", "Node.js", "Spring Boot"] }' },
  { kind: "command", text: "$ npm run build" },
  { kind: "output", text: "Compiling frontend, APIs, and services..." },
  { kind: "success", text: "✓ Build complete. Ready to deploy." },
  { kind: "command", text: "$ status" },
  { kind: "success", text: "Open to new opportunities." },
] as const;

const typingSpeed = 34;
const linePause = 240;
const loopPause = 2400;

export function HeroTerminal() {
  const [lineIndex, setLineIndex] = useState(0);
  const [characterIndex, setCharacterIndex] = useState(0);

  useEffect(() => {
    const currentLine = terminalLines[lineIndex];
    const lineComplete = characterIndex >= currentLine.text.length;
    const sequenceComplete = lineComplete && lineIndex === terminalLines.length - 1;

    const timeout = window.setTimeout(
      () => {
        if (sequenceComplete) {
          setLineIndex(0);
          setCharacterIndex(0);
        } else if (lineComplete) {
          setLineIndex((index) => index + 1);
          setCharacterIndex(0);
        } else {
          setCharacterIndex((index) => index + 1);
        }
      },
      sequenceComplete ? loopPause : lineComplete ? linePause : typingSpeed,
    );

    return () => window.clearTimeout(timeout);
  }, [characterIndex, lineIndex]);

  return (
    <div className="hero-terminal" aria-label="Animated professional profile terminal">
      <div className="hero-terminal__bar">
        <div className="flex gap-2" aria-hidden="true">
          <span className="hero-terminal__dot bg-[#ff5f57]" />
          <span className="hero-terminal__dot bg-[#febc2e]" />
          <span className="hero-terminal__dot bg-[#28c840]" />
        </div>
        <span className="hero-terminal__title">METHUM@FULLSTACK — TERMINAL</span>
        <span className="w-[3.25rem]" aria-hidden="true" />
      </div>

      <div className="hero-terminal__body" aria-hidden="true">
        {terminalLines.slice(0, lineIndex + 1).map((line, index) => {
          const visibleText = index === lineIndex ? line.text.slice(0, characterIndex) : line.text;

          return (
            <div
              key={`${line.text}-${index}`}
              className={`hero-terminal__line hero-terminal__line--${line.kind}`}
            >
              {visibleText}
              {index === lineIndex && <span className="hero-terminal__cursor" />}
            </div>
          );
        })}
      </div>

      <span className="sr-only">
        Full-stack developer focused on frontend applications, backend services, APIs, databases, and reliable delivery. Open to new opportunities.
      </span>
    </div>
  );
}
