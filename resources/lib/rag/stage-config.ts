import type { StageConfig } from '@/lib/rag/types';
import { Brain, Database, Layers, Scissors, Sparkles } from 'lucide-react';

export const STAGE_CONFIG: StageConfig[] = [
    { key: 'chunk', label: 'CHUNK', icon: Scissors },
    { key: 'embed', label: 'EMBED', icon: Brain },
    { key: 'retrieve', label: 'RETRIEVE', icon: Database },
    { key: 'augment', label: 'AUGMENT', icon: Layers },
    { key: 'generate', label: 'GENERATE', icon: Sparkles },
];
