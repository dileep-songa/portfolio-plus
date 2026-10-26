# Personal Asset Update Guide: Profile Photo & Resume

This guide provides simple, step-by-step instructions for updating your **profile photo** and **resume PDF** on your personal portfolio website.

---

## 📁 1. Asset Locations & Default Filenames

Your personal assets are organized in the `public/` directory:

| Asset Type | Default File Path | Supported Formats |
| :--- | :--- | :--- |
| **Profile Photo** | `public/images/dileep-profile.png` | PNG, JPG, JPEG, WebP |
| **Resume PDF** | `public/resume/Dileep_Songa_Resume.pdf` | PDF |

The directory structure:
```text
portfolio-plus/
├── public/
│   ├── images/
│   │   └── dileep-profile.png           <-- Place your profile photo here
│   └── resume/
│       └── Dileep_Songa_Resume.pdf      <-- Place your resume PDF here
├── js/
│   ├── data.js                          <-- Central configuration file
│   └── main.js                          <-- Automatic asset detection & safety logic
└── index.html
```

---

## 🖼️ 2. How to Update Your Profile Photo

### Standard Method (Keeping the Same Filename):
1. Choose or export a high-resolution, professional headshot.
2. Rename your photo to:  
   `dileep-profile.png`
3. Copy or drag-and-drop the file into:  
   `public/images/dileep-profile.png`
4. The website will automatically detect and display your photo with a glowing glassmorphism frame.

### Custom Filename or Format (e.g., JPG):
If your photo is named differently (e.g. `dileep_photo.jpg`), you can change it in one place:
1. Copy `dileep_photo.jpg` into `public/images/`.
2. Open [`js/data.js`](js/data.js) and update line 18:
   ```javascript
   profilePhotoPath: "public/images/dileep_photo.jpg",
   ```
3. Save the file.

> **Graceful Fallback:** If the photo file is not found, the website automatically displays your stylized monogram avatar (`DS`) with an active "Available for Data Analyst Roles" status badge so your site always looks clean and complete.

---

## 📄 3. How to Update Your Resume PDF

### Standard Method (Keeping the Same Filename):
1. Export your latest resume from your editor (Word, LaTeX, Google Docs, Canva) as a PDF.
2. Rename the exported PDF to:  
   `Dileep_Songa_Resume.pdf`
3. Copy or drag-and-drop the file into:  
   `public/resume/Dileep_Songa_Resume.pdf`
4. The website will automatically detect the real PDF and activate the **“Download Resume”** button for visitors.

### Custom Filename or Versioning (e.g., with date or cycle):
If your PDF is named differently (e.g. `Dileep_Songa_Resume_2026.pdf`):
1. Copy the file into `public/resume/`.
2. Open [`js/data.js`](js/data.js) and update lines 21–24:
   ```javascript
   resumePdfPath: "public/resume/Dileep_Songa_Resume_2026.pdf",
   resumeDownloadFilename: "Dileep_Songa_Resume_2026.pdf",
   ```
3. Save the file.

> **Zero Broken Links Guarantee:** If the resume file is missing or not yet uploaded, the site displays a **“Request Resume”** contact button instead of a broken download link. In local development (`localhost`), a helpful yellow warning notice appears informing you to place the file.

---

## 🧪 4. How to Test Locally

Before publishing changes, verify that your new photo and resume display correctly:

### Option A: Using Python (Recommended)
Open PowerShell or Terminal in the `portfolio-plus` directory and run:
```powershell
python -m http.server 8000
```
Open [http://localhost:8000](http://localhost:8000) in your browser:
- Check that your photo appears in the hero card.
- Check that the **“Download Resume”** button appears in the hero and downloads your real PDF.
- Check that the mobile drawer also shows the **“Download Resume”** button.

### Option B: Using Node.js
```powershell
npx http-server -p 8080
```
Open [http://localhost:8080](http://localhost:8080) in your browser.

> **Browser Cache Tip:** If your old photo or old PDF still appears after updating, perform a hard refresh by pressing `Ctrl + F5` (Windows) or `Cmd + Shift + R` (Mac).

---

## 🚀 5. How to Publish Changes to GitHub Pages

Once you have verified your changes locally, commit and publish them:

```bash
# 1. Check which files were added or modified
git status

# 2. Stage the new public assets and config
git add public/ js/data.js

# 3. Commit your changes with a descriptive message
git commit -m "Update profile photo and resume PDF"

# 4. Push to GitHub
git push origin main
```

Your live site at `https://dileep-songa.github.io/portfolio-plus/` will automatically reflect the new photo and resume within 1–2 minutes.

---

## 🔒 6. Security & Safety Note

Your portfolio intentionally **does not include** a public web-based upload page or admin interface. 

Public admin forms or upload endpoints create severe security vulnerabilities (unauthorized file replacement, script injection, and malware upload). By maintaining file updates through Git version control, your portfolio remains **100% secure**, static, and tamper-proof.

