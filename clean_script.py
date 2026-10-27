import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('script.js', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. In switchModule: remove applyCardDepthTilt
text = text.replace(
"""        if (typeof applyCardDepthTilt === 'function') {
            setTimeout(applyCardDepthTilt, 100);
        }""",
""
)

# 2. In applyTheme: remove __updateSpatialTheme and fix emoji in themeToggleText
text = text.replace(
"""        if (typeof window.__updateSpatialTheme === 'function') {
            window.__updateSpatialTheme(isDark ? 'dark' : 'light', typeof currentPomoMode !== 'undefined' ? currentPomoMode : 'focus');
        }""",
""
)

text = text.replace(
"themeToggleText.textContent = isDark ? '☀️ Sáng' : '🌙 Tối';",
"themeToggleText.textContent = isDark ? 'Sáng' : 'Tối';"
)

# 3. In renderHabits: remove applyCardDepthTilt
text = text.replace(
"""        if (typeof applyCardDepthTilt === 'function') {
            applyCardDepthTilt();
        }""",
""
)

# 4. In default note text: update description
text = text.replace(
"- [x] **Spatial 3D**: Nền không gian 3D tương tác sống động bằng Three.js\\\\n\\\\n",
""
)

# 5. Remove Section 20 (initSpatial3DBackground & applyCardDepthTilt)
section_20_start = "    // =========================================================================\n    // 20. SPATIAL 3D UI & THREE.JS / GSAP ENHANCEMENT\n    // ========================================================================="
section_21_start = "    // =========================================================================\n    // ĐĂNG KÝ SERVICE WORKER (PWA OFFLINE SUPPORT)"

idx1 = text.find(section_20_start)
idx2 = text.find(section_21_start)

if idx1 != -1 and idx2 != -1:
    text = text[:idx1] + text[idx2:]
    print("Removed Section 20 (Three.js WebGL & GSAP Tilt).")
else:
    print("Warning: Section 20 not found by marker!")

# 6. In initializations at the bottom: remove initSpatial3DBackground() and setTimeout(applyCardDepthTilt, 200);
init_calls = """    initSpatial3DBackground();
    setTimeout(applyCardDepthTilt, 200);"""

text = text.replace(init_calls + "\n", "")
text = text.replace(init_calls, "")

with open('script.js', 'w', encoding='utf-8', newline='\n') as f:
    f.write(text)

print("Finished updating script.js!")

