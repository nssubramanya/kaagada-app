// src/data/CourseData.jsx — single source of truth for all path + exercise data

const K = (kn, pr) => ({ kn, pr });

// ── PHRASES COURSE ─────────────────────────────────────────────────────────
// 5 exercises per level. Level N starts at index (N-1)*5.

const PHRASES_COURSE = [
  // ── LEVEL 1 — Basic Words ────────────────────────────────────────────────
  {
    id: 1,
    type: "memory",
    question: K("ನೀರು", "Nee-ru"),
    english: "Water",
    options: [K("ನೀರು", "Nee-ru"), K("ಮನೆ", "Ma-ne"), K("ಅನ್ನ", "An-na"), K("ಊಟ", "Oo-ta")],
    answer: "ನೀರು",
  },
  {
    id: 2,
    type: "match",
    pairs: [
      { en: "House", kn: K("ಮನೆ", "Ma-ne") },
      { en: "Food", kn: K("ಊಟ", "Oo-ta") },
      { en: "Milk", kn: K("ಹಾಲು", "Haa-lu") },
    ],
  },
  {
    id: 3,
    type: "mcq",
    question: "Select 'Hello'",
    options: [K("ನಮಸ್ಕಾರ", "Na-mas-kaa-ra"), K("ಧನ್ಯವಾದ", "Dhan-ya-vaa-da"), K("ಹೌದು", "How-du"), K("ಇಲ್ಲ", "Il-la")],
    answer: "ನಮಸ್ಕಾರ",
  },
  {
    id: 4,
    type: "scramble",
    english: "I eat rice",
    answer: [K("ನಾನು", "Naa-nu"), K("ಅನ್ನ", "An-na"), K("ತಿನ್ನುತ್ತೇನೆ", "Tin-nut-tee-ne")],
    jumbled: [K("ತಿನ್ನುತ್ತೇನೆ", "Tin-nut-tee-ne"), K("ನೀರು", "Nee-ru"), K("ನಾನು", "Naa-nu"), K("ಅನ್ನ", "An-na")],
  },
  {
    id: 5,
    type: "mcq",
    question: "What does 'ಧನ್ಯವಾದ' mean?",
    options: ["Excuse me", "Please", "Thank you", "Welcome"],
    answer: "Thank you",
  },

  // ── LEVEL 2 — School Items ───────────────────────────────────────────────
  {
    id: 6,
    type: "memory",
    question: K("ಪುಸ್ತಕ", "Pus-ta-ka"),
    english: "Book",
    options: [K("ಪುಸ್ತಕ", "Pus-ta-ka"), K("ಲೇಖನಿ", "Lee-kha-ni"), K("ಚೀಲ", "Chee-la"), K("ನೀರು", "Nee-ru")],
    answer: "ಪುಸ್ತಕ",
  },
  {
    id: 7,
    type: "match",
    pairs: [
      { en: "Pen", kn: K("ಲೇಖನಿ", "Lee-kha-ni") },
      { en: "Bag", kn: K("ಚೀಲ", "Chee-la") },
      { en: "Book", kn: K("ಪುಸ್ತಕ", "Pus-ta-ka") },
    ],
  },
  {
    id: 8,
    type: "mcq",
    question: "What does 'ಒಳ್ಳೆಯದು' mean?",
    options: ["Bad", "Good", "Big", "Small"],
    answer: "Good",
  },
  {
    id: 9,
    type: "scramble",
    english: "I drink water",
    answer: [K("ನಾನು", "Naa-nu"), K("ನೀರು", "Nee-ru"), K("ಕುಡಿಯುತ್ತೇನೆ", "Ku-di-yut-tee-ne")],
    jumbled: [K("ಕುಡಿಯುತ್ತೇನೆ", "Ku-di-yut-tee-ne"), K("ಅನ್ನ", "An-na"), K("ನಾನು", "Naa-nu"), K("ನೀರು", "Nee-ru")],
  },
  {
    id: 10,
    type: "mcq",
    question: "Select 'Yes'",
    options: [K("ಹೌದು", "How-du"), K("ಇಲ್ಲ", "Il-la"), K("ಇದೆ", "I-de"), K("ಬೇಡ", "Bee-da")],
    answer: "ಹೌದು",
  },

  // ── LEVEL 3 — Greetings ──────────────────────────────────────────────────
  {
    id: 11,
    type: "memory",
    question: K("ಶುಭ ಬೆಳಗು", "Shu-bha Be-la-gu"),
    english: "Good Morning",
    options: [K("ಶುಭ ಬೆಳಗು", "Shu-bha Be-la-gu"), K("ಶುಭ ರಾತ್ರಿ", "Shu-bha Raa-tri"), K("ನಮಸ್ಕಾರ", "Na-mas-kaa-ra"), K("ಧನ್ಯವಾದ", "Dhan-ya-vaa-da")],
    answer: "ಶುಭ ಬೆಳಗು",
  },
  {
    id: 12,
    type: "match",
    pairs: [
      { en: "Good Morning", kn: K("ಶುಭ ಬೆಳಗು", "Shu-bha Be-la-gu") },
      { en: "Good Night", kn: K("ಶುಭ ರಾತ್ರಿ", "Shu-bha Raa-tri") },
      { en: "Goodbye", kn: K("ವಿದಾಯ", "Vi-daa-ya") },
    ],
  },
  {
    id: 13,
    type: "mcq",
    question: "How do you say 'How are you?'",
    options: [K("ನಾನು ಚೆನ್ನಾಗಿದ್ದೇನೆ", "Naa-nu chen-naa-gid-dee-ne"), K("ನೀವು ಹೇಗಿದ್ದೀರಿ?", "Nee-vu hee-gid-dee-ri?"), K("ನಮಸ್ಕಾರ", "Na-mas-kaa-ra"), K("ಧನ್ಯವಾದ", "Dhan-ya-vaa-da")],
    answer: "ನೀವು ಹೇಗಿದ್ದೀರಿ?",
  },
  {
    id: 14,
    type: "scramble",
    english: "Good morning",
    answer: [K("ಶುಭ", "Shu-bha"), K("ಬೆಳಗು", "Be-la-gu")],
    jumbled: [K("ಬೆಳಗು", "Be-la-gu"), K("ರಾತ್ರಿ", "Raa-tri"), K("ಶುಭ", "Shu-bha"), K("ವಿದಾಯ", "Vi-daa-ya")],
  },
  {
    id: 15,
    type: "mcq",
    question: "What does 'ಮತ್ತೆ ಸಿಗೋಣ' mean?",
    options: ["Hello", "See you again", "Thank you", "Excuse me"],
    answer: "See you again",
  },

  // ── LEVEL 4 — Introduction ───────────────────────────────────────────────
  {
    id: 16,
    type: "memory",
    question: K("ನನ್ನ ಹೆಸರು", "Nan-na he-sa-ru"),
    english: "My name",
    options: [K("ನನ್ನ ಹೆಸರು", "Nan-na he-sa-ru"), K("ಅವರ ಹೆಸರು", "A-va-ra he-sa-ru"), K("ನಿಮ್ಮ ಹೆಸರು", "Nim-ma he-sa-ru"), K("ಅವನ ಹೆಸರು", "A-va-na he-sa-ru")],
    answer: "ನನ್ನ ಹೆಸರು",
  },
  {
    id: 17,
    type: "match",
    pairs: [
      { en: "I / Me", kn: K("ನಾನು", "Naa-nu") },
      { en: "You", kn: K("ನೀವು", "Nee-vu") },
      { en: "He / She", kn: K("ಅವರು", "A-va-ru") },
    ],
  },
  {
    id: 18,
    type: "mcq",
    question: "What does 'ನಾನು ಕನ್ನಡ ಕಲಿಯುತ್ತೇನೆ' mean?",
    options: ["I speak Kannada", "I am learning Kannada", "I like Kannada", "I teach Kannada"],
    answer: "I am learning Kannada",
  },
  {
    id: 19,
    type: "scramble",
    english: "My name is Raju",
    answer: [K("ನನ್ನ", "Nan-na"), K("ಹೆಸರು", "he-sa-ru"), K("ರಾಜು", "Raa-ju")],
    jumbled: [K("ರಾಜು", "Raa-ju"), K("ಹೆಸರು", "he-sa-ru"), K("ಅವರು", "A-va-ru"), K("ನನ್ನ", "Nan-na")],
  },
  {
    id: 20,
    type: "mcq",
    question: "How do you say 'Nice to meet you'?",
    options: [K("ಸಂತೋಷವಾಯಿತು", "San-to-sha-vaa-yi-tu"), K("ಧನ್ಯವಾದ", "Dhan-ya-vaa-da"), K("ಕ್ಷಮಿಸಿ", "Ksha-mi-si"), K("ವಿದಾಯ", "Vi-daa-ya")],
    answer: "ಸಂತೋಷವಾಯಿತು",
  },

  // ── LEVEL 5 — Numbers ────────────────────────────────────────────────────
  {
    id: 21,
    type: "memory",
    question: K("ಐದು", "Ai-du"),
    english: "Five",
    options: [K("ಮೂರು", "Moo-ru"), K("ನಾಲ್ಕು", "Naal-ku"), K("ಐದು", "Ai-du"), K("ಆರು", "Aa-ru")],
    answer: "ಐದು",
  },
  {
    id: 22,
    type: "match",
    pairs: [
      { en: "One", kn: K("ಒಂದು", "On-du") },
      { en: "Two", kn: K("ಎರಡು", "E-ra-du") },
      { en: "Three", kn: K("ಮೂರು", "Moo-ru") },
    ],
  },
  {
    id: 23,
    type: "mcq",
    question: "What is 'ನಾಲ್ಕು' in English?",
    options: ["Three", "Four", "Five", "Six"],
    answer: "Four",
  },
  {
    id: 24,
    type: "match",
    pairs: [
      { en: "Four", kn: K("ನಾಲ್ಕು", "Naal-ku") },
      { en: "Five", kn: K("ಐದು", "Ai-du") },
      { en: "Ten", kn: K("ಹತ್ತು", "Hat-tu") },
    ],
  },
  {
    id: 25,
    type: "mcq",
    question: "How do you say 'Ten' in Kannada?",
    options: [K("ಆರು", "Aa-ru"), K("ಎಂಟು", "En-tu"), K("ಒಂಭತ್ತು", "Om-bhat-tu"), K("ಹತ್ತು", "Hat-tu")],
    answer: "ಹತ್ತು",
  },

  // ── LEVEL 6 — Family ─────────────────────────────────────────────────────
  {
    id: 26,
    type: "memory",
    question: K("ಅಮ್ಮ", "Am-ma"),
    english: "Mother",
    options: [K("ಅಮ್ಮ", "Am-ma"), K("ಅಪ್ಪ", "Ap-pa"), K("ಅಣ್ಣ", "An-na"), K("ಅಕ್ಕ", "Ak-ka")],
    answer: "ಅಮ್ಮ",
  },
  {
    id: 27,
    type: "match",
    pairs: [
      { en: "Mother", kn: K("ಅಮ್ಮ", "Am-ma") },
      { en: "Father", kn: K("ಅಪ್ಪ", "Ap-pa") },
      { en: "Elder brother", kn: K("ಅಣ್ಣ", "An-na") },
    ],
  },
  {
    id: 28,
    type: "mcq",
    question: "What does 'ಅಕ್ಕ' mean?",
    options: ["Younger sister", "Elder sister", "Mother", "Grandmother"],
    answer: "Elder sister",
  },
  {
    id: 29,
    type: "match",
    pairs: [
      { en: "Elder sister", kn: K("ಅಕ್ಕ", "Ak-ka") },
      { en: "Younger brother", kn: K("ತಮ್ಮ", "Tam-ma") },
      { en: "Grandmother", kn: K("ಅಜ್ಜಿ", "Aj-ji") },
    ],
  },
  {
    id: 30,
    type: "mcq",
    question: "How do you say 'My father' in Kannada?",
    options: [K("ನನ್ನ ಅಮ್ಮ", "Nan-na Am-ma"), K("ನನ್ನ ಅಪ್ಪ", "Nan-na Ap-pa"), K("ನನ್ನ ಅಣ್ಣ", "Nan-na An-na"), K("ನನ್ನ ಅಕ್ಕ", "Nan-na Ak-ka")],
    answer: "ನನ್ನ ಅಪ್ಪ",
  },

  // ── LEVEL 7 — Food & Drinks ──────────────────────────────────────────────
  {
    id: 31,
    type: "memory",
    question: K("ಕಾಫಿ", "Kaa-fi"),
    english: "Coffee",
    options: [K("ಕಾಫಿ", "Kaa-fi"), K("ಚಹಾ", "Cha-haa"), K("ಹಾಲು", "Haa-lu"), K("ನೀರು", "Nee-ru")],
    answer: "ಕಾಫಿ",
  },
  {
    id: 32,
    type: "match",
    pairs: [
      { en: "Coffee", kn: K("ಕಾಫಿ", "Kaa-fi") },
      { en: "Tea", kn: K("ಚಹಾ", "Cha-haa") },
      { en: "Rice", kn: K("ಅನ್ನ", "An-na") },
    ],
  },
  {
    id: 33,
    type: "mcq",
    question: "What does 'ಹಣ್ಣು' mean?",
    options: ["Vegetable", "Fruit", "Meat", "Sweet"],
    answer: "Fruit",
  },
  {
    id: 34,
    type: "scramble",
    english: "I want coffee",
    answer: [K("ನನಗೆ", "Na-na-ge"), K("ಕಾಫಿ", "Kaa-fi"), K("ಬೇಕು", "Bee-ku")],
    jumbled: [K("ಬೇಕು", "Bee-ku"), K("ಕಾಫಿ", "Kaa-fi"), K("ಚಹಾ", "Cha-haa"), K("ನನಗೆ", "Na-na-ge")],
  },
  {
    id: 35,
    type: "mcq",
    question: "How do you say 'I am hungry'?",
    options: [K("ನನಗೆ ಬಾಯಾರಿಕೆ", "Na-na-ge Baa-yaa-ri-ke"), K("ನನಗೆ ಹಸಿವಾಗಿದೆ", "Na-na-ge Ha-si-vaa-gi-de"), K("ನನಗೆ ಕಾಫಿ ಬೇಕು", "Na-na-ge Kaa-fi Bee-ku"), K("ನನಗೆ ನಿದ್ರೆ ಬರುತ್ತಿದೆ", "Na-na-ge Ni-dre Ba-rut-ti-de")],
    answer: "ನನಗೆ ಹಸಿವಾಗಿದೆ",
  },

  // ── LEVEL 8 — Directions ─────────────────────────────────────────────────
  {
    id: 36,
    type: "memory",
    question: K("ಬಲ", "Ba-la"),
    english: "Right",
    options: [K("ಬಲ", "Ba-la"), K("ಎಡ", "E-da"), K("ಮುಂದೆ", "Mun-de"), K("ಹಿಂದೆ", "Hin-de")],
    answer: "ಬಲ",
  },
  {
    id: 37,
    type: "match",
    pairs: [
      { en: "Right", kn: K("ಬಲ", "Ba-la") },
      { en: "Left", kn: K("ಎಡ", "E-da") },
      { en: "Straight", kn: K("ನೇರ", "Nee-ra") },
    ],
  },
  {
    id: 38,
    type: "mcq",
    question: "What does 'ಎಲ್ಲಿ?' mean?",
    options: ["What?", "Who?", "Where?", "When?"],
    answer: "Where?",
  },
  {
    id: 39,
    type: "scramble",
    english: "Turn left",
    answer: [K("ಎಡಕ್ಕೆ", "E-dak-ke"), K("ತಿರುಗಿ", "Ti-ru-gi")],
    jumbled: [K("ತಿರುಗಿ", "Ti-ru-gi"), K("ಬಲಕ್ಕೆ", "Ba-lak-ke"), K("ಎಡಕ್ಕೆ", "E-dak-ke")],
  },
  {
    id: 40,
    type: "mcq",
    question: "How do you ask 'Where is the bus stop?'",
    options: [K("ಬಸ್ ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ?", "Bus nil-daa-na el-li-de?"), K("ಬಸ್ ಯಾವಾಗ ಬರುತ್ತದೆ?", "Bus yaa-vaa-ga ba-rut-ta-de?"), K("ಇಲ್ಲಿ ಬಸ್ ಇದೆಯೇ?", "Il-li bus i-de-yee?"), K("ಬಸ್ ಎಷ್ಟು?", "Bus es-tu?")],
    answer: "ಬಸ್ ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ?",
  },
];

