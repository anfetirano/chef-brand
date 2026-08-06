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
        "Currently seeking professional kitchen opportunities, Andres brings hands-on experience from chef Lucía Freitas's projects, premium hospitality in Málaga, brunch operations, and live hotel buffet service serving up to 1,200 guests a day.",
      locationLabel: "Location",
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
        venue: "Only YOU Hotel Málaga",
        role: "Chef de Partie",
        period: "2025",
        location: "Málaga, Spain",
        summary:
          "Worked in the culinary environment of a five-star hotel in central Málaga, adding experience in premium hospitality standards, coordinated service, and guest-focused execution.",
      },
      {
        venue: "Hotel Gran Cervantes",
        role: "Showcooking Buffet Cook",
        period: "2024",
        location: "Torremolinos, Spain",
        summary:
          "Worked in the buffet showcooking team, covering stations such as grill, wok, and crepes while serving a daily average of around 1,200 guests. This role strengthened his teamwork, guest interaction, speed, and consistency under pressure.",
      },
      {
        venue: "La Deriva",
        role: "Chef de Partie",
        period: "2022",
        location: "Málaga, Spain",
        summary:
          "Restaurant experience in Málaga that reinforced mise en place discipline, service rhythm, and day-to-day kitchen coordination in a fast-moving dining environment.",
      },
      {
        venue: "The Club",
        role: "Brunch Cook",
        period: "2022",
        location: "Málaga, Spain",
        summary:
          "Focused on assembly and brunch service while also supporting purchasing, inventory, menu creation, and pre-service preparation in a high-demand concept.",
      },
      {
        venue: "LUME",
        role: "Line Cook",
        period: "2021",
        location: "Santiago de Compostela, Spain",
        summary:
          "Worked in an innovative direct-to-guest concept that blended Japanese techniques with Mexican flavors. The role required accuracy, product respect, and clean execution in an interactive environment.",
      },
      {
        venue: "A Tafona",
        role: "Prep Cook",
        period: "2021",
        location: "Santiago de Compostela, Spain",
        summary:
          "Worked under chef Lucía Freitas in a quality-focused environment where pre-preparation, precision, and attention to detail were essential to maintaining kitchen standards.",
      },
    ],
    education: [
      {
        title: "Technical Program in Kitchen Assistance",
        institution: "Escuela de Gastronomía de Medellín (EGM)",
        description:
          "Training in culinary techniques, ingredient handling, food safety, and menu preparation with a strong practical focus.",
      },
      {
        title: "Basic Molecular Cuisine Course",
        institution: "Escuela MCS Colombia",
        period: "2021",
        description:
          "Training in spherification, texture development, smoking, plating, and liquid nitrogen techniques with hands-on application.",
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
      fileHref: "/documents/andres-tirano-cv.pdf?v=20260802-2",
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
        "Actualmente buscando oportunidades profesionales de cocina, Andres aporta experiencia práctica en proyectos de la chef Lucía Freitas, hospitalidad premium en Málaga, operaciones de brunch y servicio de buffet en vivo para hasta 1,200 comensales por día.",
      locationLabel: "Ubicación",
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
        venue: "Only YOU Hotel Málaga",
        role: "Jefe de partida",
        period: "2025",
        location: "Málaga, España",
        summary:
          "Trabajó en el entorno culinario de un hotel cinco estrellas en el centro de Málaga, sumando experiencia en estándares de hospitalidad premium, servicio coordinado y ejecución orientada al cliente.",
      },
      {
        venue: "Hotel Gran Cervantes",
        role: "Cocinero de buffet showcooking",
        period: "2024",
        location: "Torremolinos, España",
        summary:
          "Trabajó en el equipo de buffet showcooking cubriendo estaciones como grill, wok y crepes mientras atendía un promedio diario de alrededor de 1,200 comensales. Este puesto fortaleció su trabajo en equipo, interacción con clientes, velocidad y consistencia bajo presión.",
      },
      {
        venue: "La Deriva",
        role: "Jefe de partida",
        period: "2022",
        location: "Málaga, España",
        summary:
          "Experiencia en restaurante en Málaga que reforzó la disciplina de mise en place, el ritmo de servicio y la coordinación diaria de cocina en un entorno de alto movimiento.",
      },
      {
        venue: "The Club",
        role: "Cocinero de brunch",
        period: "2022",
        location: "Málaga, España",
        summary:
          "Enfocado en montaje y servicio de brunch, apoyando además compras, inventario, creación de menú y preparación previa al servicio en un concepto de alta demanda.",
      },
      {
        venue: "LUME",
        role: "Cocinero de línea",
        period: "2021",
        location: "Santiago de Compostela, España",
        summary:
          "Trabajó en un concepto innovador de servicio directo al cliente que combinaba técnicas japonesas con sabores mexicanos. El puesto exigía precisión, respeto por el producto y ejecución limpia en un entorno interactivo.",
      },
      {
        venue: "A Tafona",
        role: "Cocinero de preparación",
        period: "2021",
        location: "Santiago de Compostela, España",
        summary:
          "Trabajó bajo la chef Lucía Freitas en un entorno enfocado en la calidad donde la preelaboración, la precisión y la atención al detalle eran esenciales para mantener el estándar de la cocina.",
      },
    ],
    education: [
      {
        title: "Programa técnico en asistencia de cocina",
        institution: "Escuela de Gastronomía de Medellín (EGM)",
        description:
          "Formación en técnicas culinarias, manejo de ingredientes, seguridad alimentaria y preparación de menús con un fuerte enfoque práctico.",
      },
      {
        title: "Curso básico de cocina molecular",
        institution: "Escuela MCS Colombia",
        period: "2021",
        description:
          "Formación en esferificación, desarrollo de texturas, ahumados, emplatado y técnicas con nitrógeno líquido con aplicación práctica.",
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
