import { useState } from 'react';
import axios from 'axios';
// import MessageModal from "./components/Modal.tsx";
// import Modal from "./components/Modal.tsx";
// import SupportedServeices from "./components/Supported.tsx";
import HTMLReactParser from 'html-react-parser';
// import {Link} from "react-router-dom";
function App() {
    const [inputValue, setInputValue] = useState('');
    // const [responseUrl, setResponseUrl] = useState('');
    const [ErrorText, setErrorText] = useState<string | null>(null);
    const [SuccessText,setSuccessText] = useState<string | null>(null);
    const apiUrl = 'https://co.wuk.sh/api/json';
    const alternativeApiUrl = 'https://cobalt.canine.tools/api/json';
    // let url = apiUrl
    const handleSubmit = async (isAudioOnly: boolean, endpointUrl: string) => {
        if (!inputValue.trim()) {
            setErrorText("❌ERROR❌<br><br>❗Please enter a URL❗");
            setTimeout(() => {setErrorText(null)},2000)
            return;
        }
        if (!inputValue.trim().startsWith('https://')) {
        setErrorText("❌ERROR❌<br><br>❗URL must start with 'https://'❗");
            setInputValue('')
            setTimeout(() => {setErrorText(null)}, 2000)
            return;
        }
        try {
            const response = await axios.post(
                endpointUrl,
                {url: inputValue, isAudioOnly, filenamePattern: "classic"},
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            );
            setErrorText(null);
            const ResponseUrl = response.data.url;
            setSuccessText("✅Success✅<br><br>Download should start shortly!")
            setTimeout(() => {window.open(ResponseUrl, '_self')}, 1200); // Open the URL in a new tab if not downloading audio
            setInputValue('');
            setTimeout(() => {setSuccessText(null)}, 2000)
        } catch (error) {
            // console.error('Error:', error);
            setSuccessText(null)
            if (endpointUrl === apiUrl) {
                // @ts-expect-error Cuz error is bad ;(
                setErrorText("❌ERROR❌ <br><br>"+error.response.data.text + "<br><br> 🔁Trying Alternate Server!🔁");
                // console.log(error.response.data.text);
                setTimeout(async () => {await handleSubmit(isAudioOnly,alternativeApiUrl)},2500)
                // await handleSubmit(isAudioOnly, alternativeApiUrl);
            }else{
                // @ts-expect-error Cuz error is bad ;(
                setErrorText("❌ERROR❌ <br><br>"+error.response.data.text + "<br><br> ❌Alternate Server Failed!❌");
                setInputValue('');
                setTimeout(() => {setErrorText(null)}, 2500)
            }
        }
    }
    return (
        <div>
            {/*<Link to={'/download/supported/'} style={{textDecoration: "none", color: "#05dcaa"}}>See Supported Services</Link>*/}
            <h2>GreeningSiren&apos;s</h2>
            <h1>Download Center</h1>
            <input
                type="search"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter URL here:"
            />
            <button type="submit" onClick={() => handleSubmit(false,apiUrl)}>Download Video</button>
            <button type="submit" onClick={() => handleSubmit(true,apiUrl)}>Download Audio</button>
            {/*{responseUrl && <p>Response URL: {responseUrl}</p>}*/}
            {ErrorText != null &&
            <h5 className="error">{HTMLReactParser(ErrorText)}</h5>
            //     <MessageModal title="ERROR" text={<div dangerouslySetInnerHTML={{__html: ErrorText}}></div>} />
            }
            {SuccessText != null &&
                <h5 className="success">{HTMLReactParser(SuccessText)}</h5>
                // <Modal title="SUCCESS">SIGMA</Modal>
            }
            {/*<SupportedServeices></SupportedServeices>*/}
        </div>
    );
}

export default App;
