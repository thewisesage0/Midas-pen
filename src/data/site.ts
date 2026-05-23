// ============================================================
//  SITE DATA — Edit everything here
//  Books, covers, reviews, brand info, stats, manhwa
// ============================================================

// ─── BOOK IMAGES (5 total) ──────────────────────────────────
// Replace these files in src/assets/books/ with your real book cover images.
// Names must stay the same: book-1.jpg through book-5.jpg
import book1 from "@/assets/books/book 4.jpeg";
import book2 from "@/assets/books/book 1.jpeg";
import book3 from "@/assets/books/book 2.jpeg";
import book4 from "@/assets/books/book 3.jpeg";
import book5 from "@/assets/books/book 5.jpeg";

// ─── COVER PORTFOLIO IMAGES (12 total) ──────────────────────
// Replace these files in src/assets/covers/ with your real cover design images.
// Names must stay the same: cover-01.jpg through cover-12.jpg
import coverPortfolio01 from "@/assets/covers/cover-01.jpg";
import coverPortfolio02 from "@/assets/covers/cover-02.jpg";
import coverPortfolio03 from "@/assets/covers/cover-03.jpg";
import coverPortfolio04 from "@/assets/covers/cover-04.jpg";
import coverPortfolio05 from "@/assets/covers/cover-05.jpg";
import coverPortfolio06 from "@/assets/covers/cover-06.jpg";
import coverPortfolio07 from "@/assets/covers/cover-07.jpg";
import coverPortfolio08 from "@/assets/covers/cover-08.jpg";
import coverPortfolio09 from "@/assets/covers/cover-09.jpg";
import coverPortfolio10 from "@/assets/covers/cover-10.jpg";
import coverPortfolio11 from "@/assets/covers/cover-11.jpg";
import coverPortfolio12 from "@/assets/covers/cover-12.jpg";

// ─── BRAND ──────────────────────────────────────────────────
export const BRAND = {
  name: "The House of Midas Pen",
  short: "MIDAS PEN",
  tagline: "A Cinematic Storytelling Universe",
  credit: "Designed by Zenthros Cover and Design / Ascendify",
  whatsapp: "https://wa.me/?text=" + encodeURIComponent("Hello House of Midas Pen, I would like to book a cover design."),
  reviewUrl: "https://g.page/r/midas-pen/review",
  email: "hello@midaspen.com",
  instagram: "#",
  goodreads: "#",
} as const;

// ─── ABOUT PAGE STATS ───────────────────────────────────────
export const ABOUT_STATS = [
  { value: "20,000+", label: "Covers Designed" },
  { value: "5",    label: "Published Novels" },
  { value: "100%", label: "Made with Fire" },
] as const;

// ─── ABOUT PAGE PILLARS ─────────────────────────────────────
export const ABOUT_PILLARS = [
  { title: "Vision",     desc: "Cinematic. Masculine. Quiet luxury with fire underneath." },
  { title: "Method",     desc: "Story first. Light second. Typography last — and unforgiving." },
  { title: "Tools",      desc: "Photoshop, Ideogram, Chatgpt, Grok." },
  { title: "Philosophy", desc: "A cover should make a reader stop breathing for half a second...or forever." },
] as const;

// ─── BOOK TYPES ─────────────────────────────────────────────
export type Platform =
  | "Wattpad" | "Inkitt" | "Webnovel" | "Amazon" | "Kobo" | "Kindle" | "Smashwords"
  | "NovelFlow" | "AnyStories" | "ReadInk" | "Novelol";

export type Book = {
  title: string;
  cover: string;
  genre: string;
  tags: string[];
  tropes: string[];
  blurb: string;
  rating: number;
  reviews: number;
  platforms: { name: Platform; url: string }[];
  featured?: boolean;
};

