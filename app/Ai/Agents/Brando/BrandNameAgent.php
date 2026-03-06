<?php

namespace App\Ai\Agents\Brando;

use Illuminate\Contracts\JsonSchema\JsonSchema;
use Laravel\Ai\Attributes\Model;
use Laravel\Ai\Attributes\Provider;
use Laravel\Ai\Attributes\Timeout;
use Laravel\Ai\Contracts\Agent;
use Laravel\Ai\Contracts\HasStructuredOutput;
use Laravel\Ai\Enums\Lab;
use Laravel\Ai\Promptable;
use Stringable;

#[Provider(Lab::Gemini)]
#[Model('gemini-3.1-flash-lite-preview')]
#[Timeout(90)]
class BrandNameAgent implements Agent, HasStructuredOutput
{
    use Promptable;

    /**
     * Get the instructions the agent should follow.
     */
    public function instructions(): Stringable|string
    {
        return <<<'PROMPT'
        You are a brand naming expert for early-stage startups and solo founders.

        When given a brand description, generate exactly 10 creative, memorable brand name suggestions.
        Each name should:
        - Be short (1–2 words, ideally a single coined or evocative word)
        - Be brandable and domain-friendly (avoid generic dictionary words)
        - Feel distinct from each other in tone and style
        - Include a punchy one-sentence tagline that captures the brand's essence

        Return only the JSON array — no explanations, no preamble.
        PROMPT;
    }

    /**
     * Get the agent's structured output schema definition.
     *
     * @return array<string, mixed>
     */
    public function schema(JsonSchema $schema): array
    {
        return [
            'names' => $schema->array()->items(
                $schema->object([
                    'name' => $schema->string()->required(),
                    'tagline' => $schema->string()->required(),
                ])
            )->required(),
        ];
    }
}
