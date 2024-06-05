import { forwardRef, useEffect, useRef, useState } from "react";
import "../styles/TypingTest.css";

const TypingTest = forwardRef<HTMLDivElement>((_props, ref) => {
    const [words, setWords] = useState("");
    const [countDown, setCountDown] = useState(30);
    const [isFlag, setIsFlag] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [countdownAnimation, setCountdownAnimation] = useState(false);
    const [animationText, setAnimationText] = useState("");
    const [animationShown, setAnimationShown] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        let intervalVal: any;
        if (isFlag && countDown > 0) {
            intervalVal = setInterval(() => {
                setCountDown((prevCountDown) => prevCountDown - 1);
            }, 1000);
        } else if (countDown === 0) {
            setShowResult(true);
        }
        return () => clearInterval(intervalVal);
    }, [isFlag, countDown]);

    useEffect(() => {
        if (words.length > 0 && !isFlag) {
            setIsFlag(true);
        } else if (words.length === 0 && countDown === 30) {
            setIsFlag(false);
        }
    }, [words]);

    const handleFocus = () => {
        setIsInputFocused(true);
        if (!animationShown) {
            setCountdownAnimation(true);
            startCountdownAnimation();
        } else {
            setIsFlag(true);
        }
    };

    const startCountdownAnimation = () => {
        const countdownTexts = ["3", "2", "1", "Let's go!"];
        countdownTexts.forEach((text, index) => {
            setTimeout(() => {
                setAnimationText(text);
                if (index === countdownTexts.length - 1) {
                    setTimeout(() => {
                        setCountdownAnimation(false);
                        setIsFlag(true);
                        setAnimationShown(true);
                    }, 1000);
                }
            }, index * 1000);
        });
    };

    const handleBlur = () => {
        setIsInputFocused(false);
    };

    const handleRetry = () => {
        setWords("");
        setCountDown(30);
        setIsFlag(false);
        setShowResult(false);
        setIsInputFocused(false);
        setCountdownAnimation(false);
        setAnimationText("");
        setAnimationShown(false);
    };

    const wordsTyped = words.split(" ").length;
    const wordsPerMinute = words.length === 0 ? "0" : Math.round((wordsTyped * 60) / (30 - countDown));

    return (
        <div ref={ref} className="typing-test-container">
            <div className={`typing-test-box ${isInputFocused ? "expand" : ""}`}>
                {showResult ? (
                    <div className="results-display">
                        <h2>Time's Up!</h2>
                        <p>Your typing speed is</p>
                        <p className="wpm-display">{wordsPerMinute} WPM</p>
                        <button className="retry-button" onClick={handleRetry}>Retry</button>
                    </div>
                ) : (
                    <>
                        {countdownAnimation ? (
                            <div className="countdown-animation">{animationText}</div>
                        ) : (
                            <>
                                <input
                                    className="typing-input"
                                    type="text"
                                    ref={inputRef}
                                    disabled={countDown === 0}
                                    placeholder="Start typing..."
                                    onFocus={handleFocus}
                                    onBlur={handleBlur}
                                    onChange={(e) => setWords(e.target.value)}
                                />
                                <div className="stats-display">
                                    <div className="wpm-stats">Wpm: {wordsPerMinute}</div>
                                    <div className={`timer-stats ${countDown <= 3 ? "urgent" : ""}`}>
                                        Timer: {countDown}
                                    </div>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
});

export default TypingTest;
