import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import './APIStatus.css';
interface ServiceStatus {
    name: string;
    version: number;
    branch: string;
}

export default function StatusPage() {
    const [data1, setData1] = useState<ServiceStatus | null>(null);
    const [data2, setData2] = useState<ServiceStatus | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response1 = await fetch('https://api.cobalt.tools/api/serverInfo');
                const result1 = await response1.json();
                setData1(result1);

                const response2 = await fetch('https://cobalt.canine.tools/api/serverInfo');
                const result2 = await response2.json();
                setData2(result2);

                setLoading(false);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err);
                    console.log(error)
                } else {
                    setError(new Error('An unknown error occurred'));
                }
                setLoading(false);
            }
        };

        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // The empty dependency array ensures this effect runs only once when the component mounts

    if(!data1 && !data2 && error)
        return <>
        <h1>API Status</h1>
        <h1>Error: {error.message}</h1>
        <Link to={'/download/'} style={{color:'#05dcaa', fontSize: "20px"}}>Go Home</Link>
        </>;

    return (
        <div>
            <h1>API Status</h1>
            <table style={{ color: 'whitesmoke', width: '100%', fontSize: '20px' }} className='status-table'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Version</th>
                        <th>Branch</th>
                    </tr>
                </thead>
                <tbody>
                    {data1 ? (
                        <tr>
                            <td>1</td>
                            <td>{data1.name}</td>
                            <td>{data1.version}</td>
                            <td>{data1.branch}</td>
                        </tr>
                    ) :
                        <tr>
                            <td>1</td>
                            <td>???</td>
                            <td>???</td>
                            <td>???</td>
                        </tr>
                    }

                    {data2 ? (
                        <tr>
                            <td>2</td>
                            <td>{data2.name}</td>
                            <td>{data2.version}</td>
                            <td>{data2.branch}</td>
                        </tr>
                    ) :
                        <tr>
                            <td>2</td>
                            <td>???</td>
                            <td>???</td>
                            <td>???</td>
                        </tr>
                    }
                </tbody>
            </table>
            <br />
            {loading &&
                <h2>Loading...</h2>
            }
            <br /><Link to={'/download/'} style={{ color: '#05dcaa', fontSize: "20px" }}>Go Home</Link>
        </div>

    );
}