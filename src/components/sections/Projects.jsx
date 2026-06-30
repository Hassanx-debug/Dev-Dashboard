import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Star, GitFork, GitBranch, Loader } from "lucide-react";

const Github = (props) => (
  <svg
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={props.className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);
import { useGitHub } from "../../hooks/useGitHub";
import { usePortfolio } from "../../context/PortfolioContext";
import SectionLabel from "../ui/SectionLabel";
import GlassCard from "../ui/GlassCard";

function RepoCard({ repo, index }) {
  const lang = repo.language;
  const langColor = {
    JavaScript: "#f7df1e",
    TypeScript: "#3178c6",
    Python: "#3572A5",
    HTML: "#e34c26",
    CSS: "#563d7c",
    default: "var(--cyan)",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -8, transition: { duration: 0.25 } }}
      className="glass rounded-md p-6 group relative overflow-hidden flex flex-col border border-white/5 project-card-hover"
    >
      {/* Animated gradient border on hover */}
      <div className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(0,245,255,0.1), transparent 40%, transparent 60%, rgba(168,85,247,0.1))",
          padding: "1px",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude"
        }}
      />

      {/* Hover bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00f5ff] to-[#a855f7] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

      <div className="flex items-start justify-between mb-3">
        <div className="mono text-[0.65rem] tracking-[2px] text-[#00f5ff] uppercase opacity-55">
          {String(index + 1).padStart(2, "0")}
        </div>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="text-[rgba(232,234,246,0.3)] hover:text-[#00f5ff] transition-all duration-300 hover:scale-110"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      <h3 className="font-semibold text-white mb-2 text-base leading-snug group-hover:text-[#00f5ff] transition-colors duration-300">{repo.name}</h3>
      <p className="text-[rgba(232,234,246,0.5)] text-sm leading-relaxed mb-5 flex-1">
        {repo.description || "No description provided."}
      </p>

      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center gap-1.5">
          {lang && (
            <>
              <span
                className="w-2.5 h-2.5 rounded-full animate-pulse"
                style={{ background: langColor[lang] || langColor.default }}
              />
              <span className="mono text-[0.68rem] text-[rgba(232,234,246,0.5)]">{lang}</span>
            </>
          )}
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 mono text-[0.68rem] text-[rgba(232,234,246,0.4)] group-hover:text-[#00f5ff] transition-colors duration-300">
            <Star className="w-3 h-3" /> {repo.stargazers_count}
          </span>
          <span className="flex items-center gap-1 mono text-[0.68rem] text-[rgba(232,234,246,0.4)] group-hover:text-[#a855f7] transition-colors duration-300">
            <GitFork className="w-3 h-3" /> {repo.forks_count}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function GitHubStats({ user }) {
  if (!user) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass rounded-md p-5 flex items-center justify-between flex-wrap gap-4 mb-10 border border-white/5 bg-white/2"
    >
      <div className="flex items-center gap-3">
        <GitBranch className="w-5 h-5 text-[#00f5ff]" />
        <span className="mono text-sm text-[#00f5ff]">@{user.login}</span>
        <span className="text-[rgba(232,234,246,0.4)] text-sm">— Live GitHub Stream</span>
      </div>
      <div className="flex gap-6">
        {[
          { val: user.public_repos, label: "Repos" },
          { val: user.followers, label: "Followers" },
          { val: user.following, label: "Following" },
        ].map(({ val, label }) => (
          <div key={label} className="text-center">
            <div className="orbitron font-bold text-[#00f5ff] text-lg">{val}</div>
            <div className="mono text-[0.62rem] tracking-[1px] uppercase text-[rgba(232,234,246,0.4)]">{label}</div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { profile = {}, projects = [] } = usePortfolio();
  const { repos = [], user, loading, error } = useGitHub(profile.githubUsername || "torvalds");

  // Sort projects: featured first, then chronological
  const sortedProjects = [...projects].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return b.order - a.order;
  });

  return (
    <section id="projects" className="section-pad px-8 md:px-20 bg-gradient-to-b from-transparent via-[rgba(179,71,234,0.02)] to-transparent">
      <div className="max-w-6xl mx-auto">
        <SectionLabel number="03" label="Projects" />
        
        {/* SECTION 1: Featured CMS Showcase */}
        {sortedProjects.length > 0 && (
          <div className="mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="orbitron text-4xl font-bold text-gradient mb-3"
            >
              Featured Showcase
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[rgba(232,234,246,0.5)] text-[0.95rem] mb-10 max-w-lg"
            >
              Hand-crafted software solutions built with modular architectures and premium interfaces.
            </motion.p>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8">
              {sortedProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -8, transition: { duration: 0.25 } }}
                  className="glass rounded-2xl border border-white/5 overflow-hidden flex flex-col bg-white/2 project-card-hover group"
                >
                  {/* Project number badge */}
                  <div className="absolute top-4 right-4 mono text-[0.65rem] tracking-[2px] text-[#00f5ff] uppercase opacity-55 z-10">
                    {String(idx + 1).padStart(2, "0")}
                  </div>

                  {project.thumbnail && (
                    <div className="h-48 overflow-hidden border-b border-white/5 relative">
                      <img
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 img-zoom"
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[rgba(2,4,8,0.8)] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  )}

                  <div className="p-6 flex flex-col flex-1 gap-4 relative">
                    {/* Animated gradient border */}
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background: "linear-gradient(135deg, rgba(0,245,255,0.15), transparent 40%, transparent 60%, rgba(168,85,247,0.15))",
                        padding: "1px",
                        WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude"
                      }}
                    />

                    <div className="flex items-start justify-between relative z-10">
                      <h3 className="orbitron font-bold text-white text-lg tracking-wide uppercase group-hover:text-[#00f5ff] transition-colors duration-300">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-white/40 hover:text-[#00f5ff] transition-all duration-300 hover:scale-110 hover:rotate-12"
                          >
                            <Github className="w-4.5 h-4.5" />
                          </a>
                        )}
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-white/40 hover:text-[#00f5ff] transition-all duration-300 hover:scale-110 hover:rotate-12"
                          >
                            <ExternalLink className="w-4.5 h-4.5" />
                          </a>
                        )}
                      </div>
                    </div>

                    <p className="text-[rgba(232,234,246,0.6)] text-xs leading-relaxed flex-1 relative z-10">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-2 relative z-10">
                      {project.techStack?.map((tag) => (
                        <span
                          key={tag}
                          className="mono text-[8px] bg-white/5 border border-white/10 text-white/70 px-2 py-1 rounded hover:border-[#00f5ff]/30 hover:text-[#00f5ff] hover:bg-[#00f5ff]/5 transition-all duration-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* SECTION 2: Dynamic Live Repositories */}
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="orbitron text-3xl font-bold text-gradient mb-3"
          >
            Live Repositories
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[rgba(232,234,246,0.5)] text-[0.95rem] mb-10 max-w-lg"
          >
            Direct access channels tracking real-time codebase states and commits via GitHub streams.
          </motion.p>

          <GitHubStats user={user} />

          {loading && (
            <div className="flex flex-col items-center justify-center gap-4 py-20">
              <div className="relative">
                <Loader className="w-8 h-8 animate-spin text-[#00f5ff]" />
                <div className="absolute inset-0 w-8 h-8 rounded-full border-2 border-[#00f5ff]/20 animate-ping" />
              </div>
              <span className="mono text-sm tracking-wider text-[#00f5ff]">Establishing connection to GitHub API...</span>
            </div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-md p-8 text-center border border-white/5"
            >
              <div className="text-[#00f5ff] mb-3">
                <GitBranch className="w-12 h-12 mx-auto opacity-50" />
              </div>
              <p className="text-[rgba(232,234,246,0.5)] mono text-xs">
                Stream disconnected. Configure your GitHub username in the CMS.
              </p>
            </motion.div>
          )}

          {!loading && !error && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {repos.slice(0, 6).map((repo, i) => (
                <RepoCard key={repo.id} repo={repo} index={i} />
              ))}
            </div>
          )}

          {!loading && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <a
                href={profile.github || `https://github.com/${profile.githubUsername}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 mono text-[0.8rem] tracking-[2px] uppercase px-6 py-3 border border-[#00f5ff]/25 text-[#00f5ff] hover:bg-[#00f5ff]/5 rounded-sm transition-all cursor-pointer"
              >
                <GitBranch className="w-4 h-4" /> View All on GitHub
              </a>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
