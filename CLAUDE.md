# CLAUDE.md

> **Purpose**: This file provides AI assistants (like Claude) with comprehensive context about this project's architecture, conventions, and best practices to enable more accurate and consistent code generation.

## Project Overview

This is a full-stack web application built with:

- **Backend**: Laravel 12 (PHP 8.2+)
- **Frontend**: React 19 with TypeScript
- **Bridge**: Inertia.js 2.x for seamless SPA experience
- **Styling**: Tailwind CSS 4.x with shadcn/ui components
- **Build Tool**: Vite 7.x
- **Routing**: Laravel routes with Ziggy for frontend route generation

## Stack-Specific Context

### Laravel Backend

- **Version**: Laravel 12.x with PHP 8.2+
- **Key Services**:
  - Sanctum for API authentication
  - Resend for email services (see `App\Mail\NewLoginDevice`)
  - Custom `IpApiService` for IP geolocation
- **Middleware**: Standard Laravel middleware + custom Inertia middleware
- **Database**: Migrations in `database/migrations/`, models in `app/Models/`
- **Helpers**: Custom helper functions in `app/helpers.php` (autoloaded in dev)

### React + TypeScript Frontend

- **React Version**: 19.x (latest with new JSX transform)
- **TypeScript**: Configured with `moduleResolution: "bundler"` and `target: ESNext`
- **Entry Points**:
  - Client: `resources/app.tsx`
  - SSR: `resources/ssr.tsx`

### Inertia.js Integration

- **Version**: 2.x (@inertiajs/react)
- **Page Components**: Located in `resources/pages/`
- **Shared Data**: Available via Inertia's `usePage()` hook
- **Route Helper**: Ziggy provides type-safe routing from frontend

### UI Components & Styling

**Affordance Note**: This project uses shadcn/ui with the "new-york" style variant, which provides a specific aesthetic. When generating or modifying UI components, maintain consistency with this style.

- **Component Library**: shadcn/ui (New York style)
- **Base Components**: Located in `resources/components/ui/`
- **Feature Components**: Organized by domain in `resources/components/`
  - `app/` - Application-specific components
  - `guest/` - Unauthenticated user components
  - `nav/` - Navigation components
  - `appearance/` - Theme/appearance components
- **Icons**: Lucide React (`lucide-react`)
- **Styling Utilities**:
  - `clsx` and `tailwind-merge` (via `cn()` utility)
  - `class-variance-authority` for component variants
- **Additional UI Libraries**:
  - Radix UI primitives for accessible components
  - Headless UI for unstyled accessible components
  - Vaul for drawer/modal functionality
  - Sonner for toast notifications

### Path Aliases

**Affordance Note**: The project uses `@/` as a path alias pointing to the `resources/` directory. Always use these aliases instead of relative paths for cleaner imports.

```typescript
{
  "@": "./resources",
  "@/components": "./resources/components",
  "@/utils": "./resources/lib/utils",
  "@/ui": "./resources/components/ui",
  "@/lib": "./resources/lib",
  "@/hooks": "./resources/hooks"
}
```

## Architecture Patterns

### Backend Patterns

1. **Controllers**: Slim controllers in `app/Http/Controllers/` that delegate to services
2. **Services**: Business logic in `app/Services/` (e.g., `IpApiService`)
3. **Models**: Eloquent models in `app/Models/` with relationships
4. **Requests**: Form request validation in `app/Http/Requests/`
5. **Listeners**: Event listeners in `app/Listeners/` (e.g., `StoreLoginRecords`)
6. **Mail**: Mailable classes in `app/Mail/`

### Frontend Patterns

1. **Page Components**: Full-page Inertia components in `resources/pages/`

   - Named exports for sub-routes (e.g., `auth/login.tsx`)
   - Receive props from Laravel controllers
2. **Shared Components**: Reusable UI in `resources/components/`

   - Domain-organized (app, guest, nav, etc.)
   - UI primitives in `resources/components/ui/`
