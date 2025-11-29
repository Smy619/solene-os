import { useState } from "react";
import MDEditor, { commands } from "@uiw/react-md-editor";

export default function AdminEditor() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [cover, setCover] = useState(null);
  const [content, setContent] = useState("");
  const [showModal, setShowModal] = useState(false);

  const uploadImageCommand = {
    name: "uploadImage",
    keyCommand: "uploadImage",
    buttonProps: { "aria-label": "Upload Image" },
    icon: <span>🖼️</span>,
    execute: () => setShowModal(true),
  };

  return (
    <div title="New Blog Post">
      <div className="editor-page">
        {/* Title + Subtitle */}
        <div className="editor-title-group">
          <input
            type="text"
            placeholder="Blog title"
            className="editor-title-input"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Blog Subtitle (optional)"
            className="editor-subtitle-input"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
          />
        </div>

        {/* Cover Upload */}
        <label className="editor-label">Upload cover image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCover(e.target.files[0])}
        />
        {cover && (
          <div className="cover-preview-box">
            <img
              src={URL.createObjectURL(cover)}
              alt="cover preview"
              className="cover-preview-img"
            />

            <button className="cover-remove-btn" onClick={() => setCover(null)}>
              Remove
            </button>
          </div>
        )}

        {/* MAIN EDITOR AREA */}
        <div className="editor-main">
          <div className="editor-left" data-color-mode="dark">
            <MDEditor
              height={500}
              value={content}
              onChange={setContent}
              preview="edit"
              commands={[
                commands.bold,
                commands.italic,
                commands.strikethrough,
                commands.hr,
                commands.link,
                uploadImageCommand,
              ]}
            />
          </div>
        </div>

        {/* Publish */}
        <div className="editor-bottom-bar">
          <button className="editor-publish-btn" disabled={!title || !content}>
            Publish Blog
          </button>
        </div>
      </div>

      {/* IMAGE UPLOAD MODAL */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-box">
            <h3>Upload Image</h3>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;

                const imageUrl = URL.createObjectURL(file);
                setContent((prev) => prev + `\n\n![](${imageUrl})\n\n`);
                setShowModal(false);
              }}
            />

            <button
              className="modal-cancel"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
