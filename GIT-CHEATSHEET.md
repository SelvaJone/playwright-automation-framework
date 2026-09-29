# Git & GitHub Cheat Sheet

A practical Git reference for Playwright automation projects.

---

## 1. Check Git Version

```powershell
git --version
```

---

## 2. Check Repository Status

```powershell
git status
```

Shows:

* Current branch
* Modified files
* Untracked files
* Staged files
* Whether your branch is ahead/behind GitHub

Example:

```text
On branch master
nothing to commit, working tree clean
```

---

# 3. Initialize a Git Repository

Run this inside your project folder:

```powershell
git init
```

Example:

```powershell
cd C:\Documents\playwright-automation-framework
git init
```

---

# 4. Add Files to Staging

### Add one file

```powershell
git add playwright.config.js
```

### Add multiple files

```powershell
git add file1.js file2.js
```

### Add everything

```powershell
git add .
```

---

# 5. Commit Changes

```powershell
git commit -m "Add API automation"
```

Good commit messages describe what changed.

Examples:

```powershell
git commit -m "Add API fixture framework"

git commit -m "Add data driven API tests"

git commit -m "Update Playwright configuration"
```

---

# 6. View Commit History

### Normal log

```powershell
git log
```

### Compact log

```powershell
git log --oneline
```

Example:

```text
a0c5453 Update API project timeout
cfe7bce Add API project configuration
```

---

# 7. View Current Changes

```powershell
git diff
```

Shows changes that have **not been staged**.

Example:

```diff
- testMatch: "**/api-fixture/**/*.spec.js"
+ testMatch: "**/api-fixture/**/*.spec.js",
+ retries: 1
```

### Exit `git diff`

If Git opens a scrolling screen:

```text
q
```

---

# 8. View Staged Changes

```powershell
git diff --staged
```

Shows changes that have already been added with:

```powershell
git add .
```

---

# 9. GitHub Remote

### Check remote

```powershell
git remote -v
```

Example:

```text
origin  https://github.com/SelvaJone/playwright-automation-framework
```

### Add a remote

```powershell
git remote add origin https://github.com/USERNAME/REPOSITORY.git
```

### Change remote URL

```powershell
git remote set-url origin https://github.com/USERNAME/REPOSITORY.git
```

### Remove remote

```powershell
git remote remove origin
```

---

# 10. Push Changes to GitHub

First push:

```powershell
git push -u origin master
```

After the branch is connected:

```powershell
git push
```

Typical workflow:

```powershell
git add .
git commit -m "Add new automation test"
git push
```

---

# 11. Fetch Changes from GitHub

```powershell
git fetch
```

### Meaning

`git fetch` downloads information about changes from GitHub but does **not** update your working files.

Think:

```text
GitHub
   ↓
git fetch
   ↓
Local Git information updated
```

Your files remain unchanged.

---

# 12. Pull Changes from GitHub

```powershell
git pull
```

Conceptually:

```text
git pull = git fetch + git merge
```

It gets changes from GitHub and integrates them into your local branch.

---

# 13. Fetch vs Pull

| Command     | Gets remote changes | Updates local files |
| ----------- | ------------------: | ------------------: |
| `git fetch` |                 Yes |                  No |
| `git pull`  |                 Yes |                 Yes |

Easy memory:

```text
FETCH = Check/Get information

PULL = Bring changes into my project
```

---

# 14. Git Stash

Stash temporarily stores your uncommitted changes.

### Save local changes

```powershell
git stash
```

Example:

```text
Your local changes
       ↓
   git stash
       ↓
temporarily stored
```

### See stashes

```powershell
git stash list
```

### Restore latest stash

```powershell
git stash pop
```

This restores the changes and removes the stash entry.

### Apply stash without removing it

```powershell
git stash apply
```

### Delete a stash

```powershell
git stash drop
```

### Delete all stashes

```powershell
git stash clear
```

---

# 15. Git Merge Conflict

A conflict can happen when local and remote changes cannot be automatically combined.

Typical flow:

```powershell
git pull
```

Git may show:

```text
CONFLICT
```

or:

```text
both modified: playwright.config.js
```

---

# 16. Conflict Markers

A conflicted file may contain:

```javascript
<<<<<<< HEAD

YOUR LOCAL VERSION

=======

REMOTE VERSION

>>>>>>> origin/master
```

Meaning:

```text
<<<<<<<
Local version

=======

Remote version

>>>>>>>
```

