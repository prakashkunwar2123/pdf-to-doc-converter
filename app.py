from flask import Flask, request, send_file
from pdf2docx import Converter
import os

app = Flask(__name__)

@app.route("/")
def home():
    return """
    <h2>PDF to DOC Converter</h2>
    <form action='/convert' method='POST' enctype='multipart/form-data'>
      <input type='file' name='pdf_file' accept='application/pdf' required>
      <button type='submit'>Convert</button>
    </form>
    """

@app.route("/convert", methods=["POST"])
def convert_file():
    file = request.files["pdf_file"]
    input_path = "input.pdf"
    output_path = "output.docx"
    file.save(input_path)

    converter = Converter(input_path)
    converter.convert(output_path)
    converter.close()

    return send_file(output_path, as_attachment=True)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=10000)