3. **Layouts**: Page layouts in `resources/layouts/`
4. **Hooks**: Custom React hooks in `resources/hooks/`

   - **Affordance Note**: Project includes custom `use-appearance` hook for theme management with `initializeTheme()` function
5. **Types**: TypeScript types in `resources/types/`

   - Inertia page props types
   - Shared type definitions
6. **Constants**: App-wide constants in `resources/constants.ts`

   - **Affordance Note**: `APP_NAME` is exported from constants and used throughout the app

### Inertia.js Patterns

1. **Controller Responses**: Use `Inertia::render('PageName', [...data])`
2. **Frontend Navigation**: Use `router.visit()` or `<Link>` component
3. **Forms**: Use `useForm()` hook for form handling with automatic CSRF
4. **Shared Data**: Define in `HandleInertiaRequests` middleware
5. **SSR Support**: Enabled with separate SSR entry point

## Code Style & Conventions

### PHP/Laravel

- **Code Style**: Laravel Pint for formatting
- **Static Analysis**: PHPStan (via Rector configuration)
- **Refactoring**: Rector with Laravel-specific rules
- **Naming**:
  - Controllers: `VerbNounController` (e.g., `StoreUserController`)
  - Models: Singular (e.g., `User`)
  - Tables: Plural snake_case (e.g., `users`)
  - Routes: Kebab-case

### TypeScript/React

- **Code Style**: ESLint with Prettier
- **Linting**: ESLint 9.x with flat config
  - React plugin + React Hooks plugin
  - TypeScript ESLint
  - Prettier integration
- **Formatting**: Prettier with plugins:
  - `prettier-plugin-organize-imports` (auto-sort imports)
  - `prettier-plugin-tailwindcss` (sort Tailwind classes)
  - `@shufo/prettier-plugin-blade` (format Blade templates)
- **Naming**:
  - Components: PascalCase (e.g., `UserProfile.tsx`)
  - Files: kebab-case for non-components (e.g., `use-appearance.ts`)
  - Hooks: `use` prefix (e.g., `useAppearance`)
  - Types/Interfaces: PascalCase

### Component Structure

```tsx
// 1. Imports (auto-organized by prettier-plugin-organize-imports)
import { useState } from 'react';
import { router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

// 2. Types/Interfaces
interface MyComponentProps {
  title: string;
  // ...
}

// 3. Component
export function MyComponent({ title }: MyComponentProps) {
  // Hooks first
  const [state, setState] = useState();

  // Event handlers
  const handleClick = () => {
    // ...
  };

  // Render
  return (
    <div>
      {/* ... */}
    </div>
  );
}
```

### Styling Patterns

1. **Tailwind First**: Use Tailwind utility classes for styling
2. **Component Variants**: Use `class-variance-authority` for complex variants
3. **Class Merging**: Always use `cn()` utility for conditional classes
4. **Responsive**: Mobile-first approach with Tailwind breakpoints
5. **Dark Mode**: Support via `use-appearance` hook and Tailwind's `dark:` variant

## Development Workflow

### Commands

```bash
# Backend
composer install          # Install PHP dependencies
php artisan migrate       # Run migrations
php artisan serve         # Start development server
./vendor/bin/pint        # Format PHP code
./vendor/bin/rector      # Run Rector refactoring

# Frontend
npm install              # Install Node dependencies
npm run dev              # Start Vite dev server (HMR enabled)
npm run build            # Build for production (client + SSR)
npm run lint             # Run ESLint with auto-fix

# Testing
php artisan test         # Run PHPUnit tests

# Generate TypeScript definitions from backend
# --path MUST be set to `resources`
php artisan wayfinder:generate --path=resources
```

### File Generation

- **Laravel**: Use Artisan commands (`php artisan make:...`)
- **React Components**: Manual creation in appropriate directory
- **shadcn/ui**: Not applicable (pre-configured, add components manually or via CLI if needed)

