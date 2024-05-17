import {ReactNode, useState} from 'react';
import axios from 'axios';
// import Modal from "./components/Modal.tsx";

// import Modal from './components/Modal';

function App() {
    const [inputValue, setInputValue] = useState('');
    // const [responseUrl, setResponseUrl] = useState('');
    const [ErrorText, setErrorText] = useState<ReactNode | null>(null);
    const [SuccessText,setSuccessText] = useState<ReactNode | null>(null);
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
            }
        }
    }
    return (
        <div>
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
            <h5 className="error" dangerouslySetInnerHTML={{__html: ErrorText}}></h5>
            //     <Modal title="ERROR">ASD</Modal>
            }
            {SuccessText != null &&
                <h5 className="success" dangerouslySetInnerHTML={{__html: SuccessText}}></h5>
                // <Modal title="SUCCESS">SIGMA</Modal>
            }
        </div>
    );
}

export default App;
