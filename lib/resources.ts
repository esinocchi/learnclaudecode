export interface Resource {
  slug: string;
  title: string;
  url: string;
  displayUrl: string;
  category: string;
  sectionId: string;
  sectionNumber: string;
  teaser: string;
  abstract: {
    what: string;
    content: string;
    relevance: string;
    tips: string;
  };
  nextStep: string;
}

export interface Section {
  id: string;
  number: string;
  title: string;
  intro: string;
}

export const sections: Section[] = [
  {
    id: "section-1",
    number: "01",
    title: "Setting Up Claude Code",
    intro:
      "Before building anything, understand the tool. These two resources cover the official documentation for setup and prompting, and a firsthand look at how a working AI researcher actually uses it.",
  },
  {
    id: "section-2",
    number: "02",
    title: "Building Your Project",
    intro:
      "Code is only part of a project. These two resources cover frontend design and professional development workflow, the pieces that determine whether your project looks and functions like it was built with intention.",
  },
  {
    id: "section-3",
    number: "03",
    title: "Showcasing Your Work",
    intro:
      "Finishing a project is not the same as having one that works for you. These two resources cover how to present your work on GitHub and how to put it on a resume in a way that reads clearly to employers.",
  },
];

export const resources: Resource[] = [
  {
    slug: "claude-code-docs",
    title: "Claude Code Official Documentation",
    url: "https://docs.anthropic.com/en/docs/claude-code",
    displayUrl: "docs.anthropic.com/en/docs/claude-code",
    category: "Tool Documentation",
    sectionId: "section-1",
    sectionNumber: "01",
    teaser:
      "The official starting point for Claude Code. Covers installation, prompt structure, and command reference, and tells you honestly where the tool falls short.",
    abstract: {
      what: "The primary reference for Claude Code, maintained by Anthropic. Covers installation, prompt strategies, command-line interface (CLI) commands, and workflow integrations. Authoritative and regularly updated.",
      content:
        "Organized into a quickstart, a prompt-writing guide, a full command reference, and workflow integration guides. There is also a section on what Claude Code handles well versus where it struggles, which is worth reading before you start.",
      relevance:
        "Claude Code is not intuitive by default. It requires learning how to scope requests effectively. The documentation explains that a specific prompt like \"add a function that reads a CSV and returns the column names\" produces far better results than \"build my project.\" Understanding that distinction before you start saves time and produces better output. The quickstart alone gets you running in under thirty minutes.",
      tips:
        "Read the quickstart, get it running, build something small. Return to specific sections as questions come up. The prompt structure section is the most useful part for a beginner. Read it carefully and keep notes nearby while you work. Most unexpected outputs from Claude Code trace back to a prompt that was vague or missing project context.",
    },
    nextStep: "Open the Quickstart and follow it end to end. About thirty minutes.",
  },
  {
    slug: "karpathy-claude-skills",
    title: "Andrej Karpathy's Claude Code Skills",
    url: "https://github.com/forrestchang/andrej-karpathy-skills/tree/main",
    displayUrl: "github.com/forrestchang/andrej-karpathy-skills",
    category: "Professional Reference",
    sectionId: "section-1",
    sectionNumber: "01",
    teaser:
      "Andrej Karpathy, AI researcher and former OpenAI co-founder, has made his Claude Code configuration public. This is what expert usage looks like in practice.",
    abstract: {
      what: "A GitHub repository compiled by community member forrestchang, containing the Claude Code configurations Karpathy has shared publicly. Karpathy co-founded OpenAI, led Tesla Autopilot's artificial intelligence (AI) work, and is an active Claude Code user who is transparent about how he works. These configurations are a direct look at how an expert structures AI-assisted development.",
      content:
        "Contains CLAUDE.md files, the project-level instruction files that tell Claude Code how to behave in a specific project, along with skill definitions and prompt configurations. The files are sparse: short, direct sentences covering constraints, conventions, and task scope. No decoration, just function.",
      relevance:
        "For a Penn State student new to Claude Code, seeing how an expert uses the tool teaches more than the documentation alone. The CLAUDE.md file is the most underused Claude Code feature for first-time users, and Karpathy's examples show why it matters. A well-written CLAUDE.md changes the quality of everything Claude generates for your project. Even four or five adapted lines will produce noticeably better results than running Claude Code without one.",
      tips:
        "Read the CLAUDE.md files before anything else in the repository. Notice the structure: short imperative sentences stating constraints and conventions without explanation. Open a blank file in your own project and add three or four lines covering what language you use, what Claude should never change, and what conventions matter. That is enough to see an immediate improvement. Do not copy Karpathy's files directly. Understand why each instruction is there and keep only what applies to your project.",
    },
    nextStep: "Read one CLAUDE.md file, then write a four-line CLAUDE.md for your own project.",
  },
  {
    slug: "impeccable-style",
    title: "impeccable.style",
    url: "https://impeccable.style",
    displayUrl: "impeccable.style",
    category: "Design Plugin",
    sectionId: "section-2",
    sectionNumber: "02",
    teaser:
      "Claude Code generates functional code by default. impeccable.style adds design intelligence to that process, so your frontend does not look like every other AI-generated interface.",
    abstract: {
      what: "A plugin for Claude Code that provides design intelligence for frontend development. It targets the most common failure modes of AI-generated interfaces: generic typography, flat color palettes, templated layouts, and interaction patterns that look assembled rather than designed.",
      content:
        "Operates through named commands. The core flow is a teach phase that establishes design context for your specific project (audience, tone, aesthetic direction), a craft command that builds a complete feature from that brief, and refinement commands for typography, layout, color, animation, and polish. Internally, the plugin enforces rules drawn from professional frontend practice, including specific bans on patterns that appear in most AI-generated UIs.",
      relevance:
        "How a project looks matters when you are submitting it on a resume. A considered interface reads differently than the same logic in a generic template. impeccable.style closes that gap by encoding design knowledge into Claude Code's workflow. You can focus on the project logic while the visual layer stays professional. It removes a barrier that would otherwise take years of frontend experience to clear.",
      tips:
        "Run /impeccable teach before building any frontend component. This creates a .impeccable.md file that records your project's audience, tone, and aesthetic direction. Claude Code uses this file to make decisions specific to your project instead of defaulting to generic patterns. Use /impeccable craft when building a page or component. If the result looks off, /polish handles a final quality pass.",
    },
    nextStep: "Install the plugin and run /impeccable teach in any project to set design context.",
  },
  {
    slug: "superpowers",
    title: "Superpowers",
    url: "https://www.claudepluginhub.com/plugins/obra-superpowers-2",
    displayUrl: "claudepluginhub.com/plugins/obra-superpowers-2",
    category: "Development Plugin",
    sectionId: "section-2",
    sectionNumber: "02",
    teaser:
      "Claude Code defaults to writing code immediately. Superpowers changes that, enforcing planning, testing, and review as part of the workflow before a line of code is written.",
    abstract: {
      what: "A plugin for Claude Code created by Jesse (obra) and distributed through the Claude Plugin Hub. A collection of 14 composable skills that guide Claude Code through professional development practices: planning before coding, test-driven development, systematic debugging, and code review. One of the most widely adopted plugins in the ecosystem.",
      content:
        "Covers the full development lifecycle through discrete, composable skills. Brainstorming refines rough ideas before any code is written. Writing plans breaks features into reviewable tasks. Git worktrees isolate work on separate branches so nothing breaks unexpectedly. Test-driven development (TDD) enforces the red-green-refactor cycle: write the test first, make it pass, then clean up the code. A code-review skill validates finished work against the original plan. A SessionStart hook activates workflows automatically at the start of each session. Supports TypeScript, JavaScript, Python, Git, and Bash.",
      relevance:
        "The main challenge beginners face with Claude Code is not getting it to generate code, it is getting it to generate good code in a structured way. Without guidance, Claude Code skips planning and produces output that works once but is hard to change or explain. Superpowers enforces the practices professionals use: think before you code, plan before you implement, test as you go. For a student building a resume project, this means a commit history showing deliberate development, tested code, and structure that can be explained in an interview.",
      tips:
        "Skills activate based on context, so let the plugin run. When starting a new feature, describe what you want to build. The brainstorming skill guides you through refining the idea before any implementation begins. If you are new to test-driven development, the TDD skill is the lowest-friction way to learn the practice on real code: write the test first, then make it pass. Do not skip the planning step. The plan keeps Claude Code focused and prevents it from drifting into unrelated changes.",
    },
    nextStep: "Install Superpowers and start your next feature with the brainstorming skill.",
  },
  {
    slug: "github-portfolio",
    title: "GitHub",
    url: "https://github.com",
    displayUrl: "github.com",
    category: "Portfolio Platform",
    sectionId: "section-3",
    sectionNumber: "03",
    teaser:
      "GitHub is the standard developer portfolio. Two or three well-documented projects with consistent commit activity tells a hiring manager more than a resume bullet ever will.",
    abstract: {
      what: "The world's largest platform for hosting, sharing, and collaborating on software. A GitHub profile is a public record of your work: what you build, how often you build, and how you present it to others.",
      content:
        "A profile includes a bio, a contribution graph showing commit activity over the past year, the ability to pin up to six repositories, and a feed of recent public activity. Each repository can include a README, description, topic tags, a live demo link, and a license. GitHub Pages provides free static site hosting for any public repository, which is particularly useful for deploying web-based projects built with Claude Code.",
      relevance:
        "Recruiters interviewing Penn State CS students check GitHub profiles before the interview. A profile with documented projects shows that you can build things, understand version control, and explain your work. A profile with no activity, or with repositories that have no README, communicates the opposite. The projects you build with Claude Code belong on GitHub, presented in a way that reads clearly to a hiring manager.",
      tips:
        "Pin your two or three best projects. Write a README for each that answers three questions: what it does, how to run it, and what you decided while building it. Link to a live demo if there is one. Add a brief bio mentioning Penn State and your intended major, and include a LinkedIn link if you have one. Commit regularly as you build. A history showing a project evolving over several days is more credible than a single large commit.",
    },
    nextStep: "Pin two or three repositories on your profile and write a README for each.",
  },
  {
    slug: "penn-state-career-services",
    title: "Penn State Career Services, Resumes",
    url: "https://studentaffairs.psu.edu/career/resources/resumes",
    displayUrl: "studentaffairs.psu.edu/career/resources/resumes",
    category: "Institutional Resource",
    sectionId: "section-3",
    sectionNumber: "03",
    teaser:
      "A project only helps your resume if you know how to represent it. Penn State Career Services provides guidance calibrated to what employers hiring Penn State students actually expect.",
    abstract: {
      what: "Penn State's centralized professional development resource, maintained by Student Affairs. The resumes section covers format, content, and tailoring for different application types, with templates and sample resumes specific to Penn State students at different stages of their academic career. Career Services also offers walk-in reviews, scheduled appointments, and a virtual review tool at University Park.",
      content:
        "Includes downloadable templates formatted to Penn State standards, annotated sample resumes for CS and engineering students, guidance on bullet structure using the accomplishment format (action verb, task, result), instructions for listing technical projects and skills, and advice on tailoring a resume for different applications. Updated regularly to reflect current employer expectations in the mid-Atlantic and Northeast markets where most Penn State graduates are recruited.",
      relevance:
        "A Claude Code project on GitHub does not help your resume unless you know how to present it. Career Services provides guidance specific to what Penn State recruiters expect: the formatting conventions, the language, the level of detail. For a freshman, the most useful part is the guidance on listing projects: where they go, how many bullets they warrant, and what to include. \"Built a personal finance tracker using Python and Claude Code that categorizes transactions and generates monthly spending summaries; deployed via Streamlit\" is a much stronger entry than \"Built a personal finance tracker in Python.\"",
      tips:
        "Use the Projects section of your resume, do not bury project work in Other Experience. Write one bullet on what the project does and one on the technologies and decisions involved. Always include the GitHub link. If Career Services offers review appointments at your campus, book one after finishing your first project. A single twenty-minute review improves every resume you write afterward. Check their events calendar at the start of each semester for CS-specific workshops.",
    },
    nextStep: "Download the CS resume template and add a Projects section with one entry.",
  },
];

export function getResourceBySlug(slug: string): Resource | undefined {
  return resources.find((r) => r.slug === slug);
}

export function getResourcesBySection(sectionId: string): Resource[] {
  return resources.filter((r) => r.sectionId === sectionId);
}

export function getSectionById(id: string): Section | undefined {
  return sections.find((s) => s.id === id);
}
