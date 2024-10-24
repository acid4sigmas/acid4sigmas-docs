export interface FileNode {
    name: string;
    path: string;
    folder: boolean;
    folder_content?: FileNode[];
    isOpen?: boolean;
}

export interface FileTreeProps {
    data: FileNode[];
}