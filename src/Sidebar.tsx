import { useEffect, useState } from "react";
import { FileNode } from "./types";
import config from './config.json';
import FileTree from "./FileTree";
import './Sidebar.css';

export default function Sidebar() {
    const [data, setData] = useState<FileNode[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState<boolean>(true);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(config.asset_url + "/docs");
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const result = await response.json();
          setData(result.folder_content); 

        } catch (e) {
          setError(String(e));
        } finally {
          setLoading(false);
        }
      }

      fetchData();
    }, []);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`sidebar ${isOpen ? "open" : "closed"}`}>
            <button onClick={toggleSidebar} className="toggle-button">
                {isOpen ? "Collapse" : "Expand"}
            </button>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {isOpen && <FileTree data={data} />} 
        </div>
    )
}