// ─── BOOKS ──────────────────────────────────────────────────
// 5 books from the official catalogue.
// To swap a cover: replace the corresponding file in src/assets/books/
// To add a book: add a new import above and a new entry below.
export const books: Book[] = [
  {
    title: "Rise of the Dormant Hybrid",
    cover: book1,
    genre: "Werewolf",
    tags: ["Werewolf", "Dark Romance", "Paranormal", "Fantasy"],
    tropes: ["fated mates", "wolfless heroine", "powerful alpha", "revenge quest", "enemies to lovers"],
    blurb: "Born wolfless and hunted after the brutal fall of her pack, Serena is driven by one purpose: vengeance for her slain parents. Desperate and alone, she seeks refuge with the most powerful Alpha in Elyndor, Kaidon — unaware that he is her fated mate. But Kaidon is no ordinary Alpha, and Serena's quest for revenge is only the beginning. As dark forces rise and secrets unravel, she's thrust into a battle far greater than anything she ever imagined. Will her unrelenting thirst for revenge consume her, or can she uncover the truth and embrace a destiny that could change the fate of Elyndor forever?",
    rating: 4.8,
    reviews: 3240,
    featured: true,
    platforms: [
      { name: "NovelFlow", url: "https://www.novelflow.app/novel/rise-dormant-hybrid?pid=share&uid=69e9bba5b55f491c6a7c4aca" },
    ],
  },
  {
    title: "Betrayed by Blood, Reborn in Fury",
    cover: book2,
    genre: "Dark Romance",
    tags: ["Werewolf", "Dark Romance", "Revenge", "Second Chance"],
    tropes: ["second chance", "time travel", "revenge arc", "morally grey heroine", "forbidden desire", "luna rising"],
    blurb: "I died wearing his mark. A barren wife. A discarded toy. A fool who bled for a man who betrayed me. The day I caught my Alpha buried between her thighs — his fangs marking her where mine should've been. When I uncovered a secret that could destroy him, they shot me dead. But death didn't stick. The Moon Goddess sent me back — dripping with fury and vengeance — to the day he proposed. Back to when I should've laughed in his face and walked away. This time? I'll play the perfect Luna. Wear his ring. Let him believe I'm still his. But every kiss is poison. Every sigh, a lie. While he's lost in the heat of my body, I'll smile — because his empire is already crumbling in my hands. And there's the rival Alpha who's always watched me with dark, possessive eyes. I'll offer him a deal: help me break him, and I'll let you do much more. Revenge so sweet, it's filthy.",
    rating: 4.9,
    reviews: 5810,
    featured: true,
    platforms: [
      { name: "AnyStories", url: "https://www.anystories.app/book/betrayed-by-blood-reborn-in-fury/680c5dfc4d0b59d62890cb6d?channel_type=30&media_source=book_share&campaign_name=69897e387077171ee81c51d0&campaign_id=69897e387077171ee81c51d0&adset_name=book_detail&adset_id=1" },
    ],
  },
  {
    title: "The Hockey Alpha's Fake Girlfriend",
    cover: book3,
    genre: "Romance",
    tags: ["Romance", "Contemporary", "New Adult", "Sports"],
    tropes: ["fake dating", "dangerous love interest", "hidden identity", "small vs powerful", "slow burn"],
    blurb: "Vivienne has always felt small. At home, she's trapped in pain she can't escape. At school, she hides in the shadows, counting the days until she can finally be free. But one choice shatters everything, leaving her broken and more alone than ever. Then there's Rafael. Dark. Untouchable. The boy everyone talks about but no one really knows. He should be the last person Vivienne gets close to, yet she can't look away. He pulls her in with a kind of danger that feels both terrifying and safe — like he sees the parts of her no one else can. But Rafael carries secrets — secrets that could destroy them both. And the closer Vivienne gets, the harder it is to tell if he's her way out… or the reason she never escapes.",
    rating: 4.7,
    reviews: 2190,
    featured: true,
    platforms: [
      { name: "ReadInk", url: "https://m.readink.app/stories/68fb2f230c0497c6778547ea/the-hockey-alpha-s-fake-girlfriend?utm_source=af_app_invites&inviter_id=698d79f73b72ca2ec478e3af&inviter_af_id=1770879475244-4119544042700043792" },
    ],
  },
  {
    title: "Rejected by the Alpha Heir, Mated to His Rival Brother",
    cover: book4,
    genre: "Werewolf",
    tags: ["Werewolf", "Romance", "Paranormal", "Rejection"],
    tropes: ["rejection", "forbidden mate", "rival alpha", "arranged marriage", "secret bond", "enemies to lovers"],
    blurb: "Ciara had one job: secure her engagement to the Alpha's heir. She failed. Rejected at the mating ball and left to freeze in the snow by her own father, she's saved by the last person she expected — Draven Stormclaw, the notorious bastard son everyone fears. His price for her rescue? Marriage. He claims he wants the scandal. A way to humiliate the brother who cast her aside. But the way he looks at her — the careful touches, the fierce protection, the warmth hidden beneath his cold reputation — tells a different story. As Ciara is pulled deeper into Draven's dangerous world, she begins to suspect his reasons for saving her run far deeper than revenge. With her eighteenth birthday approaching — the day she'll finally sense her true mate — time is running out for secrets. Because some bonds are written in the stars. And some are forged in snow and desperation.",
    rating: 4.8,
    reviews: 4470,
    platforms: [
      { name: "Novelol", url: "https://www.novelol.com/goodnovel/share?bid=31001271702&uid=169507596&l=bookDetail&sc=fxrw_0_bookDetail&rd=2&type=3" },
    ],
  },
  {
    title: "Captive of the Feral Lycan King",
    cover: book5,
    genre: "Dark Romance",
    tags: ["Werewolf", "Dark Romance", "Paranormal", "Fantasy", "Lycan"],
    tropes: ["captive romance", "wolfless heroine", "feral alpha", "forbidden desire", "dark king", "sacrifice"],
    blurb: "She was sold to a monster… but what if he's the only one who can save her? Tessa was born wolfless, cast aside, and betrayed by the family who should have protected her. When she's offered as a sacrifice to the feared Feral Lycan King, everyone expects her to die like the others. But she doesn't. Against all odds, she survives his claim — and awakens something dangerous inside him. Something he refuses to let go. Now trapped in his dark world of power and madness, Tessa must fight to endure the beast who owns her… even as forbidden desire begins to burn between them. Yet shadows stir beyond the castle walls. Enemies whisper of war. And the greatest threat may not be the king who claimed her, but the secret buried deep within her soul.",
    rating: 4.9,
    reviews: 6120,
    platforms: [
      { name: "ReadInk", url: "https://m.readink.app/stories/68fb368b4427029f85b7e5bf/captive-of-the-feral-lycan-king?utm_source=af_app_invites&inviter_id=698d79f73b72ca2ec478e3af&inviter_af_id=1770879475244-4119544042700043792" },
    ],
  },
];

