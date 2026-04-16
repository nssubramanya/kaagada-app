import React, { useState, useEffect } from "react";
// Kannada word with pronunciation helper
const K = (kn, pr) => ({ kn, pr }); // kn = Kannada script, pr = pronunciation
const COURSE = [
  // LEVEL 1 - Basic Words (5 exercises)
  {
    id: 1,
    type: "memory",
    question: K("ನೀ ರು", "Nee-ru"),
    english: "Water",
    options: [
      K("ನೀ ರು", "Nee-ru"),
      K("ಮನೆ", "Ma-ne"),
      K("ಅನ್ನ", "An-na"),
      K("ಊಟ", "Oo-ta"),
    ],
    answer: "ನೀ ರು",
  },
  {
    id: 2,
    type: "match",
    pairs: [
      { en: "House", kn: K("ಮನೆ", "Ma-ne") },
      { en: "Food", kn: K("ಊಟ", "Oo-ta") },
      { en: "Milk", kn: K("ಹಾಲು", "Haa-lu") },
    ],
    topic: "Basic Words",
  },
  {
    id: 3,
    type: "mcq",
    question: "Select 'Hello'",
    options: [
      K("ನಮಸ್ಕಾ ರ", "Na-mas-kaa-ra"),
      K("ಧನ್ಯವಾದ", "Dhan-ya-vaa-da"),
      K("ಹೌದು", "How-du"),
      K("ಇಲ್ಲ", "Il-la"),
    ],
    answer: "ನಮಸ್ಕಾ ರ",
  },
  {
    id: 4,
    type: "scramble",
    english: "I eat rice",
    answer: [
      K("ನಾನು", "Naa-nu"),
      K("ಅನ್ನ", "An-na"),
      K("ತಿನ್ನು ತ್ತೇನೆ", "Tin-nut-tee-ne"),
    ],
    jumbled: [
      K("ತಿನ್ನು ತ್ತೇನೆ", "Tin-nut-tee-ne"),
      K("ನೀ ರು", "Nee-ru"),
      K("ನಾನು", "Naa-nu"),
      K("ಅನ್ನ", "An-na"),
    ],
  },
  {
    id: 5,
    type: "mcq",
    question: "What is 'Dhanyavaada'?",
    options: [
      K("ಕ್ಷಮಿಸಿ", "Ksha-mi-si"),
      K("ದಯವಿಟ್ಟು", "Da-ya-vit-tu"),
      K("ಧನ್ಯವಾದ", "Dhan-ya-vaa-da"),
      K("ಸ್ವಾ ಗತ", "Svaa-ga-ta"),
    ],
    answer: "ಧನ್ಯವಾದ",
  },
  // LEVEL 2 - School Items (5 exercises)
  {
    id: 6,
    type: "memory",
    question: K("ಪುಸ್ತಕ", "Pus-ta-ka"),
    english: "Book",
    options: [
      K("ಪುಸ್ತಕ", "Pus-ta-ka"),
      K("ಲೇ ಖನಿ", "Lee-kha-ni"),
      K("ಚೀ ಲ", "Chee-la"),
      K("ನೀ ರು", "Nee-ru"),
    ],
    answer: "ಪುಸ್ತಕ",
  },
  {
    id: 7,
    type: "match",
    pairs: [
      { en: "Pen", kn: K("ಲೇ ಖನಿ", "Lee-kha-ni") },
      { en: "Bag", kn: K("ಚೀ ಲ", "Chee-la") },
      { en: "Book", kn: K("ಪುಸ್ತಕ", "Pus-ta-ka") },
    ],
    topic: "School Items",
  },
  {
    id: 8,
    type: "mcq",
    question: "What does 'ಒಳ್ಳೆಯದು' mean?",
    options: [
      K("ಕೆಟ್ಟದು", "Ket-ta-du"),
      K("ಒಳ್ಳೆಯದು", "Ol-le-ya-du"),
      K("ದೊ ಡ್ಡ", "Dod-da"),
      K("ಚಿಕ್ಕ", "Chik-ka"),
    ],
    answer: "ಒಳ್ಳೆಯದು",
  },
  {
    id: 9,
    type: "scramble",
    english: "I drink water",
    answer: [
      K("ನಾನು", "Naa-nu"),
      K("ನೀ ರು", "Nee-ru"),
      K("ಕುಡಿಯುತ್ತೇನೆ", "Ku-di-yut-tee-ne"),
    ],
    jumbled: [
      K("ಕುಡಿಯುತ್ತೇನೆ", "Ku-di-yut-tee-ne"),
      K("ಅನ್ನ", "An-na"),
      K("ನಾನು", "Naa-nu"),
      K("ನೀ ರು", "Nee-ru"),
    ],
  },
  {
    id: 10,
    type: "mcq",
    question: "Select 'Yes'",
    options: [
      K("ಹೌದು", "How-du"),
      K("ಇಲ್ಲ", "Il-la"),
      K("ಇದೆ", "I-de"),
      K("ಇಲ್ಲ", "Il-la"),
    ],
    answer: "ಹೌದು",
  },
  // LEVEL 3 - Greetings (5 exercises)
  {
    id: 11,
    type: "memory",
    question: K("ಶುಭ ಬೆಳಗು", "Shu-bha Be-la-gu"),
    english: "Good Morning",
    options: [
      K("ಶುಭ ಬೆಳಗು", "Shu-bha Be-la-gu"),
      K("ಶುಭ ರಾತ್ರಿ", "Shu-bha Raa-tri"),
      K("ನಮಸ್ಕಾ ರ", "Na-mas-kaa-ra"),
      K("ಧನ್ಯವಾದ", "Dhan-ya-vaa-da"),
    ],
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
    topic: "Greetings",
  },
  {
    id: 13,
    type: "mcq",
    question: "How do you say 'How are you?'",
    options: [
      K("ನಾನು ಚೆನ್ನಾಗಿದ್ದೇನೆ", "Naa-nu chen-naa-gid-dee-ne"),
      K("ನೀ ವು ಹೇ ಗಿದ್ದೀರಿ", "Nee-vu hee-gid-dee-ri"),
      K("ನಮಸ್ಕಾ ರ", "Na-mas-kaa-ra"),
      K("ಧನ್ಯವಾದ", "Dhan-ya-vaa-da"),
    ],
    answer: "ನೀ ವು ಹೇ ಗಿದ್ದೀರಿ",
  },
  {
    id: 14,
    type: "scramble",
    english: "Good morning",
    answer: [K("ಶುಭ", "Shu-bha"), K("ಬೆಳಗು", "Be-la-gu")],
    jumbled: [
      K("ಬೆಳಗು", "Be-la-gu"),
      K("ರಾತ್ರಿ", "Raa-tri"),
      K("ಶುಭ", "Shu-bha"),
      K("ವಿದಾಯ", "Vi-daa-ya"),
    ],
  },
  {
    id: 15,
    type: "mcq",
    question: "What is 'ಮತ್ತೆ ಸಿಗೋ ಣ'?",
    options: [
      K("ಹಲೋ ", "Ha-lo"),
      K("ಮತ್ತೆ ಸಿಗೋ ಣ", "Mat-te si-go-na"),
      K("ಧನ್ಯವಾದ", "Dhan-ya-vaa-da"),
      K("ಕ್ಷಮಿಸಿ", "Ksha-mi-si"),
    ],
    answer: "ಮತ್ತೆ ಸಿಗೋ ಣ",
  },
  // LEVEL 4 - Introduction (5 exercises)
  {
    id: 16,
    type: "memory",
    question: K("ನನ್ನ ಹೆಸರು", "Nan-na he-sa-ru"),
    english: "My name",
    options: [
      K("ನನ್ನ ಹೆಸರು", "Nan-na he-sa-ru"),
      K("ನಿಮ್ಮ ಹೆಸರು", "Nim-ma he-sa-ru"),
      K("ಅವನ ಹೆಸರು", "A-va-na he-sa-ru"),
      K("ನಮ್ಮ ಹೆಸರು", "Nam-ma he-sa-ru"),
    ],
    answer: "ನನ್ನ ಹೆಸರು",
  },
  {
    id: 17,
    type: "match",
    pairs: [
      { en: "My name", kn: K("ನನ್ನ ಹೆಸರು", "Nan-na he-sa-ru") },
      { en: "Your name", kn: K("ನಿಮ್ಮ ಹೆಸರು", "Nim-ma he-sa-ru") },
      { en: "His name", kn: K("ಅವನ ಹೆಸರು", "A-va-na he-sa-ru") },
    ],
    topic: "Introductions",
  },
  {
    id: 18,
    type: "mcq",
    question: "What does 'ನಾನು' mean?",
    options: [
      K("ನೀ ನು", "Nee-nu"),
      K("ನಾನು", "Naa-nu"),
      K("ಅವನು", "A-va-nu"),
      K("ಅವಳು", "A-va-lu"),
    ],
    answer: "ನಾನು",
  },
  {
    id: 19,
    type: "scramble",
    english: "My name is Ram",
    answer: [
      K("ನನ್ನ", "Nan-na"),
      K("ಹೆಸರು", "He-sa-ru"),
      K("ರಾಮ", "Raa-ma"),
      K("ಆಗಿದೆ", "Aa-gi-de"),
    ],
    jumbled: [
      K("ಆಗಿದೆ", "Aa-gi-de"),
      K("ಹೆಸರು", "He-sa-ru"),
      K("ರಾಮ", "Raa-ma"),
      K("ನನ್ನ", "Nan-na"),
    ],
  },
  {
    id: 20,
    type: "mcq",
    question: "Select 'I am fine'",
    options: [
      K("ನಾನು ಚೆನ್ನಾಗಿದ್ದೇನೆ", "Naa-nu chen-naa-gid-dee-ne"),
      K("ನೀ ವು ಚೆನ್ನಾಗಿದ್ದೀರಿ", "Nee-vu chen-naa-gid-dee-ri"),
      K("ಅವನು ಚೆನ್ನಾಗಿದ್ದಾನೆ", "A-va-nu chen-naa-gid-daa-ne"),
      K("ನಾವು ಚೆನ್ನಾಗಿದ್ದೇವೆ", "Naa-vu chen-naa-gid-dee-ve"),
    ],
    answer: "ನಾನು ಚೆನ್ನಾಗಿದ್ದೇನೆ",
  },
  // LEVEL 5 - Family (5 exercises)
  {
    id: 21,
    type: "memory",
    question: K("ಅಪ್ಪ", "Ap-pa"),
    english: "Father",
    options: [
      K("ಅಪ್ಪ", "Ap-pa"),
      K("ಅಮ್ಮ", "Am-ma"),
      K("ಅಣ್ಣ", "An-na"),
      K("ಅಕ್ಕ", "Ak-ka"),
    ],
    answer: "ಅಪ್ಪ",
  },
  {
    id: 22,
    type: "match",
    pairs: [
      { en: "Mother", kn: K("ಅಮ್ಮ", "Am-ma") },
      { en: "Brother", kn: K("ಅಣ್ಣ", "An-na") },
      { en: "Sister", kn: K("ಅಕ್ಕ", "Ak-ka") },
    ],
    topic: "Family",
  },
  {
    id: 23,
    type: "mcq",
    question: "What is 'ತಮ್ಮ'?",
    options: [
      K("ಅಪ್ಪ", "Ap-pa"),
      K("ಅಮ್ಮ", "Am-ma"),
      K("ತಮ್ಮ", "Tam-ma"),
      K("ತಂಗಿ", "Tan-gi"),
    ],
    answer: "ತಮ್ಮ",
  },
  {
    id: 24,
    type: "scramble",
    english: "This is my father",
    answer: [
      K("ಇವರು", "I-va-ru"),
      K("ನನ್ನ", "Nan-na"),
      K("ಅಪ್ಪ", "Ap-pa"),
      K("ಆಗಿದ್ದಾರೆ", "Aa-gid-daa-re"),
    ],
    jumbled: [
      K("ಅಪ್ಪ", "Ap-pa"),
      K("ಇವರು", "I-va-ru"),
      K("ಆಗಿದ್ದಾರೆ", "Aa-gid-daa-re"),
      K("ನನ್ನ", "Nan-na"),
    ],
  },
  {
    id: 25,
    type: "mcq",
    question: "How do you say 'Grandfather'?",
    options: [
      K("ಅಪ್ಪ", "Ap-pa"),
      K("ತಾತ", "Taa-ta"),
      K("ಚಿಕ್ಕಪ್ಪ", "Chik-kap-pa"),
      K("ದೊ ಡ್ಡಪ್ಪ", "Dod-dap-pa"),
    ],
    answer: "ತಾತ",
  },
  // LEVEL 6 - Numbers (6 exercises)
  {
    id: 26,
    type: "memory",
    question: K("ಒಂದು", "On-du"),
    english: "One",
    options: [
      K("ಒಂದು", "On-du"),
      K("ಎರಡು", "E-ra-du"),
      K("ಮೂರು", "Moo-ru"),
      K("ನಾಲ್ಕು ", "Naal-ku"),
    ],
    answer: "ಒಂದು",
  },
  {
    id: 27,
    type: "match",
    pairs: [
      { en: "One", kn: K("ಒಂದು", "On-du") },
      { en: "Two", kn: K("ಎರಡು", "E-ra-du") },
      { en: "Three", kn: K("ಮೂರು", "Moo-ru") },
      { en: "Four", kn: K("ನಾಲ್ಕು ", "Naal-ku") },
    ],
    topic: "Numbers",
  },
  {
    id: 28,
    type: "mcq",
    question: "What is 'ಐದು'?",
    options: [
      K("ಮೂರು", "Moo-ru"),
      K("ನಾಲ್ಕು ", "Naal-ku"),
      K("ಐದು", "Ai-du"),
      K("ಆರು", "Aa-ru"),
    ],
    answer: "ಐದು",
  },
  {
    id: 29,
    type: "scramble",
    english: "I have two books",
    answer: [
      K("ನನ್ನಲ್ಲಿ", "Nan-nal-li"),
      K("ಎರಡು", "E-ra-du"),
      K("ಪುಸ್ತಕ", "Pus-ta-ka"),
      K("ಇದೆ", "I-de"),
    ],
    jumbled: [
      K("ಪುಸ್ತಕ", "Pus-ta-ka"),
      K("ಇದೆ", "I-de"),
      K("ಎರಡು", "E-ra-du"),
      K("ನನ್ನಲ್ಲಿ", "Nan-nal-li"),
    ],
  },
  {
    id: 30,
    type: "mcq",
    question: "Select 'Ten'",
    options: [
      K("ಐದು", "Ai-du"),
      K("ಎಂಟು", "En-tu"),
      K("ಹತ್ತು", "Hat-tu"),
      K("ಇಪ್ಪತ್ತು", "Ip-pat-tu"),
    ],
    answer: "ಹತ್ತು",
  },
  {
    id: 31,
    type: "memory",
    question: K("ಏಳು", "Ee-lu"),
    english: "Seven",
    options: [
      K("ಐದು", "Ai-du"),
      K("ಆರು", "Aa-ru"),
      K("ಏಳು", "Ee-lu"),
      K("ಎಂಟು", "En-tu"),
    ],
    answer: "ಏಳು",
  },
  // LEVEL 7 - Colors (6 exercises)
  {
    id: 32,
    type: "memory",
    question: K("ಕೆಂಪು", "Kem-pu"),
    english: "Red",
    options: [
      K("ಕೆಂಪು", "Kem-pu"),
      K("ನೀ ಲಿ", "Nee-li"),
      K("ಹಸಿರು", "Ha-si-ru"),
      K("ಬಿಳಿ", "Bi-li"),
    ],
    answer: "ಕೆಂಪು",
  },
  {
    id: 33,
    type: "match",
    pairs: [
      { en: "Blue", kn: K("ನೀ ಲಿ", "Nee-li") },
      { en: "Green", kn: K("ಹಸಿರು", "Ha-si-ru") },
      { en: "White", kn: K("ಬಿಳಿ", "Bi-li") },
      { en: "Black", kn: K("ಕಪ್ಪು", "Kap-pu") },
    ],
    topic: "Colors",
  },
  {
    id: 34,
    type: "mcq",
    question: "What is 'ಕಪ್ಪು '?",
    options: [
      K("ಬಿಳಿ", "Bi-li"),
      K("ಕಪ್ಪು", "Kap-pu"),
      K("ಹಳದಿ", "Ha-la-di"),
      K("ಕೆಂಪು", "Kem-pu"),
    ],
    answer: "ಕಪ್ಪು",
  },
  {
    id: 35,
    type: "scramble",
    english: "The sky is blue",
    answer: [K("ಆಕಾಶ", "Aa-kaa-sha"), K("ನೀ ಲಿ", "Nee-li"), K("ಇದೆ", "I-de")],
    jumbled: [
      K("ಇದೆ", "I-de"),
      K("ಕೆಂಪು", "Kem-pu"),
      K("ನೀ ಲಿ", "Nee-li"),
      K("ಆಕಾಶ", "Aa-kaa-sha"),
    ],
  },
  {
    id: 36,
    type: "mcq",
    question: "Select 'Yellow'",
    options: [
      K("ಹಳದಿ", "Ha-la-di"),
      K("ಕೆಂಪು", "Kem-pu"),
      K("ಹಸಿರು", "Ha-si-ru"),
      K("ನೀ ಲಿ", "Nee-li"),
    ],
    answer: "ಹಳದಿ",
  },
  {
    id: 37,
    type: "memory",
    question: K("ಕಿತ್ತಳೆ ಬಣ್ಣ", "Kit-ta-le Ban-na"),
    english: "Orange",
    options: [
      K("ಕಿತ್ತಳೆ ಬಣ್ಣ", "Kit-ta-le Ban-na"),
      K("ಗುಲಾಬಿ", "Gu-laa-bi"),
      K("ನೇ ರಳೆ", "Nee-ra-le"),
      K("ಕಂದು", "Kan-du"),
    ],
    answer: "ಕಿತ್ತಳೆ ಬಣ್ಣ",
  },
  // LEVEL 8 - Food Items (6 exercises)
  {
    id: 38,
    type: "memory",
    question: K("ಚಹಾ", "Cha-haa"),
    english: "Tea",
    options: [
      K("ಚಹಾ", "Cha-haa"),
      K("ಕಾಫಿ", "Kaa-phi"),
      K("ನೀ ರು", "Nee-ru"),
      K("ಹಾಲು", "Haa-lu"),
    ],
    answer: "ಚಹಾ",
  },
  {
    id: 39,
    type: "match",
    pairs: [
      { en: "Rice", kn: K("ಅನ್ನ", "An-na") },
      { en: "Bread", kn: K("ರೊ ಟ್ಟಿ", "Rot-ti") },
      { en: "Meat", kn: K("ಮಾಂಸ", "Maan-sa") },
      { en: "Fish", kn: K("ಮೀ ನು", "Mee-nu") },
    ],
    topic: "Food",
  },
  {
    id: 40,
    type: "mcq",
    question: "What does 'ತರಕಾರಿ' mean?",
    options: [
      K("ಹಣ್ಣು", "Han-nu"),
      K("ತರಕಾರಿ", "Ta-ra-kaa-ri"),
      K("ಮಾಂಸ", "Maan-sa"),
      K("ಅನ್ನ", "An-na"),
    ],
    answer: "ತರಕಾರಿ",
  },
  {
    id: 41,
    type: "scramble",
    english: "I like tea",
    answer: [
      K("ನನಗೆ", "Na-na-ge"),
      K("ಚಹಾ", "Cha-haa"),
      K("ಇಷ್ಟ", "Ish-ta"),
      K("ಆಗುತ್ತೆ", "Aa-gut-te"),
    ],
    jumbled: [
      K("ಆಗುತ್ತೆ", "Aa-gut-te"),
      K("ಇಷ್ಟ", "Ish-ta"),
      K("ಚಹಾ", "Cha-haa"),
      K("ನನಗೆ", "Na-na-ge"),
    ],
  },
  {
    id: 42,
    type: "mcq",
    question: "Select 'Apple'",
    options: [
      K("ಸೇ ಬು", "See-bu"),
      K("ಬಾಳೆ", "Baa-le"),
      K("ದ್ರಾಕ್ಷಿ", "Draak-shi"),
      K("ಮಾವು", "Maa-vu"),
    ],
    answer: "ಸೇ ಬು",
  },
  {
    id: 43,
    type: "memory",
    question: K("ಬೇ ಳೆ", "Bee-le"),
    english: "Lentils",
    options: [
      K("ಬೇ ಳೆ", "Bee-le"),
      K("ಅಕ್ಕಿ ", "Ak-ki"),
      K("ಆಲೂ", "Aa-loo"),
      K("ಈರುಳ್ಳಿ", "Ee-rul-li"),
    ],
    answer: "ಬೇ ಳೆ",
  },
  // LEVEL 9 - Daily Activities (6 exercises)
  {
    id: 44,
    type: "memory",
    question: K("ಮಲಗು", "Ma-la-gu"),
    english: "To sleep",
    options: [
      K("ಮಲಗು", "Ma-la-gu"),
      K("ತಿನ್ನು", "Tin-nu"),
      K("ಓದು", "O-du"),
      K("ಬರೆ", "Ba-re"),
    ],
    answer: "ಮಲಗು",
  },
  {
    id: 45,
    type: "match",
    pairs: [
      { en: "To eat", kn: K("ತಿನ್ನು", "Tin-nu") },
      { en: "To read", kn: K("ಓದು", "O-du") },
      { en: "To write", kn: K("ಬರೆ", "Ba-re") },
      { en: "To walk", kn: K("ನಡೆ", "Na-de") },
    ],
    topic: "Activities",
  },
  {
    id: 46,
    type: "mcq",
    question: "What is 'ಹೋ ಗು'?",
    options: [
      K("ಬಾ", "Baa"),
      K("ಹೋ ಗು", "Ho-gu"),
      K("ಕೂರು", "Koo-ru"),
      K("ನಿಲ್ಲು", "Nil-lu"),
    ],
    answer: "ಹೋ ಗು",
  },
  {
    id: 47,
    type: "scramble",
    english: "I go to school",
    answer: [
      K("ನಾನು", "Naa-nu"),
      K("ಶಾಲೆಗೆ", "Shaa-le-ge"),
      K("ಹೋ ಗುತ್ತೇನೆ", "Ho-gut-tee-ne"),
    ],
    jumbled: [
      K("ಹೋ ಗುತ್ತೇನೆ", "Ho-gut-tee-ne"),
      K("ಮನೆಗೆ", "Ma-ne-ge"),
      K("ಶಾಲೆಗೆ", "Shaa-le-ge"),
      K("ನಾನು", "Naa-nu"),
    ],
  },
  {
    id: 48,
    type: "mcq",
    question: "Select 'To play'",
    options: [
      K("ಆಡು", "Aa-du"),
      K("ಹಾಡು", "Haa-du"),
      K("ಕುಣಿ", "Ku-ni"),
      K("ನಗು", "Na-gu"),
    ],
    answer: "ಆಡು",
  },
  {
    id: 49,
    type: "memory",
    question: K("ಮಾತಾಡು", "Maa-taa-du"),
    english: "To speak",
    options: [
      K("ಮಾತಾಡು", "Maa-taa-du"),
      K("ಕೇ ಳು", "Kee-lu"),
      K("ನೋ ಡು", "No-du"),
      K("ಮುಟ್ಟು", "Mut-tu"),
    ],
    answer: "ಮಾತಾಡು",
  },
  // LEVEL 10 - Time & Days (6 exercises)
  {
    id: 50,
    type: "memory",
    question: K("ಇಂದು", "In-du"),
    english: "Today",
    options: [
      K("ಇಂದು", "In-du"),
      K("ನಿನ್ನೆ", "Nin-ne"),
      K("ನಾಳೆ", "Naa-le"),
      K("ನಾಡಿದ್ದು", "Naa-did-du"),
    ],
    answer: "ಇಂದು",
  },
  {
    id: 51,
    type: "match",
    pairs: [
      { en: "Yesterday", kn: K("ನಿನ್ನೆ", "Nin-ne") },
      { en: "Tomorrow", kn: K("ನಾಳೆ", "Naa-le") },
      { en: "Day after tomorrow", kn: K("ನಾಡಿದ್ದು", "Naa-did-du") },
      { en: "Week", kn: K("ವಾರ", "Vaa-ra") },
    ],
    topic: "Time",
  },
  {
    id: 52,
    type: "mcq",
    question: "What is 'ಬೆಳಿಗ್ಗೆ'?",
    options: [
      K("ಸಂಜೆ", "San-je"),
      K("ಬೆಳಿಗ್ಗೆ", "Be-lig-ge"),
      K("ರಾತ್ರಿ", "Raa-tri"),
      K("ಮಧ್ಯಾ ಹ್ನ", "Mad-yaan-na"),
    ],
    answer: "ಬೆಳಿಗ್ಗೆ",
  },
  {
    id: 53,
    type: "scramble",
    english: "I will go tomorrow",
    answer: [
      K("ನಾನು", "Naa-nu"),
      K("ನಾಳೆ", "Naa-le"),
      K("ಹೋ ಗುತ್ತೇನೆ", "Ho-gut-tee-ne"),
    ],
    jumbled: [
      K("ಹೋ ಗುತ್ತೇನೆ", "Ho-gut-tee-ne"),
      K("ಇಂದು", "In-du"),
      K("ನಾಳೆ", "Naa-le"),
      K("ನಾನು", "Naa-nu"),
    ],
  },
  {
    id: 54,
    type: "mcq",
    question: "Select 'Week'",
    options: [
      K("ದಿನ", "Di-na"),
      K("ತಿಂಗಳು", "Tin-ga-lu"),
      K("ವಾರ", "Vaa-ra"),
      K("ವರ್ಷ ", "Var-sha"),
    ],
    answer: "ವಾರ",
  },
  {
    id: 55,
    type: "memory",
    question: K("ಸಂಜೆ", "San-je"),
    english: "Evening",
    options: [
      K("ಬೆಳಿಗ್ಗೆ", "Be-lig-ge"),
      K("ಮಧ್ಯಾ ಹ್ನ", "Mad-yaan-na"),
      K("ಸಂಜೆ", "San-je"),
      K("ರಾತ್ರಿ", "Raa-tri"),
    ],
    answer: "ಸಂಜೆ",
  },
  // LEVEL 11 - Body Parts (8 exercises)
  {
    id: 56,
    type: "memory",
    question: K("ಕೈ ", "Kai"),
    english: "Hand",
    options: [
      K("ಕೈ ", "Kai"),
      K("ಕಾಲು", "Kaa-lu"),
      K("ತಲೆ", "Ta-le"),
      K("ಕಣ್ಣು", "Kan-nu"),
    ],
    answer: "ಕೈ ",
  },
  {
    id: 57,
    type: "match",
    pairs: [
      { en: "Eye", kn: K("ಕಣ್ಣು", "Kan-nu") },
      { en: "Ear", kn: K("ಕಿವಿ", "Ki-vi") },
      { en: "Nose", kn: K("ಮೂಗು", "Moo-gu") },
      { en: "Mouth", kn: K("ಬಾಯಿ", "Baa-yi") },
    ],
    topic: "Body",
  },
  {
    id: 58,
    type: "mcq",
    question: "What is 'ಕೂದಲು'?",
    options: [
      K("ಕೂದಲು", "Koo-da-lu"),
      K("ಮುಖ", "Mu-kha"),
      K("ಕುತ್ತಿಗೆ", "Kut-ti-ge"),
      K("ಭುಜ", "Bhu-ja"),
    ],
    answer: "ಕೂದಲು",
  },
  {
    id: 59,
    type: "scramble",
    english: "My hand hurts",
    answer: [
      K("ನನ್ನ", "Nan-na"),
      K("ಕೈ ", "Kai"),
      K("ನೋ ಯುತ್ತಿದೆ", "No-yut-ti-de"),
    ],
    jumbled: [
      K("ನೋ ಯುತ್ತಿದೆ", "No-yut-ti-de"),
      K("ಕಾಲು", "Kaa-lu"),
      K("ಕೈ ", "Kai"),
      K("ನನ್ನ", "Nan-na"),
    ],
  },
  {
    id: 60,
    type: "mcq",
    question: "Select 'Leg'",
    options: [
      K("ಕೈ ", "Kai"),
      K("ಕಾಲು", "Kaa-lu"),
      K("ಬೆರಳು", "Be-ra-lu"),
      K("ಮೊಣಕಾಲು", "Mo-na-kaa-lu"),
    ],
    answer: "ಕಾಲು",
  },
  {
    id: 61,
    type: "memory",
    question: K("ಹೃದಯ", "Hru-da-ya"),
    english: "Heart",
    options: [
      K("ಹೃದಯ", "Hru-da-ya"),
      K("ಯಕೃತ್", "Ya-krut"),
      K("ಮೂತ್ರಪಿಂಡ", "Moo-tra-pin-da"),
      K("ಶ್ವಾಸಕೋ ಶ", "Shvaa-sa-ko-sha"),
    ],
    answer: "ಹೃದಯ",
  },
  {
    id: 62,
    type: "match",
    pairs: [
      { en: "Finger", kn: K("ಬೆರಳು", "Be-ra-lu") },
      { en: "Teeth", kn: K("ಹಲ್ಲು", "Hal-lu") },
      { en: "Tongue", kn: K("ನಾಲಿಗೆ", "Naa-li-ge") },
      { en: "Lip", kn: K("ತುಟಿ", "Tu-ti") },
    ],
    topic: "Body Parts",
  },
  {
    id: 63,
    type: "mcq",
    question: "What does 'ಹೊ ಟ್ಟೆ ' mean?",
    options: [
      K("ಎದೆ", "E-de"),
      K("ಬೆನ್ನು", "Ben-nu"),
      K("ಹೊ ಟ್ಟೆ", "Hot-te"),
      K("ಸೊ ಂಟ", "Son-ta"),
    ],
    answer: "ಹೊ ಟ್ಟೆ",
  },
  // LEVEL 12 - Animals (8 exercises)
  {
    id: 64,
    type: "memory",
    question: K("ನಾಯಿ", "Naa-yi"),
    english: "Dog",
    options: [
      K("ನಾಯಿ", "Naa-yi"),
      K("ಬೆಕ್ಕು ", "Bek-ku"),
      K("ಹಸು", "Ha-su"),
      K("ಕುರಿ", "Ku-ri"),
    ],
    answer: "ನಾಯಿ",
  },
  {
    id: 65,
    type: "match",
    pairs: [
      { en: "Cat", kn: K("ಬೆಕ್ಕು ", "Bek-ku") },
      { en: "Cow", kn: K("ಹಸು", "Ha-su") },
      { en: "Bird", kn: K("ಹಕ್ಕಿ ", "Hak-ki") },
      { en: "Fish", kn: K("ಮೀ ನು", "Mee-nu") },
    ],
    topic: "Animals",
  },
  {
    id: 66,
    type: "mcq",
    question: "What is 'ಆನೆ'?",
    options: [
      K("ಕುದುರೆ", "Ku-du-re"),
      K("ಆನೆ", "Aa-ne"),
      K("ಹುಲಿ", "Hu-li"),
      K("ಸಿಂಹ", "Sin-ha"),
    ],
    answer: "ಆನೆ",
  },
  {
    id: 67,
    type: "scramble",
    english: "I have a dog",
    answer: [
      K("ನನ್ನಲ್ಲಿ", "Nan-nal-li"),
      K("ಒಂದು", "On-du"),
      K("ನಾಯಿ", "Naa-yi"),
      K("ಇದೆ", "I-de"),
    ],
    jumbled: [
      K("ಇದೆ", "I-de"),
      K("ಬೆಕ್ಕು ", "Bek-ku"),
      K("ನಾಯಿ", "Naa-yi"),
      K("ನನ್ನಲ್ಲಿ", "Nan-nal-li"),
      K("ಒಂದು", "On-du"),
    ],
  },
  {
    id: 68,
    type: "mcq",
    question: "Select 'Chicken'",
    options: [
      K("ಕೋ ಳಿ", "Ko-li"),
      K("ಆಡು", "Aa-du"),
      K("ಹಂದಿ", "Han-di"),
      K("ಕುರಿ", "Ku-ri"),
    ],
    answer: "ಕೋ ಳಿ",
  },
  {
    id: 69,
    type: "memory",
    question: K("ಹುಲಿ", "Hu-li"),
    english: "Tiger",
    options: [
      K("ಹುಲಿ", "Hu-li"),
      K("ಸಿಂಹ", "Sin-ha"),
      K("ಕರಡಿ", "Ka-ra-di"),
      K("ಘೇ ಂಡಾ", "Gheen-daa"),
    ],
    answer: "ಹುಲಿ",
  },
  {
    id: 70,
    type: "match",
    pairs: [
      { en: "Snake", kn: K("ಹಾವು", "Haa-vu") },
      { en: "Monkey", kn: K("ಕೋ ತಿ", "Ko-ti") },
      { en: "Rabbit", kn: K("ಮೊಲ", "Mo-la") },
      { en: "Deer", kn: K("ಜಿಂಕೆ", "Jin-ke") },
    ],
    topic: "Wild Animals",
  },
  {
    id: 71,
    type: "mcq",
    question: "What does 'ಕರಡಿ' mean?",
    options: [
      K("ತೋ ಳ", "To-la"),
      K("ನರಿ", "Na-ri"),
      K("ಕರಡಿ", "Ka-ra-di"),
      K("ಚಿರತೆ", "Chi-ra-te"),
    ],
    answer: "ಕರಡಿ",
  },
  // LEVEL 13 - House & Home (8 exercises)
  {
    id: 72,
    type: "memory",
    question: K("ಮನೆ", "Ma-ne"),
    english: "House",
    options: [
      K("ಮನೆ", "Ma-ne"),
      K("ಕೋ ಣೆ", "Ko-ne"),
      K("ಕಿಟಕಿ", "Ki-ta-ki"),
      K("ಬಾಗಿಲು", "Baa-gi-lu"),
    ],
    answer: "ಮನೆ",
  },
  {
    id: 73,
    type: "match",
    pairs: [
      { en: "Room", kn: K("ಕೋ ಣೆ", "Ko-ne") },
      { en: "Window", kn: K("ಕಿಟಕಿ", "Ki-ta-ki") },
      { en: "Door", kn: K("ಬಾಗಿಲು", "Baa-gi-lu") },
      { en: "Roof", kn: K("ಛಾವಣಿ", "Chaa-va-ni") },
    ],
    topic: "House",
  },
  {
    id: 74,
    type: "mcq",
    question: "What is 'ನೆಲ'?",
    options: [
      K("ಗೋ ಡೆ", "Go-de"),
      K("ನೆಲ", "Ne-la"),
      K("ಛಾವಣಿ", "Chaa-va-ni"),
      K("ಮೆಟ್ಟಿಲು", "Met-ti-lu"),
    ],
    answer: "ನೆಲ",
  },
  {
    id: 75,
    type: "scramble",
    english: "My house is big",
    answer: [
      K("ನನ್ನ", "Nan-na"),
      K("ಮನೆ", "Ma-ne"),
      K("ದೊ ಡ್ಡದು", "Dod-da-du"),
      K("ಆಗಿದೆ", "Aa-gi-de"),
    ],
    jumbled: [
      K("ಆಗಿದೆ", "Aa-gi-de"),
      K("ಚಿಕ್ಕದು", "Chik-ka-du"),
      K("ದೊ ಡ್ಡದು", "Dod-da-du"),
      K("ಮನೆ", "Ma-ne"),
      K("ನನ್ನ", "Nan-na"),
    ],
  },
  {
    id: 76,
    type: "mcq",
    question: "Select 'Kitchen'",
    options: [
      K("ಅಡುಗೆಮನೆ", "A-du-ge-ma-ne"),
      K("ಮಲಗುಕೋ ಣೆ", "Ma-la-gu-ko-ne"),
      K("ಸ್ನಾನಗೃಹ", "Snaa-na-gru-ha"),
      K("ಊಟದ ಕೋ ಣೆ", "Oo-ta-da ko-ne"),
    ],
    answer: "ಅಡುಗೆಮನೆ",
  },
  {
    id: 77,
    type: "memory",
    question: K("ಮೆಟ್ಟಿಲು", "Met-ti-lu"),
    english: "Stairs",
    options: [
      K("ಮೆಟ್ಟಿಲು", "Met-ti-lu"),
      K("ಗೋ ಡೆ", "Go-de"),
      K("ಛಾವಣಿ", "Chaa-va-ni"),
      K("ನೆಲ", "Ne-la"),
    ],
    answer: "ಮೆಟ್ಟಿಲು",
  },
  {
    id: 78,
    type: "match",
    pairs: [
      { en: "Chair", kn: K("ಕುರ್ಚಿ ", "Kur-chi") },
      { en: "Table", kn: K("ಮೇ ಜು", "Mee-ju") },
      { en: "Bed", kn: K("ಮಂಚ", "Man-cha") },
      { en: "Fan", kn: K("ಪಂಕ", "Pan-ka") },
    ],
    topic: "Furniture",
  },
  {
    id: 79,
    type: "mcq",
    question: "What does 'ಕನ್ನಡಿ' mean?",
    options: [
      K("ಟಿವಿ", "Ti-vi"),
      K("ಕನ್ನಡಿ", "Kan-na-di"),
      K("ಗಡಿಯಾರ", "Ga-di-yaa-ra"),
      K("ಲ್ಯಾ ಂಪ್", "Lyaaamp"),
    ],
    answer: "ಕನ್ನಡಿ",
  },
  // LEVEL 14 - Weather (8 exercises)
  {
    id: 80,
    type: "memory",
    question: K("ಮಳೆ", "Ma-le"),
    english: "Rain",
    options: [
      K("ಮಳೆ", "Ma-le"),
      K("ಬಿಸಿಲು", "Bi-si-lu"),
      K("ಗಾಳಿ", "Gaa-li"),
      K("ಹಿಮ", "Hi-ma"),
    ],
    answer: "ಮಳೆ",
  },
  {
    id: 81,
    type: "match",
    pairs: [
      { en: "Sun", kn: K("ಸೂರ್ಯ ", "Soor-ya") },
      { en: "Cloud", kn: K("ಮೋ ಡ", "Mo-da") },
      { en: "Wind", kn: K("ಗಾಳಿ", "Gaa-li") },
      { en: "Snow", kn: K("ಹಿಮ", "Hi-ma") },
    ],
    topic: "Weather",
  },
  {
    id: 82,
    type: "mcq",
    question: "What is 'ಚಳಿ'?",
    options: [
      K("ಬಿಸಿ", "Bi-si"),
      K("ಚಳಿ", "Cha-li"),
      K("ಮಳೆ", "Ma-le"),
      K("ಗಾಳಿ", "Gaa-li"),
    ],
    answer: "ಚಳಿ",
  },
  {
    id: 83,
    type: "scramble",
    english: "It is raining today",
    answer: [
      K("ಇಂದು", "In-du"),
      K("ಮಳೆ", "Ma-le"),
      K("ಬರುತ್ತಿದೆ", "Ba-rut-ti-de"),
    ],
    jumbled: [
      K("ಬರುತ್ತಿದೆ", "Ba-rut-ti-de"),
      K("ಬಿಸಿಲು", "Bi-si-lu"),
      K("ಮಳೆ", "Ma-le"),
      K("ಇಂದು", "In-du"),
    ],
  },
  {
    id: 84,
    type: "mcq",
    question: "Select 'Hot'",
    options: [
      K("ಬಿಸಿ", "Bi-si"),
      K("ತಣ್ಣಗೆ", "Tan-na-ge"),
      K("ಒದ್ದೆ", "Od-de"),
      K("ಒಣ", "O-na"),
    ],
    answer: "ಬಿಸಿ",
  },
  {
    id: 85,
    type: "memory",
    question: K("ಮಿಂಚು", "Min-chu"),
    english: "Lightning",
    options: [
      K("ಮಿಂಚು", "Min-chu"),
      K("ಗುಡುಗು", "Gu-du-gu"),
      K("ಮಳೆ", "Ma-le"),
      K("ಮೋ ಡ", "Mo-da"),
    ],
    answer: "ಮಿಂಚು",
  },
  {
    id: 86,
    type: "match",
    pairs: [
      { en: "Cold", kn: K("ಚಳಿ", "Cha-li") },
      { en: "Humid", kn: K("ತೇ ವ", "Tee-va") },
      { en: "Dry", kn: K("ಒಣ", "O-na") },
      { en: "Storm", kn: K("ಬಿರುಗಾಳಿ", "Bi-ru-gaa-li") },
    ],
    topic: "Weather",
  },
  {
    id: 87,
    type: "mcq",
    question: "What does 'ಸೂರ್ಯಾ ಸ್ತ' mean?",
    options: [
      K("ಸೂರ್ಯೋ ದಯ", "Soor-yo-da-ya"),
      K("ಸೂರ್ಯಾ ಸ್ತ", "Soor-yaas-ta"),
      K("ಮಧ್ಯಾ ಹ್ನ", "Mad-yaan-na"),
      K("ರಾತ್ರಿ", "Raa-tri"),
    ],
    answer: "ಸೂರ್ಯಾ ಸ್ತ",
  },
  // LEVEL 15 - Transport (8 exercises)
  {
    id: 88,
    type: "memory",
    question: K("ಬಸ್", "Bus"),
    english: "Bus",
    options: [
      K("ಬಸ್", "Bus"),
      K("ರೈ ಲು", "Rai-lu"),
      K("ವಿಮಾನ", "Vi-maa-na"),
      K("ಕಾರು", "Kaa-ru"),
    ],
    answer: "ಬಸ್",
  },
  {
    id: 89,
    type: "match",
    pairs: [
      { en: "Train", kn: K("ರೈ ಲು", "Rai-lu") },
      { en: "Airplane", kn: K("ವಿಮಾನ", "Vi-maa-na") },
      { en: "Bicycle", kn: K("ಸೈ ಕಲ್", "Sai-kal") },
      { en: "Car", kn: K("ಕಾರು", "Kaa-ru") },
    ],
    topic: "Transport",
  },
  {
    id: 90,
    type: "mcq",
    question: "What is 'ಹಡಗು'?",
    options: [
      K("ದೋ ಣಿ", "Do-ni"),
      K("ಹಡಗು", "Ha-da-gu"),
      K("ಕಾರು", "Kaa-ru"),
      K("ಸ್ಕೂ ಟರ್", "Skoo-tar"),
    ],
    answer: "ಹಡಗು",
  },
  {
    id: 91,
    type: "scramble",
    english: "I go by bus",
    answer: [
      K("ನಾನು", "Naa-nu"),
      K("ಬಸ್ಸಿನಲ್ಲಿ", "Bus-si-nal-li"),
      K("ಹೋ ಗುತ್ತೇನೆ", "Ho-gut-tee-ne"),
    ],
    jumbled: [
      K("ಹೋ ಗುತ್ತೇನೆ", "Ho-gut-tee-ne"),
      K("ರೈ ಲಿನಲ್ಲಿ", "Rai-li-nal-li"),
      K("ಬಸ್ಸಿನಲ್ಲಿ", "Bus-si-nal-li"),
      K("ನಾನು", "Naa-nu"),
    ],
  },
  {
    id: 92,
    type: "mcq",
    question: "Select 'Road'",
    options: [
      K("ರಸ್ತೆ", "Ras-te"),
      K("ಸೇ ತುವೆ", "See-tu-ve"),
      K("ನಿಲ್ದಾಣ", "Nil-daa-na"),
      K("ವಿಮಾನ ನಿಲ್ದಾಣ", "Vi-maa-na nil-daa-na"),
    ],
    answer: "ರಸ್ತೆ",
  },
  {
    id: 93,
    type: "memory",
    question: K("ಆಟೋ ", "Aa-to"),
    english: "Auto rickshaw",
    options: [
      K("ಆಟೋ ", "Aa-to"),
      K("ಟ್ಯಾ ಕ್ಸಿ ", "Tyaak-si"),
      K("ಬಸ್", "Bus"),
      K("ಕಾರು", "Kaa-ru"),
    ],
    answer: "ಆಟೋ ",
  },
  {
    id: 94,
    type: "match",
    pairs: [
      { en: "Bridge", kn: K("ಸೇ ತುವೆ", "See-tu-ve") },
      { en: "Station", kn: K("ನಿಲ್ದಾಣ", "Nil-daa-na") },
      { en: "Traffic", kn: K("ಸಂಚಾರ", "San-chaa-ra") },
      { en: "Fuel", kn: K("ಇಂಧನ", "In-dha-na") },
    ],
    topic: "Transport",
  },
  {
    id: 95,
    type: "mcq",
    question: "What does 'ಚಾಲಕ' mean?",
    options: [
      K("ಪ್ರಯಾಣಿಕ", "Pra-yaa-ni-ka"),
      K("ಚಾಲಕ", "Chaa-la-ka"),
      K("ಟಿಕೆಟ್", "Ti-ket"),
      K("ನಿಲ್ದಾಣ", "Nil-daa-na"),
    ],
    answer: "ಚಾಲಕ",
  },
  // LEVEL 16 - Professions (8 exercises)
  {
    id: 96,
    type: "memory",
    question: K("ವೈ ದ್ಯ", "Vai-dya"),
    english: "Doctor",
    options: [
      K("ವೈ ದ್ಯ", "Vai-dya"),
      K("ಶಿಕ್ಷಕ", "Shik-sha-ka"),
      K("ಇಂಜಿನಿಯರ್", "In-ji-ni-yar"),
      K("ನ್ಯಾ ಯವಾದಿ", "Nyaa-ya-vaa-di"),
    ],
    answer: "ವೈ ದ್ಯ",
  },
  {
    id: 97,
    type: "match",
    pairs: [
      { en: "Teacher", kn: K("ಶಿಕ್ಷಕ", "Shik-sha-ka") },
      { en: "Farmer", kn: K("ರೈ ತ", "Rai-ta") },
      { en: "Soldier", kn: K("ಸೈ ನಿಕ", "Sai-ni-ka") },
      { en: "Policeman", kn: K("ಪೊಲೀ ಸ್", "Po-lees") },
    ],
    topic: "Jobs",
  },
  {
    id: 98,
    type: "mcq",
    question: "What is 'ಅಡುಗೆಯವರು'?",
    options: [
      K("ಬೇ ಕರ್", "Bee-kar"),
      K("ಅಡುಗೆಯವರು", "A-du-ge-ya-va-ru"),
      K("ಗಾರೆ ಕೆಲಸಗಾರ", "Gaa-re ke-la-sa-gaa-ra"),
      K("ಮಾರಾಟಗಾರ", "Maa-raa-ta-gaa-ra"),
    ],
    answer: "ಅಡುಗೆಯವರು",
  },
  {
    id: 99,
    type: "scramble",
    english: "She is a doctor",
    answer: [
      K("ಅವಳು", "A-va-lu"),
      K("ಒಬ್ಬ", "Ob-ba"),
      K("ವೈ ದ್ಯರು", "Vai-dya-ru"),
      K("ಆಗಿದ್ದಾರೆ", "Aa-gid-daa-re"),
    ],
    jumbled: [
      K("ಆಗಿದ್ದಾರೆ", "Aa-gid-daa-re"),
      K("ಶಿಕ್ಷಕ", "Shik-sha-ka"),
      K("ಅವಳು", "A-va-lu"),
      K("ವೈ ದ್ಯರು", "Vai-dya-ru"),
      K("ಒಬ್ಬ", "Ob-ba"),
    ],
  },
  {
    id: 100,
    type: "mcq",
    question: "Select 'Artist'",
    options: [
      K("ಕಲಾವಿದ", "Ka-laa-vi-da"),
      K("ವಿಜ್ಞಾ ನಿ", "Vig-nyaa-ni"),
      K("ಬರಹಗಾರ", "Ba-ra-ha-gaa-ra"),
      K("ನಟ", "Na-ta"),
    ],
    answer: "ಕಲಾವಿದ",
  },
  {
    id: 101,
    type: "memory",
    question: K("ವ್ಯಾ ಪಾರಿ", "Vyaa-paa-ri"),
    english: "Merchant",
    options: [
      K("ವ್ಯಾ ಪಾರಿ", "Vyaa-paa-ri"),
      K("ಕೂಲಿ", "Koo-li"),
      K("ಮ್ಯಾ ನೇ ಜರ್", "Myaa-ne-jar"),
      K("ಸಿಬ್ಬಂದಿ", "Sib-ban-di"),
    ],
    answer: "ವ್ಯಾ ಪಾರಿ",
  },
  {
    id: 102,
    type: "match",
    pairs: [
      { en: "Singer", kn: K("ಗಾಯಕ", "Gaa-ya-ka") },
      { en: "Dancer", kn: K("ನರ್ತ ಕ", "Nar-ta-ka") },
      { en: "Pilot", kn: K("ವೈ ಮಾನಿಕ", "Vai-maa-ni-ka") },
      { en: "Nurse", kn: K("ದಾದಿ", "Daa-di") },
    ],
    topic: "Professions",
  },
  {
    id: 103,
    type: "mcq",
    question: "What does 'ವಕೀ ಲ' mean?",
    options: [
      K("ವೈ ದ್ಯ", "Vai-dya"),
      K("ನ್ಯಾ ಯಾಧೀ ಶ", "Nyaa-yaa-dhee-sha"),
      K("ವಕೀ ಲ", "Va-keel"),
      K("ಪೊಲೀ ಸ್", "Po-lees"),
    ],
    answer: "ವಕೀ ಲ",
  },
  // LEVEL 17 - Nature (8 exercises)
  {
    id: 104,
    type: "memory",
    question: K("ಮರ", "Ma-ra"),
    english: "Tree",
    options: [
      K("ಮರ", "Ma-ra"),
      K("ಹೂವು", "Hoo-vu"),
      K("ಗಿಡ", "Gi-da"),
      K("ಬೇ ರು", "Bee-ru"),
    ],
    answer: "ಮರ",
  },
  {
    id: 105,
    type: "match",
    pairs: [
      { en: "Flower", kn: K("ಹೂವು", "Hoo-vu") },
      { en: "Leaf", kn: K("ಎಲೆ", "E-le") },
      { en: "River", kn: K("ನದಿ", "Na-di") },
      { en: "Mountain", kn: K("ಪರ್ವ ತ", "Par-va-ta") },
    ],
    topic: "Nature",
  },
  {
    id: 106,
    type: "mcq",
    question: "What is 'ಕಾಡು'?",
    options: [
      K("ಮರಳುಗಾಡು", "Ma-ra-lu-gaa-du"),
      K("ಕಾಡು", "Kaa-du"),
      K("ಬೆಟ್ಟ", "Bet-ta"),
      K("ಬಯಲು", "Ba-ya-lu"),
    ],
    answer: "ಕಾಡು",
  },
  {
    id: 107,
    type: "scramble",
    english: "The flower is beautiful",
    answer: [
      K("ಹೂವು", "Hoo-vu"),
      K("ತುಂಬ", "Tum-ba"),
      K("ಸುಂದರವಾಗಿದೆ", "Sun-da-ra-vaa-gi-de"),
    ],
    jumbled: [
      K("ಸುಂದರವಾಗಿದೆ", "Sun-da-ra-vaa-gi-de"),
      K("ಕೆಟ್ಟದಾಗಿದೆ", "Ket-ta-daa-gi-de"),
      K("ಹೂವು", "Hoo-vu"),
      K("ತುಂಬ", "Tum-ba"),
    ],
  },
  {
    id: 108,
    type: "mcq",
    question: "Select 'Ocean'",
    options: [
      K("ಸಮುದ್ರ", "Sa-mud-ra"),
      K("ನದಿ", "Na-di"),
      K("ಸರೋ ವರ", "Sa-ro-va-ra"),
      K("ತೊ ರೆ", "To-re"),
    ],
    answer: "ಸಮುದ್ರ",
  },
  {
    id: 109,
    type: "memory",
    question: K("ಬೇ ರು", "Bee-ru"),
    english: "Root",
    options: [
      K("ಬೇ ರು", "Bee-ru"),
      K("ಟೊ ಂಗೆ", "Ton-ge"),
      K("ತೊ ಗಟೆ", "To-ga-te"),
      K("ಎಲೆ", "E-le"),
    ],
    answer: "ಬೇ ರು",
  },
  {
    id: 110,
    type: "match",
    pairs: [
      { en: "Sand", kn: K("ಮರಳು", "Ma-ra-lu") },
      { en: "Rock", kn: K("ಕಲ್ಲು", "Kal-lu") },
      { en: "Mud", kn: K("ಮಣ್ಣು", "Man-nu") },
      { en: "Sky", kn: K("ಆಕಾಶ", "Aa-kaa-sha") },
    ],
    topic: "Nature",
  },
  {
    id: 111,
    type: "mcq",
    question: "What does 'ಗಾಳಿ' mean?",
    options: [
      K("ನೀ ರು", "Nee-ru"),
      K("ಬೆಂಕಿ", "Ben-ki"),
      K("ಗಾಳಿ", "Gaa-li"),
      K("ಮಣ್ಣು", "Man-nu"),
    ],
    answer: "ಗಾಳಿ",
  },
  // LEVEL 18 - Emotions (8 exercises)
  {
    id: 112,
    type: "memory",
    question: K("ಸಂತೋ ಷ", "San-to-sha"),
    english: "Happy",
    options: [
      K("ಸಂತೋ ಷ", "San-to-sha"),
      K("ದುಃಖ", "Du-kha"),
      K("ಕೋ ಪ", "Ko-pa"),
      K("ಭಯ", "Bha-ya"),
    ],
    answer: "ಸಂತೋ ಷ",
  },
  {
    id: 113,
    type: "match",
    pairs: [
      { en: "Sad", kn: K("ದುಃಖ", "Du-kha") },
      { en: "Angry", kn: K("ಕೋ ಪ", "Ko-pa") },
      { en: "Scared", kn: K("ಭಯ", "Bha-ya") },
      { en: "Surprised", kn: K("ಆಶ್ಚರ್ಯ ", "Aash-char-ya") },
    ],
    topic: "Emotions",
  },
  {
    id: 114,
    type: "mcq",
    question: "What is 'ನಾಚಿಕೆ'?",
    options: [
      K("ಹೆಮ್ಮೆ ", "Hem-me"),
      K("ನಾಚಿಕೆ", "Naa-chi-ke"),
      K("ಕುತೂಹಲ", "Ku-too-ha-la"),
      K("ಪ್ರೀತಿ", "Pree-ti"),
    ],
    answer: "ನಾಚಿಕೆ",
  },
  {
    id: 115,
    type: "scramble",
    english: "I am very happy",
    answer: [
      K("ನಾನು", "Naa-nu"),
      K("ತುಂಬಾ", "Tum-baa"),
      K("ಸಂತೋ ಷವಾಗಿದ್ದೇನೆ", "San-to-sha-vaa-gid-dee-ne"),
    ],
    jumbled: [
      K("ಸಂತೋ ಷವಾಗಿದ್ದೇನೆ", "San-to-sha-vaa-gid-dee-ne"),
      K("ದುಃಖವಾಗಿದ್ದೇನೆ", "Du-kha-vaa-gid-dee-ne"),
      K("ನಾನು", "Naa-nu"),
      K("ತುಂಬಾ", "Tum-baa"),
    ],
  },
  {
    id: 116,
    type: "mcq",
    question: "Select 'Love'",
    options: [
      K("ಪ್ರೀತಿ", "Pree-ti"),
      K("ಸ್ನೇಹ", "Snee-ha"),
      K("ಗೌರವ", "Gou-ra-va"),
      K("ನಂಬಿಕೆ", "Nam-bi-ke"),
    ],
    answer: "ಪ್ರೀತಿ",
  },
  {
    id: 117,
    type: "memory",
    question: K("ಒಂಟಿತನ", "On-ti-ta-na"),
    english: "Loneliness",
    options: [
      K("ಒಂಟಿತನ", "On-ti-ta-na"),
      K("ಸಂತೋ ಷ", "San-to-sha"),
      K("ಶಾಂತಿ", "Shaan-ti"),
      K("ಶಕ್ತಿ", "Shak-ti"),
    ],
    answer: "ಒಂಟಿತನ",
  },
  {
    id: 118,
    type: "match",
    pairs: [
      { en: "Hope", kn: K("ಆಶೆ", "Aa-she") },
      { en: "Trust", kn: K("ನಂಬಿಕೆ", "Nam-bi-ke") },
      { en: "Peace", kn: K("ಶಾಂತಿ", "Shaan-ti") },
      { en: "Courage", kn: K("ಧೈ ರ್ಯ ", "Dhai-rya") },
    ],
    topic: "Emotions",
  },
  {
    id: 119,
    type: "mcq",
    question: "What does 'ಕರುಣೆ' mean?",
    options: [
      K("ಕ್ರೌರ್ಯ ", "Krour-ya"),
      K("ಕರುಣೆ", "Ka-ru-ne"),
      K("ಅಸೂಯೆ", "A-soo-ye"),
      K("ದ್ವೇಷ", "Dvee-sha"),
    ],
    answer: "ಕರುಣೆ",
  },
  // LEVEL 19 - Shopping (8 exercises)
  {
    id: 120,
    type: "memory",
    question: K("ಮಾರುಕಟ್ಟೆ", "Maa-ru-kat-te"),
    english: "Market",
    options: [
      K("ಮಾರುಕಟ್ಟೆ", "Maa-ru-kat-te"),
      K("ಅಂಗಡಿ", "An-ga-di"),
      K("ಮಾಲ್", "Maal"),
      K("ಬ್ಯಾ ಂಕ್", "Byaank"),
    ],
    answer: "ಮಾರುಕಟ್ಟೆ",
  },
  {
    id: 121,
    type: "match",
    pairs: [
      { en: "Shop", kn: K("ಅಂಗಡಿ", "An-ga-di") },
      { en: "Price", kn: K("ಬೆಲೆ", "Be-le") },
      { en: "Discount", kn: K("ರಿಯಾಯಿತಿ", "Ri-yaa-yi-ti") },
      { en: "Bill", kn: K("ಬಿಲ್", "Bil") },
    ],
    topic: "Shopping",
  },
  {
    id: 122,
    type: "mcq",
    question: "What is 'ಹಣ'?",
    options: [
      K("ವೇ ಳೆ", "Vee-le"),
      K("ಹಣ", "Ha-na"),
      K("ವಸ್ತು", "Vas-tu"),
      K("ತೂಕ", "Too-ka"),
    ],
    answer: "ಹಣ",
  },
  {
    id: 123,
    type: "scramble",
    english: "How much does it cost?",
    answer: [K("ಇದರ", "I-da-ra"), K("ಬೆಲೆ", "Be-le"), K("ಎಷ್ಟು", "Esh-tu")],
    jumbled: [
      K("ಎಷ್ಟು", "Esh-tu"),
      K("ಯಾವಾಗ", "Yaa-vaa-ga"),
      K("ಬೆಲೆ", "Be-le"),
      K("ಇದರ", "I-da-ra"),
    ],
  },
  {
    id: 124,
    type: "mcq",
    question: "Select 'Expensive'",
    options: [
      K("ದುಬಾರಿ", "Du-baa-ri"),
      K("ಅಗ್ಗ", "Ag-ga"),
      K("ಉಚಿತ", "U-chi-ta"),
      K("ಸಮ", "Sa-ma"),
    ],
    answer: "ದುಬಾರಿ",
  },
  {
    id: 125,
    type: "memory",
    question: K("ಒಪ್ಪಂದ", "Op-pan-da"),
    english: "Deal",
    options: [
      K("ಒಪ್ಪಂದ", "Op-pan-da"),
      K("ಬೆಲೆ", "Be-le"),
      K("ಸಾಲ", "Saa-la"),
      K("ಲಾಭ", "Laa-bha"),
    ],
    answer: "ಒಪ್ಪಂದ",
  },
  {
    id: 126,
    type: "match",
    pairs: [
      { en: "Receipt", kn: K("ರಶೀ ದಿ", "Ra-shee-di") },
      { en: "Customer", kn: K("ಗ್ರಾಹಕ", "Graa-ha-ka") },
      { en: "Seller", kn: K("ಮಾರಾಟಗಾರ", "Maa-raa-ta-gaa-ra") },
      { en: "Cash", kn: K("ನಗದು", "Na-ga-du") },
    ],
    topic: "Shopping",
  },
  {
    id: 127,
    type: "mcq",
    question: "What does 'ಖರೀ ದಿ' mean?",
    options: [
      K("ಮಾರಾಟ", "Maa-raa-ta"),
      K("ಖರೀ ದಿ", "Kha-ree-di"),
      K("ವಿನಿಮಯ", "Vi-ni-ma-ya"),
      K("ಸಾಲ", "Saa-la"),
    ],
    answer: "ಖರೀ ದಿ",
  },
  // LEVEL 20 - Health & Hospital (8 exercises)
  {
    id: 128,
    type: "memory",
    question: K("ಆಸ್ಪತ್ರೆ", "Aas-pat-re"),
    english: "Hospital",
    options: [
      K("ಆಸ್ಪತ್ರೆ", "Aas-pat-re"),
      K("ಔಷಧಾಲಯ", "Ou-sha-daa-la-ya"),
      K("ಕ್ಲಿನಿಕ್", "Kli-nik"),
      K("ಪ್ರಯೋ ಗಾಲಯ", "Pra-yo-gaa-la-ya"),
    ],
    answer: "ಆಸ್ಪತ್ರೆ",
  },
  {
    id: 129,
    type: "match",
    pairs: [
      { en: "Medicine", kn: K("ಔಷಧ", "Ou-sha-dha") },
      { en: "Fever", kn: K("ಜ್ವರ", "Jva-ra") },
      { en: "Headache", kn: K("ತಲೆನೋ ವು", "Ta-le-no-vu") },
      { en: "Cough", kn: K("ಕೆಮ್ಮು ", "Kem-mu") },
    ],
    topic: "Health",
  },
  {
    id: 130,
    type: "mcq",
    question: "What is 'ಆರೋ ಗ್ಯ'?",
    options: [
      K("ಕಾಯಿಲೆ", "Kaa-yi-le"),
      K("ಆರೋ ಗ್ಯ", "Aa-ro-gya"),
      K("ನೋ ವು", "No-vu"),
      K("ಅಪಘಾತ", "A-pa-ghaa-ta"),
    ],
    answer: "ಆರೋ ಗ್ಯ",
  },
  {
    id: 131,
    type: "scramble",
    english: "I have a fever",
    answer: [
      K("ನನಗೆ", "Na-na-ge"),
      K("ಜ್ವರ", "Jva-ra"),
      K("ಬಂದಿದೆ", "Ban-di-de"),
    ],
    jumbled: [
      K("ಬಂದಿದೆ", "Ban-di-de"),
      K("ನೆಗಡಿ", "Ne-ga-di"),
      K("ಜ್ವರ", "Jva-ra"),
      K("ನನಗೆ", "Na-na-ge"),
    ],
  },
  {
    id: 132,
    type: "mcq",
    question: "Select 'Injection'",
    options: [
      K("ಚುಚ್ಚುಮದ್ದು", "Chuch-chu-mad-du"),
      K("ಮಾತ್ರೆ", "Maat-re"),
      K("ಸಿರಪ್", "Si-rap"),
      K("ಕ್ಯಾ ಪ್ಸೂ ಲ್", "Kyaap-sool"),
    ],
    answer: "ಚುಚ್ಚುಮದ್ದು",
  },
  {
    id: 133,
    type: "memory",
    question: K("ಶಸ್ತ್ರಚಿಕಿತ್ಸೆ", "Shas-tra-chi-kit-se"),
    english: "Surgery",
    options: [
      K("ಶಸ್ತ್ರಚಿಕಿತ್ಸೆ", "Shas-tra-chi-kit-se"),
      K("ಚಿಕಿತ್ಸೆ", "Chi-kit-se"),
      K("ಪರೀ ಕ್ಷೆ", "Pa-reek-she"),
      K("ಚೇ ತರಿಕೆ", "Chee-ta-ri-ke"),
    ],
    answer: "ಶಸ್ತ್ರಚಿಕಿತ್ಸೆ",
  },
  {
    id: 134,
    type: "match",
    pairs: [
      { en: "Nurse", kn: K("ದಾದಿ", "Daa-di") },
      { en: "X-ray", kn: K("ಎಕ್ಸ್ ರೇ ", "Eks-ree") },
      { en: "Bandage", kn: K("ಬ್ಯಾ ಂಡೇ ಜ್", "Byaan-deej") },
      { en: "Blood", kn: K("ರಕ್ತ", "Rak-ta") },
    ],
    topic: "Health",
  },
  {
    id: 135,
    type: "mcq",
    question: "What does 'ನೋ ವು' mean?",
    options: [
      K("ಸಂತೋ ಷ", "San-to-sha"),
      K("ಆರಾಮ", "Aa-raam"),
      K("ನೋ ವು", "No-vu"),
      K("ಶಕ್ತಿ", "Shak-ti"),
    ],
    answer: "ನೋ ವು",
  },
  // LEVEL 21 - Education (10 exercises)
  {
    id: 136,
    type: "memory",
    question: K("ಶಾಲೆ", "Shaa-le"),
    english: "School",
    options: [
      K("ಶಾಲೆ", "Shaa-le"),
      K("ಕಾಲೇ ಜು", "Kaa-lee-ju"),
      K("ವಿಶ್ವವಿದ್ಯಾ ಲಯ", "Vish-va-vid-yaa-la-ya"),
      K("ಗ್ರಂಥಾಲಯ", "Gran-thaa-la-ya"),
    ],
    answer: "ಶಾಲೆ",
  },
  {
    id: 137,
    type: "match",
    pairs: [
      { en: "Library", kn: K("ಗ್ರಂಥಾಲಯ", "Gran-thaa-la-ya") },
      { en: "Exam", kn: K("ಪರೀ ಕ್ಷೆ", "Pa-reek-she") },
      { en: "Homework", kn: K("ಗೃಹಕಾರ್ಯ ", "Gru-ha-kaa-rya") },
      { en: "Class", kn: K("ತರಗತಿ", "Ta-ra-ga-ti") },
    ],
    topic: "Education",
  },
  {
    id: 138,
    type: "mcq",
    question: "What is 'ವಿದ್ಯಾ ರ್ಥಿ '?",
    options: [
      K("ಶಿಕ್ಷಕ", "Shik-sha-ka"),
      K("ಮುಖ್ಯ ೋಪಾಧ್ಯಾ ಯ", "Muk-hyo-paa-dhyaa-ya"),
      K("ವಿದ್ಯಾ ರ್ಥಿ ", "Vid-yaar-thi"),
      K("ಕಾರ್ಮಿ ಕ", "Kaar-mi-ka"),
    ],
    answer: "ವಿದ್ಯಾ ರ್ಥಿ ",
  },
  {
    id: 139,
    type: "scramble",
    english: "I study in school",
    answer: [
      K("ನಾನು", "Naa-nu"),
      K("ಶಾಲೆಯಲ್ಲಿ", "Shaa-le-yal-li"),
      K("ಓದುತ್ತೇನೆ", "O-dut-tee-ne"),
    ],
    jumbled: [
      K("ಓದುತ್ತೇನೆ", "O-dut-tee-ne"),
      K("ಕಾಲೇ ಜಿನಲ್ಲಿ", "Kaa-lee-ji-nal-li"),
      K("ನಾನು", "Naa-nu"),
      K("ಶಾಲೆಯಲ್ಲಿ", "Shaa-le-yal-li"),
    ],
  },
  {
    id: 140,
    type: "mcq",
    question: "Select 'Certificate'",
    options: [
      K("ಪ್ರಮಾಣಪತ್ರ", "Pra-maa-na-pat-ra"),
      K("ಪ್ರಶ್ನೆ", "Prash-ne"),
      K("ಉತ್ತರ", "Ut-ta-ra"),
      K("ಪ್ರಬಂಧ", "Pra-ban-dha"),
    ],
    answer: "ಪ್ರಮಾಣಪತ್ರ",
  },
  {
    id: 141,
    type: "memory",
    question: K("ಕಲಿಕೆ", "Ka-li-ke"),
    english: "Learning",
    options: [
      K("ಕಲಿಕೆ", "Ka-li-ke"),
      K("ಕಲಿಸುವಿಕೆ", "Ka-li-su-vi-ke"),
      K("ಬೋ ಧನೆ", "Bo-dha-ne"),
      K("ಪರೀ ಕ್ಷೆ", "Pa-reek-she"),
    ],
    answer: "ಕಲಿಕೆ",
  },
  {
    id: 142,
    type: "match",
    pairs: [
      { en: "Grade", kn: K("ಶ್ರೇಣಿ", "Shree-ni") },
      { en: "Subject", kn: K("ವಿಷಯ", "Vi-sha-ya") },
      { en: "Science", kn: K("ವಿಜ್ಞಾ ನ", "Vig-nyaa-na") },
      { en: "Maths", kn: K("ಗಣಿತ", "Ga-ni-ta") },
    ],
    topic: "Education",
  },
  {
    id: 143,
    type: "mcq",
    question: "What does 'ಭಾಷೆ' mean?",
    options: [
      K("ಗಣಿತ", "Ga-ni-ta"),
      K("ಭಾಷೆ", "Bhaa-she"),
      K("ಇತಿಹಾಸ", "I-ti-haa-sa"),
      K("ಭೂಗೋ ಳ", "Bhoo-go-la"),
    ],
    answer: "ಭಾಷೆ",
  },
  {
    id: 144,
    type: "scramble",
    english: "The exam is tomorrow",
    answer: [
      K("ಪರೀ ಕ್ಷೆ", "Pa-reek-she"),
      K("ನಾಳೆ", "Naa-le"),
      K("ಇದೆ", "I-de"),
    ],
    jumbled: [
      K("ಇದೆ", "I-de"),
      K("ಇಂದು", "In-du"),
      K("ನಾಳೆ", "Naa-le"),
      K("ಪರೀ ಕ್ಷೆ", "Pa-reek-she"),
    ],
  },
  {
    id: 145,
    type: "mcq",
    question: "Select 'Dictionary'",
    options: [
      K("ನಿಘಂಟು", "Ni-ghan-tu"),
      K("ಪಠ್ಯಪುಸ್ತಕ", "Pat-hya-pus-ta-ka"),
      K("ನೋ ಟ್ಬುಕ್", "Not-buk"),
      K("ಕಾದಂಬರಿ", "Kaa-dam-ba-ri"),
    ],
    answer: "ನಿಘಂಟು",
  },
  // LEVEL 22 - Technology (10 exercises)
  {
    id: 146,
    type: "memory",
    question: K("ಗಣಕಯಂತ್ರ", "Ga-na-ka-yan-tra"),
    english: "Computer",
    options: [
      K("ಗಣಕಯಂತ್ರ", "Ga-na-ka-yan-tra"),
      K("ದೂರವಾಣಿ", "Doo-ra-vaa-ni"),
      K("ಮೇ ಜಿನ ಮೇ ಲಿನ ಯಂತ್ರ", "Mee-ji-na mee-li-na yan-tra"),
      K("ಮುದ್ರಕ", "Mud-ra-ka"),
    ],
    answer: "ಗಣಕಯಂತ್ರ",
  },
  {
    id: 147,
    type: "match",
    pairs: [
      { en: "Phone", kn: K("ದೂರವಾಣಿ", "Doo-ra-vaa-ni") },
      { en: "Internet", kn: K("ಅಂತರ್ಜಾ ಲ", "An-tar-jaa-la") },
      { en: "Printer", kn: K("ಮುದ್ರಕ", "Mud-ra-ka") },
      { en: "Screen", kn: K("ತೆರೆ", "Te-re") },
    ],
    topic: "Technology",
  },
  {
    id: 148,
    type: "mcq",
    question: "What is 'ಕ್ಯಾ ಮೆರಾ'?",
    options: [
      K("ರೇ ಡಿಯೊ", "Ree-di-yo"),
      K("ಟಿವಿ", "Ti-vi"),
      K("ಕ್ಯಾ ಮೆರಾ", "Kyaa-me-raa"),
      K("ಸ್ಪೀಕರ್", "Spee-kar"),
    ],
    answer: "ಕ್ಯಾ ಮೆರಾ",
  },
  {
    id: 149,
    type: "scramble",
    english: "I use the internet",
    answer: [
      K("ನಾನು", "Naa-nu"),
      K("ಅಂತರ್ಜಾ ಲ", "An-tar-jaa-la"),
      K("ಬಳಸುತ್ತೇನೆ", "Ba-la-sut-tee-ne"),
    ],
    jumbled: [
      K("ಬಳಸುತ್ತೇನೆ", "Ba-la-sut-tee-ne"),
      K("ಬಿಡುತ್ತೇನೆ", "Bi-dut-tee-ne"),
      K("ಅಂತರ್ಜಾ ಲ", "An-tar-jaa-la"),
      K("ನಾನು", "Naa-nu"),
    ],
  },
  {
    id: 150,
    type: "mcq",
    question: "Select 'Password'",
    options: [
      K("ಗುಪ್ತಪದ", "Gup-ta-pa-da"),
      K("ಹೆಸರು", "He-sa-ru"),
      K("ಅಡ್ರೆಸ್", "Ad-res"),
      K("ಇಮೇ ಲ್", "I-meel"),
    ],
    answer: "ಗುಪ್ತಪದ",
  },
  {
    id: 151,
    type: "memory",
    question: K("ಡೌನ್ಲೋ ಡ್", "Down-load"),
    english: "Download",
    options: [
      K("ಡೌನ್ಲೋ ಡ್", "Down-load"),
      K("ಅಪ್ಲೋ ಡ್", "Up-load"),
      K("ಇನ್ಸ್ಟಾಲ್", "In-staal"),
      K("ಶೇ ರ್", "Sheer"),
    ],
    answer: "ಡೌನ್ಲೋ ಡ್",
  },
  {
    id: 152,
    type: "match",
    pairs: [
      { en: "Message", kn: K("ಸಂದೇ ಶ", "San-dee-sha") },
      { en: "Video", kn: K("ವೀ ಡಿಯೊ", "Vee-di-yo") },
      { en: "Photo", kn: K("ಚಿತ್ರ", "Chit-ra") },
      { en: "App", kn: K("ಅಪ್ಲಿಕೇ ಶನ್", "Ap-li-kee-shan") },
    ],
    topic: "Technology",
  },
  {
    id: 153,
    type: "mcq",
    question: "What does 'ನೆಟ್ವರ್ಕ್ ' mean?",
    options: [
      K("ಸಾಫ್ಟ್ವೇ ರ್", "Saaft-veer"),
      K("ನೆಟ್ವರ್ಕ್ ", "Net-vark"),
      K("ಹಾರ್ಡ್‌ ವೇ ರ್", "Haard-veer"),
      K("ಬ್ರೌಸರ್", "Brou-sar"),
    ],
    answer: "ನೆಟ್ವರ್ಕ್ ",
  },
  {
    id: 154,
    type: "scramble",
    english: "My phone is new",
    answer: [
      K("ನನ್ನ", "Nan-na"),
      K("ಫೋ ನ್", "Fon"),
      K("ಹೊ ಸದು", "Ho-sa-du"),
      K("ಆಗಿದೆ", "Aa-gi-de"),
    ],
    jumbled: [
      K("ಆಗಿದೆ", "Aa-gi-de"),
      K("ಹಳೆಯದು", "Ha-le-ya-du"),
      K("ಫೋ ನ್", "Fon"),
      K("ನನ್ನ", "Nan-na"),
      K("ಹೊ ಸದು", "Ho-sa-du"),
    ],
  },
  {
    id: 155,
    type: "mcq",
    question: "Select 'Electricity'",
    options: [
      K("ವಿದ್ಯು ತ್", "Vid-yut"),
      K("ಶಕ್ತಿ", "Shak-ti"),
      K("ಬ್ಯಾ ಟರಿ", "Byaa-ta-ri"),
      K("ಸೋ ಲಾರ್", "So-laar"),
    ],
    answer: "ವಿದ್ಯು ತ್",
  },
  // LEVEL 23 - Sports & Hobbies (10 exercises)
  {
    id: 156,
    type: "memory",
    question: K("ಕ್ರಿ ಕೆಟ್", "Kri-ket"),
    english: "Cricket",
    options: [
      K("ಕ್ರಿ ಕೆಟ್", "Kri-ket"),
      K("ಫುಟ್ಬಾ ಲ್", "Fut-baal"),
      K("ಕಬಡ್ಡಿ", "Ka-bad-di"),
      K("ಹಾಕಿ", "Haa-ki"),
    ],
    answer: "ಕ್ರಿ ಕೆಟ್",
  },
  {
    id: 157,
    type: "match",
    pairs: [
      { en: "Football", kn: K("ಫುಟ್ಬಾ ಲ್", "Fut-baal") },
      { en: "Swimming", kn: K("ಈಜು", "Ee-ju") },
      { en: "Running", kn: K("ಓಟ", "O-ta") },
      { en: "Yoga", kn: K("ಯೋ ಗ", "Yo-ga") },
    ],
    topic: "Sports",
  },
  {
    id: 158,
    type: "mcq",
    question: "What is 'ನೃತ್ಯ'?",
    options: [
      K("ಹಾಡು", "Haa-du"),
      K("ನೃತ್ಯ", "Nrut-ya"),
      K("ಆಟ", "Aa-ta"),
      K("ವ್ಯಾ ಯಾಮ", "Vyaa-yaa-ma"),
    ],
    answer: "ನೃತ್ಯ",
  },
  {
    id: 159,
    type: "scramble",
    english: "I play cricket",
    answer: [
      K("ನಾನು", "Naa-nu"),
      K("ಕ್ರಿ ಕೆಟ್", "Kri-ket"),
      K("ಆಡುತ್ತೇನೆ", "Aa-dut-tee-ne"),
    ],
    jumbled: [
      K("ಆಡುತ್ತೇನೆ", "Aa-dut-tee-ne"),
      K("ಫುಟ್ಬಾ ಲ್", "Fut-baal"),
      K("ನಾನು", "Naa-nu"),
      K("ಕ್ರಿ ಕೆಟ್", "Kri-ket"),
    ],
  },
  {
    id: 160,
    type: "mcq",
    question: "Select 'Photography'",
    options: [
      K("ಛಾಯಾಗ್ರಹಣ", "Chaa-yaa-gra-ha-na"),
      K("ಚಿತ್ರಕಲೆ", "Chit-ra-ka-le"),
      K("ಕಸೂತಿ", "Ka-soo-ti"),
      K("ಶಿಲ್ಪಕಲೆ", "Shil-pa-ka-le"),
    ],
    answer: "ಛಾಯಾಗ್ರಹಣ",
  },
  {
    id: 161,
    type: "memory",
    question: K("ಚಿತ್ರಕಲೆ", "Chit-ra-ka-le"),
    english: "Painting",
    options: [
      K("ಚಿತ್ರಕಲೆ", "Chit-ra-ka-le"),
      K("ಶಿಲ್ಪಕಲೆ", "Shil-pa-ka-le"),
      K("ಸಂಗೀ ತ", "San-gee-ta"),
      K("ಕಾವ್ಯ", "Kaav-ya"),
    ],
    answer: "ಚಿತ್ರಕಲೆ",
  },
  {
    id: 162,
    type: "match",
    pairs: [
      { en: "Music", kn: K("ಸಂಗೀ ತ", "San-gee-ta") },
      { en: "Reading", kn: K("ಓದು", "O-du") },
      { en: "Cooking", kn: K("ಅಡುಗೆ", "A-du-ge") },
      { en: "Gardening", kn: K("ತೋ ಟಗಾರಿಕೆ", "To-ta-gaa-ri-ke") },
    ],
    topic: "Hobbies",
  },
  {
    id: 163,
    type: "mcq",
    question: "What does 'ಚಾಂಪಿಯನ್' mean?",
    options: [
      K("ಸ್ಪರ್ಧಿ ", "Spar-dhi"),
      K("ನ್ಯಾ ಯಾಧೀ ಶ", "Nyaa-yaa-dhee-sha"),
      K("ಚಾಂಪಿಯನ್", "Chaam-pi-yan"),
      K("ತಂಡ", "Tan-da"),
    ],
    answer: "ಚಾಂಪಿಯನ್",
  },
  {
    id: 164,
    type: "scramble",
    english: "She sings well",
    answer: [
      K("ಅವಳು", "A-va-lu"),
      K("ಚೆನ್ನಾಗಿ", "Chen-naa-gi"),
      K("ಹಾಡುತ್ತಾಳೆ", "Haa-dut-taa-le"),
    ],
    jumbled: [
      K("ಹಾಡುತ್ತಾಳೆ", "Haa-dut-taa-le"),
      K("ಕೆಟ್ಟದಾಗಿ", "Ket-ta-daa-gi"),
      K("ಅವಳು", "A-va-lu"),
      K("ಚೆನ್ನಾಗಿ", "Chen-naa-gi"),
    ],
  },
  {
    id: 165,
    type: "mcq",
    question: "Select 'Tournament'",
    options: [
      K("ಸ್ಪರ್ಧೆ ", "Spar-dhe"),
      K("ಅಭ್ಯಾ ಸ", "Ab-hyaa-sa"),
      K("ಆಟ", "Aa-ta"),
      K("ತಾಲೀ ಮು", "Taa-lee-mu"),
    ],
    answer: "ಸ್ಪರ್ಧೆ ",
  },
  // LEVEL 24 - Travel & Directions (10 exercises)
  {
    id: 166,
    type: "memory",
    question: K("ಉತ್ತರ", "Ut-ta-ra"),
    english: "North",
    options: [
      K("ಉತ್ತರ", "Ut-ta-ra"),
      K("ದಕ್ಷಿಣ", "Dak-shi-na"),
      K("ಪೂರ್ವ ", "Poor-va"),
      K("ಪಶ್ಚಿಮ", "Pash-chi-ma"),
    ],
    answer: "ಉತ್ತರ",
  },
  {
    id: 167,
    type: "match",
    pairs: [
      { en: "South", kn: K("ದಕ್ಷಿಣ", "Dak-shi-na") },
      { en: "East", kn: K("ಪೂರ್ವ ", "Poor-va") },
      { en: "West", kn: K("ಪಶ್ಚಿಮ", "Pash-chi-ma") },
      { en: "Left", kn: K("ಎಡ", "E-da") },
    ],
    topic: "Directions",
  },
  {
    id: 168,
    type: "mcq",
    question: "What is 'ನೇ ರ'?",
    options: [
      K("ಬಲ", "Ba-la"),
      K("ಎಡ", "E-da"),
      K("ನೇ ರ", "Nee-ra"),
      K("ಹಿಂದೆ", "Hin-de"),
    ],
    answer: "ನೇ ರ",
  },
  {
    id: 169,
    type: "scramble",
    english: "Turn right at the signal",
    answer: [
      K("ಸಿಗ್ನಲ್ನಲ್ಲಿ", "Sig-nal-nal-li"),
      K("ಬಲಕ್ಕೆ ", "Ba-lak-ke"),
      K("ತಿರುಗಿ", "Ti-ru-gi"),
    ],
    jumbled: [
      K("ತಿರುಗಿ", "Ti-ru-gi"),
      K("ಎಡಕ್ಕೆ ", "E-dak-ke"),
      K("ಸಿಗ್ನಲ್ನಲ್ಲಿ", "Sig-nal-nal-li"),
      K("ಬಲಕ್ಕೆ ", "Ba-lak-ke"),
    ],
  },
  {
    id: 170,
    type: "mcq",
    question: "Select 'Map'",
    options: [
      K("ನಕ್ಷೆ", "Nak-she"),
      K("ದಿಕ್ಕು ", "Dik-ku"),
      K("ದೂರ", "Doo-ra"),
      K("ಮಾರ್ಗ ", "Maar-ga"),
    ],
    answer: "ನಕ್ಷೆ",
  },
  {
    id: 171,
    type: "memory",
    question: K("ಪ್ರವಾಸ", "Pra-vaa-sa"),
    english: "Travel",
    options: [
      K("ಪ್ರವಾಸ", "Pra-vaa-sa"),
      K("ರಜೆ", "Ra-je"),
      K("ಸಾಹಸ", "Saa-ha-sa"),
      K("ದಾರಿ", "Daa-ri"),
    ],
    answer: "ಪ್ರವಾಸ",
  },
  {
    id: 172,
    type: "match",
    pairs: [
      { en: "Hotel", kn: K("ಹೋ ಟೆಲ್", "Ho-tel") },
      { en: "Passport", kn: K("ಪಾಸ್ಪೋ ರ್ಟ್ ", "Paas-port") },
      { en: "Luggage", kn: K("ಸಾಮಾನು", "Saa-maa-nu") },
      { en: "Ticket", kn: K("ಟಿಕೆಟ್", "Ti-ket") },
    ],
    topic: "Travel",
  },
  {
    id: 173,
    type: "mcq",
    question: "What does 'ಪ್ರವಾಸಿ' mean?",
    options: [
      K("ಸ್ಥಳೀ ಯ", "Stha-lee-ya"),
      K("ಮಾರ್ಗ ದರ್ಶಿ ", "Maar-ga-dar-shi"),
      K("ಪ್ರವಾಸಿ", "Pra-vaa-si"),
      K("ಚಾಲಕ", "Chaa-la-ka"),
    ],
    answer: "ಪ್ರವಾಸಿ",
  },
  {
    id: 174,
    type: "scramble",
    english: "I am lost",
    answer: [
      K("ನಾನು", "Naa-nu"),
      K("ದಾರಿ", "Daa-ri"),
      K("ತಪ್ಪಿದ್ದೇನೆ", "Tap-pid-dee-ne"),
    ],
    jumbled: [
      K("ತಪ್ಪಿದ್ದೇನೆ", "Tap-pid-dee-ne"),
      K("ಸಿಕ್ಕಿ ದ್ದೇನೆ", "Sik-kid-dee-ne"),
      K("ದಾರಿ", "Daa-ri"),
      K("ನಾನು", "Naa-nu"),
    ],
  },
  {
    id: 175,
    type: "mcq",
    question: "Select 'Border'",
    options: [
      K("ಗಡಿ", "Ga-di"),
      K("ಭೂಮಿ", "Bhoo-mi"),
      K("ರಾಜ್ಯ", "Raaj-ya"),
      K("ದೇ ಶ", "Dee-sha"),
    ],
    answer: "ಗಡಿ",
  },
  // LEVEL 25 - Advanced Conversation (10 exercises)
  {
    id: 176,
    type: "memory",
    question: K("ಅಭಿಪ್ರಾಯ", "A-bhi-praa-ya"),
    english: "Opinion",
    options: [
      K("ಅಭಿಪ್ರಾಯ", "A-bhi-praa-ya"),
      K("ಪ್ರಶ್ನೆ", "Prash-ne"),
      K("ಉತ್ತರ", "Ut-ta-ra"),
      K("ವಾದ", "Vaa-da"),
    ],
    answer: "ಅಭಿಪ್ರಾಯ",
  },
  {
    id: 177,
    type: "match",
    pairs: [
      { en: "Agree", kn: K("ಒಪ್ಪು", "Op-pu") },
      { en: "Disagree", kn: K("ಒಪ್ಪದಿರು", "Op-pa-di-ru") },
      { en: "Maybe", kn: K("ಇರಬಹುದು", "I-ra-ba-hu-du") },
      { en: "Definitely", kn: K("ಖಂಡಿತ", "Khan-di-ta") },
    ],
    topic: "Conversation",
  },
  {
    id: 178,
    type: "mcq",
    question: "What is 'ವಿನಂತಿ'?",
    options: [
      K("ಆದೇ ಶ", "Aa-dee-sha"),
      K("ವಿನಂತಿ", "Vi-nan-ti"),
      K("ನಿಷೇ ಧ", "Ni-shee-dha"),
      K("ಸಲಹೆ", "Sa-la-he"),
    ],
    answer: "ವಿನಂತಿ",
  },
  {
    id: 179,
    type: "scramble",
    english: "Can you help me?",
    answer: [
      K("ನೀ ವು", "Nee-vu"),
      K("ನನಗೆ", "Na-na-ge"),
      K("ಸಹಾಯ", "Sa-haa-ya"),
      K("ಮಾಡಬಲ್ಲಿರಾ", "Maa-da-bal-li-raa"),
    ],
    jumbled: [
      K("ಮಾಡಬಲ್ಲಿರಾ", "Maa-da-bal-li-raa"),
      K("ಅವರಿಗೆ", "A-va-ri-ge"),
      K("ನೀ ವು", "Nee-vu"),
      K("ಸಹಾಯ", "Sa-haa-ya"),
      K("ನನಗೆ", "Na-na-ge"),
    ],
  },
  {
    id: 180,
    type: "mcq",
    question: "Select 'Congratulations'",
    options: [
      K("ಅಭಿನಂದನೆ", "A-bhi-nan-da-ne"),
      K("ಧನ್ಯವಾದ", "Dhan-ya-vaa-da"),
      K("ಕ್ಷಮಿಸಿ", "Ksha-mi-si"),
      K("ಸ್ವಾ ಗತ", "Svaa-ga-ta"),
    ],
    answer: "ಅಭಿನಂದನೆ",
  },
  {
    id: 181,
    type: "memory",
    question: K("ಪ್ರಯತ್ನ", "Pra-yat-na"),
    english: "Effort",
    options: [
      K("ಪ್ರಯತ್ನ", "Pra-yat-na"),
      K("ಫಲಿತಾಂಶ", "Pha-li-taan-sha"),
      K("ಗುರಿ", "Gu-ri"),
      K("ಯಶಸ್ಸು", "Ya-shas-su"),
    ],
    answer: "ಪ್ರಯತ್ನ",
  },
  {
    id: 182,
    type: "match",
    pairs: [
      { en: "Success", kn: K("ಯಶಸ್ಸು", "Ya-shas-su") },
      { en: "Failure", kn: K("ವಿಫಲತೆ", "Vi-pha-la-te") },
      { en: "Goal", kn: K("ಗುರಿ", "Gu-ri") },
      { en: "Dream", kn: K("ಕನಸು", "Ka-na-su") },
    ],
    topic: "Life",
  },
  {
    id: 183,
    type: "mcq",
    question: "What does 'ಭವಿಷ್ಯ' mean?",
    options: [
      K("ಭೂತ", "Bhoo-ta"),
      K("ವರ್ತ ಮಾನ", "Var-ta-maa-na"),
      K("ಭವಿಷ್ಯ", "Bha-vish-ya"),
      K("ಇತಿಹಾಸ", "I-ti-haa-sa"),
    ],
    answer: "ಭವಿಷ್ಯ",
  },
  {
    id: 184,
    type: "scramble",
    english: "Never give up",
    answer: [K("ಎಂದಿಗೂ", "En-di-goo"), K("ಬಿಡಬೇ ಡಿ", "Bi-da-bee-di")],
    jumbled: [
      K("ಬಿಡಬೇ ಡಿ", "Bi-da-bee-di"),
      K("ಮುಂದುವರೆಯಿರಿ", "Mun-du-va-re-yi-ri"),
      K("ಎಂದಿಗೂ", "En-di-goo"),
    ],
  },
  {
    id: 185,
    type: "mcq",
    question: "Select 'Wisdom'",
    options: [
      K("ಜ್ಞಾ ನ", "Gyaa-na"),
      K("ಜ್ಞಾ ನ", "Gyaa-na"),
      K("ತಿಳಿವಳಿಕೆ", "Ti-li-va-li-ke"),
      K("ಅರಿವು", "A-ri-vu"),
    ],
    answer: "ತಿಳಿವಳಿಕೆ",
  },
];
const getQuestionsPerLevel = (level) => {
  if (level >= 1 && level <= 5) return 5;
  if (level >= 6 && level <= 12) return 6;
  if (level >= 13 && level <= 20) return 8;
  return 10;
};
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};
// Render a Kannada word with pronunciation
const KannadaWord = ({ word, size = "normal", color = null }) => {
  if (!word || typeof word === "string") return <span>{word}</span>;
  const sizes = {
    small: { kn: "15px", pr: "11px" },
    normal: { kn: "18px", pr: "12px" },
    large: { kn: "52px", pr: "15px" },
    xlarge: { kn: "64px", pr: "17px" },
  };
  const s = sizes[size] || sizes.normal;
  return (
    <span
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        lineHeight: 1.3,
      }}
    >
      <span
        style={{ fontSize: s.kn, fontWeight: "800", color: color || "inherit" }}
      >
        {word.kn}
      </span>{" "}
      <span
        style={{
          fontSize: s.pr,
          opacity: 0.6,
          fontStyle: "italic",
          fontWeight: "500",
          color: color || "inherit",
        }}
      >
        {word.pr}
      </span>
    </span>
  );
};
const App = () => {
  const [level, setLevel] = useState(1);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [lives, setLives] = useState(5);
  const [gems, setGems] = useState(0);
  const [darkMode, setDarkMode] = useState(true);
  const [totalXP, setTotalXP] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showLevelComplete, setShowLevelComplete] = useState(false);
  const [showShop, setShowShop] = useState(false);
  const [consecutiveFails, setConsecutiveFails] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [scrambleResult, setScrambleResult] = useState([]);
  const [matchSelected, setMatchSelected] = useState({ en: null, kn: null });
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [memoryTimer, setMemoryTimer] = useState(1);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [shuffledLeftPairs, setShuffledLeftPairs] = useState([]);
  const [shuffledRightPairs, setShuffledRightPairs] = useState([]);
  const currentExercise = COURSE[exerciseIndex] || COURSE[0];
  const topicName =
    level <= 10
      ? "Basic Kannada"
      : level <= 20
        ? "Intermediate Kannada"
        : "Advanced Kannada";
  const questionsPerLevel = getQuestionsPerLevel(level);
  const exercisesInCurrentLevel = exerciseIndex % questionsPerLevel;
  const progressInLevel = (exercisesInCurrentLevel / questionsPerLevel) * 100;
  useEffect(() => {
    if (currentExercise.type === "mcq" || currentExercise.type === "memory") {
      setShuffledOptions(shuffleArray(currentExercise.options || []));
    }
    if (currentExercise.type === "match") {
      setShuffledLeftPairs(shuffleArray(currentExercise.pairs || []));
      setShuffledRightPairs(shuffleArray(currentExercise.pairs || []));
    }
  }, [exerciseIndex]);
  useEffect(() => {
    const recovery = setInterval(
      () => {
        setLives((prev) => (prev < 5 ? prev + 1 : prev));
      },
      30 * 60 * 1000,
    );
    return () => clearInterval(recovery);
  }, []);
  useEffect(() => {
    if (currentExercise.type === "memory") {
      setIsRevealed(true);
      setMemoryTimer(1);
      const countdown = setInterval(() => {
        setMemoryTimer((prev) => {
          if (prev <= 0.1) {
            setIsRevealed(false);
            clearInterval(countdown);
            return 0;
          }
          return prev - 0.1;
        });
      }, 100);
      return () => clearInterval(countdown);
    }
  }, [exerciseIndex]);
  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setFeedback("correct");
      setTotalXP((prev) => prev + 10);
      setStreak((prev) => prev + 1);
      setConsecutiveFails(0);
      setTimeout(() => {
        if ((exerciseIndex + 1) % questionsPerLevel === 0) {
          setGems((prev) => prev + 5);
          setShowLevelComplete(true);
        } else {
          moveToNextExercise();
        }
      }, 1200);
    } else {
      setFeedback("wrong");
      setLives((prev) => Math.max(0, prev - 1));
      setStreak(0);
      setConsecutiveFails((prev) => prev + 1);
      setTimeout(() => setFeedback(null), 1200);
    }
  };
  const moveToNextExercise = () => {
    setExerciseIndex((prev) => prev + 1);
    if ((exerciseIndex + 1) % questionsPerLevel === 0)
      setLevel((prev) => prev + 1);
    setScrambleResult([]);
    setMatchedPairs([]);
    setMatchSelected({ en: null, kn: null });
    setFeedback(null);
    setShowLevelComplete(false);
  };
  const buyHearts = (amount, cost) => {
    if (gems >= cost) {
      setGems((prev) => prev - cost);
      setLives((prev) => Math.min(5, prev + amount));
      setShowShop(false);
      setConsecutiveFails(0);
    }
  };
  const theme = {
    glass: darkMode ? "rgba(10, 15, 35, 0.9)" : "rgba(255, 255, 255, 0.92)",
    text: darkMode ? "#f0e6ff" : "#1a0a2e",
    textSecondary: darkMode ? "rgba(240,230,255,0.6)" : "rgba(26,10,46,0.6)",
    bg: darkMode
      ? "linear-gradient(135deg, #0a0f23 0%, #1a0a2e 40%, #0d1f3c 100%)"
      : "linear-gradient(135deg, #fdf0ff 0%, #ede0ff 50%, #dbeeff 100%)",
    accent: "#c084fc",
    accentDark: "#a855f7",
    wrong: "#f87171",
    cardBorder: darkMode
      ? "1px solid rgba(192,132,252,0.15)"
      : "1px solid rgba(168,85,247,0.2)",
    chipBg: darkMode ? "rgba(192,132,252,0.08)" : "rgba(168,85,247,0.07)",
    chipBgHover: darkMode ? "rgba(192,132,252,0.18)" : "rgba(168,85,247,0.15)",
  };
  const sharedWrapStyle = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: theme.bg,
    fontFamily: "'Noto Sans Kannada', 'Noto Sans', system-ui, sans-serif",
    transition: "all 0.5s ease",
    padding: "20px",
  };
  const sharedCardStyle = {
    backdropFilter: "blur(30px)",
    background: theme.glass,
    borderRadius: "36px",
    padding: "50px 35px",
    textAlign: "center",
    maxWidth: "450px",
    width: "100%",
    border: theme.cardBorder,
    boxShadow: "0 30px 60px -15px rgba(0,0,0,0.6)",
    animation: "slideUp 0.4s ease",
  };
  if (showShop) {
    return (
      <div style={sharedWrapStyle}>
        <div style={sharedCardStyle}>
          <div style={{ fontSize: "70px", marginBottom: "20px" }}>��</div>
          <h1
            style={{
              color: theme.text,
              fontSize: "28px",
              marginBottom: "10px",
              fontWeight: "800",
            }}
          >
            Gem Shop
          </h1>
          <p style={{ color: theme.textSecondary, marginBottom: "25px" }}>
            You have{" "}
            <span
              style={{
                color: theme.accent,
                fontWeight: "800",
                fontSize: "18px",
              }}
            >
              {gems} gems
            </span>
          </p>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              marginBottom: "25px",
            }}
          >
            {" "}
            {[
              {
                hearts: 1,
                cost: 20,
                label: "1 Heart",
                emoji: "❤️",
                color: "#f87171",
                bundle: false,
              },
              {
                hearts: 5,
                cost: 80,
                label: "5 Hearts Bundle",
                emoji: "❤️❤️❤️❤️❤️",
                color: "#c084fc",
                bundle: true,
                orig: 100,
              },
            ].map((item) => (
              <div
                key={item.hearts}
                style={{
                  background: `${item.color}18`,
                  border: `2px solid ${item.color}40`,
                  borderRadius: "20px",
                  padding: "20px",
                  cursor: gems >= item.cost ? "pointer" : "not-allowed",
                  opacity: gems >= item.cost ? 1 : 0.5,
                  transition: "all 0.3s",
                  position: "relative",
                }}
                onClick={() =>
                  gems >= item.cost && buyHearts(item.hearts, item.cost)
                }
                onMouseEnter={(e) =>
                  gems >= item.cost &&
                  (e.currentTarget.style.transform = "translateY(-3px)")
                }
                onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
              >
                {item.bundle && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-10px",
                      right: "15px",
                      background: "#fbbf24",
                      color: "#78350f",
                      padding: "4px 12px",
                      borderRadius: "12px",
                      fontSize: "11px",
                      fontWeight: "800",
                    }}
                  >
                    20% OFF
                  </div>
                )}{" "}
                <div style={{ fontSize: "32px", marginBottom: "8px" }}>
                  {item.emoji}
                </div>{" "}
                <div
                  style={{
                    fontSize: "17px",
                    fontWeight: "700",
                    color: theme.text,
                    marginBottom: "5px",
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "6px",
                  }}
                >
                  {" "}
                  <span>��</span>
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: "800",
                      color: theme.accent,
                    }}
                  >
                    {item.cost}
                  </span>
                  {item.orig && (
                    <span
                      style={{
                        fontSize: "13px",
                        color: theme.textSecondary,
                        textDecoration: "line-through",
                        marginLeft: "6px",
                      }}
                    >
                      {item.orig}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setShowShop(false)}
            style={{
              background: theme.chipBg,
              border: "none",
              padding: "16px",
              borderRadius: "18px",
              color: theme.text,
              fontWeight: "700",
              fontSize: "16px",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Close
          </button>
        </div>
        <style>{`@keyframes 
slideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}`}</style>
      </div>
    );
  }
  if (lives === 0) {
    return (
      <div style={sharedWrapStyle}>
        <div style={sharedCardStyle}>
          <div style={{ fontSize: "80px", marginBottom: "20px" }}>��</div>
          <h1
            style={{
              color: theme.text,
              fontSize: "30px",
              marginBottom: "12px",
              fontWeight: "800",
            }}
          >
            Out of Hearts!
          </h1>
          <p style={{ color: theme.textSecondary, marginBottom: "25px" }}>
            A new heart every 30 minutes
          </p>
          <div
            style={{
              background: `${theme.accent}15`,
              padding: "20px",
              borderRadius: "20px",
              marginBottom: "20px",
              border: `1px solid ${theme.accent}30`,
            }}
          >
            <div style={{ fontSize: "13px", opacity: 0.6, color: theme.text }}>
              Your Gems
            </div>{" "}
            <div
              style={{
                fontSize: "34px",
                fontWeight: "800",
                color: theme.accent,
              }}
            >
              �� {gems}
            </div>{" "}
            <div
              style={{
                fontSize: "12px",
                color: theme.textSecondary,
                marginTop: "4px",
              }}
            >
              Total XP: {totalXP}
            </div>
          </div>
          {gems >= 20 ? (
            <button
              onClick={() => setShowShop(true)}
              style={{
                background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark})`,
                border: "none",
                padding: "18px",
                borderRadius: "20px",
                color: "white",
                fontWeight: "bold",
                fontSize: "16px",
                cursor: "pointer",
                width: "100%",
                marginBottom: "12px",
                boxShadow: `0 10px 30px ${theme.accent}40`,
              }}
            >
              Buy Hearts with Gems ��
            </button>
          ) : (
            <div
              style={{
                background: `${theme.wrong}15`,
                padding: "14px",
                borderRadius: "15px",
                marginBottom: "12px",
                border: `1px solid ${theme.wrong}30`,
                color: theme.textSecondary,
                fontSize: "14px",
              }}
            >
              Not enough gems. Complete levels to earn more!
            </div>
          )}
          <button
            onClick={() => {
              setLives(5);
              setExerciseIndex(0);
              setLevel(1);
              setTotalXP(0);
              setStreak(0);
              setGems(0);
            }}
            style={{
              background: theme.chipBg,
              border: "none",
              padding: "16px",
              borderRadius: "18px",
              color: theme.text,
              fontWeight: "700",
              fontSize: "15px",
              cursor: "pointer",
              width: "100%",
            }}
          >
            Start Over
          </button>
        </div>
        <style>{`@keyframes 
slideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}`}</style>
      </div>
    );
  }
  if (showLevelComplete) {
    return (
      <div style={sharedWrapStyle}>
        <div style={sharedCardStyle}>
          <div
            style={{
              fontSize: "80px",
              marginBottom: "15px",
              animation: "bounce 1s infinite",
            }}
          >
            ��
          </div>
          <h1
            style={{
              color: theme.text,
              fontSize: "30px",
              marginBottom: "10px",
              fontWeight: "800",
            }}
          >
            Level {level} Complete!
          </h1>
          <p style={{ color: theme.textSecondary, marginBottom: "25px" }}>
            Excellent! You earned 5 gems! ��
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: "12px",
              marginBottom: "25px",
            }}
          >
            {[
              { label: "XP", value: "+50", color: theme.accent },
              { label: "Gems", value: "+5", color: "#60a5fa" },
              { label: "Hearts", value: `❤️ ${lives}`, color: theme.wrong },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: `${stat.color}15`,
                  padding: "18px 10px",
                  borderRadius: "18px",
                  border: `1px solid ${stat.color}30`,
                }}
              >
                <div
                  style={{
                    fontSize: "12px",
                    opacity: 0.6,
                    color: theme.text,
                    marginBottom: "5px",
                  }}
                >
                  {stat.label}
                </div>
                <div
                  style={{
                    fontSize: "22px",
                    fontWeight: "800",
                    color: stat.color,
                  }}
                >
                  {stat.value}
                </div>{" "}
              </div>
            ))}
          </div>
          <button
            onClick={moveToNextExercise}
            style={{
              background: `linear-gradient(135deg, ${theme.accent}, ${theme.accentDark})`,
              border: "none",
              padding: "18px",
              borderRadius: "20px",
              color: "white",
              fontWeight: "bold",
              fontSize: "18px",
              cursor: "pointer",
              width: "100%",
              boxShadow: `0 10px 30px ${theme.accent}40`,
            }}
          >
            Continue to Level {level + 1} →
          </button>
        </div>
        <style>{`@keyframes 
bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-20px)}}@keyframes slideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}`}</style>
      </div>
    );
  }
  const showShopSuggestion = consecutiveFails >= 5 && lives < 5 && gems >= 20;
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: theme.bg,
        fontFamily: "'Noto Sans Kannada','Noto Sans',system-ui,sans-serif",
        transition: "all 0.5s ease",
        padding: "15px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Bg orbs */}
      <div
        style={{
          position: "fixed",
          width: "500px",
          height: "500px",
          background: theme.accent,
          borderRadius: "50%",
          filter: "blur(160px)",
          top: "-15%",
          left: "-15%",
          opacity: 0.08,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "fixed",
          width: "400px",
          height: "400px",
          background: "#818cf8",
          borderRadius: "50%",
          filter: "bl ur(140px)",
          bottom: "-10%",
          right: "-10%",
          opacity: 0.1,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />{" "}
      <div
        style={{
          position: "fixed",
          width: "300px",
          height: "300px",
          background: "#f472b6",
          borderRadius: "50%",
          filter: "bl ur(120px)",
          top: "40%",
          right: "5%",
          opacity: 0.06,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <style>{` 
