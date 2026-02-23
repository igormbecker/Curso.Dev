import { useEffect, useState } from "react";

function Home() {
  const fullText = `>>> This page is under construction...
                    >>> Please comeback later :)
                    >>> Bye 👋`;

  const typingSpeed = 50;
  const deletingSpeed = 30;
  const pauseAfterTyping = 5000;

  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;

    if (!isDeleting && displayedText.length < fullText.length) {
      timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      }, typingSpeed);
    } else if (!isDeleting && displayedText.length === fullText.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, pauseAfterTyping);
    } else if (isDeleting && displayedText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length - 1));
      }, deletingSpeed);
    } else if (isDeleting && displayedText.length === 0) {
      setIsDeleting(false);
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, fullText]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#0d1117",
        color: "#00ff88",
        fontFamily: "Courier New, monospace",
        fontSize: "1.4rem",
        padding: "20px",
        whiteSpace: "pre-line",
      }}
    >
      <div>
        {displayedText}
        <span style={{ opacity: 0.8 }}>█</span>
      </div>
    </div>
  );
}

export default Home;