---

# 17. Resolve a Conflict

Open the conflicted file in VS Code.

Choose the code you want to keep.

For example, combine both changes:

```javascript
{
    name: "api",
    testMatch: "**/api-fixture/**/*.spec.js",
    timeout: 30000,
    retries: 1
},
```

Remove all conflict markers:

```text
<<<<<<<
=======
>>>>>>>
```

Save the file.

---

# 18. Mark Conflict as Resolved

```powershell
git add playwright.config.js
```

Then:

```powershell
git status
```

The file should move from:

```text
Unmerged paths
```

to:

```text
Changes to be committed
```

---

# 19. Commit Conflict Resolution

```powershell
git commit -m "Resolve merge conflict"
```

Then:

```powershell
git push
```

---

# 20. Delete a File

### Delete a file from Git and your local folder

```powershell
git rm filename
```

Example:

```powershell
git rm oldTest.spec.js
```

Then commit:

```powershell
git commit -m "Remove old test"
git push
```

---

# 21. Delete a Folder

```powershell
git rm -r foldername
```

Example:

```powershell
git rm -r old-tests
```

Then:

```powershell
git commit -m "Remove old tests"
git push
```

---

# 22. Delete a File from Git but Keep It Locally

Sometimes you want Git to stop tracking a file but keep the file on your computer.

Use:

```powershell
git rm --cached filename
```

Example:

```powershell
git rm --cached config.local.js
```

Then add it to `.gitignore`.

---

# 23. Delete an Untracked File

If `git status` shows:

```text
Untracked files:
    test.txt
```

and you don't need the file:

```powershell
Remove-Item test.txt
```

Then:

```powershell
git status
```

### Important

`git rm` is for a file Git is tracking.

`Remove-Item` is useful for an untracked local file.

---

# 24. Restore an Uncommitted File

If you changed a file but want to discard your local changes:

```powershell
git restore filename
```

Example:

```powershell
git restore playwright.config.js
```

This returns the file to the last committed version.

### Restore all unstaged changes

```powershell
git restore .
```

Be careful: this discards your uncommitted changes.

---

# 25. Unstage a File

If you accidentally run:

```powershell
git add playwright.config.js
```

but don't want to commit it yet:

```powershell
git restore --staged playwright.config.js
```

The file remains modified, but it is no longer staged.

---

# 26. Undo the Last Commit — Keep Changes

```powershell
git reset --soft HEAD~1
```

The commit is removed, but your changes remain staged.

Useful when you committed too early.

---

# 27. Undo the Last Commit — Keep Changes Unstaged

```powershell
git reset HEAD~1
```

The commit is removed, but your changes remain in the working directory.

---

# 28. Dangerous Reset

```powershell
git reset --hard HEAD~1
```

This removes the last commit and its changes.

**Use with caution.**

---

# 29. Branches

### List branches

```powershell
git branch
```

### Create a branch

```powershell
git branch feature/api-testing
```

### Switch branch

```powershell
git switch feature/api-testing
```

### Create and switch in one command

```powershell
git switch -c feature/api-testing
```

### Delete a local branch

```powershell
git branch -d feature/api-testing
```

---

# 30. Push a New Branch

```powershell
git push -u origin feature/api-testing
```

After the upstream branch is created:

```powershell
git push
```

---

# 31. Switch Back to Master

```powershell
git switch master
```

---

# 32. Merge a Branch

First switch to the branch that should receive the changes:

```powershell
git switch master
```

Then:

```powershell
git merge feature/api-testing
```

If there are conflicts:

```text
CONFLICT
```

Resolve them manually, then:

```powershell
git add .
git commit -m "Resolve merge conflict"
```

---

# 33. Check Branch Status

```powershell
git status
```

Example:

```text
Your branch is ahead of 'origin/master' by 1 commit.
```

This means:

```text
Local master
    ↓
has 1 commit
    ↓
not yet pushed to GitHub
```

Run:

```powershell
git push
```

---

# 34. Check Remote Branches

```powershell
git branch -r
```

Example:

```text
origin/master
origin/feature/api-testing
```

---

# 35. See All Branches

```powershell
git branch -a
```

---

# 36. Compare Local and Remote

### See commits that GitHub has but local doesn't

```powershell
git log master..origin/master --oneline
```

### See commits local has but GitHub doesn't

```powershell
git log origin/master..master --oneline
```

---

# 37. Git Log Graph

