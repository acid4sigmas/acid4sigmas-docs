import React, { useEffect, useState } from 'react';
import FileTree from './FileTree';
import { FileNode } from './types';
import config from './config.json';
import './App.css';
import Sidebar from './Sidebar';

const data = [
    {
        name: "acid4sigmas-db-api",
        path: "docs/acid4sigmas-db-api",
        folder: true,
        folder_content: [
            { name: "retrieve.md", path: "docs/acid4sigmas-db-api/retrieve.md", folder: false },
            { name: "insert.md", path: "docs/acid4sigmas-db-api/insert.md", folder: false },
            { name: "update.md", path: "docs/acid4sigmas-db-api/update.md", folder: false },
        ],
    },
];

const App: React.FC = () => {

    return (
        <div>
          <Sidebar />
        </div>
    );
};

export default App;