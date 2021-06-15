const projects = [
  {
    name: "Ardi",
    dateFinished: "2021",
    frontEnd: ["NextJS", "CSS", "Sass"],
    description: "Designed and developed a website for the app.",
    thingsLearnedOrAchieved: ["Developed an interactive tutorial library."],
    url: "https://prokarpaty.net",
    git: "https://github.com/mokancode/ardi",
  },
  {
    name: "Portfolio",
    dateFinished: "Q1 2021",
    frontEnd: ["ReactJS", "Redux", "CSS", "Sass", "React Transition Group", "Lottie", "AnimeJS", "Serverless emailing", "Waypoints"],
    description: "Personal portfolio.",
    thingsLearnedOrAchieved: [
      "Designed and implemented SVG animations in Adobe After Effects and integrated them into React using Bodymovin and Lottie",
      "Designed and implemented 3D components with CSS only",
      "Animated transitions between web pages using React Transition Group",
      "Chose the efficient approach of serverless emailing for the contact form over setting up a backend",
      "Achieved significant performance optimization by manipulating the DOM and implementing PNGs-based shadows over CSS shadows on large elements.",
    ],
    url: "https://mokancode.com/",
    git: "https://github.com/mokancode/my-portfolio",
  },
  {
    name: "Project Organizer",
    dateFinished: "Q4 2020",
    stack: "MERN",
    frontEnd: ["ReactJS", "Redux", "CSS", "Lottie"],
    backEnd: ["Express", "NodeJS", "MongoDB & Mongoose"],
    description:
      "MERN stack 'to-do' web app developed to manage projects and tasks with simple controls and an intuitive UI with a retro neon theme. Designed and implemented Lottie animations." +
      "Initially hosted locally and used localStorage for data storage, later integrated a REST API back-end with a user login system using MongoDB and deployed the app online",
    url: "https://project-organizer-mokancode.herokuapp.com/",
    git: "https://github.com/mokancode/project-organizer",
  },
  {
    name: "Green Zenphony",
    // workInProgress: true,
    dateFinished: "Q4 2019",
    frontEnd: ["ReactJS", "Redux", "CSS", "SVG", "React Transition Group"],
    description: "Designed and developed for the restaurant in Queens, NY.",
    thingsLearnedOrAchieved: [
      "Converted JPG art into animated SVG vector art using Adobe Illustrator and CSS.",
      "Implemented animated page transitions and waypoint/scroll triggers to reveal components.",
    ],
    url: "http://greenzenphonymvp.web.app",
    git: "https://github.com/mokancode/green-zenphony",
  },
  {
    name: "Quiza",
    dateFinished: "Q2 2019",
    stack: "MERN",
    frontEnd: ["ReactJS", "Redux", "CSS", "SVG", "KaTeX"],
    backEnd: ["Express", "NodeJS", "MongoDB & Mongoose"],
    description:
      "Full-stack web application aimed for academics (students and teachers) that allows to create and share multiple-choice quizzes that can contain images and mathematical notation (KaTeX).",
    thingsLearnedOrAchieved: [
      "Developed a backend with a secure RESTful API using MongoDB, and a login system",
      "Implemented features such as graded quizzes and the option to leave reviews are available to registered members",
      "Designed and imported SVG art from Adobe Illustrator and integrated it into React.",
    ],
    url: "https://quiza-mokancode.herokuapp.com/",
    git: "https://github.com/mokancode/quiza",
  },
  //   {
  //     name: "RSG Consulting Group",
  //     // workInProgress: true,
  //     dateFinished: "2018",
  //     frontEnd: ["ReactJS", "CSS", "Waypoints"],
  //     description:
  //       "Developed a prototype of a two page web app for the legal consulting company and implemented responsiveness / mobile friendly version",
  //     url: "http://rsg-consulting-group.web.app/",
  //   },
];

export default projects;