// ─── COVER PORTFOLIO ────────────────────────────────────────
// 12 cover design works — completely separate from book images above.
// To swap an image: replace the file in src/assets/covers/ — filename must stay the same.
// To add a cover: add a new import above and a new entry below.
export type CoverItem = {
  id: number;
  image: string;
  title: string;
  category: string;
  tags: string[];
  description: string;
};

export const coverPortfolio: CoverItem[] = [
  { id: 1,  image: coverPortfolio01, title: "Falling for my Ex’s Hockey Dad",          category: "Romance",      tags: ["Romance", "Sport"],    description: "Pink and Addictive" },
  { id: 2,  image: coverPortfolio02, title: "Hidden Affection",          category: "Romance",      tags: ["Romance", ""],    description: "That skirt isn’t hiding any affection" },
  { id: 3,  image: coverPortfolio03, title: "Miss Mafia Wicked Revenge",          category: "Romance",      tags: ["Romance", "Mafia"],    description: "Mad tattoos" },
  { id: 4,  image: coverPortfolio04, title: "Mated to my Hot Alpha Professor",          category: "Romance",      tags: ["Romance", "Taboo"],    description: "Ouh that lip bite" },
  { id: 5,  image: coverPortfolio05, title: "After my Mate killed me, I seduced his brother the beast lord", category: "Romance",      tags: ["Romance", "Werewolf"],    description: "Maybe I should kill my brother’s wife and frame him for it?" },
  { id: 6,  image: coverPortfolio06, title: "His on the Ice",               category: "Hockey",     tags: ["Hockey", "Romance"],        description: "Yours on the Bed" },
  { id: 7,  image: coverPortfolio07, title: "The Alpha’s Silent Bride: Seventh time’s a charm",          category: "Romance",      tags: ["Romance", "Werewolf"],    description: "And this is the seventh cover" },
  { id: 8,  image: coverPortfolio08, title: "It all started with a bet",          category: "Romance",      tags: ["Romance", "School"],    description: "And I bet it ends with a kiss" },
  { id: 9,  image: coverPortfolio09, title: "Surviving my Three Alpha Bullies",          category: "Romance",      tags: ["Romance", "School"],    description: "3 vs 1" },
  { id: 10,  image: coverPortfolio10, title: "Kneel for me Slave",          category: "Romance",      tags: ["Romance", "Mafia"],    description: "Yes zaddy" },
  { id: 11,  image: coverPortfolio11, title: "Pucked and tasted by my bully Alpha stepbrother",          category: "Romance",      tags: ["Werewolf", "Hockey"],    description: "Get a room!" },
  { id: 12,  image: coverPortfolio12, title: "The Don’s Nanny",          category: "Romance",      tags: ["Romance", "Mafia"],    description: "The poor kid wondering where his nanny is…" },
];

