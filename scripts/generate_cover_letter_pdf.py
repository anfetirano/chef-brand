from datetime import date
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import HRFlowable, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "public" / "documents"
OUTPUT_FILES = {
    "en": OUTPUT_DIR / "andres-tirano-cover-letter.pdf",
    "es": OUTPUT_DIR / "andres-tirano-cover-letter-es.pdf",
}


PALETTE = {
    "surface": colors.HexColor("#FBF7F1"),
    "surface_strong": colors.HexColor("#EFE5D7"),
    "text": colors.HexColor("#221A14"),
    "muted": colors.HexColor("#6E6154"),
    "accent": colors.HexColor("#A76A3A"),
    "border": colors.HexColor("#DCCFC0"),
}


def spanish_date(today: date) -> str:
    months = {
        1: "enero",
        2: "febrero",
        3: "marzo",
        4: "abril",
        5: "mayo",
        6: "junio",
        7: "julio",
        8: "agosto",
        9: "septiembre",
        10: "octubre",
        11: "noviembre",
        12: "diciembre",
    }
    return f"{today.day} de {months[today.month]} de {today.year}"


today = date.today()

COVER_LETTERS = {
    "en": {
        "title": "Professional Cook",
        "date": today.strftime("%B %d, %Y"),
        "availability": "Open to professional kitchen opportunities and available for relocation",
        "contact": [
            ("Email", "andres@tirano.co"),
            ("Phone", "+34 603 91 99 93"),
            ("LinkedIn", "Andres F. Tirano Vasquez"),
            ("Website", "chef.tirano.co"),
        ],
        "intro_note": "Cover letter for professional kitchen opportunities.",
        "callout": "Seeking a serious professional kitchen opportunity",
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
        "pdf_title": "Andres Tirano Cover Letter",
    },
    "es": {
        "title": "Cocinero profesional",
        "date": spanish_date(today),
        "availability": "Disponible para oportunidades profesionales de cocina y reubicación",
        "contact": [
            ("Correo", "andres@tirano.co"),
            ("Teléfono", "+34 603 91 99 93"),
            ("LinkedIn", "Andres F. Tirano Vasquez"),
            ("Sitio web", "chef.tirano.co"),
        ],
        "intro_note": "Carta de presentación para oportunidades profesionales de cocina.",
        "callout": "Buscando una oportunidad seria dentro de una cocina profesional",
        "opening": "Estimado equipo de selección:",
        "paragraphs": [
            (
                "Me dirijo a ustedes para expresar mi interés en formar parte de su equipo de "
                "cocina. Soy cocinero profesional con experiencia práctica en restaurantes "
                "enfocados en la calidad, operaciones de brunch, hospitalidad premium y "
                "servicio hotelero de alto volumen."
            ),
            (
                "Mi trayectoria incluye experiencia en España dentro de proyectos liderados "
                "por la chef Lucía Freitas, operaciones de brunch y estaciones de buffet en "
                "vivo con atención a un gran número de comensales cada día. Estos entornos "
                "reforzaron mi disciplina, mi mise en place, la organización de estación y "
                "mi capacidad para mantener una ejecución constante bajo presión."
            ),
            (
                "Puedo aportar respeto por los estándares de cocina, trabajo en equipo y "
                "enfoque en el servicio. Me siento cómodo apoyando preelaboración, servicio "
                "de línea, buffet y operaciones diarias de ritmo alto, siempre cuidando la "
                "calidad, el orden y la limpieza."
            ),
            (
                "En esta etapa de mi carrera busco seguir creciendo dentro de una cocina "
                "profesional seria, donde pueda contribuir con compromiso, adaptarme "
                "rápidamente y seguir desarrollándome junto a un equipo exigente. Agradezco "
                "su tiempo y consideración, y quedo a disposición para conversar en una entrevista."
            ),
        ],
        "closing": "Atentamente,",
        "pdf_title": "Carta de Presentacion de Andres Tirano",
    },
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


def build_contact_row(styles, content):
    cells = []
    for label, value in content["contact"]:
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


def build_letter_box(styles, content):
    story = [
        Paragraph(content["opening"], styles["LetterHeading"]),
        Spacer(1, 7),
    ]

    for paragraph in content["paragraphs"]:
        story.extend([Paragraph(paragraph, styles["Body"]), Spacer(1, 9)])

    story.extend(
        [
            Paragraph(content["closing"], styles["Body"]),
            Spacer(1, 5),
            Paragraph("Andres Tirano", styles["LetterHeading"]),
        ]
    )

    box = Table([[story]], colWidths=[182 * mm])
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


def create_pdf(locale: str):
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    content = COVER_LETTERS[locale]
    output_file = OUTPUT_FILES[locale]

    doc = SimpleDocTemplate(
        str(output_file),
        pagesize=A4,
        leftMargin=14 * mm,
        rightMargin=14 * mm,
        topMargin=12 * mm,
        bottomMargin=12 * mm,
        title=content["pdf_title"],
        author="OpenAI Codex",
    )

    styles = build_styles()

    top_row = Table(
        [[
            [
                Paragraph("Andres Tirano", styles["Name"]),
                Paragraph(content["title"], styles["Role"]),
                Paragraph(content["intro_note"], styles["Body"]),
            ],
            [
                Paragraph(content["date"], styles["Meta"]),
                Spacer(1, 6),
                Paragraph(content["availability"], styles["Body"]),
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

    callout = Table(
        [[Paragraph(content["callout"], styles["Callout"])]],
        colWidths=[182 * mm],
    )
    callout.setStyle(
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
        build_contact_row(styles, content),
        Spacer(1, 8),
        callout,
        Spacer(1, 10),
        build_letter_box(styles, content),
    ]

    def paint_page(canvas, _doc):
        canvas.saveState()
        canvas.setFillColor(colors.white)
        canvas.rect(0, 0, A4[0], A4[1], stroke=0, fill=1)
        canvas.restoreState()

    doc.build(story, onFirstPage=paint_page, onLaterPages=paint_page)
    return output_file


if __name__ == "__main__":
    for locale in ("en", "es"):
        print(create_pdf(locale))
