from pathlib import Path
from shutil import copy2

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    HRFlowable,
    Image,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "public" / "documents"
OUTPUT_FILE = OUTPUT_DIR / "andres-tirano-cv.pdf"
LEGACY_OUTPUT_DIR = ROOT / "output" / "pdf"
LEGACY_OUTPUT_FILE = LEGACY_OUTPUT_DIR / "andres-tirano-resume.pdf"
PORTRAIT_FILE = ROOT / "public" / "images" / "portrait" / "andres-tirano.jpg"


PALETTE = {
    "background": colors.HexColor("#F6F1EA"),
    "surface": colors.HexColor("#FBF7F1"),
    "surface_strong": colors.HexColor("#EFE5D7"),
    "text": colors.HexColor("#221A14"),
    "muted": colors.HexColor("#6E6154"),
    "accent": colors.HexColor("#A76A3A"),
    "border": colors.HexColor("#DCCFC0"),
}


RESUME = {
    "name": "Andres Tirano",
    "title": "Professional Cook",
    "tagline": (
        "Professional cook with experience in quality-focused restaurants, "
        "premium hospitality, brunch production, and high-volume hotel service."
    ),
    "summary": (
        "Based in Panama and currently seeking professional kitchen opportunities "
        "in Canada. Andres brings hands-on experience from chef Lucia Freitas's "
        "projects, premium hospitality in Malaga, brunch operations, and live "
        "hotel buffet service serving up to 1,200 guests a day."
    ),
    "location": "Panama",
    "availability": "Open to Canada and international relocation.",
    "contact": [
        ("Email", "andres@tirano.co"),
        ("Phone", "+507 62527773"),
        ("Instagram", "@anfetirano"),
        ("LinkedIn", "andres-f-tirano-vasquez"),
        ("Website", "chef.tirano.co"),
    ],
    "strengths": [
        "Reliable high-volume execution in live buffet stations serving around 1,200 guests per day.",
        "Precision in quality-focused kitchens shaped by A Tafona and LUME.",
        "Strong mise en place, station setup, purchasing support, and menu execution.",
        "Calm guest-facing service in brunch and hotel environments.",
    ],
    "experience": [
        (
            "2025",
            "Only YOU Hotel Malaga",
            "Hotel Line Cook",
            "Malaga, Spain",
            "Worked in the culinary environment of a five-star hotel, adding experience in premium hospitality standards, coordinated service, and guest-focused execution.",
        ),
        (
            "2024",
            "Hotel Gran Cervantes",
            "Showcooking Buffet Cook",
            "Torremolinos, Spain",
            "Worked in buffet showcooking across grill, wok, and crepes stations while serving a daily average of around 1,200 guests. Strengthened teamwork, guest interaction, speed, and consistency under pressure.",
        ),
        (
            "2022",
            "La Deriva",
            "Restaurant Line Cook",
            "Malaga, Spain",
            "Restaurant experience that reinforced mise en place discipline, service rhythm, and day-to-day kitchen coordination in a fast-moving dining environment.",
        ),
        (
            "2022",
            "The Club",
            "Brunch Cook",
            "Malaga, Spain",
            "Focused on assembly and brunch service while also supporting purchasing, inventory, menu creation, and pre-service preparation in a high-demand concept.",
        ),
        (
            "2021",
            "LUME",
            "Line Cook",
            "Santiago de Compostela, Spain",
            "Worked in an innovative direct-to-guest concept blending Japanese techniques with Mexican flavors, requiring accuracy, product respect, and clean execution.",
        ),
        (
            "2021",
            "A Tafona",
            "Prep Cook",
            "Santiago de Compostela, Spain",
            "Worked under chef Lucia Freitas in a quality-focused environment where pre-preparation, precision, and attention to detail were essential to maintaining kitchen standards.",
        ),
    ],
    "education": [
        (
            "Technical Program in Kitchen Assistance",
            "Escuela de Gastronomia de Medellin (EGM)",
            "Training in culinary techniques, ingredient handling, food safety, and menu preparation with a strong practical focus.",
        ),
        (
            "Basic Molecular Cuisine Course",
            "Escuela MCS Colombia",
            "Training in spherification, texture development, smoking, plating, and liquid nitrogen techniques with hands-on application.",
        ),
    ],
    "languages": [
        ("Spanish", "Native"),
        ("English", "Intermediate-upper (B2)"),
    ],
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
            fontSize=9.3,
            leading=14.3,
            textColor=PALETTE["muted"],
        )
    )
    styles.add(
        ParagraphStyle(
            name="SectionTitle",
            fontName="Helvetica-Bold",
            fontSize=11.2,
            leading=13,
            textColor=PALETTE["text"],
            spaceAfter=6,
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
            name="ItemTitle",
            fontName="Helvetica-Bold",
            fontSize=11,
            leading=13,
            textColor=PALETTE["text"],
            spaceAfter=2,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Meta",
            fontName="Helvetica",
            fontSize=8.3,
            leading=11,
            textColor=PALETTE["accent"],
        )
    )
    styles.add(
        ParagraphStyle(
            name="ContactValue",
            fontName="Helvetica-Bold",
            fontSize=8.8,
            leading=11,
            textColor=PALETTE["text"],
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


def section_heading(text, styles):
    return [
        Spacer(1, 4),
        Paragraph(text, styles["SectionTitle"]),
        HRFlowable(color=PALETTE["border"], thickness=0.6, spaceAfter=8, spaceBefore=0),
    ]


def build_header(styles):
    top_left = [
        Paragraph(RESUME["name"], styles["Name"]),
        Paragraph(RESUME["title"], styles["Role"]),
        Paragraph(RESUME["tagline"], styles["Body"]),
    ]

    portrait_cell = ""
    if PORTRAIT_FILE.exists():
        portrait_cell = Image(str(PORTRAIT_FILE), width=26 * mm, height=34 * mm)

    top_row = Table([[top_left, portrait_cell]], colWidths=[154 * mm, 28 * mm])
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

    summary_box = Table([[Paragraph(RESUME["summary"], styles["Body"])]], colWidths=[182 * mm])
    summary_box.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), PALETTE["surface"]),
                ("BOX", (0, 0), (-1, -1), 0.6, PALETTE["border"]),
                ("LEFTPADDING", (0, 0), (-1, -1), 10),
                ("RIGHTPADDING", (0, 0), (-1, -1), 10),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )

    contact_cells = []
    for label, value in RESUME["contact"]:
        contact_cells.append(
            [
                Paragraph(label.upper(), styles["SmallLabel"]),
                Paragraph(value, styles["ContactValue"]),
            ]
        )

    contact_cell_width = (182 / len(contact_cells)) * mm
    contact_row = Table([contact_cells], colWidths=[contact_cell_width] * len(contact_cells))
    contact_row.setStyle(
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

    canada_callout = Table(
        [[Paragraph("Seeking professional kitchen opportunities in Canada", styles["Callout"])]],
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

    return [
        HRFlowable(width="100%", thickness=2, color=PALETTE["accent"], spaceAfter=10, spaceBefore=0),
        top_row,
        Spacer(1, 10),
        summary_box,
        Spacer(1, 8),
        canada_callout,
        Spacer(1, 8),
        contact_row,
    ]


def build_strengths(styles):
    rows = []
    for index in range(0, len(RESUME["strengths"]), 2):
        left = Paragraph(RESUME["strengths"][index], styles["Body"])
        right = Paragraph(RESUME["strengths"][index + 1], styles["Body"])
        rows.append([left, right])

    table = Table(rows, colWidths=[88 * mm, 88 * mm], hAlign="LEFT")
    table.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), PALETTE["surface"]),
                ("BOX", (0, 0), (-1, -1), 0.6, PALETTE["border"]),
                ("INNERGRID", (0, 0), (-1, -1), 0.6, PALETTE["border"]),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 8),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
            ]
        )
    )
    return table