## Database Conventions

- **Migrations**: Timestamped, descriptive names
- **Foreign Keys**: `{table}_id` (e.g., `user_id`)
- **Pivot Tables**: Alphabetical order (e.g., `post_tag` not `tag_post`)
- **Soft Deletes**: Use `deleted_at` timestamp
- **Timestamps**: Use `created_at` and `updated_at`

## Security & Authentication

- **Authentication**: Laravel Sanctum SPA authentication
- **CSRF**: Automatic via Inertia.js
- **Authorization**: Laravel Policies and Gates
- **Middleware**: Applied in routes (`web.php`, `api.php`)
- **Login Tracking**: Custom listener `StoreLoginRecords` for security monitoring

## Testing

- **Backend**: PHPUnit 11.x in `tests/` directory
  - Feature tests for HTTP/Inertia responses
  - Unit tests for services and models
  - Run with: `php artisan test`
- **Frontend**: Vitest 4.x with React Testing Library in `resources/tests/` directory
  - Component tests for UI components
  - Hook tests for custom React hooks
  - Run with: `npm test`
  - Run with UI: `npm run test:ui`
  - Run with coverage: `npm run test:coverage`

## Performance Considerations

1. **SSR**: Enabled for better initial page load and SEO
2. **Code Splitting**: Automatic via Vite's dynamic imports
3. **Asset Optimization**: Vite handles bundling and minification
4. **Caching**: Laravel cache configuration in `config/cache.php`
5. **Database**: Use eager loading to prevent N+1 queries

## Key Files & Their Purposes

- `routes/web.php` - Main application routes
- `routes/web/` - Organized route files (if applicable)
- `app/Http/Middleware/HandleInertiaRequests.php` - Shared Inertia data
- `resources/app.tsx` - Client-side entry point
- `resources/ssr.tsx` - Server-side rendering entry point
- `resources/constants.ts` - Application constants
- `vite.config.js` - Build configuration
- `tailwind.config.js` - Tailwind configuration (Tailwind 4.x uses CSS config primarily)
- `components.json` - shadcn/ui configuration

## Environment Setup

- **Node**: Compatible with ES Modules (`"type": "module"`)
- **PHP**: 8.2 or higher required
- **Database**: Configured via `config/database.php`
- **Mail**: Resend integration configured in `config/mail.php`

## Guidelines

> **Purpose**: This section contains project-specific rules, patterns, and decisions that should be followed consistently. Add new guidelines as the project evolves.

### General Principles

1. **Type Safety First**: Always provide explicit types in TypeScript; avoid `any`
2. **Component Composition**: Prefer small, composable components over large monoliths
3. **Server-Side Logic**: Keep business logic in Laravel; React should focus on presentation
4. **Progressive Enhancement**: Ensure core functionality works, then enhance with JavaScript
5. **Accessibility**: Use semantic HTML and ARIA attributes where needed (Radix UI helps with this)

### Inertia.js Specifics

1. **Props Over API Calls**: Pass data from Laravel controllers as Inertia props rather than making separate API requests
2. **Form Handling**: Always use Inertia's `useForm()` hook for forms
3. **Redirects**: Use Inertia redirects in controllers, not traditional Laravel redirects
4. **Shared Data**: Use sparingly; prefer explicit props for clarity
5. **Page Props Type**: Define TypeScript interface for each page's props

### Component Guidelines

1. **shadcn/ui**: Use existing UI components from `@/components/ui/` before creating custom ones
2. **Variants**: Use CVA (class-variance-authority) for components with multiple style variants
3. **Icons**: Use Lucide React icons exclusively for consistency
4. **Theming**: All components should respect light/dark mode via Tailwind classes

### State Management

1. **Local State**: Use `useState` for component-local state
2. **Form State**: Use Inertia's `useForm()` for all forms
3. **Global State**: Use Inertia's shared data mechanism for user auth state
4. **Server State**: Rely on Inertia's automatic server state sync

