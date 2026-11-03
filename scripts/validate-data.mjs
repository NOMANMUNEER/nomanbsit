import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const CATEGORIES_PATH = path.join(rootDir, "data", "categories.json");
const PROJECTS_PATH = path.join(rootDir, "data", "projects.json");
const PUBLIC_DIR = path.join(rootDir, "public");

const errors = [];
const warnings = [];

function addError(msg) {
  errors.push(msg);
}

function addWarning(msg) {
  warnings.push(msg);
}

const KEBAB_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

console.log("🔍 Validating portfolio data...");

// 1. Validate categories.json
let categories = [];
if (!fs.existsSync(CATEGORIES_PATH)) {
  addError(`Missing categories file at ${CATEGORIES_PATH}`);
} else {
  try {
    const raw = fs.readFileSync(CATEGORIES_PATH, "utf-8");
    categories = JSON.parse(raw);
    if (!Array.isArray(categories)) {
      addError("data/categories.json must contain a JSON array.");
    }
  } catch (err) {
    addError(`Failed to parse data/categories.json: ${err.message}`);
  }
}

const categoryIdMap = new Map();
if (Array.isArray(categories)) {
  categories.forEach((cat, index) => {
    if (!cat || typeof cat !== "object") {
      addError(`Category at index ${index} is not an object.`);
      return;
    }

    if (!cat.id || typeof cat.id !== "string") {
      addError(`Category at index ${index} is missing a valid 'id' string.`);
    } else {
      if (!KEBAB_REGEX.test(cat.id)) {
        addError(`Category ID "${cat.id}" must be a lowercase kebab-case slug.`);
      }
      if (categoryIdMap.has(cat.id)) {
        addError(`Duplicate category ID found: "${cat.id}".`);
      }
      categoryIdMap.set(cat.id, cat);
    }

    if (!cat.label || typeof cat.label !== "string" || !cat.label.trim()) {
      addError(`Category "${cat.id || index}" must have a non-empty 'label' string.`);
    }

    if (cat.parentId !== undefined) {
      if (typeof cat.parentId !== "string") {
        addError(`Category "${cat.id}" has non-string parentId.`);
      } else if (cat.parentId === cat.id) {
        addError(`Category "${cat.id}" cannot have itself as parentId.`);
      }
    }
  });

  // Check parentId references and cycles
  categories.forEach((cat) => {
    if (cat.parentId) {
      if (!categoryIdMap.has(cat.parentId)) {
        addError(`Category "${cat.id}" references unknown parentId "${cat.parentId}".`);
      } else {
        // Detect cycle
        let current = cat.parentId;
        const visited = new Set([cat.id]);
        while (current) {
          if (visited.has(current)) {
            addError(`Circular category hierarchy detected involving "${cat.id}" and "${current}".`);
            break;
          }
          visited.add(current);
          const parentObj = categoryIdMap.get(current);
          current = parentObj ? parentObj.parentId : undefined;
        }
      }
    }
  });
}

// 2. Validate projects.json
let projects = [];
if (!fs.existsSync(PROJECTS_PATH)) {
  addError(`Missing projects file at ${PROJECTS_PATH}`);
} else {
  try {
    const raw = fs.readFileSync(PROJECTS_PATH, "utf-8");
    projects = JSON.parse(raw);
    if (!Array.isArray(projects)) {
      addError("data/projects.json must contain a JSON array.");
    }
  } catch (err) {
    addError(`Failed to parse data/projects.json: ${err.message}`);
  }
}