def build_experience(styles):
    blocks = []
    for year, venue, role, location, summary in RESUME["experience"]:
        role_line = Paragraph(f"{role} | {location}", styles["Body"])
        content = [
            Paragraph(venue, styles["ItemTitle"]),
            role_line,
            Spacer(1, 4),
            Paragraph(summary, styles["Body"]),
        ]
        item = Table([[Paragraph(year, styles["Meta"]), content]], colWidths=[18 * mm, 160 * mm])
        item.setStyle(
            TableStyle(
                [
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                    ("LINEBELOW", (0, 0), (-1, -1), 0.5, PALETTE["border"]),
                    ("LEFTPADDING", (0, 0), (-1, -1), 0),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                    ("TOPPADDING", (0, 0), (-1, -1), 0),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
                ]
            )
        )
        blocks.extend([item, Spacer(1, 6)])
    return blocks


def build_education(styles):
    items = []
    for title, institution, description in RESUME["education"]:
        items.extend(
            [
                Paragraph(title, styles["ItemTitle"]),
                Paragraph(institution, styles["Meta"]),
                Paragraph(description, styles["Body"]),
                Spacer(1, 7),
            ]
        )
    return items


def build_languages(styles):
    rows = []
    for name, level in RESUME["languages"]:
        rows.append(
            [
                Paragraph(name, styles["Body"]),
                Paragraph(level, styles["Body"]),
            ]
        )
    table = Table(rows, colWidths=[36 * mm, 44 * mm])
    table.setStyle(
        TableStyle(
            [
                ("TEXTCOLOR", (0, 0), (-1, -1), PALETTE["text"]),
                ("FONTNAME", (0, 0), (-1, -1), "Helvetica"),
                ("FONTSIZE", (0, 0), (-1, -1), 9),
                ("LEADING", (0, 0), (-1, -1), 13),
                ("LINEBELOW", (0, 0), (-1, -2), 0.5, PALETTE["border"]),
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
            ]
        )
    )
    return table


