# Site Spec: Internet Resource Guide
**Course:** English / Technical Communication  
**Author:** Evan Sinocchi  
**Platform:** Penn State WordPress (sites.psu.edu)  
**Assignment:** Internet Resource Guide (Assignment 5)

---

## Purpose Statement

A guide for Penn State freshman CS students who want to use Claude Code to build personal projects that strengthen their resumes. The guide curates six online resources covering the full project-building workflow: ideation, coding, debugging, and showcasing work.

---

## Site Structure

```
Home / Landing Page
├── Table of Contents
├── Front Matter (introduction)
│   ├── What's in This Guide
│   ├── Who This Guide Is For
│   ├── What the Guide Assumes You Know
│   ├── How the Guide Is Organized
│   └── Tips for Using This Guide
├── Section 1: Setting Up Claude Code
│   ├── Resource 1 — Claude Code Official Documentation
│   └── Resource 2 — Andrej Karpathy's CLAUDE.md (GitHub)
├── Section 2: Building Your Project
│   ├── Resource 3 — GitHub Docs
│   └── Resource 4 — impeccable.style
└── Section 3: Showcasing Your Work
    ├── Resource 5 — GitHub (portfolio hosting)
    └── Resource 6 — Penn State Career Services
```

---

## Front Matter Content

### Landing Page
- Title, author, brief hook (1–2 sentences on why this guide exists)
- Clear call to action: "Start with the Front Matter" or "Jump to a Section"

### What's in This Guide
The guide covers six curated online resources selected for their relevance to freshman CS students building personal projects with Claude Code. Resources span tool documentation, coding tutorials, debugging communities, version control, and professional presentation.

### Who This Guide Is For
Penn State freshman CS students who:
- Have completed or are currently taking an introductory programming course
- Want to build personal projects outside of class
- Are looking to add work to a resume or GitHub profile
- Are new to using AI coding tools like Claude Code

### What the Guide Assumes You Know
- Basic programming concepts: variables, functions, loops, conditionals
- Enough familiarity with a terminal to run simple commands
- No prior experience with Claude Code, GitHub, or professional development tools is assumed

### How the Guide Is Organized
Three sections, each covering a stage of the project-building process:
1. **Setting Up Claude Code** — installing the tool, understanding how to configure it, and seeing how an expert actually uses it in practice
2. **Building Your Project** — managing code with Git and using design tools to polish the final product
3. **Showcasing Your Work** — putting finished projects on GitHub and a resume

### Tips for Using This Guide
- If you are completely new, read the Front Matter and start with Section 1
- If you already use Claude Code, jump directly to the section most relevant to where you're stuck
- Each resource abstract answers four questions: what it is, what's in it, why it matters for your project, and how to use it efficiently
- Return to this guide at different stages of your project — different resources will be useful at different times

---

## The Six Resources

### Section 1: Setting Up Claude Code

**Resource 1 — Claude Code Official Documentation**  
URL: https://docs.anthropic.com/en/docs/claude-code  
Category: Professional portal / tool documentation  
Abstract focus: What Claude Code is, how to install and run it in a terminal, how to structure prompts effectively, what kinds of tasks it handles well for a beginner project

**Resource 2 — Andrej Karpathy's Claude Code Skills (GitHub)**  
URL: https://github.com/forrestchang/andrej-karpathy-skills/tree/main  
Category: Sample document / professional reference  
Abstract focus: Karpathy (AI researcher, former OpenAI co-founder and Tesla AI director) has made his Claude Code configuration and skills public. This is a real-world example of how an expert sets up Claude Code for a project — what instructions he gives it, how he scopes its behavior, and what that looks like in practice. Useful for students who want to go beyond the defaults and see how the tool is actually used by a working professional at the frontier of AI.

---

### Section 2: Building Your Project

**Resource 3 — GitHub Docs**  
URL: https://docs.github.com  
Category: Professional portal / institutional documentation  
Abstract focus: Setting up a repository, writing commits, creating a README, connecting a local Claude Code project to GitHub — the version control foundation every project needs

**Resource 4 — impeccable.style**  
URL: https://impeccable.style  
Category: Design Plugin  
Abstract focus: A plugin/tool that helps generate high-quality frontend design. For students building web-based projects, this bridges the gap between functional code and something that actually looks good. Abstract angle: Claude Code writes the logic, impeccable.style helps with the visual layer — how to use both together to build something presentable

**Resource 5 — Superpowers**  
URL: https://www.claudepluginhub.com/plugins/obra-superpowers-2  
Category: Development Plugin  
Abstract focus: A Claude Code plugin (by Jesse/obra) with 14 composable skills covering the full dev lifecycle — brainstorming, planning, TDD, subagent-driven development, code review. 158K+ stars, 3,800+ installs. Stops Claude Code from jumping straight to code without a plan; enforces practices that make a project credible on a resume. NOTE: This brings the total to 7 resources — exceeds the 6-resource assignment requirement; consider swapping one out.

---

### Section 3: Showcasing Your Work

**Resource 6 — GitHub (portfolio hosting)**  
URL: https://github.com  
Category: Professional portal / archive  
Abstract focus: How to use GitHub as a portfolio, what recruiters look for in a student profile, how to pin repositories and write project descriptions that communicate the work clearly

**Resource 7 — Penn State Career Services — Resumes & Cover Letters**  
URL: https://studentaffairs.psu.edu/career/resources/resumes  
Category: Institutional document / professional development  
Abstract focus: How to list a personal project on a CS resume, what to include in the description, Penn State-specific formatting guidance — and why having a GitHub link on the resume matters

---

## Abstract Template (per resource)

Each abstract answers these four questions in order:

1. **What is this?** — Name, type of resource, who runs it
2. **What is in it?** — Content, scope, format of information
3. **How is it relevant?** — Specific to freshman CS students building projects with Claude Code
4. **Tips for using it efficiently** — Specific tactics, not generic advice

Target length per abstract: 150–250 words. Deductive structure: topic sentence first, elaboration and examples after.

---

## Design Notes

- **Style reference:** Evan's portfolio at https://www.esinocchi.me/ — match the aesthetic and tone when making design decisions
- **Navigation:** Fixed top nav with links to each section; section pages link back to Table of Contents
- **Headers/Footers:** Consistent header with guide title and author; footer with date and Penn State affiliation
- **Accessibility:** Alt text on all images, sufficient color contrast, readable font size
- **Each resource page:** consistent layout — title, URL as clickable link, abstract, tips callout box
- **Table of Contents:** two levels (sections and individual resources), linked

---

## Evaluation Checklist (from assignment)

- [ ] 6 resources identified with title and URL
- [ ] Each abstract answers all four required questions
- [ ] Front matter covers all six required areas
- [ ] Abstracts are specific to this audience and purpose (not generic)
- [ ] Abstracts use deductive structure with strong topic sentences
- [ ] Site organized into logical sections with section introductions
- [ ] Design supports navigation and usability
- [ ] Spelling, grammar, punctuation correct
