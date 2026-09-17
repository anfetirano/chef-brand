"""Create the two-page international chef CV.

Employment months are candidate-provided approximations, not dates verified
against employment records. MCS followed EGM; its date is unknown.
"""

from pathlib import Path

import generate_resume_pdf as reference
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "andres-tirano-international-cv-final.pdf"

CHARCOAL = reference.CHARCOAL
INK = reference.INK
PAPER = reference.PAPER
OFF_WHITE = reference.OFF_WHITE
COPPER = reference.COPPER
MUTED = reference.MUTED
HAIRLINE = reference.HAIRLINE
SIDEBAR_TEXT = colors.HexColor("#D0C7BE")


STYLES = {
    "hero_quote": ParagraphStyle(
        "hero_quote", fontName="DisplayItalic", fontSize=15.6,
        leading=20, textColor=OFF_WHITE, alignment=TA_LEFT,
    ),
    "venue": ParagraphStyle(
        "venue", fontName="Display", fontSize=13.1,
        leading=16, textColor=INK, alignment=TA_LEFT,
    ),
    "role": ParagraphStyle(
        "role", fontName="Sans", fontSize=8.4,
        leading=11.4, textColor=MUTED, alignment=TA_LEFT,
    ),
    "body": ParagraphStyle(
        "body", fontName="Sans", fontSize=8.55,
        leading=12.6, textColor=MUTED, alignment=TA_LEFT,
    ),
    "sidebar": ParagraphStyle(
        "sidebar", fontName="Sans", fontSize=8.35,
        leading=12.2, textColor=SIDEBAR_TEXT, alignment=TA_LEFT,
    ),
    "sidebar_small": ParagraphStyle(
        "sidebar_small", fontName="Sans", fontSize=7.85,
        leading=10.9, textColor=SIDEBAR_TEXT, alignment=TA_LEFT,
    ),
    "school": ParagraphStyle(
        "school", fontName="Display", fontSize=11.0,
        leading=13.5, textColor=INK, alignment=TA_LEFT,
    ),
    "course": ParagraphStyle(
        "course", fontName="SansBold", fontSize=8.1,
        leading=11.4, textColor=INK, alignment=TA_LEFT,
    ),
    "date": ParagraphStyle(
        "date", fontName="SansBold", fontSize=8.0,
        leading=10.8, textColor=COPPER, alignment=TA_LEFT,
    ),
}


RECENT = [
    {
        "date": "08/2026 - Present",
        "venue": "Balneario de Panticosa",
        "role": "Cook - Hot Section · Huesca, Spain",
        "summary": (
            "Responsible for hot-section production for a high-volume buffet serving "
            "several hundred guests, coordinating mise en place, simultaneous "
            "preparations, regeneration and continuous replenishment."
        ),
    },
    {
        "date": "02/2025 - 01/2026",
        "venue": "Only YOU Hotel Málaga",
        "role": "Chef de Partie · Málaga, Spain",
        "summary": (
            "Worked in a five-star hotel kitchen with premium hospitality "
            "standards, coordinated service and consistent execution."
        ),
    },
    {
        "date": "02/2024 - 11/2024",
        "venue": "Gran Hotel Cervantes",
        "role": "Show Cooking Chef · Torremolinos, Málaga, Spain",
        "summary": (
            "Covered grill, wok and crêpe stations in a guest-facing buffet "
            "serving around 1,200 people daily."
        ),
    },
]

EARLIER = [
    {
        "date": "02/2023 - 11/2023",
        "venue": "La Deriva",
        "role": "Line Cook · Málaga, Spain",
        "summary": "Mise en place and restaurant service in a fast-moving kitchen.",
    },
    {
        "date": "07/2022 - 12/2022",
        "venue": "The Club Málaga",
        "role": "Cook · Málaga, Spain",
        "summary": (
            "Prepared and served brunch; supported purchasing, inventory, menu "
            "development and pre-service preparation."
        ),
    },
]


