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

    <link rel="icon"
        href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='0.9em' font-size='90'>👋</text></svg>" />

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=Rubik:400,500,600" rel="stylesheet" />

    <!-- Preloads -->
    <link rel="preload" href="/storage/img/me.webp" as="image" />

    <!-- Scripts -->
    @routes
    @viteReactRefresh
    @vite(['resources/app.tsx', "resources/pages/{$page['component']}.tsx"])
    @inertiaHead
</head>

<body class="bg-background text-primary font-sans antialiased">
    @inertia
</body>

</html>