// ─── COVER FILTER CATEGORIES ────────────────────────────────
// Add/remove genres that appear as filter buttons on the Covers page
export const categories = [
  "All Covers", "Romance", "Dark Romance", "Dark Fantasy", "Werewolf",
  "Mafia", "Thriller", "Sci-Fi", "Lycan", "Paranormal",
] as const;

// ─── REVIEWS ────────────────────────────────────────────────
export const reviews = [
  { name: "Amara V.",   rating: 5, text: "His covers feel like film posters. They hijack your scroll and refuse to let go.",                         ref: "Cover commission — Dark Romance" },
  { name: "Kieran S.", rating: 5, text: "Midas Pen turned my manuscript into something I was finally proud to publish. Cinematic doesn't even cover it.", ref: "Captive of the Feral Lycan King — Cover" },
  { name: "Léa M.",    rating: 5, text: "Betrayed by Blood consumed me entirely. I read it twice in one sitting. Unforgettable.",                    ref: "Betrayed by Blood, Reborn in Fury — Reader" },
  { name: "Tomás R.",  rating: 5, text: "They understand story before they open Photoshop. That's the difference.",                                  ref: "Cinematic Deluxe Tier" },
  { name: "Iris H.",   rating: 5, text: "Every detail is intentional. Light, fog, typography — all of it serves the story.",                        ref: "Rise of the Dormant Hybrid — Cover" },
  { name: "Dario P.",  rating: 5, text: "I can trust readers to judge my book with the cover he made.", ref: "Cover commission"},
] as const;

// ─── MANHWA DATA ────────────────────────────────────────────
export type ManhwaStatus = "Ongoing" | "Completed" | "Hiatus";

export type Manhwa = {
  id: string;
  title: string;
  cover: string;
  banner?: string;
  genres: string[];
  tags: string[];
  status: ManhwaStatus;
  blurb: string;
  year: number;
  views: number;
  rating: number;
  createdAt: string;
};

export type Chapter = {
  id: string;
  manhwaId: string;
  number: number;
  title: string;
  description: string;
  thumbnail?: string;
  releaseDate: string;
  panels: string[];
  views: number;
};

export type Comment = {
  id: string;
  chapterId?: string;
  manhwaId: string;
  userId: string;
  userName: string;
  avatar?: string;
  body: string;
  rating?: number;
  createdAt: string;
  updatedAt?: string;
  likes: number;
  pinned?: boolean;
  parentId?: string;
  isAuthor?: boolean;
};