def paragraph(c, text, style, x, y_top, width):
    item = Paragraph(text, style)
    _, height = item.wrap(width, 300 * mm)
    item.drawOn(c, x, y_top - height)
    return y_top - height


def tracked(c, value, x, y, size=7.5, color=COPPER, tracking=1.45):
    # Keep labels as one text run so ATS extraction preserves whole words.
    c.setFont("SansBold", size)
    c.setFillColor(color)
    c.drawString(x, y, value)


def rule(c, x, y, width, dark=False):
    c.setStrokeColor(colors.HexColor("#514A43") if dark else HAIRLINE)
    c.setLineWidth(0.45)
    c.line(x, y, x + width, y)


def section(c, title, x, y, width, dark=False):
    tracked(c, title, x, y, color=OFF_WHITE if dark else COPPER)
    rule(c, x, y - 4 * mm, width, dark=dark)


def draw_portrait(c, split_x, photo_h):
    page_w, page_h = A4
    portrait = reference.load_portrait()
    photo_w = page_w - split_x
    source_w, source_h = portrait.getSize()
    scale = max(photo_w / source_w, photo_h / source_h)
    rendered_w, rendered_h = source_w * scale, source_h * scale
    clip = c.beginPath()
    clip.rect(split_x, page_h - photo_h, photo_w, photo_h)
    c.saveState()
    c.clipPath(clip, stroke=0, fill=0)
    c.drawImage(
        portrait,
        split_x + (photo_w - rendered_w) / 2,
        page_h - photo_h + (photo_h - rendered_h) / 2,
        width=rendered_w,
        height=rendered_h,
    )
    c.restoreState()


def footer(c, page):
    page_w, _ = A4
    c.setFont("Sans", 6.8)
    c.setFillColor(colors.HexColor("#8D847B"))
    c.drawString(16 * mm, 7 * mm, "ANDRÉS FELIPE TIRANO VÁSQUEZ")
    c.drawRightString(page_w - 11 * mm, 7 * mm, f"ANDRÉS TIRANO  ·  {page:02d}")


def cover_item(c, item, y_top):
    date_x, text_x, right = 16 * mm, 49 * mm, A4[0] - 16 * mm
    paragraph(c, item["date"], STYLES["date"], date_x, y_top - 1 * mm, 29 * mm)
    y = paragraph(c, item["venue"], STYLES["venue"], text_x, y_top + 1 * mm, right - text_x)
    y = paragraph(c, item["role"], STYLES["role"], text_x, y - 1 * mm, right - text_x)
    y = paragraph(c, item["summary"], STYLES["body"], text_x, y - 2.6 * mm, right - text_x)
    line_y = y - 5.5 * mm
    rule(c, text_x, line_y, right - text_x)
    return line_y - 7 * mm


def first_page(c):
    page_w, page_h = A4
    left, split_x, hero_h = 16 * mm, 131 * mm, 104 * mm
    c.setFillColor(PAPER)
    c.rect(0, 0, page_w, page_h, stroke=0, fill=1)
    c.setFillColor(CHARCOAL)
    c.rect(0, page_h - hero_h, page_w, hero_h, stroke=0, fill=1)
    draw_portrait(c, split_x, hero_h)
    c.setFillColor(COPPER)
    c.rect(split_x - 0.65 * mm, page_h - hero_h, 0.65 * mm, hero_h, stroke=0, fill=1)

    tracked(c, "@ANFETIRANO", left, page_h - 17 * mm, size=7.3,
            color=colors.HexColor("#D8D0C7"), tracking=1.35)
    c.setFillColor(OFF_WHITE)
    c.setFont("Display", 32)
    c.drawString(left, page_h - 39 * mm, "ANDRÉS")
    c.drawString(left, page_h - 53 * mm, "TIRANO")
    tracked(c, "PROFESSIONAL CHEF", left, page_h - 63 * mm,
            color=colors.HexColor("#D8D0C7"), tracking=1.8)
    c.setFillColor(COPPER)
    c.rect(left, page_h - 69 * mm, 18 * mm, 0.55 * mm, stroke=0, fill=1)
    paragraph(c, "Precision before service.<br/>Calm during the pass.",
              STYLES["hero_quote"], left, page_h - 75 * mm, 106 * mm)

    c.setFillColor(COPPER)
    c.rect(0, 0, 5 * mm, page_h - hero_h, stroke=0, fill=1)
    c.setFillColor(INK)
    c.setFont("SansBold", 8.0)
    c.drawString(left, page_h - 112 * mm, "Andrés Felipe Tirano Vásquez")
    c.setFont("Sans", 7.65)
    c.setFillColor(MUTED)
    c.drawString(left, page_h - 118 * mm,
                 "Nationality: Colombian  ·  Current Location: Huesca, Spain")
    c.drawString(left, page_h - 124 * mm,
                 "Available for International Relocation  ·  andres@tirano.co  ·  +34 603 91 99 93")
    c.drawString(left, page_h - 130 * mm, "chef.tirano.co")

    section(c, "EXPERIENCE", left, page_h - 142 * mm, page_w - 32 * mm)
    y = page_h - 154 * mm
    for item in RECENT:
        y = cover_item(c, item, y)
    footer(c, 1)


