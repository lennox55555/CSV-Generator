import { useEffect, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import './SavvyService.css'
import SavvyBot from "./components/SavvyBot";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { getAuth } from "firebase/auth";
import { auth } from "../../firebase/firebase-init";

const SavvyService: React.FC = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    }

    const [userIconUrl, setUserIconUrl] = useState<string | null>(null);
    const [username, setUsername] = useState<string | null>('');

    useEffect(() => {
        let requestCount = 0;
        const requestInterval = 1000;

        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            if (currentUser && requestCount < 1) {
                requestCount++;
                console.log(requestCount);
                setUserIconUrl(currentUser.photoURL);
                setUsername(currentUser.displayName?.replace(/\s+/g, '').toLowerCase() || '');
                setTimeout(() => {
                    requestCount = 0;
                }, requestInterval);
            } else {
                setUserIconUrl(null);
                setUsername('');
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="savvy-container">
            <header className="header">
                <div className="header-content">
                    {isSidebarOpen ? (
                        <svg onClick={toggleSidebar} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className="icon-xl-heavy" style={{ color: '#ffff', cursor: 'pointer', zIndex: '1100' }}>
                            <path fill="currentColor" fill-rule="evenodd" d="M8.857 3h6.286c1.084 0 1.958 0 2.666.058.729.06 1.369.185 1.961.487a5 5 0 0 1 2.185 2.185c.302.592.428 1.233.487 1.961.058.708.058 1.582.058 2.666v3.286c0 1.084 0 1.958-.058 2.666-.06.729-.185 1.369-.487 1.961a5 5 0 0 1-2.185 2.185c-.592.302-1.232.428-1.961.487C17.1 21 16.227 21 15.143 21H8.857c-1.084 0-1.958 0-2.666-.058-.728-.06-1.369-.185-1.96-.487a5 5 0 0 1-2.186-2.185c-.302-.592-.428-1.232-.487-1.961C1.5 15.6 1.5 14.727 1.5 13.643v-3.286c0-1.084 0-1.958.058-2.666.06-.728.185-1.369.487-1.96A5 5 0 0 1 4.23 3.544c.592-.302 1.233-.428 1.961-.487C6.9 3 7.773 3 8.857 3M6.354 5.051c-.605.05-.953.142-1.216.276a3 3 0 0 0-1.311 1.311c-.134.263-.226.611-.276 1.216-.05.617-.051 1.41-.051 2.546v3.2c0 1.137 0 1.929.051 2.546.05.605.142.953.276 1.216a3 3 0 0 0 1.311 1.311c.263.134.611.226 1.216.276.617.05 1.41.051 2.546.051h.6V5h-.6c-1.137 0-1.929 0-2.546.051M11.5 5v14h3.6c1.137 0 1.929 0 2.546-.051.605-.05.953-.142 1.216-.276a3 3 0 0 0 1.311-1.311c.134-.263.226-.611.276-1.216.05-.617.051-1.41.051-2.546v-3.2c0-1.137 0-1.929-.051-2.546-.05-.605-.142-.953-.276-1.216a3 3 0 0 0-1.311-1.311c-.263-.134-.611-.226-1.216-.276C17.029 5.001 16.236 5 15.1 5zM5 8.5a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1M5 12a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1" clip-rule="evenodd">
                            </path>
                        </svg>
                    ) : (
                        <svg onClick={toggleSidebar} xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className="icon-xl-heavy" style={{ color: '#1D6F42', cursor: 'pointer' }}>
                            <path fill="currentColor" fill-rule="evenodd" d="M8.857 3h6.286c1.084 0 1.958 0 2.666.058.729.06 1.369.185 1.961.487a5 5 0 0 1 2.185 2.185c.302.592.428 1.233.487 1.961.058.708.058 1.582.058 2.666v3.286c0 1.084 0 1.958-.058 2.666-.06.729-.185 1.369-.487 1.961a5 5 0 0 1-2.185 2.185c-.592.302-1.232.428-1.961.487C17.1 21 16.227 21 15.143 21H8.857c-1.084 0-1.958 0-2.666-.058-.728-.06-1.369-.185-1.96-.487a5 5 0 0 1-2.186-2.185c-.302-.592-.428-1.232-.487-1.961C1.5 15.6 1.5 14.727 1.5 13.643v-3.286c0-1.084 0-1.958.058-2.666.06-.728.185-1.369.487-1.96A5 5 0 0 1 4.23 3.544c.592-.302 1.233-.428 1.961-.487C6.9 3 7.773 3 8.857 3M6.354 5.051c-.605.05-.953.142-1.216.276a3 3 0 0 0-1.311 1.311c-.134.263-.226.611-.276 1.216-.05.617-.051 1.41-.051 2.546v3.2c0 1.137 0 1.929.051 2.546.05.605.142.953.276 1.216a3 3 0 0 0 1.311 1.311c.263.134.611.226 1.216.276.617.05 1.41.051 2.546.051h.6V5h-.6c-1.137 0-1.929 0-2.546.051M11.5 5v14h3.6c1.137 0 1.929 0 2.546-.051.605-.05.953-.142 1.216-.276a3 3 0 0 0 1.311-1.311c.134-.263.226-.611.276-1.216.05-.617.051-1.41.051-2.546v-3.2c0-1.137 0-1.929-.051-2.546-.05-.605-.142-.953-.276-1.216a3 3 0 0 0-1.311-1.311c-.263-.134-.611-.226-1.216-.276C17.029 5.001 16.236 5 15.1 5zM5 8.5a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1M5 12a1 1 0 0 1 1-1h1a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1" clip-rule="evenodd">
                            </path>
                        </svg>
                    )}

                    <Link to='/' style={{ textDecoration: 'none' }}><h1 className={`savvy-title ${isSidebarOpen ? 'with-sidebar-open' : 'with-sidebar-closed'}`}>SavvyCSV</h1></Link>
                    <div className="spacer"></div>
                    {userIconUrl ? (
                        <div className="profile-content">
                            <img className="profile-image"
                                src={userIconUrl}
                                alt='User Icon'
                                onClick={toggleDropdown} />
                            {dropdownOpen && (
                                <div className="dropdown-wrapper">
                                    <div className="sub-dropdown">
                                        <div className="user-info">
                                            <img
                                                src={userIconUrl}
                                                alt='User Icon' />
                                            <div style={{ color: 'darkgray', fontSize: '14px' }}>{username}</div>
                                        </div>
                                        <hr></hr>
                                        <div className='dropdown-item-wrapper'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" className="h-5 w-5 shrink-0"><path fill="currentColor" fill-rule="evenodd" d="M6 4a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h4a1 1 0 1 1 0 2H6a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h4a1 1 0 1 1 0 2zm9.293 3.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414-1.414L17.586 13H11a1 1 0 1 1 0-2h6.586l-2.293-2.293a1 1 0 0 1 0-1.414" clip-rule="evenodd"></path>
                                            </svg>
                                            <p>Sign out</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <p></p>
                    )}
                </div>
            </header>
            <div className="main-container">
                <aside className={`sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
                    <div className="sidebar-content">
                        <p style={{ color: 'white', fontWeight: 'bold', fontSize: '20px', fontFamily: 'Roboto' }}>Recent Searches</p>
                    </div>
                </aside>
                <main className="content">
                    <SavvyBot></SavvyBot>
                </main>
            </div>
        </div>
    )
}

export default SavvyService