// Placeholder image helper — replace with real image URLs when you have them
const img = (seed: string, w = 800, h = 1200) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const seedManhwa: Manhwa[] = [
  {
    id: "m1",
    title: "Rise of the Dormant Hybrid",
    cover: img("roth-cover", 600, 900),
    banner: img("roth-banner", 1600, 700),
    genres: ["Werewolf", "Dark Romance", "Fantasy"],
    tags: ["fated mates", "wolfless heroine", "powerful alpha", "revenge"],
    status: "Ongoing",
    blurb: "Born wolfless and hunted after the brutal fall of her pack, Serena is driven by one purpose: vengeance. She seeks refuge with the most powerful Alpha in Elyndor — unaware that he is her fated mate.",
    year: 2025,
    views: 184320,
    rating: 4.8,
    createdAt: "2025-01-15",
  },
  {
    id: "m2",
    title: "Betrayed by Blood, Reborn in Fury",
    cover: img("bbbrf-cover", 600, 900),
    banner: img("bbbrf-banner", 1600, 700),
    genres: ["Dark Romance", "Werewolf", "Revenge"],
    tags: ["second chance", "revenge arc", "luna rising", "forbidden desire"],
    status: "Ongoing",
    blurb: "I died wearing his mark. The Moon Goddess sent me back — dripping with fury and vengeance — to the day he proposed. This time, I'll play the perfect Luna while his empire crumbles in my hands.",
    year: 2025,
    views: 240501,
    rating: 4.9,
    createdAt: "2024-11-02",
  },
  {
    id: "m3",
    title: "Captive of the Feral Lycan King",
    cover: img("cflk-cover", 600, 900),
    genres: ["Dark Romance", "Werewolf", "Fantasy"],
    tags: ["captive romance", "feral alpha", "wolfless heroine", "dark king"],
    status: "Ongoing",
    blurb: "She was sold to a monster… but what if he's the only one who can save her? Tessa survives his claim and awakens something dangerous inside the Feral Lycan King. Something he refuses to let go.",
    year: 2024,
    views: 310400,
    rating: 4.9,
    createdAt: "2024-06-20",
  },
  {
    id: "m4",
    title: "Rejected by the Alpha Heir",
    cover: img("rbah-cover", 600, 900),
    genres: ["Werewolf", "Romance"],
    tags: ["rejection", "rival alpha", "arranged marriage", "enemies to lovers"],
    status: "Ongoing",
    blurb: "Rejected at the mating ball and left to freeze by her own father, Ciara is saved by the last person she expected — Draven Stormclaw, the notorious bastard son everyone fears. His price? Marriage.",
    year: 2024,
    views: 138200,
    rating: 4.8,
    createdAt: "2024-03-10",
  },
];

const panels = (mid: string, n: number) =>
  Array.from({ length: n }, (_, i) => img(`${mid}-p${i}`, 900, 1300));

export const seedChapters: Chapter[] = [
  { id: "c1", manhwaId: "m1", number: 1, title: "The Wolfless Girl",       description: "Serena runs. The pack burns.", releaseDate: "2025-01-15", panels: panels("m1-1", 8), views: 41200 },
  { id: "c2", manhwaId: "m1", number: 2, title: "Elyndor's Strongest",     description: "She finds the Alpha.",         releaseDate: "2025-01-22", panels: panels("m1-2", 9), views: 38110 },
  { id: "c3", manhwaId: "m1", number: 3, title: "Say My Name",             description: "Kaidon. Say it.",              releaseDate: "2025-01-29", panels: panels("m1-3", 10), views: 35200 },
  { id: "c4", manhwaId: "m2", number: 1, title: "Death Didn't Stick",      description: "She comes back different.",    releaseDate: "2024-11-02", panels: panels("m2-1", 8), views: 52000 },
  { id: "c5", manhwaId: "m2", number: 2, title: "The Perfect Luna",        description: "Every kiss is poison.",        releaseDate: "2024-11-09", panels: panels("m2-2", 9), views: 47210 },
  { id: "c6", manhwaId: "m3", number: 1, title: "The Sacrifice",           description: "Nobody survives the king.",    releaseDate: "2024-06-20", panels: panels("m3-1", 8), views: 62100 },
  { id: "c7", manhwaId: "m4", number: 1, title: "Left in the Snow",        description: "Rejection. Then rescue.",      releaseDate: "2024-03-10", panels: panels("m4-1", 8), views: 31200 },
];

export const seedComments: Comment[] = [
  { id: "co1", manhwaId: "m1", chapterId: "c1", userId: "u1", userName: "Amara V.",  body: "Serena is already my favourite heroine and we're only on chapter one.",  createdAt: "2025-01-16", likes: 42, pinned: true },
  { id: "co2", manhwaId: "m1", chapterId: "c1", userId: "u2", userName: "Kieran S.", body: "The art on that last panel hit different. Cinematic.",                    createdAt: "2025-01-17", likes: 28 },
  { id: "co3", manhwaId: "m2", chapterId: "c4", userId: "u3", userName: "Léa M.",    body: "She came back and I felt it in my chest. That is a protagonist.",        createdAt: "2024-11-05", likes: 64 },
];

// ─── ADMIN CREDENTIALS ──────────────────────────────────────
export const ADMIN_EMAIL    = "thesage196@gmail.com";
export const ADMIN_PASSWORD = "hinata012";
