from pathlib import Path
from shutil import copy2
from io import BytesIO

from PIL import Image as PILImage
from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.utils import ImageReader
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "public" / "documents"
ARTIFACT_DIR = ROOT / "output" / "pdf"
OUTPUT_FILES = {
    "en": OUTPUT_DIR / "andres-tirano-cv.pdf",
    "es": OUTPUT_DIR / "andres-tirano-cv-es.pdf",
}
PORTRAIT_FILE = ROOT / "public" / "images" / "portrait" / "andres-skin-tone-test-v1.png"

CHARCOAL = colors.HexColor("#11100E")
INK = colors.HexColor("#201B17")
PAPER = colors.HexColor("#F4EFE8")
OFF_WHITE = colors.HexColor("#F5F1EA")
MUTED = colors.HexColor("#766E66")
COPPER = colors.HexColor("#B96D3B")
HAIRLINE = colors.HexColor("#D5C9BC")

FONT_DIR = Path("/System/Library/Fonts/Supplemental")
FONTS = {
    "Display": FONT_DIR / "Georgia.ttf",
    "DisplayItalic": FONT_DIR / "Georgia Italic.ttf",
    "Sans": FONT_DIR / "Arial.ttf",
    "SansBold": FONT_DIR / "Arial Bold.ttf",
}


CV = {
    "es": {
        "role": "COCINERO PROFESIONAL",
        "intro": (
            "Cocinero profesional con experiencia en restaurantes orientados a la calidad, "
            "hospitalidad premium, producción de brunch y servicio hotelero de alto volumen."
        ),
        "statement": "Precisión antes del servicio.<br/>Calma durante el pase.",
        "closing_statement": "Exigencia hasta el final.<br/>Orgullo después del último plato.",
        "experience": "EXPERIENCIA",
        "profile": "PERFIL",
        "profile_text": (
            "Formado en cocinas exigentes, combina disciplina de mise en place, ejecución "
            "serena y adaptación a distintos ritmos de servicio. Está abierto a nuevas "
            "oportunidades profesionales y reubicación."
        ),
        "strengths": "FORTALEZAS",
        "strength_items": [
            "Mise en place y organización de partida",
            "Showcooking y atención al cliente",
            "Servicio hotelero de alto volumen",
            "Respeto por el producto y el detalle",
            "Trabajo en equipo bajo presión",
        ],
        "education": "FORMACIÓN",
        "languages": "IDIOMAS",
        "contact": "CONTACTO",
        "continued": "TRAYECTORIA PROFESIONAL",
        "education_items": [
            (
                "Programa técnico en asistencia de cocina",
                "Escuela de Gastronomía de Medellín (EGM)",
                "Técnicas culinarias, manipulación de alimentos, seguridad y preparación de menús.",
            ),
            (
                "Curso básico de cocina molecular",
                "Escuela MCS Colombia",
                "Esferificación, texturas, ahumados, emplatado y técnicas con nitrógeno líquido.",
            ),
        ],
        "language_items": [("Español", "Nativo"), ("Inglés", "Intermedio alto · B2")],
        "experience_items": [
            (
                "2025",
                "Only YOU Hotel Málaga",
                "Jefe de partida · Málaga, España",
                "Experiencia en el entorno culinario de un hotel cinco estrellas, con estándares "
                "de hospitalidad premium, servicio coordinado y ejecución orientada al cliente.",
            ),
            (
                "2024",
                "Hotel Gran Cervantes",
                "Cocinero de buffet showcooking · Torremolinos, España",
                "Responsable de estaciones de grill, wok y crepes en servicio para alrededor de "
                "1.200 comensales diarios, manteniendo velocidad, consistencia y trato directo.",
            ),
            (
                "2022",
                "La Deriva",
                "Jefe de partida · Málaga, España",
                "Disciplina de mise en place, ritmo de servicio y coordinación diaria en una "
                "cocina de restaurante de alto movimiento.",
            ),
            (
                "2022",
                "The Club",
                "Cocinero de brunch · Málaga, España",
                "Montaje y servicio de brunch, con apoyo en compras, inventario, creación de menú "
                "y preparación previa al servicio.",
            ),
            (
                "2021",
                "LUME",
                "Cocinero de línea · Santiago de Compostela, España",
                "Concepto de servicio directo al cliente que combinaba técnicas japonesas con "
                "sabores mexicanos, exigiendo precisión y respeto por el producto.",
            ),
            (
                "2021",
                "A Tafona",
                "Cocinero de preparación · Santiago de Compostela, España",
                "Trabajo bajo la chef Lucía Freitas en una cocina orientada a la calidad, donde "
                "la preelaboración y la atención al detalle sostenían el estándar diario.",
            ),
        ],
    },
    "en": {
        "role": "PROFESSIONAL COOK",
        "intro": (
            "Professional cook with experience in quality-focused restaurants, premium "
            "hospitality, brunch production, and high-volume hotel service."
        ),
        "statement": "Precision before service.<br/>Calm during the pass.",
        "closing_statement": "Demanding standards until the end.<br/>Pride after the final plate.",
        "experience": "EXPERIENCE",
        "profile": "PROFILE",
        "profile_text": (
            "Shaped by demanding kitchens, he combines disciplined mise en place, calm "
            "execution, and adaptability across different styles of service. Open to new "
            "professional opportunities and relocation."
        ),
        "strengths": "CORE STRENGTHS",
        "strength_items": [
            "Mise en place and station organization",
            "Showcooking and guest-facing service",
            "High-volume hotel execution",
            "Product respect and attention to detail",
            "Teamwork under pressure",
        ],
        "education": "EDUCATION",
        "languages": "LANGUAGES",
        "contact": "CONTACT",
        "continued": "PROFESSIONAL JOURNEY",
        "education_items": [
            (
                "Technical Program in Kitchen Assistance",
                "Escuela de Gastronomía de Medellín (EGM)",
                "Culinary techniques, food handling, safety, and menu preparation.",
            ),
            (
                "Basic Molecular Cuisine Course",
                "Escuela MCS Colombia",
                "Spherification, textures, smoking, plating, and liquid nitrogen techniques.",
            ),
        ],
        "language_items": [("Spanish", "Native"), ("English", "Upper-intermediate · B2")],
        "experience_items": [
            (
                "2025",
                "Only YOU Hotel Málaga",
                "Chef de Partie · Málaga, Spain",
                "Experience in the culinary environment of a five-star hotel, working with "
                "premium hospitality standards, coordinated service, and guest-focused execution.",
            ),
            (
                "2024",
                "Hotel Gran Cervantes",
                "Showcooking buffet cook · Torremolinos, Spain",
                "Covered grill, wok, and crepe stations while serving around 1,200 guests daily, "
                "maintaining speed, consistency, and direct guest interaction.",
            ),
            (
                "2022",
                "La Deriva",
                "Chef de Partie · Málaga, Spain",
                "Strengthened mise en place discipline, service rhythm, and daily kitchen "
                "coordination in a fast-moving restaurant environment.",
            ),
            (
                "2022",
                "The Club",
                "Brunch cook · Málaga, Spain",
                "Brunch assembly and service, with support in purchasing, inventory, menu "
                "development, and pre-service preparation.",
            ),
            (
                "2021",
                "LUME",
                "Line cook · Santiago de Compostela, Spain",
                "Direct-to-guest concept blending Japanese techniques with Mexican flavors, "
                "requiring accuracy and respect for the product.",
            ),
            (
                "2021",
                "A Tafona",
                "Prep cook · Santiago de Compostela, Spain",
                "Worked under chef Lucía Freitas in a quality-focused kitchen where precise "
                "preparation and attention to detail sustained the daily standard.",
            ),
        ],
    },
}


