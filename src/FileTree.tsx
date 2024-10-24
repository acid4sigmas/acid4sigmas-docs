import React, { useState } from 'react';
import { FileNode, FileTreeProps } from './types';
import DocViewer from './DocViewer'; // Import the DocViewer component
import { useNavigate } from 'react-router-dom';
import config from "./config.json";
import "./FileTree.css";

const FileTree: React.FC<FileTreeProps> = ({ data }) => {
    const [openFolders, setOpenFolders] = useState<Set<string>>(new Set());
    const [error, setError] = useState<string | null>(null); 
    const navigate = useNavigate();

    const toggleFolder = (path: string) => {
        const updatedOpenFolders = new Set(openFolders);
        if (updatedOpenFolders.has(path)) {
            updatedOpenFolders.delete(path);
        } else {
            updatedOpenFolders.add(path);
        }
        setOpenFolders(updatedOpenFolders);
    };

    const handleFileClick = (path: string) => {
        if (!isMarkdownFile(path)) {
            setError('Error: This file is not a Markdown (.md) file.\nAttempting to bypass this will result in undefined behavior (wrongly decoded text)');
        } else {
            setError(null); 
    
            navigate(`/file/${encodeURIComponent(path)}`);
            // reload to avoid being stuck in the same document
            window.location.reload();
            
        }
    };

    const isMarkdownFile = (filePath: string): boolean => {
        return filePath.endsWith('.md');
    };


    const renderTree = (nodes: FileNode[]) => {
        return (
            <ul>
                {nodes.map((node) => (
                    <li className="li-tree-item" key={node.path}>
                        {node.folder ? (
                            <>
                                <div className='folder-div'>
                                    <span onClick={() => toggleFolder(node.path)} style={{ cursor: 'pointer' }}>
                                        {openFolders.has(node.path) ? '-' : '+'} {node.name}
                                    </span>
                                    <span className='spacer'/>
                                    <img 
                                        src={`${config.asset_url}/files/icons/folder_blue_icon.png`}
                                        alt='folder icon'
                                        style={{ width: '28px'}}
                                    />
                                </div>
                                {openFolders.has(node.path) && node.folder_content && renderTree(node.folder_content)}
                                <br />
                            </>
                        ) : (
                            <>
                                <br />
                                <span className='file-span' onClick={() => handleFileClick(node.path)} >
                                    {node.name}
                                </span>
                                <br />
                                
                            </>
                        )}
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div>
            {renderTree(data)}
            {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>} 
        </div>
    );
};

export default FileTree;