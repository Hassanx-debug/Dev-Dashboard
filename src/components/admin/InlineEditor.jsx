import React, { useState, useEffect } from "react";
import { Edit2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function InlineEditor({
  value,
  onSave,
  type = "text",
  className = "",
  inputClassName = "",
  children,
}) {
  const { isEditMode } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value || "");

  useEffect(() => {
    setCurrentValue(value || "");
  }, [value]);

  const handleBlur = () => {
    setIsEditing(false);
    if (currentValue !== value) {
      onSave(currentValue);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && type !== "textarea") {
      e.preventDefault();
      setIsEditing(false);
      if (currentValue !== value) {
        onSave(currentValue);
      }
    }
    if (e.key === "Escape") {
      setIsEditing(false);
      setCurrentValue(value || "");
    }
  };

  if (!isEditMode) {
    return <span className={className}>{children || value}</span>;
  }

  if (isEditing) {
    return type === "textarea" ? (
      <textarea
        value={currentValue}
        onChange={(e) => setCurrentValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        autoFocus
        rows={4}
        className={`bg-black/60 border border-[#00f5ff]/50 rounded px-2 py-1 text-white focus:outline-none focus:shadow-[0_0_10px_rgba(0,245,255,0.2)] w-full text-sm font-normal ${inputClassName}`}
      />
    ) : (
      <input
        type="text"
        value={currentValue}
        onChange={(e) => setCurrentValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        autoFocus
        className={`bg-black/60 border border-[#00f5ff]/50 rounded px-2 py-1 text-white focus:outline-none focus:shadow-[0_0_10px_rgba(0,245,255,0.2)] text-sm font-normal ${inputClassName}`}
      />
    );
  }

  return (
    <span
      onClick={() => setIsEditing(true)}
      className={`editable-field cursor-pointer inline-flex items-center gap-1 group/edit ${className}`}
    >
      {children || value}
      <Edit2 className="w-3 h-3 opacity-0 group-hover/edit:opacity-80 text-[#00f5ff] transition-opacity ml-1 flex-shrink-0" />
    </span>
  );
}
