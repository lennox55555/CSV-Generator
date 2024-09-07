import React, { useState, useEffect } from 'react';
import styles from './SavvyBot.module.css';
import AutosizeTextArea from '../../../utils/useAutosizeTextArea';
import { getAuth } from 'firebase/auth';
import SavvyServiceAPI from '../../../services/savvyServiceAPI';
import { Link } from 'react-router-dom';
import { UserMessage } from '../../../utils/types';

// Define the type for NestedObject
type NestedObject = {
    [key: string]: {
        rankOfTable: number;
        SampleTableData: string;
        website: string;
    };
};

const SavvyBot: React.FC = () => {
    const [textAreaValue, setTextAreaValue] = useState('');
    const [messages, setMessages] = useState<UserMessage[]>([]);
    const [tableData, setTableData] = useState<NestedObject | null>(null);
    const [currentTableRank, setCurrentTableRank] = useState<number>(1); // State to track the current table rank

    const fetchMessages = async () => {
        const currentUser = getAuth().currentUser;

        if (currentUser) {
            try {
                const fetchedMessages = await SavvyServiceAPI.getInstance().getMessages(currentUser.uid);
                setMessages(fetchedMessages);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    console.log(err.message);
                } else {
                    console.log('An error has occurred!');
                }
            }
        }
    };

    const handleSubmit = async () => {
        if (textAreaValue.trim() !== '') {
            const currentUser = getAuth().currentUser;

            if (currentUser) {
                try {
                    // User message
                    await SavvyServiceAPI.getInstance().saveMessage(currentUser.uid, textAreaValue, true);

                    // Add user message to the message list
                    setMessages([...messages, { id: '', text: textAreaValue, user: true }]);

                    // Initialize WebSocket and listen for bot response
                    SavvyServiceAPI.getInstance().initializeWebSocket(handleWebSocketMessage, textAreaValue);

                    setTextAreaValue('');

                } catch (error) {
                    console.error("Failed to save message:", error);
                }
            }
        }
    };

    const handleWebSocketMessage = (data: NestedObject) => {
        console.log('Received data:', data);  // Log the data to ensure it's received correctly
        setTableData(data);

        setMessages(prevMessages => [
            ...prevMessages,
            { id: '', text: 'SavvyCSV generated a table:', user: false },
            { id: '', text: '', user: false }, // Placeholder for text
        ]);
    };

    const displayTableByRank = (rank: number, data: NestedObject): JSX.Element | null => {
        switch (rank) {
            case 1:
                return displayTableForRank1(data);
            case 2:
                return displayTableForRank2(data);
            case 3:
                return displayTableForRank3(data);
            default:
                return displayTableForRank1(data);
        }
    };

    const displayTableForRank1 = (data: NestedObject): JSX.Element | null => {
        console.log('Table data for rank 1:', data);  // Log data to see what is passed
        for (const key in data) {
            if (data[key].rankOfTable === 1) {
                return (
                    <div>
                        <h3>Website: <a href={data[key].website} target="_blank" rel="noopener noreferrer">{data[key].website}</a></h3>
                        <table style={{ border: '1px solid black', width: '100%' }}>
                            <tbody>
                            {data[key].SampleTableData.split('\n').map((row: string, index: React.Key | null | undefined) => (
                                <tr key={index}>
                                    {row.split(',').map((cell: string, cellIndex: React.Key | null | undefined) => (
                                        <td key={cellIndex} style={{ border: '1px solid black', padding: '5px' }}>{cell.trim()}</td>
                                    ))}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                );
            }
        }
        return null;
    };

    const displayTableForRank2 = (data: NestedObject): JSX.Element | null => {
        console.log('Table data for rank 2:', data);  // Log data to see what is passed
        for (const key in data) {
            if (data[key].rankOfTable === 2) {
                return (
                    <div>
                        <h3>Website: <a href={data[key].website} target="_blank" rel="noopener noreferrer">{data[key].website}</a></h3>
                        <table style={{ border: '1px solid black', width: '100%' }}>
                            <tbody>
                            {data[key].SampleTableData.split('\n').map((row: string, index: React.Key | null | undefined) => (
                                <tr key={index}>
                                    {row.split(',').map((cell: string, cellIndex: React.Key | null | undefined) => (
                                        <td key={cellIndex} style={{ border: '1px solid black', padding: '5px' }}>{cell.trim()}</td>
                                    ))}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                );
            }
        }
        return null;
    };

    const displayTableForRank3 = (data: NestedObject): JSX.Element | null => {
        console.log('Table data for rank 3:', data);  // Log data to see what is passed
        for (const key in data) {
            if (data[key].rankOfTable === 3) {
                return (
                    <div>
                        <h3>Website: <a href={data[key].website} target="_blank" rel="noopener noreferrer">{data[key].website}</a></h3>
                        <table style={{ border: '1px solid black', width: '100%' }}>
                            <tbody>
                            {data[key].SampleTableData.split('\n').map((row: string, index: React.Key | null | undefined) => (
                                <tr key={index}>
                                    {row.split(',').map((cell: string, cellIndex: React.Key | null | undefined) => (
                                        <td key={cellIndex} style={{ border: '1px solid black', padding: '5px' }}>{cell.trim()}</td>
                                    ))}
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                );
            }
        }
        return null;
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSubmit();
        }
    };

    const handleRefresh = () => {
        if (tableData) {
            // Update table rank in a cycle: 1 -> 2 -> 3 -> 1
            const nextRank = currentTableRank === 3 ? 1 : currentTableRank + 1;
            setCurrentTableRank(nextRank); // Update the current table rank state
            displayTableByRank(nextRank, tableData); // Display the table for the next rank
        }
    };

    const downloadCSV = () => {
        if (!tableData) return;

        const currentData = Object.values(tableData).find(item => item.rankOfTable === currentTableRank);

        if (!currentData) return;

        // Convert the table data to CSV format
        const csvContent = `data:text/csv;charset=utf-8,${currentData.SampleTableData.replace(/\n/g, '\r\n')}`;

        // Create a download link
        const link = document.createElement('a');
        link.setAttribute('href', encodeURI(csvContent));
        link.setAttribute('download', `table_rank_${currentTableRank}.csv`);

        // Append to the DOM, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    useEffect(() => {
        if (tableData) {
            displayTableByRank(currentTableRank, tableData); // Re-render table on rank change
        }
    }, [currentTableRank, tableData]);

    return (
        <>
            <div className={styles.savvybotContainer}>
                <div className={styles.messageBox}>
                    {messages.map((msg, index) => (
                        <div key={index} className={msg.user ? styles.userMessage : styles.savvyResponse}>
                            <div className={msg.user ? styles.messageBubble : ''}>
                                {typeof msg.text === 'string' ? msg.text : msg.text}
                            </div>
                        </div>
                    ))}
                    <div>
                        {tableData && displayTableByRank(currentTableRank, tableData)}
                    </div>
                </div>
                <div className={styles.messageBar}>
                    <div className={styles.messageBarWrapper}>
                        <AutosizeTextArea
                            value={textAreaValue}
                            onChange={setTextAreaValue}
                            onKeyDown={handleKeyDown}
                            maxHeight={150}
                            placeholder="Message SavvyCSV"
                        />
                        <button className={styles.messageButton} onClick={handleSubmit}>
                            <i className="bi bi-arrow-return-left" style={{ color: '#1D6F42', textShadow: '0 0 1px #1D6F42' }}></i>
                        </button>
                    </div>
                    <div className={styles.userFeedback}>
                        Feedback? Contact us<Link to='/feedback' style={{ textDecorationLine: 'blink' }}> here.</Link>
                    </div>
                    {tableData && (
                        <>
                            <button className={styles.refreshButton} onClick={handleRefresh}>
                                Refresh Table
                            </button>
                            <button className={styles.downloadButton} onClick={downloadCSV}>
                                Download Table
                            </button>
                        </>
                    )}
                </div>

            </div>
        </>
    );
};

export default SavvyBot;
