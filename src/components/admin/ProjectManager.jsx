import React, { useState } from "react";
import { Save, Edit2, Trash2 } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";
import AnimatedButton from "../ui/AnimatedButton";

export default function ProjectManager() {
  const { projects = [], dispatch } = usePortfolio();
  const [editingId, setEditingId] = useState(null);
  
  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStackInput, setTechStackInput] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [featured, setFeatured] = useState(false);

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setTechStackInput("");
    setLiveUrl("");
    setGithubUrl("");
    setThumbnail("");
    setFeatured(false);
  };

  const handleEdit = (project) => {
    setEditingId(project.id);
    setTitle(project.title || "");
    setDescription(project.description || "");
    setTechStackInput(project.techStack?.join(", ") || "");
    setLiveUrl(project.liveUrl || "");
    setGithubUrl(project.githubUrl || "");
    setThumbnail(project.thumbnail || "");
    setFeatured(!!project.featured);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const techStack = techStackInput
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    const projectData = {
      title,
      description,
      techStack,
      liveUrl,
      githubUrl,
      thumbnail,
      featured,
      updatedAt: new Date().toISOString(),
    };

    if (editingId) {
      dispatch({
        type: "UPDATE_ITEM",
        field: "projects",
        id: editingId,
        payload: projectData,
      });
    } else {
      dispatch({
        type: "ADD_ITEM",
        field: "projects",
        payload: {
          id: crypto.randomUUID?.() || Math.random().toString(36).substring(2, 11),
          ...projectData,
          createdAt: new Date().toISOString(),
          order: projects.length,
        },
      });
    }
    resetForm();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      dispatch({ type: "REMOVE_ITEM", field: "projects", id });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-white max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
      {/* Editor Form */}
      <div className="glass p-6 rounded-xl border border-white/5 bg-white/2 flex flex-col gap-4">
        <h4 className="orbitron text-xs font-bold tracking-widest text-[#00f5ff] uppercase mb-2">
          {editingId ? "Modify Project" : "Add New Project"}
        </h4>
        
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="mono text-[10px] text-white/50 uppercase tracking-wider">Project Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="bg-black/30 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00f5ff]"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="mono text-[10px] text-white/50 uppercase tracking-wider">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="bg-black/30 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00f5ff] w-full"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="mono text-[10px] text-white/50 uppercase tracking-wider">Tech Stack (comma-separated)</label>
            <input
              type="text"
              value={techStackInput}
              onChange={(e) => setTechStackInput(e.target.value)}
              placeholder="React, Express, MongoDB, Node"
              className="bg-black/30 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00f5ff]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="mono text-[10px] text-white/50 uppercase tracking-wider">Live URL</label>
              <input
                type="text"
                value={liveUrl}
                onChange={(e) => setLiveUrl(e.target.value)}
                className="bg-black/30 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00f5ff]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="mono text-[10px] text-white/50 uppercase tracking-wider">GitHub URL</label>
              <input
                type="text"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="bg-black/30 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00f5ff]"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="mono text-[10px] text-white/50 uppercase tracking-wider">Thumbnail Image URL</label>
            <input
              type="text"
              value={thumbnail}
              onChange={(e) => setThumbnail(e.target.value)}
              placeholder="e.g. /projects/myproject.jpg"
              className="bg-black/30 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00f5ff]"
            />
          </div>

          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              id="featured"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="rounded bg-black/30 border-white/10 text-[#00f5ff] focus:ring-0"
            />
            <label htmlFor="featured" className="mono text-[10px] text-white/70 uppercase cursor-pointer select-none">
              Featured Project (shows at top)
            </label>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <AnimatedButton type="submit" variant="primary" className="flex-1 py-2">
              <Save className="w-3.5 h-3.5" /> {editingId ? "Update" : "Add Project"}
            </AnimatedButton>
            {editingId && (
              <AnimatedButton onClick={resetForm} variant="secondary" className="px-3 py-2">
                Cancel
              </AnimatedButton>
            )}
          </div>
        </form>
      </div>

      {/* Projects List */}
      <div className="flex flex-col gap-3">
        <h4 className="orbitron text-xs font-bold tracking-widest text-[#a855f7] uppercase mb-1">
          Existing Showcase ({projects.length})
        </h4>
        <div className="flex flex-col gap-3 max-h-[50vh] overflow-y-auto pr-1 custom-scrollbar">
          {projects.length === 0 ? (
            <p className="mono text-xs text-white/40 text-center py-8">No projects currently loaded.</p>
          ) : (
            projects.map((project) => (
              <div
                key={project.id}
                className="glass rounded-xl p-4 border border-white/5 flex items-center justify-between gap-4"
              >
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="orbitron text-xs font-bold text-white truncate block">
                    {project.title}
                  </span>
                  <span className="mono text-[9px] text-white/50 truncate block max-w-[200px]">
                    {project.techStack?.join(", ")}
                  </span>
                  {project.featured && (
                    <span className="mono text-[8px] bg-[#00f5ff]/10 text-[#00f5ff] px-1.5 py-0.5 rounded border border-[#00f5ff]/20 self-start mt-1">
                      FEATURED
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => handleEdit(project)}
                    className="p-1.5 text-white/60 hover:text-[#00f5ff] hover:bg-white/5 rounded transition-all cursor-pointer"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-1.5 text-white/60 hover:text-red-400 hover:bg-red-500/10 rounded transition-all cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
