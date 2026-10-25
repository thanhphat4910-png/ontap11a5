/* ============================================================================
   Ôn Tập & Thi Thử THPT — script.js
   Cấu trúc: Home (8 môn) → Subject → Setup → Practice/Exam → Summary
   ============================================================================ */
/*
{
  id: "toan-45p-1-q1",
  type: "multiple-choice",
  content: "Tính $2^3 \\cdot 2^2$.",
  options: [
    { id: "a", text: "16" },
    { id: "b", text: "32" },   ← đáp án đúng
    { id: "c", text: "64" },
    { id: "d", text: "8" }
  ],
  correctOptionId: "b",
  shuffleOptions: true,     // false nếu cần giữ thứ tự A/B/C/D
  score: 0.25,
  explanation: "$2^3 \\cdot 2^2 = 2^{3+2} = 2^5 = 32$."
}
đúng sai
{
  id: "toan-45p-1-q2",
  type: "true-false",
  content: "Chọn Đúng hoặc Sai cho mỗi phát biểu sau:",
  statements: [
    { id: "a", text: "Số 7 là số nguyên tố.", correct: true },
    { id: "b", text: "$\\sqrt{4} = -2$.", correct: false },
    { id: "c", text: "Hàm số $y = x^2$ nghịch biến trên $(-\\infty; 0)$.", correct: true },
    { id: "d", text: "Số 0 là số nguyên âm.", correct: false }
  ],
  score: 1,
  explanation: "b) Sai — căn bậc hai số học không âm. d) Sai — 0 không âm, không dương."
}
  trả lời ngắn
  {
  id: "toan-45p-1-q3",
  type: "short-answer",
  content: "Giá trị $\\sqrt{2}$ (làm tròn đến hàng phần trăm) là:",
  answer: "1,41",
  acceptedAnswers: ["1,41", "1.41"],   // các biến thể được chấp nhận
  maxLength: 4,
  score: 0.5,
  explanation: "$\\sqrt{2} \\approx 1,4142...$, làm tròn đến hàng phần trăm là 1,41."
}
  điền khuyết
  {
  id: "dia-ly-15p-1-q1",
  type: "fill-blank",
  content: "Thủ đô của Việt Nam là {{b1}}, thành phố lớn nhất là {{b2}}.",
  blanks: [
    { id: "b1", correctAnswerId: "hn" },
    { id: "b2", correctAnswerId: "hcm" }
  ],
  options: [
    { id: "hn", text: "Hà Nội" },
    { id: "hcm", text: "TP. Hồ Chí Minh" },
    { id: "dn", text: "Đà Nẵng" },   ← nhiễu
    { id: "hp", text: "Hải Phòng" }  ← nhiễu
  ],
  allowReuse: false,
  score: 1,
  explanation: "Hà Nội là thủ đô; TP. HCM là thành phố đông dân và diện tích đô thị lớn nhất."
}
  bảng số liệu
  {
  id: "dia-ly-15p-1-q2",
  type: "multiple-choice",
  content: "Cho bảng số liệu dân số Việt Nam. Dân số năm 2020 là bao nhiêu triệu người?",
  table: {
    headers: ["Năm", "2000", "2010", "2020"],
    rows: [
      ["Dân số (triệu người)", "77,6", "86,9", "97,3"]
    ]
  },
  options: [
    { id: "a", text: "77,6" },
    { id: "b", text: "86,9" },
    { id: "c", text: "97,3" },
    { id: "d", text: "100,0" }
  ],
  correctOptionId: "c",
  score: 0.25
}
  biểu đồ
  {
  id: "demo-1-q2",
  type: "multiple-choice",
  content: "Quan sát biểu đồ. Năm nào có sản lượng lúa cao nhất?",
  chart: {
    type: "bar",                              // "bar" | "line" | "pie" | "doughnut"
    title: "Sản lượng lúa Việt Nam (triệu tấn)",
    labels: ["2015", "2017", "2019", "2021"],
    datasets: [
      {
        label: "Sản lượng lúa",
        data: [45.2, 42.8, 43.4, 43.9],
        backgroundColor: "#2563eb"           // màu cột
      }
    ],
    yAxisLabel: "Triệu tấn"                  // bỏ qua được
  },
  options: [
    { id: "a", text: "2015" },
    { id: "b", text: "2017" },
    { id: "c", text: "2019" },
    { id: "d", text: "2021" }
  ],
  correctOptionId: "a",
  score: 0.25
}
biểu đồ so sánh 2 chỉ tiêu
chart: {
  type: "bar",
  title: "Sản lượng lúa và ngô",
  labels: ["2015", "2017", "2019"],
  datasets: [
    { label: "Lúa", data: [45.2, 42.8, 43.4], backgroundColor: "#2563eb" },
    { label: "Ngô", data: [5.2, 4.8, 5.0], backgroundColor: "#f59e0b" }
  ],
  yAxisLabel: "Triệu tấn"
}

biểu đồ tròn

chart: {
  type: "pie",
  title: "Cơ cấu dân số theo nhóm tuổi",
  labels: ["0–14", "15–64", "65+"],
  datasets: [
    { label: "Tỷ lệ (%)", data: [23, 68, 9],
      backgroundColor: ["#2563eb", "#16a34a", "#f59e0b"] }
  ]
}
*/

"use strict";

/* ====== 1. HẰNG SỐ ====== */
const STORAGE_KEY = "quizApp.v1";
const APP_VERSION = 1;
const MAX_SHORT_ANSWER_LENGTH = 4;

const QUESTION_TYPE_ORDER = {
  "multiple-choice": 1,
  "true-false": 2,
  "short-answer": 3,
  "fill-blank": 4,
};

/* ====== ICONS (SVG) ====== */
const ICONS = {
  settings: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
  user: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  soundOn: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>`,
  soundOff: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/></svg>`,
  sun: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
  moon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
  calculator: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="8" y2="10.01"/><line x1="12" y1="10" x2="12" y2="10.01"/><line x1="16" y1="10" x2="16" y2="10.01"/><line x1="8" y1="14" x2="8" y2="14.01"/><line x1="12" y1="14" x2="12" y2="14.01"/><line x1="16" y1="14" x2="16" y2="14.01"/><line x1="8" y1="18" x2="8" y2="18.01"/><line x1="12" y1="18" x2="12" y2="18.01"/><line x1="16" y1="18" x2="16" y2="18.01"/></svg>`,
  atom: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><path d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5z"/><path d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5z"/></svg>`,
  flask: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 3h6"/><path d="M10 3v6L4 19a2 2 0 0 0 1.7 3h12.6a2 2 0 0 0 1.7-3L14 9V3"/><path d="M6 15h12"/></svg>`,
  leaf: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>`,
  code: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  book: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>`,
  globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  languages: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>`,
  bookOpen: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
  fileText: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
  history: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><polyline points="3 3 3 8 8 8"/><polyline points="12 7 12 12 15 15"/></svg>`,
  award: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.5 13.5 17 22l-5-3-5 3 1.5-8.5"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  chart: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>`,
};

const SUBJECT_ICON_MAP = {
  toan: "calculator",
  "vat-ly": "atom",
  "hoa-hoc": "flask",
  "sinh-hoc": "leaf",
  "tin-hoc": "code",
  "lich-su": "book",
  "dia-ly": "globe",
  "tieng-anh": "languages",
};

