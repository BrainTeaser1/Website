# Recreation Workflow

When the user provides a reference image (screenshot) and optionally CSS classes or style notes:

1. Generate a single `index.html` file using Tailwind CSS via CDN.
2. Render the page locally.
3. Capture screenshots using Puppeteer.
4. Compare rendered screenshots against the reference.
5. Identify visual mismatches including:

   * Spacing
   * Padding
   * Typography
   * Alignment
   * Colors
   * Border radius
   * Shadows
   * Responsive behavior
6. Fix all identified issues.
7. Re-render and compare again.
8. Perform at least 2 comparison passes before stopping.

Target visual accuracy should be within approximately 2–3 pixels.