### Error Handling

1. **Backend**: Return appropriate HTTP status codes with Inertia error responses
2. **Frontend**: Display errors using form error bags from Inertia
3. **Validation**: Use Laravel Form Requests for validation rules
4. **User Feedback**: Use Sonner toast notifications for non-form feedback

### Performance

1. **Lazy Loading**: Use dynamic imports for heavy components/pages
2. **Memoization**: Use `useMemo` and `useCallback` judiciously (only when needed)
3. **Database Queries**: Always eager load relationships to avoid N+1
4. **Asset Loading**: Leverage Vite's automatic code splitting

### Code Organization

1. **File Structure**: Follow the established directory structure strictly
2. **Exports**: Use named exports for components; default exports only for pages
3. **Imports**: Let Prettier organize imports automatically
4. **Barrel Exports**: Avoid index.ts barrel exports (can impact tree-shaking)

### Git Commit Messages

1. **Style**: Short, concise, single-line descriptions in imperative mood
2. **Format**: Present tense verb + brief description (e.g., "Add feature", "Fix bug", "Update component"). Caveats:
   - If the current changes solely encompass the installation & setup or removal of a dependency, use "Install"/"Remove" as the verb followed by the package name. (e.g., "Install Vitest" or "Remove Vitest")
   - If the current changes solely encompass updating Composer dependencies, use "Update Composer dependencies" as the commit message.
   - If the current changes solely encompass updating NPM dependencies, use "Update NPM dependencies" as the commit message.
   - If the current changes solely encompass applying recommended fixes from an automated tool or process (e.g., ESLint, Prettier, Rector), use "Apply fixes from [Tool Name]" as the commit message.
3. **Length**: Keep under 60 characters when possible
4. **Examples**:
   - "Apply fixes from ESLint"
   - "Update prybar helper to avoid deprecated Reflection method call"
   - "Remove Ziggy dependencies"
   - "Migrate navigation components to Wayfinder"
5. **Avoid**: Long multi-paragraph descriptions, excessive detail, bullet points in commit message body

===

<laravel-boost-guidelines>
=== foundation rules ===

# Laravel Boost Guidelines

The Laravel Boost guidelines are specifically curated by Laravel maintainers for this application. These guidelines should be followed closely to ensure the best experience when building Laravel applications.

## Foundational Context

This application is a Laravel application and its main Laravel ecosystems package & versions are below. You are an expert with them all. Ensure you abide by these specific packages & versions.

- php - 8.4.17
- inertiajs/inertia-laravel (INERTIA) - v2
- laravel/framework (LARAVEL) - v12
- laravel/nightwatch (NIGHTWATCH) - v1
- laravel/prompts (PROMPTS) - v0
- laravel/sanctum (SANCTUM) - v4
- laravel/wayfinder (WAYFINDER) - v0
- laravel/mcp (MCP) - v0
- laravel/pint (PINT) - v1
- laravel/sail (SAIL) - v1
- phpunit/phpunit (PHPUNIT) - v11
- rector/rector (RECTOR) - v2
- @inertiajs/react (INERTIA) - v2
- react (REACT) - v19
- tailwindcss (TAILWINDCSS) - v4
- @laravel/vite-plugin-wayfinder (WAYFINDER) - v0
- eslint (ESLINT) - v9
- prettier (PRETTIER) - v3

## Skills Activation

This project has domain-specific skills available. You MUST activate the relevant skill whenever you work in that domain—don't wait until you're stuck.

- `wayfinder-development` — Activates whenever referencing backend routes in frontend components. Use when importing from @/actions or @/routes, calling Laravel routes from TypeScript, or working with Wayfinder route functions.
- `inertia-react-development` — Develops Inertia.js v2 React client-side applications. Activates when creating React pages, forms, or navigation; using &lt;Link&gt;, &lt;Form&gt;, useForm, or router; working with deferred props, prefetching, or polling; or when user mentions React with Inertia, React pages, React forms, or React navigation.
- `tailwindcss-development` — Styles applications using Tailwind CSS v4 utilities. Activates when adding styles, restyling components, working with gradients, spacing, layout, flex, grid, responsive design, dark mode, colors, typography, or borders; or when the user mentions CSS, styling, classes, Tailwind, restyle, hero section, cards, buttons, or any visual/UI changes.

