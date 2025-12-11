async function convertPDF() {
  let file = document.getElementById("pdfFile").files[0];
  if (!file) {
    alert("Please upload a PDF");
    return;
  }

  document.getElementById("status").innerText = "Converting...";

  let reader = new FileReader();
  reader.onload = async function () {
    let typedArray = new Uint8Array(this.result);
    let pdf = await pdfjsLib.getDocument(typedArray).promise;

    let textContent = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      let page = await pdf.getPage(i);
      let text = await page.getTextContent();
      text.items.forEach(item => textContent += item.str + " ");
    }

    let blob = new Blob([textContent], { type: "application/msword" });

    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "converted.doc";
    link.click();

    document.getElementById("status").innerText = "Done!";
  };

  reader.readAsArrayBuffer(file);
}
