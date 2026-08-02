from datetime import date
from pathlib import Path
from shutil import copy2

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas
from reportlab.platypus import Paragraph


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "public" / "documents"
ARTIFACT_DIR = ROOT / "output" / "pdf"
OUTPUT_FILES = {
    "en": OUTPUT_DIR / "andres-tirano-cover-letter.pdf",
    "es": OUTPUT_DIR / "andres-tirano-cover-letter-es.pdf",
}
SIGNATURE_FILE = Path("/Users/berta/Documents/Documentos Personales/firmasinfondo.png")

FONT_DIR = Path("/System/Library/Fonts/Supplemental")
FONTS = {
    "Display": FONT_DIR / "Georgia.ttf",
    "DisplayItalic": FONT_DIR / "Georgia Italic.ttf",
    "Sans": FONT_DIR / "Arial.ttf",
    "SansBold": FONT_DIR / "Arial Bold.ttf",
}

PAPER = colors.HexColor("#F5F0E9")
INK = colors.HexColor("#201B17")
MUTED = colors.HexColor("#6F675F")
COPPER = colors.HexColor("#B96D3B")
HAIRLINE = colors.HexColor("#D7CCC0")
CHARCOAL = colors.HexColor("#11100E")


def spanish_date(today):
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


TODAY = date.today()
LETTERS = {
    "es": {
        "role": "COCINERO PROFESIONAL",
        "date": spanish_date(TODAY),
        "recipient": "Equipo de selección<br/>Departamento de cocina",
        "subject_label": "ASUNTO",
        "subject": "Candidatura para formar parte de su equipo de cocina",
        "opening": "Estimado equipo de selección:",
        "paragraphs": [
            (
                "Me dirijo a ustedes para expresar mi interés en formar parte de su equipo. "
                "Soy cocinero profesional con experiencia en restaurantes orientados a la "
                "calidad, hospitalidad premium, producción de brunch y servicio hotelero de "
                "alto volumen."
            ),
            (
                "Mi trayectoria en España incluye proyectos de la chef Lucía Freitas, "
                "servicio de restaurante y estaciones de showcooking para alrededor de 1.200 "
                "comensales diarios. Estas cocinas reforzaron mi disciplina de mise en place, "
                "la organización de partida y la capacidad de ejecutar con consistencia bajo presión."
            ),
            (
                "Trabajo con respeto por el producto, atención al detalle y una actitud serena "
                "durante el servicio. Me adapto con rapidez a los estándares de cada cocina y "
                "entiendo que el resultado depende tanto de la técnica individual como del ritmo "
                "y la confianza del equipo."
            ),
            (
                "Busco una oportunidad en la que pueda aportar esa experiencia, continuar "
                "aprendiendo y crecer dentro de un equipo exigente. Estoy disponible para "
                "reubicación y agradecería la oportunidad de conversar sobre cómo podría "
                "contribuir a su cocina."
            ),
        ],
        "thanks": "Gracias por su tiempo y consideración.",
        "closing": "Atentamente,",
        "metadata_title": "Carta de presentación de Andrés Tirano",
    },
    "en": {
        "role": "PROFESSIONAL COOK",
        "date": TODAY.strftime("%B %d, %Y"),
        "recipient": "Hiring team<br/>Kitchen department",
        "subject_label": "SUBJECT",
        "subject": "Application to join your kitchen team",
        "opening": "Dear Hiring Team,",
        "paragraphs": [
            (
                "I am writing to express my interest in joining your team. I am a professional "
                "cook with experience in quality-focused restaurants, premium hospitality, "
                "brunch production, and high-volume hotel service."
            ),
            (
                "My background in Spain includes projects led by chef Lucía Freitas, restaurant "
                "service, and live showcooking stations serving around 1,200 guests daily. "
                "These kitchens strengthened my mise en place discipline, station organization, "
                "and ability to execute consistently under pressure."
            ),
            (
                "I work with respect for the product, attention to detail, and a calm approach "
                "during service. I adapt quickly to each kitchen's standards and understand that "
                "the final result depends as much on individual technique as it does on team "
                "rhythm and trust."
            ),
            (
                "I am looking for an opportunity where I can contribute that experience, keep "
                "learning, and grow within a demanding team. I am available for relocation and "
                "would welcome a conversation about how I could contribute to your kitchen."
            ),
        ],
        "thanks": "Thank you for your time and consideration.",
        "closing": "Sincerely,",
        "metadata_title": "Andrés Tirano Cover Letter",
    },
}


def register_fonts():
    for name, path in FONTS.items():
        pdfmetrics.registerFont(TTFont(name, str(path)))


def style(name, font, size, leading, color, **kwargs):
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


def setup_styles():
    STYLES.update(
        {
            "recipient": style("recipient", "Sans", 9.2, 14.2, MUTED),
            "subject": style("subject", "Display", 13, 17, INK),
            "opening": style("opening", "Display", 11.5, 15, INK),
            "body": style("body", "Sans", 9.5, 15.8, colors.HexColor("#4E4842")),
            "closing": style("closing", "Sans", 9.5, 14, MUTED),
        }
    )


