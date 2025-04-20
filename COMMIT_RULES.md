# Commit Message Guidelines

This document outlines the commit message format and rules for our project. Following these guidelines ensures consistent and meaningful version control.

## Commit Message Format

```
type(scope): description
```

- **type**: The action or purpose of the commit
- **scope**: The area or module impacted (optional)
- **description**: A concise summary in past tense

## Commit Types

### 1. feat (Feature)
- For new features or functionality
- Example: `feat(ui): added dark mode toggle`

### 2. fix (Bug Fix)
- For bug fixes
- Example: `fix(layout): resolved responsive grid issues`

### 3. docs (Documentation)
- For documentation changes
- Example: `docs(readme): update installation steps`

### 4. chore (Chores)
- For maintenance tasks
- Example: `chore(deps): updated dependencies`

### 5. style (Code Style)
- For formatting changes
- Example: `style(css): fixed indentation`

### 6. refactor (Code Refactoring)
- For code restructuring
- Example: `refactor(js): simplified server card logic`

### 7. perf (Performance)
- For performance improvements
- Example: `perf(images): optimized asset loading`

### 8. test (Testing)
- For test-related changes
- Example: `test(api): added server status tests`

### 9. build (Build System)
- For build system changes
- Example: `build(vite): updated build configuration`

### 10. ci (Continuous Integration)
- For CI/CD changes
- Example: `ci(actions): added automated testing`

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
   - Example: git commit -m "style(css): updated layout"
   - Example: git commit -m "feat(auth): implemented login flow"
   - NOT: git commit -m style(css): updated layout
   - NOT: git commit -m 'feat(auth): implemented login flow'
   - NOT: git commit -m "feat(auth): implement login flow" (use past tense)

## Examples

```
feat(server-list): added server filtering system
fix(search): corrected search input validation
docs(api): updated API documentation
chore(cleanup): removed unused CSS classes
style(format): standardized code formatting
refactor(components): extracted shared logic
perf(loading): improved initial load time
test(utils): added unit tests for helpers
build(deps): updated package versions
ci(deploy): added deployment workflow
revert: returned to stable version
merge(develop): synced with main branch
```

## Automated Commit Commands

This project supports automated commit and push operations through special commands:

### /COMMIT+PUSH Command

When you use the command `/COMMIT+PUSH`, the system will:
1. Stage all changes
2. Generate a commit message following our format guidelines
3. Push changes to the main branch

The commit message will be automatically formatted according to the rules above, ensuring consistency in our version control system.

## Git Commands

```bash
# Stage changes
git add .

# Commit with message
git commit -m "type(scope): description"

# Push changes
git push origin branch-name
```