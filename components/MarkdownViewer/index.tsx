import ReactMarkdown from 'react-markdown';
import { cn } from "@/lib/utils";

interface MarkdownViewerProps {
    content: string;
    className?: string;
}

export const MarkdownViewer = ({ content, className }: MarkdownViewerProps) => {
    return (
        <div className={cn("prose prose-slate max-w-none dark:prose-invert font-nunito", className)}>
            <ReactMarkdown
                components={{
                    h1: ({ node, ...props }) => <h1 className="text-3xl font-audiowide font-bold mt-8 mb-4 border-b pb-2" {...props} />,
                    h2: ({ node, ...props }) => <h2 className="text-2xl font-audiowide font-bold mt-6 mb-3" {...props} />,
                    h3: ({ node, ...props }) => <h3 className="text-xl font-audiowide font-bold mt-4 mb-2" {...props} />,
                    p: ({ node, ...props }) => <p className="mb-4 text-gray-700 leading-relaxed" {...props} />,
                    ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-4 space-y-2 text-gray-700" {...props} />,
                    li: ({ node, ...props }) => <li className="" {...props} />,
                    a: ({ node, ...props }) => <a className="text-[#e17100] hover:underline" {...props} />,
                    hr: ({ node, ...props }) => <hr className="my-8 border-gray-200" {...props} />,
                    strong: ({ node, ...props }) => <strong className="font-bold text-gray-900" {...props} />,
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};
