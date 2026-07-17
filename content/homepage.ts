import type { HomepageContentByLocale } from "@/types/homepage";

const contactValues = {
  email: "andres@tirano.co",
  phone: "+34 603 91 99 93",
  whatsappHref:
    "https://wa.me/34603919993?text=Hello%20Andres%2C%20I%20would%20like%20to%20discuss%20a%20kitchen%20opportunity.",
  instagram: "@anfetirano",
  instagramHref: "https://www.instagram.com/anfetirano/",
  linkedin: "Andres F. Tirano Vasquez",
  linkedinHref: "https://www.linkedin.com/in/andres-f-tirano-vasquez-5792b51a1/",
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
      "This profile is built for employers who need a cook that can step into demanding service, respect standards, and contribute with discipline from day one.",
    strengthsTitle: "Core strengths",
    valueItems: [
      {
        title: "Reliable high-volume execution",
        description:
          "At Hotel Gran Cervantes, Andres worked in live buffet stations such as grill, wok, and crepes while serving around 1,200 guests per day.",
      },
      {
        title: "Precision in quality-focused kitchens",
        description:
          "He worked in A Tafona and LUME, projects led by chef Lucía Freitas, where detail, product quality, and disciplined pre-service preparation were essential.",
      },
      {
        title: "Strong mise en place and organization",
        description:
          "His work includes pre-preparation, station setup, inventory support, purchasing, and menu-related execution in fast-moving service environments.",
      },
      {
        title: "Calm service with direct guest contact",
        description:
          "From brunch service to live hotel stations, he has experience working visibly in front of guests while keeping speed, coordination, and consistency.",
      },
      {
        title: "Experience in premium hospitality environments",
        description:
          "His background also includes hotel and restaurant service in Málaga, adding exposure to guest expectations, polished standards, and service consistency.",
      },
      {
        title: "Adaptable across restaurant and hotel kitchens",
        description:
          "From chef-led restaurants to brunch concepts and large hotel operations, Andres adapts quickly to different service styles while protecting standards and team rhythm.",
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
      "Andres has been passionate about gastronomy from an early age, but his profile is not built on enthusiasm alone. It is built on repeated exposure to demanding kitchens where consistency matters every day.",
      "He is committed to learning continuously, from culinary tradition to newer techniques, and then turning that learning into better execution, stronger teamwork, and a better guest experience.",
      "What stands out in his trajectory is range without losing focus: chef-led kitchens, brunch production, and high-volume hotel service, all connected by the same priorities of discipline, adaptability, and care for standards.",
    ],
    experience: [
      {
        venue: "Only YOU Hotel Málaga",
        role: "Hotel Line Cook",
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
        role: "Restaurant Line Cook",
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
        "Download the full CV for a complete view of experience, education, and contact information.",
      note: "This version includes his latest roles, education, and direct contact details.",
      fileHref: "/documents/andres-tirano-cv.pdf",
      fileLabel: "Download Resume",
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
      "Este perfil está diseñado para empleadores que necesitan un cocinero capaz de integrarse a un servicio exigente, respetar estándares y aportar disciplina desde el primer día.",
    strengthsTitle: "Fortalezas clave",
    valueItems: [
      {
        title: "Ejecución confiable en alto volumen",
        description:
          "En Hotel Gran Cervantes, Andres trabajó en estaciones de buffet en vivo como grill, wok y crepes, atendiendo alrededor de 1,200 comensales por día.",
      },
      {
        title: "Precisión en cocinas enfocadas en calidad",
        description:
          "Trabajó en A Tafona y LUME, proyectos liderados por la chef Lucía Freitas, donde el detalle, la calidad del producto y la preparación disciplinada antes del servicio eran esenciales.",
      },
      {
        title: "Mise en place y organización sólidas",
        description:
          "Su trabajo incluye preelaboración, montaje de estación, apoyo en inventario, compras y ejecución relacionada con menú en entornos de servicio dinámicos.",
      },
      {
        title: "Servicio sereno con contacto directo con el cliente",
        description:
          "Desde el servicio de brunch hasta estaciones hoteleras en vivo, tiene experiencia trabajando de cara al cliente manteniendo velocidad, coordinación y consistencia.",
      },
      {
        title: "Experiencia en entornos de hospitalidad premium",
        description:
          "Su trayectoria también incluye servicio en hoteles y restaurantes en Málaga, con exposición a expectativas elevadas del cliente, estándares pulidos y consistencia de servicio.",
      },
      {
        title: "Adaptabilidad entre restaurantes y hoteles",
        description:
          "Desde restaurantes liderados por chefs hasta conceptos de brunch y operaciones hoteleras, Andres se adapta rápido a distintos estilos de servicio sin perder estándares ni ritmo de equipo.",
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
      "Andres ha sentido pasión por la gastronomía desde muy joven, pero su perfil no se sostiene solo en entusiasmo. Se construye sobre experiencia repetida en cocinas exigentes donde la consistencia importa todos los días.",
      "Está comprometido con aprender de forma continua, desde la tradición culinaria hasta técnicas más actuales, y convertir ese aprendizaje en mejor ejecución, mejor trabajo en equipo y una mejor experiencia para el cliente.",
      "Lo que destaca en su trayectoria es la amplitud sin perder enfoque: cocinas lideradas por chefs, producción de brunch y servicio hotelero de alto volumen, todo unido por disciplina, adaptabilidad y cuidado por los estándares.",
    ],
    experience: [
      {
        venue: "Only YOU Hotel Málaga",
        role: "Cocinero de línea en hotel",
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
        role: "Cocinero de línea en restaurante",
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
        "Descarga el CV completo para revisar experiencia, formación y datos de contacto en detalle.",
      note: "Esta versión incluye sus puestos más recientes, formación y datos de contacto directos.",
      fileHref: "/documents/andres-tirano-cv-es.pdf",
      fileLabel: "Descargar CV",
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
