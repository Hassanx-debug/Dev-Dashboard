import React, { useState } from "react";
import { Upload, FileText, Trash2, CheckCircle, AlertCircle } from "lucide-react";
import { usePortfolio } from "../../context/PortfolioContext";

export default function ResumeUploader() {
  const { profile = {}, dispatch } = usePortfolio();
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState("");
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const resumeBase64 = profile.resumeBase64;

  // Show success message when resume is uploaded
  React.useEffect(() => {
    if (resumeBase64) {
      setUploadSuccess(true);
      const timer = setTimeout(() => setUploadSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [resumeBase64]);

  const handleFile = (file) => {
    if (file.type !== "application/pdf") {
      setError("Please select a PDF document.");
      return;
    }
    // Limit to 2.5MB to prevent LocalStorage overflows
    if (file.size > 2.5 * 1024 * 1024) {
      setError("File is too large. Max size is 2.5 MB to enable local browser storage.");
      return;
    }

    setError("");
    setUploadSuccess(false);
    const reader = new FileReader();
    reader.onload = () => {
      dispatch({
        type: "UPDATE_PROFILE",
        payload: { resumeBase64: reader.result },
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleDelete = () => {
    if (window.confirm("Delete resume document?")) {
      dispatch({
        type: "UPDATE_PROFILE",
        payload: { resumeBase64: null },
      });
    }
  };

  return (
    <div className="flex flex-col gap-6 text-white max-w-lg">
      <div className="flex flex-col">
        <h4 className="orbitron text-xs font-bold tracking-widest text-[#00f5ff] uppercase mb-1">
          Resume Document Management
        </h4>
        <p className="mono text-[10px] text-white/50 tracking-wider">
          Upload your resume in PDF format. It will be stored securely in LocalStorage.
        </p>
      </div>

      {uploadSuccess && (
        <div className="glass p-4 rounded-xl border border-green-500/30 bg-green-500/10 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-400" />
          <span className="mono text-xs text-green-400 font-bold tracking-wider">
            RESUME UPLOADED & PERSISTED SUCCESSFULLY
          </span>
        </div>
      )}

      {resumeBase64 ? (
        <div className="glass p-6 rounded-xl border border-[#00f5ff]/20 bg-white/2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#00f5ff]/10 border border-[#00f5ff]/30 flex items-center justify-center text-[#00f5ff]">
              <FileText className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="orbitron text-xs font-bold text-white tracking-wide">
                RESUME_LOADED.pdf
              </span>
              <span className="mono text-[8px] text-green-400 flex items-center gap-1 mt-0.5">
                <CheckCircle className="w-2.5 h-2.5" /> Persisted & Online
              </span>
            </div>
          </div>

          <button
            onClick={handleDelete}
            className="p-2 text-white/60 hover:text-red-400 hover:bg-red-500/10 rounded-full transition-all cursor-pointer"
            title="Remove Resume"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center gap-4 transition-all duration-300 ${
            dragActive
              ? "border-[#00f5ff] bg-[#00f5ff]/5 scale-98"
              : "border-white/10 bg-white/2 hover:border-white/20"
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white/40">
            <Upload className="w-6 h-6" />
          </div>

          <div className="flex flex-col items-center text-center">
            <span className="orbitron text-xs font-bold tracking-wider mb-1">
              Drag & Drop PDF File
            </span>
            <span className="mono text-[9px] text-white/40">
              or click below to browse files
            </span>
          </div>

          <input
            type="file"
            id="resume-file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
          />
          <label htmlFor="resume-file">
            <span className="px-4 py-2 rounded bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#00f5ff]/40 mono text-[9px] font-bold tracking-widest uppercase cursor-pointer select-none transition-all block">
              Browse Files
            </span>
          </label>

          {error && (
            <p className="mono text-[9px] text-red-400 font-bold uppercase tracking-wider mt-2">
              ⚠️ {error}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
