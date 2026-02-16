# Workspace Structure: Gutenverse Plugin

This document outlines the file structure and key locations for the Gutenverse WordPress block plugin. Use this as a reference when creating or editing blocks to ensure consistency and proper integration.

## 1. Block Development (`src/editor/blocks`)

All block definitions and editor logic reside in `src/editor/blocks`. Each block has its own directory (e.g., `src/editor/blocks/section`).

### Key Files per Block:
- **`block.json`**: The metadata file defining attributes, supports, and scripts.
- **`index.js`**: The entry point for block registration.
- **`edit.js`**: The main React component for the editor interface.
- **`save.js`**: Defines the static HTML to save to the database. For dynamic blocks, this often returns `null`.
- **`panels/`**: directory containing panel configurations.
    - **`panel-list.js`**: **CRITICAL**. Defines the Inspector Controls (sidebar settings) and style options visible in the backend.
    - **`panel-layout.js`, `panel-typography.js`**, etc.: specialized panel logic often imported by `panel-list.js`.
- **`styles/`**: directory containing style definitions.
    - **`block-style.js`**: **CRITICAL**. Generates dynamic styles inside the editor (CSS-in-JS) for instant feedback when options change. These are *not* persistent frontend styles but mirror them for the editor experience.
    - **`style.scss`**: Common styles applied to both editor and frontend.
    - **`editor.scss`**: Styles applied *only* to the editor interface.

## 2. Frontend Rendering & Styles (`gutenverse/includes`)

The frontend output and permanent CSS generation are handled by PHP classes in `gutenverse/includes`.

### Static Block Styles:
- **Location**: `gutenverse/includes/style/class-[block-name].php`
- **Purpose**: Generates the CSS for blocks on the frontend based on the saved attributes.
- **Naming Pattern**: `class-[block-name].php` (e.g., `class-section.php`).

### Dynamic Block Rendering:
- **Location**: `gutenverse/includes/block/class-[block-name].php`
- **Purpose**: Handles the server-side rendering (`render_callback`) for dynamic blocks.
- **Naming Pattern**: `class-[block-name].php` (e.g., `class-post-template.php`).

## 3. Global & Core Logic

- **`gutenverse/gutenverse.php`**: Main plugin file.
- **`gutenverse/includes/class-gutenverse.php`**: Core plugin class initializing the system.
- **`gutenverse/includes/class-api.php`**: Handles REST API endpoints.
- **`src/editor/components/`**: Shared React components used across multiple blocks.
- **`src/editor/utils/`**: Utility functions (helpers).

## Summary Table

| Context | File/Location | Purpose |
| :--- | :--- | :--- |
| **Editor UI** | `src/editor/blocks/[block]/edit.js` | Main edit component |
| **Block Metadata** | `src/editor/blocks/[block]/block.json` | Attributes & registration |
| **Settings/Sidebar** | `src/editor/blocks/[block]/panels/panel-list.js` | Inspector Controls & Options |
| **Editor Styles** | `src/editor/blocks/[block]/styles/block-style.js` | Live preview CSS in Editor |
| **Frontend CSS** | `gutenverse/includes/style/class-[block].php` | Generates frontend CSS |
| **Frontend HTML** | `gutenverse/includes/block/class-[block].php` | Dynamic block rendering (PHP) |
| **Static HTML** | `src/editor/blocks/[block]/save.js` | Static block HTML (JS) |

---
**Note**: When adding a new block or attribute, ensure you update:
1.  `block.json` (attributes)
2.  `edit.js` (component usage)
3.  `panels/panel-list.js` (settings UI)
4.  `styles/block-style.js` (editor preview)
5.  `gutenverse/includes/style/class-[block].php` (frontend CSS)
6.  `gutenverse/includes/block/class-[block].php` (if dynamic)