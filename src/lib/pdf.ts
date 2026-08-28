import { jsPDF } from "jspdf";
import html2canvas from "html2canvas-pro";

export const SLIDE_W = 1920;
export const SLIDE_H = 1080;

/**
 * Renders every slide of the offscreen pdf-stage into a single
 * landscape 16:9 PDF and triggers a download.
 */
export async function exportDeckToPdf(
  stage: HTMLElement,
  onProgress: (done: number, total: number) => void,
): Promise<void> {
  // make sure webfonts are rasterized before capture
  try {
    await document.fonts.ready;
  } catch {
    /* ignore */
  }

  const slideEls = Array.from(stage.querySelectorAll<HTMLElement>("[data-pdf-slide]"));
  if (slideEls.length === 0) throw new Error("No slides found for export");

  const pdf = new jsPDF({
    orientation: "landscape",
    unit: "px",
    format: [SLIDE_W, SLIDE_H],
    hotfixes: ["px_scaling"],
    compress: true,
  });

  for (let i = 0; i < slideEls.length; i++) {
    const el = slideEls[i];

    const canvas = await html2canvas(el, {
      backgroundColor: "#edf3fa",
      scale: 0.75,
      logging: false,
      x: 0,
      y: 0,
      scrollX: 0,
      scrollY: 0,
      width: SLIDE_W,
      height: SLIDE_H,
      windowWidth: SLIDE_W + 200,
      windowHeight: SLIDE_H + 200,
      imageTimeout: 0,
      onclone: (doc) => {
        // guarantee the offscreen stage sits at origin inside the clone
        const stage = doc.querySelector<HTMLElement>("[data-pdf-stage]");
        if (stage) {
          stage.style.left = "0";
          stage.style.top = "0";
          stage.style.position = "absolute";
          stage.style.visibility = "visible";
          stage.style.transform = "none";
        }

        // в клоне все CSS-анимации перезапускаются: элементы с entrance-
        // задержками (anim-rise / line-mask / rule-draw) остались бы
        // прозрачными в кадре. Замораживаем всё в финальном состоянии.
        const freeze = doc.createElement("style");
        freeze.textContent = [
          "*, *::before, *::after { animation: none !important; transition: none !important; }",
          ".line-mask > .line-inner { transform: none !important; opacity: 1 !important; }",
          ".rule-draw { transform: none !important; }",
          ".ticker-track { transform: none !important; }",
          ".anim-rise, .anim-in, .anim-left, .anim-right, .anim-pop { opacity: 1 !important; transform: none !important; }",
        ].join("\n");
        doc.head.appendChild(freeze);
      },
    });

    const img = canvas.toDataURL("image/jpeg", 0.92);

    if (i > 0) {
      pdf.addPage([SLIDE_W, SLIDE_H], "landscape");
    }
    pdf.addImage(img, "JPEG", 0, 0, SLIDE_W, SLIDE_H, undefined, "FAST");
    onProgress(i + 1, slideEls.length);
    // let the UI paint progress between captures
    await new Promise((r) => setTimeout(r, 30));
  }

  pdf.setProperties({
    title: "Генеративный ИИ в рекламе: этические риски современных технологий",
    author: "Центр применения ИИ в журналистике и МК ННГУ / Центр ИИ ННГУ",
    subject: "Публичное выступление · ETICA",
  });

  pdf.save("genai-ads-ethics-etica.pdf");
}
