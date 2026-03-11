<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    {{-- Inline script to detect system dark mode preference and apply it immediately --}}
    <script>
        (function() {
            const appearance = '{{ $appearance }}' || 'system';

            if (appearance === 'system') {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                if (prefersDark) {
                    document.documentElement.classList.add('dark');
                }
            }
        })();
    </script>

    <title inertia>// {{ config('app.name', 'Laravel') }}</title>
    <meta name="description" content="Hey there! I'm Bryson Reece ⸺ a dad, software engineer, and avid DIYer that's constantly learning new things." />
    <meta name="author" content="Bryson Reece" />

    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>👋</text></svg>" />

    <!-- Font preconnects -->
    <link rel="preconnect" href="https://fonts.bunny.net" crossorigin>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

    <!-- Font preloads (critical latin variants) -->
    <link rel="preload" href="https://fonts.bunny.net/instrument-sans/files/instrument-sans-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
    <link rel="preload" href="https://fonts.gstatic.com/s/instrumentserif/v4/jizBRFtNs2ka5fXjeivQ4LroWlx-6zUTjnTLgNs.woff2" as="font" type="font/woff2" crossorigin>

    <!-- Preloads -->
    <link rel="preload" href="/storage/img/me.webp" as="image" />

    <!-- Scripts -->
    @viteReactRefresh
    @vite(['resources/app.tsx', "resources/pages/{$page['component']}.tsx"])
    @inertiaHead
</head>

<body class="bg-background text-primary font-sans antialiased">
    @inertia
</body>

</html>