def build_story(styles):
    paragraphs = [
        "A chef shaped by demanding kitchens, disciplined preparation, and direct guest-facing service.",
        "His trajectory combines author-driven restaurant standards, premium hotel execution, and brunch operations, all connected by consistency and adaptability.",
        "The next step is to bring that experience into a professional kitchen in Canada.",
    ]
    return [Paragraph(text, styles["Body"]) for text in paragraphs]


def build_single_column_sections(styles):
    story = []

    story.extend(section_heading("Core strengths", styles))
    story.append(build_strengths(styles))
    story.append(Spacer(1, 12))

    story.extend(section_heading("Experience", styles))
    story.extend(build_experience(styles))

    story.extend(section_heading("Profile", styles))
    for paragraph in build_story(styles):
        story.extend([paragraph, Spacer(1, 6)])

    story.extend(section_heading("Education", styles))
    story.extend(build_education(styles))

    story.extend(section_heading("Languages", styles))
    story.append(build_languages(styles))

    return story


def create_pdf():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    LEGACY_OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    doc = SimpleDocTemplate(
        str(OUTPUT_FILE),
        pagesize=A4,
        leftMargin=14 * mm,
        rightMargin=14 * mm,
        topMargin=12 * mm,
        bottomMargin=12 * mm,
        title="Andres Tirano Resume",
        author="OpenAI Codex",
    )

    styles = build_styles()
    story = []

    story.extend(build_header(styles))
    story.append(Spacer(1, 12))
    story.extend(build_single_column_sections(styles))

    def paint_page(canvas, doc):
        canvas.saveState()
        canvas.setFillColor(colors.white)
        canvas.rect(0, 0, A4[0], A4[1], stroke=0, fill=1)
        canvas.restoreState()

    doc.build(story, onFirstPage=paint_page, onLaterPages=paint_page)
    copy2(OUTPUT_FILE, LEGACY_OUTPUT_FILE)
    return OUTPUT_FILE


if __name__ == "__main__":
    pdf_path = create_pdf()
    print(pdf_path)
