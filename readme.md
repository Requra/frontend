
## 🚦 Workflow Rules 
To ensure code quality and project stability, the following rules apply to this repository:

1. **No Direct Pushes**: No one is allowed to push code directly to the `main` branch.
2. **Feature Branching**: All work must be done on branches named `feat/feature-name` or `fix/bug-name`.
3. **Pull Requests (PR)**: All changes must be submitted via a PR.
4. **Code Review**: At least **one team member** must review and approve the PR before it can be merged into `main`.

---
# Frontend Architecture Guidelines

This project uses a scalable, **Feature-Based Architecture**. The goal of this structure is to keep related code combined inside modular features, ensuring the project remains maintainable and clean as it grows.

---

## 🏗️ Folder Structure Breakdown

### 1. `src/assets/`
Contains global static assets like fonts, SVG icons, images, and global stylesheets (`.css` / `.scss`).
- **Do not** put component-specific styles here.

### 2. `src/components/ui/`
Contains "Dumb", highly reusable, pure UI components.
- Buttons, Inputs, Modals, Spinners, Cards.
- These components should **never** import anything from `features/` or contain complex business logic/API calls.
- **Example:** `<Button />`, `<Input />`

### 3. `src/features/`
This is the **core** of the architecture. Instead of organizing files strictly by file-type (e.g., all APIs together, all hooks together), we group them by **domain** (e.g., `auth`, `users`, `products`).
A single feature folder acts like a mini-application, containing everything it needs to function:
- `api/`: API request declarations (e.g., `login.ts`).
- `components/`: UI components specific to this feature (e.g., `<LoginForm />`).
- `hooks/`: Custom hooks for this feature (e.g., `useAuth.ts`).
- `routes/`: The page components for this feature (e.g., `Login.tsx`, `Register.tsx`).
- `store/`: Local state management for the feature.
- `types/`: TypeScript definitions related only to this domain.
- `utils/`: Helper functions meant only for this feature.
- `index.ts`: The **Public API**. Other features in the app are ONLY allowed to import things exported from this `index.ts` file.

### 4. `src/hooks/`
Global custom React hooks meant to be used anywhere.
- **Examples:** `useDebounce`, `useLocalStorage`, `useWindowSize`.

### 5. `src/layouts/`
Layout components that wrap pages to provide structure.
- **Examples:** `MainLayout` (Navbar + Sidebar + Content), `AuthLayout` (Centered card).

### 6. `src/routes/`
The **Global Router configuration**. This is the glue that pulls the Pages out of the `features/` directory and assigns them to browser URL paths.
- Does not contain actual UI/HTML, just the routing tree (e.g., using `react-router-dom`).

### 7. `src/services/`
Global configuration for third-party tools, API clients, and infrastructure libraries.
- **Examples:** `axios` instance setup, React Query client setup, Firebase initialization.

### 8. `src/store/`
Global state management that needs to be accessed broadly across different features.
- **Examples:** Theme preference (Dark/Light mode), global notification system, user session state.
- **Note:** Do not put state here if it only belongs to a single feature.

### 9. `src/types/`
Global TypeScript definitions, generic utility types, and interfaces meant to be used widely.

### 10. `src/utils/`
Pure functions (no React state or Side Effects) used globally to process data.
- **Examples:** `formatDate`, `currencyFormatter`, `clsx` (for class merging).

---

## 📜 Best Practices & File Organization Rules

### 1. Naming Conventions
- **Components & Pages:** Must use **PascalCase** (e.g., `Button.tsx`, `LoginForm.tsx`).
- **Hooks, Utils, and Logic files:** Must use **camelCase** (e.g., `useAuth.ts`, `api.ts`, `formatDate.ts`).
- **Files exporting non-component objects:** Use lowercase or camelCase.

### 2. The "Strict Boundary" Rule (Domain Driven)
A feature (`features/users`) is allowed to import from global folders (`components/ui`, `utils`, `services`), but it should **never** import directly from the internals of another feature.
- **Correct:** `import { UserProfile } from '@/features/users'`
- **Incorrect:** `import { UserProfile } from '@/features/users/components/UserProfile'`

### 3. Absolute Paths
Use configured absolute paths (`@/*`) instead of deep relative paths for cleaner imports.
- **Correct:** `import { Button } from '@/components/ui'`
- **Incorrect:** `import { Button } from '../../../../components/ui'`

### 4. Barrel Imports (`index.ts`)
Each directory should have an `index.ts` file that exports its internal files. This keeps imports clean.
- Example inside `src/components/ui/index.ts`: `export * from './Button'; export * from './Input';`

### 5. Colocation
Whenever possible, keep the logic, tests, and styles right next to the component they belong to.
```text
src/components/ui/Button/
├── Button.tsx
├── Button.test.tsx
├── Button.module.css
└── index.ts
```

