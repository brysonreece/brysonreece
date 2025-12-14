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
- **Frontend**: (Configure if needed - not currently set up)

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
2. **Format**: Present tense verb + brief description (e.g., "Add feature", "Fix bug", "Update component")
3. **Length**: Keep under 60 characters when possible
4. **Examples**:
   - "Apply fixes from Tailwind"
   - "Update prybar helper to avoid deprecated Reflection method call"
   - "Remove Ziggy dependencies"
   - "Migrate navigation components to Wayfinder"
5. **Avoid**: Long multi-paragraph descriptions, excessive detail, bullet points in commit message body
