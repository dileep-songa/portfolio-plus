/**
 * MAIN.JS - INTERACTION CONTROLLER & ACCESSIBILITY HANDLER
 * Personal Portfolio - Dileep Songa | Aspiring Data Analyst
 */

(function () {
  'use strict';

  // DOM Elements
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const navLinks = document.querySelectorAll('.nav-link');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalContainer = document.getElementById('modal-content');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const toastNotice = document.getElementById('toast-notice');
  const profileImg = document.getElementById('profile-img');
  const profileFallback = document.getElementById('profile-fallback');

  let activeModalTrigger = null;
  window.isResumePdfAvailable = false;

  // Initialize
  function init() {
    setupMobileNav();
    setupSmoothScrollAndNavSpy();
    setupProfileImage();
    setupResumeButton();
    setupModals();
    setupEmailCopy();
    setupCurrentYear();
  }

  // Helper: Retrieve active configuration
  function getAssetConfig() {
    if (window.PORTFOLIO_CONFIG && window.PORTFOLIO_CONFIG.assets) {
      return window.PORTFOLIO_CONFIG.assets;
    }
    return {
      profilePhotoPath: "public/images/dileep-profile.png",
      resumePdfPath: "public/resume/Dileep_Songa_Resume.pdf",
      resumeDownloadFilename: "Dileep_Songa_Resume.pdf"
    };
  }

  // 1. Mobile Navigation
  function setupMobileNav() {
    if (!mobileToggle || !mobileDrawer || !drawerBackdrop) return;

    function openMenu() {
      mobileDrawer.classList.add('open');
      drawerBackdrop.classList.add('active');
      mobileToggle.setAttribute('aria-expanded', 'true');
      mobileToggle.focus();
    }

    function closeMenu() {
      mobileDrawer.classList.remove('open');
      drawerBackdrop.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }

    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.contains('open');
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    drawerBackdrop.addEventListener('click', closeMenu);

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        closeMenu();
        mobileToggle.focus();
      }
    });
  }

  // 2. Smooth Scrolling & Scrollspy
  function setupSmoothScrollAndNavSpy() {
    const sections = document.querySelectorAll('section[id]');

    function updateActiveLink() {
      const scrollY = window.pageYOffset;

      sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 120;
        const sectionId = current.getAttribute('id');
        const correspondingLinks = document.querySelectorAll(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          correspondingLinks.forEach(link => link.classList.add('active'));
        } else {
          correspondingLinks.forEach(link => link.classList.remove('active'));
        }
      });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();
  }

  // 3. Graceful Profile Image Detection
  function setupProfileImage() {
    if (!profileImg || !profileFallback) return;

    const assets = getAssetConfig();
    const photoPath = assets.profilePhotoPath;

    profileImg.setAttribute('src', photoPath);

    const testImg = new Image();
    testImg.src = photoPath;

    testImg.onload = function () {
      profileImg.style.display = 'block';
      profileFallback.style.display = 'none';
      console.log(`[Portfolio Assets] Profile image successfully loaded from '${photoPath}'.`);
    };

    testImg.onerror = function () {
      profileImg.style.display = 'none';
      profileFallback.style.display = 'flex';
      console.info(`[Portfolio Assets Info] Personal photo not found at '${photoPath}'. Showing monogram fallback avatar. Place your image at '${photoPath}' to activate. See ASSET_UPDATE_GUIDE.md.`);
    };
  }

  // 4. Dynamic Resume PDF Verification & Button Controller
  function setupResumeButton() {
    const downloadBtn = document.getElementById('resume-download-btn');
    const requestBtn = document.getElementById('resume-request-btn');
    const mobileDownloadBtn = document.getElementById('mobile-resume-download-btn');
    const mobileRequestBtn = document.getElementById('mobile-resume-request-btn');
    const devWarning = document.getElementById('resume-dev-warning');

    const assets = getAssetConfig();
    const resumePath = assets.resumePdfPath;
    const downloadFilename = assets.resumeDownloadFilename;

    if (downloadBtn) {
      downloadBtn.setAttribute('href', resumePath);
      downloadBtn.setAttribute('download', downloadFilename);
    }
    if (mobileDownloadBtn) {
      mobileDownloadBtn.setAttribute('href', resumePath);
      mobileDownloadBtn.setAttribute('download', downloadFilename);
    }

    function activateDownloadButton() {
      window.isResumePdfAvailable = true;
      if (downloadBtn) downloadBtn.style.display = 'inline-flex';
      if (requestBtn) requestBtn.style.display = 'none';
      if (mobileDownloadBtn) mobileDownloadBtn.style.display = 'inline-flex';
      if (mobileRequestBtn) mobileRequestBtn.style.display = 'none';
      if (devWarning) devWarning.style.display = 'none';
      console.log(`[Portfolio Assets] Resume PDF verified at '${resumePath}'. Direct download enabled.`);
    }

    function activateFallbackState() {
      window.isResumePdfAvailable = false;
      if (downloadBtn) downloadBtn.style.display = 'none';
      if (requestBtn) requestBtn.style.display = 'inline-flex';
      if (mobileDownloadBtn) mobileDownloadBtn.style.display = 'none';
      if (mobileRequestBtn) mobileRequestBtn.style.display = 'inline-flex';

      // Show dev warning in local testing environments
      const isLocal = window.location.hostname === 'localhost' ||
                      window.location.hostname === '127.0.0.1' ||
                      window.location.protocol === 'file:';
      if (isLocal && devWarning) {
        devWarning.style.display = 'inline-flex';
      } else if (devWarning) {
        devWarning.style.display = 'none';
      }

      console.warn(`[Portfolio Assets Warning] Resume PDF not found at '${resumePath}'. Showing Request Resume button to prevent broken 404 links. Place your PDF at '${resumePath}' to enable direct downloads. See ASSET_UPDATE_GUIDE.md.`);
    }

    // Check if resume file exists
    if (window.location.protocol === 'file:') {
      fetch(resumePath)
        .then(res => {
          if (res.ok) {
            activateDownloadButton();
          } else {
            activateFallbackState();
          }
        })
        .catch(() => {
          activateFallbackState();
        });
    } else {
      fetch(resumePath, { method: 'HEAD' })
        .then(res => {
          if (res.ok) {
            activateDownloadButton();
          } else {
            // Some servers return 405 Method Not Allowed on HEAD; try GET fallback
            return fetch(resumePath, { method: 'GET' }).then(getRes => {
              if (getRes.ok) {
                activateDownloadButton();
              } else {
                activateFallbackState();
              }
            });
          }
        })
        .catch(() => {
          activateFallbackState();
        });
    }
  }

  // 5. Modal Dialog System (Projects & Resume)
  function setupModals() {
    if (!modalOverlay || !modalContainer || !modalCloseBtn) return;

    // Open Project Detail Modal
    window.openProjectModal = function (projectId, triggerEl) {
      if (!window.PORTFOLIO_DATA) return;
      const project = window.PORTFOLIO_DATA.projects.find(p => p.id === projectId);
      if (!project) return;

      activeModalTrigger = triggerEl || document.activeElement;

      let visualHtml = '';
      if (project.image) {
        visualHtml = `
          <div style="margin: 1rem 0; text-align: center; background: rgba(0,0,0,0.4); padding: 1rem; border-radius: 8px; border: 1px solid var(--glass-border);">
            <img src="${project.image}" alt="${project.title} Visualization" style="max-width: 100%; height: auto; max-height: 320px; border-radius: 6px;" />
            <p style="font-size: 0.8rem; color: var(--text-muted); margin-top: 0.5rem;">Actual PM4Py Process Mining Directly-Follows Graph generated from simulated event logs</p>
          </div>
        `;
      }

      modalContainer.innerHTML = `
        <div class="modal-header">
          <div>
            <span class="project-badge ${project.badgeType}">${project.status}</span>
            <h3 class="modal-title" style="margin-top: 0.5rem;">${project.title}</h3>
            <p style="font-size: 0.875rem; color: var(--accent-cyan); font-family: var(--font-family-mono);">${project.tagline}</p>
          </div>
          <button class="modal-close-btn" id="modal-close-action" aria-label="Close dialog">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <div class="modal-body">
          <div>
            <h4 class="modal-section-title">Business Problem & Analytical Objective</h4>
            <p>${project.problem}</p>
          </div>

          <div>
            <h4 class="modal-section-title">Dataset & Provenance</h4>
            <p><strong>Source:</strong> ${project.dataset.source}</p>
            <p><strong>Volume:</strong> ${project.dataset.volume}</p>
            <p style="font-size: 0.875rem; color: var(--text-muted); margin-top: 0.25rem;">${project.dataset.provenance}</p>
          </div>

          ${visualHtml}

          <div>
            <h4 class="modal-section-title">Analytical Methods & Workflow</h4>
            <ul class="findings-list">
              ${project.methods.map(m => `<li>${m}</li>`).join('')}
            </ul>
          </div>

          <div>
            <h4 class="modal-section-title">Verified Findings & Results</h4>
            <ul class="findings-list">
              ${project.verifiedFindings.map(f => `<li>${f}</li>`).join('')}
            </ul>
          </div>

          <div style="background: rgba(245, 158, 11, 0.08); border: 1px solid rgba(245, 158, 11, 0.25); padding: 1rem; border-radius: 8px;">
            <h4 style="font-size: 0.85rem; font-family: var(--font-family-mono); color: var(--accent-amber); margin-bottom: 0.25rem; text-transform: uppercase;">Analytical Constraints & Disclaimer</h4>
            <p style="font-size: 0.85rem; color: #fde68a; margin: 0;">${project.limitations}</p>
          </div>

          <div>
            <h4 class="modal-section-title">Technologies & Stack</h4>
            <div class="project-tech-tags">
              ${project.tools.map(t => `<span class="tech-tag">${t}</span>`).join('')}
            </div>
          </div>
        </div>
        <div class="modal-footer">
          ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-outline">View Repository on GitHub</a>` : ''}
          <button class="btn btn-primary" id="modal-close-footer">Done</button>
        </div>
      `;

      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';

      document.getElementById('modal-close-action').addEventListener('click', closeModal);
      document.getElementById('modal-close-footer').addEventListener('click', closeModal);
      document.getElementById('modal-close-action').focus();
    };

    // Open Resume Request / Download Modal
    window.openResumeModal = function (triggerEl) {
      activeModalTrigger = triggerEl || document.activeElement;
      const assets = getAssetConfig();
      const resumePath = assets.resumePdfPath;
      const downloadFilename = assets.resumeDownloadFilename;

      let devWarningHtml = '';
      let downloadActionHtml = '';

      if (window.isResumePdfAvailable) {
        downloadActionHtml = `
          <a href="${resumePath}" download="${downloadFilename}" class="btn btn-primary">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 18px; height: 18px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
            Download Resume (PDF)
          </a>
        `;
      } else {
        devWarningHtml = `
          <div class="dev-asset-notice" style="margin: 0.75rem 0; width: 100%; max-width: 100%; box-sizing: border-box;">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            <span><strong>Development Warning:</strong> No PDF found at <code>${resumePath}</code>. Place your PDF in this folder to activate instant downloads. See <code>ASSET_UPDATE_GUIDE.md</code>.</span>
          </div>
        `;
        downloadActionHtml = `
          <a href="mailto:dileepsonga23@gmail.com?subject=Data%20Analyst%20Resume%20Request%20-%20Dileep%20Songa" class="btn btn-primary">
            Email Dileep Directly
          </a>
        `;
      }

      modalContainer.innerHTML = `
        <div class="modal-header">
          <div>
            <span class="project-badge ${window.isResumePdfAvailable ? 'badge-verified' : 'badge-case-study'}">
              ${window.isResumePdfAvailable ? 'Verified PDF Ready' : 'Direct Request Channel'}
            </span>
            <h3 class="modal-title" style="margin-top: 0.5rem;">Dileep Songa — Resume Access</h3>
            <p style="font-size: 0.875rem; color: var(--accent-cyan); font-family: var(--font-family-mono);">Data Analyst & Intern Opportunities</p>
          </div>
          <button class="modal-close-btn" id="modal-close-action" aria-label="Close dialog">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
        <div class="modal-body">
          <p>Thank you for your interest in reviewing my qualifications for Data Analyst and Data Analytics Intern positions.</p>

          ${devWarningHtml}

          <div style="background: rgba(15, 23, 42, 0.7); border: 1px solid var(--glass-border); padding: 1.25rem; border-radius: 12px; margin: 0.5rem 0;">
            <h4 style="font-size: 0.9rem; color: var(--text-primary); margin-bottom: 0.5rem; font-weight: 600;">Verified Contact Channels:</h4>
            <p style="font-size: 0.875rem; margin-bottom: 0.5rem;"><strong>Email:</strong> <a href="mailto:dileepsonga23@gmail.com" style="color: var(--accent-cyan);">dileepsonga23@gmail.com</a></p>
            <p style="font-size: 0.875rem; margin-bottom: 0.5rem;"><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/dileepsonga/" target="_blank" rel="noopener noreferrer" style="color: var(--accent-cyan);">linkedin.com/in/dileepsonga</a></p>
            <p style="font-size: 0.875rem;"><strong>GitHub:</strong> <a href="https://github.com/dileep-songa/" target="_blank" rel="noopener noreferrer" style="color: var(--accent-cyan);">github.com/dileep-songa</a></p>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline" onclick="copyEmailToClipboard()">Copy Email</button>
          ${downloadActionHtml}
        </div>
      `;

      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';

      document.getElementById('modal-close-action').addEventListener('click', closeModal);
      document.getElementById('modal-close-action').focus();
    };

    function closeModal() {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
      if (activeModalTrigger && typeof activeModalTrigger.focus === 'function') {
        activeModalTrigger.focus();
      }
    }

    modalCloseBtn.addEventListener('click', closeModal);

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // 6. Email Copy Functionality with Toast Notice
  function setupEmailCopy() {
    window.copyEmailToClipboard = function () {
      const email = 'dileepsonga23@gmail.com';

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
          showToast('Email copied to clipboard: ' + email);
        }).catch(() => {
          fallbackCopyText(email);
        });
      } else {
        fallbackCopyText(email);
      }
    };

    function fallbackCopyText(text) {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.top = '-9999px';
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        showToast('Email copied: ' + text);
      } catch (err) {
        window.prompt('Copy email manually:', text);
      }
      document.body.removeChild(textArea);
    }

    function showToast(msg) {
      if (!toastNotice) return;
      toastNotice.textContent = msg;
      toastNotice.classList.add('show');
      setTimeout(() => {
        toastNotice.classList.remove('show');
      }, 3000);
    }
  }

  // 7. Current Year in Footer
  function setupCurrentYear() {
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
