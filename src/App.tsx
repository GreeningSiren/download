import { useState, useMemo } from 'react';
import axios from 'axios';
import HTMLReactParser from 'html-react-parser';
import { Link } from "react-router-dom";

function App() {
    const [inputValue, setInputValue] = useState('');
    const [ErrorText, setErrorText] = useState<string | null>(null);
    const [SuccessText, setSuccessText] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const apiUrl = 'https://api.cobalt.tools/api/json';
    const alternativeApiUrl = 'https://cobalt.canine.tools/api/json';

    const linkStyle = useMemo(() => ({
        textDecoration: "underline",
        color: "#05dcaa",
        fontSize: '20px'
    }), []);

    const footerLinkStyle = useMemo(() => ({
        color: 'aqua',
        textDecoration: 'none'
    }), []);

    const cobaltLinkStyle = useMemo(() => ({
        color: '#ffb854',
        textDecoration: 'none'
    }), []);

    const handleSubmit = async (isAudioOnly: boolean, endpointUrl: string) => {
        if (!inputValue.trim()) {
            setErrorText("❌ERROR❌<br><br>❗Please enter a URL❗");
            setTimeout(() => { setErrorText(null) }, 2000);
            return;
        }
        if (!inputValue.trim().startsWith('https://')) {
            setErrorText("❌ERROR❌<br><br>❗URL must start with 'https://'❗");
            setInputValue('');
            setTimeout(() => { setErrorText(null) }, 2000);
            return;
        }
        try {
            setIsProcessing(true);
            const response = await axios.post(
                endpointUrl,
                { url: inputValue, isAudioOnly, filenamePattern: "classic" },
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );
            setIsProcessing(false);
            setErrorText(null);
            const ResponseUrl = response.data.url;
            setSuccessText("✅Success✅<br><br>Download should start shortly!");
            setTimeout(() => { window.open(ResponseUrl, '_self') }, 500);
            setInputValue('');
            setTimeout(() => { setSuccessText(null) }, 1200);
        } catch (error) {
            setSuccessText(null);
            if (endpointUrl === apiUrl) {
                // @ts-expect-error Cuz error is bad ;(
                setErrorText(`❌ERROR❌ <br><br> ${error.response.data.text} <br><br> 🔁Trying Alternate Server!🔁`);
                setTimeout(async () => { await handleSubmit(isAudioOnly, alternativeApiUrl) }, 1500);
            } else {
                setIsProcessing(false);
                // @ts-expect-error Cuz error is bad ;(
                setErrorText(`❌ERROR❌ <br><br> ${error.response.data.text} <br><br> ❌Alternate Server Failed!❌`);
                setInputValue('');
                setTimeout(() => { setErrorText(null) }, 1500);
            }
        }
    }

    return (
        <>
            <h2>GreeningSiren&apos;s</h2>
            <h1>Download Center</h1>
            <input
                type="url"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter URL here:"
                name="url"
            />
            <button type="submit" onClick={async () => { await handleSubmit(false, apiUrl) }}>Download Video</button>
            <button type="submit" onClick={async () => { await handleSubmit(true, apiUrl) }}>Download Audio</button>
            {ErrorText === null && SuccessText === null && !isProcessing ?
                <><br /><br /><Link to={'/download/supported/'} style={linkStyle}>See Supported Services</Link></>
                : null}

            {isProcessing &&
                <h5 className="processing">⌚PROCESSING⌚</h5>
            }
            {ErrorText !== null &&
                <h5 className="error">{HTMLReactParser(ErrorText)}</h5>
            }
            {SuccessText !== null &&
                <h5 className="success">{HTMLReactParser(SuccessText)}</h5>
            }
            <footer>
                <p style={{ fontSize: '17px' }}>
                    <Link to={'/download/serverStatus/'} style={footerLinkStyle}>API Status</Link> | Created using the <a href='https://github.com/imputnet/cobalt/blob/current/docs%2Fapi.md' style={cobaltLinkStyle}> cobalt api</a>
                </p>
            </footer>
        </>
    );
}

export default App;
