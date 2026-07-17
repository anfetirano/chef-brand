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
OUTPUT_FILES = {
    "en": OUTPUT_DIR / "andres-tirano-cv.pdf",
    "es": OUTPUT_DIR / "andres-tirano-cv-es.pdf",
}
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


RESUMES = {
    "en": {
        "name": "Andres Tirano",
        "title": "Professional Cook",
        "tagline": (
            "Professional cook with experience in quality-focused restaurants, "
            "premium hospitality, brunch production, and high-volume hotel service."
        ),
        "summary": (
            "Currently seeking professional kitchen opportunities. "
            "Andres brings hands-on experience from chef Lucía Freitas's "
            "projects, premium hospitality in Málaga, brunch operations, and live "
            "hotel buffet service serving up to 1,200 guests a day."
        ),
        "callout": "Seeking professional kitchen opportunities",
        "contact": [
            ("Email", "andres@tirano.co"),
            ("Phone", "+34 603 91 99 93"),
            ("Instagram", "@anfetirano"),
            ("LinkedIn", "Andres F. Tirano Vasquez"),
            ("Website", "chef.tirano.co"),
        ],
        "strengths_heading": "Core strengths",
        "strengths": [
            "Reliable high-volume execution in live buffet stations serving around 1,200 guests per day.",
            "Precision in quality-focused kitchens shaped by A Tafona and LUME.",
            "Strong mise en place, station setup, purchasing support, and menu execution.",
            "Calm guest-facing service in brunch and hotel environments.",
            "Experience in premium hospitality environments with polished service standards.",
            "Adaptable across chef-led restaurants, brunch concepts, and hotel kitchens.",
        ],
        "experience_heading": "Experience",
        "experience": [
            (
                "2025",
                "Only YOU Hotel Málaga",
                "Hotel Line Cook",
                "Málaga, Spain",
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
                "Málaga, Spain",
                "Restaurant experience that reinforced mise en place discipline, service rhythm, and day-to-day kitchen coordination in a fast-moving dining environment.",
            ),
            (
                "2022",
                "The Club",
                "Brunch Cook",
                "Málaga, Spain",
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
                "Worked under chef Lucía Freitas in a quality-focused environment where pre-preparation, precision, and attention to detail were essential to maintaining kitchen standards.",
            ),
        ],
        "profile_heading": "Profile",
        "profile": [
            "A cook shaped by demanding kitchens, disciplined preparation, and direct guest-facing service.",
            "His trajectory combines chef-led restaurant standards, premium hotel execution, and brunch operations, all connected by consistency and adaptability.",
            "The next step is to bring that experience into a professional kitchen where high standards and consistency matter every day.",
        ],
        "education_heading": "Education",
        "education": [
            (
                "Technical Program in Kitchen Assistance",
                "Escuela de Gastronomía de Medellín (EGM)",
                "Training in culinary techniques, ingredient handling, food safety, and menu preparation with a strong practical focus.",
            ),
            (
                "Basic Molecular Cuisine Course",
                "Escuela MCS Colombia",
                "Training in spherification, texture development, smoking, plating, and liquid nitrogen techniques with hands-on application.",
            ),
        ],
        "languages_heading": "Languages",
        "languages": [
            ("Spanish", "Native"),
            ("English", "Upper-intermediate (B2)"),
        ],
    },
    "es": {
        "name": "Andres Tirano",
        "title": "Cocinero profesional",
        "tagline": (
            "Cocinero profesional con experiencia en restaurantes enfocados en calidad, "
            "hospitalidad premium, producción de brunch y servicio hotelero de alto volumen."
        ),
        "summary": (
            "Actualmente buscando oportunidades profesionales de cocina, "
            "Andres aporta experiencia práctica en proyectos de la chef Lucía "
            "Freitas, hospitalidad premium en Málaga, operaciones de brunch y servicio "
            "de buffet en vivo para hasta 1,200 comensales por día."
        ),
        "callout": "Buscando oportunidades profesionales de cocina",
        "contact": [
            ("Correo", "andres@tirano.co"),
            ("Teléfono", "+34 603 91 99 93"),
            ("Instagram", "@anfetirano"),
            ("LinkedIn", "Andres F. Tirano Vasquez"),
            ("Sitio web", "chef.tirano.co"),
        ],
        "strengths_heading": "Fortalezas clave",
        "strengths": [
            "Ejecución confiable en estaciones de buffet en vivo atendiendo alrededor de 1,200 comensales por día.",
            "Precisión en cocinas enfocadas en calidad, marcada por A Tafona y LUME.",
            "Sólido mise en place, montaje de estación, apoyo en compras y ejecución de menú.",
            "Servicio sereno de cara al cliente en entornos de brunch y hotelería.",
            "Experiencia en hospitalidad premium con estándares de servicio pulidos.",
            "Adaptabilidad entre restaurantes liderados por chefs, conceptos de brunch y cocinas hoteleras.",
        ],
        "experience_heading": "Experiencia",
        "experience": [
            (
                "2025",
                "Only YOU Hotel Málaga",
                "Cocinero de línea en hotel",
                "Málaga, España",
                "Trabajó en el entorno culinario de un hotel cinco estrellas, sumando experiencia en estándares de hospitalidad premium, servicio coordinado y ejecución orientada al cliente.",
            ),
            (
                "2024",
                "Hotel Gran Cervantes",
                "Cocinero de buffet showcooking",
                "Torremolinos, España",
                "Trabajó en buffet showcooking cubriendo estaciones como grill, wok y crepes mientras atendía un promedio diario de alrededor de 1,200 comensales. Fortaleció trabajo en equipo, interacción con clientes, velocidad y consistencia bajo presión.",
            ),
            (
                "2022",
                "La Deriva",
                "Cocinero de línea en restaurante",
                "Málaga, España",
                "Experiencia en restaurante que reforzó la disciplina de mise en place, el ritmo de servicio y la coordinación diaria de cocina en un entorno de alto movimiento.",
            ),
            (
                "2022",
                "The Club",
                "Cocinero de brunch",
                "Málaga, España",
                "Enfocado en montaje y servicio de brunch, apoyando además compras, inventario, creación de menú y preparación previa al servicio en un concepto de alta demanda.",
            ),
            (
                "2021",
                "LUME",
                "Cocinero de línea",
                "Santiago de Compostela, España",
                "Trabajó en un concepto innovador de servicio directo al cliente que combinaba técnicas japonesas con sabores mexicanos, exigiendo precisión, respeto por el producto y ejecución limpia.",
            ),
            (
                "2021",
                "A Tafona",
                "Cocinero de preparación",
                "Santiago de Compostela, España",
                "Trabajó bajo la chef Lucía Freitas en un entorno enfocado en la calidad donde la preelaboración, la precisión y la atención al detalle eran esenciales para mantener los estándares de cocina.",
            ),
        ],
        "profile_heading": "Perfil",
        "profile": [
            "Un cocinero formado por cocinas exigentes, preparación disciplinada y servicio directo al cliente.",
            "Su trayectoria combina estándares de restaurantes liderados por chefs, ejecución hotelera premium y operaciones de brunch, unidas por consistencia y adaptabilidad.",
            "El siguiente paso es llevar esa experiencia a una cocina profesional donde los estándares altos y la consistencia importan cada día.",
        ],
        "education_heading": "Formación",
        "education": [
            (
                "Programa técnico en asistencia de cocina",
                "Escuela de Gastronomía de Medellín (EGM)",
                "Formación en técnicas culinarias, manejo de ingredientes, seguridad alimentaria y preparación de menús con un fuerte enfoque práctico.",
            ),
            (
                "Curso básico de cocina molecular",
                "Escuela MCS Colombia",
                "Formación en esferificación, desarrollo de texturas, ahumados, emplatado y técnicas con nitrógeno líquido con aplicación práctica.",
            ),
        ],
        "languages_heading": "Idiomas",
        "languages": [
            ("Español", "Nativo"),
            ("Inglés", "Intermedio alto (B2)"),
        ],
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


def build_contact_row(contact, styles):
    contact_cells = []
    for label, value in contact:
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
    return contact_row


def build_header(resume, styles):
    top_left = [
        Paragraph(resume["name"], styles["Name"]),
        Paragraph(resume["title"], styles["Role"]),
        Paragraph(resume["tagline"], styles["Body"]),
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

    summary_box = Table([[Paragraph(resume["summary"], styles["Body"])]], colWidths=[182 * mm])
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

    callout = Table(
        [[Paragraph(resume["callout"], styles["Callout"])]],
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

    return [
        HRFlowable(width="100%", thickness=2, color=PALETTE["accent"], spaceAfter=10, spaceBefore=0),
        top_row,
        Spacer(1, 10),
        summary_box,
        Spacer(1, 8),
        callout,
        Spacer(1, 8),
        build_contact_row(resume["contact"], styles),
    ]


def build_strengths(resume, styles):
    rows = []
    for index in range(0, len(resume["strengths"]), 2):
        left = Paragraph(resume["strengths"][index], styles["Body"])
        right = Paragraph(resume["strengths"][index + 1], styles["Body"])
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


def build_experience(resume, styles):
    blocks = []
    for year, venue, role, location, summary in resume["experience"]:
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


def build_education(resume, styles):
    items = []
    for title, institution, description in resume["education"]:
        items.extend(
            [
                Paragraph(title, styles["ItemTitle"]),
                Paragraph(institution, styles["Meta"]),
                Paragraph(description, styles["Body"]),
                Spacer(1, 7),
            ]
        )
    return items


def build_languages(resume, styles):
    rows = []
    for name, level in resume["languages"]:
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


def build_single_column_sections(resume, styles):
    story = []

    story.extend(section_heading(resume["strengths_heading"], styles))
    story.append(build_strengths(resume, styles))
    story.append(Spacer(1, 12))

    story.extend(section_heading(resume["experience_heading"], styles))
    story.extend(build_experience(resume, styles))

    story.extend(section_heading(resume["profile_heading"], styles))
    for paragraph in resume["profile"]:
        story.extend([Paragraph(paragraph, styles["Body"]), Spacer(1, 6)])

    story.extend(section_heading(resume["education_heading"], styles))
    story.extend(build_education(resume, styles))

    story.extend(section_heading(resume["languages_heading"], styles))
    story.append(build_languages(resume, styles))

    return story


def create_pdf(resume, output_file):
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    doc = SimpleDocTemplate(
        str(output_file),
        pagesize=A4,
        leftMargin=14 * mm,
        rightMargin=14 * mm,
        topMargin=12 * mm,
        bottomMargin=12 * mm,
        title=f"{resume['name']} Resume",
        author="OpenAI Codex",
    )

    styles = build_styles()
    story = []

    story.extend(build_header(resume, styles))
    story.append(Spacer(1, 12))
    story.extend(build_single_column_sections(resume, styles))

    def paint_page(canvas, doc):
        canvas.saveState()
        canvas.setFillColor(colors.white)
        canvas.rect(0, 0, A4[0], A4[1], stroke=0, fill=1)
        canvas.restoreState()

    doc.build(story, onFirstPage=paint_page, onLaterPages=paint_page)
    return output_file


def generate_all():
    LEGACY_OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    generated_files = []
    for locale, resume in RESUMES.items():
        output_file = OUTPUT_FILES[locale]
        generated_files.append(create_pdf(resume, output_file))

    copy2(OUTPUT_FILES["en"], LEGACY_OUTPUT_FILE)
    return generated_files


if __name__ == "__main__":
    for pdf_path in generate_all():
        print(pdf_path)