const projectSlugSet = new Set();
if (Array.isArray(projects)) {
  projects.forEach((proj, index) => {
    const ref = proj?.slug || `index ${index}`;
    if (!proj || typeof proj !== "object") {
      addError(`Project at index ${index} is not an object.`);
      return;
    }

    // Slug check
    if (!proj.slug || typeof proj.slug !== "string") {
      addError(`Project at ${ref} must have a valid 'slug' string.`);
    } else {
      if (!KEBAB_REGEX.test(proj.slug)) {
        addError(`Project slug "${proj.slug}" must be a lowercase kebab-case slug.`);
      }
      if (projectSlugSet.has(proj.slug)) {
        addError(`Duplicate project slug found: "${proj.slug}".`);
      }
      projectSlugSet.add(proj.slug);
    }

    // Title check
    if (!proj.title || typeof proj.title !== "string" || !proj.title.trim()) {
      addError(`Project "${ref}" must have a non-empty 'title' string.`);
    }

    // CategoryIds check
    if (!Array.isArray(proj.categoryIds) || proj.categoryIds.length === 0) {
      addError(`Project "${ref}" must have a non-empty 'categoryIds' array.`);
    } else {
      proj.categoryIds.forEach((catId) => {
        if (!categoryIdMap.has(catId)) {
          addError(`Project "${ref}" references undefined category ID "${catId}".`);
        }
      });
    }

    // Summary check
    if (!proj.summary || typeof proj.summary !== "string" || !proj.summary.trim()) {
      addError(`Project "${ref}" must have a non-empty 'summary' string.`);
    }

    // Role check
    if (!proj.role || typeof proj.role !== "string" || !proj.role.trim()) {
      addError(`Project "${ref}" must have a non-empty 'role' string.`);
    }

    // Technologies check
    if (!Array.isArray(proj.technologies) || proj.technologies.length === 0) {
      addWarning(`Project "${ref}" has an empty 'technologies' list.`);
    }

    // Preview check
    if (!proj.preview || typeof proj.preview !== "object") {
      addError(`Project "${ref}" must have a 'preview' object.`);
    } else {
      const { type, src, alt, poster } = proj.preview;
      const validTypes = ["scroll-image", "video", "image"];
      if (!validTypes.includes(type)) {
        addError(`Project "${ref}" has invalid preview type "${type}". Must be one of: ${validTypes.join(", ")}`);
      }
      if (!src || typeof src !== "string" || !src.trim()) {
        addError(`Project "${ref}" preview is missing 'src'.`);
      } else if (src.startsWith("/")) {
        // Local public asset check
        const localPath = path.join(PUBLIC_DIR, src.replace(/^\//, ""));
        if (!fs.existsSync(localPath)) {
          addError(`Project "${ref}" references local preview asset "${src}" which does not exist at ${localPath}`);
        }
      }

      if (!alt || typeof alt !== "string" || !alt.trim()) {
        addError(`Project "${ref}" preview is missing 'alt' text.`);
      }

      if (poster && typeof poster === "string" && poster.startsWith("/")) {
        const localPosterPath = path.join(PUBLIC_DIR, poster.replace(/^\//, ""));
        if (!fs.existsSync(localPosterPath)) {
          addError(`Project "${ref}" references local video poster "${poster}" which does not exist at ${localPosterPath}`);
        }
      }
    }

    // liveUrl check
    if (proj.liveUrl !== null && proj.liveUrl !== undefined) {
      if (typeof proj.liveUrl !== "string" || !/^https?:\/\//i.test(proj.liveUrl)) {
        addError(`Project "${ref}" has invalid liveUrl "${proj.liveUrl}". Must be null or a valid http/https URL.`);
      }
    }

    // caseStudyUrl check
    if (proj.caseStudyUrl !== null && proj.caseStudyUrl !== undefined) {
      if (typeof proj.caseStudyUrl !== "string" || (!/^https?:\/\//i.test(proj.caseStudyUrl) && !proj.caseStudyUrl.startsWith("/"))) {
        addError(`Project "${ref}" has invalid caseStudyUrl "${proj.caseStudyUrl}". Must be null or a valid URL/path.`);
      }
    }
  });
}

// Summary Output
console.log(`\n📊 Validation Summary:`);
console.log(`- Categories found: ${categories.length}`);
console.log(`- Projects found: ${projects.length}`);
if (warnings.length > 0) {
  console.log(`\n⚠️  Warnings (${warnings.length}):`);
  warnings.forEach((w) => console.log(`  • ${w}`));
}

if (errors.length > 0) {
  console.error(`\n❌ Validation Failed with ${errors.length} error(s):`);
  errors.forEach((e) => console.error(`  • ${e}`));
  process.exit(1);
} else {
  console.log(`\n✅ All portfolio JSON data and asset paths are valid!`);
  process.exit(0);
}