## Conventions

- You must follow all existing code conventions used in this application. When creating or editing a file, check sibling files for the correct structure, approach, and naming.
- Use descriptive names for variables and methods. For example, `isRegisteredForDiscounts`, not `discount()`.
- Check for existing components to reuse before writing a new one.

## Verification Scripts

- Do not create verification scripts or tinker when tests cover that functionality and prove they work. Unit and feature tests are more important.

## Application Structure & Architecture

- Stick to existing directory structure; don't create new base folders without approval.
- Do not change the application's dependencies without approval.

## Frontend Bundling

- If the user doesn't see a frontend change reflected in the UI, it could mean they need to run `npm run build`, `npm run dev`, or `composer run dev`. Ask them.

## Documentation Files

- You must only create documentation files if explicitly requested by the user.

## Replies

- Be concise in your explanations - focus on what's important rather than explaining obvious details.

=== boost rules ===

# Laravel Boost

- Laravel Boost is an MCP server that comes with powerful tools designed specifically for this application. Use them.

## Artisan

- Use the `list-artisan-commands` tool when you need to call an Artisan command to double-check the available parameters.

## URLs

- Whenever you share a project URL with the user, you should use the `get-absolute-url` tool to ensure you're using the correct scheme, domain/IP, and port.

## Tinker / Debugging

- You should use the `tinker` tool when you need to execute PHP to debug code or query Eloquent models directly.
- Use the `database-query` tool when you only need to read from the database.

## Reading Browser Logs With the `browser-logs` Tool

- You can read browser logs, errors, and exceptions using the `browser-logs` tool from Boost.
- Only recent browser logs will be useful - ignore old logs.

## Searching Documentation (Critically Important)

- Boost comes with a powerful `search-docs` tool you should use before trying other approaches when working with Laravel or Laravel ecosystem packages. This tool automatically passes a list of installed packages and their versions to the remote Boost API, so it returns only version-specific documentation for the user's circumstance. You should pass an array of packages to filter on if you know you need docs for particular packages.
- Search the documentation before making code changes to ensure we are taking the correct approach.
- Use multiple, broad, simple, topic-based queries at once. For example: `['rate limiting', 'routing rate limiting', 'routing']`. The most relevant results will be returned first.
- Do not add package names to queries; package information is already shared. For example, use `test resource table`, not `filament 4 test resource table`.

### Available Search Syntax

1. Simple Word Searches with auto-stemming - query=authentication - finds 'authenticate' and 'auth'.
2. Multiple Words (AND Logic) - query=rate limit - finds knowledge containing both "rate" AND "limit".
3. Quoted Phrases (Exact Position) - query="infinite scroll" - words must be adjacent and in that order.
4. Mixed Queries - query=middleware "rate limit" - "middleware" AND exact phrase "rate limit".
5. Multiple Queries - queries=["authentication", "middleware"] - ANY of these terms.

=== php rules ===

# PHP

- Always use curly braces for control structures, even for single-line bodies.

## Constructors

- Use PHP 8 constructor property promotion in `__construct()`.
    - <code-snippet>public function __construct(public GitHub $github) { }</code-snippet>
- Do not allow empty `__construct()` methods with zero parameters unless the constructor is private.

## Type Declarations

- Always use explicit return type declarations for methods and functions.
- Use appropriate PHP type hints for method parameters.

<code-snippet name="Explicit Return Types and Method Params" lang="php">
protected function isAccessible(User $user, ?string $path = null): bool
{
    ...
}
</code-snippet>