def draw_paragraph(c, text, paragraph_style, x, y_top, width):
    paragraph = Paragraph(text, paragraph_style)
    _, height = paragraph.wrap(width, 400 * mm)
    paragraph.drawOn(c, x, y_top - height)
    return y_top - height


def draw_tracking(c, text, x, y, size=7.2, color=COPPER, tracking=1.6):
    c.setFont("SansBold", size)
    c.setFillColor(color)
    cursor = x
    for character in text:
        c.drawString(cursor, y, character)
        cursor += c.stringWidth(character, "SansBold", size) + tracking


def draw_header(c, content):
    page_w, page_h = A4
    left = 25 * mm
    right = page_w - 25 * mm
    top = page_h - 22 * mm

    c.setFillColor(CHARCOAL)
    c.rect(0, page_h - 7 * mm, page_w, 7 * mm, stroke=0, fill=1)
    c.setFillColor(COPPER)
    c.rect(0, page_h - 7.7 * mm, page_w, 0.7 * mm, stroke=0, fill=1)

    c.setFont("Display", 24)
    c.setFillColor(INK)
    c.drawString(left, top, "ANDRÉS TIRANO")
    draw_tracking(c, content["role"], left, top - 9 * mm, size=6.8, color=COPPER, tracking=1.55)

    c.setFont("Sans", 7.7)
    c.setFillColor(MUTED)
    c.drawRightString(right, top, "andres@tirano.co")
    c.drawRightString(right, top - 5 * mm, "+34 603 91 99 93")
    c.drawRightString(right, top - 10 * mm, "chef.tirano.co  ·  @anfetirano")

    c.setStrokeColor(HAIRLINE)
    c.setLineWidth(0.5)
    c.line(left, top - 16 * mm, right, top - 16 * mm)
    return top - 28 * mm


def draw_letter(c, content):
    page_w, page_h = A4
    left = 25 * mm
    right = page_w - 25 * mm
    width = right - left
    y = draw_header(c, content)

    y -= 4 * mm

    y = draw_paragraph(c, content["recipient"], STYLES["recipient"], left, y, 75 * mm)
    y -= 11 * mm

    draw_tracking(c, content["subject_label"], left, y, size=6.7, color=COPPER, tracking=1.4)
    y = draw_paragraph(c, content["subject"], STYLES["subject"], left, y - 5 * mm, width)
    c.setStrokeColor(COPPER)
    c.setLineWidth(0.7)
    c.line(left, y - 4 * mm, left + 20 * mm, y - 4 * mm)
    y -= 14 * mm

    y = draw_paragraph(c, content["opening"], STYLES["opening"], left, y, width)
    y -= 6 * mm
    for paragraph in content["paragraphs"]:
        y = draw_paragraph(c, paragraph, STYLES["body"], left, y, width)
        y -= 5.2 * mm

    y = draw_paragraph(c, content["thanks"], STYLES["body"], left, y, width)
    y -= 8 * mm
    y = draw_paragraph(c, content["closing"], STYLES["closing"], left, y, width)

    if SIGNATURE_FILE.exists():
        signature_width = 47 * mm
        signature_height = signature_width * 1129 / 1600
        c.drawImage(
            ImageReader(str(SIGNATURE_FILE)),
            left - 2 * mm,
            y - signature_height + 3 * mm,
            width=signature_width,
            height=signature_height,
            preserveAspectRatio=True,
            mask="auto",
        )
        y -= signature_height - 2 * mm
    else:
        y -= 8 * mm

    c.setFont("Display", 11.2)
    c.setFillColor(INK)
    c.drawString(left, y, "Andrés Tirano")
    c.setFont("Sans", 7.4)
    c.setFillColor(MUTED)
    c.drawString(left, y - 4.5 * mm, content["role"].title())

    c.setStrokeColor(HAIRLINE)
    c.setLineWidth(0.45)
    c.line(left, 16 * mm, right, 16 * mm)
    c.setFont("Sans", 6.8)
    c.setFillColor(colors.HexColor("#91877E"))
    c.drawString(left, 10 * mm, "LINKEDIN  ·  Andres F. Tirano Vasquez")
    c.drawRightString(right, 10 * mm, "DISPONIBLE PARA REUBICACIÓN" if content["role"].startswith("COCINERO") else "AVAILABLE FOR RELOCATION")


def create_pdf(locale, content):
    output_file = OUTPUT_FILES[locale]
    output_file.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(output_file), pagesize=A4, pageCompression=1)
    c.setTitle(content["metadata_title"])
    c.setAuthor("Andrés Tirano")
    c.setSubject("Professional kitchen cover letter")
    c.setFillColor(PAPER)
    c.rect(0, 0, A4[0], A4[1], stroke=0, fill=1)
    draw_letter(c, content)
    c.save()
    return output_file


def generate_all():
    register_fonts()
    setup_styles()
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    ARTIFACT_DIR.mkdir(parents=True, exist_ok=True)
    generated = []
    for locale, content in LETTERS.items():
        site_file = create_pdf(locale, content)
        artifact_file = ARTIFACT_DIR / f"andres-tirano-cover-letter-{locale}.pdf"
        copy2(site_file, artifact_file)
        generated.append(site_file)
    return generated


if __name__ == "__main__":
    for file_path in generate_all():
        print(file_path)