def journey_item(c, item, y_top, x, width):
    y = paragraph(c, item["date"], STYLES["date"], x, y_top, width)
    y = paragraph(c, item["venue"], STYLES["venue"], x, y - 1.8 * mm, width)
    y = paragraph(c, item["role"], STYLES["role"], x, y - 1 * mm, width)
    y = paragraph(c, item["summary"], STYLES["body"], x, y - 2 * mm, width)
    line_y = y - 5 * mm
    rule(c, x, line_y, width)
    return line_y - 7.2 * mm


def main_second_page(c):
    page_w, page_h = A4
    x, right = 79 * mm, page_w - 15 * mm
    width = right - x
    section(c, "PROFESSIONAL JOURNEY", x, page_h - 18 * mm, width)
    y = page_h - 32 * mm
    for item in EARLIER:
        y = journey_item(c, item, y, x, width)

    y = paragraph(c, "03/2021 - 06/2022", STYLES["date"], x, y, width)
    y = paragraph(c, "Lucía Freitas - A Tafona &amp; LUME", STYLES["venue"], x, y - 1.8 * mm, width)
    y = paragraph(c, "Santiago de Compostela, Spain", STYLES["role"], x, y - 1 * mm, width)
    y = paragraph(
        c,
        "Alternated shifts between both establishments within the same "
        "professional structure; the overlap is intentional.",
        STYLES["body"], x, y - 2 * mm, width,
    )
    y = paragraph(c, "A Tafona - Prep Cook", STYLES["course"], x, y - 3 * mm, width)
    y = paragraph(c, "Precise ingredient preparation and pre-service work.",
                  STYLES["body"], x, y - 1 * mm, width)
    y = paragraph(c, "LUME - Line Cook", STYLES["course"], x, y - 3 * mm, width)
    y = paragraph(c, "Direct-to-guest service combining Japanese techniques "
                  "and Mexican flavours.", STYLES["body"], x, y - 1 * mm, width)
    y -= 8 * mm

    section(c, "EDUCATION", x, y, width)
    y -= 13 * mm
    y = paragraph(c, "Culinary Assistant - Technical Vocational Programme",
                  STYLES["school"], x, y, width)
    y = paragraph(c, "Escuela de Gastronomía de Medellín (EGM)",
                  STYLES["course"], x, y - 2 * mm, width)
    y = paragraph(c, "01/2019 - 12/2021 · Medellín, Colombia",
                  STYLES["date"], x, y - 1 * mm, width)
    y = paragraph(c, "Three-year culinary training programme",
                  STYLES["body"], x, y - 1 * mm, width)
    y -= 7 * mm
    y = paragraph(c, "Basic Molecular Cuisine Course",
                  STYLES["school"], x, y, width)
    y = paragraph(c, "Escuela MCS Colombia", STYLES["course"], x, y - 1 * mm, width)
    y = paragraph(c, "Complementary Culinary Training - completed after EGM",
                  STYLES["body"], x, y - 1 * mm, width)

    c.setStrokeColor(COPPER)
    c.setLineWidth(0.8)
    c.line(x, 28 * mm, x + 22 * mm, 28 * mm)
    quote = ParagraphStyle("closing", fontName="DisplayItalic", fontSize=11.5,
                           leading=16, textColor=INK)
    paragraph(c, "Demanding standards until the end.<br/>Pride after the final plate.",
              quote, x, 24 * mm, width)
    return y