// ── ALPHABETS COURSE ───────────────────────────────────────────────────────
// 5 exercises per level. Level N starts at index (N-1)*5.

const ALPHABETS_COURSE = [
  // ── LEVEL 1 — Vowels I (ಅ ಆ ಇ ಈ ಉ) ─────────────────────────────────────
  {
    id: 1,
    type: "memory",
    question: K("ಅ", "a"),
    english: "First vowel — short 'a' sound",
    options: [K("ಅ", "a"), K("ಆ", "aa"), K("ಇ", "i"), K("ಉ", "u")],
    answer: "ಅ",
  },
  {
    id: 2,
    type: "match",
    pairs: [
      { en: "a (short)", kn: K("ಅ", "a") },
      { en: "aa (long)", kn: K("ಆ", "aa") },
      { en: "i (short)", kn: K("ಇ", "i") },
    ],
  },
  {
    id: 3,
    type: "mcq",
    question: "Which letter makes the long 'aa' sound?",
    options: [K("ಅ", "a"), K("ಆ", "aa"), K("ಇ", "i"), K("ಈ", "ii")],
    answer: "ಆ",
  },
  {
    id: 4,
    type: "mcq",
    question: "What sound does 'ಉ' make?",
    options: ["a", "i", "u", "e"],
    answer: "u",
  },
  {
    id: 5,
    type: "match",
    pairs: [
      { en: "ii (long i)", kn: K("ಈ", "ii") },
      { en: "u (short)", kn: K("ಉ", "u") },
      { en: "uu (long u)", kn: K("ಊ", "uu") },
    ],
  },

  // ── LEVEL 2 — Vowels II (ಊ ಎ ಏ ಒ ಓ) ────────────────────────────────────
  {
    id: 6,
    type: "memory",
    question: K("ಎ", "e"),
    english: "Short 'e' sound",
    options: [K("ಎ", "e"), K("ಏ", "ee"), K("ಒ", "o"), K("ಓ", "oo")],
    answer: "ಎ",
  },
  {
    id: 7,
    type: "match",
    pairs: [
      { en: "e (short)", kn: K("ಎ", "e") },
      { en: "ee (long)", kn: K("ಏ", "ee") },
      { en: "o (short)", kn: K("ಒ", "o") },
    ],
  },
  {
    id: 8,
    type: "mcq",
    question: "Which letter makes the long 'oo' sound?",
    options: [K("ಒ", "o"), K("ಓ", "oo"), K("ಎ", "e"), K("ಏ", "ee")],
    answer: "ಓ",
  },
  {
    id: 9,
    type: "mcq",
    question: "What sound does 'ಐ' make?",
    options: ["o", "u", "ai", "au"],
    answer: "ai",
  },
  {
    id: 10,
    type: "match",
    pairs: [
      { en: "oo (long o)", kn: K("ಓ", "oo") },
      { en: "ai", kn: K("ಐ", "ai") },
      { en: "au", kn: K("ಔ", "au") },
    ],
  },

  // ── LEVEL 3 — Consonants I (ಕ ಖ ಗ ಘ group) ──────────────────────────────
  {
    id: 11,
    type: "memory",
    question: K("ಕ", "ka"),
    english: "'ka' — like 'k' in 'kite'",
    options: [K("ಕ", "ka"), K("ಖ", "kha"), K("ಗ", "ga"), K("ಘ", "gha")],
    answer: "ಕ",
  },
  {
    id: 12,
    type: "match",
    pairs: [
      { en: "ka", kn: K("ಕ", "ka") },
      { en: "kha", kn: K("ಖ", "kha") },
      { en: "ga", kn: K("ಗ", "ga") },
    ],
  },
  {
    id: 13,
    type: "mcq",
    question: "Which letter makes the 'ga' sound?",
    options: [K("ಕ", "ka"), K("ಖ", "kha"), K("ಗ", "ga"), K("ಘ", "gha")],
    answer: "ಗ",
  },
  {
    id: 14,
    type: "mcq",
    question: "What sound does 'ಘ' make?",
    options: ["ka", "kha", "ga", "gha"],
    answer: "gha",
  },
  {
    id: 15,
    type: "match",
    pairs: [
      { en: "gha", kn: K("ಘ", "gha") },
      { en: "cha", kn: K("ಚ", "cha") },
      { en: "ja", kn: K("ಜ", "ja") },
    ],
  },

  // ── LEVEL 4 — Consonants II (ಚ ಛ ಜ ಝ group) ──────────────────────────────
  {
    id: 16,
    type: "memory",
    question: K("ಚ", "cha"),
    english: "'cha' — like 'ch' in 'chair'",
    options: [K("ಚ", "cha"), K("ಛ", "chha"), K("ಜ", "ja"), K("ಝ", "jha")],
    answer: "ಚ",
  },
  {
    id: 17,
    type: "match",
    pairs: [
      { en: "cha", kn: K("ಚ", "cha") },
      { en: "ja", kn: K("ಜ", "ja") },
      { en: "jha", kn: K("ಝ", "jha") },
    ],
  },
  {
    id: 18,
    type: "mcq",
    question: "Which letter makes the 'ja' sound?",
    options: [K("ಚ", "cha"), K("ಛ", "chha"), K("ಜ", "ja"), K("ಝ", "jha")],
    answer: "ಜ",
  },
  {
    id: 19,
    type: "mcq",
    question: "What sound does 'ಛ' make?",
    options: ["cha", "chha", "ja", "sha"],
    answer: "chha",
  },
  {
    id: 20,
    type: "match",
    pairs: [
      { en: "chha", kn: K("ಛ", "chha") },
      { en: "ta", kn: K("ತ", "ta") },
      { en: "da", kn: K("ದ", "da") },
    ],
  },

  // ── LEVEL 5 — Consonants III (ತ ಥ ದ ಧ ನ group) ───────────────────────────
  {
    id: 21,
    type: "memory",
    question: K("ತ", "ta"),
    english: "'ta' — soft dental 't' sound",
    options: [K("ತ", "ta"), K("ಥ", "tha"), K("ದ", "da"), K("ಧ", "dha")],
    answer: "ತ",
  },
  {
    id: 22,
    type: "match",
    pairs: [
      { en: "ta", kn: K("ತ", "ta") },
      { en: "tha", kn: K("ಥ", "tha") },
      { en: "da", kn: K("ದ", "da") },
    ],
  },
  {
    id: 23,
    type: "mcq",
    question: "Which letter makes the 'na' sound?",
    options: [K("ತ", "ta"), K("ಥ", "tha"), K("ದ", "da"), K("ನ", "na")],
    answer: "ನ",
  },
  {
    id: 24,
    type: "mcq",
    question: "What sound does 'ಧ' make?",
    options: ["ta", "tha", "da", "dha"],
    answer: "dha",
  },
  {
    id: 25,
    type: "match",
    pairs: [
      { en: "dha", kn: K("ಧ", "dha") },
      { en: "na", kn: K("ನ", "na") },
      { en: "pa", kn: K("ಪ", "pa") },
    ],
  },

  // ── LEVEL 6 — Joining Letters ────────────────────────────────────────────
  {
    id: 26,
    type: "memory",
    question: K("ಕ + ಅ = ಕ", "ka"),
    english: "Consonant + short 'a' vowel = same letter",
    options: [K("ಕ", "ka"), K("ಕಿ", "ki"), K("ಕಾ", "kaa"), K("ಕು", "ku")],
    answer: "ಕ",
  },
  {
    id: 27,
    type: "match",
    pairs: [
      { en: "ka + aa = ", kn: K("ಕಾ", "kaa") },
      { en: "ka + i = ", kn: K("ಕಿ", "ki") },
      { en: "ka + u = ", kn: K("ಕು", "ku") },
    ],
  },
  {
    id: 28,
    type: "mcq",
    question: "What does 'ಗ' + 'ಆ' (aa) become?",
    options: [K("ಗಿ", "gi"), K("ಗಾ", "gaa"), K("ಗು", "gu"), K("ಗೆ", "ge")],
    answer: "ಗಾ",
  },
  {
    id: 29,
    type: "mcq",
    question: "What sound does 'ನಿ' make?",
    options: ["na", "ni", "nu", "naa"],
    answer: "ni",
  },
  {
    id: 30,
    type: "match",
    pairs: [
      { en: "naa", kn: K("ನಾ", "naa") },
      { en: "ni", kn: K("ನಿ", "ni") },
      { en: "nu", kn: K("ನು", "nu") },
    ],
  },

  // ── LEVEL 7 — Simple Words ───────────────────────────────────────────────
  {
    id: 31,
    type: "memory",
    question: K("ಮನೆ", "Ma-ne"),
    english: "House",
    options: [K("ಮನೆ", "Ma-ne"), K("ಮರ", "Ma-ra"), K("ನದಿ", "Na-di"), K("ಕಾಡು", "Kaa-du")],
    answer: "ಮನೆ",
  },
  {
    id: 32,
    type: "match",
    pairs: [
      { en: "House", kn: K("ಮನೆ", "Ma-ne") },
      { en: "Tree", kn: K("ಮರ", "Ma-ra") },
      { en: "River", kn: K("ನದಿ", "Na-di") },
    ],
  },
  {
    id: 33,
    type: "mcq",
    question: "What does 'ಕಾಡು' mean?",
    options: ["Sea", "Mountain", "Forest", "Sky"],
    answer: "Forest",
  },
  {
    id: 34,
    type: "mcq",
    question: "Which word means 'Sun'?",
    options: [K("ಚಂದ್ರ", "Chan-dra"), K("ನಕ್ಷತ್ರ", "Nak-sha-tra"), K("ಸೂರ್ಯ", "Soor-ya"), K("ಮೋಡ", "Mo-da")],
    answer: "ಸೂರ್ಯ",
  },
  {
    id: 35,
    type: "match",
    pairs: [
      { en: "Sun", kn: K("ಸೂರ್ಯ", "Soor-ya") },
      { en: "Moon", kn: K("ಚಂದ್ರ", "Chan-dra") },
      { en: "Star", kn: K("ನಕ್ಷತ್ರ", "Nak-sha-tra") },
    ],
  },

  // ── LEVEL 8 — Short Sentences ────────────────────────────────────────────
  {
    id: 36,
    type: "memory",
    question: K("ಇದು ಮನೆ", "I-du Ma-ne"),
    english: "This is a house",
    options: [K("ಇದು ಮನೆ", "I-du Ma-ne"), K("ಇದು ಮರ", "I-du Ma-ra"), K("ಅದು ಮನೆ", "A-du Ma-ne"), K("ಇದು ನದಿ", "I-du Na-di")],
    answer: "ಇದು ಮನೆ",
  },
  {
    id: 37,
    type: "match",
    pairs: [
      { en: "This is", kn: K("ಇದು", "I-du") },
      { en: "That is", kn: K("ಅದು", "A-du") },
      { en: "What is this?", kn: K("ಇದು ಏನು?", "I-du ee-nu?") },
    ],
  },
  {
    id: 38,
    type: "mcq",
    question: "What does 'ಅದು ಮರ' mean?",
    options: ["This is a tree", "That is a tree", "Where is the tree?", "A big tree"],
    answer: "That is a tree",
  },
  {
    id: 39,
    type: "scramble",
    english: "This is a house",
    answer: [K("ಇದು", "I-du"), K("ಮನೆ", "Ma-ne")],
    jumbled: [K("ಮನೆ", "Ma-ne"), K("ಅದು", "A-du"), K("ಇದು", "I-du")],
  },
  {
    id: 40,
    type: "mcq",
    question: "How do you say 'What is this?'",
    options: [K("ಇದು ಏನು?", "I-du ee-nu?"), K("ಇದು ಎಲ್ಲಿ?", "I-du el-li?"), K("ಇದು ಯಾರು?", "I-du yaa-ru?"), K("ಇದು ಯಾವಾಗ?", "I-du yaa-vaa-ga?")],
    answer: "ಇದು ಏನು?",
  },

  // ── LEVEL 9 — Reading Practice ───────────────────────────────────────────
  {
    id: 41,
    type: "memory",
    question: K("ಕನ್ನಡ", "Kan-na-da"),
    english: "Kannada",
    options: [K("ಕನ್ನಡ", "Kan-na-da"), K("ತಮಿಳು", "Ta-mi-lu"), K("ಹಿಂದಿ", "Hin-di"), K("ತೆಲುಗು", "Te-lu-gu")],
    answer: "ಕನ್ನಡ",
  },
  {
    id: 42,
    type: "match",
    pairs: [
      { en: "Kannada", kn: K("ಕನ್ನಡ", "Kan-na-da") },
      { en: "Karnataka", kn: K("ಕರ್ನಾಟಕ", "Kar-naa-ta-ka") },
      { en: "Bengaluru", kn: K("ಬೆಂಗಳೂರು", "Ben-ga-loo-ru") },
    ],
  },
  {
    id: 43,
    type: "mcq",
    question: "What does 'ನಾನು ಕನ್ನಡಿಗ' mean?",
    options: ["I speak Kannada", "I am a Kannadiga", "I love Kannada", "I study Kannada"],
    answer: "I am a Kannadiga",
  },
  {
    id: 44,
    type: "mcq",
    question: "Which word means 'Bengaluru'?",
    options: [K("ಕನ್ನಡ", "Kan-na-da"), K("ಕರ್ನಾಟಕ", "Kar-naa-ta-ka"), K("ಬೆಂಗಳೂರು", "Ben-ga-loo-ru"), K("ಮೈಸೂರು", "Mai-soo-ru")],
    answer: "ಬೆಂಗಳೂರು",
  },
  {
    id: 45,
    type: "match",
    pairs: [
      { en: "Mysuru", kn: K("ಮೈಸೂರು", "Mai-soo-ru") },
      { en: "Hubli", kn: K("ಹುಬ್ಬಳ್ಳಿ", "Hub-bal-li") },
      { en: "Mangaluru", kn: K("ಮಂಗಳೂರು", "Man-ga-loo-ru") },
    ],
  },

  // ── LEVEL 10 — Final Test ────────────────────────────────────────────────
  {
    id: 46,
    type: "mcq",
    question: "Which of these is NOT a Kannada vowel?",
    options: [K("ಅ", "a"), K("ಇ", "i"), K("ಕ", "ka"), K("ಉ", "u")],
    answer: "ಕ",
  },
  {
    id: 47,
    type: "match",
    pairs: [
      { en: "a", kn: K("ಅ", "a") },
      { en: "ka", kn: K("ಕ", "ka") },
      { en: "ma", kn: K("ಮ", "ma") },
    ],
  },
  {
    id: 48,
    type: "memory",
    question: K("ರಾಷ್ಟ್ರ", "Raash-tra"),
    english: "Nation",
    options: [K("ರಾಷ್ಟ್ರ", "Raash-tra"), K("ರಾಜ್ಯ", "Raaj-ya"), K("ನಗರ", "Na-ga-ra"), K("ಹಳ್ಳಿ", "Hal-li")],
    answer: "ರಾಷ್ಟ್ರ",
  },
  {
    id: 49,
    type: "mcq",
    question: "What does 'ಜ್ಞಾನ' mean?",
    options: ["Power", "Knowledge", "Peace", "Beauty"],
    answer: "Knowledge",
  },
  {
    id: 50,
    type: "match",
    pairs: [
      { en: "Knowledge", kn: K("ಜ್ಞಾನ", "Gnaa-na") },
      { en: "Language", kn: K("ಭಾಷೆ", "Bhaa-she") },
      { en: "Script", kn: K("ಲಿಪಿ", "Li-pi") },
    ],
  },
];

