const readItems = (key, fallback) => {
  const savedItems = localStorage.getItem(key);
  return savedItems ? JSON.parse(savedItems) : fallback;
};

import { defaultAssignments, defaultTeacherSubjects, teacherStore } from "./teacherStore";

export const studentSubjects = [
  {
    id: 1,
    name: "Mathematics",
    code: "MATH-101",
    teacher: "Mr. Ahmed",
    progress: 75,
    nextDeadline: "Sep 25",
    status: "In Progress",
    assignments: 4,
    exams: 2,
    overview: "Focuses on algebra, calculus, and problem-solving techniques to build analytical confidence.",
    topics: ["Algebraic Functions", "Differential Calculus", "Probability Basics", "Weekly Revision"],
    assignmentList: [
      { title: "Chapter 4 Worksheet", due: "Sep 25", status: "Pending" },
      { title: "Quiz Practice Set", due: "Sep 28", status: "In Review" },
    ],
    examList: [
      { title: "Mid-Term Test", date: "Oct 03", time: "10:00 AM" },
      { title: "Final Revision Quiz", date: "Oct 12", time: "11:30 AM" },
    ],
  },
  {
    id: 2,
    name: "Physics",
    code: "PHY-101",
    teacher: "Ms. Sara",
    progress: 60,
    nextDeadline: "Sep 27",
    status: "In Progress",
    assignments: 3,
    exams: 1,
    overview: "Covers motion, forces, and experimental analysis with practical applications in daily life.",
    topics: ["Kinematics", "Newton's Laws", "Waves", "Lab Report Review"],
    assignmentList: [
      { title: "Motion Graph Worksheet", due: "Sep 27", status: "Pending" },
      { title: "Force and Motion Notes", due: "Sep 30", status: "Pending" },
    ],
    examList: [
      { title: "Physics Unit Test", date: "Oct 08", time: "09:00 AM" },
    ],
  },
  {
    id: 3,
    name: "Computer Science",
    code: "CS-101",
    teacher: "Mr. Ali",
    progress: 85,
    nextDeadline: "Sep 22",
    status: "Completed",
    assignments: 5,
    exams: 2,
    overview: "Introduces programming logic, data structures, and application design for software problem solving.",
    topics: ["JavaScript Basics", "Arrays and Objects", "Loops", "Project Workflow"],
    assignmentList: [
      { title: "Array Practice Lab", due: "Sep 22", status: "Completed" },
      { title: "Mini Project Review", due: "Sep 29", status: "Completed" },
    ],
    examList: [
      { title: "Programming Quiz", date: "Oct 02", time: "02:00 PM" },
      { title: "Final Lab Assessment", date: "Oct 16", time: "01:00 PM" },
    ],
  },
  {
    id: 4,
    name: "Statistics",
    code: "STAT-101",
    teacher: "Dr. Hassan",
    progress: 50,
    nextDeadline: "Sep 30",
    status: "In Progress",
    assignments: 2,
    exams: 1,
    overview: "Builds understanding of data interpretation, probability, and statistical reasoning for research tasks.",
    topics: ["Descriptive Statistics", "Probability Rules", "Data Interpretation", "Weekly Formula Review"],
    assignmentList: [
      { title: "Data Set Summary", due: "Sep 30", status: "Pending" },
    ],
    examList: [
      { title: "Statistics Quiz", date: "Oct 05", time: "12:30 PM" },
    ],
  },
];

export const readStudentSubjects = () => {
  const officialSubjects = teacherStore.read("teacherSubjects", defaultTeacherSubjects);
  const joinedSubjects = studentStore.read("studentJoinedSubjects", []);
  const studentKey = getCurrentStudentKey();
  const topicProgress = readCurrentTopicProgress(studentKey);
  const subjectStatuses = studentStore.read("studentSubjectStatuses", {});

  const merged = joinedSubjects.map((joinedSubject) => {
    const officialSubject = officialSubjects.find((subject) => subject.name === joinedSubject.name);
    return officialSubject ? { ...officialSubject, ...joinedSubject } : joinedSubject;
  });
  const unique = merged.filter((subject, index, list) => {
    const firstIndex = list.findIndex((item) => item.name === subject.name);
    return firstIndex === index;
  });

  return unique.map((subject) => {
    const subjectKey = String(subject.id || subject.code || subject.name);
    const completedTopics = topicProgress[subjectKey] || [];
    const topics = subject.topics || [];
    const progress = topics.length ? Math.round((completedTopics.length / topics.length) * 100) : 0;
    const status = subjectStatuses[studentKey]?.[subjectKey] || "In Progress";

    return {
      ...subject,
      subjectKey,
      nextDeadline: subject.nextDeadline || "TBA",
      status,
      assignments: subject.assignments || 0,
      exams: subject.exams || 0,
      topics,
      completedTopics,
      progress: status === "Completed" ? 100 : progress,
      overview: subject.overview || "Course overview not yet set.",
      assignmentList: subject.assignmentList || [],
      examList: subject.examList || [],
    };
  });
};