## Enums

- Typically, keys in an Enum should be TitleCase. For example: `FavoritePerson`, `BestLake`, `Monthly`.

## Comments

- Prefer PHPDoc blocks over inline comments. Never use comments within the code itself unless the logic is exceptionally complex.

## PHPDoc Blocks

- Add useful array shape type definitions when appropriate.

=== herd rules ===

# Laravel Herd

- The application is served by Laravel Herd and will be available at: `https?://[kebab-case-project-dir].test`. Use the `get-absolute-url` tool to generate valid URLs for the user.
- You must not run any commands to make the site available via HTTP(S). It is always available through Laravel Herd.

=== tests rules ===

# Test Enforcement

- Every change must be programmatically tested. Write a new test or update an existing test, then run the affected tests to make sure they pass.
- Run the minimum number of tests needed to ensure code quality and speed. Use `php artisan test --compact` with a specific filename or filter.

=== inertia-laravel/core rules ===

# Inertia

- Inertia creates fully client-side rendered SPAs without modern SPA complexity, leveraging existing server-side patterns.
- Components live in `resources/js/Pages` (unless specified in `vite.config.js`). Use `Inertia::render()` for server-side routing instead of Blade views.
- ALWAYS use `search-docs` tool for version-specific Inertia documentation and updated code examples.
- IMPORTANT: Activate `inertia-react-development` when working with Inertia client-side patterns.

=== inertia-laravel/v2 rules ===

# Inertia v2

- Use all Inertia features from v1 and v2. Check the documentation before making changes to ensure the correct approach.
- New features: deferred props, infinite scrolling (merging props + `WhenVisible`), lazy loading on scroll, polling, prefetching.
- When using deferred props, add an empty state with a pulsing or animated skeleton.

=== laravel/core rules ===

# Do Things the Laravel Way

- Use `php artisan make:` commands to create new files (i.e. migrations, controllers, models, etc.). You can list available Artisan commands using the `list-artisan-commands` tool.
- If you're creating a generic PHP class, use `php artisan make:class`.
- Pass `--no-interaction` to all Artisan commands to ensure they work without user input. You should also pass the correct `--options` to ensure correct behavior.

## Database

- Always use proper Eloquent relationship methods with return type hints. Prefer relationship methods over raw queries or manual joins.
- Use Eloquent models and relationships before suggesting raw database queries.
- Avoid `DB::`; prefer `Model::query()`. Generate code that leverages Laravel's ORM capabilities rather than bypassing them.
- Generate code that prevents N+1 query problems by using eager loading.
- Use Laravel's query builder for very complex database operations.

### Model Creation

- When creating new models, create useful factories and seeders for them too. Ask the user if they need any other things, using `list-artisan-commands` to check the available options to `php artisan make:model`.

### APIs & Eloquent Resources

- For APIs, default to using Eloquent API Resources and API versioning unless existing API routes do not, then you should follow existing application convention.

## Controllers & Validation

- Always create Form Request classes for validation rather than inline validation in controllers. Include both validation rules and custom error messages.
- Check sibling Form Requests to see if the application uses array or string based validation rules.

## Authentication & Authorization

- Use Laravel's built-in authentication and authorization features (gates, policies, Sanctum, etc.).

## URL Generation

- When generating links to other pages, prefer named routes and the `route()` function.

## Queues

- Use queued jobs for time-consuming operations with the `ShouldQueue` interface.

## Configuration

- Use environment variables only in configuration files - never use the `env()` function directly outside of config files. Always use `config('app.name')`, not `env('APP_NAME')`.

## Testing

- When creating models for tests, use the factories for the models. Check if the factory has custom states that can be used before manually setting up the model.
- Faker: Use methods such as `$this->faker->word()` or `fake()->randomDigit()`. Follow existing conventions whether to use `$this->faker` or `fake()`.
- When creating tests, make use of `php artisan make:test [options] {name}` to create a feature test, and pass `--unit` to create a unit test. Most tests should be feature tests.

