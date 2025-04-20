# Commit Message Guidelines

This document outlines the commit message format and rules for our project. Following these guidelines ensures consistent and meaningful version control.

## Commit Message Format

```
type(scope): description
```

- **type**: The action or purpose of the commit
- **scope**: The area or module impacted (optional)
- **description**: A concise summary in present tense

## Commit Types

### 1. feat (Feature)
- For new features or functionality
- Example: `feat(ui): add dark mode toggle`

### 2. fix (Bug Fix)
- For bug fixes
- Example: `fix(layout): resolve responsive grid issues`

### 3. docs (Documentation)
- For documentation changes
- Example: `docs(readme): update installation steps`

### 4. chore (Chores)
- For maintenance tasks
- Example: `chore(deps): update dependencies`

### 5. style (Code Style)
- For formatting changes
- Example: `style(css): fix indentation`

### 6. refactor (Code Refactoring)
- For code restructuring
- Example: `refactor(js): simplify server card logic`

### 7. perf (Performance)
- For performance improvements
- Example: `perf(images): optimize asset loading`

### 8. test (Testing)
- For test-related changes
- Example: `test(api): add server status tests`

### 9. build (Build System)
- For build system changes
- Example: `build(vite): update build configuration`

### 10. ci (Continuous Integration)
- For CI/CD changes
- Example: `ci(actions): add automated testing`

### 11. revert (Reverting Changes)
- For undoing changes
- Example: `revert: undo last feature commit`

### 12. merge (Merging Branches)
- For branch merges
- Example: `merge(feature/dark-mode): combine into main`

## Best Practices

1. Keep commits atomic (one change per commit)
2. Use present tense in descriptions
3. Keep descriptions concise but meaningful
4. Include scope when relevant
5. Reference issues/tickets when applicable
6. Always use double quotes around commit messages
   - Required when using parentheses for type/scope to prevent shell syntax issues
   - Example: git commit -m "style(css): update layout"
   - Example: git commit -m "feat(auth): implement login flow"
   - NOT: git commit -m style(css): update layout
   - NOT: git commit -m 'feat(auth): implement login flow'

## Examples

```
feat(server-list): add server filtering system
fix(search): correct search input validation
docs(api): update API documentation
chore(cleanup): remove unused CSS classes
style(format): standardize code formatting
refactor(components): extract shared logic
perf(loading): improve initial load time
test(utils): add unit tests for helpers
build(deps): update package versions
ci(deploy): add deployment workflow
revert: return to stable version
merge(develop): sync with main branch
```

## Git Commands

```bash
# Stage changes
git add .

# Commit with message
git commit -m "type(scope): description"

# Push changes
git push origin branch-name
```