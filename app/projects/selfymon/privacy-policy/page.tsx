import { promises as fs } from 'fs';
import path from 'path';
import { Card } from "@/components/Card";
import { MotionSection } from "@/components/MotionSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/header";
import { MarkdownViewer } from "@/components/MarkdownViewer";

async function getMarkdownContent() {
    const filePath = path.join(process.cwd(), 'markdown', 'selfymon', 'privacy-policy.md');
    const fileContent = await fs.readFile(filePath, 'utf8');
    return fileContent;
}

export default async function PrivacyPolicy() {
    const markdownContent = await getMarkdownContent();
    return (
        <>
            <main className="flex flex-col row-start-2 items-center font-audiowide flex-auto justify-center pt-[100px]">
                <Header />
                <MotionSection className="flex flex-col justify-center gap-[2rem] items-center font-audiowide flex-auto min-h-[calc(100vh-105px)] p-8">
                    <Card className="flex flex-col gap-[32px] max-w-[1000px] w-full">
                        <MarkdownViewer content={markdownContent} />
                    </Card>
                </MotionSection>
            </main>
            <Footer />
        </>
    );
}
