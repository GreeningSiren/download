import ReactMarkdown from 'react-markdown'
import remarkGfm from "remark-gfm";
import {Link} from "react-router-dom";

const markdown = "## supported services\n" +
    "| service                        | video + audio | only audio | only video | metadata | rich file names |\n" +
    "| :--------                      | :-----------: | :--------: | :--------: | :------: | :-------------: |\n" +
    "| bilibili.com & bilibili.tv     | ✅            | ✅         | ✅         | ➖         | ➖              |\n" +
    "| dailymotion                    | ✅            | ✅         | ✅         | ✅         | ✅              |\n" +
    "| instagram posts & reels        | ✅            | ✅         | ✅         | ➖         | ➖              |\n" +
    "| ok video                       | ✅            | ❌         | ❌         | ✅         | ✅              |\n" +
    "| pinterest                      | ✅            | ✅         | ✅         | ➖         | ➖              |\n" +
    "| reddit                         | ✅            | ✅         | ✅         | ❌         | ❌              |\n" +
    "| rutube                         | ✅            | ✅         | ✅         | ✅         | ✅              |\n" +
    "| soundcloud                     | ➖            | ✅         | ➖         | ✅         | ✅              |\n" +
    "| streamable                     | ✅            | ✅         | ✅         | ➖         | ➖              |\n" +
    "| tiktok                         | ✅            | ✅         | ✅         | ❌         | ❌              |\n" +
    "| tumblr                         | ✅            | ✅         | ✅         | ➖         | ➖              |\n" +
    "| twitch clips                   | ✅            | ✅         | ✅         | ✅         | ✅              |\n" +
    "| twitter/x                      | ✅            | ✅         | ✅         | ➖         | ➖              |\n" +
    "| vimeo                          | ✅            | ✅         | ✅         | ✅         | ✅              |\n" +
    "| vine archive                   | ✅            | ✅         | ✅         | ➖         | ➖              |\n" +
    "| vk videos & clips              | ✅            | ❌         | ❌         | ✅         | ✅              |\n" +
    "| youtube videos, shorts & music | ✅            | ✅         | ✅         | ✅         | ✅              |\n" +
    "\n" +
    "| emoji   | meaning                 |\n" +
    "| :-----: | :---------------------- |\n" +
    "| ✅      | supported               |\n" +
    "| ➖      | impossible/unreasonable |\n" +
    "| ❌      | not supported           |"

const tableStyles = 'th, td{background-color:#242424;color:whitesmoke;}'
export default function SupportedServices() {
    return (
        <>
            <Link to={'/download/'} style={{textDecoration: "underline", color: "#05dcaa"}} >Go Home</Link>
            <style>{tableStyles}</style>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
        </>
    )
}
