"""Generate the final English CV for Ireland.

Employment months below are approximate dates reconstructed by the candidate,
not dates verified against employment records. The MCS course took place after
EGM; its date is unknown and must not be inferred from the older website.
"""

import re
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    HRFlowable,
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output" / "pdf" / "andres-tirano-cv-ireland-final.pdf"
PORTRAIT = ROOT / "public" / "images" / "portrait" / "andres-skin-tone-test-v1.png"
FONT_DIR = Path("/System/Library/Fonts/Supplemental")

INK = colors.HexColor("#201B17")
MUTED = colors.HexColor("#5F5750")
COPPER = colors.HexColor("#B96D3B")
RULE = colors.HexColor("#D7CCC0")
PAPER = colors.HexColor("#FBF9F5")


# Employment months are candidate-supplied approximations, not document-verified.
# The candidate selected 2023 for La Deriva, replacing the old CV's 2022.
EMPLOYMENT = [
    {
        "title": "Cook - Hot Section",
        "employer": "Balneario de Panticosa",
        "place": "Huesca, Spain",
        "dates": "08/2026 - Present",
        "bullets": [
            "Organise mise en place and hot-section production for a high-volume buffet serving several hundred guests.",
            "Manage simultaneous hot preparations, regeneration and continuous buffet replenishment during service.",
            "Coordinate with kitchen colleagues, apply food-safety procedures and adapt production to menu and product availability.",
        ],
    },
    {
        "title": "Chef de Partie",
        "employer": "Only YOU Hotel Málaga",
        "place": "Málaga, Spain",
        "dates": "02/2025 - 12/2025",
        "bullets": [
            "Worked within a five-star hotel kitchen, following premium hospitality standards and coordinated service procedures.",
        ],
    },
    {
        "title": "Show Cooking Chef",
        "employer": "Gran Hotel Cervantes",
        "place": "Torremolinos, Málaga, Spain",
        "dates": "02/2024 - 11/2024",
        "bullets": [
            "Covered grill, wok and crêpe stations in buffet service for around 1,200 guests daily.",
            "Maintained speed and consistency while working directly with guests.",
        ],
    },
    {
        "title": "Line Cook",
        "employer": "La Deriva",
        "place": "Málaga, Spain",
        "dates": "02/2023 - 11/2023",
        "bullets": [
            "Worked on mise en place and restaurant service in a fast-moving kitchen.",
        ],
    },
    {
        "title": "Cook",
        "employer": "The Club Málaga",
        "place": "Málaga, Spain",
        "dates": "07/2022 - 12/2022",
        "bullets": [
            "Prepared and served brunch; supported purchasing, inventory, menu development and pre-service preparation.",
        ],
    },
]

LUCIA_FREITAS = {
    "heading": "Lucía Freitas - A Tafona & LUME",
    "place": "Santiago de Compostela, Spain",
    "dates": "03/2021 - 06/2022",
    "context": (
        "Both establishments were led by Lucía Freitas. Shifts alternated between "
        "A Tafona and LUME within the same professional structure; the overlap is intentional."
    ),
    "roles": [
        (
            "A Tafona - Prep Cook",
            "Prepared ingredients and pre-service work with attention to precision and daily kitchen standards.",
        ),
        (
            "LUME - Line Cook",
            "Worked in a direct-to-guest concept combining Japanese techniques and Mexican flavours, with a focus on accurate execution and product care.",
        ),
    ],
}

def register_fonts():
    pdfmetrics.registerFont(TTFont("GeorgiaCV", str(FONT_DIR / "Georgia.ttf")))
    pdfmetrics.registerFont(TTFont("ArialCV", str(FONT_DIR / "Arial.ttf")))
    pdfmetrics.registerFont(TTFont("ArialBoldCV", str(FONT_DIR / "Arial Bold.ttf")))


