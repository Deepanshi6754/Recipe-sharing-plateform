import React, { useRef, useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import EmojiPicker from "emoji-picker-react";
import Cropper from "react-easy-crop";
import "remixicon/fonts/remixicon.css";


const AddBlog = () => {
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const editId = query.get("id");

  // content states
  const [title, setTitle] = useState("");
  const [recipeTitle, setRecipeTitle] = useState("");
  const [image, setImage] = useState("");

  // toolbar states
  const [showEmoji, setShowEmoji] = useState(false);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkURL, setLinkURL] = useState("");

  // cropper states
  const [showCropper, setShowCropper] = useState(false);
  const [imageToCrop, setImageToCrop] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [aspect, setAspect] = useState(4 / 3);

  // image editing states
  const [selectedImg, setSelectedImg] = useState(null);
  const [imgControlPos, setImgControlPos] = useState({ top: 0, left: 0, visible: false });
  const [imgWidthPct, setImgWidthPct] = useState(100);
  const [imgWidthPx, setImgWidthPx] = useState(null);
  const [imgNaturalWidth, setImgNaturalWidth] = useState(null);
  const [imgAlign, setImgAlign] = useState("center");
  const [imgHasTemp, setImgHasTemp] = useState(false); // indicates unsaved temporary edits for selected image

  // load edit blog if present
  useEffect(() => {
    if (editId) {
      try {
        const blogs = JSON.parse(localStorage.getItem("blogs") || "[]");
        const blogToEdit = blogs.find((b) => b.id.toString() === editId);
        if (blogToEdit) {
          setTitle(blogToEdit.title || "");
          setRecipeTitle(blogToEdit.recipeTitle || "");
          setImage(blogToEdit.image || "");
          if (editorRef.current) {
            editorRef.current.innerHTML = blogToEdit.content || "";
            // ensure existing images have data-original-style baseline if not present
            setTimeout(() => {
              const imgs = editorRef.current.querySelectorAll("img");
              imgs.forEach((img) => {
                if (!img.dataset.originalStyle) img.dataset.originalStyle = img.style.cssText || "";
                // clear any temp flag on load
                img.dataset.tempStyle = "";
              });
            }, 50);
          }
        }
      } catch (err) {
        console.error("Failed to load blog for edit:", err);
      }
    }
  }, [editId]);

  // helper exec
  const exec = (cmd, val = null) => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    try {
      document.execCommand(cmd, false, val);
    } catch (err) {
      console.warn("exec error", err);
    }
  };

  // insertLocalImage & cropper logic (same as before)
  const insertLocalImage = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setImageToCrop(reader.result);
      setShowCropper(true);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
    };
    reader.readAsDataURL(file);
  };

  const onCropComplete = useCallback((croppedArea, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const getCroppedImg = async (imageSrc, cropPixels) => {
    const imageEl = new Image();
    imageEl.src = imageSrc;
    await new Promise((res) => {
      imageEl.onload = res;
      imageEl.onerror = res;
    });

    const canvas = document.createElement("canvas");
    const pw = Math.max(1, Math.round(cropPixels.width));
    const ph = Math.max(1, Math.round(cropPixels.height));
    canvas.width = pw;
    canvas.height = ph;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      imageEl,
      Math.round(cropPixels.x),
      Math.round(cropPixels.y),
      pw,
      ph,
      0,
      0,
      pw,
      ph
    );

    // Resize to reasonable max
    const maxDimension = 1200;
    if (canvas.width > maxDimension || canvas.height > maxDimension) {
      const scale = Math.min(maxDimension / canvas.width, maxDimension / canvas.height);
      const scaledW = Math.round(canvas.width * scale);
      const scaledH = Math.round(canvas.height * scale);

      const tmp = document.createElement("canvas");
      tmp.width = scaledW;
      tmp.height = scaledH;
      const tctx = tmp.getContext("2d");
      tctx.drawImage(canvas, 0, 0, scaledW, scaledH);
      return tmp.toDataURL("image/jpeg", 0.9);
    }

    return canvas.toDataURL("image/jpeg", 0.9);
  };

  const handleCropConfirm = async () => {
    if (!imageToCrop || !croppedAreaPixels) {
      setShowCropper(false);
      return;
    }
    const croppedDataUrl = await getCroppedImg(imageToCrop, croppedAreaPixels);

    if (editorRef.current) {
      editorRef.current.focus();
      // create a unique data-id to refer later (helpful)
      const dataId = `img-${Date.now()}`;
      const imgHTML =
        `<img data-id="${dataId}" class="inserted-image" src="${croppedDataUrl}" ` +
        `style="max-width:100%; height:auto; display:block; margin:10px 0; border-radius:8px; object-fit:contain;" ` +
        `data-original-style="" data-temp-style="" />`;
      try {
        document.execCommand("insertHTML", false, imgHTML);
      } catch (err) {
        editorRef.current.innerHTML += imgHTML;
      }

      // ensure that newly inserted image element gets baseline attribute (we set empty baseline above)
      setTimeout(() => {
        const img = editorRef.current.querySelector(`img[data-id="${dataId}"]`);
        if (img && !img.dataset.originalStyle) img.dataset.originalStyle = img.style.cssText || "";
      }, 50);
    }

    setImage(croppedDataUrl);
    setShowCropper(false);
    setImageToCrop(null);
    setCroppedAreaPixels(null);
    setZoom(1);
  };

  const handleCropCancel = () => {
    setShowCropper(false);
    setImageToCrop(null);
    setCroppedAreaPixels(null);
    setZoom(1);
  };

  // link insertion
  const handleLinkInsert = () => {
    if (!linkURL) return setShowLinkInput(false);
    exec("createLink", linkURL);
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      const anchor = sel.anchorNode && sel.anchorNode.parentElement;
      if (anchor && anchor.tagName === "A") {
        anchor.setAttribute("target", "_blank");
        anchor.style.color = "blue";
        anchor.style.textDecoration = "underline";
      }
    }
    setLinkURL("");
    setShowLinkInput(false);
  };

  // heading
  const handleHeadingChange = (level) => {
    if (level === "") exec("formatBlock", "<p>");
    else exec("formatBlock", `<h${level}>`);
  };

  const handlePublish = () => {
    const content = editorRef.current ? editorRef.current.innerHTML : "";
    if (!title || !content) {
      alert("Please enter title and content!");
      return;
    }

    try {
      const storedBlogs = JSON.parse(localStorage.getItem("blogs") || "[]");
      if (editId) {
        const updated = storedBlogs.map((b) =>
          b.id.toString() === editId ? { ...b, title, recipeTitle, image, content } : b
        );
        localStorage.setItem("blogs", JSON.stringify(updated));
      } else {
        const newBlog = {
          id: Date.now(),
          title,
          recipeTitle,
          image,
          content,
          createdAt: new Date().toLocaleString(),
        };
        localStorage.setItem("blogs", JSON.stringify([...storedBlogs, newBlog]));
      }
      navigate("/blogs");
    } catch (err) {
      console.error("Failed to save blog:", err);
      alert("Could not save the blog. See console for details.");
    }
  };

  // ---------- Image selection & controls logic (with save/revert) ----------

  const computeControlPosition = (imgEl) => {
    const editorRect = editorRef.current.getBoundingClientRect();
    const imgRect = imgEl.getBoundingClientRect();
    const preferAbove = imgRect.top - editorRect.top > 120;
    const top = preferAbove ? imgRect.top - editorRect.top - 110 : imgRect.bottom - editorRect.top + 8;
    let left = imgRect.left - editorRect.left;
    const editorWidth = editorRect.width;
    if (left + 320 > editorWidth) left = Math.max(8, editorWidth - 320 - 8);
    return { top: Math.round(top), left: Math.round(left) };
  };

  const applyImageStyle = (imgEl, { pct = null, px = null, align = "center" } = {}) => {
    if (!imgEl) return;
    imgEl.style.float = "";
    imgEl.style.display = "";
    imgEl.style.marginLeft = "";
    imgEl.style.marginRight = "";

    if (align === "left") {
      imgEl.style.float = "left";
      imgEl.style.marginRight = "12px";
    } else if (align === "right") {
      imgEl.style.float = "right";
      imgEl.style.marginLeft = "12px";
    } else {
      imgEl.style.display = "block";
      imgEl.style.marginLeft = "auto";
      imgEl.style.marginRight = "auto";
    }

    if (px) {
      imgEl.style.width = `${px}px`;
      imgEl.style.maxWidth = "none";
    } else if (pct) {
      imgEl.style.width = `${pct}%`;
      imgEl.style.maxWidth = "100%";
    } else {
      imgEl.style.width = "";
      imgEl.style.maxWidth = "100%";
    }

    imgEl.style.height = "auto";
    // mark that this image has temporary (unsaved) edits
    imgEl.dataset.tempStyle = imgEl.style.cssText || "";
    setImgHasTemp(true);
  };

  // When selecting an image: populate controls & position panel
  const selectImage = useCallback((imgEl) => {
    if (!imgEl) return;
    setSelectedImg(imgEl);

    // ensure baseline stored
    if (!imgEl.dataset.originalStyle) imgEl.dataset.originalStyle = imgEl.style.cssText || "";

    const natural = imgEl.naturalWidth || imgEl.width || null;
    setImgNaturalWidth(natural);

    const editorWidth = editorRef.current ? editorRef.current.clientWidth : null;
    let pct = 100;
    if (editorWidth && imgEl.clientWidth) pct = Math.round((imgEl.clientWidth / editorWidth) * 100);
    setImgWidthPct(pct);
    setImgWidthPx(imgEl.clientWidth || null);

    const fl = (imgEl.style.float || "").toLowerCase();
    if (fl === "left") setImgAlign("left");
    else if (fl === "right") setImgAlign("right");
    else setImgAlign("center");

    setImgHasTemp(Boolean(imgEl.dataset.tempStyle));

    const pos = computeControlPosition(imgEl);
    setImgControlPos({ top: pos.top, left: pos.left, visible: true });
  }, [editorRef]);

  // click handler inside editor to select/deselect images
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    const onEditorClick = (e) => {
      const el = e.target;
      if (el && el.tagName === "IMG") {
        selectImage(el);
      } else {
        // if clicked outside panel -> hide
        setImgControlPos((p) => ({ ...p, visible: false }));
        setSelectedImg(null);
      }
    };

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setImgControlPos((p) => ({ ...p, visible: false }));
        setSelectedImg(null);
      }
    };

    editor.addEventListener("click", onEditorClick);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      editor.removeEventListener("click", onEditorClick);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [selectImage]);

  // reposition panel on resize
  useEffect(() => {
    const onResize = () => {
      if (selectedImg && imgControlPos.visible) {
        const pos = computeControlPosition(selectedImg);
        setImgControlPos({ top: pos.top, left: pos.left, visible: true });
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [selectedImg, imgControlPos.visible]);

  // apply percent change to selected image
  useEffect(() => {
    if (!selectedImg) return;
    applyImageStyle(selectedImg, { pct: imgWidthPct, align: imgAlign });
    const editorWidth = editorRef.current ? editorRef.current.clientWidth : null;
    if (editorWidth) setImgWidthPx(Math.round((imgWidthPct / 100) * editorWidth));
  }, [imgWidthPct, imgAlign, selectedImg]);

  // apply px change
  useEffect(() => {
    if (!selectedImg) return;
    if (imgWidthPx) {
      applyImageStyle(selectedImg, { px: imgWidthPx, align: imgAlign });
      const editorWidth = editorRef.current ? editorRef.current.clientWidth : null;
      if (editorWidth) setImgWidthPct(Math.round((imgWidthPx / editorWidth) * 100));
    }
  }, [imgWidthPx, imgAlign, selectedImg]);

  // presets
  const applyPreset = (preset) => {
    if (!selectedImg) return;
    const editorWidth = editorRef.current ? editorRef.current.clientWidth : null;
    if (!editorWidth) return;
    let targetPx = null;
    if (preset === "small") targetPx = Math.round(editorWidth * 0.3);
    else if (preset === "medium") targetPx = Math.round(editorWidth * 0.5);
    else if (preset === "large") targetPx = Math.round(editorWidth * 0.75);
    else if (preset === "full") targetPx = editorWidth;
    applyImageStyle(selectedImg, { px: targetPx, align: "center" });
    setImgWidthPx(targetPx);
    setImgAlign("center");
  };

  // reset to baseline original-style (revert)
  const revertImage = () => {
    if (!selectedImg) return;
    const base = selectedImg.dataset.originalStyle || "";
    selectedImg.style.cssText = base;
    // clear temp-style marker
    selectedImg.dataset.tempStyle = "";
    setImgHasTemp(false);

    // update controls to reflect reverted size
    const editorWidth = editorRef.current ? editorRef.current.clientWidth : null;
    if (editorWidth) {
      const pct = selectedImg.clientWidth ? Math.round((selectedImg.clientWidth / editorWidth) * 100) : 100;
      setImgWidthPct(pct);
      setImgWidthPx(selectedImg.clientWidth || null);
    }
    const fl = (selectedImg.style.float || "").toLowerCase();
    setImgAlign(fl === "left" ? "left" : fl === "right" ? "right" : "center");

    // update data-temp-style cleared
    selectedImg.dataset.tempStyle = "";
  };

  // save current edit as new baseline (user presses Save)
  const saveImageBaseline = () => {
    if (!selectedImg) return;
    // copy current inline style into original-style so it becomes baseline
    selectedImg.dataset.originalStyle = selectedImg.style.cssText || "";
    // clear temp marker
    selectedImg.dataset.tempStyle = "";
    setImgHasTemp(false);
    // inform user (small visual) - for now we just leave panel state
  };

  // reset to natural size (no baseline change, but sets px)
  const resetImageSize = () => {
    if (!selectedImg) return;
    const natural = selectedImg.naturalWidth || imgNaturalWidth || null;
    const editorWidth = editorRef.current ? editorRef.current.clientWidth : null;
    if (natural && editorWidth) {
      const px = Math.min(natural, editorWidth);
      applyImageStyle(selectedImg, { px, align: "center" });
      setImgWidthPx(px);
      setImgWidthPct(Math.round((px / editorWidth) * 100));
      setImgAlign("center");
    } else {
      selectedImg.style.width = "";
      selectedImg.style.maxWidth = "100%";
      setImgWidthPx(null);
      setImgWidthPct(100);
      setImgAlign("center");
    }
    // mark as temp edit
    selectedImg.dataset.tempStyle = selectedImg.style.cssText || "";
    setImgHasTemp(true);
  };

  // cleanup on unmount
  useEffect(() => {
    return () => {
      setSelectedImg(null);
      setImgControlPos({ top: 0, left: 0, visible: false });
    };
  }, []);

  // ---------- styles ----------
  const styles = {
    container: {
      width: "100%",
      minHeight: "100vh",
      background: "#f3f4f6",
      display: "flex",
      justifyContent: "center",
      padding: 15,
    },
    inner: {
      width: "100%",
      maxWidth: 900,
      position: "relative",
    },
    titleInput: {
      width: "100%",
      fontSize: 28,
      padding: "10px 0",
      border: "none",
      borderBottom: "1px solid #ccc",
      outline: "none",
      background: "#fff",
    },
    recipeInput: {
      width: "100%",
      fontSize: 18,
      padding: "8px 0",
      border: "none",
      borderBottom: "1px solid #ccc",
      outline: "none",
      background: "#fff",
      marginTop: 10,
    },
    toolbar: {
      width: "100%",
      background: "#fff",
      border: "1px solid #ccc",
      padding: 8,
      marginTop: 15,
      display: "flex",
      alignItems: "center",
      gap: 10,
      flexWrap: "wrap",
    },
    toolBtn: {
      border: "none",
      background: "transparent",
      cursor: "pointer",
      fontSize: 20,
      padding: 6,
    },
    headingDropdown: {
      padding: "4px 6px",
      borderRadius: 4,
      border: "1px solid #ccc",
      background: "#fff",
    },
    linkBox: { position: "relative" },
    linkInputWrapper: {
      position: "absolute",
      top: 34,
      left: 0,
      background: "#fff",
      border: "1px solid #ccc",
      padding: 6,
      display: "flex",
      gap: 6,
      zIndex: 2000,
    },
    linkInput: { padding: 6, width: 180 },
    linkAddBtn: {
      padding: "6px 8px",
      cursor: "pointer",
      background: "#f97316",
      color: "#fff",
      border: "none",
      borderRadius: 4,
    },
    emojiBox: { position: "relative" },
    emojiPickerWrapper: {
      position: "absolute",
      right: 0,
      top: 34,
      zIndex: 2000,
    },
    editorWrapper: {
      marginTop: 15,
      width: "100%",
      position: "relative",
    },
    editor: {
      width: "100%",
      minHeight: 500,
      background: "#fff",
      border: "1px solid #ccc",
      marginTop: 0,
      padding: 15,
      outline: "none",
      overflowWrap: "break-word",
    },
    publishBtn: {
      marginTop: 15,
      padding: "10px 20px",
      background: "#f97316",
      color: "#fff",
      border: "none",
      borderRadius: 6,
      cursor: "pointer",
      fontWeight: 600,
    },
    fileInputHidden: { display: "none" },

    // cropper overlay
    cropOverlay: {
      position: "absolute",
      top: 40,
      left: "50%",
      transform: "translateX(-50%)",
      width: "min(720px, 95%)",
      maxWidth: 720,
      background: "#ffffff",
      padding: 12,
      borderRadius: 10,
      boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
      zIndex: 1500,
    },
    cropArea: {
      width: "100%",
      height: 360,
      background: "#111",
      position: "relative",
      borderRadius: 8,
      overflow: "hidden",
    },
    cropControls: {
      marginTop: 10,
      display: "flex",
      gap: 10,
      alignItems: "center",
      justifyContent: "space-between",
    },
    cropButtonRow: {
      display: "flex",
      gap: 8,
    },
    cropBtn: {
      padding: "8px 14px",
      border: "none",
      borderRadius: 8,
      cursor: "pointer",
      fontWeight: 600,
    },
    confirmBtn: { background: "#22c55e", color: "#fff" },
    cancelBtn: { background: "#ef4444", color: "#fff" },
    rangeInput: { width: 160 },

    // image control panel
    imgControlPanel: {
      position: "absolute",
      width: 320,
      padding: 10,
      background: "#fff",
      border: "1px solid #ddd",
      borderRadius: 8,
      boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
      zIndex: 3000,
    },
    controlRow: { display: "flex", gap: 8, alignItems: "center", marginTop: 8 },
    smallBtn: { padding: "6px 8px", borderRadius: 6, border: "1px solid #eee", cursor: "pointer", background: "#fafafa" },
    applyBtn: { padding: "8px 10px", borderRadius: 6, cursor: "pointer", border: "none", background: "#4CAF50", color: "#fff" },
  };

  return (
    <div style={styles.container}>
      <div style={styles.inner}>
        {/* Title */}
        <input
          style={styles.titleInput}
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Recipe title */}
        <input
          style={styles.recipeInput}
          type="text"
          placeholder="Recipe Title (optional)"
          value={recipeTitle}
          onChange={(e) => setRecipeTitle(e.target.value)}
        />

        {/* Toolbar */}
        <div style={styles.toolbar}>
          <button style={styles.toolBtn} onClick={() => exec("undo")} title="Undo">
            <i className="ri-arrow-go-back-line"></i>
          </button>
          <button style={styles.toolBtn} onClick={() => exec("redo")} title="Redo">
            <i className="ri-arrow-go-forward-line"></i>
          </button>

          {[
            { cmd: "bold", icon: "ri-bold", title: "Bold" },
            { cmd: "italic", icon: "ri-italic", title: "Italic" },
            { cmd: "underline", icon: "ri-underline", title: "Underline" },
            { cmd: "strikeThrough", icon: "ri-strikethrough", title: "Strike" },
          ].map((item, idx) => (
            <button key={idx} style={styles.toolBtn} onClick={() => exec(item.cmd)} title={item.title}>
              <i className={item.icon}></i>
            </button>
          ))}

          <select style={styles.headingDropdown} onChange={(e) => handleHeadingChange(e.target.value)} defaultValue="">
            <option value="">Normal</option>
            <option value="1">Heading 1</option>
            <option value="2">Heading 2</option>
            <option value="3">Heading 3</option>
          </select>

          {[
            { cmd: "justifyLeft", icon: "ri-align-left", title: "Align left" },
            { cmd: "justifyCenter", icon: "ri-align-center", title: "Align center" },
            { cmd: "justifyRight", icon: "ri-align-right", title: "Align right" },
          ].map((item, idx) => (
            <button key={idx} style={styles.toolBtn} onClick={() => exec(item.cmd)} title={item.title}>
              <i className={item.icon}></i>
            </button>
          ))}

          {[
            { cmd: "insertUnorderedList", icon: "ri-list-unordered", title: "Bulleted list" },
            { cmd: "insertOrderedList", icon: "ri-list-ordered", title: "Numbered list" },
          ].map((item, idx) => (
            <button key={idx} style={styles.toolBtn} onClick={() => exec(item.cmd)} title={item.title}>
              <i className={item.icon}></i>
            </button>
          ))}

          <div style={styles.linkBox}>
            <button style={styles.toolBtn} onClick={() => setShowLinkInput((s) => !s)} title="Insert link">
              <i className="ri-link"></i>
            </button>

            {showLinkInput && (
              <div style={styles.linkInputWrapper}>
                <input style={styles.linkInput} type="text" placeholder="Enter URL" value={linkURL} onChange={(e) => setLinkURL(e.target.value)} />
                <button style={styles.linkAddBtn} onClick={handleLinkInsert}>Add</button>
              </div>
            )}
          </div>

          <button style={styles.toolBtn} onClick={() => fileInputRef.current && fileInputRef.current.click()} title="Insert image">
            <i className="ri-image-add-line"></i>
          </button>
          <input ref={fileInputRef} style={styles.fileInputHidden} type="file" accept="image/*" onChange={(e) => {
            const file = e.target.files && e.target.files[0];
            if (file) insertLocalImage(file);
            e.target.value = "";
          }} />

          <div style={styles.emojiBox}>
            <button style={styles.toolBtn} onClick={() => setShowEmoji((s) => !s)} title="Insert emoji">
              <i className="ri-emotion-line"></i>
            </button>
            {showEmoji && (
              <div style={styles.emojiPickerWrapper}>
                <EmojiPicker onEmojiClick={(emoji) => { exec("insertText", emoji.emoji); setShowEmoji(false); }} />
              </div>
            )}
          </div>
        </div>

        {/* Editor wrapper */}
        <div style={styles.editorWrapper}>
          <style>{`
            .editor-area img.inserted-image,
            .editor-area img {
              max-width: 100% !important;
              height: auto !important;
              object-fit: contain !important;
              border-radius: 8px;
              display: block;
              margin: 10px 0;
            }
            .editor-area a { color: blue; text-decoration: underline; }
            /* outline selected image lightly */
            .editor-area img[selected="true"] { outline: 3px solid rgba(59,130,246,0.25); }
          `}</style>

          <div
            ref={editorRef}
            contentEditable
            suppressContentEditableWarning
            style={styles.editor}
            aria-label="Blog editor"
            className="editor-area"
          />
        </div>

        {/* Publish / Update */}
        <button style={styles.publishBtn} onClick={handlePublish}>
          {editId ? "Update Blog" : "Publish"}
        </button>

        {/* Cropper overlay */}
        {showCropper && imageToCrop && (
          <div style={styles.cropOverlay} role="dialog" aria-modal="true">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <strong>Crop image</strong>
              <div>
                <button onClick={() => setAspect(1)} style={{ marginRight: 6, padding: "6px 8px", borderRadius: 6, border: "1px solid #ddd", background: aspect === 1 ? "#eee" : "#fff" }}>1:1</button>
                <button onClick={() => setAspect(4 / 3)} style={{ marginRight: 6, padding: "6px 8px", borderRadius: 6, border: "1px solid #ddd", background: aspect === 4 / 3 ? "#eee" : "#fff" }}>4:3</button>
                <button onClick={() => setAspect(16 / 9)} style={{ padding: "6px 8px", borderRadius: 6, border: "1px solid #ddd", background: aspect === 16 / 9 ? "#eee" : "#fff" }}>16:9</button>
              </div>
            </div>

            <div style={styles.cropArea}>
              <Cropper image={imageToCrop} crop={crop} zoom={zoom} aspect={aspect} onCropChange={setCrop} onZoomChange={(z) => setZoom(Number(z))} onCropComplete={onCropComplete} />
            </div>

            <div style={styles.cropControls}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <label style={{ fontSize: 14 }}>Zoom</label>
                <input type="range" min={1} max={3} step={0.05} value={zoom} onChange={(e) => setZoom(Number(e.target.value))} style={styles.rangeInput} />
              </div>

              <div style={styles.cropButtonRow}>
                <button onClick={handleCropConfirm} style={{ ...styles.cropBtn, ...styles.confirmBtn }}>Confirm</button>
                <button onClick={handleCropCancel} style={{ ...styles.cropBtn, ...styles.cancelBtn }}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        {/* Image control panel (floating) */}
        {imgControlPos.visible && selectedImg && (
          <div style={{ ...styles.imgControlPanel, top: imgControlPos.top, left: imgControlPos.left }}>
            <div style={{ fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>Image controls</div>
              <div style={{ fontSize: 12, color: imgHasTemp ? "#ef4444" : "#6b7280" }}>{imgHasTemp ? "Unsaved edits" : "Saved baseline"}</div>
            </div>

            {/* width % slider */}
            <div style={styles.controlRow}>
              <label style={{ minWidth: 56 }}>Width</label>
              <input type="range" min={10} max={100} step={1} value={imgWidthPct} onChange={(e) => setImgWidthPct(Number(e.target.value))} style={{ flex: 1 }} />
              <div style={{ minWidth: 44, textAlign: "right" }}>{imgWidthPct}%</div>
            </div>

            {/* exact px input */}
            <div style={styles.controlRow}>
              <label style={{ minWidth: 56 }}>Pixels</label>
              <input type="number" value={imgWidthPx || ""} onChange={(e) => {
                const v = Number(e.target.value);
                if (isNaN(v)) setImgWidthPx(null);
                else setImgWidthPx(Math.max(10, Math.round(v)));
              }} style={{ flex: 1, padding: "6px 8px", borderRadius: 6, border: "1px solid #eee" }} />
              <button style={{ marginLeft: 8, ...styles.smallBtn }} onClick={() => {
                const nat = imgNaturalWidth || selectedImg.naturalWidth || selectedImg.width;
                const editorWidth = editorRef.current ? editorRef.current.clientWidth : nat;
                const px = Math.min(nat || editorWidth, editorWidth);
                setImgWidthPx(px);
              }} title="Natural size">Nat</button>
            </div>

            {/* presets */}
            <div style={styles.controlRow}>
              <button style={styles.smallBtn} onClick={() => applyPreset("small")}>Small</button>
              <button style={styles.smallBtn} onClick={() => applyPreset("medium")}>Medium</button>
              <button style={styles.smallBtn} onClick={() => applyPreset("large")}>Large</button>
              <button style={styles.smallBtn} onClick={() => applyPreset("full")}>Full</button>
              <button style={{ marginLeft: "auto", ...styles.smallBtn }} onClick={resetImageSize}>Reset</button>
            </div>

            {/* alignment */}
            <div style={{ ...styles.controlRow, marginTop: 10 }}>
              <label style={{ minWidth: 56 }}>Align</label>
              <button style={{ ...styles.smallBtn, background: imgAlign === "left" ? "#efefef" : "#fafafa" }} onClick={() => setImgAlign("left")}>Left</button>
              <button style={{ ...styles.smallBtn, background: imgAlign === "center" ? "#efefef" : "#fafafa" }} onClick={() => setImgAlign("center")}>Center</button>
              <button style={{ ...styles.smallBtn, background: imgAlign === "right" ? "#efefef" : "#fafafa" }} onClick={() => setImgAlign("right")}>Right</button>

              <button style={{ marginLeft: "auto", ...styles.applyBtn }} onClick={() => {
                if (selectedImg) {
                  if (imgWidthPx) applyImageStyle(selectedImg, { px: imgWidthPx, align: imgAlign });
                  else applyImageStyle(selectedImg, { pct: imgWidthPct, align: imgAlign });
                }
              }}>Apply</button>
            </div>

            {/* Save / Revert */}
            <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
              <button style={{ ...styles.smallBtn, background: "#10B981", color: "#fff", border: "none" }} onClick={saveImageBaseline}>Save</button>
              <button style={{ ...styles.smallBtn, background: "#f97316", color: "#fff", border: "none" }} onClick={revertImage}>Revert</button>
              <button style={{ marginLeft: "auto", ...styles.smallBtn }} onClick={() => {
                // close panel
                setImgControlPos((p) => ({ ...p, visible: false }));
                setSelectedImg(null);
              }}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddBlog;
