from datetime import date
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import HRFlowable, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "public" / "documents"
OUTPUT_FILE = OUTPUT_DIR / "andres-tirano-cover-letter.pdf"


PALETTE = {
    "surface": colors.HexColor("#FBF7F1"),
    "surface_strong": colors.HexColor("#EFE5D7"),
    "text": colors.HexColor("#221A14"),
    "muted": colors.HexColor("#6E6154"),
    "accent": colors.HexColor("#A76A3A"),
    "border": colors.HexColor("#DCCFC0"),
}


COVER_LETTER = {
    "name": "Andres Tirano",
    "title": "Professional Cook",
    "date": date.today().strftime("%B %d, %Y"),
    "location": "",
    "availability": "Open to professional kitchen opportunities and available for relocation",
    "contact": [
        ("Email", "andres@tirano.co"),
        ("Phone", "+34 603 91 99 93"),
        ("LinkedIn", "Andres F. Tirano Vasquez"),
        ("Website", "chef.tirano.co"),
    ],
    "opening": "Dear Hiring Manager,",
    "paragraphs": [
        (
            "I am writing to express my interest in joining your kitchen team. "
            "I am a professional cook with hands-on experience in quality-focused "
            "restaurants, brunch operations, premium hospitality, and high-volume "
            "hotel service."
        ),
        (
            "My background includes work in Spain across chef Lucía Freitas's "
            "projects, brunch-focused production, and live buffet stations serving "
            "large numbers of guests each day. These environments strengthened my "
            "discipline, mise en place, station organization, and ability to maintain "
            "consistent execution under pressure."
        ),
        (
            "I would bring a strong respect for kitchen standards, calm teamwork, and "
            "a guest-focused mindset. I am comfortable supporting prep, line service, "
            "buffet execution, and fast-paced daily operations while protecting quality "
            "and cleanliness."
        ),
        (
            "At this stage of my career, I am seeking the opportunity to continue "
            "growing in a serious professional kitchen where I can contribute, learn "
            "quickly, and adapt to the standards of a strong culinary team. Thank you "
            "for your time and consideration. I would welcome the opportunity to speak "
            "with you."
        ),
    ],
    "closing": "Sincerely,",
}


def build_styles():
    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            name="Name",
            fontName="Helvetica-Bold",
            fontSize=24,
            leading=27,
            textColor=PALETTE["text"],
            spaceAfter=2,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Role",
            fontName="Helvetica-Bold",
            fontSize=11,
            leading=14,
            textColor=PALETTE["accent"],
            spaceAfter=6,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Body",
            fontName="Helvetica",
            fontSize=10,
            leading=16,
            textColor=PALETTE["muted"],
        )
    )
    styles.add(
        ParagraphStyle(
            name="SmallLabel",
            fontName="Helvetica-Bold",
            fontSize=7.5,
            leading=10,
            textColor=PALETTE["muted"],
            uppercase=True,
        )
    )
    styles.add(
        ParagraphStyle(
            name="ContactValue",
            fontName="Helvetica-Bold",
            fontSize=8.6,
            leading=11,
            textColor=PALETTE["text"],
        )
    )
    styles.add(
        ParagraphStyle(
            name="LetterHeading",
            fontName="Helvetica-Bold",
            fontSize=11.4,
            leading=14,
            textColor=PALETTE["text"],
        )
    )
    styles.add(
        ParagraphStyle(
            name="Meta",
            fontName="Helvetica",
            fontSize=8.5,
            leading=11,
            textColor=PALETTE["accent"],
        )
    )
    styles.add(
        ParagraphStyle(
            name="Callout",
            fontName="Helvetica-Bold",
            fontSize=9.2,
            leading=12,
            textColor=PALETTE["text"],
        )
    )
    return styles


def build_contact_row(styles):
    cells = []
    for label, value in COVER_LETTER["contact"]:
        cells.append(
            [
                Paragraph(label.upper(), styles["SmallLabel"]),
                Paragraph(value, styles["ContactValue"]),
            ]
        )

    cell_width = (182 / len(cells)) * mm
    row = Table([cells], colWidths=[cell_width] * len(cells))
    row.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), PALETTE["surface"]),
                ("BOX", (0, 0), (-1, -1), 0.6, PALETTE["border"]),
                ("INNERGRID", (0, 0), (-1, -1), 0.6, PALETTE["border"]),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )
    return row


def build_letter_box(styles):
    content = [
        Paragraph(COVER_LETTER["opening"], styles["LetterHeading"]),
        Spacer(1, 7),
    ]

    for paragraph in COVER_LETTER["paragraphs"]:
        content.extend([Paragraph(paragraph, styles["Body"]), Spacer(1, 9)])

    content.extend(
        [
            Paragraph(COVER_LETTER["closing"], styles["Body"]),
            Spacer(1, 5),
            Paragraph(COVER_LETTER["name"], styles["LetterHeading"]),
        ]
    )

    box = Table([[content]], colWidths=[182 * mm])
    box.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), PALETTE["surface"]),
                ("BOX", (0, 0), (-1, -1), 0.6, PALETTE["border"]),
                ("LEFTPADDING", (0, 0), (-1, -1), 12),
                ("RIGHTPADDING", (0, 0), (-1, -1), 12),
                ("TOPPADDING", (0, 0), (-1, -1), 12),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 12),
            ]
        )
    )
    return box


def create_pdf():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    doc = SimpleDocTemplate(
        str(OUTPUT_FILE),
        pagesize=A4,
        leftMargin=14 * mm,
        rightMargin=14 * mm,
        topMargin=12 * mm,
        bottomMargin=12 * mm,
        title="Andres Tirano Cover Letter",
        author="OpenAI Codex",
    )

    styles = build_styles()

    top_row = Table(
        [[
            [
                Paragraph(COVER_LETTER["name"], styles["Name"]),
                Paragraph(COVER_LETTER["title"], styles["Role"]),
                Paragraph(
                    "Cover letter for professional kitchen opportunities.",
                    styles["Body"],
                ),
            ],
            [
                Paragraph(COVER_LETTER["date"], styles["Meta"]),
                Spacer(1, 6),
                Paragraph(COVER_LETTER["location"], styles["Body"]) if COVER_LETTER["location"] else Spacer(1, 0),
                Paragraph(COVER_LETTER["availability"], styles["Body"]),
            ],
        ]],
        colWidths=[132 * mm, 50 * mm],
    )
    top_row.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("ALIGN", (1, 0), (1, 0), "RIGHT"),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
            ]
        )
    )

    canada_callout = Table(
        [[Paragraph("Seeking a serious professional kitchen opportunity", styles["Callout"])]],
        colWidths=[182 * mm],
    )
    canada_callout.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), PALETTE["surface_strong"]),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )

    story = [
        HRFlowable(width="100%", thickness=2, color=PALETTE["accent"], spaceAfter=10, spaceBefore=0),
        top_row,
        Spacer(1, 10),
        build_contact_row(styles),
        Spacer(1, 8),
        canada_callout,
        Spacer(1, 10),
        build_letter_box(styles),
    ]

    def paint_page(canvas, doc):
        canvas.saveState()
        canvas.setFillColor(colors.white)
        canvas.rect(0, 0, A4[0], A4[1], stroke=0, fill=1)
        canvas.restoreState()

    doc.build(story, onFirstPage=paint_page, onLaterPages=paint_page)
    return OUTPUT_FILE


if __name__ == "__main__":
    pdf_path = create_pdf()
    print(pdf_path)