def make_styles():
    return {
        "section": ParagraphStyle(
            "section", fontName="ArialBoldCV", fontSize=9.3, leading=12,
            textColor=COPPER, spaceBefore=10 * mm, spaceAfter=3 * mm,
        ),
        "body": ParagraphStyle(
            "body", fontName="ArialCV", fontSize=8.7, leading=13.2,
            textColor=INK, alignment=TA_LEFT,
        ),
        "job": ParagraphStyle(
            "job", fontName="ArialBoldCV", fontSize=10.3, leading=13.7,
            textColor=INK,
        ),
        "course": ParagraphStyle(
            "course", fontName="ArialBoldCV", fontSize=9.1, leading=12.4,
            textColor=INK,
        ),
        "meta": ParagraphStyle(
            "meta", fontName="ArialCV", fontSize=8.4, leading=12,
            textColor=MUTED,
        ),
        "date": ParagraphStyle(
            "date", fontName="ArialBoldCV", fontSize=8.2, leading=12,
            textColor=COPPER,
        ),
        "bullet": ParagraphStyle(
            "bullet", fontName="ArialCV", fontSize=8.5, leading=12.8,
            textColor=INK, leftIndent=9 * mm, firstLineIndent=-4 * mm,
        ),
        "small": ParagraphStyle(
            "small", fontName="ArialCV", fontSize=7.7, leading=11.1,
            textColor=MUTED,
        ),
    }


def draw_page(c, doc):
    page_w, page_h = A4
    c.saveState()
    c.setFillColor(PAPER)
    c.rect(0, 0, page_w, page_h, fill=1, stroke=0)
    c.setFillColor(INK)
    c.rect(0, page_h - 5 * mm, page_w, 5 * mm, fill=1, stroke=0)
    c.setFillColor(COPPER)
    c.rect(0, page_h - 5.7 * mm, page_w, 0.7 * mm, fill=1, stroke=0)

    c.setFillColor(INK)
    c.setFont("GeorgiaCV", 17)
    c.drawString(18 * mm, page_h - 19 * mm, "ANDRÉS FELIPE TIRANO VÁSQUEZ")
    c.setFont("ArialBoldCV", 8)
    c.setFillColor(COPPER)
    c.drawString(18 * mm, page_h - 26 * mm, "PROFESSIONAL CHEF | CHEF DE PARTIE")

    c.setFont("ArialCV", 7.8)
    c.setFillColor(MUTED)
    c.drawString(18 * mm, page_h - 32 * mm, "andres@tirano.co  |  +34 603 91 99 93  |  chef.tirano.co")
    c.setStrokeColor(RULE)
    c.line(18 * mm, page_h - 36 * mm, page_w - 18 * mm, page_h - 36 * mm)

    if doc.page == 1:
        portrait = ImageReader(str(PORTRAIT))
        c.drawImage(
            portrait, page_w - 42 * mm, page_h - 32 * mm,
            width=20 * mm, height=25 * mm, preserveAspectRatio=False, mask="auto",
        )

    c.setStrokeColor(RULE)
    c.line(18 * mm, 15 * mm, page_w - 18 * mm, 15 * mm)
    c.setFillColor(MUTED)
    c.setFont("ArialCV", 7)
    c.drawString(18 * mm, 10 * mm, "ANDRÉS FELIPE TIRANO VÁSQUEZ")
    c.drawRightString(page_w - 18 * mm, 10 * mm, f"{doc.page:02d}")
    c.restoreState()


def job_flow(job, styles):
    parts = [
        Paragraph(job["title"], styles["job"]),
        Paragraph(f'{job["employer"]} - {job["place"]}', styles["meta"]),
        Paragraph(job["dates"], styles["date"]),
        Spacer(1, 1.5 * mm),
    ]
    for bullet in job["bullets"]:
        parts.append(Paragraph(f"•  {bullet}", styles["bullet"]))
    parts.append(Spacer(1, 4 * mm))
    return KeepTogether(parts)