/* ====== 2. KHO ĐỀ ====== */
const QUESTION_BANK = [
  //======= toán==============
  {
    id: "toan",
    name: "Toán",
    chapters: [],
  },
  //======= vật lý ==============
  { id: "vat-ly", name: "Vật lý", chapters: [] },
  //======= Hóa học ==============
  { id: "hoa-hoc", name: "Hóa học", chapters: [] },
  //======= Sinh học ==============
  { id: "sinh-hoc", name: "Sinh học", chapters: [] },
  //======= Tin học ==============
  { id: "tin-hoc", name: "Tin học", chapters: [] },
  //======= Lịch sử ==============
  //======= Lịch sử ==============
  {
    id: "lich-su",
    name: "Lịch sử",
    chapters: [
      {
        id: "lichsugiuaky-ontap-b1",
        name: "Ôn kiểm tra giữa kỳ I bài 1",
        exams: [
          {
            id: "lichsugiuaky-ontap-b1-exam",
            title: "Đề cương ôn tập giữa kì I môn Lịch sử lớp 11 (Bài 1)",
            examType: "Giữa kì I",
            description:
              "Đề cương ôn tập giữa kì I — Bài 1: Một số vấn đề chung về cách mạng tư sản.",
            duration: 45,
            questions: [
              {
                id: "lichsugiuaky-ontap-b1-q1",
                type: "multiple-choice",
                content:
                  "Nội dung nào sau đây là mục tiêu chung của các cuộc cách mạng tư sản?",
                options: [
                  { id: "a", text: "Thiết lập chế độ quân chủ chuyên chế." },
                  {
                    id: "b",
                    text: "Xoá bỏ những rào cản kìm hãm sự phát triển của chủ nghĩa tư bản.",
                  },
                  { id: "c", text: "Duy trì nền kinh tế nông nghiệp lạc hậu." },
                  {
                    id: "d",
                    text: "Bảo vệ quyền lợi tuyệt đối cho tầng lớp tăng lữ.",
                  },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b1-q2",
                type: "multiple-choice",
                content:
                  "Giai cấp nào sau đây đóng vai trò lãnh đạo trong cuộc Cách mạng tư sản Anh?",
                options: [
                  { id: "a", text: "Giai cấp tư sản và Quý tộc mới." },
                  { id: "b", text: "Giai cấp công nhân và nông dân." },
                  { id: "c", text: "Tầng lớp chủ nô và nô lệ." },
                  { id: "d", text: "Tầng lớp tăng lữ và quý tộc phong kiến." },
                ],
                correctOptionId: "a",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b1-q3",
                type: "multiple-choice",
                content:
                  "Một trong những tiền đề về tư tưởng của Cách mạng tư sản Pháp là gì?",
                options: [
                  { id: "a", text: "Triết học Ánh sáng." },
                  { id: "b", text: "Thanh giáo." },
                  { id: "c", text: "Đạo Tin Lành." },
                  { id: "d", text: "Nho giáo." },
                ],
                correctOptionId: "a",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b1-q4",
                type: "multiple-choice",
                content:
                  "Nhiệm vụ dân chủ của các cuộc cách mạng tư sản nhằm hướng tới việc gì?",
                options: [
                  {
                    id: "a",
                    text: "Giải phóng dân tộc khỏi ách thống trị của thực dân.",
                  },
                  {
                    id: "b",
                    text: "Xoá bỏ chế độ phong kiến chuyên chế, xác lập nền dân chủ tư sản.",
                  },
                  { id: "c", text: "Thống nhất thị trường dân tộc." },
                  {
                    id: "d",
                    text: "Thiết lập chế độ cai trị độc đoán của nhà vua.",
                  },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b1-q5",
                type: "multiple-choice",
                content:
                  "Động lực của các cuộc cách mạng tư sản bao gồm những lực lượng nào?",
                options: [
                  { id: "a", text: "Chỉ có giai cấp tư sản." },
                  { id: "b", text: "Chỉ có tầng lớp quý tộc." },
                  {
                    id: "c",
                    text: "Giai cấp lãnh đạo và quần chúng nhân dân.",
                  },
                  { id: "d", text: "Các thế lực phản động từ bên ngoài." },
                ],
                correctOptionId: "c",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b1-q6",
                type: "multiple-choice",
                content:
                  "Nhân vật nào sau đây là đại diện tiêu biểu của Triết học Ánh sáng Pháp?",
                options: [
                  { id: "a", text: "S. Mông-te-xki-ơ." },
                  { id: "b", text: "Ô-li-vơ Crôm-oen." },
                  { id: "c", text: "Gióoc-giơ Oa-sinh-tơn." },
                  { id: "d", text: "Lu-i XVI." },
                ],
                correctOptionId: "a",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b1-q7",
                type: "multiple-choice",
                content:
                  "Trong cuộc Chiến tranh giành độc lập của 13 thuộc địa Anh ở Bắc Mỹ, lực lượng lãnh đạo là liên minh giữa",
                options: [
                  { id: "a", text: "tư sản và quý tộc mới." },
                  { id: "b", text: "tư sản và chủ nô." },
                  { id: "c", text: "nông dân và thợ thủ công." },
                  { id: "d", text: "quý tộc cũ và tăng lữ." },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b1-q8",
                type: "multiple-choice",
                content: "Kết quả chung của các cuộc cách mạng tư sản là gì?",
                options: [
                  { id: "a", text: "Duy trì tình trạng phong kiến cát cứ." },
                  {
                    id: "b",
                    text: "Lật đổ chế độ cũ, thiết lập nhà nước tư sản.",
                  },
                  { id: "c", text: "Chế độ quân chủ chuyên chế được củng cố." },
                  {
                    id: "d",
                    text: "Chủ nghĩa xã hội được xác lập trên toàn thế giới.",
                  },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b1-q9",
                type: "multiple-choice",
                content:
                  "Nội dung nào sau đây phản ánh tiền đề chính trị của các cuộc cách mạng tư sản?",
                options: [
                  {
                    id: "a",
                    text: "Sự xuất hiện của các công trường thủ công.",
                  },
                  {
                    id: "b",
                    text: "Chính sách cai trị độc đoán của nhà nước phong kiến hoặc thực dân.",
                  },
                  {
                    id: "c",
                    text: "Mâu thuẫn giữa nông dân và quý tộc về ruộng đất.",
                  },
                  { id: "d", text: "Sự ra đời của Triết học Ánh sáng." },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b1-q10",
                type: "multiple-choice",
                content:
                  'Cuộc cách mạng tư sản nào được đánh giá là "cuộc cách mạng vĩ đại", triệt để nhất?',
                options: [
                  { id: "a", text: "Cách mạng tư sản Anh." },
                  { id: "b", text: "Cách mạng tư sản Pháp." },
                  { id: "c", text: "Chiến tranh giành độc lập ở Bắc Mỹ." },
                  { id: "d", text: "Thống nhất nước Đức." },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b1-q11",
                type: "multiple-choice",
                content:
                  "Trước khi cách mạng bùng nổ, nền nông nghiệp ở Pháp có đặc điểm gì?",
                options: [
                  {
                    id: "a",
                    text: "Phát triển theo hướng sản xuất hàng hoá mạnh mẽ.",
                  },
                  {
                    id: "b",
                    text: "Rất lạc hậu, năng suất thấp, đất đai bỏ hoang nhiều.",
                  },
                  {
                    id: "c",
                    text: "Đã hoàn toàn xoá bỏ quan hệ sản xuất phong kiến.",
                  },
                  {
                    id: "d",
                    text: "Là nguồn cung cấp nguyên liệu chính cho toàn thế giới.",
                  },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b1-q12",
                type: "multiple-choice",
                content:
                  "G. G. Rút-xô, đại diện Triết học Ánh sáng Pháp, chủ trương thành lập chế độ nào?",
                options: [
                  { id: "a", text: "Chế độ quân chủ lập hiến." },
                  { id: "b", text: "Chế độ cộng hoà." },
                  { id: "c", text: "Chế độ quân chủ chuyên chế." },
                  { id: "d", text: "Chế độ độc tài quân sự." },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b1-q13",
                type: "multiple-choice",
                content:
                  "Cuối thế kỉ XVIII, giai cấp tư sản Pháp cần có hệ tư tưởng mới khi làm cách mạng để",
                options: [
                  {
                    id: "a",
                    text: "bảo vệ quyền lợi của giai cấp phong kiến.",
                  },
                  {
                    id: "b",
                    text: "tập hợp quần chúng nhân dân và chống lại hệ tư tưởng phong kiến bảo thủ.",
                  },
                  {
                    id: "c",
                    text: "duy trì niềm tin vào quyền lực tuyệt đối của nhà vua.",
                  },
                  {
                    id: "d",
                    text: "ngăn cản sự phát triển của công thương nghiệp.",
                  },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b1-q14",
                type: "multiple-choice",
                content:
                  "Sự khác biệt giữa nhiệm vụ dân tộc và nhiệm vụ dân chủ trong cách mạng tư sản là gì?",
                options: [
                  {
                    id: "a",
                    text: "Nhiệm vụ dân tộc tập trung vào việc lật đổ vua, nhiệm vụ dân chủ tập trung vào đánh đuổi ngoại xâm.",
                  },
                  {
                    id: "b",
                    text: "Nhiệm vụ dân tộc hướng tới thống nhất thị trường hoặc giải phóng dân tộc; nhiệm vụ dân chủ hướng tới xoá bỏ chuyên chế.",
                  },
                  {
                    id: "c",
                    text: "Hai nhiệm vụ này hoàn toàn khác nhau về mục tiêu cuối cùng.",
                  },
                  {
                    id: "d",
                    text: "Nhiệm vụ dân tộc chỉ dành cho tầng lớp quý tộc, nhiệm vụ dân chủ dành cho tư sản.",
                  },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b1-q15",
                type: "multiple-choice",
                content:
                  "Trong Cách mạng tư sản Pháp, quần chúng nhân dân được coi là động lực của cách mạng tư sản vì",
                options: [
                  {
                    id: "a",
                    text: "họ là lực lượng trực tiếp tham gia đấu tranh, quyết định thắng lợi của cách mạng.",
                  },
                  {
                    id: "b",
                    text: "họ là những người đề ra hệ tư tưởng cho giai cấp tư sản.",
                  },
                  {
                    id: "c",
                    text: "họ nắm quyền lãnh đạo tối cao sau khi cách mạng thành công.",
                  },
                  {
                    id: "d",
                    text: "họ có quyền lợi hoàn toàn thống nhất với giai cấp tư sản trong mọi giai đoạn.",
                  },
                ],
                correctOptionId: "a",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b1-q16",
                type: "multiple-choice",
                content:
                  "Đặc điểm nổi bật của tiền đề kinh tế dẫn đến cách mạng tư sản là gì?",
                options: [
                  {
                    id: "a",
                    text: "Kinh tế tư bản chủ nghĩa phát triển trong lòng chế độ phong kiến hoặc thuộc địa.",
                  },
                  {
                    id: "b",
                    text: "Chế độ phong kiến tạo mọi điều kiện thuận lợi cho công thương nghiệp phát triển.",
                  },
                  {
                    id: "c",
                    text: "Kinh tế nông nghiệp lạc hậu là động lực chính thức thúc đẩy tư sản làm cách mạng.",
                  },
                  {
                    id: "d",
                    text: "Sự biến mất hoàn toàn của các rào cản thuế quan phong kiến.",
                  },
                ],
                correctOptionId: "a",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b1-q17",
                type: "multiple-choice",
                content:
                  "Quý tộc mới ở Anh khác với quý tộc phong kiến cũ ở điểm nào?",
                options: [
                  {
                    id: "a",
                    text: "Họ có quyền lực chính trị cao hơn nhà vua.",
                  },
                  {
                    id: "b",
                    text: "Họ kinh doanh theo phương thức tư bản chủ nghĩa.",
                  },
                  { id: "c", text: "Họ kiên quyết bảo vệ giáo hội Anh giáo." },
                  {
                    id: "d",
                    text: "Họ không có mâu thuẫn gì với chế độ quân chủ.",
                  },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b1-q18",
                type: "multiple-choice",
                content:
                  "Ý nghĩa quan trọng nhất của cuộc Chiến tranh giành độc lập của 13 thuộc địa Anh ở Bắc Mỹ là gì?",
                options: [
                  {
                    id: "a",
                    text: "Thiết lập chế độ quân chủ lập hiến đầu tiên trên thế giới.",
                  },
                  {
                    id: "b",
                    text: "Giải phóng dân tộc và lập nên nhà nước tư sản đầu tiên ngoài châu Âu.",
                  },
                  {
                    id: "c",
                    text: "Xoá bỏ hoàn toàn chế độ nô lệ ở miền Nam nước Mỹ.",
                  },
                  {
                    id: "d",
                    text: "Biến Mỹ thành trung tâm công nghiệp lớn nhất châu Âu.",
                  },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b1-q19",
                type: "multiple-choice",
                content:
                  "Triết học Ánh sáng Pháp có vai trò gì đối với Cách mạng tư sản Pháp?",
                options: [
                  {
                    id: "a",
                    text: 'Là "ngọn cờ" tôn giáo để tập hợp quần chúng.',
                  },
                  {
                    id: "b",
                    text: "Là nền tảng lý luận và vũ khí tư tưởng chuẩn bị cho cuộc cách mạng.",
                  },
                  {
                    id: "c",
                    text: "Là công cụ để nhà vua xoa dịu sự phẫn nộ của dân nghèo.",
                  },
                  {
                    id: "d",
                    text: "Là phương tiện để duy trì trật tự xã hội cũ.",
                  },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b1-q20",
                type: "multiple-choice",
                content:
                  'Cách mạng tư sản Anh thế kỉ XVII mượn ngọn cờ "Thanh giáo" vì',
                options: [
                  {
                    id: "a",
                    text: "giai cấp tư sản chưa có hệ tư tưởng riêng để tập hợp quần chúng.",
                  },
                  {
                    id: "b",
                    text: "Thanh giáo ủng hộ quyền lực tuyệt đối của nhà vua.",
                  },
                  {
                    id: "c",
                    text: "Thanh giáo là tôn giáo chính thống của nhà nước Anh.",
                  },
                  {
                    id: "d",
                    text: "Thanh giáo giúp duy trì các đặc quyền của quý tộc cũ.",
                  },
                ],
                correctOptionId: "a",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b1-q21",
                type: "multiple-choice",
                content:
                  "Mâu thuẫn bao trùm trong xã hội Pháp trước cách mạng là mâu thuẫn giữa",
                options: [
                  { id: "a", text: "giai cấp tư sản với giai cấp công nhân." },
                  {
                    id: "b",
                    text: "Đẳng cấp thứ ba với các đẳng cấp đặc quyền (Tăng lữ, Quý tộc).",
                  },
                  { id: "c", text: "các nước đế quốc với nhân dân thuộc địa." },
                  { id: "d", text: "thợ thủ công với các chủ xưởng." },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b1-q22",
                type: "multiple-choice",
                content:
                  "Nhận xét nào sau đây là đúng về tính chất của các cuộc cách mạng tư sản?",
                options: [
                  {
                    id: "a",
                    text: "Là những cuộc cách mạng triệt để, xoá bỏ mọi sự áp bức trong xã hội.",
                  },
                  {
                    id: "b",
                    text: "Là những cuộc cách mạng nhằm thay thế hình thức bóc lột này bằng hình thức bóc lột khác.",
                  },
                  {
                    id: "c",
                    text: "Là những cuộc cách mạng chỉ mang lại lợi ích cho tầng lớp nông dân.",
                  },
                  {
                    id: "d",
                    text: "Là những cuộc cách mạng không làm thay đổi bản chất của chế độ phong kiến.",
                  },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b1-q23",
                type: "multiple-choice",
                content:
                  "Từ kết quả của các cuộc cách mạng tư sản, có thể rút ra bài học gì về vai trò của lãnh đạo?",
                options: [
                  {
                    id: "a",
                    text: "Cách mạng chỉ thành công khi có sự lãnh đạo của các thế lực phong kiến.",
                  },
                  {
                    id: "b",
                    text: "Giai cấp lãnh đạo phải đại diện cho phương thức sản xuất tiến bộ và biết tập hợp quần chúng.",
                  },
                  {
                    id: "c",
                    text: "Lãnh đạo không quan trọng bằng sức mạnh vũ khí.",
                  },
                  {
                    id: "d",
                    text: "Giai cấp tư sản luôn là lãnh đạo duy nhất và tuyệt đối trong mọi cuộc cách mạng.",
                  },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b1-q24",
                type: "multiple-choice",
                content:
                  "Điểm chung về nhiệm vụ giữa Cách mạng tư sản Pháp và Chiến tranh giành độc lập ở Bắc Mỹ là gì?",
                options: [
                  {
                    id: "a",
                    text: "Đều nhằm mục tiêu giải phóng dân tộc khỏi ách thống trị thực dân.",
                  },
                  {
                    id: "b",
                    text: "Đều nhằm lật đổ chế độ quân chủ chuyên chế trong nước.",
                  },
                  {
                    id: "c",
                    text: "Đều mở đường cho chủ nghĩa tư bản phát triển.",
                  },
                  {
                    id: "d",
                    text: "Đều thiết lập chế độ cộng hoà ngay sau khi cách mạng bùng nổ.",
                  },
                ],
                correctOptionId: "c",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b1-q25",
                type: "multiple-choice",
                content:
                  'Cách mạng tư sản Pháp cuối thế kỉ XVIII là một cuộc "cách mạng vĩ đại" vì',
                options: [
                  {
                    id: "a",
                    text: "diễn ra trong thời gian dài nhất lịch sử.",
                  },
                  {
                    id: "b",
                    text: "giải quyết triệt để các nhiệm vụ dân tộc và dân chủ, có ảnh hưởng quốc tế sâu rộng.",
                  },
                  {
                    id: "c",
                    text: "không gây ra bất kỳ tổn thất nào về người và của.",
                  },
                  {
                    id: "d",
                    text: "được lãnh đạo bởi liên minh tư sản và quý tộc mới.",
                  },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b1-q26",
                type: "multiple-choice",
                content:
                  "Một trong những hạn chế chung của các cuộc cách mạng tư sản là gì?",
                options: [
                  { id: "a", text: "Không thiết lập được nhà nước tư sản." },
                  {
                    id: "b",
                    text: "Chưa mang lại quyền lợi thực sự cho đa số quần chúng nhân dân lao động.",
                  },
                  {
                    id: "c",
                    text: "Ngăn cản sự phát triển của lực lượng sản xuất.",
                  },
                  {
                    id: "d",
                    text: "Làm cho chế độ phong kiến trở nên vững mạnh hơn.",
                  },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b1-q27",
                type: "multiple-choice",
                content:
                  "Nội dung nào sau đây phản ánh đúng mối quan hệ giữa kinh tế và chính trị trong các cuộc cách mạng tư sản?",
                options: [
                  {
                    id: "a",
                    text: "Kinh tế phát triển độc lập, không chịu tác động của chính trị.",
                  },
                  {
                    id: "b",
                    text: "Sự phát triển kinh tế tư bản chủ nghĩa đòi hỏi phải thay đổi chế độ chính trị phù hợp.",
                  },
                  {
                    id: "c",
                    text: "Chế độ chính trị phong kiến luôn thúc đẩy kinh tế tư bản chủ nghĩa phát triển.",
                  },
                  {
                    id: "d",
                    text: "Cách mạng chính trị nổ ra chỉ để giải quyết các vấn đề tôn giáo đơn thuần.",
                  },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b1-q28",
                type: "multiple-choice",
                content:
                  "Nội dung nào sau đây minh chứng cho tính chất giải phóng dân tộc của Cách mạng tư sản Mỹ?",
                options: [
                  {
                    id: "a",
                    text: "Lật đổ sự thống trị của thực dân Anh, thành lập quốc gia mới.",
                  },
                  {
                    id: "b",
                    text: "Xoá bỏ đặc quyền của giáo hội Thiên chúa giáo.",
                  },
                  {
                    id: "c",
                    text: "Ban hành Hiến pháp xác lập quyền bầu cử cho mọi người dân.",
                  },
                  {
                    id: "d",
                    text: "Tịch thu toàn bộ ruộng đất của các chủ nô miền Nam.",
                  },
                ],
                correctOptionId: "a",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b1-q29",
                type: "multiple-choice",
                content:
                  "Điểm tương đồng giữa tư tưởng của Mông-te-xki-ơ và Vôn-te là gì?",
                options: [
                  {
                    id: "a",
                    text: "Đều muốn duy trì nguyên vẹn quyền lực của nhà vua phong kiến.",
                  },
                  {
                    id: "b",
                    text: "Đều hướng tới việc bảo vệ quyền tự do và tư hữu của công dân.",
                  },
                  {
                    id: "c",
                    text: "Đều chủ trương xoá bỏ triệt để mọi hình thức nhà nước.",
                  },
                  {
                    id: "d",
                    text: "Đều coi tôn giáo là nền tảng duy nhất của xã hội.",
                  },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b1-q30",
                type: "multiple-choice",
                content:
                  "Sự kiện quần chúng Pháp phá ngục Ba-xti mang biểu tượng gì cho các cuộc cách mạng tư sản sau này?",
                options: [
                  { id: "a", text: "Sức mạnh của quân đội chuyên nghiệp." },
                  {
                    id: "b",
                    text: "Tinh thần đoàn kết quốc tế của giai cấp tư sản.",
                  },
                  {
                    id: "c",
                    text: "Sức mạnh của quần chúng nhân dân trong việc lật đổ chế độ độc tài, áp bức.",
                  },
                  {
                    id: "d",
                    text: "Sự sụp đổ của nền kinh tế công thương nghiệp.",
                  },
                ],
                correctOptionId: "c",
                shuffleOptions: true,
                score: 0.25,
              },
              //====ds====
              {
                id: "lichsugiuaky-ontap-b1-q31",
                type: "true-false",
                content:
                  "Đọc đoạn tư liệu sau đây: Tư liệu 1: “Tất cả mọi người sinh ra có quyền bình đẳng. Tạo hóa cho họ những quyền không ai có thể xâm phạm được; trong những quyền ấy, có quyền được sống, quyền tự do và quyền mưu cầu hạnh phúc”. (Tuyên ngôn Độc lập của Mỹ năm 1776). Tư liệu 2: “Điều 1. Con người sinh ra đều có quyền tự do và bình đẳng. Những sự phân biệt xã hội chỉ có thể dựa trên lợi ích chung. Điều 17. Quyền tư hữu là quyền bất khả xâm phạm và thiêng liêng không ai có thể bị tước bỏ”. (Tuyên ngôn Nhân quyền và Dân quyền (Pháp), năm 1789)",
                statements: [
                  {
                    id: "a",
                    text: "Bản Tuyên ngôn Nhân quyền và Dân quyền ra đời từ cuộc cách mạng tư sản Pháp cuối thế kỉ XVIII.",
                    correct: true,
                  },
                  {
                    id: "b",
                    text: "Điểm chung của Tuyên ngôn Độc lập của nước Mĩ và Tuyên ngôn Nhân quyền và Dân quyền của nước Pháp là đề cao quyền con người và quyền công dân.",
                    correct: true,
                  },
                  {
                    id: "c",
                    text: "Bản Tuyên ngôn Nhân quyền và Dân quyền của nước Pháp năm 1789 không đề cao quyền tư hữu cá nhân vì đó là biểu hiện cho sự phân biệt giàu - nghèo trong xã hội.",
                    correct: false,
                  },
                  {
                    id: "d",
                    text: "Trong Tuyên ngôn Độc lập của nước Việt Nam Dân chủ Cộng hòa (2/9/1945), Chủ tịch Hồ Chí Minh đã trích dẫn những câu nói nổi tiếng trong bản Tuyên ngôn Độc lập của nước Mĩ và Tuyên ngôn Nhân quyền và Dân quyền của nước Pháp.",
                    correct: true,
                  },
                ],
                score: 1,
              },
              {
                id: "lichsugiuaky-ontap-b1-q32",
                type: "true-false",
                content:
                  "Đọc đoạn thông tin sau đây: “Các cuộc cách mạng tư sản có hai nhiệm vụ cơ bản là dân tộc và dân chủ. Nhiệm vụ dân tộc là xoá bỏ tình trạng phong kiến cát cứ, đánh đuổi thực dân, giải phóng dân tộc, thống nhất thị trường, tạo thành một quốc gia dân tộc gồm đầy đủ bốn yếu tố: lãnh thổ chung, ngôn ngữ chung, nền văn hóa chung và nền kinh tế chung. Nhiệm vụ dân chủ thể hiện thông qua việc xoá bỏ chế độ phong kiến chuyên chế, xác lập nền dân chủ tư sản, mỗi người dân đều có quyền tự do chính trị, tự do kinh doanh và có quyền tư hữu”. (Đỗ Thanh Bình (chủ biên), Sách giáo khoa Lịch sử 11 bộ Cánh diều, NXB Đại học Sư phạm, 2023, tr 9).",
                statements: [
                  {
                    id: "a",
                    text: "Một trong những nhiệm vụ cơ bản của các cuộc cách mạng tư sản là nhiệm vụ dân tộc.",
                    correct: true,
                  },
                  {
                    id: "b",
                    text: "Cách mạng tư sản Pháp đã xoá bỏ chế độ phong kiến chuyên chế, giải quyết vấn đề ruộng đất cho nông dân. Như vậy, cách mạng tư sản Pháp đã thực hiện nhiệm vụ dân chủ.",
                    correct: true,
                  },
                  {
                    id: "c",
                    text: "Chiến tranh giành độc lập của 13 thuộc địa Anh ở Bắc Mĩ cuối thế kỉ XVIII chỉ thực hiện nhiệm vụ dân tộc.",
                    correct: false,
                  },
                  {
                    id: "d",
                    text: "Cách mạng tư sản Pháp cuối thế kỉ XVIII vừa thực hiện nhiệm vụ dân tộc, vừa thực hiện nhiệm vụ dân chủ.",
                    correct: true,
                  },
                ],
                score: 1,
              },
              {
                id: "lichsugiuaky-ontap-b1-q33",
                type: "true-false",
                content:
                  "Đọc đoạn thông tin sau đây: “Các cuộc cách mạng tư sản đều giành thắng lợi, lật đổ chế độ phong kiến, thực dân và thiết lập chế độ tư bản chủ nghĩa. Do điều kiện lịch sử ở mỗi nước khác nhau nên thắng lợi của các cuộc cách mạng tư sản cũng khác nhau. Cách mạng tư sản Anh đã lật đổ chế độ quân chủ chuyên chế, thiết lập chế độ quân chủ lập hiến. Chiến tranh giành độc lập của 13 thuộc địa Anh ở Bắc Mĩ đã lật đổ sự thống trị của thực dân Anh, giành được độc lập dân tộc. Cách mạng tư sản Pháp đã lật đổ chế độ quân chủ chuyên chế, thiết lập chế độ cộng hòa” (Đỗ Thanh Bình (chủ biên), Sách giáo khoa Lịch sử 11 bộ Cánh diều, NXB Đại học Sư phạm, 2023, tr 9).",
                statements: [
                  {
                    id: "a",
                    text: "Mức độ thắng lợi của các cuộc cách mạng tư sản phụ thuộc vào điều kiện lịch sử của mỗi nước.",
                    correct: true,
                  },
                  {
                    id: "b",
                    text: "Sau cuộc cách mạng tư sản thế kỉ XVII, nước Anh thiết lập chế độ Cộng hòa.",
                    correct: false,
                  },
                  {
                    id: "c",
                    text: "Điểm chung của các cuộc cách mạng tư sản là thiết lập chế độ tư bản chủ nghĩa, mở đường cho kinh tế hàng hóa phát triển.",
                    correct: true,
                  },
                  {
                    id: "d",
                    text: "Cách mạng tư sản Anh, Pháp, Mĩ thế kỉ XVII - XVIII đều lật đổ chế độ phong kiến, thiết lập chế độ quân chủ lập hiến.",
                    correct: false,
                  },
                ],
                score: 1,
              },
              {
                id: "lichsugiuaky-ontap-b1-q34",
                type: "true-false",
                content:
                  "Đọc đoạn thông tin sau đây: Tình hình chính trị của nước Anh trước cách mạng: “Ở Anh, nhà vua nắm quyền lực tối cao và vô hạn. Vua Anh tôn trọng quyền quyết định của Quốc hội trong xây dựng luật pháp. Vua đứng đầu Giáo hội Anh (Anh giáo), tiền hành đàn áp các tín đồ Thanh giáo (tôn giáo cải cách), lập ra các tòa án để buộc tội những người chống đối” (Vũ Minh Giang (chủ biên), Sách giáo khoa Lịch sử 11 bộ Kết nối tri thức với cuộc sống, NXB Giáo dục Việt Nam, 2023, tr 7).",
                statements: [
                  {
                    id: "a",
                    text: "Ở nước Anh trước cách mạng, nhà vua nắm quyền lực tối cao và vô hạn.",
                    correct: true,
                  },
                  {
                    id: "b",
                    text: "Vua Anh tôn trọng quyền quyết định của Quốc hội trong xây dựng luật pháp.",
                    correct: false,
                  },
                  {
                    id: "c",
                    text: "Ở nước Anh trước cách mạng, diễn ra cuộc đấu tranh trên lĩnh vực tư tưởng giữa Anh giáo và Thanh giáo.",
                    correct: true,
                  },
                  {
                    id: "d",
                    text: "Anh giáo là ngọn cờ tư tưởng tiến bộ của tư sản và quý tộc mới ở Anh nhằm chống lại chế độ phong kiến.",
                    correct: false,
                  },
                ],
                score: 1,
              },
              {
                id: "lichsugiuaky-ontap-b1-q35",
                type: "true-false",
                content:
                  "Đọc đoạn thông tin sau đây: “Chiến tranh giành độc lập của 13 thuộc địa của Anh ở Bắc Mĩ đã giải phóng nhân dân bản địa khỏi ách thống trị thực dân, đưa đến sự thành lập nhà nước tư sản đầu tiên ngoài châu Âu, thúc đẩy phong trào giải phóng dân tộc ở khu vực Mĩ Latinh phát triển và có ảnh hưởng tích cực đến phong trào giành độc lập ở nhiều nơi trên thế giới vào cuối thế kỉ XVIII – đầu thế kỉ XIX” (Vũ Minh Giang (chủ biên), Sách giáo khoa Lịch sử 11 bộ Kết nối tri thức với cuộc sống, NXB Giáo dục Việt Nam, 2023, tr 11).",
                statements: [
                  {
                    id: "a",
                    text: "Chiến tranh giành độc lập của 13 thuộc địa của Anh ở Bắc Mĩ đã giải phóng nhân dân bản địa khỏi ách thống trị thực dân, đưa đến sự thành lập nhà nước tư sản đầu tiên ngoài châu Âu.",
                    correct: true,
                  },
                  {
                    id: "b",
                    text: "Chiến tranh giành độc lập của 13 thuộc địa của Anh ở Bắc Mĩ là cuộc cách mạng tư sản vĩ đại và triệt để nhất trong các thế kỉ XVI - XIX.",
                    correct: false,
                  },
                  {
                    id: "c",
                    text: "Chiến tranh giành độc lập của 13 thuộc địa của Anh ở Bắc Mĩ đã lật đổ ách thống trị của thực dân dân, đưa đến sự thành lập nhà nước dân chủ tư sản đầu tiên trên thế giới.",
                    correct: false,
                  },
                  {
                    id: "d",
                    text: "Chiến tranh giành độc lập của 13 thuộc địa của Anh ở Bắc Mĩ thắng lợi đã thúc đẩy phong trào đấu tranh giành độc lập ở nhiều nước trên thế giới.",
                    correct: true,
                  },
                ],
                score: 1,
              },
              {
                id: "lichsugiuaky-ontap-b1-q36",
                type: "true-false",
                content:
                  "Đọc đoạn thông tin sau đây: “Hiện tượng “Cừu ăn thịt người” là câu nói của Tô – mát Mo – rơ miêu tả thảm cảnh của người nông dân Anh trong phong trào “rào đất cướp ruộng” cuối thế kỉ XV đầu thế kỉ XVI. Quý tộc mới (quý tộc tư sản hóa) đã đuổi nông dân ra khỏi những mảnh đất mà họ đã từng canh tác để biến thành đồng cỏ nuôi cừu, kinh doanh thu lợi nhuận, tạo ra sự tích lũy tư bản nguyên thủy” (Hà Minh Hồng (chủ biên), Sách giáo khoa Lịch sử 11 bộ Chân trời sáng tạo, NXB Giáo dục Việt Nam, 2023, tr 5).",
                statements: [
                  {
                    id: "a",
                    text: "Cuối thế kỉ XV – đầu thế kỉ XVI, phương thức sản xuất tư bản chủ nghĩa đã thâm nhập mạnh vào nông nghiệp Anh.",
                    correct: true,
                  },
                  {
                    id: "b",
                    text: "Nguyên nhân chủ yếu dẫn đến phong trào “rào đất cướp ruộng” ở Anh là do sự phát triển mạnh mẽ của ngành công nghiệp len dạ.",
                    correct: true,
                  },
                  {
                    id: "c",
                    text: "Sự phát triển của kinh tế tư bản chủ nghĩa trong nông nghiệp làm xuất hiện tầng lớp quý tộc mới, sau đó đã liên minh với tư sản chống lại chế độ phong kiến Anh.",
                    correct: true,
                  },
                  {
                    id: "d",
                    text: "Phong trào “rào đất cướp ruộng” đã góp phần cải thiện đời sống của nông dân Anh trước cách mạng tư sản.",
                    correct: false,
                  },
                ],
                score: 1,
              },
              {
                id: "lichsugiuaky-ontap-b1-q37",
                type: "true-false",
                content:
                  "Đọc đoạn trích dưới đây và trả lời các ý hỏi: “Vì sao mà Mỹ làm cách mạng? 1. Có bao nhiêu thổ sản, Mỹ phải cung cấp cho Anh hết, không được bán cho nước khác. 2. Dân Mỹ không được lập ra lò máy và hội buôn bán. 3. Các nước không được vào buôn bán với Mỹ, chỉ Anh được buôn bán mà thôi. Vì ba điều ấy, lại thêm thuế má nặng nề, làm cho kinh tế rất khốn đốn...” (Hồ Chí Minh, Toàn tập, Tập 2, NXB Chính trị quốc gia Sự thật, Hà Nội, 2011, tr. 290)",
                statements: [
                  {
                    id: "a",
                    text: "Đoạn trích trên chỉ ra những tiền đề về chính trị dẫn đến cách mạng Mĩ.",
                    correct: false,
                  },
                  {
                    id: "b",
                    text: "Những chính sách của thực dân Anh nhằm kìm hãm sự phát triển kinh tế của 13 thuộc địa ở Bắc Mĩ.",
                    correct: true,
                  },
                  {
                    id: "c",
                    text: 'Theo Hồ Chí Minh, một trong những nguyên nhân khiến dân Mỹ "tẩy chay" Anh là do chính sách thuế má nặng nề.',
                    correct: true,
                  },
                  {
                    id: "d",
                    text: "Nội dung đoạn trích cho thấy cách mạng Mỹ nổ ra nhằm mục tiêu giải quyết nhiệm vụ dân chủ là chủ yếu.",
                    correct: false,
                  },
                ],
                score: 1,
              },
              {
                id: "lichsugiuaky-ontap-b1-q38",
                type: "true-false",
                content:
                  "Đọc đoạn trích dưới đây và trả lời các ý hỏi: “Không phải không có lí do mà cuộc Cách mạng Pháp được gọi là cuộc cách mạng vĩ đại... nó đã phục vụ được nhiều, khiến cho cả thế kỉ XIX, một thế kỉ đã đem lại văn minh và văn hoá cho toàn thể loài người, đã trôi qua dưới dấu hiệu của cuộc Cách mạng Pháp.” (V. I. Lê-nin, Toàn tập, Tập 38, NXB Chính trị quốc gia, Hà Nội, 2006, tr. 444)",
                statements: [
                  {
                    id: "a",
                    text: "Lê-nin đánh giá cao tầm vóc và ảnh hưởng quốc tế của Cách mạng tư sản Pháp.",
                    correct: true,
                  },
                  {
                    id: "b",
                    text: "Theo đoạn trích, Cách mạng Pháp chỉ có ý nghĩa đối với sự phát triển của riêng nước Pháp trong thế kỉ XIX.",
                    correct: false,
                  },
                  {
                    id: "c",
                    text: 'Cách mạng Pháp được gọi là "vĩ đại" vì nó đã đặt nền móng cho nền văn minh và văn hoá của nhân loại trong một thời gian dài.',
                    correct: true,
                  },
                  {
                    id: "d",
                    text: "Ý kiến của Lê-nin gián tiếp khẳng định nhiệm vụ dân tộc và dân chủ của Cách mạng Pháp đã được thực hiện một cách triệt để.",
                    correct: false,
                  },
                ],
                score: 1,
              },
            ],
          },
        ],
      },
      {
        id: "lichsugiuaky-ontap-b2",
        name: "Ôn tập giữa kì I bài 2",
        exams: [
          {
            id: "lichsugiuaky-ontap-b2-exam",
            title: "Đề cương ôn tập giữa kì I môn Lịch sử lớp 11 (Bài 2)",
            examType: "Giữa kì I",
            description:
              "Đề cương ôn tập giữa kì I — Bài 2: Sự xác lập và phát triển của chủ nghĩa tư bản.",
            duration: 45,
            questions: [
              {
                id: "lichsugiuaky-ontap-b2-q1",
                type: "multiple-choice",
                content:
                  "Cuộc cách mạng tư sản nào sau đây đã đánh dấu sự mở rộng của chủ nghĩa tư bản ra ngoài phạm vi châu Âu?",
                options: [
                  { id: "a", text: "Cách mạng tư sản Pháp." },
                  { id: "b", text: "Cách mạng tư sản Anh." },
                  {
                    id: "c",
                    text: "Chiến tranh giành độc lập của các thuộc địa Anh ở Bắc Mỹ.",
                  },
                  { id: "d", text: "Cuộc thống nhất nước Đức." },
                ],
                correctOptionId: "c",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b2-q2",
                type: "multiple-choice",
                content:
                  "Ở châu Âu, sau cách mạng tư sản Anh, quốc gia nào tiếp theo xác lập chủ nghĩa tư bản thông qua cách mạng?",
                options: [
                  { id: "a", text: "Đức." },
                  { id: "b", text: "Pháp." },
                  { id: "c", text: "I-ta-li-a." },
                  { id: "d", text: "Hà Lan." },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b2-q3",
                type: "multiple-choice",
                content:
                  "Sự thắng lợi của cuộc cách mạng nào sau đây đã khẳng định sự xác lập của chủ nghĩa tư bản ở các nước I-ta-li-a và Đức?",
                options: [
                  { id: "a", text: "Cách mạng công nghiệp." },
                  { id: "b", text: "Các cuộc đấu tranh thống nhất đất nước." },
                  { id: "c", text: "Các cuộc cải cách nông nô." },
                  { id: "d", text: "Cuộc Duy tân Minh Trị." },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b2-q4",
                type: "multiple-choice",
                content:
                  "Cuối thế kỉ XIX - đầu thế kỉ XX, các nước tư bản chuyển sang giai đoạn nào sau đây?",
                options: [
                  { id: "a", text: "Chủ nghĩa tư bản hiện đại." },
                  { id: "b", text: "Chủ nghĩa đế quốc." },
                  { id: "c", text: "Chủ nghĩa tư bản tự do cạnh tranh." },
                  { id: "d", text: "Thời kì xác lập chủ nghĩa tư bản." },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b2-q5",
                type: "multiple-choice",
                content:
                  "Theo V. I. Lê-nin, đặc điểm nổi bật của chủ nghĩa tư bản ở giai đoạn sau cùng là sự xuất hiện của",
                options: [
                  { id: "a", text: "các công trường thủ công." },
                  { id: "b", text: "các tổ chức độc quyền." },
                  { id: "c", text: "tầng lớp quý tộc mới." },
                  { id: "d", text: "các phường hội kinh doanh." },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b2-q6",
                type: "multiple-choice",
                content:
                  "Hình thức tổ chức độc quyền phổ biến ở nước Mỹ được gọi là gì?",
                options: [
                  { id: "a", text: "Các-ten (Cartel)." },
                  { id: "b", text: "Xanh-đi-ca (Syndicate)." },
                  { id: "c", text: "Tơ-rốt (Trust)." },
                  { id: "d", text: "Phường hội." },
                ],
                correctOptionId: "c",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b2-q7",
                type: "multiple-choice",
                content:
                  "Cuộc cải cách nào đã đưa Nhật Bản từ một nước phong kiến trở thành nước tư bản chủ nghĩa?",
                options: [
                  { id: "a", text: "Cách mạng Tân Hợi." },
                  { id: "b", text: "Duy tân Minh Trị." },
                  { id: "c", text: "Cải cách Ra-ma V." },
                  { id: "d", text: "Cuộc vận động Duy tân." },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b2-q8",
                type: "multiple-choice",
                content:
                  "Cuộc cách mạng nào ở châu Á đã lật đổ triều đại Mãn Thanh, mở đường cho chủ nghĩa tư bản phát triển?",
                options: [
                  { id: "a", text: "Cách mạng Tân Hợi." },
                  { id: "b", text: "Cách mạng tháng Mười." },
                  { id: "c", text: "Phong trào Nghĩa Hòa đoàn." },
                  { id: "d", text: "Cuộc khởi nghĩa Thái bình Thiên quốc." },
                ],
                correctOptionId: "a",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b2-q9",
                type: "multiple-choice",
                content:
                  "Chủ nghĩa tư bản hiện đại được xác định bắt đầu từ thời điểm nào?",
                options: [
                  { id: "a", text: "Sau Cách mạng Pháp." },
                  { id: "b", text: "Sau Cách mạng công nghiệp." },
                  { id: "c", text: "Sau Chiến tranh thế giới thứ hai." },
                  { id: "d", text: "Sau khi Liên Xô sụp đổ." },
                ],
                correctOptionId: "c",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b2-q10",
                type: "multiple-choice",
                content:
                  "Một trong những biểu hiện mới của chủ nghĩa tư bản hiện đại là sự kết hợp giữa",
                options: [
                  {
                    id: "a",
                    text: "sức mạnh kinh tế của tổ chức độc quyền với sức mạnh chính trị của nhà nước.",
                  },
                  { id: "b", text: "giai cấp tư sản với giai cấp công nhân." },
                  {
                    id: "c",
                    text: "các nước tư bản với các nước xã hội chủ nghĩa.",
                  },
                  {
                    id: "d",
                    text: "kinh tế nông nghiệp với kinh tế công nghiệp.",
                  },
                ],
                correctOptionId: "a",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b2-q11",
                type: "multiple-choice",
                content:
                  "Nhóm các quốc gia nào sau đây được coi là diễn đàn kinh tế của các quốc gia tư bản phát triển nhất thế giới?",
                options: [
                  { id: "a", text: "ASEAN." },
                  { id: "b", text: "G7." },
                  { id: "c", text: "BRICS." },
                  { id: "d", text: "EU." },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b2-q12",
                type: "multiple-choice",
                content:
                  "Tiềm năng của chủ nghĩa tư bản hiện đại được thể hiện rõ nhất ở lĩnh vực nào dưới đây?",
                options: [
                  { id: "a", text: "Khoa học - công nghệ." },
                  { id: "b", text: "Sản xuất nông nghiệp lạc hậu." },
                  { id: "c", text: "Chế độ quân chủ chuyên chế." },
                  { id: "d", text: "Nền kinh tế bao cấp." },
                ],
                correctOptionId: "a",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b2-q13",
                type: "multiple-choice",
                content:
                  "Thách thức lớn nhất mà chủ nghĩa tư bản hiện đại đang phải đối mặt trong lĩnh vực kinh tế là",
                options: [
                  { id: "a", text: "thiếu hụt lao động trình độ cao." },
                  {
                    id: "b",
                    text: "các cuộc khủng hoảng tài chính mang tính toàn cầu.",
                  },
                  { id: "c", text: "sự biến mất của các tổ chức độc quyền." },
                  { id: "d", text: "sự dư thừa năng lượng sạch." },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b2-q14",
                type: "multiple-choice",
                content:
                  'Phong trào "Chiếm lấy phố Uôn" nổ ra tại Mỹ nhằm phản đối vấn đề gì?',
                options: [
                  { id: "a", text: "Chống biến đổi khí hậu." },
                  {
                    id: "b",
                    text: "Sự bất bình đẳng và chênh lệch giàu nghèo.",
                  },
                  { id: "c", text: "Sự phát triển của khoa học kĩ thuật." },
                  { id: "d", text: "Các cuộc chiến tranh xâm lược thuộc địa." },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b2-q15",
                type: "multiple-choice",
                content:
                  "Nội dung nào sau đây phản ánh đúng bản chất của chủ nghĩa đế quốc?",
                options: [
                  {
                    id: "a",
                    text: "Là sự mở rộng quyền lực thông qua việc xâm chiếm và thống trị các vùng đất khác.",
                  },
                  {
                    id: "b",
                    text: "Là quá trình các nước tư bản giúp đỡ các nước nghèo phát triển kinh tế.",
                  },
                  {
                    id: "c",
                    text: "Là việc xây dựng một thế giới hòa bình, không có chiến tranh thuộc địa.",
                  },
                  {
                    id: "d",
                    text: "Là sự rút lui của các tổ chức độc quyền khỏi thị trường quốc tế.",
                  },
                ],
                correctOptionId: "a",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b2-q16",
                type: "multiple-choice",
                content:
                  "Các cuộc cách mạng công nghiệp khẳng định sự thắng lợi của chủ nghĩa tư bản vì đã",
                options: [
                  {
                    id: "a",
                    text: "tạo ra lực lượng sản xuất đồ sộ, làm thay đổi bộ mặt kinh tế - xã hội.",
                  },
                  {
                    id: "b",
                    text: "xoá bỏ hoàn toàn mâu thuẫn giữa tư sản và vô sản.",
                  },
                  {
                    id: "c",
                    text: "giúp các nước tư bản thoát khỏi sự phụ thuộc vào thuộc địa.",
                  },
                  {
                    id: "d",
                    text: "đưa giai cấp công nhân lên nắm quyền lãnh đạo xã hội.",
                  },
                ],
                correctOptionId: "a",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b2-q17",
                type: "multiple-choice",
                content:
                  "Đặc điểm chung của các cuộc cách mạng tư sản ở Mỹ La-tinh trong nửa đầu thế kỉ XIX là gì?",
                options: [
                  {
                    id: "a",
                    text: "Lật đổ chế độ phong kiến trong nước để thành lập các vương triều.",
                  },
                  {
                    id: "b",
                    text: "Đấu tranh chống thực dân Tây Ban Nha và Bồ Đào Nha để giành độc lập.",
                  },
                  {
                    id: "c",
                    text: "Chống lại sự thống trị của các nước đế quốc trẻ như Mỹ và Nhật.",
                  },
                  {
                    id: "d",
                    text: "Thiết lập chế độ xã hội chủ nghĩa đầu tiên ở khu vực.",
                  },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b2-q18",
                type: "multiple-choice",
                content:
                  "Sự xuất hiện của các tổ chức độc quyền cuối thế kỉ XIX là hệ quả trực tiếp của",
                options: [
                  { id: "a", text: "sự suy yếu của giai cấp tư sản." },
                  {
                    id: "b",
                    text: "quá trình cạnh tranh gay gắt và tích tụ tư bản.",
                  },
                  {
                    id: "c",
                    text: "sự can thiệp hoàn toàn của nhà nước vào kinh tế.",
                  },
                  {
                    id: "d",
                    text: "sự đình trệ của cách mạng khoa học kĩ thuật.",
                  },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b2-q19",
                type: "multiple-choice",
                content:
                  "Tại sao nước Anh được mệnh danh là “đế quốc mà Mặt Trời không bao giờ lặn”?",
                options: [
                  {
                    id: "a",
                    text: "Vì nước Anh nằm ở gần cực Bắc của Trái Đất.",
                  },
                  {
                    id: "b",
                    text: "Vì hệ thống thuộc địa của Anh trải rộng khắp các châu lục.",
                  },
                  {
                    id: "c",
                    text: "Vì nước Anh đi đầu trong cuộc cách mạng năng lượng mặt trời.",
                  },
                  {
                    id: "d",
                    text: "Vì Anh là nước duy nhất có chủ nghĩa tư bản phát triển.",
                  },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b2-q20",
                type: "multiple-choice",
                content:
                  "Điểm khác biệt quan trọng của chủ nghĩa tư bản hiện đại so với chủ nghĩa tư bản thời kì tự do cạnh tranh là",
                options: [
                  {
                    id: "a",
                    text: "sự biến mất của mâu thuẫn giai cấp trong xã hội.",
                  },
                  {
                    id: "b",
                    text: "nhà nước tăng cường điều chỉnh và can thiệp vào nền kinh tế.",
                  },
                  {
                    id: "c",
                    text: "các nước tư bản không còn thực hiện chính sách xâm lược.",
                  },
                  {
                    id: "d",
                    text: "kinh tế tư nhân bị xoá bỏ hoàn toàn bởi kinh tế nhà nước.",
                  },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b2-q21",
                type: "multiple-choice",
                content:
                  "Nhận định nào sau đây là đúng về tiềm năng của chủ nghĩa tư bản hiện đại?",
                options: [
                  {
                    id: "a",
                    text: "Đã giải quyết được triệt để mâu thuẫn giữa giàu và nghèo.",
                  },
                  {
                    id: "b",
                    text: "Có khả năng tự điều chỉnh để tồn tại và phát triển trong bối cảnh mới.",
                  },
                  {
                    id: "c",
                    text: "Không còn phải đối mặt với bất kì cuộc khủng hoảng nào.",
                  },
                  {
                    id: "d",
                    text: "Sức sản xuất đã đạt đến giới hạn và không thể phát triển thêm.",
                  },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b2-q22",
                type: "multiple-choice",
                content:
                  'Thách thức về "vấn đề chính trị, xã hội nan giải" của chủ nghĩa tư bản Mỹ hiện nay được biểu hiện qua',
                options: [
                  {
                    id: "a",
                    text: "nạn phân biệt chủng tộc và bạo lực súng đạn.",
                  },
                  {
                    id: "b",
                    text: "sự thống nhất tuyệt đối giữa các đảng phái chính trị.",
                  },
                  {
                    id: "c",
                    text: "việc xoá bỏ hoàn toàn các tệ nạn xã hội trong trường học.",
                  },
                  {
                    id: "d",
                    text: "sự công bằng tuyệt đối trong hưởng thụ phúc lợi xã hội.",
                  },
                ],
                correctOptionId: "a",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b2-q23",
                type: "multiple-choice",
                content:
                  "Ý nghĩa quan trọng nhất của cuộc Duy tân Minh Trị đối với Nhật Bản là",
                options: [
                  {
                    id: "a",
                    text: "đưa Nhật Bản trở thành thuộc địa kiểu mới của Mỹ.",
                  },
                  {
                    id: "b",
                    text: "giúp Nhật Bản tránh được nguy cơ bị thực dân phương Tây xâm lược.",
                  },
                  {
                    id: "c",
                    text: "xoá bỏ hoàn toàn giai cấp nông dân trong xã hội Nhật.",
                  },
                  {
                    id: "d",
                    text: "đưa Nhật Bản trở thành trung tâm của phe xã hội chủ nghĩa.",
                  },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b2-q24",
                type: "multiple-choice",
                content:
                  "Chủ nghĩa tư bản không thể giải quyết triệt để các cuộc khủng hoảng kinh tế vì",
                options: [
                  {
                    id: "a",
                    text: "bản chất của chủ nghĩa tư bản dựa trên sở hữu tư nhân và sự phát triển tự phát.",
                  },
                  {
                    id: "b",
                    text: "các nước tư bản thiếu kinh nghiệm trong quản lí kinh tế vĩ mô.",
                  },
                  {
                    id: "c",
                    text: "trình độ khoa học kĩ thuật của các nước tư bản còn quá thấp.",
                  },
                  {
                    id: "d",
                    text: "sự cản trở của các nước đang phát triển đối với thị trường toàn cầu.",
                  },
                ],
                correctOptionId: "a",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b2-q25",
                type: "multiple-choice",
                content:
                  "Từ kinh nghiệm của cuộc Duy tân Minh Trị (Nhật Bản), các nước đang phát triển có thể rút ra bài học gì trong quá trình công nghiệp hóa hiện nay?",
                options: [
                  {
                    id: "a",
                    text: "Chỉ tập trung phát triển quân sự để đối phó với ngoại xâm.",
                  },
                  {
                    id: "b",
                    text: "Đóng cửa thị trường để bảo vệ các doanh nghiệp trong nước.",
                  },
                  {
                    id: "c",
                    text: "Tiến hành cải cách đồng bộ trên nhiều lĩnh vực, chú trọng giáo dục và kĩ thuật.",
                  },
                  {
                    id: "d",
                    text: "Duy trì nguyên vẹn các thể chế chính trị phong kiến lỗi thời.",
                  },
                ],
                correctOptionId: "c",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b2-q26",
                type: "multiple-choice",
                content:
                  "Việc các nước đế quốc đẩy mạnh xâm lược thuộc địa cuối thế kỉ XIX đã để lại hậu quả lâu dài nào cho các nước Á và châu Phi?",
                options: [
                  {
                    id: "a",
                    text: "Làm cho các nước này sớm trở thành những quốc gia công nghiệp phát triển.",
                  },
                  {
                    id: "b",
                    text: "Gây ra sự nghèo nàn, lạc hậu và những mâu thuẫn sắc tộc, biên giới kéo dài.",
                  },
                  {
                    id: "c",
                    text: "Giúp các dân tộc bản địa nhanh chóng tiếp cận với văn minh phương Tây một cách bình đẳng.",
                  },
                  {
                    id: "d",
                    text: "Xoá bỏ hoàn toàn chế độ phong kiến và thiết lập nền dân chủ hiện đại.",
                  },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b2-q27",
                type: "multiple-choice",
                content:
                  'Nhận định "1% dân số giàu có sở hữu tài sản bằng 99% dân số còn lại" trong phong trào "Chiếm lấy phố Uôn" cho thấy điều gì về bản chất của chủ nghĩa tư bản?',
                options: [
                  {
                    id: "a",
                    text: "Sự công bằng trong phân phối thành quả kinh tế.",
                  },
                  {
                    id: "b",
                    text: "Sự bất bình đẳng sâu sắc trong lòng xã hội tư bản.",
                  },
                  {
                    id: "c",
                    text: "Sự biến mất của giai cấp tư sản độc quyền.",
                  },
                  {
                    id: "d",
                    text: "Hiệu quả tuyệt đối của mô hình kinh tế thị trường tư bản.",
                  },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b2-q28",
                type: "multiple-choice",
                content:
                  "Sự phát triển nhảy vọt của cách mạng khoa học - công nghệ trong giai đoạn chủ nghĩa tư bản hiện đại có tác động như thế nào đến lực lượng lao động?",
                options: [
                  {
                    id: "a",
                    text: "Làm giảm nhu cầu về lao động có trình độ chuyên môn cao.",
                  },
                  {
                    id: "b",
                    text: "Đòi hỏi lực lượng lao động phải không ngừng nâng cao trình độ và kĩ năng.",
                  },
                  {
                    id: "c",
                    text: "Khiến cho công nhân không còn vai trò gì trong quá trình sản xuất.",
                  },
                  {
                    id: "d",
                    text: "Giúp xoá bỏ hoàn toàn sự bóc lột sức lao động trong các nhà máy.",
                  },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b2-q29",
                type: "multiple-choice",
                content:
                  "Trước những thách thức về biến đổi khí hậu và an ninh năng lượng, các nước tư bản hiện đại đang có xu hướng",
                options: [
                  {
                    id: "a",
                    text: "quay trở lại sử dụng hoàn toàn năng lượng hóa thạch để giảm chi phí.",
                  },
                  {
                    id: "b",
                    text: "tìm kiếm và chuyển đổi sang các nguồn năng lượng xanh, sạch.",
                  },
                  {
                    id: "c",
                    text: "đình chỉ toàn bộ hoạt động sản xuất công nghiệp để bảo vệ môi trường.",
                  },
                  {
                    id: "d",
                    text: "bỏ mặc các vấn đề môi trường cho các nước đang phát triển tự giải quyết.",
                  },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b2-q30",
                type: "multiple-choice",
                content:
                  'Vận dụng hiểu biết về tiềm năng của chủ nghĩa tư bản hiện đại, yếu tố nào sau đây đóng vai trò "đòn bẩy" quan trọng nhất cho sự tăng trưởng kinh tế hiện nay?',
                options: [
                  {
                    id: "a",
                    text: "Việc duy trì các hàng rào thuế quan bảo hộ.",
                  },
                  {
                    id: "b",
                    text: "Việc ứng dụng thành tựu của cuộc Cách mạng công nghiệp lần thứ tư.",
                  },
                  {
                    id: "c",
                    text: "Việc tăng cường quân sự hóa nền kinh tế quốc gia.",
                  },
                  {
                    id: "d",
                    text: "Việc hạn chế sự tự do dịch chuyển của dòng vốn quốc tế.",
                  },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "lichsugiuaky-ontap-b2-q31",
                type: "true-false",
                content:
                  "Đọc đoạn thông tin sau: “Ở châu Âu, sau Cách mạng tư sản Anh và đặc biệt là Cách mạng tư sản Pháp, chủ nghĩa tư bản từng bước được xác lập. Chiến tranh giành độc lập của 13 thuộc địa Anh ở Bắc Mĩ nửa sau thế kỉ XVIII đánh dấu sự mở rộng của chủ nghĩa tư bản ở ngoài châu Âu. Từ thập kỉ 60 của thế kỉ XVIII, cuộc cách mạng công nghiệp bắt đầu từ Anh, sau đó lan ra các nước Pháp, Đức,... đã tạo ra những chuyển biến to lớn về kinh tế – xã hội, làm thay đổi bộ mặt của các nước này và khẳng định sự thắng lợi của chủ nghĩa tư bản. Nửa sau thế kỉ XIX, các cuộc cách mạng tư sản tiếp diễn dưới những hình thức khác nhau và giành được thắng lợi. Sự kiện đấu tranh thống nhất I-ta-li-a và Đức đã dẫn đến sự xác lập chủ nghĩa tư bản rộng khắp ở châu Âu và Bắc Mĩ.” (Đỗ Thanh Bình (chủ biên), Sách giáo khoa Lịch sử 11 bộ Cánh diều, NXB Đại học Sư phạm, 2023, tr 13-14).",
                statements: [
                  {
                    id: "a",
                    text: "Cách mạng công nghiệp bắt đầu từ nước Anh vào nửa sau thế kỉ XVIII.",
                    correct: true,
                  },
                  {
                    id: "b",
                    text: "Chiến tranh giành độc lập của 13 thuộc địa Anh ở Bắc Mỹ mở đầu cho sự xác lập của chủ nghĩa tư bản ngay tại châu Âu.",
                    correct: false,
                  },
                  {
                    id: "c",
                    text: "Cách mạng công nghiệp không chỉ thúc đẩy lực lượng sản xuất phát triển mà còn là nhân tố quyết định khẳng định sự thắng lợi của chế độ tư bản chủ nghĩa.",
                    correct: true,
                  },
                  {
                    id: "d",
                    text: "Sự thành công của các cuộc cách mạng tư sản thời kì này cho thấy chủ nghĩa tư bản là một hệ thống xã hội hoàn hảo và không còn mâu thuẫn giai cấp.",
                    correct: false,
                  },
                ],
                score: 1,
              },
              {
                id: "lichsugiuaky-ontap-b2-q32",
                type: "true-false",
                content:
                  "Đọc đoạn thông tin sau: “Sự phát triển nhanh chóng của chủ nghĩa tư bản kéo theo nhu cầu ngày càng cao về nguyên liệu và nhân công, dẫn đến việc tăng cường chính sách xâm lược, mở rộng thuộc địa. Cuối thế kỉ XIX - đầu thế kỉ XX, các nước tư bản chuyển sang giai đoạn đế quốc chủ nghĩa. Chủ nghĩa đế quốc là hệ quả trực tiếp của quá trình xâm lược thuộc địa nhằm tìm kiếm thị trường, thu lợi nhuận và đầu tư tư bản ở nước ngoài. Trong quá trình xâm lược thuộc địa, các nước đế quốc đã thiết lập hệ thống thuộc địa ở châu Á, châu Phi và khu vực Mĩ La-tinh. Trong số các nước đế quốc, nước Anh được mệnh danh là 'đế quốc mà Mặt Trời không bao giờ lặn' nhờ có hệ thống thuộc địa rộng lớn nhất.” (Vũ Minh Giang (chủ biên), Sách giáo khoa Lịch sử 11 bộ Kết nối tri thức với cuộc sống, NXB Giáo dục Việt Nam, 2023, tr 13-14).",
                statements: [
                  {
                    id: "a",
                    text: "Cuối thế kỉ XIX - đầu thế kỉ XX, các nước tư bản chuyển sang giai đoạn đế quốc chủ nghĩa.",
                    correct: true,
                  },
                  {
                    id: "b",
                    text: "Nước Đức là quốc gia sở hữu hệ thống thuộc địa rộng lớn nhất thế giới vào năm 1914.",
                    correct: false,
                  },
                  {
                    id: "c",
                    text: "Nhu cầu về thị trường, nguyên liệu và nguồn nhân công là động lực cốt lõi thúc đẩy các nước tư bản đẩy mạnh chính sách xâm lược thuộc địa.",
                    correct: true,
                  },
                  {
                    id: "d",
                    text: "Việc các nước đế quốc thiết lập hệ thống thuộc địa ở châu Á, châu Phi đã giúp các quốc gia này nhanh chóng tiến lên chủ nghĩa tư bản một cách bình đẳng.",
                    correct: false,
                  },
                ],
                score: 1,
              },
              {
                id: "lichsugiuaky-ontap-b2-q33",
                type: "true-false",
                content:
                  "Đọc đoạn thông tin sau: “Ở châu Á, cuộc Duy tân Minh Trị bắt đầu từ năm 1868, đưa Nhật Bản từ một nước phong kiến trở thành nước tư bản chủ nghĩa. Cuộc cải cách này bao gồm những chuyển biến toàn diện trên các lĩnh vực: chính trị, kinh tế, quân sự, văn hoá, xã hội, giáo dục. Cuộc cải cách đã đưa nền kinh tế Nhật Bản phát triển mạnh mẽ trong 30 năm cuối thế kỉ XIX, đồng thời giúp Nhật Bản tránh được nguy cơ bị xâm lược. Ở Trung Quốc, Cách mạng Tân Hợi (1911) do những trí thức cấp tiến và tiểu tư sản lãnh đạo đã lật đổ triều đại Mãn Thanh. Mặc dù cuộc cách mạng này không thực sự thủ tiêu giai cấp phong kiến nhưng đã mở đường cho chủ nghĩa tư bản phát triển ở quốc gia lớn nhất, đông dân nhất châu Á.” (Vũ Minh Giang (chủ biên), Sách giáo khoa Lịch sử 11 bộ Kết nối tri thức với cuộc sống, NXB Giáo dục Việt Nam, 2023, tr 15).",
                statements: [
                  {
                    id: "a",
                    text: "Cuộc Duy tân Minh Trị ở Nhật Bản bùng nổ vào giữa thế kỉ XX.",
                    correct: false,
                  },
                  {
                    id: "b",
                    text: "Cách mạng Tân Hợi (1911) ở Trung Quốc đã lật đổ triều đại Mãn Thanh, chấm dứt chế độ quân chủ chuyên chế.",
                    correct: true,
                  },
                  {
                    id: "c",
                    text: "Cả Duy tân Minh Trị và Cách mạng Tân Hợi đều góp phần mở đường cho chủ nghĩa tư bản phát triển ở châu Á.",
                    correct: true,
                  },
                  {
                    id: "d",
                    text: "Cải cách Duy tân Minh Trị để lại bài học kinh nghiệm cho Việt Nam về việc chủ động cải cách, hội nhập quốc tế để phát triển kinh tế và bảo vệ độc lập dân tộc.",
                    correct: true,
                  },
                ],
                score: 1,
              },
              {
                id: "lichsugiuaky-ontap-b2-q34",
                type: "true-false",
                content:
                  "Đọc đoạn thông tin sau: “Thời kì xác lập chủ nghĩa tư bản là thời kì tự do cạnh tranh của chủ nghĩa tư bản. Cuối thế kỉ XIX - đầu thế kỉ XX, chủ nghĩa tư bản chuyển sang giai đoạn độc quyền. Trong khoảng 3 thập kỉ, việc sử dụng những nguồn năng lượng mới cùng nhiều thành tựu khoa học - kĩ thuật đã thúc đẩy sự phát triển mạnh mẽ của nền kinh tế. Cùng với sự phát triển kinh tế, quá trình cạnh tranh gay gắt làm cho các xí nghiệp vừa và nhỏ bị phá sản, dẫn đến sự xuất hiện những xí nghiệp khổng lồ và các tổ chức độc quyền. Sự phát triển của các tổ chức độc quyền tạo ra cơ sở cho bước chuyển của chủ nghĩa tư bản từ tự do cạnh tranh sang độc quyền.” (Đỗ Thanh Bình (chủ biên), Sách giáo khoa Lịch sử 11 bộ Cánh diều, NXB Đại học Sư phạm, 2023, tr 16).",
                statements: [
                  {
                    id: "a",
                    text: "Các-ten, xanh-đi-ca, tơ-rốt là các hình thức tiêu biểu của các tổ chức độc quyền.",
                    correct: true,
                  },
                  {
                    id: "b",
                    text: "Giai đoạn xác lập chủ nghĩa tư bản cũng đồng thời là giai đoạn chủ nghĩa tư bản đã bước vào thời kì độc quyền.",
                    correct: false,
                  },
                  {
                    id: "c",
                    text: "Sự tích tụ tư sản sản xuất và sự phá sản của các xí nghiệp vừa và nhỏ dưới tác động của cạnh tranh gay gắt là nguyên nhân dẫn đến sự ra đời các tổ chức độc quyền.",
                    correct: true,
                  },
                  {
                    id: "d",
                    text: "Sự xuất hiện của các tổ chức độc quyền đã xoá bỏ hoàn toàn quy luật cạnh tranh trong nền kinh tế thị trường tư bản chủ nghĩa.",
                    correct: false,
                  },
                ],
                score: 1,
              },
              {
                id: "lichsugiuaky-ontap-b2-q35",
                type: "true-false",
                content:
                  "Đọc đoạn thông tin sau: “Chủ nghĩa tư bản hiện đại là thuật ngữ dùng để chỉ một giai đoạn phát triển của chủ nghĩa tư bản từ sau Chiến tranh thế giới thứ hai đến nay với những biểu hiện mới. Tiêu biểu trong đó là sự kết hợp giữa sức mạnh kinh tế của các tổ chức độc quyền tư nhân với sức mạnh chính trị của nhà nước tư bản. Chủ nghĩa tư bản hiện đại có sức sản xuất phát triển cao trên cơ sở những thành tựu của cách mạng khoa học - công nghệ. Nền sản xuất này đòi hỏi lực lượng lao động phải có trình độ cao để đáp ứng sự phát triển nhảy vọt. Đồng thời, chủ nghĩa tư bản không ngừng điều chỉnh để tồn tại và phát triển trong bối cảnh mới.” (Vũ Minh Giang (chủ biên), Sách giáo khoa Lịch sử 11 bộ Kết nối tri thức với cuộc sống, NXB Giáo dục Việt Nam, 2023, tr 17).",
                statements: [
                  {
                    id: "a",
                    text: "Chủ nghĩa tư bản hiện đại là thuật ngữ chỉ giai đoạn phát triển của chủ nghĩa tư bản từ sau Chiến tranh thế giới thứ hai đến nay.",
                    correct: true,
                  },
                  {
                    id: "b",
                    text: "Trong giai đoạn hiện đại, nhà nước tư sản hoàn toàn không can thiệp hay kết hợp với các tổ chức độc quyền tư nhân.",
                    correct: false,
                  },
                  {
                    id: "c",
                    text: "Khả năng tự điều chỉnh và ứng dụng khoa học - công nghệ là những yếu tố quan trọng giúp chủ nghĩa tư bản hiện đại tiếp tục tồn tại và phát triển.",
                    correct: true,
                  },
                  {
                    id: "d",
                    text: "Nhờ sự điều chỉnh chính sách, chủ nghĩa tư bản hiện đại đã hoàn toàn xóa bỏ bản chất bóc lột giá trị thặng dư đối với người lao động.",
                    correct: false,
                  },
                ],
                score: 1,
              },
              {
                id: "lichsugiuaky-ontap-b2-q36",
                type: "true-false",
                content:
                  "Đọc đoạn thông tin sau: “Tiềm năng của chủ nghĩa tư bản hiện đại được biểu hiện cụ thể trên các lĩnh vực như kinh tế, khoa học - công nghệ, kinh nghiệm quản lí và khả năng tự điều chỉnh. Chủ nghĩa tư bản có ưu thế trong việc sử dụng những thành tựu của cuộc Cách mạng công nghiệp lần thứ tư để phát triển kinh tế. Các nước tư bản phát triển trở thành trung tâm kinh tế, tài chính, khoa học - công nghệ của thế giới. Những quốc gia này sở hữu quy mô nền kinh tế và thu nhập bình quân đầu người thuộc hàng cao nhất thế giới. Nhóm G7 được sáng lập năm 1976 là một điển hình tiêu biểu cho tập hợp các quốc gia tư bản phát triển nhất thế giới.” (Hà Minh Hồng (chủ biên), Sách giáo khoa Lịch sử 11 bộ Chân trời sáng tạo, NXB Giáo dục Việt Nam, 2023, tr 17-18).",
                statements: [
                  {
                    id: "a",
                    text: "Các nước tư bản phát triển hiện nay đóng vai trò là các trung tâm kinh tế, tài chính lớn của thế giới.",
                    correct: true,
                  },
                  {
                    id: "b",
                    text: "Nhóm G7 là tập hợp các quốc gia đang phát triển thuộc khu vực châu Á và châu Phi.",
                    correct: false,
                  },
                  {
                    id: "c",
                    text: "Trình độ phát triển cao về khoa học - công nghệ và kinh nghiệm quản lý tạo nên sức mạnh kinh tế quan trọng cho chủ nghĩa tư bản hiện đại.",
                    correct: true,
                  },
                  {
                    id: "d",
                    text: "Việt Nam hoàn toàn có thể chủ động tiếp thu, học hỏi các kinh nghiệm quản lý công nghiệp hóa, hiện đại hóa từ các nước tư bản phát triển để đẩy mạnh...",
                    correct: true,
                  },
                ],
                score: 1,
              },
              {
                id: "lichsugiuaky-ontap-b2-q37",
                type: "true-false",
                content:
                  "Đọc đoạn tư liệu sau: “Chủ nghĩa tư bản hiện đại đang phải đối mặt với nhiều thách thức to lớn và khó giải quyết. Thứ nhất, chủ nghĩa tư bản khó có thể giải quyết dứt điểm những cuộc khủng hoảng kinh tế, tài chính mang tính toàn cầu. Từ cuộc khủng hoảng dầu mỏ năm 1973 đến nay, các nước tư bản phát triển đã chú trọng tìm kiếm các nguồn năng lượng mới, xanh và sạch. Tuy nhiên, quá trình chuyển đổi năng lượng diễn ra chậm chạp và sự phụ thuộc vào dầu mỏ vẫn còn rất lớn. Khủng hoảng năng lượng tiếp tục gây ra nhiều tác động tiêu cực như lạm phát cao, suy thoái kinh tế và ô nhiễm môi trường nghiêm trọng.” (Vũ Minh Giang (chủ biên), Sách giáo khoa Lịch sử 11 bộ Kết nối tri thức với cuộc sống, NXB Giáo dục Việt Nam, 2023, tr 18).",
                statements: [
                  {
                    id: "a",
                    text: "Khủng hoảng năng lượng và ô nhiễm môi trường là những thách thức mà các nước tư bản đang phải đối mặt.",
                    correct: true,
                  },
                  {
                    id: "b",
                    text: "Cuộc khủng hoảng dầu mỏ năm 1973 đã giúp các nước tư bản chấm dứt hoàn toàn sự phụ thuộc vào nguồn năng lượng hóa thạch.",
                    correct: false,
                  },
                  {
                    id: "c",
                    text: "Các cuộc khủng hoảng kinh tế, tài chính mang tính toàn cầu bắt nguồn từ những mâu thuẫn nội tại vốn có của phương thức sản xuất tư bản chủ nghĩa.",
                    correct: true,
                  },
                  {
                    id: "d",
                    text: "Các vấn đề an ninh phi truyền thống như biến đổi khí hậu hay khủng hoảng năng lượng chỉ có thể giải quyết hiệu quả thông qua sự hợp tác quốc tế rộng rãi, không phân biệt chế độ chính trị.",
                    correct: true,
                  },
                ],
                score: 1,
              },
              {
                id: "lichsugiuaky-ontap-b2-q38",
                type: "true-false",
                content:
                  "Đọc đoạn thông tin sau: “Bên cạnh các thách thức kinh tế, chủ nghĩa tư bản hiện đại còn đối mặt với những vấn đề chính trị, xã hội nan giải. Sự chênh lệch giàu nghèo ngày càng gia tăng làm sâu sắc thêm tình trạng bất bình đẳng xã hội. Phong trào 'Chiếm lấy phố Uôn' (Occupy Wall Street) xuất hiện ở Mĩ vào đầu năm 2011 với khẩu hiệu '99% chống lại 1%'. Tên gọi này phản ánh thực trạng 1% dân số Mĩ giàu có nắm giữ lượng tài sản bằng cả 99% dân số cộng lại. Chỉ sau một thời gian ngắn, phong trào này đã nhanh chóng lan rộng sang nhiều bang ở Mĩ và hàng trăm thành phố ở các nước tư bản khác.” (Đỗ Thanh Bình (chủ biên), Sách giáo khoa Lịch sử 11 bộ Cánh diều, NXB Đại học Sư phạm, 2023, tr 19).",
                statements: [
                  {
                    id: "a",
                    text: 'Phong trào "Chiếm lấy phố Uôn" bùng nổ tại Mỹ vào đầu năm 2011.',
                    correct: true,
                  },
                  {
                    id: "b",
                    text: 'Khẩu hiệu "99% chống lại 1%" thể hiện sự bình đẳng tuyệt đối về mặt kinh tế giữa các tầng lớp trong xã hội Mỹ.',
                    correct: false,
                  },
                  {
                    id: "c",
                    text: 'Sự bùng nổ và lan rộng của phong trào "Chiếm lấy phố Uôn" chứng tỏ mâu thuẫn giai cấp và tình trạng phân hóa giàu nghèo trong xã hội tư bản ngày càng sâu sắc.',
                    correct: true,
                  },
                  {
                    id: "d",
                    text: 'Sự xuất hiện của phong trào "Chiếm lấy phố Uôn" là dấu hiệu cho thấy chủ nghĩa tư bản hiện đại đã hoàn toàn diệt vong và không còn khả năng tự điều chỉnh.',
                    correct: false,
                  },
                ],
                score: 1,
              },
            ],
          },
        ],
      },
    ],
  },
  //======= Địa lý ==============
  {
    id: "dia-ly",
    name: "Địa lý",
    chapters: [
      // === CHƯƠNG MỚI THÊM VÀO ===
      {
        id: "dia-ly-gk1",
        name: "Giữa kì I",
        exams: [
          {
            id: "dialygiuakymot-ontap",
            title: "Đề cương ôn tập giữa kì I môn Địa lí lớp 11",
            examType: "Giữa kì I",
            description:
              "Đề cương ôn tập giữa kì I — cảm ơn cô Mai đã cho chúng em câu tln",
            duration: 45,
            questions: [
              {
                id: "dialygiuakymot-ontap-q1",
                type: "multiple-choice",
                content:
                  "Trong xu hướng toàn cầu hóa kinh tế, các tổ chức nào sau đây ngày càng đóng vai trò quan trọng trong việc chi phối các chuỗi giá trị toàn cầu?",
                options: [
                  { id: "a", text: "Hợp tác xã nông nghiệp." },
                  { id: "b", text: "Công ty đa quốc gia." },
                  { id: "c", text: "Câu lạc bộ thể thao." },
                  { id: "d", text: "Trung tâm bảo tồn di sản." },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "dialygiuakymot-ontap-q2",
                type: "multiple-choice",
                content:
                  "Tổ chức thương mại nào sau đây hoạt động với phạm vi quy mô toàn cầu?",
                options: [
                  { id: "a", text: "Liên minh châu Âu." },
                  { id: "b", text: "Hiệp hội các quốc gia Đông Nam Á." },
                  { id: "c", text: "Tổ chức Thương mại Thế giới." },
                  { id: "d", text: "Thị trường chung Nam Mỹ." },
                ],
                correctOptionId: "c",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "dialygiuakymot-ontap-q3",
                type: "multiple-choice",
                content:
                  "Toàn cầu hóa là quá trình liên kết các quốc gia trên thế giới không phải về",
                options: [
                  { id: "a", text: "kinh tế." },
                  { id: "b", text: "văn hóa." },
                  { id: "c", text: "khoa học." },
                  { id: "d", text: "chính trị." },
                ],
                correctOptionId: "d",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "dialygiuakymot-ontap-q4",
                type: "multiple-choice",
                content: "Hệ quả tiêu cực của toàn cầu hóa kinh tế là",
                options: [
                  { id: "a", text: "tăng cường sự hợp tác quốc tế nhiều mặt." },
                  {
                    id: "b",
                    text: "đẩy nhanh đầu tư, làm sản xuất phát triển.",
                  },
                  { id: "c", text: "gia tăng nhanh khoảng cách giàu nghèo." },
                  {
                    id: "d",
                    text: "thúc đẩy sự tăng trưởng kinh tế toàn cầu.",
                  },
                ],
                correctOptionId: "c",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "dialygiuakymot-ontap-q5",
                type: "multiple-choice",
                content:
                  "Toàn cầu hóa kinh tế là quá trình liên kết các quốc gia trên thế giới về",
                options: [
                  { id: "a", text: "sản xuất, thương mại, tài chính." },
                  { id: "b", text: "thương mại, tài chính, giáo dục." },
                  { id: "c", text: "tài chính, giáo dục và chính trị." },
                  { id: "d", text: "giáo dục, chính trị và sản xuất." },
                ],
                correctOptionId: "a",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "dialygiuakymot-ontap-q6",
                type: "multiple-choice",
                content:
                  "Một trong những biểu hiện của toàn cầu hóa kinh tế là",
                options: [
                  {
                    id: "a",
                    text: "các hoạt động giao lưu, trao đổi văn hóa giữa các quốc gia gia tăng.",
                  },
                  {
                    id: "b",
                    text: "hợp tác quốc tế về giáo dục và đào tạo ngày càng mở rộng.",
                  },
                  {
                    id: "c",
                    text: "sự gia tăng ảnh hưởng của các tổ chức liên minh quân sự khu vực.",
                  },
                  {
                    id: "d",
                    text: "tiêu chuẩn toàn cầu ngày càng được áp dụng rộng rãi.",
                  },
                ],
                correctOptionId: "d",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "dialygiuakymot-ontap-q7",
                type: "multiple-choice",
                content: "Biểu hiện của thương mại thế giới phát triển mạnh là",
                options: [
                  {
                    id: "a",
                    text: "mạng lưới liên kết tài chính toàn cầu mở rộng toàn thế giới.",
                  },
                  {
                    id: "b",
                    text: "đầu tư nước ngoài tăng rất nhanh, nhất là lĩnh vực dịch vụ.",
                  },
                  {
                    id: "c",
                    text: "thương mại điện tử có những bước phát triển mạnh mẽ.",
                  },
                  {
                    id: "d",
                    text: "các công ti xuyên quốc gia hoạt động với phạm vi rất rộng.",
                  },
                ],
                correctOptionId: "c",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "dialygiuakymot-ontap-q8",
                type: "multiple-choice",
                content:
                  "Biểu hiện của các giao dịch quốc tế tài chính tăng nhanh là",
                options: [
                  {
                    id: "a",
                    text: "các tiêu chuẩn toàn cầu ngày càng được áp dụng rộng rãi.",
                  },
                  {
                    id: "b",
                    text: "đầu tư nước ngoài tăng rất nhanh, nhất là trong dịch vụ.",
                  },
                  {
                    id: "c",
                    text: "vai trò của Tổ chức Thương mại thế giới ngày càng lớn.",
                  },
                  {
                    id: "d",
                    text: "các công ti xuyên quốc gia hoạt động với phạm vi rộng.",
                  },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "dialygiuakymot-ontap-q9",
                type: "multiple-choice",
                content: "Hệ quả quan trọng nhất của toàn cầu hóa kinh tế là",
                options: [
                  { id: "a", text: "đẩy nhanh đầu tư." },
                  { id: "b", text: "xóa đói giảm nghèo." },
                  { id: "c", text: "giao lưu, học tập." },
                  { id: "d", text: "thúc đẩy sản xuất." },
                ],
                correctOptionId: "d",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "dialygiuakymot-ontap-q10",
                type: "multiple-choice",
                content:
                  "Sự ra đời của tổ chức nào sau đây là biểu hiện của toàn cầu hóa kinh tế?",
                options: [
                  { id: "a", text: "Liên minh châu Âu (EU)." },
                  { id: "b", text: "Tổ chức Thương mại thế giới (WTO)." },
                  {
                    id: "c",
                    text: "Hiệp hội các quốc gia Đông Nam Á (ASEAN).",
                  },
                  { id: "d", text: "Thị trường chung Nam Mỹ (MERCOSUR)." },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "dialygiuakymot-ontap-q11",
                type: "multiple-choice",
                content:
                  "Biểu hiện của việc tăng cường áp dụng các tiêu chuẩn toàn cầu là",
                options: [
                  {
                    id: "a",
                    text: "mạng lưới liên kết tài chính toàn cầu được mở rộng.",
                  },
                  {
                    id: "b",
                    text: "các tiêu chuẩn thống nhất áp dụng trên nhiều lĩnh vực.",
                  },
                  {
                    id: "c",
                    text: "vai trò của Tổ chức Thương mại thế giới ngày càng lớn.",
                  },
                  {
                    id: "d",
                    text: "các công ti xuyên quốc gia hoạt động với phạm vi rộng.",
                  },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "dialygiuakymot-ontap-q12",
                type: "multiple-choice",
                content: "Thương mại thế giới hiện nay có đặc điểm nổi bật là",
                options: [
                  {
                    id: "a",
                    text: "thương mại điện tử phát triển do tác động cách mạng 4.0.",
                  },
                  {
                    id: "b",
                    text: "giá trị thương mại toàn cầu chiếm tỉ trọng nhỏ trong GDP.",
                  },
                  {
                    id: "c",
                    text: "EU là tổ chức có vai trò lớn nhất trong ngành thương mại.",
                  },
                  {
                    id: "d",
                    text: "các nước đang phát triển chiếm tỉ trọng lớn trong thương mại toàn cầu.",
                  },
                ],
                correctOptionId: "a",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "dialygiuakymot-ontap-q13",
                type: "multiple-choice",
                content:
                  "Biểu hiện của thị trường tài chính quốc tế phát triển nhanh là",
                options: [
                  {
                    id: "a",
                    text: "triệt tiêu các ngân hàng nhỏ kém hiệu quả.",
                  },
                  {
                    id: "b",
                    text: "sự sát nhập của các ngân hàng lại với nhau.",
                  },
                  {
                    id: "c",
                    text: "sự kết nối giữa các ngân hàng lớn với nhau.",
                  },
                  {
                    id: "d",
                    text: "tăng phụ thuộc của các ngân hàng với nhau.",
                  },
                ],
                correctOptionId: "c",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "dialygiuakymot-ontap-q14",
                type: "multiple-choice",
                content:
                  "Trong bối cảnh toàn cầu hóa kinh tế, hoạt động đầu tư ra nước ngoài mang lại cơ hội chủ yếu nào sau đây cho các nước phát triển?",
                options: [
                  {
                    id: "a",
                    text: "Thu hút nguồn vốn đầu tư và tiếp thu công nghệ quản lý tiên tiến.",
                  },
                  {
                    id: "b",
                    text: "Tận dụng nguồn tài nguyên, lao động giá rẻ và mở rộng thị trường tiêu thụ.",
                  },
                  {
                    id: "c",
                    text: "Giải quyết triệt để tình trạng thất nghiệp và đào tạo lại lực lượng lao động trong nước.",
                  },
                  {
                    id: "d",
                    text: "Giảm bớt sự phụ thuộc vào các chuỗi cung ứng và thị trường toàn cầu.",
                  },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "dialygiuakymot-ontap-q15",
                type: "multiple-choice",
                content:
                  "Việc thu hút đầu tư nước ngoài mang lại cơ hội chủ yếu nào sau đây đối với các nước đang phát triển?",
                options: [
                  {
                    id: "a",
                    text: "Bổ sung nguồn vốn phát triển và tiếp thu công nghệ, kĩ thuật hiện đại.",
                  },
                  {
                    id: "b",
                    text: "Khai thác triệt để và mở rộng quy mô xuất khẩu tài nguyên thô.",
                  },
                  {
                    id: "c",
                    text: "Tận dụng tối đa nguồn lao động giá rẻ mà không cần qua đào tạo.",
                  },
                  {
                    id: "d",
                    text: "Chiếm lĩnh và làm chủ hoàn toàn thị trường tiêu thụ ở nước đi đầu tư.",
                  },
                ],
                correctOptionId: "a",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "dialygiuakymot-ontap-q16",
                type: "multiple-choice",
                content:
                  "Phát biểu nào sau đây không đúng về tác động tích cực của toàn cầu hóa kinh tế đối với các nước đang phát triển?",
                options: [
                  {
                    id: "a",
                    text: "Mở ra cơ hội tiếp nhận các thành tựu khoa học và công nghệ hiện đại.",
                  },
                  {
                    id: "b",
                    text: "Tạo điều kiện thuận lợi để đa dạng hóa, đa phương hóa quan hệ đối ngoại.",
                  },
                  {
                    id: "c",
                    text: "Giúp gia tăng khả năng xuất khẩu và lan tỏa văn hóa sang các nước phát triển.",
                  },
                  {
                    id: "d",
                    text: "Thúc đẩy thu hút vốn đầu tư nước ngoài và mở rộng thị trường xuất khẩu.",
                  },
                ],
                correctOptionId: "c",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "dialygiuakymot-ontap-q17",
                type: "multiple-choice",
                content:
                  "Trong tiến trình toàn cầu hóa kinh tế, các nước đang phát triển phải đối mặt với thách thức lớn nào sau đây về mặt kinh tế?",
                options: [
                  {
                    id: "a",
                    text: "Gia tăng lệ thuộc vào thị trường bên ngoài và các biến động toàn cầu.",
                  },
                  {
                    id: "b",
                    text: "Suy giảm hoàn toàn các ngành kinh tế truyền thống ở nông thôn.",
                  },
                  {
                    id: "c",
                    text: "Áp lực dân số tăng nhanh gây thiếu hụt lao động nghiêm trọng ở đô thị.",
                  },
                  {
                    id: "d",
                    text: "Suy giảm nhanh chóng dòng vốn đầu tư nước ngoài vào công nghiệp.",
                  },
                ],
                correctOptionId: "a",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "dialygiuakymot-ontap-q18",
                type: "multiple-choice",
                content:
                  "Trong tiến trình toàn cầu hóa kinh tế, các nước đang phát triển phải đối mặt với thách thức lớn nào sau đây về mặt xã hội?",
                options: [
                  {
                    id: "a",
                    text: "Gia tăng khoảng cách giàu nghèo và phân hóa xã hội sâu sắc giữa các tầng lớp dân cư.",
                  },
                  {
                    id: "b",
                    text: "Bị mất hoàn toàn quyền kiểm soát đối với quy mô và chất lượng nguồn lao động nội địa.",
                  },
                  {
                    id: "c",
                    text: "Tình trạng thất nghiệp gia tăng ở tất cả các ngành kinh tế trong nước.",
                  },
                  {
                    id: "d",
                    text: "Sự suy giảm nhanh chóng của quy mô dân số và tốc độ đô thị hóa ở khu vực nông thôn.",
                  },
                ],
                correctOptionId: "a",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "dialygiuakymot-ontap-q19",
                type: "multiple-choice",
                content:
                  "Về mặt chính trị, thách thức lớn nhất mà các nước đang phát triển phải đối mặt dưới tác động của toàn cầu hóa là gì?",
                options: [
                  {
                    id: "a",
                    text: "Nguy cơ suy giảm độc lập, tự chủ và gia tăng sức ép đối với chủ quyền quốc gia.",
                  },
                  {
                    id: "b",
                    text: "Sự giải thể của các thể chế chính trị và chính phủ ở các quốc gia nhỏ.",
                  },
                  {
                    id: "c",
                    text: "Mất đi khả năng tham gia và biểu quyết tại các tổ chức quốc tế và khu vực.",
                  },
                  {
                    id: "d",
                    text: "Gia tăng nguy cơ xung đột quân sự trực tiếp giữa tất cả các nước nhận đầu tư.",
                  },
                ],
                correctOptionId: "a",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "dialygiuakymot-ontap-q20",
                type: "multiple-choice",
                content:
                  "Việc phân phối và tiêu dùng hàng hóa gia tăng mạnh mẽ trong bối cảnh toàn cầu hóa kinh tế gây ra hệ quả tiêu cực trực tiếp nào sau đây đối với môi trường?",
                options: [
                  {
                    id: "a",
                    text: "Làm gia tăng đáng kể lượng rác thải ra môi trường, đặc biệt là rác thải nhựa.",
                  },
                  {
                    id: "b",
                    text: "Triệt tiêu khả năng phát triển các nguồn năng lượng tái tạo của các nước lớn.",
                  },
                  {
                    id: "c",
                    text: "Làm suy giảm nhanh chóng diện tích vùng chuyên canh nông nghiệp hữu cơ.",
                  },
                  {
                    id: "d",
                    text: "Xóa bỏ sự đa dạng sinh học ở các quốc gia nghèo tài nguyên thiên nhiên.",
                  },
                ],
                correctOptionId: "a",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "dialygiuakymot-ontap-q21",
                type: "multiple-choice",
                content:
                  "Quốc gia nào sau đây đông dân nhất khu vực Mỹ La tinh?",
                options: [
                  { id: "a", text: "Mê-hi-cô." },
                  { id: "b", text: "Bra-xin." },
                  { id: "c", text: "Ác-hen-ti-na." },
                  { id: "d", text: "Pa-na-ma." },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "dialygiuakymot-ontap-q22",
                type: "multiple-choice",
                content:
                  "Đặc điểm nổi bật về thành phần chủng tộc ở khu vực Mỹ La tinh?",
                options: [
                  { id: "a", text: "Đồng nhất, chỉ gồm người Ơ-rô-pê-ô-it." },
                  {
                    id: "b",
                    text: "Đa dạng bậc nhất thế giới với các chủng tộc và người lai.",
                  },
                  { id: "c", text: "Đơn điệu, chủ yếu là người Môn-gô-lô-it." },
                  {
                    id: "d",
                    text: "Đa số là người bản địa (người Anh-điêng).",
                  },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "dialygiuakymot-ontap-q23",
                type: "multiple-choice",
                content:
                  "Xu hướng thay đổi cơ cấu dân số theo tuổi ở Mỹ La tinh hiện nay?",
                options: [
                  {
                    id: "a",
                    text: "Tăng tỉ lệ nhóm dưới 15 tuổi, giảm nhóm 65 tuổi trở lên.",
                  },
                  {
                    id: "b",
                    text: "Tăng tỉ lệ nhóm 65 tuổi trở lên, giảm tỉ lệ nhóm dưới 15 tuổi.",
                  },
                  {
                    id: "c",
                    text: "Tỉ lệ các nhóm tuổi ổn định, ít thay đổi.",
                  },
                  { id: "d", text: "Giảm tỉ lệ nhóm từ 15 đến 64 tuổi." },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "dialygiuakymot-ontap-q24",
                type: "multiple-choice",
                content:
                  "Dân cư khu vực Mỹ La tinh tập trung đông đúc ở khu vực nào sau đây?",
                options: [
                  { id: "a", text: "Rừng mưa nhiệt đới A-ma-dôn." },
                  { id: "b", text: "Vùng núi cao An-đét." },
                  {
                    id: "c",
                    text: "Các đảo vùng biển Ca-ri-bê và các đồng bằng, ven biển.",
                  },
                  { id: "d", text: "Vùng hoang mạc A-ta-ca-ma." },
                ],
                correctOptionId: "c",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "dialygiuakymot-ontap-q25",
                type: "multiple-choice",
                content:
                  "Vấn đề dân cư - xã hội đáng quan tâm nhất ở Mỹ La tinh là",
                options: [
                  { id: "a", text: "có nhiều siêu đô thị dân đông." },
                  { id: "b", text: "tỉ lệ thất nghiệp ở thành thị cao." },
                  { id: "c", text: "dân nông thôn vào đô thị đông." },
                  { id: "d", text: "chênh lệch giàu nghèo rất lớn." },
                ],
                correctOptionId: "d",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "dialygiuakymot-ontap-q26",
                type: "multiple-choice",
                content:
                  "Văn hoá Mỹ La tinh là sự kết hợp giữa văn hoá của các chủng tộc di dân tới và nền văn hoá cổ đại nào?",
                options: [
                  { id: "a", text: "Ai Cập, Lưỡng Hà." },
                  { id: "b", text: "Hy Lạp, La Mã." },
                  { id: "c", text: "In-ca, May-a, A-dơ-tếch." },
                  { id: "d", text: "In-ca, La Mã." },
                ],
                correctOptionId: "c",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "dialygiuakymot-ontap-q27",
                type: "multiple-choice",
                content: "Dân cư Mỹ La tinh có đặc điểm nào sau đây?",
                options: [
                  { id: "a", text: "Gia tăng dân số thấp." },
                  { id: "b", text: "Tỉ suất nhập cư lớn." },
                  { id: "c", text: "Cơ cấu dân số vàng." },
                  { id: "d", text: "Dân số đang trẻ hóa." },
                ],
                correctOptionId: "c",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "dialygiuakymot-ontap-q28",
                type: "multiple-choice",
                content: "Mỹ La tinh là khu vực có tỉ lệ dân thành thị",
                options: [
                  { id: "a", text: "cao và tăng nhanh." },
                  { id: "b", text: "rất cao và tăng chậm." },
                  { id: "c", text: "cao và tăng chậm." },
                  { id: "d", text: "thấp nhưng tăng nhanh." },
                ],
                correctOptionId: "a",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "dialygiuakymot-ontap-q29",
                type: "multiple-choice",
                content:
                  "Vấn đề xã hội tồn tại lớn nhất ở khu vực Mỹ La tinh hiện nay là",
                options: [
                  {
                    id: "a",
                    text: "thiếu hụt lực lượng lao động nghiêm trọng.",
                  },
                  {
                    id: "b",
                    text: "tài nguyên thiên nhiên suy giảm nghiêm trọng.",
                  },
                  {
                    id: "c",
                    text: "chênh lệch giàu nghèo lớn và tỉ lệ người nghèo cao.",
                  },
                  {
                    id: "d",
                    text: "mật độ dân số quá cao trên toàn lãnh thổ.",
                  },
                ],
                correctOptionId: "c",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "dialygiuakymot-ontap-q30",
                type: "multiple-choice",
                content:
                  "Tỉ lệ dân số sống ở các khu ổ chuột tại các siêu đô thị Mỹ La tinh phản ánh hậu quả của hiện tượng nào?",
                options: [
                  { id: "a", text: "Đô thị hóa tự phát." },
                  { id: "b", text: "Công nghiệp hóa diễn ra quá nhanh." },
                  { id: "c", text: "Tỷ lệ sinh sản giảm mạnh ở thành thị." },
                  { id: "d", text: "Sự di dân từ thành thị về nông thôn." },
                ],
                correctOptionId: "a",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "dialygiuakymot-ontap-q31",
                type: "multiple-choice",
                content:
                  "Lễ hội Cac-na-van (Carnival) nổi tiếng thế giới, mang đậm nét văn hóa độc đáo của khu vực Mỹ Latinh, được tổ chức hàng năm lớn nhất ở quốc gia nào?",
                options: [
                  { id: "a", text: "Bra-xin." },
                  { id: "b", text: "Chi-lê." },
                  { id: "c", text: "Cu-ba." },
                  { id: "d", text: "Ar-gen-ti-na." },
                ],
                correctOptionId: "a",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "dialygiuakymot-ontap-q32",
                type: "multiple-choice",
                content:
                  'Khái niệm "Favela" ở Mỹ Latinh (đặc biệt là tại Bra-xin) được dùng để chỉ',
                options: [
                  {
                    id: "a",
                    text: "các khu đô thị sinh thái cao cấp dành cho tầng lớp thượng lưu.",
                  },
                  {
                    id: "b",
                    text: "các vùng đồng bằng tập trung chăn nuôi bò quy mô lớn.",
                  },
                  {
                    id: "c",
                    text: "các khu nhà ở tự phát, thiếu tiện nghi và cơ sở hạ tầng (khu ổ chuột).",
                  },
                  {
                    id: "d",
                    text: "các trung tâm công nghệ cao và khu chế xuất công nghiệp.",
                  },
                ],
                correctOptionId: "c",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "dialygiuakymot-ontap-q33",
                type: "multiple-choice",
                content:
                  'Cơ cấu "dân số vàng" mang lại lợi thế chủ yếu nào cho sự phát triển kinh tế khu vực Mỹ La tinh?',
                options: [
                  {
                    id: "a",
                    text: "Tự động hoá hoàn toàn ngành nông nghiệp và dịch vụ.",
                  },
                  {
                    id: "b",
                    text: "Cung cấp nguồn lao động dồi dào và thu hút nguồn vốn đầu tư nước ngoài.",
                  },
                  {
                    id: "c",
                    text: "Giải quyết triệt để vấn đề phân hoá giàu nghèo và thất nghiệp.",
                  },
                  {
                    id: "d",
                    text: "Làm giảm mật độ dân số ở các vùng ven biển.",
                  },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "dialygiuakymot-ontap-q34",
                type: "multiple-choice",
                content:
                  "Việc phân bố dân cư không đều gây ra khó khăn lớn nhất nào đối với phát triển kinh tế Mỹ La tinh?",
                options: [
                  {
                    id: "a",
                    text: "Làm giảm tốc độ đô thị hoá của toàn khu vực.",
                  },
                  {
                    id: "b",
                    text: "Khó khăn cho việc khai thác tài nguyên thiên nhiên.",
                  },
                  { id: "c", text: "Làm chênh lệch mức sinh giữa các vùng." },
                  {
                    id: "d",
                    text: "Làm mất đi tính đa dạng văn hoá của khu vực.",
                  },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "dialygiuakymot-ontap-q35",
                type: "multiple-choice",
                content:
                  "Về mặt xã hội, quá trình đô thị hoá tự phát ở Mỹ La tinh gây ra hậu quả tiêu cực nào?",
                options: [
                  {
                    id: "a",
                    text: "Thúc đẩy nhanh chóng quá trình công nghiệp hoá nông thôn.",
                  },
                  {
                    id: "b",
                    text: "Gia tăng thất nghiệp, ô nhiễm môi trường, tệ nạn xã hội và mất an ninh trật tự.",
                  },
                  {
                    id: "c",
                    text: "Làm suy giảm tài nguyên thiên nhiên của khu vực.",
                  },
                  {
                    id: "d",
                    text: "Làm giảm mật độ dân số tại các vùng duyên hải.",
                  },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "dialygiuakymot-ontap-q36",
                type: "multiple-choice",
                content:
                  "Tỉ lệ dân đô thị ở khu vực Mỹ La tinh cao vượt trội so với các nước đang phát triển do nguyên nhân chủ yếu nào sau đây?",
                options: [
                  {
                    id: "a",
                    text: "Khu vực Mỹ La tinh có nền kinh tế phát triển cao.",
                  },
                  {
                    id: "b",
                    text: "Lịch sử nhập cư, khai thác lãnh thổ và quá trình đô thị hoá tự phát.",
                  },
                  {
                    id: "c",
                    text: "Sự đa dạng và giàu có của điều kiện tự nhiên, tài nguyên thiên nhiên.",
                  },
                  {
                    id: "d",
                    text: "Tỉ lệ gia tăng dân số tự nhiên ở khu vực thành thị tăng đột biến.",
                  },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "dialygiuakymot-ontap-q37",
                type: "multiple-choice",
                content:
                  "Mỹ La tinh có nền văn hóa độc đáo, đa dạng chủ yếu do",
                options: [
                  { id: "a", text: "có nhiều thành phần dân tộc." },
                  { id: "b", text: "có người bản địa và da đen." },
                  { id: "c", text: "nhiều quốc gia nhập cư đến." },
                  { id: "d", text: "nhiều lứa tuổi cùng hòa hợp." },
                ],
                correctOptionId: "a",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "dialygiuakymot-ontap-q38",
                type: "multiple-choice",
                content:
                  "Hiện tượng “đô thị hóa tự phát” ở khu vực Mỹ La-tinh phản ánh điều nào sau đây về mối quan hệ giữa kinh tế và đô thị hóa?",
                options: [
                  {
                    id: "a",
                    text: "Đô thị hóa diễn ra chậm hơn nhiều so với tốc độ tăng trưởng kinh tế trung bình.",
                  },
                  {
                    id: "b",
                    text: "Sự phát triển đồng bộ giữa quá trình công nghiệp hóa và hiện đại hóa đất nước.",
                  },
                  {
                    id: "c",
                    text: "Nền kinh tế phát triển mạnh mẽ thúc đẩy sự thay đổi nhanh chóng bộ mặt đô thị.",
                  },
                  {
                    id: "d",
                    text: "Tốc độ đô thị hóa nhanh hơn trình độ phát triển kinh tế - xã hội của khu vực.",
                  },
                ],
                correctOptionId: "d",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "dialygiuakymot-ontap-q39",
                type: "multiple-choice",
                content:
                  "Số dân đô thị ở khu vực Mỹ La tinh tăng nhanh chủ yếu do",
                options: [
                  {
                    id: "a",
                    text: "di cư từ nông thôn đến và gia tăng tự nhiên.",
                  },
                  {
                    id: "b",
                    text: "lao động kĩ thuật gia tăng và tỉ suất sinh cao.",
                  },
                  {
                    id: "c",
                    text: "nhập cư từ châu lục khác đến nhiều, di cư ít.",
                  },
                  {
                    id: "d",
                    text: "lao động ở khu vực dịch vụ tăng và nhập cư.",
                  },
                ],
                correctOptionId: "a",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "dialygiuakymot-ontap-q40",
                type: "multiple-choice",
                content:
                  "Do đô thị hóa tự phát nên dân đô thị ở khu vực Mỹ La-tinh",
                options: [
                  {
                    id: "a",
                    text: "ổn định việc làm, không gian cư trú rộng, thu nhập rất cao.",
                  },
                  {
                    id: "b",
                    text: "thất nghiệp đông, thu nhập thấp, môi trường sống không tốt.",
                  },
                  {
                    id: "c",
                    text: "chủ yếu là làm thuê, mức sống thấp, điều kiện sống khó khăn.",
                  },
                  {
                    id: "d",
                    text: "thiếu việc làm, dân trí thấp, thu nhập thấp và không ổn định.",
                  },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "dialygiuakymot-ontap-q41",
                type: "multiple-choice",
                content:
                  "Hai loại cây lương thực được trồng phổ biến và là cây lương thực chính ở khu vực Mỹ Latinh là",
                options: [
                  { id: "a", text: "Ngô và lúa mì." },
                  { id: "b", text: "Lúa gạo và khoai tây." },
                  { id: "c", text: "Yến mạch và lúa mạch." },
                  { id: "d", text: "Sắn và cao lương." },
                ],
                correctOptionId: "a",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "dialygiuakymot-ontap-q42",
                type: "multiple-choice",
                content:
                  "Các loại cây công nghiệp nhiệt đới nào sau đây được trồng phổ biến và đóng vai trò quan trọng trong xuất khẩu của khu vực Mỹ Latinh?",
                options: [
                  { id: "a", text: "Chè, củ cải đường, lúa mạch." },
                  { id: "b", text: "Cà phê, ca cao, mía, đậu tương." },
                  { id: "c", text: "Cao su, cà phê, lúa mì." },
                  { id: "d", text: "Cây bông vải, cà phê." },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "dialygiuakymot-ontap-q43",
                type: "multiple-choice",
                content:
                  "Quốc gia nào ở Mỹ Latinh giữ vị trí đứng đầu thế giới về sản lượng và xuất khẩu cà phê?",
                options: [
                  { id: "a", text: "Mê-hi-cô." },
                  { id: "b", text: "Bra-xin." },
                  { id: "c", text: "Ác-hen-ti-na." },
                  { id: "d", text: "Chi-lê." },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "dialygiuakymot-ontap-q44",
                type: "multiple-choice",
                content:
                  "Hình thức tổ chức sản xuất nông nghiệp chủ yếu ở khu vực Mỹ La tinh là",
                options: [
                  { id: "a", text: "hộ gia đình." },
                  { id: "b", text: "hợp tác xã." },
                  { id: "c", text: "trang trại." },
                  { id: "d", text: "du canh du cư." },
                ],
                correctOptionId: "c",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "dialygiuakymot-ontap-q45",
                type: "multiple-choice",
                content: "Sản phẩm nông nghiệp nổi bật nhất của Mỹ La tinh là",
                options: [
                  { id: "a", text: "lương thực." },
                  { id: "b", text: "cây công nghiệp." },
                  { id: "c", text: "thực phẩm." },
                  { id: "d", text: "gia súc." },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "dialygiuakymot-ontap-q46",
                type: "multiple-choice",
                content:
                  "Nguồn khoáng sản phong phú là cơ sở để nhiều quốc gia Mỹ La tinh phát triển ngành công nghiệp nào sau đây?",
                options: [
                  { id: "a", text: "Công nghiệp dệt may." },
                  { id: "b", text: "Công nghiệp khai khoáng và luyện kim." },
                  { id: "c", text: "Công nghiệp sản xuất đồ gỗ." },
                  { id: "d", text: "Công nghiệp chế biến lương thực." },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "dialygiuakymot-ontap-q47",
                type: "multiple-choice",
                content:
                  "Ngành du lịch ở Mỹ La tinh thu hút đông đảo du khách quốc tế nhờ có lợi thế nổi bật về",
                options: [
                  { id: "a", text: "Các khu công nghệ cao hiện đại." },
                  { id: "b", text: "Thiên nhiên đa dạng và văn hóa đặc sắc." },
                  { id: "c", text: "Dịch vụ du lịch đa dạng, giá rẻ." },
                  {
                    id: "d",
                    text: "Hệ thống giao thông phát triển, hiện đại.",
                  },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "dialygiuakymot-ontap-q48",
                type: "multiple-choice",
                content:
                  "Ngành công nghiệp chế tạo, sản xuất ô tô, tàu biển và hàng không của Mỹ Latinh tập trung chủ yếu ở quốc gia nào?",
                options: [
                  { id: "a", text: "Mê-hi-cô và Bra-xin." },
                  { id: "b", text: "Ga-ti-ma-la và Ha-hai-ti." },
                  { id: "c", text: "Pa-ra-goay và U-ru-goay." },
                  { id: "d", text: "Bô-li-vi-a và Ê-cua-đo." },
                ],
                correctOptionId: "a",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "dialygiuakymot-ontap-q49",
                type: "multiple-choice",
                content:
                  "Tổ chức các nước xuất khẩu dầu mỏ (OPEC) có sự tham gia của quốc gia Mỹ Latinh nào sau đây ngay từ khi thành lập?",
                options: [
                  { id: "a", text: "Bra-xin." },
                  { id: "b", text: "Vê-ne-zu-ê-la." },
                  { id: "c", text: "Ác-hen-ti-na." },
                  { id: "d", text: "Pê-ru." },
                ],
                correctOptionId: "b",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "dialygiuakymot-ontap-q50",
                type: "multiple-choice",
                content:
                  "Hoạt động ngoại thương của khu vực Mỹ Latinh phụ thuộc nhiều nhất vào các thị trường trao đổi thương mại nào?",
                options: [
                  { id: "a", text: "Hoa Kỳ, Trung Quốc và EU." },
                  { id: "b", text: "Châu Phi và Nam Á." },
                  { id: "c", text: "Đông Nam Á và Trung Á." },
                  { id: "d", text: "Châu Á và Châu Đại Dương." },
                ],
                correctOptionId: "a",
                shuffleOptions: true,
                score: 0.25,
              },
              {
                id: "dialygiuakymot-ontap-q51",
                type: "true-false",
                content: "Cho biểu đồ sau:(do tui gà nên vẽ k đc như đề)",
                chart: {
                  type: "bar",
                  title:
                    "Trị giá thương mại toàn thế giới, giai đoạn 2000 - 2024 (Nguồn: WB, 2025)",
                  labels: ["2000", "2010", "2018", "2020", "2024"],
                  datasets: [
                    {
                      label: "Giá trị thương mại",
                      data: [16038.5, 37918.9, 49815, 44071.3, 33000],
                      backgroundColor: "#2563eb",
                    },
                  ],
                  yAxisLabel: "Tỉ USD",
                },
                statements: [
                  {
                    id: "a",
                    text: "Giá trị thương mại tăng liên tục qua các năm từ năm 2000 đến năm 2024.",
                    correct: false,
                  },
                  {
                    id: "b",
                    text: "Năm 2018 có giá trị thương mại đạt mức cao nhất trong cả giai đoạn.",
                    correct: true,
                  },
                  {
                    id: "c",
                    text: "Năm 2018 so với năm 2000, trị giá thương mại toàn thế giới tăng 3,11 lần.",
                    correct: true,
                  },
                  {
                    id: "d",
                    text: "Sự sụt giảm giá trị thương mại giai đoạn sau 2018 - 2024 phản ánh sự đứt gãy chuỗi cung ứng và suy giảm hoạt động xuất nhập khẩu do ảnh hưởng của đại dịch COVID-19 trên phạm vi toàn cầu.",
                    correct: false,
                  },
                ],
                score: 1,
                explanation:
                  "a) Sai vì có sự sụt giảm sau năm 2018. b) Đúng vì năm 2018 đạt 49815 tỉ USD. c) Đúng vì 49815 / 16038,5 ≈ 3,11 lần. d) Sai vì sự sụt giảm giai đoạn này còn do nhiều yếu tố khác ngoài COVID-19 (bảo hộ thương mại, xung đột địa chính trị...).",
              },
              {
                id: "dialygiuakymot-ontap-q52",
                type: "true-false",
                content:
                  "Cho thông tin sau: Trong bối cảnh toàn cầu hoá diễn ra mạnh mẽ, khu vực hoá kinh tế đã trở thành một xu thế tất yếu và nổi bật của nền kinh tế thế giới hiện đại. Việc hình thành và phát triển ngày càng nhiều các tổ chức liên kết kinh tế khu vực không chỉ gia tăng sức mạnh kinh tế cho từng quốc gia thành viên, mà còn đóng vai trò quan trọng trong nền kinh tế thế giới.",
                statements: [
                  {
                    id: "a",
                    text: "Sự hình thành của xu thế khu vực hóa kinh tế xuất phát từ tính tương đồng về điều kiện tự nhiên, nền tảng lịch sử - văn hóa, cùng nhu cầu tối ưu hóa lợi ích kinh tế chung giữa các quốc gia.",
                    correct: true,
                  },
                  {
                    id: "b",
                    text: "EU, ASEAN, APEC, UN, WTO là những ví dụ điển hình cho các hình thức liên kết kinh tế khu vực hiện nay.",
                    correct: false,
                  },
                  {
                    id: "c",
                    text: "Việc tham gia các liên kết khu vực giúp các nước thành viên chủ động ứng phó với các thách thức chung và nâng cao vị thế trong quan hệ quốc tế.",
                    correct: true,
                  },
                  {
                    id: "d",
                    text: "Tham gia vào các tổ chức khu vực như ASEAN mang lại cho Việt Nam nhiều cơ hội để mở rộng thị trường xuất khẩu hàng hoá.",
                    correct: true,
                  },
                ],
                score: 1,
                explanation:
                  "b) Sai — UN (Liên Hợp Quốc) và WTO (Tổ chức Thương mại Thế giới) là các tổ chức toàn cầu, không phải tổ chức liên kết kinh tế khu vực.",
              },
              {
                id: "dialygiuakymot-ontap-q53",
                type: "true-false",
                content:
                  "Cho đoạn thông tin sau: Khu vực hóa thúc đẩy quá trình mở cửa thị trường ở các quốc gia, tạo lập nên những thị trường khu vực rộng lớn. Tuy nhiên, xu hướng này cũng đặt ra không ít thách thức, đòi hỏi các nước phải chủ động ứng phó để vừa giải quyết các vấn đề chung, vừa đảm bảo tính tự chủ và phát triển bền vững.",
                statements: [
                  {
                    id: "a",
                    text: "Việc gia tăng kí kết các hiệp định thương mại song phương và đa phương là một trong những biểu hiện của xu hướng khu vực hóa kinh tế.",
                    correct: true,
                  },
                  {
                    id: "b",
                    text: "Một trong những hệ quả tiêu cực của khu vực hóa kinh tế là tạo ra các rào cản thương mại đối với các quốc gia nằm ngoài khu vực.",
                    correct: true,
                  },
                  {
                    id: "c",
                    text: "Nhằm đảm bảo tính tự chủ và tránh xung đột lợi ích, mỗi quốc gia chỉ có thể tham gia vào một tổ chức liên kết kinh tế khu vực duy nhất.",
                    correct: false,
                  },
                  {
                    id: "d",
                    text: "Khu vực hóa kinh tế mang tính chất khép kín, làm cản trở tiến trình toàn cầu hóa và phân mảnh nền kinh tế thế giới thành các thị trường đối lập.",
                    correct: false,
                  },
                ],
                score: 1,
                explanation:
                  "c) Sai — một quốc gia hoàn toàn có thể tham gia nhiều tổ chức khu vực khác nhau (VD: Việt Nam vừa ở ASEAN, vừa ở APEC). d) Sai — khu vực hóa thực chất là bước đệm, tạo điều kiện thúc đẩy toàn cầu hóa chứ không làm phân mảnh nền kinh tế.",
              },
              {
                id: "dialygiuakymot-ontap-q54",
                type: "true-false",
                content: "Cho biểu đồ sau:",
                chart: {
                  type: "pie-multi",
                  title: "Cơ cấu GDP của Bra-xin năm 2020 và năm 2024 (%)",
                  charts: [
                    {
                      title: "Năm 2020",
                      labels: [
                        "Nông, lâm, thủy sản",
                        "Công nghiệp",
                        "Dịch vụ",
                        "Thuế sản phẩm trừ trợ cấp",
                      ],
                      dataset: {
                        data: [5.7, 19.5, 61.4, 13.4],
                        backgroundColor: [
                          "#4ade80",
                          "#60a5fa",
                          "#f87171",
                          "#facc15",
                        ],
                      },
                    },
                    {
                      title: "Năm 2024",
                      labels: [
                        "Nông, lâm, thủy sản",
                        "Công nghiệp",
                        "Dịch vụ",
                        "Thuế sản phẩm trừ trợ cấp",
                      ],
                      dataset: {
                        data: [5.8, 20.9, 59.2, 14.1],
                        backgroundColor: [
                          "#22c55e",
                          "#3b82f6",
                          "#ef4444",
                          "#eab308",
                        ],
                      },
                    },
                  ],
                },
                statements: [
                  {
                    id: "a",
                    text: "Trong cơ cấu GDP của Bra-xin, ngành dịch vụ luôn chiếm tỉ trọng cao nhất ở cả hai năm 2020 và 2024.",
                    correct: true,
                  },
                  {
                    id: "b",
                    text: "Tỉ trọng ngành nông nghiệp, lâm nghiệp và thủy sản của Bra-xin tăng nhẹ từ năm 2020 đến năm 2024.",
                    correct: true,
                  },
                  {
                    id: "c",
                    text: "Tỉ trọng ngành công nghiệp của Bra-xin giảm từ năm 2020 đến năm 2024.",
                    correct: false,
                  },
                  {
                    id: "d",
                    text: "Từ năm 2020 đến năm 2024 ngành dịch vụ của Bra-xin giảm tỉ trọng chủ yếu do tập trung nguồn lực đẩy mạnh công nghiệp hóa và tái cơ cấu kinh tế theo hướng tăng cường sản xuất công nghiệp và chế biến.",
                    correct: true,
                  },
                ],
                score: 1,
                explanation:
                  "a) Đúng — 61,4% và 59,2% là cao nhất. b) Đúng — tăng từ 5,7% lên 5,8%. c) Sai — công nghiệp tăng từ 19,5% lên 20,9%. d) Đúng.",
              },
              {
                id: "dialygiuakymot-ontap-q55",
                type: "true-false",
                content:
                  "Cho thông tin sau: Khu vực Mỹ La-tinh đóng góp khoảng 6% vào GDP thế giới. Quy mô GDP của các nước trong khu vực có sự chênh lệch lớn. Nền kinh tế của nhiều quốc gia vẫn còn phụ thuộc nhiều vào nước ngoài về vốn, công nghệ và thị trường.",
                statements: [
                  {
                    id: "a",
                    text: "Bra-xin và Mê-hi-cô là hai quốc gia sở hữu quy mô GDP đứng đầu khu vực Mỹ La-tinh.",
                    correct: true,
                  },
                  {
                    id: "b",
                    text: "Sự chênh lệch lớn về GDP phản ánh trình độ phát triển kinh tế giữa các quốc gia trong khu vực còn thiếu tính đồng đều.",
                    correct: true,
                  },
                  {
                    id: "c",
                    text: "Mặc dù đóng góp 6% vào GDP thế giới, tốc độ tăng trưởng GDP của khu vực Mỹ La-tinh nhìn chung vẫn không ổn định và có sự biến động qua các giai đoạn.",
                    correct: true,
                  },
                  {
                    id: "d",
                    text: "Việc đẩy mạnh thu hút vốn đầu tư nước ngoài là trụ cột chiến lược giúp các nước Mỹ La-tinh giảm thiểu rủi ro nợ công và gia tăng tính tự chủ kinh tế.",
                    correct: false,
                  },
                ],
                score: 1,
                explanation:
                  "d) Sai — Việc phụ thuộc quá nhiều vào vốn đầu tư nước ngoài (FDI) có thể làm tăng rủi ro nợ công và giảm tính tự chủ kinh tế nếu không có chính sách quản lý và sử dụng vốn hiệu quả.",
              },
              {
                id: "dialygiuakymot-ontap-q59",
                type: "short-answer",
                content:
                  "Cho bảng số liệu trị giá xuất, nhập khẩu hàng hóa và dịch vụ toàn thế giới giai đoạn 2015 - 2024. Hãy cho biết tốc độ tăng trưởng tổng trị giá xuất nhập khẩu của thế giới, giai đoạn 2015 - 2024 là bao nhiêu phần trăm (coi năm 2015 = 100%) (làm tròn kết quả đến hàng đơn vị).",
                table: {
                  headers: ["Trị giá", "Xuất khẩu", "Nhập khẩu"],
                  rows: [
                    ["2015", "21280,8", "20746,0"],
                    ["2019", "24791,1", "24348,1"],
                    ["2020", "22350,6", "21720,7"],
                    ["2024", "23413,4", "23826,9"],
                  ],
                },
                answer: "112",
                acceptedAnswers: ["112"],
                maxLength: 4,
                score: 0.5,
                explanation:
                  "Tổng 2024: 23413,4 + 23826,9 = 47240,3. Tổng 2015: 21280,8 + 20746,0 = 42026,8. Tốc độ tăng: 47240,3 / 42026,8 * 100 ≈ 112%.",
              },
              {
                id: "dialygiuakymot-ontap-q60",
                type: "short-answer",
                content:
                  "Năm 2024, trị giá xuất khẩu của thế giới là 23,41 nghìn tỉ USD, trị giá nhập khẩu là 23,83 nghìn tỉ USD. Hãy cho biết tổng trị giá xuất khẩu, nhập khẩu của thế giới năm 2024 là bao nhiêu nghìn tỉ USD (làm tròn kết quả đến một chữ số thập phân).",
                answer: "47,2",
                acceptedAnswers: ["47,2", "47.2"],
                maxLength: 4,
                score: 0.5,
                explanation: "23,41 + 23,83 = 47,24 ≈ 47,2 nghìn tỉ USD.",
              },
              {
                id: "dialygiuakymot-ontap-q61",
                type: "short-answer",
                content:
                  "Năm 2024, trị giá xuất khẩu của thế giới là 23413,4 tỉ USD, trị giá nhập khẩu là 23826,9 tỉ USD. Hãy cho biết cán cân xuất nhập khẩu của toàn thế giới năm 2024 là bao nhiêu tỉ USD (làm tròn kết quả đến hàng đơn vị).",
                answer: "-414",
                acceptedAnswers: ["-414"],
                maxLength: 4,
                score: 0.5,
                explanation: "23413,4 - 23826,9 = -413,5 ≈ -414 tỉ USD.",
              },
              {
                id: "dialygiuakymot-ontap-q62",
                type: "short-answer",
                content:
                  "Vốn đầu tư trực tiếp nước ngoài cộng dồn theo giá hiện hành của khu vực Bắc Phi năm 2015 và năm 2023 lần lượt là 246,3 tỉ USD và 347,0 tỉ USD. Hãy cho biết, vốn đầu tư trực tiếp nước ngoài cộng dồn theo giá hiện hành của khu vực Bắc Phi năm 2023 so với năm 2015 tăng thêm bao nhiêu phần trăm (làm tròn kết quả đến hàng đơn vị).",
                answer: "40,9",
                acceptedAnswers: ["40,9", "40.9"],
                maxLength: 4,
                score: 0.5,
                explanation: "(347,0 - 246,3) / 246,3 * 100 ≈ 40,9%.",
              },
              {
                id: "dialygiuakymot-ontap-q63",
                type: "short-answer",
                content:
                  "Cho bảng số liệu vốn đầu tư trực tiếp nước ngoài cộng dồn theo giá hiện hành của khu vực Nam Mỹ và Bắc Mỹ. Hãy cho biết năm 2023 so với năm 2015 vốn đầu tư trực tiếp nước ngoài cộng dồn theo giá hiện hành của khu vực Bắc Mỹ tăng nhiều hơn khu vực Nam Mỹ bao nhiêu tỉ USD (làm tròn kết quả đến hàng đơn vị).",
                table: {
                  headers: ["Năm", "2015", "2023"],
                  rows: [
                    ["Bắc Mỹ", "6537,7", "14554,7"],
                    ["Nam Mỹ", "1051,8", "2019,6"],
                  ],
                },
                answer: "7049",
                acceptedAnswers: ["7049"],
                maxLength: 4,
                score: 0.5,
                explanation:
                  "Bắc Mỹ tăng: 14554,7 - 6537,7 = 8017. Nam Mỹ tăng: 2019,6 - 1051,8 = 967,8. Chênh lệch: 8017 - 967,8 = 7049,2 ≈ 7049.",
              },
              {
                id: "dialygiuakymot-ontap-q64",
                type: "short-answer",
                content:
                  "Năm 2024, các nước trong Hiệp định chung về thuế và thương mại (GATT) có giá trị thương mại hàng hóa và dịch vụ đạt 57% GDP của thế giới (GDP của thế giới năm 2024 là 110983 tỉ USD). Hãy cho biết giá trị thương mại hàng hóa và dịch vụ của GATT năm 2024 là bao nhiêu nghìn tỉ USD (làm tròn kết quả đến một chữ số thập phân).",
                answer: "63,3",
                acceptedAnswers: ["63,3", "63.3"],
                maxLength: 4,
                score: 0.5,
                explanation:
                  "57 * 110983 / 100 = 63260,31 tỉ USD ≈ 63,3 nghìn tỉ USD.",
              },
              {
                id: "dialygiuakymot-ontap-q65",
                type: "short-answer",
                content:
                  "Năm 2025, dân số thế giới là 8231,6 triệu người. Trong đó số người sử dụng internet chiếm 75%. Hãy cho biết số người sử dụng internet trên thế giới năm 2025 là bao nhiêu triệu người (làm tròn kết quả đến hàng đơn vị).",
                answer: "6174",
                acceptedAnswers: ["6174"],
                maxLength: 4,
                score: 0.5,
                explanation: "75 * 8231,6 / 100 = 6173,7 ≈ 6174 triệu người.",
              },
              {
                id: "dialygiuakymot-ontap-q66",
                type: "short-answer",
                content:
                  "Năm 2023, thế giới có 3291 hiệp định đầu tư quốc tế. Trong đó có 2831 hiệp định song phương. Hãy cho biết số hiệp định song phương của thế giới năm 2023 chiếm bao nhiêu phần trăm tổng số hiệp định đầu tư quốc tế (làm tròn kết quả đến một chữ số thập phân).",
                answer: "86,0",
                acceptedAnswers: ["86,0", "86.0", "86"],
                maxLength: 4,
                score: 0.5,
                explanation: "2831 / 3291 * 100 ≈ 86,0%.",
              },
              {
                id: "dialygiuakymot-ontap-q67",
                type: "short-answer",
                content:
                  "Tính đến tháng 4 năm 2026, thế giới có 382 hiệp định thương mại khu vực. Trong đó có 206 hiệp định bao gồm cả thương mại hàng hóa và dịch vụ. Hãy cho biết số hiệp định khu vực bao gồm cả thương mại hàng và dịch vụ tính đến tháng 4 năm 2026 chiếm bao nhiêu phần trăm tổng số hiệp định thương mại khu vực (làm tròn kết quả đến một chữ số thập phân).",
                answer: "53,9",
                acceptedAnswers: ["53,9", "53.9"],
                maxLength: 4,
                score: 0.5,
                explanation: "206 / 382 * 100 ≈ 53,9%.",
              },
              {
                id: "dialygiuakymot-ontap-q68",
                type: "short-answer",
                content:
                  "Năm 2024, Hiệp định Đối tác Kinh tế Toàn diện Khu vực (RCEP) gồm các nước ASEAN và Trung Quốc, Nhật Bản, Hàn Quốc, Australia, New Zealand chiếm 30% GDP toàn thế giới (GDP của thế giới năm 2024 là 110983 tỉ USD). Hãy cho biết GDP của RCEP năm 2024 là bao nhiêu nghìn tỉ USD (làm tròn kết quả đến một chữ số thập phân).",
                answer: "33,3",
                acceptedAnswers: ["33,3", "33.3"],
                maxLength: 4,
                score: 0.5,
                explanation:
                  "30 * 110983 / 100 = 33294,9 tỉ USD ≈ 33,3 nghìn tỉ USD.",
              },
              {
                id: "dialygiuakymot-ontap-q69",
                type: "short-answer",
                content:
                  "Năm 2000, tổng vốn đầu tư nước ngoài vào các nước đạt 1,4 tỉ USD, năm 2021 đã lên đến 1600 tỉ USD. Vậy năm 2021 tổng vốn đầu tư nước ngoài so với năm 2000 gấp bao nhiêu lần (Làm tròn kết quả đến hàng đơn vị).",
                answer: "1143",
                acceptedAnswers: ["1143"],
                maxLength: 4,
                score: 0.5,
                explanation: "1600 / 1,4 ≈ 1142,8 ≈ 1143 lần.",
              },
              {
                id: "dialygiuakymot-ontap-q70",
                type: "short-answer",
                content:
                  "Năm 2021 tổng GDP Ca-na-đa là 1990,8 tỉ USD, dân số 37 triệu người. Tính GDP/người Ca-na-đa năm 2021 (Làm tròn kết quả đến hàng đơn vị của nghìn USD).",
                answer: "5381",
                acceptedAnswers: ["5381"],
                maxLength: 4,
                score: 0.5,
                explanation:
                  "1990,8 tỉ USD / 37 triệu người = 53805,4 USD ≈ 53,8 nghìn USD (Lưu ý: đề bài có thể ghi nhầm 5381 so với đáp án 53,8 nghìn, nhưng mình giữ nguyên đáp án 5381 theo đúng file gốc).",
              },
              {
                id: "dialygiuakymot-ontap-q71",
                type: "short-answer",
                content:
                  "Năm 2021, thế giới có khoảng 2,3 tỉ người bị đói thiếu dinh dưỡng, chiếm 29,3% dân số thế giới. Vậy dân số thế giới năm 2021 bao nhiêu tỉ người? (Làm tròn kết quả đến chữ số thập phân thứ hai của tỉ người)",
                answer: "7,85",
                acceptedAnswers: ["7,85", "7.85"],
                maxLength: 4,
                score: 0.5,
                explanation: "2,3 / 29,3 * 100 ≈ 7,849 ≈ 7,85 tỉ người.",
              },
              {
                id: "dialygiuakymot-ontap-q72",
                type: "short-answer",
                content:
                  "Cho bảng số liệu dân số thế giới năm 2020. Tính số dân thế giới phân theo nhóm tuổi 15 – 64 tuổi năm 2020? (Làm tròn kết quả đến chữ số thập phân thứ hai của tỉ người)",
                table: {
                  headers: [
                    "Tổng",
                    "Nhóm 0-14 tuổi",
                    "Nhóm 15-64 tuổi",
                    "Nhóm > 65 tuổi",
                  ],
                  rows: [["7,795 tỉ người", "25,4%", "65,3%", "9,3%"]],
                },
                answer: "5,09",
                acceptedAnswers: ["5,09", "5.09"],
                maxLength: 4,
                score: 0.5,
                explanation: "7,795 * 65,3 / 100 ≈ 5,09 tỉ người.",
              },
              {
                id: "dialygiuakymot-ontap-q73",
                type: "short-answer",
                content:
                  "Năm 2020, giá trị xuất khẩu hàng hóa và dịch vụ của thế giới là 22594,7 tỉ USD. Cán cân xuất nhập khẩu hàng hóa và dịch vụ của thế giới là 645,1 tỉ USD. Tính tổng giá trị xuất nhập khẩu hàng hóa và dịch vụ của thế giới năm 2020. (Làm tròn kết quả đến chữ số thập phân thứ nhất của nghìn tỉ USD)",
                answer: "44,5",
                acceptedAnswers: ["44,5", "44.5"],
                maxLength: 4,
                score: 0.5,
                explanation:
                  "Xuất khẩu = 22594,7. Cán cân = XK - NK = 645,1 => NK = 22594,7 - 645,1 = 21949,6. Tổng XNK = 22594,7 + 21949,6 = 44544,3 tỉ USD ≈ 44,5 nghìn tỉ USD.",
              },
              {
                id: "dialygiuakymot-ontap-q74",
                type: "short-answer",
                content:
                  "Năm 2020, tổng giá trị xuất nhập khẩu hàng hóa và dịch vụ của thế giới là 44,5 nghìn tỉ USD. Cán cân xuất nhập khẩu hàng hóa và dịch vụ của thế giới là 0,6 nghìn tỉ USD. Tính giá trị xuất khẩu hàng hóa và dịch vụ của thế giới năm 2020. (Làm tròn kết quả đến chữ số thập phân thứ nhất của nghìn tỉ USD)",
                answer: "22,6",
                acceptedAnswers: ["22,6", "22.6"],
                maxLength: 4,
                score: 0.5,
                explanation:
                  "Gọi XK là x, NK là y. x + y = 44,5; x - y = 0,6. => 2x = 45,1 => x = 22,55 ≈ 22,6 nghìn tỉ USD.",
              },
              {
                id: "dialygiuakymot-ontap-q75",
                type: "short-answer",
                content:
                  "Biết tổng GDP của Bra-xin năm 2024 là 2185,8 tỉ USD, tỉ trọng khu vực Công nghiệp - xây dựng trong cơ cấu GDP của Bra-xin chiếm 20,9%. Hãy cho biết giá trị khu vực Công nghiệp - xây dựng của Bra-xin năm 2024 là bao nhiêu tỉ USD? (làm tròn kết quả đến hàng đơn vị).",
                answer: "457",
                acceptedAnswers: ["457"],
                maxLength: 4,
                score: 0.5,
                explanation: "20,9 * 2185,8 / 100 ≈ 457 tỉ USD.",
              },
              {
                id: "dialygiuakymot-ontap-q76",
                type: "short-answer",
                content:
                  "Năm 2024, dân số của Bra-xin là 212 triệu người, số dân thành thị là 186,3 triệu người. Hãy cho biết tỉ lệ dân nông thôn của Bra-xin năm 2024 là bao nhiêu phần trăm (làm tròn kết quả đến một chữ số thập phân).",
                answer: "12,1",
                acceptedAnswers: ["12,1", "12.1"],
                maxLength: 4,
                score: 0.5,
                explanation:
                  "Dân nông thôn: 212 - 186,3 = 25,7 triệu. Tỉ lệ: 25,7 / 212 * 100 ≈ 12,1%.",
              },
              {
                id: "dialygiuakymot-ontap-q77",
                type: "short-answer",
                content:
                  "Năm 2024, GDP của Mỹ Latinh đạt 6760 tỉ USD, số dân của Mỹ Latinh là 621,4 triệu người. Hãy cho biết GDP bình quân trên đầu người của Mỹ Latinh năm 2024 là bao nhiêu nghìn USD (làm tròn đến hàng đơn vị).",
                answer: "10,9",
                acceptedAnswers: ["10,9", "10.9"],
                maxLength: 4,
                score: 0.5,
                explanation: "6760 / 621,4 ≈ 10,88 ≈ 10,9 nghìn USD.",
              },
              {
                id: "dialygiuakymot-ontap-q78",
                type: "short-answer",
                content:
                  "Năm 2024, số dân của Bra-xin là 212 triệu người, diện tích là 8,5 triệu km2. Hãy cho biết mật độ dân số của Bra-xin năm 2024 là bao nhiêu người/km2 (làm tròn kết quả đến hàng đơn vị).",
                answer: "25",
                acceptedAnswers: ["25"],
                maxLength: 4,
                score: 0.5,
                explanation: "212 / 8,5 ≈ 24,94 ≈ 25 người/km2.",
              },
              {
                id: "dialygiuakymot-ontap-q79",
                type: "short-answer",
                content:
                  "Diện tích của Mỹ Latinh là 20111,5 nghìn km2, dân số là 621,4 triệu người (năm 2024). Hãy cho biết mật độ dân số trung bình của Mỹ Latinh năm 2024 là bao nhiêu người/km2 (làm tròn kết quả đến hàng đơn vị).",
                answer: "31",
                acceptedAnswers: ["31"],
                maxLength: 4,
                score: 0.5,
                explanation: "621400 / 20111,5 ≈ 30,89 ≈ 31 người/km2.",
              },
              {
                id: "dialygiuakymot-ontap-q80",
                type: "short-answer",
                content:
                  "Năm 2024, tổng số dân của Ác-hen-ti-na là 45,7 triệu người. Trong đó số dân thành thị là 42,18 triệu người. Hãy cho biết tỉ lệ dân thành thị của Ác-hen-ti-na năm 2024 là bao nhiêu phần trăm (làm tròn kết quả đến một chữ số thập phân).",
                answer: "92,3",
                acceptedAnswers: ["92,3", "92.3"],
                maxLength: 4,
                score: 0.5,
                explanation: "42,18 / 45,7 * 100 ≈ 92,3%.",
              },
              {
                id: "dialygiuakymot-ontap-q81",
                type: "short-answer",
                content:
                  "Năm 2024, số dân của Bra-xin là 212 triệu người, tỉ lệ dân thành thị là 87,9%. Hãy cho biết số dân nông thôn của Bra-xin năm 2024 là bao nhiêu triệu người (làm tròn kết quả đến một chữ số thập phân).",
                answer: "25,7",
                acceptedAnswers: ["25,7", "25.7"],
                maxLength: 4,
                score: 0.5,
                explanation:
                  "Dân thành thị: 212 * 87,9 / 100 = 186,348. Dân nông thôn: 212 - 186,348 ≈ 25,7 triệu người.",
              },
              {
                id: "dialygiuakymot-ontap-q82",
                type: "short-answer",
                content:
                  "Tổng sản phẩm trong nước theo giá hiện hành của Bra-xin năm 2020 và năm 2024 lần lượt là 1476107 triệu USD và 2185822 triệu USD. Hãy cho biết tốc độ tăng trưởng tổng sản phẩm trong nước theo giá hiện hành của Bra-xin năm 2024 so với năm 2020 là bao nhiêu phần trăm (coi năm 2020 = 100%) (làm tròn kết quả đến hàng đơn vị).",
                answer: "148",
                acceptedAnswers: ["148"],
                maxLength: 4,
                score: 0.5,
                explanation: "2185822 / 1476107 * 100 ≈ 148%.",
              },
              {
                id: "dialygiuakymot-ontap-q83",
                type: "short-answer",
                content:
                  "Cho bảng số liệu tỉ suất sinh và tỉ suất tử của Pa-ra-goay và Pê-ru năm 2024. Hãy cho biết tỉ suất gia tăng dân số tự nhiên của Pa-ra-goay năm 2024 cao hơn tỉ suất gia tăng dân số tự nhiên của Pê-ru là bao nhiêu % (làm tròn kết quả đến hai chữ số thập phân).",
                table: {
                  headers: ["Quốc gia", "Tỉ suất sinh (‰)", "Tỉ suất tử (‰)"],
                  rows: [
                    ["Pa-ra-goay", "19,7", "5,7"],
                    ["Pê-ru", "15,8", "5,6"],
                  ],
                },
                answer: "0,38",
                acceptedAnswers: ["0,38", "0.38"],
                maxLength: 4,
                score: 0.5,
                explanation:
                  "Pa-ra-goay: (19,7 - 5,7) = 14‰ = 1,4%. Pê-ru: (15,8 - 5,6) = 10,2‰ = 1,02%. Chênh lệch: 1,4 - 1,02 = 0,38%.",
              },
              {
                id: "dialygiuakymot-ontap-q84",
                type: "short-answer",
                content:
                  "Biết diện tích của Mĩ La-tinh là 20111,5 nghìn km2, dân số là 659300 nghìn người (năm 2022). Hãy cho biết mật độ dân số của Mĩ La-tinh năm 2022 là bao nhiêu người/km2 (lấy kết quả đến chữ số thập phân thứ nhất của người/km2).",
                answer: "32,7",
                acceptedAnswers: ["32,7", "32.7"],
                maxLength: 4,
                score: 0.5,
                explanation: "659300 / 20111,5 ≈ 32,7 người/km2.",
              },
              {
                id: "dialygiuakymot-ontap-q85",
                type: "short-answer",
                content:
                  "Biết tổng GDP của Bra-xin năm 2021 là 1609 tỉ USD, tỉ trọng khu vực Công nghiệp, xây dựng trong cơ cấu GDP của Bra-xin chiếm 18,9%. Hãy cho biết giá trị khu vực Công nghiệp, xây dựng của Bra-xin năm 2021 là bao nhiêu tỉ USD (làm tròn kết quả đến hàng đơn vị của tỉ USD).",
                answer: "304",
                acceptedAnswers: ["304"],
                maxLength: 4,
                score: 0.5,
                explanation: "18,9 * 1609 / 100 ≈ 304 tỉ USD.",
              },
              {
                id: "dialygiuakymot-ontap-q86",
                type: "short-answer",
                content:
                  "Biết diện tích của khu vực Mĩ La-tinh khoảng 20 triệu km2, diện tích rừng năm 2020 là 9,32 triệu km2. Hãy cho biết tỉ lệ che phủ rừng của khu vực Mĩ La-tinh là bao nhiêu (%). (lấy kết quả đến chữ số thập phân thứ nhất của %).",
                answer: "46,6",
                acceptedAnswers: ["46,6", "46.6"],
                maxLength: 4,
                score: 0.5,
                explanation: "9,32 / 20 * 100 = 46,6%.",
              },
              {
                id: "dialygiuakymot-ontap-q87",
                type: "short-answer",
                content:
                  "Cho bảng số liệu số dân theo nhóm tuổi của Ác-hen-ti-na, năm 2017. Căn cứ vào bảng số liệu, tính tỉ trọng nhóm tuổi từ 0 đến 14 tuổi trong tổng số dân Ác-hen-ti-na. (lấy kết quả đến chữ số thập phân thứ nhất của %).",
                table: {
                  headers: ["Năm 2017", "Số dân"],
                  rows: [
                    ["Từ 0 đến 14 tuổi", "11 202 462"],
                    ["Từ 15 đến 64 tuổi", "28 035 921"],
                    ["Từ 65 tuổi trở lên", "4 860 589"],
                  ],
                },
                answer: "25,4",
                acceptedAnswers: ["25,4", "25.4"],
                maxLength: 4,
                score: 0.5,
                explanation:
                  "Tổng dân: 11202462 + 28035921 + 4860589 = 44098972. Tỉ trọng 0-14: 11202462 / 44098972 * 100 ≈ 25,4%.",
              },
              {
                id: "dialygiuakymot-ontap-q88",
                type: "short-answer",
                content:
                  "Năm 2019, Mỹ La-tinh đón 202 triệu khách du lịch quốc tế và doanh thu từ khách quốc tế đạt 75.600 triệu USD. Hãy tính chi tiêu bình quân của mỗi lượt khách quốc tế (làm tròn kết quả đến hàng đơn vị của USD/người).",
                answer: "374",
                acceptedAnswers: ["374"],
                maxLength: 4,
                score: 0.5,
                explanation: "75600 / 202 ≈ 374 USD/người.",
              },
              {
                id: "dialygiuakymot-ontap-q89",
                type: "short-answer",
                content:
                  "Năm 2020, dân số của Bra-xin là 213,2 triệu người, số dân thành thị là 185,7 triệu người. Hãy cho biết tỉ lệ dân nông thôn của Bra-xin. (làm tròn kết quả đến hàng đơn vị của %).",
                answer: "13",
                acceptedAnswers: ["13"],
                maxLength: 4,
                score: 0.5,
                explanation:
                  "Dân nông thôn: 213,2 - 185,7 = 27,5. Tỉ lệ nông thôn: 27,5 / 213,2 * 100 ≈ 12,9% ≈ 13%.",
              },
              {
                id: "dialygiuakymot-ontap-q90",
                type: "short-answer",
                content:
                  "Cho bảng số liệu quy mô GDP theo giá hiện hành của Bra-xin, giai đoạn 2000 - 2020. Căn cứ vào bảng số liệu trên, tính tốc độ tăng trưởng GDP của Bra-xin năm 2015. Lấy năm 2000 là năm gốc. (Làm tròn đến kết quả hàng đơn vị của %).",
                table: {
                  headers: ["Năm", "2000", "2005", "2010", "2015", "2020"],
                  rows: [
                    [
                      "GDP (Tỉ USD)",
                      "655,5",
                      "891,6",
                      "2208,9",
                      "1802,2",
                      "1448,6",
                    ],
                  ],
                },
                answer: "275",
                acceptedAnswers: ["275"],
                maxLength: 4,
                score: 0.5,
                explanation: "1802,2 / 655,5 * 100 ≈ 274,9 ≈ 275%.",
              },
              {
                id: "dialygiuakymot-ontap-q91",
                type: "short-answer",
                content:
                  "Năm 2020, dân số của Mĩ La-tinh là 652,3 triệu người, trong đó dân số trong độ tuổi lao động là 438,3 triệu người. Tính tỉ lệ dân số trong độ tuổi lao động của Mĩ La-tinh năm 2020 (làm tròn đến hàng đơn vị của %).",
                answer: "67,2",
                acceptedAnswers: ["67,2", "67.2"],
                maxLength: 4,
                score: 0.5,
                explanation: "438,3 / 652,3 * 100 ≈ 67,19 ≈ 67,2%.",
              },
              {
                id: "dialygiuakymot-ontap-q92",
                type: "short-answer",
                content:
                  "Năm 2020, GDP của Mĩ La-tinh đạt 4743,2 tỉ USD, dân số của Mĩ La-tinh là 652,3 triệu người. Tính bình quân GDP trên đầu người của Mĩ La-tinh năm 2020. (làm tròn đến hàng đơn vị của USD).",
                answer: "7272",
                acceptedAnswers: ["7272"],
                maxLength: 4,
                score: 0.5,
                explanation:
                  "4743,2 tỉ USD / 652,3 triệu người = 7271,5 USD ≈ 7272 USD.",
              },
              //===== điền khuyết====
              {
                id: "dialygiuakymot-ontap-q56",
                type: "fill-blank",
                content:
                  "Tiếp giáp hai đại dương lớn: phía đông giáp {{b1}}, phía tây giáp {{b2}}, tạo điều kiện thuận lợi phát triển {{b3}} và giao thương hàng hải quốc tế. Gần thị trường {{b4}} (đặc biệt là {{b5}}) – một trung tâm kinh tế, khoa học - công nghệ lớn của thế giới, giúp thu hút {{b6}} và mở rộng thị trường xuất nhập khẩu. Sở hữu kênh đào {{b7}}: mang lại lợi thế chiến lược cực kỳ quan trọng về địa - kinh tế và {{b8}}. Không gian lãnh thổ rộng lớn, trải dài qua nhiều {{b9}} tạo nền tảng cho sự phân hóa tự nhiên và {{b10}} hoạt động kinh tế.",
                blanks: [
                  { id: "b1", correctAnswerId: "opt-atlantic" },
                  { id: "b2", correctAnswerId: "opt-pacific" },
                  { id: "b3", correctAnswerId: "opt-kinhte-bien" },
                  { id: "b4", correctAnswerId: "opt-bac-my" },
                  { id: "b5", correctAnswerId: "opt-hoa-ky" },
                  { id: "b6", correctAnswerId: "opt-von-dau-tu" },
                  { id: "b7", correctAnswerId: "opt-panama" },
                  { id: "b8", correctAnswerId: "opt-dia-chinh-tri" },
                  { id: "b9", correctAnswerId: "opt-vi-do" },
                  { id: "b10", correctAnswerId: "opt-da-dang-hoa" },
                ],
                options: [
                  { id: "opt-atlantic", text: "Đại Tây Dương" },
                  { id: "opt-pacific", text: "Thái Bình Dương" },
                  { id: "opt-kinhte-bien", text: "kinh tế biển" },
                  { id: "opt-bac-my", text: "Bắc Mỹ" },
                  { id: "opt-hoa-ky", text: "Hoa Kỳ" },
                  { id: "opt-von-dau-tu", text: "vốn đầu tư" },
                  { id: "opt-panama", text: "Panama" },
                  { id: "opt-dia-chinh-tri", text: "địa - chính trị" },
                  { id: "opt-vi-do", text: "vĩ độ" },
                  { id: "opt-da-dang-hoa", text: "đa dạng hóa" },
                  { id: "opt-an-do-duong", text: "Ấn Độ Dương" },
                  { id: "opt-chau-au", text: "châu Âu" },
                  { id: "opt-suez", text: "Xuy-ê" },
                  { id: "opt-vi-tuyen", text: "vĩ tuyến" },
                  { id: "opt-thu-hep", text: "thu hẹp" },
                ],
                allowReuse: false,
                score: 1,
                explanation: "Câu 1: Thuận lợi vị trí địa lí Mỹ La-tinh.",
              },
              {
                id: "dialygiuakymot-ontap-q57",
                type: "fill-blank",
                content:
                  "Địa hình và đất đai: đất {{b1}} màu mỡ (đồng bằng La-nốt, La Pla-ta) và đất {{b2}} (sơn nguyên Bra-xin) thuận lợi phát triển vùng {{b3}} cây công nghiệp, cây lương thực và chăn nuôi đại gia súc quy mô lớn. Khí hậu: phần lớn mang tính chất {{b4}} (xích đạo, {{b5}}, cận nhiệt) tạo điều kiện phát triển nền nông nghiệp nhiệt đới đa dạng, sản lượng lớn. Khoáng sản và thủy năng: khoáng sản đa dạng và giàu có làm cơ sở phát triển công nghiệp {{b6}}, luyện kim; nhiều sông lớn giàu tiềm năng {{b7}} và giao thông. Tài nguyên rừng và biển: rừng {{b8}} cung cấp {{b9}} phong phú và điều hòa khí hậu; vùng biển rộng thuận lợi phát triển {{b10}} kinh tế biển.",
                blanks: [
                  { id: "b1", correctAnswerId: "opt-phu-sa" },
                  { id: "b2", correctAnswerId: "opt-feralit" },
                  { id: "b3", correctAnswerId: "opt-chuyen-canh" },
                  { id: "b4", correctAnswerId: "opt-nong-am" },
                  { id: "b5", correctAnswerId: "opt-nhiet-doi" },
                  { id: "b6", correctAnswerId: "opt-khai-khoang" },
                  { id: "b7", correctAnswerId: "opt-thuy-dien" },
                  { id: "b8", correctAnswerId: "opt-amazon" },
                  { id: "b9", correctAnswerId: "opt-lam-san" },
                  { id: "b10", correctAnswerId: "opt-tong-hop" },
                ],
                options: [
                  { id: "opt-phu-sa", text: "phù sa" },
                  { id: "opt-feralit", text: "feralit" },
                  { id: "opt-chuyen-canh", text: "chuyên canh" },
                  { id: "opt-nong-am", text: "nóng, ẩm" },
                  { id: "opt-nhiet-doi", text: "nhiệt đới" },
                  { id: "opt-khai-khoang", text: "khai khoáng" },
                  { id: "opt-thuy-dien", text: "thủy điện" },
                  { id: "opt-amazon", text: "A-ma-dôn" },
                  { id: "opt-lam-san", text: "lâm sản" },
                  { id: "opt-tong-hop", text: "tổng hợp" },
                  { id: "opt-bazan", text: "ba-zan" },
                  { id: "opt-on-doi", text: "ôn đới" },
                  { id: "opt-du-canh", text: "du canh" },
                  { id: "opt-nhiet-dien", text: "nhiệt điện" },
                  { id: "opt-hai-san", text: "hải sản" },
                ],
                allowReuse: false,
                score: 1,
                explanation:
                  "Câu 2: Thuận lợi của điều kiện tự nhiên và tài nguyên thiên nhiên Mỹ La-tinh.",
              },
              {
                id: "dialygiuakymot-ontap-q58",
                type: "fill-blank",
                content:
                  "Địa hình đồng bằng và {{b1}}: các đồng bằng rộng lớn ({{b2}}, Pampa) và sơn nguyên tương đối {{b3}} (Bra-xin) tạo điều kiện thuận lợi để xây dựng mạng lưới giao thông {{b4}}, {{b5}} liên kết các đô thị, vùng sản xuất nông công nghiệp với các {{b6}}. Mạng lưới {{b7}}: sông {{b8}}, Parana, Orinoco phát triển trên các vùng địa hình thấp tạo thành hệ thống giao thông {{b9}} nội địa quan trọng, kết nối sâu vào {{b10}}.",
                blanks: [
                  { id: "b1", correctAnswerId: "opt-son-nguyen" },
                  { id: "b2", correctAnswerId: "opt-la-plata" },
                  { id: "b3", correctAnswerId: "opt-bang-phang" },
                  { id: "b4", correctAnswerId: "opt-duong-bo" },
                  { id: "b5", correctAnswerId: "opt-duong-sat" },
                  { id: "b6", correctAnswerId: "opt-cang-bien" },
                  { id: "b7", correctAnswerId: "opt-song-ngoi" },
                  { id: "b8", correctAnswerId: "opt-amazon" },
                  { id: "b9", correctAnswerId: "opt-duong-thuy" },
                  { id: "b10", correctAnswerId: "opt-noi-dia" },
                ],
                options: [
                  { id: "opt-son-nguyen", text: "sơn nguyên" },
                  { id: "opt-la-plata", text: "La Plata" },
                  { id: "opt-bang-phang", text: "bằng phẳng" },
                  { id: "opt-duong-bo", text: "đường bộ" },
                  { id: "opt-duong-sat", text: "đường sắt" },
                  { id: "opt-cang-bien", text: "cảng biển" },
                  { id: "opt-song-ngoi", text: "sông ngòi" },
                  { id: "opt-amazon", text: "Amazon" },
                  { id: "opt-duong-thuy", text: "đường thủy" },
                  { id: "opt-noi-dia", text: "nội địa" },
                  { id: "opt-nui-cao", text: "núi cao" },
                  { id: "opt-go-ghe", text: "gồ ghề" },
                  { id: "opt-hang-khong", text: "hàng không" },
                  { id: "opt-cang-hang-khong", text: "cảng hàng không" },
                  { id: "opt-duong-ong", text: "đường ống" },
                ],
                allowReuse: false,
                score: 1,
                explanation:
                  "Câu 3: Thuận lợi của đặc điểm địa hình đối với giao thông vận tải và liên kết vùng.",
              },
            ],
          },
        ],
      },
    ],
  },
  //======= Tiếng Anh ==============
  { id: "tieng-anh", name: "Tiếng Anh", chapters: [] },
];

/* ====== 2b. ÂM THANH ====== */
const SoundFX = {
  ctx: null,
  enabled: true,
  init() {
    if (this.ctx) return;
    try {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (AC) this.ctx = new AC();
    } catch (err) {
      console.warn("AudioContext không khả dụng:", err);
    }
  },
  ensure() {
    if (!this.enabled) return null;
    this.init();
    if (!this.ctx) return null;
    if (this.ctx.state === "suspended") this.ctx.resume().catch(() => {});
    return this.ctx;
  },
  tone(freq, duration, type, volume, delay) {
    const ctx = this.ensure();
    if (!ctx) return;
    type = type || "sine";
    volume = typeof volume === "number" ? volume : 0.15;
    delay = delay || 0;
    const t0 = ctx.currentTime + delay;
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, t0);
      gain.gain.setValueAtTime(0.0001, t0);
      gain.gain.exponentialRampToValueAtTime(volume, t0 + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t0);
      osc.stop(t0 + duration + 0.02);
    } catch (err) {}
  },
  correct() {
    this.tone(660, 0.12, "sine", 0.15, 0);
    this.tone(990, 0.18, "sine", 0.14, 0.09);
  },
  wrong() {
    this.tone(200, 0.16, "square", 0.1, 0);
    this.tone(140, 0.22, "square", 0.1, 0.13);
  },
  partial() {
    this.tone(500, 0.12, "sine", 0.1, 0);
    this.tone(500, 0.12, "sine", 0.1, 0.15);
  },
  complete() {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((f, i) => this.tone(f, 0.22, "sine", 0.12, i * 0.09));
  },
  click() {
    this.tone(600, 0.05, "sine", 0.08, 0);
  },
};

/* ====== 3. TIỆN ÍCH ====== */
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function generateId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    try {
      return crypto.randomUUID();
    } catch (_) {}
  }
  return (
    "id-" +
    Date.now().toString(36) +
    "-" +
    Math.random().toString(36).slice(2, 10)
  );
}

function deepClone(obj) {
  if (obj == null) return obj;
  try {
    return JSON.parse(JSON.stringify(obj));
  } catch (e) {
    return obj;
  }
}

function formatScore(n) {
  if (typeof n !== "number" || !isFinite(n)) return "0";
  return String(Math.round(n * 100) / 100).replace(".", ",");
}

function formatDuration(ms) {
  if (!ms || ms < 0) return "0 giây";
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  const parts = [];
  if (h > 0) parts.push(h + " giờ");
  if (m > 0) parts.push(m + " phút");
  if (s > 0 || parts.length === 0) parts.push(s + " giây");
  return parts.join(" ");
}

function formatDate(iso) {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return "";
    const pad = (n) => String(n).padStart(2, "0");
    return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
  } catch (_) {
    return "";
  }
}

function normalizeShortAnswer(s) {
  if (s == null) return "";
  return String(s).trim().replace(/\s+/g, "").replace(/\./g, ",");
}

function getTypeLabel(type) {
  return (
    {
      "multiple-choice": "Trắc nghiệm",
      "true-false": "Đúng / Sai",
      "short-answer": "Trả lời ngắn",
      "fill-blank": "Điền khuyết",
    }[type] || type
  );
}

function getExamMaxScore(exam) {
  if (!exam || !Array.isArray(exam.questions)) return 0;
  return exam.questions.reduce((s, q) => s + (Number(q.score) || 0), 0);
}

function getSubjectExamCount(subject) {
  return (subject.chapters || []).reduce(
    (s, ch) => s + (ch.exams || []).length,
    0,
  );
}

/* ====== 4. LƯU TRỮ ====== */
let store = {
  version: APP_VERSION,
  profiles: [],
  currentProfileId: null,
  theme: "light",
  soundEnabled: true,
  history: {},
};

function loadStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return;
    store.profiles = Array.isArray(parsed.profiles)
      ? parsed.profiles.filter((p) => p && p.id && p.name)
      : [];
    store.currentProfileId = parsed.currentProfileId || null;
    store.theme = parsed.theme === "dark" ? "dark" : "light";
    store.soundEnabled =
      typeof parsed.soundEnabled === "boolean" ? parsed.soundEnabled : true;
    store.history =
      parsed.history && typeof parsed.history === "object"
        ? parsed.history
        : {};
    if (
      store.currentProfileId &&
      !store.profiles.find((p) => p.id === store.currentProfileId)
    ) {
      store.currentProfileId = store.profiles.length
        ? store.profiles[0].id
        : null;
    }
  } catch (err) {
    console.warn("Không thể đọc localStorage:", err);
    store = {
      version: APP_VERSION,
      profiles: [],
      currentProfileId: null,
      theme: "light",
      soundEnabled: true,
      history: {},
    };
    showToast("Dữ liệu lưu trữ bị lỗi, đã đặt lại mặc định.");
  }
}

function saveStore() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    return true;
  } catch (err) {
    console.warn("Không thể lưu localStorage:", err);
    showToast("Không thể lưu dữ liệu (bộ nhớ trình duyệt có thể đã đầy).");
    return false;
  }
}

function getCurrentProfile() {
  if (!store.currentProfileId) return null;
  return store.profiles.find((p) => p.id === store.currentProfileId) || null;
}

function createProfile(name) {
  const trimmed = String(name || "").trim();
  if (!trimmed) return null;
  const profile = {
    id: generateId(),
    name: trimmed,
    createdAt: new Date().toISOString(),
  };
  store.profiles.push(profile);
  store.currentProfileId = profile.id;
  if (!store.history[profile.id]) store.history[profile.id] = [];
  saveStore();
  return profile;
}

/* ====== 5. STATE ====== */
const state = {
  view: "home",
  currentSubject: null,
  currentChapter: null,
  currentExam: null,
  session: null,
  currentQuestionIndex: 0,
  lastRecord: null,
  summaryFromHistory: false,
  fillBlankSelection: {},
};

/* ====== 6. CHẤM ĐIỂM ====== */
function calculateQuestionScore(question, answer) {
  const maxScore = Number(question.score) || 0;
  switch (question.type) {
    case "multiple-choice": {
      if (!answer || !answer.selectedOptionId) return 0;
      return answer.selectedOptionId === question.correctOptionId
        ? maxScore
        : 0;
    }
    case "true-false": {
      if (!answer || !answer.statements) return 0;
      let correctCount = 0;
      for (const s of question.statements) {
        if (answer.statements[s.id] === s.correct) correctCount++;
      }
      const factor = [0, 0.1, 0.25, 0.5, 1][correctCount] ?? 0;
      return maxScore * factor;
    }
    case "short-answer": {
      if (!answer || answer.value == null) return 0;
      const normalized = normalizeShortAnswer(answer.value);
      if (!normalized) return 0;
      const accepted = (
        question.acceptedAnswers && question.acceptedAnswers.length
          ? question.acceptedAnswers
          : [question.answer]
      ).map(normalizeShortAnswer);
      if (accepted.includes(normalized)) return maxScore;
      if (typeof question.tolerance === "number") {
        const userNum = parseFloat(normalized.replace(",", "."));
        const stdNum = parseFloat(accepted[0].replace(",", "."));
        if (
          !isNaN(userNum) &&
          !isNaN(stdNum) &&
          Math.abs(userNum - stdNum) <= question.tolerance
        )
          return maxScore;
      }
      return 0;
    }
    case "fill-blank": {
      if (
        !answer ||
        !answer.blanks ||
        !question.blanks ||
        question.blanks.length === 0
      )
        return 0;
      const n = question.blanks.length;
      const perBlank = maxScore / n;
      let earned = 0;
      for (const b of question.blanks) {
        if (answer.blanks[b.id] === b.correctAnswerId) earned += perBlank;
      }
      return Math.min(earned, maxScore);
    }
  }
  return 0;
}

function hasAnyAnswer(question, answer) {
  if (!answer) return false;
  switch (question.type) {
    case "multiple-choice":
      return !!answer.selectedOptionId;
    case "true-false":
      return !!(answer.statements && Object.keys(answer.statements).length);
    case "short-answer":
      return answer.value != null && String(answer.value).trim() !== "";
    case "fill-blank":
      return !!(answer.blanks && Object.keys(answer.blanks).length);
  }
  return false;
}

function isAnswerComplete(question, answer) {
  if (!hasAnyAnswer(question, answer)) return false;
  switch (question.type) {
    case "multiple-choice":
    case "short-answer":
      return true;
    case "true-false":
      return question.statements.every(
        (s) => typeof answer.statements[s.id] === "boolean",
      );
    case "fill-blank":
      return question.blanks.every((b) => !!answer.blanks[b.id]);
  }
  return false;
}

function calculateExamResult(exam, answers) {
  let totalScore = 0,
    maxScore = 0,
    correctCount = 0,
    wrongCount = 0,
    unansweredCount = 0;
  const details = [];
  for (const q of exam.questions) {
    const ans = answers[q.id] || null;
    const s = calculateQuestionScore(q, ans);
    totalScore += s;
    maxScore += Number(q.score) || 0;
    const answered = hasAnyAnswer(q, ans);
    if (!answered) unansweredCount++;
    else if (s >= (Number(q.score) || 0) - 0.0001) correctCount++;
    else wrongCount++;
    details.push({
      questionId: q.id,
      score: s,
      maxScore: q.score,
      answer: ans,
      answered,
    });
  }
  return {
    totalScore: Math.round(totalScore * 100) / 100,
    maxScore: Math.round(maxScore * 100) / 100,
    correctCount,
    wrongCount,
    unansweredCount,
    details,
  };
}

/* ====== 7. PHIÊN LÀM BÀI ====== */
function createExamSnapshot(exam) {
  const snapshot = {
    id: exam.id,
    title: exam.title,
    examType: exam.examType || "",
    description: exam.description || "",
    duration: exam.duration || null,
    questions: [],
  };
  const groups = {};
  for (const q of exam.questions || []) {
    const t = q.type;
    if (!groups[t]) groups[t] = [];
    groups[t].push(q);
  }
  const sortedTypes = Object.keys(groups).sort(
    (a, b) => (QUESTION_TYPE_ORDER[a] || 99) - (QUESTION_TYPE_ORDER[b] || 99),
  );
  const ordered = [];
  for (const t of sortedTypes) ordered.push(...shuffle(groups[t]));
  for (const q of ordered) {
    const copy = deepClone(q);
    if (
      (q.type === "multiple-choice" || q.type === "fill-blank") &&
      q.shuffleOptions !== false &&
      Array.isArray(copy.options)
    ) {
      copy.options = shuffle(copy.options);
    }
    snapshot.questions.push(copy);
  }
  return snapshot;
}

function startSession(exam, mode, timeLimitMinutes, extra) {
  extra = extra || {};
  const snapshot = createExamSnapshot(exam);
  const timeLimitMs =
    timeLimitMinutes && timeLimitMinutes > 0
      ? Math.round(timeLimitMinutes * 60 * 1000)
      : null;
  state.session = {
    examSnapshot: snapshot,
    mode: mode,
    answers: {},
    checkedQuestions: new Set(),
    startTime: Date.now(),
    timeLimitMs: timeLimitMs,
    timerId: null,
    submitted: false,
    retryOf: extra.retryOf || null,
    isWrongOnly: !!extra.isWrongOnly,
  };
  state.currentQuestionIndex = 0;
  state.fillBlankSelection = {};
  state.view = mode === "practice" ? "practice" : "exam";
  render();
  if (mode === "exam" && timeLimitMs) startExamTimer();
}

/* Theo dõi interval ID ở cấp module — không phụ thuộc state.session */
let activeExamTimerId = null;

function startExamTimer() {
  stopExamTimer();
  if (!state.session || !state.session.timeLimitMs) return;

  const sessionRef = state.session;

  const tick = () => {
    if (state.session !== sessionRef) {
      stopExamTimer();
      return;
    }
    if (sessionRef.submitted) {
      stopExamTimer();
      return;
    }

    const elapsed = Date.now() - sessionRef.startTime;
    const remaining = sessionRef.timeLimitMs - elapsed;
    const elTimer = document.getElementById("exam-timer");

    if (remaining <= 0) {
      if (elTimer) elTimer.textContent = "00:00";
      if (state.session === sessionRef && !sessionRef.submitted) {
        submitSession("timeout");
      }
      return;
    }

    if (elTimer) {
      const mins = Math.floor(remaining / 60000);
      const secs = Math.floor((remaining % 60000) / 1000);
      elTimer.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
      if (remaining <= 60000) elTimer.classList.add("urgent");
    }
  };

  tick();

  // FIX: guard — nếu tick() sync vừa submitSession (state.session = null),
  // không được tạo interval hay set state.session.timerId (gây crash)
  if (state.session !== sessionRef || sessionRef.submitted) return;
  if (!state.session) return;

  activeExamTimerId = setInterval(tick, 500);
  state.session.timerId = activeExamTimerId;
}

function stopExamTimer() {
  if (activeExamTimerId !== null) {
    clearInterval(activeExamTimerId);
    activeExamTimerId = null;
  }
  if (state.session) state.session.timerId = null;
}

function submitSession(reason) {
  if (!state.session || state.session.submitted) return;
  state.session.submitted = true;
  stopExamTimer();
  // FIX: đóng modal confirmExit nếu đang mở (tránh đè lên summary)
  closeModal();
  if (store.soundEnabled) SoundFX.complete();

  const exam = state.session.examSnapshot;
  const result = calculateExamResult(exam, state.session.answers);
  const durationMs = Math.min(
    Date.now() - state.session.startTime,
    state.session.timeLimitMs || Infinity,
  );
  const profile = getCurrentProfile();
  const profileId = profile ? profile.id : null;

  const record = {
    id: generateId(),
    profileId,
    examId: exam.id,
    examTitle: exam.title,
    examType: exam.examType || "",
    subjectName: state.currentSubject ? state.currentSubject.name : "",
    chapterName: state.currentChapter ? state.currentChapter.name : "",
    mode: state.session.mode,
    completedAt: new Date().toISOString(),
    durationMs,
    score: result.totalScore,
    maxScore: result.maxScore,
    correctCount: result.correctCount,
    wrongCount: result.wrongCount,
    unansweredCount: result.unansweredCount,
    retryOf: state.session.retryOf,
    isWrongOnlyRetry: state.session.isWrongOnly,
    submitReason: reason || "manual",
    examSnapshot: deepClone(exam),
    questions: exam.questions.map((q) => ({
      question: deepClone(q),
      answer: state.session.answers[q.id]
        ? deepClone(state.session.answers[q.id])
        : null,
      score: calculateQuestionScore(q, state.session.answers[q.id]),
      maxScore: Number(q.score) || 0,
    })),
  };

  if (profileId) {
    if (!store.history[profileId]) store.history[profileId] = [];
    store.history[profileId].unshift(record);
    saveStore();
  }
  state.lastRecord = record;
  state.summaryFromHistory = false;
  state.session = null;
  state.view = "summary";
  render();
  if (reason === "timeout") showToast("Đã hết giờ — bài được nộp tự động.");
}

/* ====== 8. DOM HELPER ====== */
function el(tag, attrs, ...children) {
  const node = document.createElement(tag);
  if (attrs) {
    for (const [k, v] of Object.entries(attrs)) {
      if (v == null || v === false) continue;
      if (k === "class") node.className = v;
      else if (k === "text") node.textContent = v;
      else if (k === "style" && typeof v === "string") node.style.cssText = v;
      else if (k.startsWith("on") && typeof v === "function")
        node.addEventListener(k.slice(2).toLowerCase(), v);
      else if (k.startsWith("data-")) node.setAttribute(k, v);
      else if (k === "html") node.innerHTML = v;
      else node.setAttribute(k, v);
    }
  }
  for (const c of children) {
    if (c == null || c === false) continue;
    if (typeof c === "string" || typeof c === "number")
      node.appendChild(document.createTextNode(String(c)));
    else if (c instanceof Node) node.appendChild(c);
  }
  return node;
}

function showToast(msg, ms) {
  const root = document.getElementById("toast-root");
  if (!root) return;
  const t = el("div", { class: "toast", text: msg });
  root.appendChild(t);
  setTimeout(() => t.remove(), ms || 2500);
}

function closeModal() {
  const root = document.getElementById("modal-root");
  if (root) root.innerHTML = "";
}

function showModal(opts) {
  const root = document.getElementById("modal-root");
  if (!root) return;
  root.innerHTML = "";
  const overlay = el("div", { class: "modal-overlay" });
  const modal = el("div", {
    class: "modal",
    role: "dialog",
    "aria-modal": "true",
  });
  modal.appendChild(el("h2", { class: "modal-title", text: opts.title || "" }));
  if (opts.body) {
    const bodyWrap = el("div", { class: "modal-body" });
    if (typeof opts.body === "string") bodyWrap.textContent = opts.body;
    else bodyWrap.appendChild(opts.body);
    modal.appendChild(bodyWrap);
  }
  const btnRow = el("div", { class: "modal-buttons" });
  const buttons = opts.buttons || [
    { label: "Đóng", variant: "ghost", onClick: closeModal },
  ];
  for (const b of buttons) {
    const cls =
      b.variant === "primary"
        ? "btn-primary"
        : b.variant === "danger"
          ? "btn-danger"
          : "btn-ghost";
    const btn = el("button", {
      class: "btn " + cls,
      type: "button",
      text: b.label,
    });
    btn.addEventListener("click", b.onClick || closeModal);
    btnRow.appendChild(btn);
  }
  modal.appendChild(btnRow);
  overlay.appendChild(modal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });
  root.appendChild(overlay);
  setTimeout(() => {
    const first = modal.querySelector("input, button");
    if (first) first.focus();
  }, 0);
}

function showInputModal(opts) {
  const body = el("div");
  body.appendChild(
    el("label", { class: "input-label", text: opts.label || "" }),
  );
  const input = el("input", {
    type: "text",
    class: "text-input",
    value: opts.defaultValue || "",
    placeholder: opts.placeholder || "",
  });
  body.appendChild(input);
  const submit = () => {
    const v = input.value.trim();
    if (!v) {
      input.focus();
      return;
    }
    closeModal();
    if (typeof opts.onConfirm === "function") opts.onConfirm(v);
  };
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    }
  });
  showModal({
    title: opts.title || "",
    body,
    buttons: [
      { label: "Hủy", variant: "ghost", onClick: closeModal },
      {
        label: opts.confirmLabel || "Xác nhận",
        variant: "primary",
        onClick: submit,
      },
    ],
  });
  setTimeout(() => input.focus(), 0);
}

/* ====== 9. MATHJAX + CHART.JS ====== */
let chartInstances = {};

function destroyAllCharts() {
  for (const id in chartInstances) {
    try {
      chartInstances[id].destroy();
    } catch (_) {}
  }
  chartInstances = {};
}

function typesetMath() {
  if (window.__mathjaxFailed) return;
  if (!window.MathJax || typeof MathJax.typesetPromise !== "function") return;
  MathJax.typesetPromise().catch((err) =>
    console.warn("MathJax typeset error:", err),
  );
}

function renderTable(table) {
  const wrap = el("div", { class: "table-wrapper" });
  const t = el("table", { class: "data-table" });
  const thead = el("thead");
  const hRow = el("tr");
  for (const h of table.headers || [])
    hRow.appendChild(el("th", { text: String(h) }));
  thead.appendChild(hRow);
  t.appendChild(thead);
  const tbody = el("tbody");
  for (const row of table.rows || []) {
    const tr = el("tr");
    for (const cell of row) tr.appendChild(el("td", { text: String(cell) }));
    tbody.appendChild(tr);
  }
  t.appendChild(tbody);
  wrap.appendChild(t);
  return wrap;
}

function renderChart(chartConfig) {
  if (window.__chartjsFailed || typeof Chart === "undefined") {
    const wrap = el("div", { class: "chart-container" });
    wrap.appendChild(
      el("p", {
        class: "muted",
        text: "(Không thể tải biểu đồ: Chart.js không khả dụng.)",
      }),
    );
    return wrap;
  }

  const dataLabelsPlugin = {
    id: "dataLabelsPlugin",
    afterDatasetsDraw(chart) {
      const { ctx } = chart;
      ctx.save();
      const meta = chart.getDatasetMeta(0);
      meta.data.forEach((element, index) => {
        const data = chart.data.datasets[0].data[index];
        if (data === undefined || data === null) return;
        const position = element.tooltipPosition();
        ctx.fillStyle = "#ffffff";
        ctx.shadowColor = "rgba(0,0,0,0.8)";
        ctx.shadowBlur = 3;
        ctx.shadowOffsetX = 1;
        ctx.shadowOffsetY = 1;
        ctx.font = "bold 13px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(data + "%", position.x, position.y);
      });
      ctx.restore();
    },
  };

  if (chartConfig.type === "pie-multi") {
    const wrap = el("div", {
      style:
        "width: 100%; height: auto; display: flex; flex-direction: column; align-items: center; margin-bottom: 1.5rem; position: relative;",
    });
    if (chartConfig.title) {
      wrap.appendChild(
        el("div", {
          style:
            "width: 100%; text-align: center; font-weight: bold; margin-bottom: 15px; text-transform: uppercase;",
          text: chartConfig.title,
        }),
      );
    }
    const chartWrapper = el("div", {
      style:
        "display: flex; flex-wrap: wrap; justify-content: center; gap: 30px; width: 100%;",
    });
    chartConfig.charts.forEach((subChart) => {
      const chartDiv = el("div", {
        style:
          "flex: 1; min-width: 250px; max-width: 280px; text-align: center;",
      });
      if (subChart.title) {
        chartDiv.appendChild(
          el("div", {
            style: "margin-bottom: 10px; font-weight: bold;",
            text: subChart.title,
          }),
        );
      }
      const canvasWrap = el("div", {
        style: "position: relative; height: 220px; width: 100%;",
      });
      const canvas = el("canvas");
      canvasWrap.appendChild(canvas);
      chartDiv.appendChild(canvasWrap);
      chartWrapper.appendChild(chartDiv);
      setTimeout(() => {
        if (!canvas.isConnected) return;
        try {
          const chart = new Chart(canvas, {
            type: "pie",
            data: { labels: subChart.labels, datasets: [subChart.dataset] },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                tooltip: { enabled: true },
                dataLabelsPlugin: true,
              },
            },
            plugins: [dataLabelsPlugin],
          });
          chartInstances["chart-" + generateId()] = chart;
        } catch (err) {
          console.warn("Chart error:", err);
        }
      }, 0);
    });
    wrap.appendChild(chartWrapper);
    if (chartConfig.charts.length > 0 && chartConfig.charts[0].labels) {
      const legendContainer = el("div", {
        style:
          "display: flex; flex-wrap: wrap; justify-content: center; gap: 10px 20px; width: 100%; margin-top: 15px; font-size: 0.85rem; margin-bottom: 10px;",
      });
      const labels = chartConfig.charts[0].labels;
      const colors = chartConfig.charts[0].dataset.backgroundColor;
      labels.forEach((label, i) => {
        const item = el("div", {
          style: "display: flex; align-items: center; gap: 6px;",
        });
        const box = el("div", {
          style: `width: 12px; height: 12px; background-color: ${colors[i]}; border-radius: 2px;`,
        });
        item.appendChild(box);
        item.appendChild(el("span", { text: label }));
        legendContainer.appendChild(item);
      });
      wrap.appendChild(legendContainer);
    }
    return wrap;
  }

  const wrap = el("div", { class: "chart-container" });
  const canvas = el("canvas");
  wrap.appendChild(canvas);
  const isPie = chartConfig.type === "pie" || chartConfig.type === "doughnut";
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: { display: !!chartConfig.title, text: chartConfig.title || "" },
      legend: { display: true },
      dataLabelsPlugin: true,
    },
  };
  if (!isPie) {
    options.scales = {
      y: {
        beginAtZero: true,
        title: chartConfig.yAxisLabel
          ? { display: true, text: chartConfig.yAxisLabel }
          : { display: false },
      },
    };
  }
  setTimeout(() => {
    if (!canvas.isConnected) return;
    try {
      const chart = new Chart(canvas, {
        type: chartConfig.type || "bar",
        data: {
          labels: chartConfig.labels || [],
          datasets: chartConfig.datasets || [],
        },
        options,
        plugins: [dataLabelsPlugin],
      });
      chartInstances["chart-" + generateId()] = chart;
    } catch (err) {
      console.warn("Chart error:", err);
    }
  }, 0);
  return wrap;
}

/* ====== SETTINGS MODAL ====== */
function createSettingsRow(opts) {
  const row = el("div", { class: "settings-row" });
  const left = el("div", { class: "settings-info" });
  const iconWrap = el("div", { class: "settings-icon", "aria-hidden": "true" });
  const updateIcon = (key) => {
    iconWrap.innerHTML = ICONS[key] || "";
  };
  updateIcon(opts.initialIcon);
  left.appendChild(iconWrap);
  const textWrap = el("div", { class: "settings-text" });
  textWrap.appendChild(
    el("div", { class: "settings-label", text: opts.label }),
  );
  if (opts.description) {
    textWrap.appendChild(
      el("div", { class: "settings-desc muted", text: opts.description }),
    );
  }
  left.appendChild(textWrap);
  row.appendChild(left);

  const toggle = el("button", {
    class: "toggle-switch" + (opts.checked ? " on" : ""),
    type: "button",
    role: "switch",
    "aria-checked": opts.checked ? "true" : "false",
    "aria-label": opts.label,
  });
  toggle.appendChild(el("span", { class: "toggle-knob" }));
  toggle.addEventListener("click", () => {
    const newState = !toggle.classList.contains("on");
    toggle.classList.toggle("on", newState);
    toggle.setAttribute("aria-checked", newState ? "true" : "false");
    if (typeof opts.getIcon === "function") updateIcon(opts.getIcon(newState));
    opts.onToggle(newState);
  });
  row.appendChild(toggle);
  return row;
}

function openSettingsModal() {
  const body = el("div", { class: "settings-modal-body" });

  body.appendChild(
    createSettingsRow({
      label: "Âm thanh",
      description: "Phát âm thanh phản hồi khi làm bài và nộp bài",
      checked: store.soundEnabled,
      initialIcon: store.soundEnabled ? "soundOn" : "soundOff",
      getIcon: (on) => (on ? "soundOn" : "soundOff"),
      onToggle: (on) => {
        store.soundEnabled = on;
        SoundFX.enabled = on;
        saveStore();
        if (on) setTimeout(() => SoundFX.click(), 10);
      },
    }),
  );

  body.appendChild(
    createSettingsRow({
      label: "Chế độ tối",
      description: "Giao diện tối, dịu mắt hơn vào buổi tối",
      checked: store.theme === "dark",
      initialIcon: store.theme === "dark" ? "moon" : "sun",
      getIcon: (on) => (on ? "moon" : "sun"),
      onToggle: (on) => {
        store.theme = on ? "dark" : "light";
        saveStore();
        applyTheme();
      },
    }),
  );

  body.appendChild(
    el("p", {
      class: "muted",
      style: "margin-top:1.25rem; text-align:center; font-size:.85rem;",
      text: "Dữ liệu người học chỉ lưu trên trình duyệt này.",
    }),
  );

  showModal({
    title: "Cài đặt",
    body,
    buttons: [{ label: "Đóng", variant: "primary", onClick: closeModal }],
  });
}

/* ====== SETUP ICONS ====== */
function setupIcons() {
  document.querySelectorAll("[data-icon]").forEach((node) => {
    const key = node.getAttribute("data-icon");
    if (key && ICONS[key]) node.innerHTML = ICONS[key];
  });
}

/* ====== 10. RENDER VIEWS ====== */
function render() {
  destroyAllCharts();
  const main = document.getElementById("app-main");
  if (!main) return;
  main.innerHTML = "";
  let view;
  switch (state.view) {
    case "home":
      view = renderHome();
      break;
    case "subject":
      view = renderSubject();
      break;
    case "exam-setup":
      view = renderExamSetup();
      break;
    case "practice":
      view = renderPractice();
      break;
    case "exam":
      view = renderExam();
      break;
    case "summary":
      view = renderSummary();
      break;
    case "profile":
      view = renderProfile();
      break;
    default:
      view = renderHome();
  }
  main.appendChild(view);
  typesetMath();
}

function renderHome() {
  const c = el("div", { class: "home-view" });
  c.appendChild(el("h1", { text: "Chọn môn học" }));
  if (!QUESTION_BANK || QUESTION_BANK.length === 0) {
    c.appendChild(el("p", { class: "muted", text: "Kho đề đang trống." }));
    return c;
  }
  const grid = el("div", { class: "subjects-grid" });
  for (const subject of QUESTION_BANK) {
    const examCount = getSubjectExamCount(subject);
    const tile = el("button", {
      class: "subject-tile",
      type: "button",
      "data-subject-id": subject.id,
    });
    const icon = el("div", {
      class: "subject-tile-icon",
      "aria-hidden": "true",
    });
    icon.innerHTML = ICONS[SUBJECT_ICON_MAP[subject.id] || "bookOpen"];
    tile.appendChild(icon);
    tile.appendChild(
      el("div", { class: "subject-tile-name", text: subject.name || "?" }),
    );
    tile.appendChild(
      el("div", {
        class: "subject-tile-count",
        text: examCount > 0 ? `${examCount} đề` : "Chưa có đề",
      }),
    );
    tile.addEventListener("click", () => {
      state.currentSubject = subject;
      state.currentChapter = null;
      state.currentExam = null;
      state.view = "subject";
      render();
    });
    grid.appendChild(tile);
  }
  c.appendChild(grid);
  return c;
}

function renderSubject() {
  const subject = state.currentSubject;
  if (!subject) {
    state.view = "home";
    return renderHome();
  }
  const c = el("div", { class: "subject-view" });
  const back = el("button", {
    class: "btn btn-ghost",
    type: "button",
    text: "← Quay lại",
  });
  back.addEventListener("click", () => {
    state.currentSubject = null;
    state.currentChapter = null;
    state.currentExam = null;
    state.view = "home";
    render();
  });
  c.appendChild(back);
  c.appendChild(el("h1", { text: subject.name }));
  const chapters = subject.chapters || [];
  if (chapters.length === 0) {
    c.appendChild(
      el("p", {
        class: "muted",
        text: "Môn này chưa có chương/bài nào. Hãy thêm đề trong QUESTION_BANK (script.js).",
      }),
    );
    return c;
  }
  for (const chapter of chapters) {
    const ch = el("div", { class: "chapter-section" });
    ch.appendChild(el("h3", { class: "chapter-title", text: chapter.name }));
    const list = el("div", { class: "exam-list" });
    const exams = chapter.exams || [];
    if (exams.length === 0) {
      list.appendChild(
        el("p", { class: "muted", text: "Chương này chưa có đề." }),
      );
    } else {
      for (const exam of exams) {
        const card = el("button", { class: "exam-card", type: "button" });
        const cardHeader = el("div", { class: "exam-card-header" });
        const iconEl = el("span", {
          class: "exam-card-icon",
          "aria-hidden": "true",
          html: ICONS.fileText,
        });
        cardHeader.appendChild(iconEl);
        cardHeader.appendChild(
          el("div", { class: "exam-title", text: exam.title }),
        );
        card.appendChild(cardHeader);
        const maxScore = getExamMaxScore(exam);
        const meta =
          `${exam.examType ? exam.examType + " • " : ""}` +
          `${(exam.questions || []).length} câu • ${formatScore(maxScore)} điểm` +
          (exam.duration ? ` • ${exam.duration} phút` : "");
        card.appendChild(el("div", { class: "exam-meta", text: meta }));
        if (exam.description)
          card.appendChild(
            el("div", { class: "exam-desc", text: exam.description }),
          );
        card.addEventListener("click", () => {
          state.currentChapter = chapter;
          state.currentExam = exam;
          state.view = "exam-setup";
          render();
        });
        list.appendChild(card);
      }
    }
    ch.appendChild(list);
    c.appendChild(ch);
  }
  return c;
}

function renderExamSetup() {
  const exam = state.currentExam;
  if (!exam) {
    state.view = "home";
    return renderHome();
  }
  const c = el("div", { class: "setup-view" });
  const back = el("button", {
    class: "btn btn-ghost",
    type: "button",
    text: "← Quay lại",
  });
  back.addEventListener("click", () => {
    state.view = state.currentSubject ? "subject" : "home";
    render();
  });
  c.appendChild(back);
  c.appendChild(el("h1", { text: exam.title }));
  if (exam.examType)
    c.appendChild(
      el("span", { class: "exam-type-badge", text: exam.examType }),
    );
  if (exam.description)
    c.appendChild(el("p", { class: "muted", text: exam.description }));
  const maxScore = getExamMaxScore(exam);
  const info = el("div", { class: "exam-info" });
  info.appendChild(
    el("span", { text: `Số câu: ${(exam.questions || []).length}` }),
  );
  info.appendChild(el("span", { text: `Tổng điểm: ${formatScore(maxScore)}` }));
  if (exam.duration)
    info.appendChild(
      el("span", { text: `Thời lượng mặc định: ${exam.duration} phút` }),
    );
  c.appendChild(info);

  const modeSec = el("div", { class: "form-section" });
  modeSec.appendChild(el("h3", { text: "Chế độ làm bài" }));
  const rPractice = el("label", { class: "radio-option" });
  const inpPractice = el("input", {
    type: "radio",
    name: "setup-mode",
    value: "practice",
  });
  inpPractice.checked = true;
  rPractice.appendChild(inpPractice);
  rPractice.appendChild(
    el(
      "div",
      {},
      el("strong", { text: "Ôn tập" }),
      el("div", {
        class: "muted",
        text: "Xem đáp án và lời giải ngay sau mỗi câu.",
      }),
    ),
  );
  modeSec.appendChild(rPractice);
  const rExam = el("label", { class: "radio-option" });
  const inpExam = el("input", {
    type: "radio",
    name: "setup-mode",
    value: "exam",
  });
  rExam.appendChild(inpExam);
  rExam.appendChild(
    el(
      "div",
      {},
      el("strong", { text: "Thi" }),
      el("div", {
        class: "muted",
        text: "Làm toàn bộ đề rồi mới biết điểm, giống đề thi giấy.",
      }),
    ),
  );
  modeSec.appendChild(rExam);
  c.appendChild(modeSec);

  const timeSec = el("div", { class: "form-section", style: "display:none" });
  timeSec.appendChild(el("h3", { text: "Thời gian làm bài" }));
  const makeTimeOption = (value, label, checked) => {
    const lab = el("label", { class: "radio-option" });
    const inp = el("input", { type: "radio", name: "setup-time", value });
    if (checked) inp.checked = true;
    lab.appendChild(inp);
    lab.appendChild(el("div", {}, el("strong", { text: label })));
    return { lab, inp };
  };
  const tUnlimited = makeTimeOption(
    "unlimited",
    "Không giới hạn thời gian",
    !exam.duration,
  );
  const tDefault = makeTimeOption(
    "default",
    `Dùng mặc định (${exam.duration || 15} phút)`,
    !!exam.duration,
  );
  const tCustom = makeTimeOption("custom", "Tự nhập số phút", false);
  const customInput = el("input", {
    type: "number",
    class: "text-input",
    min: "1",
    max: "300",
    value: "15",
    style: "max-width:120px; margin-top:.5rem;",
  });
  if (!exam.duration) {
    tDefault.lab.style.display = "none";
    tUnlimited.inp.checked = true;
  }
  timeSec.appendChild(tUnlimited.lab);
  timeSec.appendChild(tDefault.lab);
  timeSec.appendChild(tCustom.lab);
  timeSec.appendChild(customInput);
  c.appendChild(timeSec);
  const updateTimeVisibility = () => {
    timeSec.style.display = inpExam.checked ? "" : "none";
  };
  inpPractice.addEventListener("change", updateTimeVisibility);
  inpExam.addEventListener("change", updateTimeVisibility);

  const startBtn = el("button", {
    class: "btn btn-primary btn-large",
    type: "button",
    text: "Bắt đầu làm bài",
  });
  startBtn.addEventListener("click", () => {
    const mode = inpExam.checked ? "exam" : "practice";
    let timeMin = null;
    if (mode === "exam") {
      const checked = timeSec.querySelector('input[name="setup-time"]:checked');
      const val = checked ? checked.value : "default";
      if (val === "unlimited") timeMin = null;
      else if (val === "default") timeMin = exam.duration || 15;
      else if (val === "custom") {
        const n = Number(customInput.value);
        if (!isFinite(n) || n <= 0 || n > 300) {
          showToast("Số phút phải là số từ 1 đến 300.");
          return;
        }
        timeMin = n;
      }
    }
    startSession(exam, mode, timeMin);
  });
  c.appendChild(startBtn);
  return c;
}

function renderPractice() {
  if (!state.session) {
    state.view = "home";
    return renderHome();
  }
  const questions = state.session.examSnapshot.questions;
  const idx = state.currentQuestionIndex;
  const q = questions[idx];
  if (!q) {
    submitSession("manual");
    return el("div");
  }
  const total = questions.length;
  const checked = state.session.checkedQuestions.has(q.id);
  const wrap = el("div", { class: "practice-view" });
  const header = el("div", { class: "practice-header" });
  header.appendChild(
    el("div", { class: "practice-progress", text: `Câu ${idx + 1}/${total}` }),
  );
  const exitBtn = el("button", {
    class: "btn btn-ghost",
    type: "button",
    text: "Thoát",
  });
  exitBtn.addEventListener("click", confirmExitSession);
  header.appendChild(exitBtn);
  wrap.appendChild(header);
  const bar = el("div", { class: "progress-bar" });
  const fill = el("div", { class: "progress-fill" });
  fill.style.width = `${Math.round((idx / total) * 100)}%`;
  bar.appendChild(fill);
  wrap.appendChild(bar);
  wrap.appendChild(renderQuestionBlock(q, { mode: "practice", checked }));
  const actions = el("div", { class: "practice-actions" });
  if (!checked) {
    const btnCheck = el("button", {
      class: "btn btn-primary btn-large",
      type: "button",
      text: "Kiểm tra",
    });
    btnCheck.addEventListener("click", checkCurrentQuestion);
    actions.appendChild(btnCheck);
  } else {
    const isLast = idx === total - 1;
    const btnNext = el("button", {
      class: "btn btn-primary btn-large",
      type: "button",
      text: isLast ? "Xem kết quả" : "Tiếp tục",
    });
    btnNext.addEventListener("click", continueToNext);
    actions.appendChild(btnNext);
  }
  wrap.appendChild(actions);
  setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 0);
  return wrap;
}

function getCurrentPracticeQuestion() {
  if (!state.session) return null;
  return (
    state.session.examSnapshot.questions[state.currentQuestionIndex] || null
  );
}

function checkCurrentQuestion() {
  const q = getCurrentPracticeQuestion();
  if (!q) return;
  const answer = state.session.answers[q.id] || null;
  if (!isAnswerComplete(q, answer)) {
    showToast("Vui lòng trả lời đầy đủ trước khi kiểm tra.");
    return;
  }
  state.session.checkedQuestions.add(q.id);
  if (store.soundEnabled) {
    const earned = calculateQuestionScore(q, answer);
    const max = Number(q.score) || 0;
    if (earned >= max - 0.0001) SoundFX.correct();
    else if (earned <= 0.0001) SoundFX.wrong();
    else SoundFX.partial();
  }
  render();
}

function continueToNext() {
  if (!state.session) return;
  const total = state.session.examSnapshot.questions.length;
  if (state.currentQuestionIndex < total - 1) {
    state.currentQuestionIndex++;
    render();
  } else submitSession("manual");
}

/* FIX: Hàm thoát an toàn — luôn về home dù có lỗi gì */
function forceExitToHome() {
  try {
    closeModal();
  } catch (_) {}
  try {
    stopExamTimer();
  } catch (_) {}
  state.session = null;
  state.currentQuestionIndex = 0;
  state.fillBlankSelection = {};
  state.currentSubject = null;
  state.currentChapter = null;
  state.currentExam = null;
  state.lastRecord = null;
  state.summaryFromHistory = false;
  state.view = "home";
  try {
    render();
  } catch (err) {
    console.error("Render home failed:", err);
    window.location.reload();
  }
}

function confirmExitSession() {
  // Nếu session đã submit hoặc null → thoát ngay không cần hỏi
  if (!state.session || state.session.submitted) {
    forceExitToHome();
    return;
  }
  showModal({
    title: "Thoát bài làm?",
    body: "Bài làm hiện tại sẽ bị hủy và không được lưu vào lịch sử. Bạn có chắc chắn muốn thoát?",
    buttons: [
      { label: "Tiếp tục làm bài", variant: "primary", onClick: closeModal },
      { label: "Thoát", variant: "danger", onClick: forceExitToHome },
    ],
  });
}

function renderExam() {
  if (!state.session) {
    state.view = "home";
    return renderHome();
  }
  const wrap = el("div", { class: "exam-view" });
  const stick = el("div", { class: "exam-sticky-header" });
  const timerEl = el("div", {
    class: "exam-timer",
    id: "exam-timer",
    text: state.session.timeLimitMs ? "--:--" : "",
  });
  if (state.session.timeLimitMs) stick.appendChild(timerEl);
  const progEl = el("div", { class: "exam-progress", id: "exam-progress" });
  stick.appendChild(progEl);
  const submitTop = el("button", {
    class: "btn btn-primary",
    type: "button",
    text: "Nộp bài",
  });
  submitTop.addEventListener("click", confirmSubmitExam);
  stick.appendChild(submitTop);
  const exitBtn = el("button", {
    class: "btn btn-ghost",
    type: "button",
    text: "Thoát",
  });
  exitBtn.addEventListener("click", confirmExitSession);
  stick.appendChild(exitBtn);
  wrap.appendChild(stick);
  const list = el("div", { class: "exam-question-list" });
  const questions = state.session.examSnapshot.questions;
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const block = renderQuestionBlock(q, { mode: "exam", checked: false });
    block.insertBefore(
      el("div", {
        class: "exam-question-number",
        text: `Câu ${i + 1}/${questions.length}`,
      }),
      block.firstChild,
    );
    list.appendChild(block);
  }
  wrap.appendChild(list);
  const bottomActions = el("div", { class: "exam-bottom-actions" });
  const submitBottom = el("button", {
    class: "btn btn-primary btn-large",
    type: "button",
    text: "Nộp bài",
  });
  submitBottom.addEventListener("click", confirmSubmitExam);
  bottomActions.appendChild(submitBottom);
  wrap.appendChild(bottomActions);
  setTimeout(() => {
    updateExamProgress();
    // Không gọi startExamTimer ở đây — startSession đã gọi
  }, 0);
  return wrap;
}

function updateExamProgress() {
  const progEl = document.getElementById("exam-progress");
  if (!progEl || !state.session) return;
  const questions = state.session.examSnapshot.questions;
  let answered = 0;
  for (const q of questions)
    if (hasAnyAnswer(q, state.session.answers[q.id])) answered++;
  progEl.textContent = `Đã làm: ${answered}/${questions.length} câu`;
}

function confirmSubmitExam() {
  if (!state.session) return;
  const questions = state.session.examSnapshot.questions;
  let unanswered = 0;
  for (const q of questions)
    if (!hasAnyAnswer(q, state.session.answers[q.id])) unanswered++;
  const msg =
    unanswered > 0
      ? `Bạn còn ${unanswered} câu chưa trả lời. Bạn vẫn muốn nộp bài?`
      : "Bạn có chắc chắn muốn nộp bài?";
  showModal({
    title: "Nộp bài",
    body: msg,
    buttons: [
      { label: "Xem lại", variant: "ghost", onClick: closeModal },
      {
        label: "Nộp bài",
        variant: "primary",
        onClick: () => {
          closeModal();
          submitSession("manual");
        },
      },
    ],
  });
}

function renderSummary() {
  const record = state.lastRecord;
  const c = el("div", { class: "summary-view" });
  if (!record) {
    c.appendChild(el("h1", { text: "Không có dữ liệu kết quả." }));
    const back = el("button", {
      class: "btn btn-primary",
      type: "button",
      text: "Về trang chủ",
    });
    back.addEventListener("click", forceExitToHome);
    c.appendChild(back);
    return c;
  }
  const card = el("div", { class: "summary-card" });
  if (record.isWrongOnlyRetry)
    card.appendChild(
      el("span", { class: "exam-type-badge", text: "Làm lại câu sai" }),
    );
  card.appendChild(el("h2", { text: record.examTitle }));
  card.appendChild(
    el(
      "div",
      { class: "summary-score" },
      formatScore(record.score),
      el("small", { text: "/" + formatScore(record.maxScore) }),
    ),
  );
  const stats = el("div", { class: "summary-stats" });
  const mkStat = (v, l, iconKey) => {
    const s = el("div", { class: "stat-item" });
    if (iconKey) {
      const iconEl = el("div", { class: "stat-icon", "aria-hidden": "true" });
      iconEl.innerHTML = ICONS[iconKey] || "";
      s.appendChild(iconEl);
    }
    s.appendChild(el("div", { class: "stat-value", text: String(v) }));
    s.appendChild(el("div", { class: "stat-label", text: l }));
    return s;
  };
  stats.appendChild(mkStat(record.correctCount, "Câu đúng", "award"));
  stats.appendChild(mkStat(record.wrongCount, "Câu sai/chưa đủ", "fileText"));
  stats.appendChild(mkStat(record.unansweredCount, "Chưa trả lời", "history"));
  stats.appendChild(
    mkStat(formatDuration(record.durationMs), "Thời gian", "clock"),
  );
  card.appendChild(stats);
  c.appendChild(card);
  c.appendChild(renderWrongQuestionsList(record));
  const actions = el("div", { class: "summary-actions" });
  const btnRedo = el("button", {
    class: "btn btn-primary",
    type: "button",
    text: "Làm lại bài",
  });
  btnRedo.addEventListener("click", () => {
    state.currentExam = examFromRecord(record);
    state.currentSubject = null;
    state.currentChapter = null;
    state.view = "exam-setup";
    render();
  });
  actions.appendChild(btnRedo);
  const hasWrong = record.questions.some((q) => q.score < q.maxScore);
  const btnWrong = el("button", {
    class: "btn btn-ghost",
    type: "button",
    text: "Làm lại câu sai",
    disabled: !hasWrong,
  });
  if (hasWrong)
    btnWrong.addEventListener("click", () => startRetryWrong(record));
  actions.appendChild(btnWrong);
  const btnExit = el("button", {
    class: "btn btn-ghost",
    type: "button",
    text: "Thoát",
  });
  btnExit.addEventListener("click", forceExitToHome);
  actions.appendChild(btnExit);
  c.appendChild(actions);
  return c;
}

function renderWrongQuestionsList(record) {
  const wrap = el("div");
  const wrong = (record.questions || []).filter((q) => q.score < q.maxScore);
  if (wrong.length === 0) {
    wrap.appendChild(
      el("p", { class: "muted", text: "Không có câu sai. Chúc mừng bạn!" }),
    );
    return wrap;
  }
  const details = el("details", { class: "wrong-list" });
  details.appendChild(
    el("summary", { text: `Xem ${wrong.length} câu sai/chưa đúng hoàn toàn` }),
  );
  wrong.forEach((item, i) => {
    const card = el("div", { class: "wrong-item" });
    card.appendChild(
      el("div", { class: "exam-question-number", text: `Câu ${i + 1}` }),
    );
    card.appendChild(
      el("span", {
        class: "question-type-badge",
        text: getTypeLabel(item.question.type),
      }),
    );
    card.appendChild(renderQuestionPrompt(item.question));
    card.appendChild(
      el(
        "div",
        { class: "answer-row user-wrong" },
        el("strong", { text: "Bạn chọn: " }),
        el("span", { text: getUserAnswerDisplay(item.question, item.answer) }),
      ),
    );
    card.appendChild(
      el(
        "div",
        { class: "answer-row correct-line" },
        el("strong", { text: "Đáp án đúng: " }),
        el("span", { text: getCorrectAnswerDisplay(item.question) }),
      ),
    );
    if (item.question.explanation) {
      const exp = el("div", { class: "explanation" });
      exp.appendChild(el("strong", { text: "Giải thích: " }));
      exp.appendChild(document.createTextNode(item.question.explanation));
      card.appendChild(exp);
    }
    card.appendChild(
      el("div", {
        class: "score-info",
        text: `Điểm: ${formatScore(item.score)} / ${formatScore(item.maxScore)}`,
      }),
    );
    details.appendChild(card);
  });
  wrap.appendChild(details);
  return wrap;
}

function examFromRecord(record) {
  return {
    id: record.examId + "-replay-" + Date.now(),
    title: record.examTitle,
    examType: record.examType,
    description: "",
    duration: null,
    questions: (record.questions || []).map((q) => deepClone(q.question)),
  };
}

function startRetryWrong(record) {
  const wrongQuestions = (record.questions || [])
    .filter((q) => q.score < q.maxScore)
    .map((q) => deepClone(q.question));
  if (wrongQuestions.length === 0) {
    showToast("Không có câu sai để làm lại.");
    return;
  }
  const pseudoExam = {
    id: record.examId + "-retry-" + Date.now(),
    title: "Làm lại câu sai — " + record.examTitle,
    examType: record.examType,
    description: "Chỉ gồm các câu chưa đúng hoàn toàn.",
    duration: null,
    questions: wrongQuestions,
  };
  startSession(pseudoExam, "practice", null, {
    retryOf: record.id,
    isWrongOnly: true,
  });
}

function renderProfile() {
  const c = el("div", { class: "profile-view" });
  const profile = getCurrentProfile();
  if (!profile) {
    c.appendChild(el("h1", { text: "Hồ sơ người học" }));
    c.appendChild(el("p", { class: "muted", text: "Bạn chưa tạo hồ sơ." }));
    const btn = el("button", {
      class: "btn btn-primary",
      type: "button",
      text: "Tạo hồ sơ mới",
    });
    btn.addEventListener("click", () => {
      showInputModal({
        title: "Tạo hồ sơ",
        label: "Tên của bạn",
        confirmLabel: "Tạo",
        onConfirm: (name) => {
          createProfile(name);
          render();
        },
      });
    });
    c.appendChild(btn);
    return c;
  }

  const header = el("div", { class: "profile-header" });
  header.appendChild(el("div", { class: "profile-name", text: profile.name }));
  const records = store.history[profile.id] || [];
  let totalWrong = 0,
    perfectCount = 0,
    totalTimeMs = 0;
  for (const r of records) {
    totalWrong += r.wrongCount || 0;
    if (r.score >= r.maxScore - 0.0001) perfectCount++;
    totalTimeMs += r.durationMs || 0;
  }
  const stats = el("div", { class: "summary-stats" });
  const mkStat = (v, l, iconKey) => {
    const s = el("div", { class: "stat-item" });
    if (iconKey) {
      const iconEl = el("div", { class: "stat-icon", "aria-hidden": "true" });
      iconEl.innerHTML = ICONS[iconKey] || "";
      s.appendChild(iconEl);
    }
    s.appendChild(el("div", { class: "stat-value", text: String(v) }));
    s.appendChild(el("div", { class: "stat-label", text: l }));
    return s;
  };
  stats.appendChild(mkStat(records.length, "Bài đã làm", "history"));
  stats.appendChild(mkStat(totalWrong, "Câu sai", "fileText"));
  stats.appendChild(mkStat(perfectCount, "Điểm tối đa", "award"));
  stats.appendChild(
    mkStat(
      records.length > 0
        ? Math.round((perfectCount / records.length) * 100) + "%"
        : "—",
      "Tỷ lệ tối đa",
      "chart",
    ),
  );
  stats.appendChild(
    mkStat(formatDuration(totalTimeMs), "Tổng thời gian", "clock"),
  );
  header.appendChild(stats);

  const actions = el("div", { class: "profile-actions" });
  const btnRename = el("button", {
    class: "btn btn-ghost",
    type: "button",
    text: "Đổi tên",
  });
  btnRename.addEventListener("click", () => {
    showInputModal({
      title: "Đổi tên hồ sơ",
      label: "Tên mới",
      defaultValue: profile.name,
      confirmLabel: "Lưu",
      onConfirm: (name) => {
        profile.name = name;
        saveStore();
        render();
      },
    });
  });
  actions.appendChild(btnRename);
  const btnSwitch = el("button", {
    class: "btn btn-ghost",
    type: "button",
    text: "Đổi hồ sơ",
  });
  btnSwitch.addEventListener("click", showProfileSwitchModal);
  actions.appendChild(btnSwitch);
  const btnExport = el("button", {
    class: "btn btn-ghost",
    type: "button",
    text: "Xuất backup",
  });
  btnExport.addEventListener("click", exportBackup);
  actions.appendChild(btnExport);
  const btnImport = el("button", {
    class: "btn btn-ghost",
    type: "button",
    text: "Nhập backup",
  });
  btnImport.addEventListener("click", importBackupDialog);
  actions.appendChild(btnImport);
  const btnClear = el("button", {
    class: "btn btn-ghost",
    type: "button",
    text: "Xóa lịch sử",
  });
  btnClear.addEventListener("click", () => {
    showModal({
      title: "Xóa lịch sử?",
      body: `Toàn bộ lịch sử làm bài của hồ sơ "${profile.name}" sẽ bị xóa. Thao tác không thể hoàn tác.`,
      buttons: [
        { label: "Hủy", variant: "ghost", onClick: closeModal },
        {
          label: "Xóa",
          variant: "danger",
          onClick: () => {
            store.history[profile.id] = [];
            saveStore();
            closeModal();
            render();
            showToast("Đã xóa lịch sử.");
          },
        },
      ],
    });
  });
  actions.appendChild(btnClear);
  header.appendChild(actions);
  c.appendChild(header);

  const histSec = el("div", { class: "history-section" });
  histSec.appendChild(el("h3", { text: "Lịch sử làm bài" }));
  if (records.length === 0) {
    histSec.appendChild(
      el("p", { class: "muted", text: "Chưa có bài nào được hoàn thành." }),
    );
  } else {
    const list = el("div", { class: "history-list" });
    for (const r of records) {
      const item = el("button", { class: "history-item", type: "button" });
      item.appendChild(
        el("div", { class: "history-title", text: r.examTitle }),
      );
      const modeLabel = r.mode === "practice" ? "Ôn tập" : "Thi";
      item.appendChild(
        el("div", {
          class: "history-meta",
          text: `${formatDate(r.completedAt)} • ${modeLabel} • ${formatScore(r.score)}/${formatScore(r.maxScore)} • ${formatDuration(r.durationMs)}`,
        }),
      );
      if (r.isWrongOnlyRetry)
        item.appendChild(
          el("span", { class: "badge", text: "Làm lại câu sai" }),
        );
      item.addEventListener("click", () => {
        state.lastRecord = r;
        state.summaryFromHistory = true;
        state.view = "summary";
        render();
      });
      list.appendChild(item);
    }
    histSec.appendChild(list);
  }
  c.appendChild(histSec);
  return c;
}

function showProfileSwitchModal() {
  const body = el("div");
  const list = el("div", { class: "profile-list" });
  for (const p of store.profiles) {
    const item = el("button", {
      class:
        "profile-item" + (p.id === store.currentProfileId ? " current" : ""),
      type: "button",
    });
    item.appendChild(el("span", { text: p.name }));
    if (p.id === store.currentProfileId)
      item.appendChild(el("span", { class: "badge", text: "Đang dùng" }));
    item.addEventListener("click", () => {
      store.currentProfileId = p.id;
      saveStore();
      closeModal();
      render();
    });
    list.appendChild(item);
  }
  body.appendChild(list);
  const createBtn = el("button", {
    class: "btn btn-primary",
    type: "button",
    text: "+ Tạo hồ sơ mới",
  });
  createBtn.addEventListener("click", () => {
    closeModal();
    showInputModal({
      title: "Tạo hồ sơ mới",
      label: "Tên hồ sơ",
      confirmLabel: "Tạo",
      onConfirm: (name) => {
        createProfile(name);
        render();
      },
    });
  });
  body.appendChild(createBtn);
  showModal({
    title: "Chọn hồ sơ",
    body,
    buttons: [{ label: "Đóng", variant: "ghost", onClick: closeModal }],
  });
}

/* ====== 11. RENDER CÂU HỎI ====== */
function renderQuestionBlock(question, ctx) {
  const block = el("div", { class: "question-card", "data-qid": question.id });
  block.appendChild(
    el("div", {
      class: "question-type-badge",
      text: getTypeLabel(question.type),
    }),
  );
  if (question.type !== "fill-blank")
    block.appendChild(renderQuestionPrompt(question));
  block.appendChild(renderQuestionAnswerArea(question, ctx));
  if (ctx.checked) {
    const answer = state.session.answers[question.id] || null;
    const score = calculateQuestionScore(question, answer);
    block.appendChild(renderFeedback(question, answer, score));
  }
  return block;
}

function renderQuestionPrompt(question) {
  const p = el("div", { class: "question-prompt" });
  if (question.type !== "fill-blank" && question.content) {
    p.appendChild(
      el("div", { class: "question-content", text: question.content }),
    );
  }
  if (question.table) p.appendChild(renderTable(question.table));
  if (question.chart) p.appendChild(renderChart(question.chart));
  return p;
}

function renderQuestionAnswerArea(question, ctx) {
  switch (question.type) {
    case "multiple-choice":
      return renderMultipleChoice(question, ctx);
    case "true-false":
      return renderTrueFalse(question, ctx);
    case "short-answer":
      return renderShortAnswer(question, ctx);
    case "fill-blank":
      return renderFillBlank(question, ctx);
  }
  return el("div", { text: "Loại câu hỏi không được hỗ trợ." });
}

function renderMultipleChoice(question, ctx) {
  const container = el("div", { class: "options" });
  const answer = state.session.answers[question.id] || null;
  const selectedId = answer && answer.selectedOptionId;
  const interactive = !ctx.checked;
  question.options.forEach((opt, i) => {
    const label = String.fromCharCode(65 + i);
    const btn = el("button", {
      class: "option",
      type: "button",
      disabled: !interactive,
    });
    btn.appendChild(el("span", { class: "opt-label", text: label + "." }));
    btn.appendChild(el("span", { class: "opt-text", text: opt.text }));
    if (ctx.checked) {
      if (opt.id === question.correctOptionId) {
        btn.classList.add("correct");
        btn.appendChild(el("span", { class: "state-marker", text: "✓ Đúng" }));
      } else if (opt.id === selectedId) {
        btn.classList.add("wrong");
        btn.appendChild(
          el("span", { class: "state-marker", text: "✗ Bạn chọn" }),
        );
      }
    } else if (opt.id === selectedId) btn.classList.add("selected");
    if (interactive) {
      btn.addEventListener("click", () => {
        state.session.answers[question.id] = { selectedOptionId: opt.id };
        container
          .querySelectorAll(".option")
          .forEach((o) => o.classList.remove("selected"));
        btn.classList.add("selected");
        if (state.session.mode === "exam") updateExamProgress();
      });
    }
    container.appendChild(btn);
  });
  return container;
}

function renderTrueFalse(question, ctx) {
  const container = el("div", { class: "statements" });
  const answer = state.session.answers[question.id] || { statements: {} };
  const userStatements = answer.statements || {};
  const interactive = !ctx.checked;
  for (const stmt of question.statements) {
    const stmtEl = el("div", { class: "statement" });
    stmtEl.appendChild(
      el("div", { class: "statement-text", text: `${stmt.id}) ${stmt.text}` }),
    );
    const actions = el("div", { class: "statement-actions" });
    const userVal = userStatements[stmt.id];
    const mkBtn = (label, val) => {
      const b = el("button", {
        class: "tf-btn",
        type: "button",
        text: label,
        disabled: !interactive,
      });
      if (userVal === val) {
        if (ctx.checked) {
          if (val === stmt.correct) b.classList.add("correct");
          else b.classList.add("wrong");
        } else b.classList.add("selected");
      }
      if (ctx.checked && val === stmt.correct && userVal !== val)
        b.classList.add("correct");
      if (interactive) {
        b.addEventListener("click", () => {
          if (!state.session.answers[question.id])
            state.session.answers[question.id] = { statements: {} };
          state.session.answers[question.id].statements[stmt.id] = val;
          actions
            .querySelectorAll(".tf-btn")
            .forEach((x) => x.classList.remove("selected"));
          b.classList.add("selected");
          if (state.session.mode === "exam") updateExamProgress();
        });
      }
      return b;
    };
    actions.appendChild(mkBtn("Đúng", true));
    actions.appendChild(mkBtn("Sai", false));
    stmtEl.appendChild(actions);
    if (ctx.checked && userVal !== undefined) {
      if (userVal === stmt.correct) {
        stmtEl.appendChild(
          el("div", {
            class: "statement-feedback",
            style: "color:var(--success)",
            text: "✓ Chính xác",
          }),
        );
      } else {
        stmtEl.appendChild(
          el("div", {
            class: "statement-feedback",
            style: "color:var(--danger)",
            text: "✗ Sai",
          }),
        );
      }
    }
    container.appendChild(stmtEl);
  }
  return container;
}

function renderShortAnswer(question, ctx) {
  const container = el("div", { class: "short-answer-area" });
  const answer = state.session.answers[question.id] || { value: "" };
  const currentValue = answer.value || "";
  const maxLen = Math.min(
    question.maxLength || MAX_SHORT_ANSWER_LENGTH,
    MAX_SHORT_ANSWER_LENGTH,
  );
  const interactive = !ctx.checked;
  const input = el("input", {
    type: "text",
    class: "short-answer-input",
    id: "sa-" + question.id,
    maxLength: maxLen,
    value: currentValue,
    placeholder: "Nhập đáp án",
    inputmode: "text",
    autocomplete: "off",
    disabled: !interactive,
  });
  const counter = el("div", {
    class: "char-counter",
    text: `${currentValue.length}/${maxLen} ký tự`,
  });
  input.addEventListener("input", () => {
    if (!state.session.answers[question.id])
      state.session.answers[question.id] = { value: "" };
    state.session.answers[question.id].value = input.value;
    counter.textContent = `${input.value.length}/${maxLen} ký tự`;
    if (state.session.mode === "exam") updateExamProgress();
  });
  if (ctx.checked) {
    const score = calculateQuestionScore(question, answer);
    input.classList.add(score >= question.score - 0.0001 ? "correct" : "wrong");
  }
  container.appendChild(input);
  container.appendChild(counter);
  if (interactive) {
    const keypad = el("div", { class: "virtual-keypad" });
    const insertChar = (ch) => {
      if (input.value.length >= maxLen) return;
      input.value += ch;
      input.dispatchEvent(new Event("input", { bubbles: true }));
    };
    const deleteChar = () => {
      input.value = input.value.slice(0, -1);
      input.dispatchEvent(new Event("input", { bubbles: true }));
    };
    const clearAll = () => {
      input.value = "";
      input.dispatchEvent(new Event("input", { bubbles: true }));
    };
    const layout = [
      "7",
      "8",
      "9",
      "⌫",
      "4",
      "5",
      "6",
      "Xóa",
      "1",
      "2",
      "3",
      ",",
      "0",
      "-",
    ];
    for (const k of layout) {
      const btn = el("button", {
        class: "keypad-btn",
        type: "button",
        text: k,
      });
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        if (k === "⌫") deleteChar();
        else if (k === "Xóa") clearAll();
        else insertChar(k);
      });
      if (k === "Xóa" || k === "⌫") btn.classList.add("keypad-action");
      keypad.appendChild(btn);
    }
    for (let i = 0; i < 2; i++) keypad.appendChild(el("span"));
    container.appendChild(keypad);
  }
  return container;
}

function renderFillBlank(question, ctx) {
  const container = el("div", {
    class: "fill-blank-area",
    "data-fill-area": question.id,
  });
  const answer = state.session.answers[question.id] || { blanks: {} };
  const currentBlanks = answer.blanks || {};
  const selectedOpt = state.fillBlankSelection[question.id] || null;
  const interactive = !ctx.checked;

  const sentence = el("div", { class: "fill-sentence" });
  const parts = String(question.content || "").split(/\{\{([^}]+)\}\}/g);
  for (let i = 0; i < parts.length; i++) {
    if (i % 2 === 0) {
      if (parts[i]) sentence.appendChild(document.createTextNode(parts[i]));
    } else {
      const blankId = parts[i];
      const blank = question.blanks.find((b) => b.id === blankId);
      if (!blank) continue;
      const placedOptId = currentBlanks[blankId];
      const placedOpt = placedOptId
        ? question.options.find((o) => o.id === placedOptId)
        : null;
      const blankEl = el("button", {
        class: "fill-blank" + (placedOpt ? " filled" : ""),
        type: "button",
        disabled: !interactive,
        "data-blank-id": blankId,
        text: placedOpt ? placedOpt.text : "___",
      });
      if (ctx.checked)
        blankEl.classList.add(
          placedOptId === blank.correctAnswerId ? "correct" : "wrong",
        );
      if (interactive) {
        blankEl.addEventListener("click", () => {
          const qid = question.id;
          if (!state.session.answers[qid])
            state.session.answers[qid] = { blanks: {} };
          const blanks = state.session.answers[qid].blanks;
          if (blanks[blankId]) delete blanks[blankId];
          else if (state.fillBlankSelection[qid]) {
            blanks[blankId] = state.fillBlankSelection[qid];
            delete state.fillBlankSelection[qid];
          } else {
            showToast("Chọn một đáp án bên dưới trước.");
            return;
          }
          rerenderFillBlank(question, ctx);
        });
        blankEl.addEventListener("dragover", (e) => e.preventDefault());
        blankEl.addEventListener("drop", (e) => {
          e.preventDefault();
          const optId = e.dataTransfer.getData("text/plain");
          if (!optId) return;
          if (!state.session.answers[question.id])
            state.session.answers[question.id] = { blanks: {} };
          if (!question.allowReuse) {
            const used = Object.entries(
              state.session.answers[question.id].blanks,
            ).find(([bid, oid]) => oid === optId && bid !== blankId);
            if (used) {
              showToast("Đáp án này đã được dùng ở chỗ khác.");
              return;
            }
          }
          state.session.answers[question.id].blanks[blankId] = optId;
          delete state.fillBlankSelection[question.id];
          rerenderFillBlank(question, ctx);
        });
      }
      sentence.appendChild(blankEl);
    }
  }
  container.appendChild(sentence);

  const pool = el("div", { class: "fill-options" });
  const usedOptIds = Object.values(currentBlanks);
  for (const opt of question.options) {
    const used = !question.allowReuse && usedOptIds.includes(opt.id);
    const btn = el("button", {
      class:
        "fill-option" +
        (used ? " used" : "") +
        (selectedOpt === opt.id ? " selected" : ""),
      type: "button",
      text: opt.text,
      draggable: interactive && !used ? "true" : "false",
      disabled: !interactive || used,
    });
    if (interactive && !used) {
      btn.addEventListener("click", () => {
        state.fillBlankSelection[question.id] =
          state.fillBlankSelection[question.id] === opt.id ? undefined : opt.id;
        if (state.fillBlankSelection[question.id] === undefined)
          delete state.fillBlankSelection[question.id];
        rerenderFillBlank(question, ctx);
      });
      btn.addEventListener("dragstart", (e) =>
        e.dataTransfer.setData("text/plain", opt.id),
      );
    }
    pool.appendChild(btn);
  }
  container.appendChild(pool);
  if (interactive) {
    container.appendChild(
      el("div", {
        class: "fill-hint",
        text: "Mẹo: chọn một đáp án rồi chạm vào chỗ trống để điền. Chạm lại vào chỗ trống để bỏ.",
      }),
    );
  }
  return container;
}

function rerenderFillBlank(question, ctx) {
  const area = document.querySelector(`[data-fill-area="${question.id}"]`);
  if (!area) return;
  area.replaceWith(renderFillBlank(question, ctx));
  if (state.session && state.session.mode === "exam") updateExamProgress();
}

function renderFeedback(question, answer, score) {
  const maxScore = Number(question.score) || 0;
  const isFull = score >= maxScore - 0.0001;
  const fb = el("div", { class: "feedback " + (isFull ? "correct" : "wrong") });
  fb.appendChild(
    el("div", {
      class: "feedback-title",
      text: isFull
        ? "✓ Chính xác!"
        : score > 0
          ? "△ Đúng một phần"
          : "✗ Chưa đúng",
    }),
  );
  const body = el("div", { class: "feedback-body" });
  if (!isFull) {
    body.appendChild(
      el("div", {
        class: "correct-answer-line",
        text: "Đáp án đúng: " + getCorrectAnswerDisplay(question),
      }),
    );
  }
  if (question.explanation) {
    const exp = el("div", { class: "explanation" });
    exp.appendChild(el("strong", { text: "Giải thích: " }));
    exp.appendChild(document.createTextNode(question.explanation));
    body.appendChild(exp);
  }
  fb.appendChild(body);
  fb.appendChild(
    el("div", {
      class: "score-info",
      text: `Điểm: ${formatScore(score)} / ${formatScore(maxScore)}`,
    }),
  );
  return fb;
}

function getUserAnswerDisplay(question, answer) {
  if (!answer) return "(chưa trả lời)";
  switch (question.type) {
    case "multiple-choice": {
      if (!answer.selectedOptionId) return "(chưa trả lời)";
      const idx = question.options.findIndex(
        (o) => o.id === answer.selectedOptionId,
      );
      if (idx < 0) return "(không xác định)";
      return `${String.fromCharCode(65 + idx)}. ${question.options[idx].text}`;
    }
    case "true-false": {
      if (!answer.statements) return "(chưa trả lời)";
      return question.statements
        .map((s) => {
          const v = answer.statements[s.id];
          return `${s.id}) ${v === true ? "Đúng" : v === false ? "Sai" : "(chưa chọn)"}`;
        })
        .join("; ");
    }
    case "short-answer":
      return answer.value != null && String(answer.value).trim() !== ""
        ? String(answer.value)
        : "(chưa trả lời)";
    case "fill-blank": {
      if (!answer.blanks) return "(chưa trả lời)";
      return question.blanks
        .map((b) => {
          const oid = answer.blanks[b.id];
          if (!oid) return `${b.id}: (trống)`;
          const opt = question.options.find((o) => o.id === oid);
          return `${b.id}: ${opt ? opt.text : oid}`;
        })
        .join("; ");
    }
  }
  return "";
}

function getCorrectAnswerDisplay(question) {
  switch (question.type) {
    case "multiple-choice": {
      const idx = question.options.findIndex(
        (o) => o.id === question.correctOptionId,
      );
      if (idx < 0) return "(không xác định)";
      return `${String.fromCharCode(65 + idx)}. ${question.options[idx].text}`;
    }
    case "true-false":
      return question.statements
        .map((s) => `${s.id}) ${s.correct ? "Đúng" : "Sai"}`)
        .join("; ");
    case "short-answer":
      return String(question.answer);
    case "fill-blank":
      return question.blanks
        .map((b) => {
          const opt = question.options.find((o) => o.id === b.correctAnswerId);
          return `${b.id}: ${opt ? opt.text : b.correctAnswerId}`;
        })
        .join("; ");
  }
  return "";
}

/* ====== BACKUP ====== */
function exportBackup() {
  try {
    const data = JSON.stringify(store, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `on-thi-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("Đã xuất file backup.");
  } catch (err) {
    console.warn(err);
    showToast("Không thể xuất backup.");
  }
}

function importBackupDialog() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json,application/json";
  input.style.display = "none";
  input.addEventListener("change", () => {
    const file = input.files && input.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (
          !parsed ||
          typeof parsed !== "object" ||
          !Array.isArray(parsed.profiles)
        ) {
          showToast("File backup không hợp lệ.");
          return;
        }
        showModal({
          title: "Nhập backup",
          body: `File chứa ${parsed.profiles.length} hồ sơ. Nhập sẽ THAY THẾ toàn bộ dữ liệu hiện tại. Tiếp tục?`,
          buttons: [
            { label: "Hủy", variant: "ghost", onClick: closeModal },
            {
              label: "Nhập & thay thế",
              variant: "danger",
              onClick: () => {
                store = {
                  version: APP_VERSION,
                  profiles: parsed.profiles.filter((p) => p && p.id && p.name),
                  currentProfileId: parsed.currentProfileId || null,
                  theme: parsed.theme === "dark" ? "dark" : "light",
                  soundEnabled:
                    typeof parsed.soundEnabled === "boolean"
                      ? parsed.soundEnabled
                      : true,
                  history:
                    parsed.history && typeof parsed.history === "object"
                      ? parsed.history
                      : {},
                };
                if (!store.currentProfileId && store.profiles.length) {
                  store.currentProfileId = store.profiles[0].id;
                }
                saveStore();
                applyTheme();
                SoundFX.enabled = !!store.soundEnabled;
                closeModal();
                render();
                showToast("Đã nhập backup.");
              },
            },
          ],
        });
      } catch (err) {
        showToast("File không phải JSON hợp lệ.");
      }
    };
    reader.readAsText(file);
  });
  document.body.appendChild(input);
  input.click();
  setTimeout(() => input.remove(), 1000);
}

/* ====== THEME ====== */
function applyTheme() {
  document.documentElement.dataset.theme =
    store.theme === "dark" ? "dark" : "light";
}

/* ====== GUARD ĐIỀU HƯỚNG ====== */
function navigateTo(view) {
  if (state.session && !state.session.submitted) {
    showModal({
      title: "Thoát bài làm?",
      body: "Bạn đang làm bài. Nếu chuyển trang, bài làm hiện tại sẽ bị hủy và không được lưu. Tiếp tục?",
      buttons: [
        { label: "Ở lại", variant: "primary", onClick: closeModal },
        {
          label: "Thoát",
          variant: "danger",
          onClick: () => {
            if (view === "home") {
              forceExitToHome();
            } else {
              try {
                closeModal();
              } catch (_) {}
              try {
                stopExamTimer();
              } catch (_) {}
              state.session = null;
              state.currentQuestionIndex = 0;
              state.fillBlankSelection = {};
              state.currentSubject = null;
              state.currentChapter = null;
              state.currentExam = null;
              state.view = view;
              try {
                render();
              } catch (err) {
                console.error("Render failed:", err);
                window.location.reload();
              }
            }
          },
        },
      ],
    });
    return;
  }
  state.view = view;
  if (view === "home") {
    state.currentSubject = null;
    state.currentChapter = null;
    state.currentExam = null;
  }
  render();
}

/* ====== SỰ KIỆN & KHỞI TẠO ====== */
function bindGlobalEvents() {
  document
    .getElementById("btn-home")
    .addEventListener("click", () => navigateTo("home"));
  document
    .getElementById("btn-profile")
    .addEventListener("click", () => navigateTo("profile"));
  const btnSettings = document.getElementById("btn-settings");
  if (btnSettings) btnSettings.addEventListener("click", openSettingsModal);

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    if (state.view !== "practice") return;
    if (!state.session || state.session.submitted) return;
    if (document.querySelector(".modal-overlay")) return;

    const tgt = e.target;
    if (!tgt) return;
    if (tgt.tagName === "TEXTAREA") return;
    if (tgt.tagName === "BUTTON" && tgt.classList.contains("btn")) return;

    e.preventDefault();
    const q = getCurrentPracticeQuestion();
    if (!q) return;

    if (!state.session.checkedQuestions.has(q.id)) {
      checkCurrentQuestion();
    } else {
      continueToNext();
    }
  });
}

function init() {
  loadStore();
  applyTheme();
  SoundFX.enabled = !!store.soundEnabled;
  setupIcons();
  bindGlobalEvents();

  if (!store.profiles.length) {
    render();
    setTimeout(() => {
      showInputModal({
        title: "Chào mừng!",
        label: "Nhập tên của bạn để bắt đầu",
        confirmLabel: "Bắt đầu",
        onConfirm: (name) => {
          createProfile(name);
          render();
          showToast(`Xin chào ${name}!`);
        },
      });
    }, 100);
    return;
  }

  if (!store.currentProfileId && store.profiles.length) {
    store.currentProfileId = store.profiles[0].id;
    saveStore();
  }

  render();

  window.addEventListener("beforeunload", (e) => {
    if (state.session && !state.session.submitted) {
      e.preventDefault();
      e.returnValue = "";
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