def register_fonts():
    for name, path in FONTS.items():
        pdfmetrics.registerFont(TTFont(name, str(path)))


def paragraph_style(name, font, size, leading, color, **kwargs):
    return ParagraphStyle(
        name,
        fontName=font,
        fontSize=size,
        leading=leading,
        textColor=color,
        alignment=TA_LEFT,
        **kwargs,
    )


STYLES = {}
PORTRAIT_READER = None


def setup_styles():
    STYLES.update(
        {
            "intro": paragraph_style("intro", "Sans", 9.8, 15.5, OFF_WHITE),
            "statement": paragraph_style("statement", "DisplayItalic", 17.5, 23, OFF_WHITE),
            "body": paragraph_style("body", "Sans", 8.7, 13.2, MUTED),
            "body_dark": paragraph_style("body_dark", "Sans", 8.7, 13.5, colors.HexColor("#C9C0B7")),
            "meta": paragraph_style("meta", "Sans", 8.1, 11.5, COPPER),
            "venue": paragraph_style("venue", "Display", 14.3, 17, INK),
            "role": paragraph_style("role", "Sans", 8.3, 12, MUTED),
            "education": paragraph_style("education", "Display", 11.2, 14, INK),
            "small": paragraph_style("small", "Sans", 7.9, 11.5, colors.HexColor("#C9C0B7")),
        }
    )


def load_portrait():
    global PORTRAIT_READER
    if PORTRAIT_READER is None:
        image = PILImage.open(PORTRAIT_FILE).convert("RGB")
        buffer = BytesIO()
        image.save(buffer, format="JPEG", quality=88, optimize=True, progressive=True)
        buffer.seek(0)
        PORTRAIT_READER = ImageReader(buffer)
    return PORTRAIT_READER


