import html2canvas from "html2canvas";
import jsPDF from "jspdf";


export const getPdf = (elementToPrintId) => {
  const element = document.getElementById(elementToPrintId);
  if (!element) {
    throw new Error(`Element with id ${elementToPrintId} not found`);
  }
  html2canvas(element, {
    useCORS: true,
    allowTaint: true,
    scrollY: -window.scrollY,
  }).then((canvas) => {
    const image = canvas.toDataURL("image/jpeg", 1.0);
    const doc = new jsPDF("p", "px", "a4");
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    const widthRatio = pageWidth / canvas.width;
    const heightRatio = pageHeight / canvas.height;
    const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;

    const canvasWidth = canvas.width * ratio;
    const canvasHeight = canvas.height * ratio;

    const marginX = (pageWidth - canvasWidth) / 2;
    const marginY = (pageHeight - canvasHeight) / 2;

    doc.addImage(image, "JPEG", marginX, marginY, canvasWidth, canvasHeight);
    doc.output("dataurlnewwindow");
  });
};