export const updateStudentTopicProgress = (subject, topicIndex, completed) => {
  const studentKey = getCurrentStudentKey();
  const topicProgressByStudent = studentStore.read("studentTopicProgressByStudent", {});
  const topicProgress = topicProgressByStudent[studentKey] || readLegacyTopicProgress(studentKey);
  const subjectKey = subject.subjectKey || String(subject.id || subject.code || subject.name);
  const current = new Set(topicProgress[subjectKey] || subject.completedTopics || []);

  if (completed) current.add(topicIndex);
  else current.delete(topicIndex);

  topicProgress[subjectKey] = [...current].sort((left, right) => left - right);
  topicProgressByStudent[studentKey] = topicProgress;
  studentStore.write("studentTopicProgressByStudent", topicProgressByStudent);
  return topicProgress[subjectKey];
};

export const requestStudentSubjectCompletion = (subject) => {
  const requests = studentStore.read("subjectCompletionRequests", []);
  const studentKey = getCurrentStudentKey();
  const subjectKey = subject.subjectKey || String(subject.id || subject.code || subject.name);
  const nextRequest = {
    studentKey,
    studentName: getCurrentStudentName(),
    subjectKey,
    subjectName: subject.name,
    code: subject.code,
    requestedAt: new Date().toISOString(),
    status: "Pending",
  };
  const withoutExisting = requests.filter((request) => !(request.subjectKey === subjectKey && request.studentKey === studentKey));
  studentStore.write("subjectCompletionRequests", [...withoutExisting, nextRequest]);
};

const getCurrentStudentKey = () => {
  const currentUser = JSON.parse(localStorage.getItem("activeStudentUser") || "null");
  return String(currentUser?.email || currentUser?.id || "guest-student").toLowerCase();
};

const getCurrentStudentName = () => {
  const currentUser = JSON.parse(localStorage.getItem("activeStudentUser") || "null");
  return currentUser?.name || "Student";
};

const readLegacyTopicProgress = (studentKey) => {
  const legacy = studentStore.read("studentTopicProgress", {});
  const migrated = studentStore.read("studentTopicProgressByStudent", {});
  if (!migrated[studentKey] && Object.keys(legacy).length) {
    migrated[studentKey] = legacy;
    studentStore.write("studentTopicProgressByStudent", migrated);
  }
  return legacy;
};

const readCurrentTopicProgress = (studentKey) => {
  const progressByStudent = studentStore.read("studentTopicProgressByStudent", {});
  return progressByStudent[studentKey] || readLegacyTopicProgress(studentKey);
};

export const getStudentTopicProgress = (studentKey) => {
  const progressByStudent = studentStore.read("studentTopicProgressByStudent", {});
  return progressByStudent[String(studentKey).toLowerCase()] || {};
};

export const defaultStudentAssignments = [
  { title: "Node.js API Project", subject: "Web Development", due: "Tomorrow", priority: "High", status: "Pending" },
  { title: "Database Design", subject: "Database Systems", due: "September 5", priority: "Medium", status: "Pending" },
  { title: "React Frontend", subject: "Web Development", due: "September 8", priority: "Low", status: "Completed" },
];

export const defaultStudentSchedule = [
  { subject: "Data Science", type: "Class", day: "Monday", start: "09:00 AM", end: "10:00 AM", room: "Room 204", notes: "Lecture" },
  { subject: "Web Development", type: "Class", day: "Tuesday", start: "11:00 AM", end: "12:00 PM", room: "Lab 2", notes: "Practical" },
  { subject: "Database Systems", type: "Assignment", day: "Wednesday", start: "02:00 PM", end: "03:00 PM", room: "", notes: "Project work" },
  { subject: "Data Science", type: "Study Session", day: "Monday", start: "04:00 PM", end: "04:45 PM", room: "Library", notes: "Revision" },
];

export const studentStore = {
  read: readItems,
  write: (key, items) => localStorage.setItem(key, JSON.stringify(items)),
};

export const readStudentAssignments = () => {
  const teacherAssignments = teacherStore.read("teacherAssignments", null);
  const savedStudentAssignments = studentStore.read("studentAssignments", []);
  const sourceAssignments = teacherAssignments || defaultAssignments;

  return sourceAssignments.map((assignment) => {
    const savedAssignment = savedStudentAssignments.find(
      (item) => item.title === assignment.title
    );

    return {
      ...assignment,
      priority: savedAssignment?.priority || "Low",
      status: savedAssignment?.status || "Pending",
    };
  });
};