*{box-sizing:border-box;margin:0;padding:0} 
@import 
url('https://fonts.googleapis.com/css2?family=Noto+Sans+Kannada:wght@400;600;800&display =swap'); 
.chip{cursor:pointer;padding:14px 
20px;border-radius:16px;background:${theme.chipBg};transition:all 0.25s cubic-bezier(0.4,0,0.2,1);border:2px solid 
transparent;font-weight:600;user-select:none;-webkit-tap-highlight-color:transparent} 
.chip:hover:not(.disabled){transform:translateY(-3px);background:${theme.chipBgHover};border color:${theme.accent};box-shadow:0 8px 25px ${theme.accent}25} 
.chip:active:not(.disabled){transform:translateY(-1px) scale(0.98)} 
.chip.selected{background:linear-gradient(135deg,${theme.accent}30,${theme.accentDark}20);c olor:${theme.accent};border-color:${theme.accent};box-shadow:0 8px 25px ${theme.accent}30} 
.chip.matched{background:linear-gradient(135deg,${theme.accent},${theme.accentDark});color: white;border-color:${theme.accent};animation:matchPulse 0.6s ease} 
.chip.disabled{opacity:0.3;cursor:not-allowed;pointer-events:none} 
.feedback-pop{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);padding:25px 40px;border-radius:25px;text-align:center;font-weight:800;font-size:20px;animation:feedbackPo p 0.4s cubic-bezier(0.68,-0.55,0.265,1.55);z-index:1000;box-shadow:0 20px 60px rgba(0,0,0,0.5)} 
@keyframes feedbackPop{0%{transform:translate(-50%,-50%) 
scale(0);opacity:0}50%{transform:translate(-50%,-50%) 
scale(1.1)}100%{transform:translate(-50%,-50%) scale(1);opacity:1}} 
@keyframes matchPulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}} @keyframes 
slideUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}} @keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.02)}} `}</style>
      <div
        style={{
          zIndex: 1,
          width: "100%",
          maxWidth: "490px",
          minHeight: "88vh",
          height: "auto",
          margin: "0 auto",
          padding: "28px 24px",
          borderRadius: "36px",
          background: theme.glass,
          color: theme.text,
          display: "flex",
          flexDirection: "column",
          position: "relative",
          boxShadow: "0 30px 60px -15px rgba(0,0,0,0.6)",
          backdropFilter: "blur(30px)",
          border: theme.cardBorder,
          animation: "slideUp 0.5s ease",
        }}
      >
        {/* Stats Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "18px",
            flexWrap: "wrap",
            gap: "8px",
          }}
        >
          <div style={{ display: "flex", gap: "8px" }}>
            <div
              style={{
                background: `${theme.accent}18`,
                padding: "8px 14px",
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                border: `1px solid ${theme.accent}30`,
              }}
            >
              <span>⚡</span>
              <span style={{ fontWeight: "800", color: theme.accent }}>
                {streak}
              </span>
            </div>
            <div
              style={{
                background: "rgba(96,165,250,0.15)",
                padding: "8px 14px",
                borderRadius: "14px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                border: "1px solid rgba(96,165,250,0.3)",
                cursor: "pointer",
              }}
              onClick={() => setShowShop(true)}
            >
              {" "}
              <span>��</span>
              <span style={{ fontWeight: "800", color: "#60a5fa" }}>
                {gems}
              </span>{" "}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              gap: "4px",
              background: "rgba(248,113,113,0.15)",
              padding: "8px 12px",
              borderRadius: "14px",
              border: "1px solid rgba(248,113,113,0.3)",
            }}
          >
            {Array.from({ length: lives }).map((_, i) => (
              <span key={i} style={{ fontSize: "17px" }}>
                ❤️
              </span>
            ))}
          </div>
        </div>
        {/* Progress */}
        <div style={{ marginBottom: "22px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            {" "}
            <span
              style={{
                fontSize: "11px",
                fontWeight: "800",
                letterSpacing: "1.5px",
                opacity: 0.5,
                color: theme.text,
              }}
            >
              LEVEL {level} • {topicName.toUpperCase()}
            </span>
            <span
              style={{
                fontSize: "12px",
                fontWeight: "700",
                color: theme.accent,
              }}
            >
              {exercisesInCurrentLevel + 1}/{questionsPerLevel}
            </span>
          </div>
          <div
            style={{
              height: "8px",
              background: darkMode
                ? "rgba(255,255,255,0.08)"
                : "rgba(0,0,0,0.08)",
              borderRadius: " 8px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progressInLevel}%`,
                height: "100%",
                background: `linear-gradient(90deg,${theme.accent}, ${theme.accentDark})`,
                borderRadius: "8px",
                transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)",
                boxShadow: `0 0 12px ${theme.accent}50`,
              }}
            />{" "}
          </div>
        </div>
        {showShopSuggestion && (
          <div
            style={{
              background: "linear-gradient(135deg,#7c3aed,#4f46e5)",
              padding: "14px",
              borderRadius: "16px",
              marginBottom: "18px",
              textAlign: "center",
              cursor: "pointer",
              animation: "pulse 2s infinite",
              boxShadow: "0 10px 30px rgba(124,58,237,0.35)",
            }}
            onClick={() => setShowShop(true)}
          >
            <div style={{ fontSize: "18px", marginBottom: "4px" }}>
              �� Need more hearts?
            </div>{" "}
            <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.85)" }}>
              Tap to visit the Gem Shop!
            </div>
          </div>
        )}
        {/* Exercise Area */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "15px 0",
          }}
        >
          {/* MEMORY */}
          {currentExercise.type === "memory" && (
            <div style={{ textAlign: "center" }}>
              <h2
                style={{
                  fontSize: "15px",
                  opacity: 0.55,
                  marginBottom: "20px",
                  fontWeight: "600",
                  color: theme.textSecondary,
                  letterSpacing: "0.5px",
                }}
              >
                REMEMBER THIS WORD
              </h2>
              {isRevealed && (
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    border: `3px solid ${theme.accent}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    fontWeight: "800",
                    color: theme.accent,
                    margin: "0 auto 18px",
                  }}
                >
                  {Math.ceil(memoryTimer)}
                </div>
              )}
              <div
                style={{
                  margin: "20px 0 8px",
                  filter: isRevealed ? "none" : "blur(25px)",
                  opacity: isRevealed ? 1 : 0.15,
                  transition: "all 0.5s",
                  userSelect: "none",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <KannadaWord
                  word={currentExercise.question}
                  size="xlarge"
                  color={isRevealed ? theme.accent : theme.text}
                />
              </div>
              <div
                style={{
                  fontSize: "15px",
                  opacity: isRevealed ? 0.55 : 0,
                  marginBottom: "35px",
                  transition: "opacity 0.3s",
                  color: theme.textSecondary,
                  fontStyle: "italic",
                }}
              >
                {currentExercise.english}
              </div>{" "}
              {!isRevealed && (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit,minmax(135px,1fr))",
                    gap: "10px",
                  }}
                >
                  {" "}
                  {shuffledOptions.map((opt, idx) => (
                    <div
                      key={idx}
                      className="chip"
                      style={{ color: theme.text, textAlign: "center" }}
                      onClick={() =>
                        handleAnswer((opt.kn || opt) === currentExercise.answer)
                      }
                    >
                      {" "}
                      <KannadaWord word={opt} size="small" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {/* MATCH */}
          {currentExercise.type === "match" && (
            <div>
              <h2
                style={{
                  fontSize: "19px",
                  marginBottom: "22px",
                  textAlign: "center",
                  fontWeight: "700",
                  color: theme.text,
                }}
              >
                Match the pairs
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "12px",
                }}
              >
                {" "}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {shuffledLeftPairs.map((p, idx) => (
                    <div
                      key={idx}
                      className={`chip ${matchSelected.en === p.en ? "selected" : ""} ${matchedPairs.includes(p.en) ? "matched disabled" : ""}`}
                      style={{
                        color: theme.text,
                        textAlign: "center",
                        fontSize: "15px",
                      }}
                      onClick={() =>
                        !matchedPairs.includes(p.en) &&
                        setMatchSelected({ ...matchSelected, en: p.en })
                      }
                    >
                      {p.en}
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  {shuffledRightPairs.map((p, idx) => (
                    <div
                      key={idx}
                      className={`chip ${matchSelected.kn === (p.kn?.kn || p.kn) ? "selected" : ""} ${matchedPairs.includes(p.kn?.kn || p.kn) ? "matched disabled" : ""}`}
                      style={{ color: theme.text, textAlign: "center" }}
                      onClick={() => {
                        const knVal = p.kn?.kn || p.kn;
                        if (matchedPairs.includes(knVal)) return;
                        if (matchSelected.en) {
                          const correct =
                            currentExercise.pairs.find(
                              (pair) => pair.en === matchSelected.en,
                            )?.kn?.kn === knVal ||
                            currentExercise.pairs.find(
                              (pair) => pair.en === matchSelected.en,
                            )?.kn === knVal;
                          if (correct) {
                            const newMatched = [
                              ...matchedPairs,
                              matchSelected.en,
                              knVal,
                            ];
                            setMatchedPairs(newMatched);
                            setMatchSelected({ en: null, kn: null });
                            if (
                              newMatched.length >=
                              currentExercise.pairs.length * 2
                            )
                              setTimeout(() => handleAnswer(true), 500);
                          } else {
                            handleAnswer(false);
                            setMatchSelected({ en: null, kn: null });
                          }
                        } else {
                          setMatchSelected({ ...matchSelected, kn: knVal });
                        }
                      }}
                    >
                      <KannadaWord word={p.kn} size="small" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          {/* MCQ */}
          {currentExercise.type === "mcq" && (
            <div>
              <h2
                style={{
                  fontSize: "clamp(18px,5vw,24px)",
                  marginBottom: "30px",
                  textAlign: "center",
                  fontWeight: "700",
                  lineHeight: "1.5",
                  color: theme.text,
                }}
              >
                {currentExercise.question}
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "12px",
                }}
              >
                {shuffledOptions.map((opt, idx) => (
                  <div
                    key={idx}
                    className="chip"
                    style={{
                      padding: "18px 22px",
                      textAlign: "center",
                      color: theme.text,
                    }}
                    onClick={() =>
                      handleAnswer((opt.kn || opt) === currentExercise.answer)
                    }
                  >
                    {" "}
                    <KannadaWord word={opt} size="normal" />
                  </div>
                ))}
              </div>
            </div>
          )}
          {/* SCRAMBLE */}
          {currentExercise.type === "scramble" && (
            <div>
              <p
                style={{
                  opacity: 0.5,
                  fontSize: "12px",
                  textAlign: "center",
                  marginBottom: "6px",
                  fontWeight: "700",
                  letterSpacing: "1px",
                  color: theme.textSecondary,
                }}
              >
                TRANSLATE TO KANNADA
              </p>
              <h2
                style={{
                  margin: "0 0 28px",
                  textAlign: "center",
                  fontSize: "clamp(18px,5vw,22px)",
                  fontWeight: "700",
                  color: theme.text,
                }}
              >
                "{currentExercise.english}"
              </h2>
              <div
                style={{
                  minHeight: "70px",
                  borderBottom: `2px solid ${theme.accent}`,
                  marginBottom: "24px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "8px",
                  flexWrap: "wrap",
                  padding: "10px",
                }}
              >
                {scrambleResult.length === 0 ? (
                  <span
                    style={{
                      opacity: 0.3,
                      fontSize: "13px",
                      fontStyle: "italic",
                      color: theme.textSecondary,
                    }}
                  >
                    Tap words below to build your answer
                  </span>
                ) : (
                  scrambleResult.map((word, i) => (
                    <div
                      key={i}
                      className="chip selected"
                      style={{ color: theme.accent }}
                      onClick={() =>
                        setScrambleResult((prev) =>
                          prev.filter((_, idx) => idx !== i),
                        )
                      }
                    >
                      {" "}
                      <KannadaWord word={word} size="small" />
                    </div>
                  ))
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  justifyContent: "center",
                  gap: "8px",
                  marginBottom: "22px",
                }}
              >
                {" "}
                {currentExercise.jumbled.map((word, i) => {
                  const isUsed = scrambleResult.some(
                    (r) => (r.kn || r) === (word.kn || word),
                  );
                  return (
                    <div
                      key={i}
                      className={`chip ${isUsed ? "disabled" : ""}`}
                      style={{ color: theme.text }}
                      onClick={() =>
                        !isUsed && setScrambleResult([...scrambleResult, word])
                      }
                    >
                      {" "}
                      <KannadaWord word={word} size="small" />
                    </div>
                  );
                })}
              </div>
              <button
                onClick={() => {
                  const resultStr = JSON.stringify(
                    scrambleResult.map((w) => w.kn || w),
                  );
                  const answerStr = JSON.stringify(
                    currentExercise.answer.map((w) => w.kn || w),
                  );
                  handleAnswer(resultStr === answerStr);
                }}
                disabled={scrambleResult.length === 0}
                style={{
                  background:
                    scrambleResult.length === 0
                      ? theme.chipBg
                      : `linear-gradient(135deg,${theme.accent},${theme.accentDark})`,
                  border: "none",
                  width: "100%",
                  padding: "18px",
                  borderRadius: "18px",
                  color: "white",
                  fontWeight: "800",
                  fontSize: "16px",
                  cursor:
                    scrambleResult.length === 0 ? "not-allowed" : "pointer",
                  transition: "all 0.3s",
                  opacity: scrambleResult.length === 0 ? 0.4 : 1,
                  boxShadow:
                    scrambleResult.length > 0
                      ? `0 10px 30px ${theme.accent}40`
                      : "none",
                }}
              >
                CHECK ANSWER
              </button>
            </div>
          )}
        </div>
        {feedback && (
          <div
            className="feedback-pop"
            style={{
              background:
                feedback === "correct"
                  ? `linear-gradient(135deg,${theme.accent},${theme.accentDark})`
                  : `linear-gradient(135deg,${theme.wrong},#dc2626)`,
              color: "white",
            }}
          >
            <div style={{ fontSize: "38px", marginBottom: "8px" }}>
              {feedback === "correct" ? "✓" : "✗"}
            </div>
            {feedback === "correct" ? "Correct! +10 XP" : "Oops! Try again"}
          </div>
        )}
        <div
          style={{
            textAlign: "center",
            marginTop: "20px",
            cursor: "pointer",
            opacity: 0.35,
            fontSize: "11px",
            fontWeight: "700",
            letterSpacing: "1px",
            transition: "opacity 0.3s",
            userSelect: "none",
          }}
          onClick={() => setDarkMode(!darkMode)}
          onMouseEnter={(e) => (e.target.style.opacity = "0.65")}
          onMouseLeave={(e) => (e.target.style.opacity = "0.35")}
        >
          {darkMode ? "☀️ LIGHT MODE" : "�� DARK MODE"}
        </div>
      </div>
    </div>
  );
};
export default App;