// ── PATH METADATA ──────────────────────────────────────────────────────────
// Used by ProgressMapPage

export const PATH_DATA = {
  phrases: {
    title: "Basic Communication",
    color: "#d35400",
    light: "#fff3e0",
    emoji: "🗣️",
    levels: [
      { id: 1, title: "Basic Words", emoji: "🌟", xp: 100 },
      { id: 2, title: "School Items", emoji: "📚", xp: 120 },
      { id: 3, title: "Greetings", emoji: "👋", xp: 150 },
      { id: 4, title: "Introduction", emoji: "🤝", xp: 180 },
      { id: 5, title: "Numbers", emoji: "🔢", xp: 200 },
      { id: 6, title: "Family", emoji: "👨‍👩‍👧", xp: 200 },
      { id: 7, title: "Food & Drinks", emoji: "🍛", xp: 220 },
      { id: 8, title: "Directions", emoji: "🗺️", xp: 250 },
    ],
  },
  alphabets: {
    title: "Alphabets & Reading",
    color: "#1a7a4a",
    light: "#e8f5e9",
    emoji: "📖",
    levels: [
      { id: 1, title: "Vowels I", emoji: "🅐", xp: 100 },
      { id: 2, title: "Vowels II", emoji: "🅑", xp: 100 },
      { id: 3, title: "Consonants I", emoji: "✏️", xp: 120 },
      { id: 4, title: "Consonants II", emoji: "✏️", xp: 120 },
      { id: 5, title: "Consonants III", emoji: "✏️", xp: 150 },
      { id: 6, title: "Joining Letters", emoji: "🔗", xp: 180 },
      { id: 7, title: "Simple Words", emoji: "📝", xp: 200 },
      { id: 8, title: "Short Sentences", emoji: "💬", xp: 220 },
      { id: 9, title: "Reading Practice", emoji: "📖", xp: 240 },
      { id: 10, title: "Final Test", emoji: "🏆", xp: 300 },
    ],
  },
};

