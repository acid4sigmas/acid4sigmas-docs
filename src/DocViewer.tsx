import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';  // Plugin for GitHub Flavored Markdown (tables, etc.)
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';  // Syntax highlighting
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';  // Syntax highlighter theme

import config from './config.json';
import "./DocViewer.css";
import { useParams } from 'react-router-dom';
import Sidebar from './Sidebar';

interface CodeComponentProps {
    inline?: boolean;
    className?: string;
    children: React.ReactNode;
  }
  

const DocViewer: React.FC = () => {
    const { filePath } = useParams<{ filePath: string }>();
    const [error, setError] = useState<string | null>(null);
    const [markdown, setMarkdown] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await fetch(config.asset_url + "/files/" + filePath);
                if (!response.ok) {
                    throw new Error("failed to fetch");
                }
                const result = await response.text();
                setMarkdown(result);

            } catch (e) {
                setError(String(e));
            } finally {
                setLoading(false);
            }
        }

        fetchContent();
    }, []);

    if (loading) {
        return <div>loading..</div>
    }

    if (error) {
        return <div>{error}</div>;
    }


    return (
    <div>
    <Sidebar />
    <div className='docviewer'>
        <div className='docviewer-flex'>
          <ReactMarkdown
            children={markdown}
            remarkPlugins={[remarkGfm]}
            components={{
                code(props) {
                    const {children, className, node, ...rest} = props;
                    const match = /language-(\w+)/.exec(className || '');
                    return match ? (
                        <SyntaxHighlighter
                            PreTag="div"
                            children={String(children).replace(/\n$/, '')}
                            language={match[1]}
                            className="custom-syntax-highlighter" 
                            style={dracula}
                        />
                    ) : (
                        <code {...rest} className={className}>
                            {children}
                        </code>
                    )
                }
            }}
          
          />
        </div>
    </div>
    </div>
    );
}

export default DocViewer;