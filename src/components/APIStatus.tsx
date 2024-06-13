import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
interface ServiceStatus {
    name: string;
    version: number;
    branch: string;
    startTime: number; // Use 'number' if the API returns a number
}

export default function StatusPage(){
    const [data1, setData1] = useState<ServiceStatus | null>(null);
    const [data2, setData2] = useState<ServiceStatus | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response1 = await fetch('https://api.cobalt.tools/api/serverInfo');
                const response2 = await fetch('https://cobalt.canine.tools/api/serverInfo');


                if (!response1.ok || !response2.ok) {
                    throw new Error("Couldn't get response from API");
                }

                const result1 = await response1.json();
                const result2 = await response2.json();

                setData1(result1);
                setData2(result2);
                setLoading(false);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err);
                } else {
                    setError(new Error('An unknown error occurred'));
                }
                setLoading(false);
            }
        };

        fetchData();
    }, []); // The empty dependency array ensures this effect runs only once when the component mounts

    if (loading) return <h2>Loading...</h2>;
    if (error) return <><Link to={'/download/'} style={{color:'#05dcaa', fontSize: "20px"}}>Go back</Link><br/><div>Error: {error.message}</div></>;

    return (
        <div>
            <Link to={'/download/'} style={{color:'#05dcaa', fontSize: "20px"}}>Go back</Link>
            <h1>API Status</h1>
            <table style={{color:'whitesmoke',width: '100%',fontSize:'20px'}}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Version</th>
                        <th>Branch</th>
                        <th>Start Time</th>
                    </tr>
                </thead>
                <tbody>
                    {data1 && (
                        <tr>
                            <td>{data1.name}</td>
                            <td>{data1.version}</td>
                            <td>{data1.branch}</td>
                            <td>{data1.startTime}</td>
                        </tr>
                    )}
                    {data2 && (
                        <tr>
                            <td>{data2.name}</td>
                            <td>{data2.version}</td>
                            <td>{data2.branch}</td>
                            <td>{data2.startTime}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};