def side_section(c, title, x, y, width):
    section(c, title, x, y, width, dark=True)
    return y - 11 * mm


def sidebar(c):
    page_w, page_h = A4
    side_w, x = 65 * mm, 13 * mm
    width = side_w - x - 11 * mm
    c.setFillColor(CHARCOAL)
    c.rect(0, 0, side_w, page_h, stroke=0, fill=1)
    c.setFillColor(COPPER)
    c.rect(side_w, 0, 0.65 * mm, page_h, stroke=0, fill=1)
    c.setFillColor(OFF_WHITE)
    c.setFont("Display", 19.5)
    c.drawString(x, page_h - 20 * mm, "ANDRÉS")
    c.drawString(x, page_h - 29 * mm, "TIRANO")

    y = side_section(c, "PROFILE", x, page_h - 42 * mm, width)
    y = paragraph(
        c,
        "Chef in Spanish hotels and restaurants. Hot-section production, "
        "premium service and calm under pressure.",
        STYLES["sidebar"], x, y, width,
    ) - 10 * mm

    y = side_section(c, "CORE STRENGTHS", x, y, width)
    strengths = [
        "Mise en place &amp; section organisation",
        "Show cooking &amp; guest interaction",
        "High-volume hotel service",
        "Product care &amp; attention to detail",
        "Teamwork under pressure",
    ]
    for item in strengths:
        c.setFillColor(COPPER)
        c.circle(x + 1 * mm, y - 2 * mm, 0.65 * mm, stroke=0, fill=1)
        y = paragraph(c, item, STYLES["sidebar_small"],
                      x + 5 * mm, y, width - 5 * mm) - 4.1 * mm
    y -= 3 * mm

    y = side_section(c, "LANGUAGES", x, y, width)
    for language, level in [("Spanish", "Native"), ("English", "B2")]:
        c.setFillColor(OFF_WHITE)
        c.setFont("SansBold", 8.0)
        c.drawString(x, y, language)
        c.setFillColor(SIDEBAR_TEXT)
        c.setFont("Sans", 7.9)
        c.drawString(x, y - 4.3 * mm, level)
        y -= 13 * mm

    y = side_section(c, "CONTACT", x, y - 2 * mm, width)
    for value in [
        "andres@tirano.co",
        "+34 603 91 99 93",
        "chef.tirano.co",
        "@anfetirano",
    ]:
        y = paragraph(c, value, STYLES["sidebar_small"], x, y, width) - 4 * mm

    y = side_section(c, "REFERENCES", x, y - 3 * mm, width)
    paragraph(c, "Professional references available upon request.",
              STYLES["sidebar_small"], x, y, width)


def second_page(c):
    page_w, page_h = A4
    c.setFillColor(PAPER)
    c.rect(0, 0, page_w, page_h, stroke=0, fill=1)
    lowest = main_second_page(c)
    if lowest < 46 * mm:
        raise ValueError("Education content collides with the closing statement")
    sidebar(c)
    footer(c, 2)


def build():
    reference.register_fonts()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUTPUT), pagesize=A4, pageCompression=1)
    c.setTitle("Andrés Tirano International Master CV")
    c.setAuthor("Andrés Felipe Tirano Vásquez")
    c.setSubject("International professional chef CV")
    first_page(c)
    c.showPage()
    second_page(c)
    c.save()
    return OUTPUT


if __name__ == "__main__":
    print(build())