def build():
    register_fonts()
    styles = make_styles()
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    doc = SimpleDocTemplate(
        str(OUTPUT), pagesize=A4, leftMargin=18 * mm, rightMargin=18 * mm,
        topMargin=40 * mm, bottomMargin=18 * mm,
        title="Andrés Felipe Tirano Vásquez - Curriculum Vitae",
        author="Andrés Felipe Tirano Vásquez",
    )
    story = [
        Paragraph("Nationality: Colombian  |  Current Location: Huesca, Spain", styles["body"]),
        Paragraph("Open to Relocation: Anywhere in Ireland  |  Irish Employment Permit Required", styles["body"]),
        Paragraph("PROFESSIONAL SUMMARY", styles["section"]),
        HRFlowable(width="100%", thickness=0.5, color=RULE),
        Spacer(1, 2 * mm),
        Paragraph(
            "Professional cook working in the Spanish Pyrenees, with experience across hot-section "
            "production, high-volume hotel buffets, premium hospitality, restaurant service and "
            "chef-led kitchens in Spain. Brings disciplined mise en place, food-safety practice, "
            "consistent service and adaptability within diverse kitchen teams.",
            styles["body"],
        ),
        Paragraph("EMPLOYMENT HISTORY", styles["section"]),
        HRFlowable(width="100%", thickness=0.5, color=RULE),
        Spacer(1, 3 * mm),
    ]
    for job in EMPLOYMENT:
        if job["employer"] == "The Club Málaga":
            story.append(PageBreak())
        story.append(job_flow(job, styles))

    group = [
        Paragraph(LUCIA_FREITAS["heading"], styles["job"]),
        Paragraph(LUCIA_FREITAS["place"], styles["meta"]),
        Paragraph(LUCIA_FREITAS["dates"], styles["date"]),
        Paragraph(LUCIA_FREITAS["context"], styles["small"]),
        Spacer(1, 2 * mm),
    ]
    for title, duty in LUCIA_FREITAS["roles"]:
        group.extend((Paragraph(title, styles["job"]), Paragraph(f"•  {duty}", styles["bullet"])))
    story.append(KeepTogether(group))

    story.extend(
        [
            Paragraph("EDUCATION", styles["section"]),
            HRFlowable(width="100%", thickness=0.5, color=RULE),
            Spacer(1, 2 * mm),
            Paragraph("Culinary Assistant - Technical Vocational Programme", styles["job"]),
            Paragraph("Escuela de Gastronomía de Medellín (EGM)  |  01/2019 - 12/2021", styles["meta"]),
            Paragraph("Medellín, Colombia  |  Three-year culinary training programme", styles["small"]),
            Spacer(1, 5 * mm),
            Paragraph("Basic Molecular Cuisine Course", styles["course"]),
            Paragraph("Escuela MCS Colombia", styles["meta"]),
            Paragraph("Complementary Culinary Training - completed after EGM", styles["small"]),
            Paragraph("LANGUAGES & REFERENCES", styles["section"]),
            HRFlowable(width="100%", thickness=0.5, color=RULE),
            Spacer(1, 2 * mm),
            Paragraph("Spanish - Native  |  English - B2", styles["body"]),
            Paragraph("Professional references available upon request.", styles["body"]),
        ]
    )

    doc.build(story, onFirstPage=draw_page, onLaterPages=draw_page)
    return OUTPUT


def month_index(value):
    month, year = map(int, value.split("/"))
    if not 1 <= month <= 12:
        raise ValueError(f"Invalid month: {value}")
    return year * 12 + month - 1


def review_chronology():
    """Return unexplained calendar-month breaks without inventing activities."""
    periods = []
    for job in EMPLOYMENT:
        start, end = job["dates"].split(" - ")
        periods.append((month_index(start), None if end == "Present" else month_index(end), job["employer"]))
    group_start, group_end = LUCIA_FREITAS["dates"].split(" - ")
    periods.append((month_index(group_start), month_index(group_end), "A Tafona & LUME"))
    periods.sort()
    if periods[0][2] != "A Tafona & LUME":
        raise ValueError("Unexpected first employment period")
    if periods[-1][2] != "Balneario de Panticosa" or periods[-1][1] is not None:
        raise ValueError("Current employment period missing")

    breaks = []
    for (_, previous_end, previous_name), (next_start, _, next_name) in zip(periods, periods[1:]):
        if previous_end is None or next_start <= previous_end:
            raise ValueError(f"Unexpected overlapping periods: {previous_name}, {next_name}")
        months = next_start - previous_end - 1
        if months:
            breaks.append((previous_name, next_name, months))
    if not re.fullmatch(r"\d{2}/\d{4} - \d{2}/\d{4}", LUCIA_FREITAS["dates"]):
        raise ValueError("Lucía Freitas group dates must use MM/YYYY")
    return breaks


if __name__ == "__main__":
    for before, after, months in review_chronology():
        print(f"Unexplained break: {months} month(s) between {before} and {after}")
    print(build())
