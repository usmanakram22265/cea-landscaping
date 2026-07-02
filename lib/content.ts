export const business = {
  name: "CEA Landscaping & Maintenance",
  shortName: "CEA Landscaping",
  tagline:
    "Custom outdoor spaces built for beauty, function, and long-term durability in the Texas climate.",
  phone: "(832) 879-1400",
  phoneHref: "tel:+18328791400",
  email: "cealandscaping@yahoo.com",
  emailHref: "mailto:cealandscaping@yahoo.com",
  locationLine: "Proudly Serving Houston and Nearby Areas",
  serviceAreas: ["Houston", "Katy", "Sugar Land", "The Woodlands"],
} as const;

// NOTE: the locked footer maps over `nav` and `services` — keep these shapes.
export const nav = [
  { label: "Services", href: "#services" },
  { label: "Why CEA", href: "#why" },
  { label: "Work", href: "#work" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#quote" },
] as const;

// Slim credential strip under the hero.
export const credentials = [
  { label: "Woman-owned & operated" },
  { label: "Licensed & insured" },
  { label: "Certified backflow testing" },
  { label: "Commercial & residential" },
] as const;

// Animated counters inside the Why CEA band.
export const stats = [
  { value: 12, suffix: "+", label: "years in Houston soil" },
  { value: 4, suffix: "", label: "trades on one crew" },
  { value: 30, suffix: "+", label: "neighborhoods served" },
  { value: 1, suffix: "", label: "contact for everything" },
] as const;

// Differentiators for the Why CEA band. First entry is the featured tile.
export const whyChoose = [
  {
    title: "Woman-owned, Houston-rooted",
    body: "We live and work in the same clay soil, Gulf-Coast heat, and flash rain your landscape has to survive. What we plant and build is chosen for here, not for a catalog photo.",
    featured: true,
  },
  {
    title: "Compliance handled in-house",
    body: "Licensed, insured, and certified for backflow testing. Inspections, documentation, and brand standards are part of the job, not an extra vendor.",
  },
  {
    title: "Crews that scale with you",
    body: "One property or a whole portfolio: scheduled visits, proactive updates, and results that pass a walkthrough without a punch list.",
  },
] as const;

export type Service = {
  id: string;
  number: string;
  title: string;
  tag: string;
  summary: string;
  points: string[];
  image: string;
  imageAlt: string;
};

export const services: Service[] = [
  {
    id: "installations",
    number: "01",
    title: "Landscape Installations",
    tag: "Commercial & Residential",
    summary:
      "Planting plans, sod, hardscape, and full outdoor build-outs for new developments, office parks, multi-family sites, and homes.",
    points: [
      "Design and install for residential projects",
      "Office parks, retail centers, multi-family & new construction",
      "Hardscape, walkways, and complete transformations",
      "Tree, shrub, and seasonal color programs",
    ],
    image: "/images/gen2/service-installations.webp",
    imageAlt:
      "Fresh sod and a stone paver walkway being installed at an upscale Houston home in warm afternoon light",
  },
  {
    id: "maintenance",
    number: "02",
    title: "Landscape Maintenance",
    tag: "Commercial Only",
    summary:
      "Scheduled groundskeeping for portfolios: mowing, edging, bed rotations, and trimming with crews that show up when the calendar says.",
    points: [
      "Mowing, edging, blowing & seasonal flower-bed rotations",
      "Tree & shrub trimming, mulch, full renovations",
      "Inspection and compliance experience for branded sites",
      "Luxury multi-family, distribution, HOAs, office & retail",
    ],
    image: "/images/gen2/service-maintenance.webp",
    imageAlt:
      "Striped, freshly mowed lawn and edged flower beds at a luxury apartment community",
  },
  {
    id: "irrigation",
    number: "03",
    title: "Irrigation, Drainage & Backflow",
    tag: "Water Management",
    summary:
      "Standing water, soggy lawns, broken sprinklers, and water creeping toward the foundation: diagnosed, fixed, and kept compliant.",
    points: [
      "French drains, channel drains, grading & catch basins",
      "Irrigation install, repair & smart controllers",
      "Certified backflow testing, inspection & repair",
      "Erosion control and seasonal tuning",
    ],
    image: "/images/gen2/service-irrigation.webp",
    imageAlt:
      "Sprinkler watering a dense green lawn beside a river-rock drainage swale at golden hour",
  },
  {
    id: "treecare",
    number: "04",
    title: "Tree Care & Rockscaping",
    tag: "Trees & Stonework",
    summary:
      "Pruning, removals, and storm response, plus river rock and gravel work that drains Houston rain instead of fighting it.",
    points: [
      "Trimming, pruning, removal & stump grinding",
      "Emergency tree work after storms",
      "Rockscape design, decorative stone & gravel beds",
      "Stone edging that sheds water cleanly",
    ],
    image: "/images/gen2/service-treecare.webp",
    imageAlt:
      "Pruned ornamental tree in a bed of river rock with ornamental grasses at a contemporary Texas home",
  },
];

export const propertyTypes = [
  "Property Manager / Multi-Family",
  "HOA / Community Association",
  "Developer / New Construction",
  "Commercial / Office / Retail",
  "Residential Project",
] as const;

// Greater Houston neighborhoods & suburbs for the service-area ticker.
export const houstonAreas = [
  "Downtown",
  "Midtown",
  "Montrose",
  "The Heights",
  "River Oaks",
  "Memorial",
  "Uptown / Galleria",
  "West University",
  "Bellaire",
  "Museum District",
  "Medical Center",
  "Rice Village",
  "EaDo",
  "Garden Oaks",
  "Oak Forest",
  "Spring Branch",
  "Energy Corridor",
  "Westchase",
  "Clear Lake",
  "Kingwood",
  "Katy",
  "Sugar Land",
  "The Woodlands",
  "Pearland",
  "Cypress",
  "Spring",
  "Tomball",
  "Humble",
  "Missouri City",
  "Friendswood",
  "League City",
  "Richmond",
  "Conroe",
  "Atascocita",
] as const;

// Vertical process timeline.
export const steps = [
  {
    number: "01",
    title: "Tell us about the property",
    body: "Call or send the quote form. We ask the right questions up front: property type, problem areas, timeline, so the site visit is productive.",
  },
  {
    number: "02",
    title: "Walk the site with us",
    body: "We read the soil, the grade, and the drainage before we price anything. You get a clear, itemized proposal built for your property, not a template.",
  },
  {
    number: "03",
    title: "We build it",
    body: "Crews install with the details covered: clean edges, correct depths, plants suited to Gulf-Coast heat. You get updates without asking.",
  },
  {
    number: "04",
    title: "It stays sharp",
    body: "For commercial properties, scheduled maintenance keeps every visit inspection-ready. For projects, we hand off a landscape that holds up past the first season.",
  },
] as const;

// NOTE: Sample reviews for layout/demo purposes — replace with real
// customer testimonials (e.g. from Google) before going live.
export const reviews = [
  {
    quote:
      "CEA keeps our community looking immaculate. The crews are reliable, communicative, and always inspection-ready. Exactly what we need across our properties.",
    name: "Property Manager",
    role: "Luxury Multi-Family, Katy",
    rating: 5,
  },
  {
    quote:
      "They redesigned our entry landscaping and finally fixed drainage issues we'd fought for years. Professional from the first quote to the final walkthrough.",
    name: "HOA Board Member",
    role: "Master-Planned Community, Sugar Land",
    rating: 5,
  },
  {
    quote:
      "Fast, clean, and detail-oriented. Our retail center has never looked better, and scheduling with their team is effortless.",
    name: "Commercial Owner",
    role: "Retail Center, Houston",
    rating: 5,
  },
  {
    quote:
      "We hired CEA for a full backyard install: sod, beds, and stonework. The result exceeded what we had pictured, and it has held up beautifully.",
    name: "Homeowner",
    role: "Residential Project, The Woodlands",
    rating: 5,
  },
] as const;

export const faqs = [
  {
    q: "Do you offer residential lawn maintenance?",
    a: "We take on residential projects: design, installation, tree and shrub work, and seasonal enhancements. Ongoing lawn maintenance is offered for commercial properties only.",
  },
  {
    q: "What areas do you serve?",
    a: "Houston, Katy, Sugar Land, The Woodlands, and nearby communities across Greater Houston.",
  },
  {
    q: "Can you fix drainage and flooding problems?",
    a: "Yes. French drains, surface and channel drains, catch basins, grading, and erosion control, plus irrigation upgrades and certified backflow testing to keep everything compliant.",
  },
  {
    q: "Can you handle large commercial portfolios?",
    a: "Absolutely. We maintain luxury apartment communities, distribution facilities, and HOA-managed properties with scalable crews and experience in inspections, compliance, and brand standards.",
  },
  {
    q: "Are you certified for backflow testing?",
    a: "Yes. Certified backflow testing, preventer inspections, and repairs or replacements are all handled in-house.",
  },
  {
    q: "How fast can you get started?",
    a: "Request a quote through the form or call (832) 879-1400. We typically schedule the site walk within a few business days and follow up with a tailored proposal.",
  },
] as const;

// Real project photos — used ONLY in the work gallery.
export type GalleryImage = {
  src: string;
  alt: string;
  blur: string;
  category: "Installation" | "Maintenance" | "Drainage" | "Stonework" | "Tree Care";
};

export const galleryImages: readonly GalleryImage[] = [
  { src: "/images/projects/020.jpg", blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAPABQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwClHdpFKAScsvHynkGnyX4lYo7Hdx1XBqQWMRALQrn3djUiWkSDPlRZ7fLn+ZNTdFWBEuCoKxxMpGQfMPIoqysuB0z9aKyc2T8z/9k=", alt: "Circular stone planter with seasonal color and fresh mulch", category: "Installation" },
  { src: "/images/projects/023.jpg", blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAbABQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCnIJ0luAsbbWU4496ba3kiQY2jdsfBYeuRitv7HZ5GfL4/2qr6tObe3V4GAwfvhv0NOUVHUyVTmdjKOrahbqiQbwm3OEj4FFdBDOoiX94nIz9/NFNKTHzRFbS7NVYmBmwM43k5rmrmcXChEhESZyVBP612JJ3muds0V9TVGAKlyCDUSZtFamjZ2EEtnA91B5shTq2eB2FFawO0YHAFFJNpCaR//9k=", alt: "Resort-style pool surrounded by palms and manicured landscaping", category: "Installation" },
  { src: "/images/projects/031.jpg", blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAPABQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCmLmaON1a7Kbzliq9ajN88w8symTkYBJ57c1oNor3FxKxfaM5xgdD71Yh0q0jXJ3SkcHcajUdjNSCcLzbzE+oAx/OitZb6KEbIIQEHocUUuZAf/9k=", alt: "Vibrant yellow flowers in a freshly mulched bed", category: "Installation" },
  { src: "/images/projects/001.png", blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAALABQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCs9vHbT+XcLKBjIaN8gn8RUhRMkQq7ZHBZs5q5Koe3O/5sHuc1jgl7gK3KgdO1Ywk5Gd+heCsVUsQrY5AY8UVYW0t3UM8KMcDkjNFaKTNOQ//Z", alt: "Layered planting bed with ornamental grasses along a crisp lawn edge", category: "Installation" },
  { src: "/images/projects/034.jpg", blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAPABQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCrLLd3MEa7d20Efd5PPep9PaezlcpcrGGX5gRkflVu9Sb/AFauYD/sj/69ZyaUZ3KCR5CeoGB/OpuSWhqsURKicjnJ2xYB/I0ULolug2use7vu3Mfzophqf//Z", alt: "Long commercial bed with seasonal color and edged lawn", category: "Maintenance" },
  { src: "/images/projects/024.jpg", blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAbABQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwBxvoYtOtUjj8whOcLkKemKqQXkMs6xyQEO7Y3DIAHvmmsEVRsHr3pl3C1rbxBsrK7byCpGAOlStRvcnmsrmZ/9H4CDDfU8/wBaK6GNkRAQMb/mPvmiouVYxNOjtpbgm7lVUA4BbGT9aq6oVe6k8p2kReFLNu4raFtC5w8SnPtWZqsEduR5K7c+5NWpXYnE3NNYS2EMjLjcg6+3H9KKr6a7DToAD/Cf5misXuWtj//Z", alt: "Channel drain and river-rock drainage between manicured lawns", category: "Drainage" },
  { src: "/images/projects/017.jpg", blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAPABQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDNN2VmQ+cQpC8dqdHqMcb+Zn5wccRg/wCRUyWsMTnES8evNThlToAPoKydS2yCwjm4ch0YsrDOQwA/KinF6Kn20gsj/9k=", alt: "Bed of bright orange seasonal flowers", category: "Installation" },
  { src: "/images/projects/035.jpg", blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAPABQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwC5puqJd+YZW/1ag4+h5x+FVr3VGklB3FYC/wAvGCw+tMWzmGCjRHHT5MUq29xENoht3AOcFQefxqbjsakesWWxRuc4AH3KKy2WcnLWNsT9AP60UXA//9k=", alt: "Upscale modern home with a pristine front lawn", category: "Maintenance" },
  { src: "/images/projects/028.jpg", blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAPABQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCLUrFpQrWNt5DADOzgsfzpZ0nWbcrMEyvUjHbPWp/sE87RkXYk39QwK4wM9qRtIu0xhIH/ADqXcEV0cjd5htt248560VKLG8x/qIz9HopDP//Z", alt: "Fresh dark mulch bed lining a commercial walkway", category: "Maintenance" },
  { src: "/images/projects/030.jpg", blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAbABQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwDTikMd00iNtZVH0I5yDVi31vznnUwldh+Q9mFZCXIFokjtulYFc/QnmmCYRMGAA3LzTl5Cii9LO0shd2OT6cYorMe6G7g0Vlc05SnDwME5yfXpU8z7iAsm8Dp8uKji5mjB6HGamvuFUgAHJ6Cr6EdSqyZOdx/KinbQcE5/OilYq5//2Q==", alt: "Decorative gravel and rock drainage path", category: "Stonework" },
  { src: "/images/projects/002.jpg", blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAWABQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCXmaLczMMKCRn3x/SkgSD7YyruJUHljnNZpuZ7eRh8igjo33WFSxXQTNzJwCdu3GOahhc2wFA4Aoqkty0yI8QwpH8VFFmVcy5FV+GGeaZHZmaVI2kJjBzg/rRRTRmXyGJ+XAHYUUUVRR//2Q==", alt: "Stone planter with ornamental grass and flowers", category: "Stonework" },
  { src: "/images/projects/041.jpg", blur: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDABQODxIPDRQSEBIXFRQYHjIhHhwcHj0sLiQySUBMS0dARkVQWnNiUFVtVkVGZIhlbXd7gYKBTmCNl4x9lnN+gXz/2wBDARUXFx4aHjshITt8U0ZTfHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHx8fHz/wAARCAAbABQDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwCD7FdLIT5wHzDABGMd6YkVxHe3DhkIVsDAz1AP54xVB9UuSc5RFPYLimvNLIV2uozyR93moTkthaMn8q/BOZHJJ64PNFRBL4Dlc/8AAhRRzS7hZF2a2ilXEi9OhHBFQLZwowPzN6Amrb8MAOhqE9fpUXYASSc0UN1NFID/2Q==", alt: "Mulched tree bed with seasonal flowers beside a modern home", category: "Tree Care" },
] as const;

export const galleryCategories = [
  "All",
  "Installation",
  "Maintenance",
  "Drainage",
  "Stonework",
  "Tree Care",
] as const;
