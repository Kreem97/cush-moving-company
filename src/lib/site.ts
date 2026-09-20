export const site = {
  name: "Cush Moving Company",
  legalName: "Cush Moving Company LLC",
  phone: "(954) 670-7740",
  phoneHref: "tel:+19546707740",
  email: "cushmovingcompany1@gmail.com",
  serviceArea: "South Florida",
  social: {
    instagram: "https://instagram.com/cushmovingcompany",
    facebook: "https://facebook.com/cushmovingcompany",
  },
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Contact", href: "/#quote" },
  { label: "About", href: "/#about" },
];

export type Service = {
  slug: string;
  title: string;
  blurb: string;
  image: string;
  /** grid spans: tablet (sm) + desktop (lg), tiled to fill with no gaps */
  className: string;
  featured?: boolean;
  description: string;
  features: string[];
  gallery: string[];
};

export const services: Service[] = [
  {
    slug: "full-service-move",
    title: "Full Service Move",
    blurb: "Packing, loading, transport, and setup — start to finish.",
    image: "/images/full-service-move.jpg",
    className: "sm:col-span-2 lg:col-span-2 lg:row-span-2",
    featured: true,
    description:
      "From the first box to the last piece of furniture, we handle full-service moves start to finish — packing, loading, transport, and setup in your new place. Local moves across South Florida, handled like it's our own home.",
    features: [
      "Careful packing and furniture wrapping",
      "Loading, transport, and unloading",
      "Placement and setup in your new space",
      "Local moves across South Florida",
    ],
    gallery: [
      "/images/services/full-service-move/1.jpg",
      "/images/services/full-service-move/2.jpg",
      "/images/services/full-service-move/3.jpg",
      "/images/services/full-service-move/4.jpg",
    ],
  },
  {
    slug: "installs-assembly",
    title: "Installs / Assembly",
    blurb: "Furniture, shelving, and fixtures assembled and mounted right.",
    image: "/images/installs-assembly.jpg",
    className: "sm:col-span-1 lg:col-span-2",
    description:
      "Flat-packed furniture, wall-mounted TVs, shelving, and fixtures — assembled and installed right the first time. We bring the tools; you get furniture that's actually level and doesn't wobble.",
    features: [
      "Bed frames, dressers, and case goods",
      "TV mounting and wall fixtures",
      "Shelving and closet systems",
      "Flat-pack furniture assembly, IKEA and beyond",
    ],
    gallery: [
      "/images/services/installs-assembly/1.jpg",
      "/images/services/installs-assembly/2.jpg",
      "/images/services/installs-assembly/3.jpg",
      "/images/services/installs-assembly/4.jpg",
      "/images/services/installs-assembly/5.jpg",
      "/images/services/installs-assembly/6.jpg",
    ],
  },
  {
    slug: "pickup-delivery",
    title: "Pickup & Delivery",
    blurb: "Store runs, marketplace buys, and same-day drop-offs.",
    image: "/images/pickup-delivery.jpg",
    className: "sm:col-span-1 lg:col-span-1",
    description:
      "Store runs, marketplace buys, and same-day drop-offs — if it needs to get from point A to point B, we'll get it there. Fast, reliable pickup and delivery across South Florida.",
    features: [
      "Same-day and scheduled delivery",
      "Furniture and marketplace pickups",
      "Store and warehouse runs",
      "Careful handling, every trip",
    ],
    gallery: [
      "/images/services/pickup-delivery/1.jpg",
      "/images/services/pickup-delivery/2.jpg",
      "/images/services/pickup-delivery/3.jpg",
      "/images/services/pickup-delivery/4.jpg",
    ],
  },
  {
    slug: "freight-hauling",
    title: "Freight Hauling",
    blurb: "Palletized and oversized loads moved on schedule.",
    image: "/images/freight-hauling.jpg",
    className: "sm:col-span-2 lg:col-span-1",
    description:
      "Palletized freight, oversized loads, and bulk shipments moved on schedule. We handle the loading, securing, and transport so your freight arrives on time and intact.",
    features: [
      "Palletized and bulk freight",
      "Forklift loading and unloading",
      "Secured, strapped transport",
      "Scheduled and on-demand runs",
    ],
    gallery: [
      "/images/services/freight-hauling/1.jpg",
      "/images/services/freight-hauling/2.jpg",
      "/images/services/freight-hauling/3.jpg",
      "/images/services/freight-hauling/4.jpg",
      "/images/services/freight-hauling/5.jpg",
    ],
  },
  {
    slug: "home-goods",
    title: "Home Goods",
    blurb: "Single items to whole rooms, moved without the scratches.",
    image: "/images/home-goods.jpg",
    className: "sm:col-span-2 lg:col-span-2",
    description:
      "Single items to whole rooms of furniture, moved without the scratches. Whether it's one piece or a full house of belongings, we treat every item like it's ours.",
    features: [
      "Single-item to whole-room moves",
      "Furniture wrapped and protected",
      "Careful loading and transport",
      "No scratches, no dents, no drama",
    ],
    gallery: [
      "/images/services/home-goods/1.jpg",
      "/images/services/home-goods/2.jpg",
      "/images/services/home-goods/3.jpg",
      "/images/services/home-goods/4.jpg",
    ],
  },
  {
    slug: "junk-removal",
    title: "Junk Removal",
    blurb: "Haul-away and disposal for cleanouts and renovations.",
    image: "/images/junk-removal.jpg",
    className: "sm:col-span-2 lg:col-span-2",
    description:
      "Cleanouts, renovation debris, and unwanted furniture — hauled away and responsibly disposed of. Clear the space without lifting a finger.",
    features: [
      "Furniture and appliance haul-away",
      "Renovation and cleanout debris",
      "Responsible disposal and donation drop-off",
      "Fast turnaround",
    ],
    gallery: ["/images/junk-removal.jpg"],
  },
];