def draw_paragraph(c, text, style, x, y_top, width):
    p = Paragraph(text, style)
    _, height = p.wrap(width, 500 * mm)
    p.drawOn(c, x, y_top - height)
    return y_top - height


def draw_tracking(c, text, x, y, font="SansBold", size=7.2, color=COPPER, tracking=1.6):
    c.setFont(font, size)
    c.setFillColor(color)
    cursor = x
    for char in text:
        c.drawString(cursor, y, char)
        cursor += c.stringWidth(char, font, size) + tracking


def draw_section_label(c, text, x, y, width, dark=False):
    draw_tracking(c, text, x, y, color=OFF_WHITE if dark else COPPER)
    c.setStrokeColor(colors.HexColor("#4A443E") if dark else HAIRLINE)
    c.setLineWidth(0.45)
    c.line(x, y - 4 * mm, x + width, y - 4 * mm)


def draw_cover(c, data):
    page_w, page_h = A4
    split_x = 132 * mm
    photo_h = 109 * mm

    c.setFillColor(CHARCOAL)
    c.rect(0, page_h - photo_h, page_w, photo_h, stroke=0, fill=1)
    photo_w = page_w - split_x
    portrait = load_portrait()
    source_w, source_h = portrait.getSize()
    scale = max(photo_w / source_w, photo_h / source_h)
    rendered_w = source_w * scale
    rendered_h = source_h * scale
    photo_clip = c.beginPath()
    photo_clip.rect(split_x, page_h - photo_h, photo_w, photo_h)
    c.saveState()
    c.clipPath(photo_clip, stroke=0, fill=0)
    c.drawImage(
        portrait,
        split_x + (photo_w - rendered_w) / 2,
        page_h - photo_h + (photo_h - rendered_h) / 2,
        width=rendered_w,
        height=rendered_h,
        mask="auto",
    )
    c.restoreState()
    c.setFillColor(COPPER)
    c.rect(split_x - 0.6 * mm, page_h - photo_h, 0.6 * mm, photo_h, stroke=0, fill=1)

    left = 16 * mm
    top = page_h - 16 * mm
    draw_tracking(c, "@ANFETIRANO", left, top, color=colors.HexColor("#D8D0C7"), tracking=1.3)
    c.setFont("Display", 31)
    c.setFillColor(OFF_WHITE)
    c.drawString(left, top - 25 * mm, "ANDRÉS")
    c.drawString(left, top - 39 * mm, "TIRANO")
    draw_tracking(c, data["role"], left, top - 51 * mm, color=colors.HexColor("#D8D0C7"), tracking=1.8)
    c.setFillColor(COPPER)
    c.rect(left, top - 59 * mm, 18 * mm, 0.5 * mm, stroke=0, fill=1)
    draw_paragraph(c, data["statement"], STYLES["statement"], left, top - 68 * mm, 101 * mm)

    c.setFillColor(PAPER)
    c.rect(0, 0, page_w, page_h - photo_h, stroke=0, fill=1)
    body_top = page_h - photo_h - 13 * mm
    draw_section_label(c, data["experience"], left, body_top, page_w - 32 * mm)
    y = body_top - 12 * mm
    for item in data["experience_items"][:3]:
        y = draw_experience_item(c, item, left, y, page_w - 32 * mm)
    c.setFillColor(COPPER)
    c.rect(0, 0, 5 * mm, page_h - photo_h, stroke=0, fill=1)
    draw_footer(c, 1)


def draw_experience_item(c, item, x, y, width):
    year, venue, role, description = item
    c.setFont("SansBold", 8.5)
    c.setFillColor(COPPER)
    c.drawString(x, y, year)
    text_x = x + 24 * mm
    c.setFillColor(INK)
    y2 = draw_paragraph(c, venue, STYLES["venue"], text_x, y + 2 * mm, width - 24 * mm)
    y2 = draw_paragraph(c, role, STYLES["role"], text_x, y2 - 1 * mm, width - 24 * mm)
    y2 = draw_paragraph(c, description, STYLES["body"], text_x, y2 - 2.5 * mm, width - 24 * mm)
    line_y = y2 - 5 * mm
    c.setStrokeColor(HAIRLINE)
    c.setLineWidth(0.45)
    c.line(text_x, line_y, x + width, line_y)
    return line_y - 7 * mm


