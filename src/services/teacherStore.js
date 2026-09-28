const readItems = (key, fallback) => {
  const savedItems = localStorage.getItem(key);

  return savedItems ? JSON.parse(savedItems) : fallback;
};

export const teacherStore = {
  read: readItems,
  write: (key, items) => localStorage.setItem(key, JSON.stringify(items)),
};

export const defaultAssignments = [
  { title: "Node.js API Project", subject: "Web Development", due: "Sep 05", submissions: "24 / 30" },
  { title: "Database Design", subject: "Database Systems", due: "Sep 08", submissions: "32 / 35" },
  { title: "React Project", subject: "Web Development", due: "Sep 12", submissions: "28 / 30" },
];

export const defaultTeacherSubjects = [
  {
    id: 1,
    name: "Mathematics",
    code: "MATH-101",
    teacher: "Mr. Ahmed",
    progress: 75,
    status: "In Progress",
    assignments: 4,
    exams: 2,
    topics: ["Introduction to Algebra", "Linear Equations", "Quadratic Equations", "Trigonometry"],
    completedTopics: [0, 1, 2],
    overview: "Focuses on algebra, calculus, and problem-solving techniques to build analytical confidence.",
  },
  {
    id: 2,
    name: "Physics",
    code: "PHY-101",
    teacher: "Ms. Sara",
    progress: 60,
    status: "In Progress",
    assignments: 3,
    exams: 1,
    topics: ["Kinematics", "Newton's Laws", "Waves"],
    overview: "Covers motion, forces, and experimental analysis with practical applications in daily life.",
  },
  {
    id: 3,
    name: "Computer Science",
    code: "CS-101",
    teacher: "Mr. Ali",
    progress: 85,
    status: "Completed",
    assignments: 5,
    exams: 2,
    topics: ["JavaScript Basics", "Arrays and Objects", "Loops"],
    overview: "Introduces programming logic, data structures, and application design for software problem solving.",
  },
  {
    id: 4,
    name: "Statistics",
    code: "STAT-101",
    teacher: "Dr. Hassan",
    progress: 50,
    status: "In Progress",
    assignments: 2,
    exams: 1,
    topics: ["Descriptive Statistics", "Probability Rules", "Data Interpretation"],
    overview: "Builds understanding of data interpretation, probability, and statistical reasoning for research tasks.",
  },
];

export const defaultExams = [];

export const defaultClasses = [
  { time: "09:00 AM", title: "Data Science" },
  { time: "11:00 AM", title: "Web Development" },
  { time: "02:00 PM", title: "Database Systems" },
  { time: "04:00 PM", title: "Student Consultation" },
];

export const defaultStudents = [
  { name: "Ali Khan", email: "ali@example.com", progress: "88%" },
  { name: "Fatima Malik", email: "fatima@example.com", progress: "92%" },
  { name: "Ahmed Raza", email: "ahmed@example.com", progress: "76%" },
  { name: "Ayesha Noor", email: "ayesha@example.com", progress: "84%" },
];