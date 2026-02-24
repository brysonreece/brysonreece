export interface Chunk {
    id: number;
    text: string;
    start: number;
    end: number;
}

export interface ChunkOptions {
    chunkSize?: number;
    overlap?: number;
    strategy?: 'fixed' | 'sentence';
}

export function chunkText(text: string, { chunkSize = 500, overlap = 50, strategy = 'fixed' }: ChunkOptions = {}): Chunk[] {
    if (strategy === 'sentence') {
        return chunkBySentence(text, chunkSize, overlap);
    }
    return chunkByFixedSize(text, chunkSize, overlap);
}

function chunkBySentence(text: string, chunkSize: number, overlap: number): Chunk[] {
    const sentences = text.match(/[^.!?\n]+[.!?\n]+|[^.!?\n]+$/g) || [text];
    const chunks: Chunk[] = [];
    let buffer = '';
    let startIdx = 0;

    for (const sentence of sentences) {
        if (buffer.length + sentence.length > chunkSize && buffer.length > 0) {
            chunks.push({
                id: chunks.length,
                text: buffer.trim(),
                start: startIdx,
                end: startIdx + buffer.trim().length,
            });

            const overlapSentences = buffer
                .split(/(?<=[.!?\n])\s+/)
                .slice(0 - overlap)
                .join(' ');

            startIdx += buffer.length - overlapSentences.length;
            buffer = overlapSentences + sentence;
        } else {
            buffer += sentence;
        }
    }

    if (buffer.trim()) {
        chunks.push({
            id: chunks.length,
            text: buffer.trim(),
            start: startIdx,
            end: startIdx + buffer.trim().length,
        });
    }

    return chunks;
}

function chunkByFixedSize(text: string, chunkSize: number, overlap: number): Chunk[] {
    const chunks: Chunk[] = [];
    const step = chunkSize - overlap;

    if (step <= 0) return chunks;

    for (let start = 0; start < text.length; start += step) {
        const end = Math.min(start + chunkSize, text.length);
        const chunk = text.slice(start, end).trim();

        if (chunk.length > 0) {
            chunks.push({
                id: chunks.length,
                text: chunk,
                start,
                end: start + chunk.length
            });
        }
    }

    return chunks;
}
