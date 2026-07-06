import { toPng } from "html-to-image";

interface ExportOptions {
  pixelRatio?: number;
  cacheBust?: boolean;
  style?: Record<string, string>;
  quality?: number;
}

/**
 * Robust utility to export an HTML element as a PNG image download.
 * Handles high pixel density rendering, element exclusion, name sanitization, and fallback gracefully.
 */
export async function exportNodeAsPng(
  node: HTMLElement | null,
  filenamePrefix: string,
  options?: ExportOptions
): Promise<void> {
  if (!node) {
    throw new Error("Target element node is null or undefined.");
  }

  const mergedOptions = {
    pixelRatio: options?.pixelRatio ?? 3,
    cacheBust: options?.cacheBust ?? true,
    style: options?.style,
    quality: options?.quality ?? 1.0,
    filter: (element: HTMLElement) => {
      if (element.classList && element.classList.contains("no-export")) {
        return false;
      }
      return true;
    }
  };

  try {
    const dataUrl = await toPng(node, mergedOptions);
    
    // Sanitize the filename prefix to prevent path manipulation or bad characters
    const sanitizedPrefix = filenamePrefix
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "-")
      .substring(0, 50);

    const link = document.createElement("a");
    link.download = `${sanitizedPrefix}.png`;
    link.href = dataUrl;
    
    // Safe DOM trigger
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error(`Failed to export node as PNG (${filenamePrefix}):`, error);
    throw error;
  }
}
