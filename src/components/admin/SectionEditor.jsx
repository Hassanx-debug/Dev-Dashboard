import React, { useState } from "react";
import { Plus, Trash2, Edit2, Save } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";
import AnimatedButton from "../ui/AnimatedButton";

export default function SectionEditor() {
  const portfolio = usePortfolio();
  const { dispatch } = portfolio;
  const [activeTab, setActiveTab] = useState("experience");
  const [editingId, setEditingId] = useState(null);

  // Dynamic state values
  const [formFields, setFormFields] = useState({});

  const tabs = [
    { id: "experience", label: "Experience" },
    { id: "certifications", label: "Certs & Achievements" },
    { id: "services", label: "Services" },
    { id: "skills", label: "Skills" },
    { id: "testimonials", label: "Testimonials" },
    { id: "blog", label: "Blog" },
  ];

  // Retrieve active items
  const items = portfolio[activeTab] || [];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setEditingId(null);
    setFormFields({});
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    const fields = { ...item };
    // Flatten lists if any
    if (Array.isArray(fields.items)) fields.items = fields.items.join(", ");
    if (Array.isArray(fields.techUsed)) fields.techUsed = fields.techUsed.join(", ");
    setFormFields(fields);
  };

  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete this ${activeTab} item?`)) {
      dispatch({ type: "REMOVE_ITEM", field: activeTab, id });
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const prepared = { ...formFields };

    // Format list fields
    if (typeof prepared.items === "string") {
      prepared.items = prepared.items.split(",").map((s) => s.trim()).filter(Boolean);
    }
    if (typeof prepared.techUsed === "string") {
      prepared.techUsed = prepared.techUsed.split(",").map((s) => s.trim()).filter(Boolean);
    }

    if (editingId) {
      dispatch({
        type: "UPDATE_ITEM",
        field: activeTab,
        id: editingId,
        payload: prepared,
      });
    } else {
      dispatch({
        type: "ADD_ITEM",
        field: activeTab,
        payload: {
          id: crypto.randomUUID?.() || Math.random().toString(36).substring(2, 11),
          order: items.length,
          ...prepared,
        },
      });
    }
    setEditingId(null);
    setFormFields({});
  };

  const updateField = (key, value) => {
    setFormFields((prev) => ({ ...prev, [key]: value }));
  };

  // Render fields dynamically based on tab
  const renderFormFields = () => {
    switch (activeTab) {
      case "experience":
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="mono text-[9px] text-white/50 uppercase tracking-wider">Company</label>
                <input
                  type="text"
                  value={formFields.company || ""}
                  onChange={(e) => updateField("company", e.target.value)}
                  required
                  className="bg-black/30 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00f5ff]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="mono text-[9px] text-white/50 uppercase tracking-wider">Role</label>
                <input
                  type="text"
                  value={formFields.role || ""}
                  onChange={(e) => updateField("role", e.target.value)}
                  required
                  className="bg-black/30 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00f5ff]"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="mono text-[9px] text-white/50 uppercase tracking-wider">Start Date</label>
                <input
                  type="text"
                  value={formFields.startDate || ""}
                  onChange={(e) => updateField("startDate", e.target.value)}
                  placeholder="e.g. 2024"
                  required
                  className="bg-black/30 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00f5ff]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="mono text-[9px] text-white/50 uppercase tracking-wider">End Date</label>
                <input
                  type="text"
                  value={formFields.endDate || ""}
                  onChange={(e) => updateField("endDate", e.target.value)}
                  placeholder="e.g. Present"
                  required
                  className="bg-black/30 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00f5ff]"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="mono text-[9px] text-white/50 uppercase tracking-wider">Description</label>
              <textarea
                value={formFields.description || ""}
                onChange={(e) => updateField("description", e.target.value)}
                rows={3}
                required
                className="bg-black/30 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00f5ff] w-full"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="mono text-[9px] text-white/50 uppercase tracking-wider">Tech Used (comma-separated)</label>
              <input
                type="text"
                value={formFields.techUsed || ""}
                onChange={(e) => updateField("techUsed", e.target.value)}
                placeholder="React, Express, MongoDB"
                className="bg-black/30 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00f5ff]"
              />
            </div>
          </>
        );

      case "certifications":
        return (
          <>
            <div className="flex flex-col gap-1">
              <label className="mono text-[9px] text-white/50 uppercase tracking-wider">Certification Title</label>
              <input
                type="text"
                value={formFields.title || ""}
                onChange={(e) => updateField("title", e.target.value)}
                required
                className="bg-black/30 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00f5ff]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="mono text-[9px] text-white/50 uppercase tracking-wider">Issuer</label>
                <input
                  type="text"
                  value={formFields.issuer || ""}
                  onChange={(e) => updateField("issuer", e.target.value)}
                  required
                  className="bg-black/30 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00f5ff]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="mono text-[9px] text-white/50 uppercase tracking-wider">Date Issued</label>
                <input
                  type="text"
                  value={formFields.date || ""}
                  onChange={(e) => updateField("date", e.target.value)}
                  placeholder="e.g. Oct 2025"
                  required
                  className="bg-black/30 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00f5ff]"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="mono text-[9px] text-white/50 uppercase tracking-wider">Credential Link (URL)</label>
              <input
                type="text"
                value={formFields.credentialLink || ""}
                onChange={(e) => updateField("credentialLink", e.target.value)}
                className="bg-black/30 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00f5ff]"
              />
            </div>
          </>
        );

      case "services":
        return (
          <>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-1">
                <label className="mono text-[9px] text-white/50 uppercase tracking-wider">Number</label>
                <input
                  type="text"
                  value={formFields.num || ""}
                  onChange={(e) => updateField("num", e.target.value)}
                  placeholder="e.g. 01"
                  required
                  className="bg-black/30 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00f5ff]"
                />
              </div>
              <div className="col-span-2 flex flex-col gap-1">
                <label className="mono text-[9px] text-white/50 uppercase tracking-wider">Service Title</label>
                <input
                  type="text"
                  value={formFields.title || ""}
                  onChange={(e) => updateField("title", e.target.value)}
                  required
                  className="bg-black/30 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00f5ff]"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="mono text-[9px] text-white/50 uppercase tracking-wider">Description</label>
              <textarea
                value={formFields.desc || ""}
                onChange={(e) => updateField("desc", e.target.value)}
                rows={3}
                required
                className="bg-black/30 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00f5ff] w-full"
              />
            </div>
          </>
        );

      case "skills":
        return (
          <>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-1">
                <label className="mono text-[9px] text-white/50 uppercase tracking-wider">Icon</label>
                <input
                  type="text"
                  value={formFields.icon || ""}
                  onChange={(e) => updateField("icon", e.target.value)}
                  placeholder="e.g. ⚛️"
                  required
                  className="bg-black/30 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00f5ff]"
                />
              </div>
              <div className="col-span-2 flex flex-col gap-1">
                <label className="mono text-[9px] text-white/50 uppercase tracking-wider">Category Name</label>
                <input
                  type="text"
                  value={formFields.category || ""}
                  onChange={(e) => updateField("category", e.target.value)}
                  required
                  className="bg-black/30 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00f5ff]"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="mono text-[9px] text-white/50 uppercase tracking-wider">Color Style</label>
              <select
                value={formFields.color || "cyan"}
                onChange={(e) => updateField("color", e.target.value)}
                className="bg-black/30 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00f5ff]"
              >
                <option value="cyan">Cyan Glow</option>
                <option value="purple">Purple Glow</option>
                <option value="gold">Gold Glow</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="mono text-[9px] text-white/50 uppercase tracking-wider">Skills (comma-separated list)</label>
              <input
                type="text"
                value={formFields.items || ""}
                onChange={(e) => updateField("items", e.target.value)}
                placeholder="React, Vue, HTML, Tailwind"
                required
                className="bg-black/30 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00f5ff]"
              />
            </div>
          </>
        );

      case "testimonials":
        return (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="mono text-[9px] text-white/50 uppercase tracking-wider">Author Name</label>
                <input
                  type="text"
                  value={formFields.authorName || ""}
                  onChange={(e) => updateField("authorName", e.target.value)}
                  required
                  className="bg-black/30 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00f5ff]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="mono text-[9px] text-white/50 uppercase tracking-wider">Author Role</label>
                <input
                  type="text"
                  value={formFields.authorRole || ""}
                  onChange={(e) => updateField("authorRole", e.target.value)}
                  required
                  className="bg-black/30 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00f5ff]"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="mono text-[9px] text-white/50 uppercase tracking-wider">Quote</label>
              <textarea
                value={formFields.quote || ""}
                onChange={(e) => updateField("quote", e.target.value)}
                rows={3}
                required
                className="bg-black/30 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00f5ff] w-full"
              />
            </div>
          </>
        );

      case "blog":
        return (
          <>
            <div className="flex flex-col gap-1">
              <label className="mono text-[9px] text-white/50 uppercase tracking-wider">Post Title</label>
              <input
                type="text"
                value={formFields.title || ""}
                onChange={(e) => updateField("title", e.target.value)}
                required
                className="bg-black/30 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00f5ff]"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="mono text-[9px] text-white/50 uppercase tracking-wider">Publish Date</label>
                <input
                  type="text"
                  value={formFields.date || ""}
                  onChange={(e) => updateField("date", e.target.value)}
                  placeholder="e.g. May 2026"
                  required
                  className="bg-black/30 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00f5ff]"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="mono text-[9px] text-white/50 uppercase tracking-wider">Read Time</label>
                <input
                  type="text"
                  value={formFields.readTime || ""}
                  onChange={(e) => updateField("readTime", e.target.value)}
                  placeholder="e.g. 5 min read"
                  required
                  className="bg-black/30 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00f5ff]"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="mono text-[9px] text-white/50 uppercase tracking-wider">Excerpt / Summary</label>
              <input
                type="text"
                value={formFields.excerpt || ""}
                onChange={(e) => updateField("excerpt", e.target.value)}
                required
                className="bg-black/30 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00f5ff]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="mono text-[9px] text-white/50 uppercase tracking-wider">External Link (Medium, Dev.to)</label>
              <input
                type="text"
                value={formFields.link || ""}
                onChange={(e) => updateField("link", e.target.value)}
                required
                className="bg-black/30 border border-white/10 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#00f5ff]"
              />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  const getItemDisplayName = (item) => {
    return item.title || item.role || item.category || item.authorName || `Item #${item.id?.substring(0, 5)}`;
  };

  const getItemSubName = (item) => {
    return item.company || item.issuer || item.items?.join(", ") || item.authorRole || item.excerpt || "";
  };

  return (
    <div className="flex flex-col gap-6 text-white max-h-[75vh] overflow-y-auto pr-2 custom-scrollbar">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`px-4 py-2 rounded-lg mono text-[10px] tracking-wider uppercase font-bold transition-all cursor-pointer ${
              activeTab === tab.id
                ? "bg-[#00f5ff]/10 border border-[#00f5ff]/30 text-[#00f5ff]"
                : "border border-transparent text-white/55 hover:bg-white/5 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Editor & List Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="glass p-6 rounded-xl border border-white/5 bg-white/2 flex flex-col gap-4 self-start">
          <h4 className="orbitron text-xs font-bold tracking-widest text-[#00f5ff] uppercase">
            {editingId ? "Update Data Node" : "Register Data Node"}
          </h4>

          <form onSubmit={handleSave} className="flex flex-col gap-4">
            {renderFormFields()}

            <div className="flex gap-3 mt-4">
              <AnimatedButton type="submit" variant="primary" className="flex-1 py-2">
                <Save className="w-3.5 h-3.5" /> {editingId ? "Update" : "Add Entry"}
              </AnimatedButton>
              {editingId && (
                <AnimatedButton
                  onClick={() => {
                    setEditingId(null);
                    setFormFields({});
                  }}
                  variant="secondary"
                  className="px-4 py-2"
                >
                  Cancel
                </AnimatedButton>
              )}
            </div>
          </form>
        </div>

        {/* Existing Items */}
        <div className="flex flex-col gap-3">
          <h4 className="orbitron text-xs font-bold tracking-widest text-[#a855f7] uppercase mb-1">
            Registered Node Stack ({items.length})
          </h4>

          <div className="flex flex-col gap-3 max-h-[50vh] overflow-y-auto pr-1 custom-scrollbar">
            {items.length === 0 ? (
              <p className="mono text-xs text-white/40 text-center py-10">No items configured in this channel.</p>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="glass rounded-xl p-4 border border-white/5 flex items-center justify-between gap-4"
                >
                  <div className="flex flex-col gap-1 min-w-0">
                    <span className="orbitron text-xs font-bold text-white truncate block">
                      {getItemDisplayName(item)}
                    </span>
                    <span className="mono text-[9px] text-white/50 truncate block max-w-[200px]">
                      {getItemSubName(item)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-1.5 text-white/60 hover:text-[#00f5ff] hover:bg-white/5 rounded transition-all cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
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
    </div>
  );
}