## Vite Error

- If you receive an "Illuminate\Foundation\ViteException: Unable to locate file in Vite manifest" error, you can run `npm run build` or ask the user to run `npm run dev` or `composer run dev`.

=== laravel/v12 rules ===

# Laravel 12

- CRITICAL: ALWAYS use `search-docs` tool for version-specific Laravel documentation and updated code examples.
- Since Laravel 11, Laravel has a new streamlined file structure which this project uses.

## Laravel 12 Structure

- In Laravel 12, middleware are no longer registered in `app/Http/Kernel.php`.
- Middleware are configured declaratively in `bootstrap/app.php` using `Application::configure()->withMiddleware()`.
- `bootstrap/app.php` is the file to register middleware, exceptions, and routing files.
- `bootstrap/providers.php` contains application specific service providers.
- The `app\Console\Kernel.php` file no longer exists; use `bootstrap/app.php` or `routes/console.php` for console configuration.
- Console commands in `app/Console/Commands/` are automatically available and do not require manual registration.

## Database

- When modifying a column, the migration must include all of the attributes that were previously defined on the column. Otherwise, they will be dropped and lost.
- Laravel 12 allows limiting eagerly loaded records natively, without external packages: `$query->latest()->limit(10);`.

### Models

- Casts can and likely should be set in a `casts()` method on a model rather than the `$casts` property. Follow existing conventions from other models.

=== wayfinder/core rules ===

# Laravel Wayfinder

Wayfinder generates TypeScript functions for Laravel routes. Import from `@/actions/` (controllers) or `@/routes/` (named routes).

- IMPORTANT: Activate `wayfinder-development` skill whenever referencing backend routes in frontend components.
- Invokable Controllers: `import StorePost from '@/actions/.../StorePostController'; StorePost()`.
- Parameter Binding: Detects route keys (`{post:slug}`) — `show({ slug: "my-post" })`.
- Query Merging: `show(1, { mergeQuery: { page: 2, sort: null } })` merges with current URL, `null` removes params.
- Inertia: Use `.form()` with `<Form>` component or `form.submit(store())` with useForm.

=== pint/core rules ===

# Laravel Pint Code Formatter

- You must run `vendor/bin/pint --dirty` before finalizing changes to ensure your code matches the project's expected style.
- Do not run `vendor/bin/pint --test`, simply run `vendor/bin/pint` to fix any formatting issues.

=== phpunit/core rules ===

# PHPUnit

- This application uses PHPUnit for testing. All tests must be written as PHPUnit classes. Use `php artisan make:test --phpunit {name}` to create a new test.
- If you see a test using "Pest", convert it to PHPUnit.
- Every time a test has been updated, run that singular test.
- When the tests relating to your feature are passing, ask the user if they would like to also run the entire test suite to make sure everything is still passing.
- Tests should cover all happy paths, failure paths, and edge cases.
- You must not remove any tests or test files from the tests directory without approval. These are not temporary or helper files; these are core to the application.

## Running Tests

- Run the minimal number of tests, using an appropriate filter, before finalizing.
- To run all tests: `php artisan test --compact`.
- To run all tests in a file: `php artisan test --compact tests/Feature/ExampleTest.php`.
- To filter on a particular test name: `php artisan test --compact --filter=testName` (recommended after making a change to a related file).

=== inertia-react/core rules ===

# Inertia + React

- IMPORTANT: Activate `inertia-react-development` when working with Inertia React client-side patterns.

=== tailwindcss/core rules ===

# Tailwind CSS

- Always use existing Tailwind conventions; check project patterns before adding new ones.
- IMPORTANT: Always use `search-docs` tool for version-specific Tailwind CSS documentation and updated code examples. Never rely on training data.
- IMPORTANT: Activate `tailwindcss-development` every time you're working with a Tailwind CSS or styling-related task.
</laravel-boost-guidelines>
