import type { Chunk } from '@/lib/rag/utils';
import { Atom, CheckCircle2, FileText, Zap } from 'lucide-react';

const SAMPLE_DOC = `
Neural Radiance Fields (NeRF) represent a cutting-edge technique in 3D computer graphics that uses neural networks to generate novel views of complex 3D scenes. Unlike traditional graphics pipelines that rely on explicit geometry and texture maps, NeRF models learn an implicit volumetric representation of a scene by optimizing a continuous function that maps spatial coordinates and viewing directions to color and volume density. This function is parameterized by a multilayer perceptron (MLP), allowing the scene to be rendered with photorealistic detail and consistent lighting effects.

One of the core innovations in NeRF is the use of volumetric rendering, where a ray is cast from the camera into the scene and sampled at multiple depths. At each sample point, the network predicts both the color and the density, and the final pixel color is computed as a weighted integration along the ray. This rendering technique enables the capture of complex visual phenomena like soft shadows, semi-transparency, and view-dependent reflections, which are difficult to model with traditional rasterization approaches.

The training of NeRF involves optimizing the MLP to minimize the difference between rendered views and a set of input images taken from known camera poses. This makes NeRF a data-driven method reliant on multi-view consistency. However, this also introduces a computational bottleneck: training can take hours and rendering each frame requires hundreds of MLP evaluations. To address this, subsequent research has focused on accelerating both training and inference using hierarchical sampling, voxel grids, hash encoding, and GPU parallelism.

A particularly interesting crossover with machine learning comes from the application of positional encoding to enable MLPs to better represent high-frequency details. Positional encoding injects high-frequency functions of the input coordinates into the network, allowing it to overcome the spectral bias of standard MLPs that favor low-frequency outputs. This concept has strong ties to similar strategies used in transformer architectures for natural language processing, showcasing an elegant convergence of ideas across domains.

Another significant evolution has been the adaptation of NeRF-like models for dynamic scenes, where the geometry and appearance change over time. Techniques such as D-NeRF or Neural Scene Flow Fields extend the static NeRF framework to learn temporally coherent representations, capturing motion and deformation in the scene. These advances are crucial for applications like 4D reconstruction, virtual avatars, and telepresence, where both spatial and temporal fidelity are necessary.

In the context of 3D graphics pipelines, integrating NeRF with traditional graphics tools poses challenges, such as converting neural representations into mesh-based formats usable in real-time engines. Hybrid approaches attempt to bridge this by distilling neural fields into polygonal meshes or texture maps using differentiable surface extraction techniques. These methods allow neural representations to benefit from hardware-accelerated rasterization, pushing toward real-time performance.

Lastly, the interplay between inverse rendering and generative models has opened up new frontiers in content creation. By coupling NeRFs with generative adversarial networks (GANs) or diffusion models, researchers can synthesize plausible 3D content from minimal inputs like single images or text prompts. This fusion leverages the realism of learned priors and the physical consistency of volumetric rendering, paving the way for highly expressive and data-efficient tools in animation, gaming, and virtual reality.
`;

interface DocumentPanelProps {
    docText: string;
    chunks: Chunk[];
    isIndexed: boolean;
    onDocTextChange: (value: string) => void;
    onIndex: () => void;
}

export function DocumentPanel({ docText, chunks, isIndexed, onDocTextChange, onIndex }: DocumentPanelProps): React.ReactNode {
    const hasDocText = docText.trim() !== '';

    return (
        <div className="bg-background flex h-full flex-col overflow-hidden">
            <div className="border-border flex shrink-0 items-center gap-2 border-b-2 px-4 py-3 md:gap-2.5 md:px-6 md:py-4">
                <FileText size={12} strokeWidth={2.5} className="text-muted-foreground md:hidden" />
                <FileText size={14} strokeWidth={2.5} className="text-muted-foreground hidden md:block" />
                <span className="text-muted-foreground font-mono text-xs font-bold tracking-wider md:text-sm">DOCUMENT</span>
                <div className="ml-auto border-border bg-border grid shrink-0 grid-cols-[auto_1fr] gap-px border-l-2">
                    <button
                        onClick={() => onDocTextChange(SAMPLE_DOC.trim())}
                        disabled={hasDocText}
                        className={`flex items-center gap-2 px-4 py-3 font-mono text-xs font-bold tracking-wider transition-all md:gap-2.5 md:px-6 md:py-4 md:text-sm -mx-4 -my-3 md:-mx-6 md:-my-4 ${
                            !hasDocText
                                ? 'bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer'
                                : 'bg-background text-muted-foreground/30 cursor-not-allowed'
                        }`}
                    >
                        <Atom size={14} strokeWidth={2.5} className="md:hidden" />
                        <Atom size={16} strokeWidth={2.5} className="hidden md:block" /> LOAD SAMPLE
                    </button>
                </div>
            </div>

            <textarea
                value={docText}
                onChange={(e) => onDocTextChange(e.target.value)}
                placeholder="Paste your document text here..."
                className="bg-background text-foreground/80 placeholder:text-muted-foreground/30 focus:border-muted-foreground focus:ring-0 flex-1 resize-none border-2 border-transparent p-4 font-mono text-xs leading-relaxed outline-none transition-colors md:p-6 md:text-sm"
            />

            <div className="border-border bg-background shrink-0 gap-2 border-t-2 flex justify-between items-center">
                <div className="bg-background flex items-center px-4 py-3 md:px-6 md:py-4">
                    {isIndexed && (
                        <span className="fadein text-muted-foreground flex items-center gap-1.5 font-mono text-xs font-semibold tracking-wider md:gap-2 md:text-sm">
                            <CheckCircle2 size={12} strokeWidth={2.5} className="md:hidden" />
                            <CheckCircle2 size={14} strokeWidth={2.5} className="hidden md:block" />
                            {chunks.length} CHUNKS INDEXED
                        </span>
                    )}
                </div>
                <button
                    onClick={onIndex}
                    disabled={!hasDocText}
                    className={`flex items-center gap-2 px-4 py-3 font-mono text-xs font-bold tracking-wider transition-all md:gap-2.5 md:px-6 md:py-4 md:text-sm ${
                        hasDocText
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer'
                            : 'bg-background text-muted-foreground/30 cursor-not-allowed'
                    }`}
                >
                    <Zap size={14} strokeWidth={2.5} className="md:hidden" />
                    <Zap size={16} strokeWidth={2.5} className="hidden md:block" /> INDEX
                </button>
            </div>

            {isIndexed && <ChunkList chunks={chunks} />}
        </div>
    );
}

interface ChunkListProps {
    chunks: Chunk[];
}

function ChunkList({ chunks }: ChunkListProps): React.ReactNode {
    return (
        <div className="fadein border-border flex min-h-0 flex-1 flex-col overflow-hidden border-t-2">
            <div className="flex-1 overflow-y-auto">
                {chunks.map((chunk) => (
                    <div key={chunk.id} className="border-border hover:bg-muted border-b px-4 py-2.5 transition-colors md:px-6 md:py-3">
                        <div className="mb-1 flex justify-between md:mb-1.5">
                            <span className="text-foreground font-mono text-xs font-bold md:text-sm">#{String(chunk.id + 1).padStart(2, '0')}</span>
                            <span className="text-muted-foreground font-mono text-xs md:text-xs">{chunk.text.length} chars</span>
                        </div>
                        <p className="text-muted-foreground line-clamp-2 font-mono text-xs leading-relaxed md:text-sm">{chunk.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
