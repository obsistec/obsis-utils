import { formatDateTimeEn } from "./date";

export function useDownloadFile() {
  function downloadPDF({ content }: { content: any }) {
    const linkEl = document.createElement("a");
    linkEl.href = URL.createObjectURL(new Blob([content], { type: "application/pdf" }));
    linkEl.setAttribute("download", `report_${formatDateTimeEn(new Date(), "current").replace(" ", "_")}.pdf`);
    linkEl.click();
  }

  function downloadCSV({ content }: { content: any }) {
    const linkEl = document.createElement("a");
    linkEl.href = URL.createObjectURL(new Blob([content], { type: "application/csv" }));
    linkEl.setAttribute("download", `report_${formatDateTimeEn(new Date(), "current").replace(" ", "_")}.csv`);
    linkEl.click();
  }

  return { downloadPDF, downloadCSV };
}