Very useful for understanding branches:

```powershell
git log --oneline --graph --all
```

Example:

```text
* a123456 Add API test
* b234567 Update config
|\
| * c345678 Add UI test
|/
* d456789 Initial framework
```

---

# 38. Rename a File

```powershell
git mv oldname.js newname.js
```

Example:

```powershell
git mv booking.spec.js bookingApi.spec.js
```

Then:

```powershell
git commit -m "Rename booking API test"
```

---

# 39. Rename a Branch

Rename current branch:

```powershell
git branch -m new-branch-name
```

Rename `master` to `main`:

```powershell
git branch -m master main
```

---

# 40. Check Which Files Git Tracks

```powershell
git ls-files
```

Useful for checking whether unwanted files are being tracked.

---

# 41. `.gitignore`

Typical Playwright `.gitignore`:

```text
node_modules/
test-results/
playwright-report/
blob-report/
playwright/.cache/
playwright/.auth/
```

These files/folders normally should not be pushed to GitHub.

---

# 42. Check a File's Git Status

```powershell
git status --short
```

Example:

```text
 M playwright.config.js
?? newTest.spec.js
```

Meaning:

```text
M  = Modified
?? = Untracked
A  = Added
D  = Deleted
```

---

# 43. Typical Daily Workflow

When you start working:

```powershell
git pull
```

Make your changes.

Check:

```powershell
git status
```

Review:

```powershell
git diff
```

Stage:

```powershell
git add .
```

Commit:

```powershell
git commit -m "Add new API test"
```

Push:

```powershell
git push
```

---

# 44. Safe Workflow Before Pulling

If you have local changes:

```powershell
git status
```

If you don't want to commit them yet:

```powershell
git stash
git pull
git stash pop
```

If there is a conflict:

```text
1. Open conflicted file
2. Resolve conflict
3. Remove conflict markers
4. Save file
5. git add <file>
6. git commit -m "Resolve merge conflict"
7. git push
```

---

# 45. Playwright + Git Example

Your project:

```text
playwright-automation-framework/
│
├── .github/
├── pages/
├── tests/
├── package.json
├── package-lock.json
├── playwright.config.js
└── .gitignore
```

Typical workflow:

```powershell
git pull

npx playwright test --project=api

git status

git diff

git add .

git commit -m "Add booking API tests"

git push
```

---

# 46. Most Important Commands to Remember

```powershell
git status
git add .
git commit -m "message"
git push
git pull
git fetch
git diff
git log --oneline
git stash
git stash pop
git branch
git switch branch-name
git merge branch-name
git rm filename
git restore filename
git remote -v
```

---

# 47. Easy Memory

```text
STATUS
↓
What changed?

DIFF
↓
What exactly changed?

ADD
↓
Prepare changes

COMMIT
↓
Save changes locally

PUSH
↓
Send changes to GitHub

FETCH
↓
Check/download remote information

PULL
↓
Bring remote changes into local branch

STASH
↓
Temporarily store my changes

MERGE
↓
Combine branches

CONFLICT
↓
Git needs me to decide

ADD
↓
Tell Git conflict is resolved

COMMIT
↓
Save resolution

PUSH
↓
Send resolution to GitHub

RM
↓
Delete tracked file
```

---

# 48. Golden Git Workflow

```text
                 GITHUB
                    ↑
                  PUSH
                    ↑
                 COMMIT
                    ↑
                   ADD
                    ↑
                  EDIT
                    ↑
                  PULL
                    ↑
                 FETCH
                    ↑
                  LOCAL
```

For everyday Playwright development, remember:

```powershell
git pull

# Make changes

git status
git diff

git add .
git commit -m "Describe the change"
git push
```

If you have unfinished changes before pulling:

```powershell
git stash
git pull
git stash pop
```

If a conflict occurs:

```powershell
# Fix the conflicted file

git add <file>
git commit -m "Resolve merge conflict"
git push
```

**Always check `git status` before and after important Git operations.**
## Branches

- `git branch` — List local branches
- `git branch <branch-name>` — Create a branch
- `git switch <branch-name>` — Switch to a branch
- `git switch -c <branch-name>` — Create and switch to a new branch
## Pull Request

A Pull Request is a request to merge changes from one branch into another branch.

Typical workflow:
1. Create a feature branch
2. Make changes
3. Commit changes
4. Push the branch to GitHub
5. Create a Pull Request
6. Review and approve
7. Merge into master