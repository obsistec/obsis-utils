import { formatDateTimeEn } from "./date";

export function useDownloadFile(createElement: any, createObjectURL: any, Blob: any) {
  function downloadPDF({ content }: { content: any }) {
    const linkEl = createElement("a");
    linkEl.href = createObjectURL(new Blob([content], { type: "application/pdf" }));
    linkEl.setAttribute("download", `report_${formatDateTimeEn(new Date(), "current").replace(" ", "_")}.pdf`);
    linkEl.click();
  }

  function downloadCSV({ content }: { content: any }) {
    const linkEl = createElement("a");
    linkEl.href = createObjectURL(new Blob([content], { type: "application/csv" }));
    linkEl.setAttribute("download", `report_${formatDateTimeEn(new Date(), "current").replace(" ", "_")}.csv`);
    linkEl.click();
  }

  return { downloadPDF, downloadCSV };
}
