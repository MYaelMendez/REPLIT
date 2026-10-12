import React from 'react';
import {
    ArrowDown,
    ArrowRight,
    ArrowUpRight,
    Bot,
    Check,
    CircleDot,
    GitBranch,
    GitCommitHorizontal,
    GitPullRequest,
    ShieldCheck,
    Workflow
} from 'lucide-react';

const practices = [
    { software: 'Git commits', business: 'Documented decisions', icon: GitCommitHorizontal },
    { software: 'Branches', business: 'Business experiments', icon: GitBranch },
    { software: 'Pull requests', business: 'Proposed operational changes', icon: GitPullRequest },
    { software: 'Code review', business: 'Human authorization', icon: ShieldCheck },
    { software: 'CI / CD', business: 'Governed automation', icon: Workflow },
    { software: 'Releases', business: 'Business milestones', icon: CircleDot }
];

const journey = [
    'PROMPT', 'PLAN', 'REPO', 'BRANCH', 'ACTIONS',
    'DAO', 'DOOLA', 'WITNESS', 'MERGE'
];

export const Opensourceware: React.FC = () => (
    <main className="overflow-hidden">
        <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8 lg:px-12">
            <a href="#top" className="flex items-center gap-3" aria-label="Opensourceware home">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff6b35] text-xl font-black text-[#11120f]">Æ</span>
                <span className="text-sm font-bold tracking-[0.16em]">OPENSOURCEWARE</span>
            </a>
            <nav className="hidden items-center gap-8 text-sm text-[#c5c3ba] md:flex">
                <a className="transition hover:text-white" href="#model">The model</a>
                <a className="transition hover:text-white" href="#workflow">How it works</a>
                <a className="transition hover:text-white" href="#governance">Governance</a>
            </nav>
            <a href="https://doola.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-xs font-semibold transition hover:border-[#ff6b35] hover:text-[#ff9a70] sm:text-sm">
                Form your company <ArrowUpRight size={15} />
            </a>
        </header>

        <section id="top" className="relative mx-auto grid min-h-[680px] max-w-7xl items-center gap-14 px-5 pb-20 pt-14 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:px-12 lg:pb-28 lg:pt-20">
            <div className="pointer-events-none absolute -left-48 top-16 h-96 w-96 rounded-full bg-[#ff6b35]/10 blur-[110px]" />
            <div className="relative z-10">
                <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#ff6b35]/30 bg-[#ff6b35]/10 px-3 py-1.5 text-[10px] font-bold tracking-[0.2em] text-[#ff9a70] sm:text-xs">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#ff6b35]" />
                    Æ · GITHUB-NATIVE AGENTIC ENTREPRENEURSHIP
                </div>
                <h1 className="max-w-3xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] sm:text-7xl lg:text-[5.5rem]">
                    BUILD YOUR BUSINESS <span className="text-[#ff6b35]">LIKE SOFTWARE.</span>
                </h1>
                <p className="mt-7 max-w-xl text-base leading-7 text-[#bbb9b0] sm:text-lg sm:leading-8">
                    Apply technology’s most battle-tested development practices to your business. Turn your repository into the continuously evolving foundation of your organization.
                </p>
                <div className="mt-9 flex flex-wrap items-center gap-4">
                    <a href="#workflow" className="inline-flex items-center gap-3 rounded-full bg-[#ff6b35] px-6 py-3.5 text-sm font-bold text-[#11120f] transition hover:bg-[#ff895d]">
                        Start a business <ArrowRight size={17} />
                    </a>
                    <a href="#model" className="inline-flex items-center gap-2 px-3 py-3 text-sm font-semibold text-[#e4e0d6] transition hover:text-[#ff9a70]">
                        Explore the model <ArrowDown size={15} />
                    </a>
                </div>
                <div className="mt-12 flex items-center gap-3 text-xs text-[#96958e]">
                    <div className="flex -space-x-2">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#10110f] bg-[#373a35] text-xs">✳</span>
                        <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#10110f] bg-[#ff6b35] text-xs text-[#10110f]">Æ</span>
                        <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#10110f] bg-[#d9d3c5] text-xs text-[#10110f]">↗</span>
                    </div>
                    Many agents. <span className="font-semibold text-[#f4f0e7]">One principal.</span>
                </div>
            </div>

            <div className="relative z-10 mx-auto w-full max-w-[520px]">
                <div className="absolute -inset-5 rounded-[2rem] bg-[#ff6b35]/10 blur-3xl" />
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#191a17] shadow-2xl shadow-black/40">
                    <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                        <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#ff6b35]/15 text-[#ff895d]"><GitBranch size={18} /></div>
                            <div>
                                <div className="text-sm font-semibold">your-business / foundation</div>
                                <div className="mt-0.5 text-[10px] tracking-wide text-[#92938c]">PRIVATE REPOSITORY · MAIN</div>
                            </div>
                        </div>
                        <span className="rounded-full border border-[#80c89a]/20 bg-[#80c89a]/10 px-2.5 py-1 text-[9px] font-bold tracking-wider text-[#8bd5a4]">● GOVERNED</span>
                    </div>
                    <div className="grid grid-cols-[50px_1fr]">
                        <div className="flex flex-col items-center border-r border-white/10 py-5 text-[#797b74]">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-[#ff895d]"><GitBranch size={15} /></span>
                            <span className="my-2 h-12 border-l border-dashed border-white/15" />
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5"><GitCommitHorizontal size={15} /></span>
                            <span className="my-2 h-12 border-l border-dashed border-white/15" />
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 text-[#8bd5a4]"><ShieldCheck size={15} /></span>
                        </div>
                        <div className="space-y-4 p-5">
                            <div className="rounded-xl border border-[#ff6b35]/25 bg-[#ff6b35]/[0.06] p-4">
                                <div className="flex items-center justify-between text-[10px] font-bold tracking-wider text-[#ff9a70]"><span>EXPERIMENT / PRICING-V2</span><span>OPEN</span></div>
                                <div className="mt-2 text-sm font-semibold">Test a new pricing model</div>
                                <p className="mt-1 text-xs leading-5 text-[#aaa99f]">Proposal includes assumptions, success criteria, and a rollback plan.</p>
                                <div className="mt-4 flex items-center justify-between">
                                    <div className="flex items-center gap-1.5 text-[10px] text-[#c8c6bd]"><Bot size={13} className="text-[#ff895d]" /> Agent analysis ready</div>
                                    <span className="rounded-full bg-[#ff6b35] px-3 py-1.5 text-[10px] font-bold text-[#11120f]">Review change</span>
                                </div>
                            </div>
                            <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
                                <div className="flex items-center gap-2 text-xs font-semibold"><Check size={14} className="text-[#8bd5a4]" /> Decision recorded</div>
                                <div className="mt-2 pl-[22px] text-[10px] leading-5 text-[#92938c]">Human approval · Receipt verified · Audit trail updated</div>
                            </div>
                            <div className="flex items-center justify-between border-t border-white/10 pt-4 text-[9px] tracking-wider text-[#797b74]">
                                <span>BUSINESS OPERATIONS</span><span>HUMAN-GOVERNED AUTOMATION ↗</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative mt-4 flex justify-between px-1 text-[9px] font-semibold tracking-[0.18em] text-[#73756e]">
                    <span>PROPOSE</span><span>REVIEW</span><span>AUTHORIZE</span><span>VERIFY</span>
                </div>
            </div>
        </section>

        <section id="model" className="border-y border-white/10 bg-[#171815]">
            <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
                <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
                    <div>
                        <div className="text-xs font-bold tracking-[0.22em] text-[#ff895d]">THE INNOVATION</div>
                        <h2 className="mt-4 max-w-lg text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-4xl">The best ideas in software engineering belong in business, too.</h2>
                        <p className="mt-5 max-w-md text-sm leading-7 text-[#aaa99f]">GitHub provides proven development infrastructure. codæmodæ adapts it to business operations—with legal and financial controls kept distinct from software deployment.</p>
                    </div>
                    <div className="overflow-hidden rounded-2xl border border-white/10">
                        <div className="grid grid-cols-2 border-b border-white/10 bg-white/[0.03] px-5 py-3 text-[10px] font-bold tracking-[0.18em] text-[#92938c]">
                            <span>SOFTWARE ENGINEERING</span><span>BUSINESS ENGINEERING</span>
                        </div>
                        {practices.map(({ software, business, icon: Icon }) => (
                            <div key={software} className="grid grid-cols-2 items-center border-b border-white/[0.07] px-5 py-3.5 last:border-0">
                                <span className="flex items-center gap-3 text-sm text-[#c5c3ba]"><Icon size={15} className="text-[#777971]" />{software}</span>
                                <span className="flex items-center gap-3 text-sm font-medium text-[#f4f0e7]"><span className="hidden h-px w-4 bg-[#ff6b35]/60 sm:block" />{business}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>

        <section id="workflow" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div>
                    <div className="text-xs font-bold tracking-[0.22em] text-[#ff895d]">FROM PROMPT TO ENTERPRISE</div>
                    <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">A business with a commit history.</h2>
                </div>
                <p className="max-w-sm text-sm leading-6 text-[#aaa99f]">Fork ideas. Branch strategies. Commit decisions. Automate operations. Verify results.</p>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-9">
                {journey.map((step, index) => (
                    <div key={step} className="relative rounded-xl border border-white/10 bg-[#171815] p-4 sm:p-3">
                        <div className="flex items-center justify-between text-[9px] font-bold tracking-widest text-[#777971]"><span>0{index + 1}</span>{index === 6 && <span className="text-[#ff895d]">LEGAL</span>}</div>
                        <div className={`mt-3 text-sm font-bold tracking-wide ${index === 6 ? 'text-[#ff895d]' : 'text-[#f4f0e7]'}`}>{step}</div>
                        <div className="mt-1 text-[10px] leading-4 text-[#92938c]">{[
                            'Define your vision', 'Engineer your strategy', 'Version your business',
                            'Experiment safely', 'Automate operations', 'Govern your agents',
                            'Form your company', 'Verify results', 'Improve continuously'
                        ][index]}</div>
                    </div>
                ))}
            </div>
        </section>

        <section id="governance" className="border-t border-white/10 bg-[#171815]">
            <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-center lg:px-12 lg:py-24">
                <div>
                    <div className="text-xs font-bold tracking-[0.22em] text-[#ff895d]">THE INSTITUTIONAL PROMISE</div>
                    <h2 className="mt-4 max-w-3xl text-3xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">Your business. Your repository. Your agents. Your future.</h2>
                    <p className="mt-5 max-w-2xl text-sm leading-7 text-[#aaa99f]">From prompt to business plan. From plan to GitHub repository. From repository to an agentic DAO. From concept to legally formed enterprise.</p>
                    <div className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#f4f0e7]"><Bot size={17} className="text-[#ff895d]" /> Many agents. One principal. <span className="mx-1 text-white/20">/</span> Business driven. Human governed.</div>
                </div>
                <a href="https://doola.com" target="_blank" rel="noreferrer" className="inline-flex w-fit items-center gap-3 rounded-full bg-[#f4f0e7] px-6 py-3.5 text-sm font-bold text-[#11120f] transition hover:bg-[#ff895d]">
                    Form your company <ArrowUpRight size={17} />
                </a>
            </div>
        </section>

        <footer className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-7 text-xs text-[#85867f] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
            <div className="flex items-center gap-2 font-bold tracking-[0.14em] text-[#c5c3ba]"><span className="text-[#ff6b35]">Æ</span> OPENSOURCEWARE <span className="font-normal tracking-normal text-[#777971]">· #startabusiness</span></div>
            <div className="flex flex-wrap gap-x-5 gap-y-2">
                <a href="https://æ.store" className="transition hover:text-white">æ.store</a>
                <a href="https://æææ.com" className="transition hover:text-white">æææ.com</a>
                <a href="https://doola.com" target="_blank" rel="noreferrer" className="transition hover:text-white">/doola</a>
                <span>#opensourceware</span><span>#AgenticEngineering</span>
            </div>
        </footer>
    </main>
);
