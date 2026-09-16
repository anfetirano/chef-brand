import type { HomepageContentByLocale } from "@/types/homepage";

const contactValues = {
  email: "andres@tirano.co",
  phone: "+34 603 91 99 93",
  whatsappHref:
    "https://wa.me/34603919993?text=Hello%20Andres%2C%20I%20would%20like%20to%20discuss%20a%20kitchen%20opportunity.",
  instagram: "@anfetirano",
  instagramHref: "https://www.instagram.com/anfetirano/",
  linkedin: "Andres F. Tirano Vasquez",
  linkedinHref:
    "https://www.linkedin.com/in/andres-felipe-tirano-vasquez-5792b51a1/",
  website: "chef.tirano.co",
  websiteHref: "https://chef.tirano.co",
} as const;

export const homepageContentByLocale: HomepageContentByLocale = {
  en: {
    locale: "en",
    languageSwitcherLabel: "Language",
    hero: {
      profileLabel: "Professional profile",
      name: "Andres Tirano",
      role: "Professional cook with experience in quality-focused restaurants, premium hospitality, brunch production, and high-volume hotel service.",
      summaryLabel: "Summary",
      summary:
        "Currently working in the Spanish Pyrenees, Andres brings hot-section and high-volume buffet experience alongside earlier work in chef Lucía Freitas's kitchens, premium hospitality in Málaga, and brunch service.",
      locationLabel: "Location",
      location: "Huesca, Spain",
      availabilityLabel: "Availability",
      availability:
        "Open to professional kitchen opportunities and available for relocation.",
      primaryCta: {
        label: "Contact Andres",
        href: "#contact",
      },
      secondaryCta: {
        label: "Download Resume",
        href: "#resume",
      },
      facts: [
        {
          label: "Recent focus",
          value:
            "Restaurants, premium hospitality, brunch service, and high-volume buffet execution",
        },
        {
          label: "Languages",
          value: "Spanish native, English upper-intermediate (B2)",
        },
        {
          label: "Focus",
          value: "Precision, mise en place, guest-facing service, and consistent execution",
        },
      ],
      contactMethods: [
        {
          id: "email",
          label: "Email",
          value: contactValues.email,
          href: "mailto:andres@tirano.co",
        },
        {
          id: "phone",
          label: "Phone",
          value: contactValues.phone,
          href: "tel:+34603919993",
        },
        {
          id: "whatsapp",
          label: "WhatsApp",
          value: contactValues.phone,
          href: contactValues.whatsappHref,
        },
        {
          id: "instagram",
          label: "Instagram",
          value: contactValues.instagram,
          href: contactValues.instagramHref,
        },
        {
          id: "linkedin",
          label: "LinkedIn",
          value: contactValues.linkedin,
          href: contactValues.linkedinHref,
        },
        {
          id: "website",
          label: "Website",
          value: contactValues.website,
          href: contactValues.websiteHref,
        },
      ],
    },
    promiseIntro:
      "A good service begins long before the first plate. It is built on product, order, judgement, and teamwork.",
    strengthsTitle: "The craft",
    valueItems: [
      {
        title: "Product",
        description:
          "Understand it, respect it, and work with intention.",
      },
      {
        title: "Station",
        description:
          "Clear mise en place, order, and consistency before service.",
      },
      {
        title: "Judgement",
        description:
          "Apply the right technique and care for every decision.",
      },
      {
        title: "Team",
        description:
          "Listen, coordinate, and maintain one rhythm through the pass.",
      },
    ],
    experienceSection: {
      title: "Experience",
      description:
        "A track record across quality-led restaurants, brunch production, and high-demand hotel service.",
    },
    storySection: {
      title: "Profile",
      description:
        "A cook shaped by curiosity, discipline, and a commitment to improving the guest experience.",
    },
    educationTitle: "Education",
    languagesTitle: "Languages",
    gallerySection: {
      title: "Gallery",
      description:
        "These are the kinds of professional moments the visual gallery will emphasize as assets are added.",
    },
    story: [
      "Andres’s relationship with cooking began with curiosity and became a profession through repetition, discipline, and the daily responsibility of service.",
      "He continues to learn from culinary tradition and contemporary techniques, always looking for a practical application: cleaner execution, better coordination, and greater care for the guest.",
      "His path crosses chef-led kitchens, brunch concepts, and hotel hospitality. Different settings connected by the same way of working: respect for the product, attention to detail, and commitment to the team.",
    ],
    experience: [
      {
        venue: "Balneario de Panticosa",
        role: "Cook · Hot Section",
        period: "August 2026–Present",
        location: "Huesca, Spain",
        summary:
          "Responsible for hot-section production in a high-volume buffet serving several hundred guests. Plans daily mise en place, manages simultaneous preparations, controls regeneration and continuous replenishment, coordinates with the kitchen team, and adapts production to menu and product availability.",
      },
      {
        venue: "Only YOU Hotel Málaga",
        role: "Chef de Partie",
        period: "2025",
        location: "Málaga, Spain",
        summary:
          "Worked in the culinary environment of a five-star hotel in central Málaga, adding experience in premium hospitality standards, coordinated service, and guest-focused execution.",
      },
      {
        venue: "Gran Hotel Cervantes",
        role: "Show Cooking Chef",
        period: "2024",
        location: "Torremolinos, Málaga, Spain",
        summary:
          "Worked in the buffet showcooking team, covering stations such as grill, wok, and crepes while serving a daily average of around 1,200 guests. This role strengthened his teamwork, guest interaction, speed, and consistency under pressure.",
      },
      {
        venue: "La Deriva",
        role: "Line Cook",
        period: "2023",
        location: "Málaga, Spain",
        summary:
          "Line-cook experience in a fast-moving Málaga restaurant, with a focus on mise en place and service rhythm.",
      },
      {
        venue: "The Club Málaga",
        role: "Cook",
        period: "2022",
        location: "Málaga, Spain",
        summary:
          "Focused on assembly and brunch service while also supporting purchasing, inventory, menu creation, and pre-service preparation in a high-demand concept.",
      },
      {
        venue: "LUME",
        role: "Line Cook",
        period: "2021–2022",
        location: "Santiago de Compostela, Spain",
        summary:
          "Worked in an innovative direct-to-guest concept that blended Japanese techniques with Mexican flavors. The role required accuracy, product respect, and clean execution in an interactive environment.",
      },
      {
        venue: "A Tafona",
        role: "Prep Cook",
        period: "2021–2022",
        location: "Santiago de Compostela, Spain",
        summary:
          "Worked in chef Lucía Freitas's kitchen, alternating shifts with LUME within the same professional structure. Pre-preparation, precision, and attention to detail were essential to daily standards.",
      },
    ],
    education: [
      {
        title: "Culinary Assistant - Technical Vocational Programme",
        institution: "Escuela de Gastronomía de Medellín (EGM)",
        period: "01/2019–12/2021",
        description:
          "Principal three-year culinary training programme in Medellín, Colombia, covering culinary techniques, ingredient handling, food safety, and menu preparation.",
      },
      {
        title: "Basic Molecular Cuisine Course",
        institution: "Escuela MCS Colombia",
        description:
          "Complementary training completed after EGM, covering spherification, texture development, smoking, plating, and liquid nitrogen techniques with hands-on application.",
      },
    ],
    languages: [
      {
        name: "Spanish",
        level: "Native",
      },
      {
        name: "English",
        level: "Upper-intermediate (B2)",
      },
    ],
    gallery: [],
    resume: {
      title: "Curriculum Vitae",
      description:
        "Download the full CV and matching cover letter for a complete view of experience, education, and contact information.",
      note: "These files include his latest roles, education, direct contact details, and a formal introduction for employers.",
      fileHref: "/documents/andres-tirano-cv.pdf?v=20260916-ireland-final",
      fileLabel: "Download Resume",
      coverLetterHref: "/documents/andres-tirano-cover-letter.pdf",
      coverLetterLabel: "Download Cover Letter",
      linkedInLabel: "LinkedIn",
    },
    contact: {
      title: "Contact",
      description:
        "If you are hiring for a kitchen, hotel, or restaurant team, Andres is open to relocation and the fastest next step is a direct conversation.",
      methods: [
        {
          id: "email",
          label: "Email",
          value: contactValues.email,
          href: "mailto:andres@tirano.co",
        },
        {
          id: "phone",
          label: "Phone",
          value: contactValues.phone,
          href: "tel:+34603919993",
        },
        {
          id: "whatsapp",
          label: "WhatsApp",
          value: contactValues.phone,
          href: contactValues.whatsappHref,
        },
        {
          id: "instagram",
          label: "Instagram",
          value: contactValues.instagram,
          href: contactValues.instagramHref,
        },
        {
          id: "linkedin",
          label: "LinkedIn",
          value: contactValues.linkedin,
          href: contactValues.linkedinHref,
        },
        {
          id: "website",
          label: "Website",
          value: contactValues.website,
          href: contactValues.websiteHref,
        },
      ],
    },
  },
  es: {
    locale: "es",
    languageSwitcherLabel: "Idioma",
    hero: {
      profileLabel: "Perfil profesional",
      name: "Andres Tirano",
      role: "Cocinero profesional con experiencia en restaurantes enfocados en calidad, hospitalidad premium, producción de brunch y servicio hotelero de alto volumen.",
      summaryLabel: "Resumen",
      summary:
        "Actualmente trabajando en el Pirineo aragonés, Andres aporta experiencia en partida de caliente y buffet de alto volumen, además de su trayectoria en cocinas de Lucía Freitas, hospitalidad premium en Málaga y servicio de brunch.",
      locationLabel: "Ubicación",
      location: "Huesca, España",
      availabilityLabel: "Disponibilidad",
      availability:
        "Abierto a oportunidades profesionales de cocina y disponible para reubicación.",
      primaryCta: {
        label: "Contactar a Andres",
        href: "#contact",
      },
      secondaryCta: {
        label: "Descargar CV",
        href: "#resume",
      },
      facts: [
        {
          label: "Enfoque reciente",
          value:
            "Restaurantes, hospitalidad premium, servicio de brunch y ejecución de buffet de alto volumen",
        },
        {
          label: "Idiomas",
          value: "Español nativo, inglés intermedio alto (B2)",
        },
        {
          label: "Fortalezas",
          value: "Precisión, mise en place, servicio de cara al cliente y ejecución constante",
        },
      ],
      contactMethods: [
        {
          id: "email",
          label: "Correo",
          value: contactValues.email,
          href: "mailto:andres@tirano.co",
        },
        {
          id: "phone",
          label: "Teléfono",
          value: contactValues.phone,
          href: "tel:+34603919993",
        },
        {
          id: "whatsapp",
          label: "WhatsApp",
          value: contactValues.phone,
          href: contactValues.whatsappHref,
        },
        {
          id: "instagram",
          label: "Instagram",
          value: contactValues.instagram,
          href: contactValues.instagramHref,
        },
        {
          id: "linkedin",
          label: "LinkedIn",
          value: contactValues.linkedin,
          href: contactValues.linkedinHref,
        },
        {
          id: "website",
          label: "Sitio web",
          value: contactValues.website,
          href: contactValues.websiteHref,
        },
      ],
    },
    promiseIntro:
      "Un buen servicio comienza mucho antes del primer plato. Se construye con producto, orden, criterio y equipo.",
    strengthsTitle: "El oficio",
    valueItems: [
      {
        title: "Producto",
        description:
          "Entenderlo, respetarlo y trabajarlo con intención.",
      },
      {
        title: "Partida",
        description:
          "Mise en place clara, orden y constancia antes del servicio.",
      },
      {
        title: "Criterio",
        description:
          "Aplicar la técnica adecuada y cuidar cada decisión.",
      },
      {
        title: "Equipo",
        description:
          "Escuchar, coordinar y mantener un mismo ritmo durante el pase.",
      },
    ],
    experienceSection: {
      title: "Experiencia",
      description:
        "Trayectoria en restaurantes orientados a la calidad, producción de brunch y servicio hotelero de alta exigencia.",
    },
    storySection: {
      title: "Perfil",
      description:
        "Un cocinero formado por la curiosidad, la disciplina y el compromiso con mejorar la experiencia del cliente.",
    },
    educationTitle: "Formación",
    languagesTitle: "Idiomas",
    gallerySection: {
      title: "Galería",
      description:
        "Estos son los tipos de momentos profesionales que la galería visual destacará cuando se agreguen materiales reales.",
    },
    story: [
      "La relación de Andres con la cocina comenzó en la curiosidad y se convirtió en oficio a través de la repetición, la disciplina y la responsabilidad diaria del servicio.",
      "Mantiene una actitud de aprendizaje continuo, desde la tradición culinaria hasta técnicas actuales, buscando siempre una aplicación práctica: ejecución más limpia, mejor coordinación y mayor cuidado por el comensal.",
      "Su recorrido atraviesa cocinas de autor, conceptos de brunch y hospitalidad hotelera. Contextos distintos unidos por una misma forma de trabajar: respeto por el producto, atención al detalle y compromiso con el equipo.",
    ],
    experience: [
      {
        venue: "Balneario de Panticosa",
        role: "Cocinero · Partida de caliente",
        period: "Agosto 2026–Actualidad",
        location: "Huesca, España",
        summary:
          "Responsable de la producción de partida caliente en un buffet de alto volumen para varios cientos de comensales. Planifica la mise en place diaria, gestiona elaboraciones simultáneas, controla la regeneración y reposición continua, se coordina con el equipo y adapta la producción al menú y al producto disponible.",
      },
      {
        venue: "Only YOU Hotel Málaga",
        role: "Jefe de partida",
        period: "2025",
        location: "Málaga, España",
        summary:
          "Trabajó en el entorno culinario de un hotel cinco estrellas en el centro de Málaga, sumando experiencia en estándares de hospitalidad premium, servicio coordinado y ejecución orientada al cliente.",
      },
      {
        venue: "Gran Hotel Cervantes",
        role: "Cocinero de show cooking",
        period: "2024",
        location: "Torremolinos, Málaga, España",
        summary:
          "Trabajó en el equipo de buffet showcooking cubriendo estaciones como grill, wok y crepes mientras atendía un promedio diario de alrededor de 1,200 comensales. Este puesto fortaleció su trabajo en equipo, interacción con clientes, velocidad y consistencia bajo presión.",
      },
      {
        venue: "La Deriva",
        role: "Cocinero de línea",
        period: "2023",
        location: "Málaga, España",
        summary:
          "Experiencia como cocinero de línea en un restaurante de alto movimiento en Málaga, centrada en la mise en place y el ritmo de servicio.",
      },
      {
        venue: "The Club Málaga",
        role: "Cocinero",
        period: "2022",
        location: "Málaga, España",
        summary:
          "Enfocado en montaje y servicio de brunch, apoyando además compras, inventario, creación de menú y preparación previa al servicio en un concepto de alta demanda.",
      },
      {
        venue: "LUME",
        role: "Cocinero de línea",
        period: "2021–2022",
        location: "Santiago de Compostela, España",
        summary:
          "Trabajó en un concepto innovador de servicio directo al cliente que combinaba técnicas japonesas con sabores mexicanos. El puesto exigía precisión, respeto por el producto y ejecución limpia en un entorno interactivo.",
      },
      {
        venue: "A Tafona",
        role: "Cocinero de preparación",
        period: "2021–2022",
        location: "Santiago de Compostela, España",
        summary:
          "Trabajó en la cocina de Lucía Freitas, alternando jornadas con LUME dentro de la misma estructura profesional. La preelaboración, la precisión y la atención al detalle eran esenciales para el estándar diario.",
      },
    ],
    education: [
      {
        title: "Auxiliar de Cocina - Técnico Laboral por Competencias",
        institution: "Escuela de Gastronomía de Medellín (EGM)",
        period: "01/2019–12/2021",
        description:
          "Formación gastronómica principal de aproximadamente tres años en Medellín, Colombia, con un fuerte enfoque práctico en técnicas culinarias, manejo de ingredientes, seguridad alimentaria y preparación de menús.",
      },
      {
        title: "Curso básico de cocina molecular",
        institution: "Escuela MCS Colombia",
        description:
          "Formación complementaria realizada después de EGM en esferificación, desarrollo de texturas, ahumados, emplatado y técnicas con nitrógeno líquido con aplicación práctica.",
      },
    ],
    languages: [
      {
        name: "Español",
        level: "Nativo",
      },
      {
        name: "Inglés",
        level: "Intermedio alto (B2)",
      },
    ],
    gallery: [],
    resume: {
      title: "Currículum vitae",
      description:
        "Descarga el CV completo y la carta de presentación para revisar experiencia, formación y datos de contacto en detalle.",
      note: "Estos archivos incluyen sus puestos más recientes, formación, datos de contacto directos y una presentación formal para empleadores.",
      fileHref: "/documents/andres-tirano-cv-es.pdf?v=20260802-2",
      fileLabel: "Descargar CV",
      coverLetterHref: "/documents/andres-tirano-cover-letter-es.pdf",
      coverLetterLabel: "Descargar carta",
      linkedInLabel: "LinkedIn",
    },
    contact: {
      title: "Contacto",
      description:
        "Si estás contratando para una cocina, hotel o restaurante, Andres está abierto a la reubicación y el siguiente paso más rápido es una conversación directa.",
      methods: [
        {
          id: "email",
          label: "Correo",
          value: contactValues.email,
          href: "mailto:andres@tirano.co",
        },
        {
          id: "phone",
          label: "Teléfono",
          value: contactValues.phone,
          href: "tel:+34603919993",
        },
        {
          id: "whatsapp",
          label: "WhatsApp",
          value: contactValues.phone,
          href: contactValues.whatsappHref,
        },
        {
          id: "instagram",
          label: "Instagram",
          value: contactValues.instagram,
          href: contactValues.instagramHref,
        },
        {
          id: "linkedin",
          label: "LinkedIn",
          value: contactValues.linkedin,
          href: contactValues.linkedinHref,
        },
        {
          id: "website",
          label: "Sitio web",
          value: contactValues.website,
          href: contactValues.websiteHref,
        },
      ],
    },
  },
};
