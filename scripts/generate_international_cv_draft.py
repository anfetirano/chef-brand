"""Preview only: preserve the approved layout and mark the PDF as a draft.

The end month for Only YOU (01/2026) is approximate and reconstructed by the
candidate, not independently verified against employment documents.
"""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas

import generate_international_cv as cv


OUTPUT = Path(__file__).resolve().parents[1] / "output" / "pdf" / "andres-tirano-international-cv-DRAFT.pdf"

def draft_footer(c, page):
    page_w, _ = A4
    c.setFont("Sans", 6.8)
    c.setFillColor(colors.HexColor("#8D847B"))
    c.drawString(16 * mm, 7 * mm, "DRAFT · DESIGN REVIEW")
    c.drawRightString(page_w - 11 * mm, 7 * mm, f"ANDRÉS TIRANO  ·  {page:02d}")


cv.footer = draft_footer


def build():
    cv.reference.register_fonts()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUTPUT), pagesize=A4, pageCompression=1)
    c.setTitle("DRAFT - Andrés Tirano International Master CV")
    c.setAuthor("Andrés Felipe Tirano Vásquez")
    c.setSubject("International professional chef CV - design preview")
    cv.first_page(c)
    c.showPage()
    cv.second_page(c)
    c.save()
    return OUTPUT


if __name__ == "__main__":
    print(build())