// ── PATH CARDS ─────────────────────────────────────────────────────────────
// Used by PathSelection

export const PATHS = [
  {
    id: "phrases",
    emoji: PATH_DATA.phrases.emoji,
    title: PATH_DATA.phrases.title,
    description: "Learn greetings, travel phrases, food ordering, and everyday conversation",
    color: PATH_DATA.phrases.color,
    light: PATH_DATA.phrases.light,
    levels: PATH_DATA.phrases.levels.length,
    tag: "Most Popular",
  },
  {
    id: "alphabets",
    emoji: PATH_DATA.alphabets.emoji,
    title: PATH_DATA.alphabets.title,
    description: "Learn vowels, consonants, and how to read and write Kannada script",
    color: PATH_DATA.alphabets.color,
    light: PATH_DATA.alphabets.light,
    levels: PATH_DATA.alphabets.levels.length,
    tag: "Beginner Friendly",
  },
];

// ── COURSE BUNDLES ─────────────────────────────────────────────────────────

export const COURSES = {
  phrases: PHRASES_COURSE,
  alphabets: ALPHABETS_COURSE,
};

export const COURSE = COURSES.phrases;

// ── UTILITIES ──────────────────────────────────────────────────────────────

export const getQuestionsPerLevel = () => 5;

export const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};
