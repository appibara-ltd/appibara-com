import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { cn } from "@/lib/utils";

interface MarkdownViewerProps {
    content: string;
    className?: string;
}

export const MarkdownViewer = ({ content, className }: MarkdownViewerProps) => {
    return (
        <div className={cn("prose prose-slate max-w-none dark:prose-invert font-nunito w-full overflow-hidden", className)}>
            <ReactMarkdown
                rehypePlugins={[rehypeRaw]}
                components={{
                    h1: ({ node, ...props }) => (
                        <h1 className="text-2xl md:text-3xl font-audiowide font-bold mt-10 mb-4 text-gray-900 border-b border-gray-100 pb-3 leading-snug" {...props} />
                    ),
                    h2: ({ node, ...props }) => (
                        <h2 className="text-xl md:text-2xl font-audiowide font-bold mt-8 mb-4 text-gray-900 leading-snug" {...props} />
                    ),
                    h3: ({ node, ...props }) => (
                        <h3 className="text-lg md:text-xl font-audiowide font-bold mt-6 mb-3 text-[var(--brand-orange-dark)] leading-snug" {...props} />
                    ),
                    h4: ({ node, ...props }) => (
                        <h4 className="text-base md:text-lg font-audiowide font-bold mt-5 mb-2 text-gray-900 leading-snug" {...props} />
                    ),
                    h5: ({ node, ...props }) => (
                        <h5 className="text-base font-audiowide font-bold mt-4 mb-2 text-gray-800" {...props} />
                    ),
                    h6: ({ node, ...props }) => (
                        <h6 className="text-sm font-audiowide font-bold mt-3 mb-1 text-gray-700" {...props} />
                    ),
                    p: ({ node, ...props }) => (
                        <p className="mb-5 text-gray-700 leading-relaxed text-base md:text-[17px]" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                        <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700 text-base md:text-[17px]" {...props} />
                    ),
                    ol: ({ node, ...props }) => (
                        <ol className="list-decimal pl-6 mb-6 space-y-2 text-gray-700 text-base md:text-[17px]" {...props} />
                    ),
                    li: ({ node, ...props }) => (
                        <li className="leading-relaxed" {...props} />
                    ),
                    a: ({ node, ...props }) => (
                        <a className="text-[#bb4d00] font-medium underline underline-offset-4 hover:text-[var(--brand-orange)] transition-colors" target="_blank" rel="noopener noreferrer" {...props} />
                    ),
                    hr: ({ node, ...props }) => (
                        <hr className="my-10 border-gray-200" {...props} />
                    ),
                    strong: ({ node, ...props }) => (
                        <strong className="font-bold text-gray-900" {...props} />
                    ),
                    blockquote: ({ node, ...props }) => (
                        <blockquote className="border-l-4 border-[var(--brand-orange-dark)] bg-amber-50/50 italic px-5 py-4 my-6 rounded-r-xl text-gray-800 font-nunito" {...props} />
                    ),
                    pre: ({ node, children, ...props }) => (
                        <div className="relative my-6 max-w-full rounded-xl bg-[#1e1e1e] border border-slate-800/80 shadow-lg overflow-hidden">
                            <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-slate-700/50 text-xs text-slate-400 font-mono select-none">
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block"></span>
                                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block"></span>
                                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block"></span>
                                </div>
                                <span>Code Snippet</span>
                            </div>
                            <pre className="p-4 md:p-5 overflow-x-auto max-w-full text-slate-100 font-mono text-sm leading-relaxed whitespace-pre" {...props}>
                                {children}
                            </pre>
                        </div>
                    ),
                    code: ({ node, inline, className, children, ...props }: any) => {
                        if (inline) {
                            return (
                                <code
                                    className="px-1.5 py-0.5 mx-0.5 rounded bg-amber-50 text-[#bb4d00] border border-amber-200/60 font-mono text-[13px] font-medium break-words inline-block"
                                    {...props}
                                >
                                    {children}
                                </code>
                            );
                        }
                        return (
                            <code className="font-mono text-sm text-slate-100 whitespace-pre" {...props}>
                                {children}
                            </code>
                        );
                    },
                    table: ({ node, ...props }) => (
                        <div className="my-6 w-full max-w-full overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
                            <table className="w-full text-left border-collapse font-nunito text-sm" {...props} />
                        </div>
                    ),
                    th: ({ node, ...props }) => (
                        <th className="bg-gray-100 px-4 py-3 font-audiowide text-gray-900 font-semibold border-b border-gray-200" {...props} />
                    ),
                    td: ({ node, ...props }) => (
                        <td className="px-4 py-3 border-b border-gray-100 text-gray-700" {...props} />
                    ),
                    img: ({ node, ...props }) => (
                        <img className="max-w-full h-auto rounded-xl my-6 mx-auto shadow-sm border border-gray-100" {...props} />
                    )
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};
