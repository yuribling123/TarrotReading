# Project Rules

## Core Principle

- Preserve existing business logic, interaction behavior, visual design, animation timing, responsive behavior, API contracts, routes, image paths, and user data unless explicitly asked to change them.
- Prefer small, readable, feature-focused changes. Do not introduce abstractions, dependencies, or state-management libraries without a demonstrated need.

## Bilingual UI

- Keep user-facing copy compatible with the project's bilingual UI conventions.
- Put shared or language-dependent copy in the existing i18n/message structures.
- Keep Chinese-only copy only when the current feature explicitly supports Chinese only.

## Feature Architecture

- Organize code by feature domain, not file type.
- Place feature components under `app/components/<feature>/`; use existing domains such as `cards`, `home`, `limits`, `moon`, `postcards`, `reading`, `selection`, `shared`, and `zodiac`.
- Put genuinely reusable UI in `app/components/shared/`.
- Keep feature hooks beside their feature components.
- Keep reusable business logic, persistence helpers, API helpers, and domain utilities in `lib/`, organized by domain.
- Keep route files focused on page composition, routing, and data flow.

## Components, Hooks, Types

- Create components for meaningful UI responsibilities.
- Extract hooks for reusable behavior, side effects, persistence, animation state, event handling, or non-trivial calculations.
- Do not abstract one-use code merely for symmetry.
- Put shared domain types in `lib/types/`, split by domain, and export them through `lib/types/index.ts`.
- Keep one-use simple Props types inside the component file.
- Do not duplicate data shapes, storage keys, API shapes, or domain constants.
- Prefer explicit types over `any` and repeated inline definitions.

## State, Persistence, and APIs

- Preserve route paths, API request/response shapes, Redis keys, localStorage keys, sessionStorage keys, and image paths.
- Centralize repeated date, storage, Redis counter, card selection, image loading, and animation-state logic only when behavior is identical.
- Do not change persistence timing, reset rules, date boundaries, fallback behavior, or side-effect timing during a pure refactor.
- Keep side effects inside hooks, event handlers, or route handlers rather than render.
- Do not add a new state-management dependency for local or feature-scoped state.

## Styling and Assets

- Put image assets under `public/images/`; create purpose-specific subfolders when useful.
- Use existing public asset paths.
- Use Tailwind CSS classes for component-local layout, spacing, sizing, colors, borders, and responsive rules.
- Keep `app/globals.css` limited to theme variables, reset rules, shared keyframes, complex pseudo-elements, dynamic/cross-component selectors, browser compatibility rules, and styles that cannot be expressed clearly with Tailwind.
- Before adding a rule to `globals.css`, check whether Tailwind can express it clearly. Do not duplicate equivalent rules.
- Do not change existing breakpoints, dimensions, colors, spacing, z-index values, or animation durations during structural cleanup.

## Naming and Imports

- Use kebab-case for filenames and directories.
- Use PascalCase for React components and exported component types.
- Use camelCase for functions, hooks, variables, and state; prefix hooks with `use`.
- Prefer absolute `@/` imports.
- Order imports: React/Next, external packages, project aliases, relative imports, then type-only imports.
- Remove unused imports, state, Props, parameters, and local variables when safely confirmed.

## Dead Code and Deletions

- Before deleting a file, component, import, CSS rule, dependency, or asset, search the entire repository for references.
- Check static/dynamic imports, runtime class names, pseudo-elements, animation names, API compatibility, and build-time usage.
- Delete only code with evidence that it has no runtime or build-time purpose. If uncertain, leave it and list it as deferred.
- Never use destructive git commands to discard existing work.

## Change Workflow

Before editing:

1. Confirm the current Git branch.
2. Run `git status` and preserve unrelated user changes.
3. Inspect the affected feature and search its references.
4. Define the smallest safe change boundary.

While editing:

- Work in feature-focused stages; do not rewrite the whole project at once.
- Use `apply_patch` for source edits.
- Do not mix unrelated bug fixes or visual redesigns into structural changes.
- If cleanup could alter layout, behavior, performance, or animation, leave it unchanged unless equivalence can be demonstrated.

After editing:

- Run `git diff --check` for every meaningful change set.
- Run TypeScript, lint, tests, or production build when changes affect shared logic, routing, APIs, dependencies, build configuration, or multiple features.
- For isolated presentational edits, use proportionate validation; a full build is not required after every component change.
- Verify affected routes and responsive breakpoints when practical.
- Do not claim visual equivalence without preserving values by inspection or performing an appropriate visual check.

## Definition of Done for New Features

- Code is in the correct feature directory and route files remain composition-focused.
- Shared types, constants, and repeated logic are reused appropriately.
- Component-local styling uses Tailwind where practical.
- No confirmed unused code remains in the changed area.
- Existing routes, APIs, storage keys, animations, responsive breakpoints, and user data behavior remain compatible.
- Necessary validation passes for the scope of the change.
- Final handoff states what changed, what was verified, and what was intentionally deferred.
