import { v4 as uniqueID } from "uuid";

const workItems = [
  {
    title: "Ardi",
    workItemClass: "ardi",
    descriptionOfWork:
      "A website with an interactive tutorial library developed for Ardi - the GMail client and notes manager for Windows and Mac",
    blocksDescriptionArray: [
      { firstWord: "Next.js", sentence: "framework" },
      { firstWord: "Interactive", sentence: "tutorials" },
    ],
    imageSrc: "./images/ArdiLogo.jpg",
    key: uniqueID(),
    fullHeight: 410,
    link: "http://prokarpaty.net",
  },
  {
    title: "Green Zenphony",
    workItemClass: "greenZenphonyWorkItemDiv",
    cubeClass: "gzCube",
    descriptionOfWork: "Green Zenphony is a kosher vegetarian restaurant known for its modern interpretation of classic dishes",
    blocksDescriptionArray: [
      { firstWord: "Modern", sentence: "interface" },
      { firstWord: "professional", sentence: "photography" },
    ],
    imageSrc: "./images/mango_iced_tea.jpg",
    complexity: { value: 50, color: "blue" },
    design: { value: 80, color: "green" },
    key: uniqueID(),
    fullHeight: 410,
    link: "http://greenzenphonymvp.web.app",
    freeHosting: true,
  },
  {
    title: "Quiza",
    workItemClass: "quizaWorkItemDiv",
    cubeClass: "quizaCube",
    imageSrc: "./images/quizaLogo.jpg",
    descriptionOfWork: "An exam-preparation tool where students and teachers alike can make quizzes to be taken by their classmates",
    blocksDescriptionArray: [
      { firstWord: "Full-stack", sentence: "MERN app" },
      { firstWord: "Exam", sentence: "preparation" },
    ],
    // complexity: { value: 95, color: "silver" },
    complexity: { value: 95, color: "blueviolet" },
    design: { value: 60, color: "blueviolet" },
    key: uniqueID(),
    fullHeight: 300,
    link: "https://quiza-mokancode.herokuapp.com/",
    freeHosting: true,
  },
  {
    title: "Project Organizer",
    workItemClass: "projectOrganizer",
    descriptionOfWork: "Project organizer / task manager with easy to learn interface",
    imageSrc: "/images/projectOrganizerIcon.jpg",
    blocksDescriptionArray: [
      { firstWord: "To-Do", sentence: "Style" },
      { firstWord: "Retro", sentence: "design" },
    ],
    // misc: true,
    key: uniqueID(),
    link: "https://project-organizer-mokancode.herokuapp.com/",
    freeHosting: true,
  },
  {
    title: "RSG",
    workItemClass: "rsgWorkItemDiv",
    cubeClass: "rsgCube",
    titleSubheader: "Consulting group",
    descriptionOfWork: "A modern introductory page to the legal consultation company with a contact form (WIP)",
    imageSrc: "./images/LawIcon.png",
    complexity: { value: 30, color: "silver" },
    design: { value: 60, color: "red" },
    key: uniqueID(),
    fullHeight: 370,
    link: "http://rsg-consulting-group.web.app/",
    freeHosting: true,
  },
];

export default workItems;
