export const site = {
  name: "Cush Moving Company",
  legalName: "Cush Moving Company LLC",
  phone: "(954) 670-7440",
  phoneHref: "tel:+19546707440",
  email: "cushmovingcompany1@gmail.com",
  serviceArea: "South Florida",
  social: {
    instagram: "https://instagram.com/cushmovingcompany",
    facebook: "https://facebook.com/cushmovingcompany",
  },
};

export const nav = [
  { label: "Home", href: "#top" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#quote" },
  { label: "About", href: "#about" },
];

export type Service = {
  title: string;
  blurb: string;
  image: string;
  /** grid span on large screens */
  className: string;
};

export const services: Service[] = [
  {
    title: "Full Service Move",
    blurb: "Packing, loading, transport, and setup — start to finish.",
    image: "/images/full-service-move.jpg",
    className: "lg:col-span-2 lg:row-span-2",
  },
  {
    title: "Installs / Assembly",
    blurb: "Furniture, shelving, and fixtures assembled and mounted right.",
    image: "/images/installs-assembly.jpg",
    className: "lg:col-span-2",
  },
  {
    title: "Pickup & Delivery",
    blurb: "Store runs, marketplace buys, and same-day drop-offs.",
    image: "/images/pickup-delivery.jpg",
    className: "lg:col-span-2",
  },
  {
    title: "Freight Hauling",
    blurb: "Palletized and oversized loads moved on schedule.",
    image: "/images/freight-hauling.jpg",
    className: "lg:col-span-3",
  },
  {
    title: "Home Goods",
    blurb: "Single items to whole rooms, moved without the scratches.",
    image: "/images/home-goods.jpg",
    className: "lg:col-span-3",
  },
  {
    title: "Junk Removal",
    blurb: "Haul-away and disposal for cleanouts and renovations.",
    image: "/images/junk-removal.jpg",
    className: "lg:col-span-6",
  },
];