def draw_sidebar(c, data):
    page_w, page_h = A4
    side_w = 65 * mm
    c.setFillColor(CHARCOAL)
    c.rect(0, 0, side_w, page_h, stroke=0, fill=1)
    c.setFillColor(COPPER)
    c.rect(side_w, 0, 0.65 * mm, page_h, stroke=0, fill=1)

    x = 14 * mm
    width = side_w - 27 * mm
    y = page_h - 18 * mm
    c.setFont("Display", 20)
    c.setFillColor(OFF_WHITE)
    c.drawString(x, y, "ANDRÉS")
    c.drawString(x, y - 9 * mm, "TIRANO")
    y -= 23 * mm

    draw_section_label(c, data["profile"], x, y, width, dark=True)
    y = draw_paragraph(c, data["profile_text"], STYLES["body_dark"], x, y - 11 * mm, width) - 10 * mm

    draw_section_label(c, data["strengths"], x, y, width, dark=True)
    y -= 11 * mm
    for item in data["strength_items"]:
        c.setFillColor(COPPER)
        c.circle(x + 1 * mm, y + 1.8 * mm, 0.7 * mm, stroke=0, fill=1)
        y = draw_paragraph(c, item, STYLES["small"], x + 5 * mm, y + 4 * mm, width - 5 * mm) - 4 * mm
    y -= 4 * mm

    draw_section_label(c, data["languages"], x, y, width, dark=True)
    y -= 11 * mm
    for language, level in data["language_items"]:
        c.setFont("SansBold", 8)
        c.setFillColor(OFF_WHITE)
        c.drawString(x, y, language)
        c.setFont("Sans", 7.8)
        c.setFillColor(colors.HexColor("#B8AFA6"))
        c.drawString(x, y - 4.5 * mm, level)
        y -= 13 * mm

    draw_section_label(c, data["contact"], x, y, width, dark=True)
    y -= 11 * mm
    contacts = [
        "andres@tirano.co",
        "+34 603 91 99 93",
        "@anfetirano",
        "chef.tirano.co",
        "Andres F. Tirano Vasquez · LinkedIn",
    ]
    for value in contacts:
        c.setFont("Sans", 7.8)
        c.setFillColor(colors.HexColor("#C9C0B7"))
        c.drawString(x, y, value)
        y -= 6.3 * mm


def draw_second_page(c, data):
    page_w, page_h = A4
    draw_sidebar(c, data)
    main_x = 79 * mm
    main_w = page_w - main_x - 15 * mm
    y = page_h - 18 * mm

    draw_section_label(c, data["continued"], main_x, y, main_w)
    y -= 13 * mm
    for item in data["experience_items"][3:]:
        y = draw_experience_item(c, item, main_x, y, main_w)

    y -= 2 * mm
    draw_section_label(c, data["education"], main_x, y, main_w)
    y -= 13 * mm
    for title, school, description in data["education_items"]:
        y = draw_paragraph(c, title, STYLES["education"], main_x, y + 1 * mm, main_w)
        y = draw_paragraph(c, school, STYLES["meta"], main_x, y - 1 * mm, main_w)
        y = draw_paragraph(c, description, STYLES["body"], main_x, y - 2 * mm, main_w) - 6 * mm

    quote = data["closing_statement"]
    c.setStrokeColor(COPPER)
    c.setLineWidth(0.8)
    c.line(main_x, 31 * mm, main_x + 22 * mm, 31 * mm)
    draw_paragraph(
        c,
        quote,
        paragraph_style("quote", "DisplayItalic", 12, 17, INK),
        main_x,
        27 * mm,
        main_w,
    )
    draw_footer(c, 2)


def draw_footer(c, page_number):
    page_w, _ = A4
    c.setFont("Sans", 6.8)
    c.setFillColor(colors.HexColor("#8D847B"))
    c.drawRightString(page_w - 10 * mm, 7 * mm, f"ANDRÉS TIRANO  ·  {page_number:02d}")


def create_pdf(locale, data, output_file):
    output_file.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(
        str(output_file),
        pagesize=A4,
        pageCompression=1,
    )
    c.setTitle(f"Andrés Tirano · {data['role'].title()}")
    c.setAuthor("Andrés Tirano")
    c.setSubject("Professional culinary CV")
    draw_cover(c, data)
    c.showPage()
    c.setFillColor(PAPER)
    c.rect(0, 0, A4[0], A4[1], stroke=0, fill=1)
    draw_second_page(c, data)
    c.save()
    return output_file


def generate_all():
    register_fonts()
    setup_styles()
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    ARTIFACT_DIR.mkdir(parents=True, exist_ok=True)
    generated = []
    for locale, data in CV.items():
        site_file = create_pdf(locale, data, OUTPUT_FILES[locale])
        artifact_file = ARTIFACT_DIR / f"andres-tirano-cv-{locale}.pdf"
        copy2(site_file, artifact_file)
        generated.append(site_file)
    copy2(OUTPUT_FILES["en"], ARTIFACT_DIR / "andres-tirano-resume.pdf")
    return generated


if __name__ == "__main__":
    for path in generate_all():
        print(path)
