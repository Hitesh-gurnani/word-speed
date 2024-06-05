import '../styles/TypingHero.css'
function TypingHero({ scrollToTest }: { scrollToTest: () => void }) {
    return (
        <div className="hero-container">
            <header style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} className="hero-content">
                <div className="md:text-[40px] text-[20px]"><b>Welcome to TypeTester</b></div>
                <p>Improve your typing skills with interactive lessons <br /> and real-time feedback.</p>
                <button onClick={scrollToTest} className="start-button">
                    Get Started
                </button>
            </header>
        </div>

    );
}

export default TypingHero;
