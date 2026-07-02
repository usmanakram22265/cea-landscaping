# Memory Bank Rules

This project keeps its memory in a `memory-bank/` folder so any session — including a
different model like GLM — can pick up where the last one stopped, without re-explaining.

## Setup (do this if the memory bank isn't there yet)
If the `memory-bank/` folder doesn't exist, create it with these files:
- `progress.md` → "# Progress" + "Last updated: [date]" + Current State / Next action / Next steps
- `project.md` → "# Project" + What it is / Stack / Conventions / Don't touch
- `decisions.md` → "# Decisions" (add-only, newest on top, dated)
- `gotchas.md` → "# Gotchas" (add-only, newest on top, dated)
- `glossary.md` → "# Glossary" (terms and what they mean)
- `sessions/` → one dated file per session

## When I say "read memory" (or "read memory bank")
1. Read `progress.md` first — it tells you where we are and what to do next.
2. Read `project.md` — the stack and the rules.
3. Skim the newest few entries in `decisions.md` and `gotchas.md`.
4. Only open `sessions/` or older history if you need a specific past detail — don't load all of it.
5. In one or two short lines, tell me where we are and what the next step is, so I know the memory loaded correctly.
Use these files to get up to speed. Do NOT re-read the whole codebase to rebuild context.
If a note disagrees with the actual code, trust the code and fix the note.

## How the memory is organized (two kinds of files)
Live files (kept short, rewritten to stay current):
- `progress.md` — where we are right now: current state, the exact next action, and what's left.
- `project.md` — what we're building, the tech stack, conventions, and what NOT to touch.
- `glossary.md` — project-specific names, terms, client details, IDs (optional, add if useful).

History files (only ever added to, never deleted — the permanent record):
- `decisions.md` — every real choice and why we made it.
- `gotchas.md` — mistakes, failed attempts, bugs, and tricky behavior: what went wrong, why, and what to do instead — so neither you nor a future model repeats it.
- `sessions/` — a short summary of each work session.

The live files stay small so reading is fast. The history files keep everything forever
so nothing is ever lost.

## While working — save on your own, without being asked
After you finish a complete, working piece of work, update the memory right away:
- Done and working → update Current State and the Next action in `progress.md`.
- Agreed what comes next → update Next steps in `progress.md`.
- Made a real choice (library, structure, approach) → add a dated line to `decisions.md`.
- Fixed a bug or hit a quirk → add a dated line to `gotchas.md` (problem → cause → fix).
- Tried something that didn't work, or made a mistake → add a dated line to `gotchas.md`: what you tried, why it failed, and what to do instead. Save it even if you later found a way that works, so it's never retried.
- Stack or a rule changed → update `project.md`.
- New name/term/client detail came up → add it to `glossary.md`.
Rewrite `progress.md` to stay current (replace the old state, don't pile up duplicates).
`decisions.md`, `gotchas.md`, and `sessions/` are only ever added to.

## When to save
Save the memory in BOTH of these cases:
1. On your own — every time a complete piece of work is finished and working, without being asked.
2. Whenever I say "update" (or "save") — immediately go through ALL the memory files and bring
   every one up to date: `progress.md`, `decisions.md`, `gotchas.md`, `project.md`, `glossary.md`,
   and add a `sessions/` entry. Don't skip any file — refresh everything that changed since the last save.

## Remember mistakes so they aren't repeated
Whenever an approach fails, an assumption turns out wrong, or you make a mistake —
even if you fix it afterward — write it in `gotchas.md`: what was wrong, and what
works instead. The goal is that you, or any future model, never waste time repeating
the same mistake.
Example: "Tried Lenis + GSAP pin together — broke scroll; fix: init Lenis before ScrollTrigger."

## The most important rule (because I rewind unfinished work)
Only ever save work that is finished and working. Never write down half-done, in-progress,
or unverified work. If I hit a limit mid-task, I rewind the code back to the last finished
point — so the memory must always match that last finished, working state. If you're not
sure something is fully done, don't save it yet.

## Never lose history
- `decisions.md`, `gotchas.md`, and `sessions/` are add-only. Never edit or delete an old entry.
- If an old decision changes, add a NEW dated line and mark the old one "(changed on [date])". Keep both.
- Date every history entry, newest on top.
- When you rename or refactor something, fix the matching note in the live files in the same edit (never touch history).

## Keep it light and fast
- Keep `progress.md` under about 150 lines. It's a status, not a diary.
- Summarize in your own words. Don't paste long blocks of text or code.
- If `decisions.md` or `gotchas.md` gets very long, move the older entries into `sessions/` (move, never delete) and leave the recent ones.

## Write so a different model can continue
Assume the next session may be a different, weaker model with none of this conversation's
memory. Write notes that stand on their own. Don't refer to things only understandable from
the current chat ("the thing we discussed", "as above"). Spell out enough that a fresh model
understands it cold.

## Always keep a clear stopping point
`progress.md` must always contain:
- Current State — what is built and working now.
- Next action — the single, exact next thing to do.
- Next steps — anything after that.
This is what lets a new session resume precisely. Keep the Next action accurate at all times.

## When the context is getting full, or before the session ends
This is the handoff moment (often right when my limit is about to hit):
1. Write a short dated summary into `sessions/[today's date].md` — what we did, what changed, where we stopped, what's next.
2. Make sure `progress.md` is fully up to date, especially the Next action.
Then the next session (even GLM) can read the memory and continue with nothing lost.

## Keep it safe
Never write secrets into these files — no passwords, API keys, tokens, or private client
data.

## Don't upload to git
Do not commit the `memory-bank/` folder to git. Add `memory-bank/` to `.gitignore`.
If `.gitignore` doesn't exist, create it and add that line. This memory is local only —
keep it out of commits, pull requests, and anything shared.

## Keep it tidy over time
Now and then, clean up: pull important lessons from the logs up into the live files, archive
old entries, and trim clutter from the live files (history stays untouched). Memory should
stay small and accurate, not bloated.