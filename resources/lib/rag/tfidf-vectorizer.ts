const STOP_WORDS = new Set([
    'the',
    'and',
    'for',
    'are',
    'but',
    'not',
    'you',
    'all',
    'can',
    'had',
    'her',
    'was',
    'one',
    'our',
    'out',
    'has',
    'its',
    'let',
    'may',
    'who',
    'did',
    'get',
    'how',
    'him',
    'his',
    'she',
    'too',
    'use',
    'way',
    'each',
    'make',
    'like',
    'long',
    'look',
    'many',
    'some',
    'than',
    'them',
    'then',
    'what',
    'when',
    'with',
    'been',
    'have',
    'from',
    'more',
    'that',
    'this',
    'will',
    'your',
    'about',
    'could',
    'into',
    'just',
    'most',
    'only',
    'over',
    'such',
    'take',
    'their',
    'very',
    'after',
    'also',
    'back',
    'come',
    'does',
    'down',
    'even',
    'find',
    'first',
    'give',
    'good',
    'here',
    'high',
    'know',
    'last',
    'made',
    'much',
    'must',
    'name',
    'need',
    'next',
    'once',
    'part',
    'show',
    'side',
    'tell',
    'went',
    'were',
    'which',
    'work',
    'would',
    'being',
    'every',
    'great',
    'never',
    'other',
    'still',
    'these',
    'think',
    'those',
    'three',
    'under',
    'want',
    'where',
    'while',
    'world',
    'years',
]);

export class TFIDFVectorizer {
    vocabulary: Record<string, number> = {};
    idf: Record<string, number> = {};
    vocabSize = 0;

    tokenize(text: string): string[] {
        return text
            .toLowerCase()
            .replace(/[^\w\s]/g, ' ')
            .split(/\s+/)
            .filter((word) => word.length > 2 && !STOP_WORDS.has(word));
    }

    fit(documents: string[]): void {
        const documentFrequency: Record<string, number> = {};
        const documentCount = documents.length;

        for (const document of documents) {
            const tokens = new Set(this.tokenize(document));
            for (const token of tokens) {
                if (!Object.prototype.hasOwnProperty.call(this.vocabulary, token)) {
                    this.vocabulary[token] = this.vocabSize++;
                }
                documentFrequency[token] = (documentFrequency[token] || 0) + 1;
            }
        }

        for (const token of Object.keys(this.vocabulary)) {
            this.idf[token] = Math.log((documentCount + 1) / ((documentFrequency[token] || 0) + 1)) + 1;
        }
    }

    transform(text: string): Float32Array {
        const tokens = this.tokenize(text);
        const termFrequency: Record<string, number> = {};

        for (const token of tokens) {
            termFrequency[token] = (termFrequency[token] || 0) + 1;
        }

        const vector = new Float32Array(this.vocabSize);
        for (const [token, count] of Object.entries(termFrequency)) {
            if (Object.prototype.hasOwnProperty.call(this.vocabulary, token)) {
                vector[this.vocabulary[token]] = (count / tokens.length) * (this.idf[token] || 0);
            }
        }

        return vector;
    }
}
