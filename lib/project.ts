import { Project } from "@/types/project";
import { auth } from "@/lib/firebase/firebaseClient";

const PROJECT: Project = {
  id: "1",
  editCount: 5,
  uploadingFlag: false,
  deletingFlag: false,
  editingFlag: false,
  htmlFile: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nathaniel Marquez | AI Engineer</title>
    <link rel="stylesheet" href="styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="container">
        <section id="hero">
            <h1>Nathaniel Marquez</h1>
            <h3>AI Enthusiast • Software Engineer • Builder of Cool Projects</h3>
            <div class="contact-links">
                <a href="https://nathanjmarquez.com" target="_blank">🔗 nathanjmarquez.com</a>
                <a href="mailto:nmarquez@andrew.cmu.edu">✉️ nmarquez@andrew.cmu.edu</a>
                <a href="tel:5126889455">📞 512-688-9455</a>
            </div>
        </section>

        <section id="about">
            <h2>About Me</h2>
            <p>Hi, I'm Nathaniel! A soon-to-be graduate from Carnegie Mellon University with a passion for creating impactful AI solutions and scaling software systems. From designing recommendation engines at Netflix to mentoring future engineers as a TA, I thrive on building and sharing knowledge.</p>
        </section>

        <section id="education">
            <h2>Education</h2>
            <div class="education-content">
                <p>📚 Carnegie Mellon University</p>
                <p>B.S. Artificial Intelligence</p>
                <p>Dean's List with High Honors (Graduating May 2024)</p>
                <p>Relevant Coursework: Search Engines, Advanced NLP, Modern Regression, Deep RL</p>
            </div>
        </section>

        <section id="experience">
            <h2>Experience</h2>
            <div class="job">
                <div class="job-details">
                    <h4>Netflix</h4>
                    <p>Software Engineer Intern (Summer 2023)</p>
                </div>
                <ul>
                    <li>🚀 Proposed and integrated two features into the recommendation ecosystem</li>
                    <li>⚡ Boosted product integration speed by 200% with a service for mock recommendations</li>
                </ul>
            </div>
            <div class="job">
                <div class="job-details">
                    <h4>Meta</h4>
                    <p>Software Engineer Intern (Summer 2022)</p>
                </div>
                <ul>
                    <li>💰 Led the creation of a new ad format for Facebook Reels, projected to generate $4M annually</li>
                    <li>🤝 Collaborated across four teams and three codebases</li>
                </ul>
            </div>
        </section>

        <section id="projects">
            <h2>Selected Projects</h2>
            <div class="project-grid">
                <div class="project-card">
                    <h4>🎯 Chess Moves For Itself</h4>
                    <p>Built an autonomous chess board using Raspberry Pi and Google Voice API</p>
                </div>
                <div class="project-card">
                    <h4>🥬 TerraBot</h4>
                    <p>Designed an autonomous greenhouse with ROS and OpenCV to grow vegetables</p>
                </div>
                <div class="project-card">
                    <h4>🏓 PogPong</h4>
                    <p>Created a 3D ping-pong game using Python with motion-tracking controls</p>
                </div>
            </div>
        </section>

        <section id="skills">
            <h2>Skills</h2>
            <div class="skills-grid">
                <div class="skill-category">
                    <p>💻 Programming</p>
                    <ul>
                        <li>Java</li>
                        <li>Python</li>
                        <li>JavaScript</li>
                        <li>HTML/CSS</li>
                    </ul>
                </div>
                <div class="skill-category">
                    <p>🔧 Frameworks</p>
                    <ul>
                        <li>React</li>
                        <li>PyTorch</li>
                        <li>Node.js</li>
                    </ul>
                </div>
                <div class="skill-category">
                    <p>📈 Other Skills</p>
                    <ul>
                        <li>Git</li>
                        <li>Wireframing</li>
                        <li>MVC/OOP</li>
                    </ul>
                </div>
            </div>
        </section>

        <footer>
            <p>Built with passion. Let's connect!</p>
            <div class="footer-links">
                <a href="https://github.com/nathanielmarquez" target="_blank">GitHub</a>
                <a href="https://linkedin.com/in/nathanielmarquez" target="_blank">LinkedIn</a>
                <a href="https://youtube.com/nathanielmarquez" target="_blank">YouTube</a>
            </div>
        </footer>
    </div>

    <script src="script.js"></script>
</body>
</html>`,
  cssFile: `:root {
    --bg-white: #FFFFFF;
    --text-black: #000000;
    --accent-blue: #0066FF;
    --light-gray: #F8F9FA;
    --dark-gray: #333333;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Inter', sans-serif;
    line-height: 1.6;
    color: var(--text-black);
    background-color: var(--bg-white);
}

.container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem 1rem;
}

/* Hero Section */
#hero {
    text-align: center;
    margin-bottom: 4rem;
}

#hero h1 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
}

#hero h3 {
    font-size: 1.2rem;
    font-style: italic;
    color: var(--dark-gray);
    margin-bottom: 1.5rem;
}

.contact-links {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
}

.contact-links a {
    color: var(--text-black);
    text-decoration: none;
    transition: color 0.3s ease;
}

.contact-links a:hover {
    color: var(--accent-blue);
}

/* Sections */
section {
    margin-bottom: 3rem;
}

section h2 {
    font-size: 1.8rem;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--text-black);
}

/* About Section */
#about {
    background-color: var(--light-gray);
    padding: 1.5rem;
}

/* Experience Section */
.job {
    display: flex;
    margin-bottom: 1.5rem;
}

.job-details {
    flex: 0 0 40%;
    margin-right: 1rem;
}

.job-details h4 {
    font-weight: 700;
}

.job ul {
    flex: 1;
}

.job ul li {
    margin-bottom: 0.5rem;
}

/* Projects Section */
.project-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}

.project-card {
    background-color: var(--light-gray);
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
}

.project-card:hover {
    transform: scale(1.05);
}

.project-card h4 {
    margin-bottom: 0.5rem;
}

/* Skills Section */
.skills-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
}

.skill-category p {
    font-weight: 700;
    margin-bottom: 0.5rem;
}

.skill-category ul {
    list-style-type: none;
}

/* Footer */
footer {
    background-color: var(--text-black);
    color: var(--bg-white);
    text-align: center;
    padding: 2rem;
}

.footer-links {
    margin-top: 1rem;
}

.footer-links a {
    color: var(--accent-blue);
    text-decoration: none;
    margin: 0 1rem;
    transition: color 0.3s ease;
}

.footer-links a:hover {
    color: var(--bg-white);
}

/* Responsive Design */
@media (max-width: 768px) {
    .project-grid,
    .skills-grid {
        grid-template-columns: 1fr;
    }

    .job {
        flex-direction: column;
    }

    .contact-links {
        flex-direction: column;
        align-items: center;
    }
}`,
  jsFile: `document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for contact links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Simple scroll reveal for sections
    const sections = document.querySelectorAll('section');
    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.1
    });

    sections.forEach(section => {
        section.classList.add('hidden');
        sectionObserver.observe(section);
    });
});`,
};

const EDITED_PROJECT: Project = {
  id: "1",
  editCount: 4,
  uploadingFlag: false,
  deletingFlag: false,
  editingFlag: false,
  htmlFile: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nathaniel Marquez</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header class="hero">
        <h1>Nathaniel Marquez</h1>
        <h3>AI Enthusiast • Software Engineer • Builder of Cool Projects</h3>
        <div class="contact">
            <a href="#">🔗 nathanjmarquez.com</a>
            <a href="mailto:nmarquez@andrew.cmu.edu">✉️ nmarquez@andrew.cmu.edu</a>
            <a href="tel:+15126889455">📞 512-688-9455</a>
        </div>
    </header>

    <section class="about">
        <h2>About Me</h2>
        <p>Hi, I'm Nathaniel! A soon-to-be graduate from Carnegie Mellon University with a passion for creating impactful AI solutions and scaling software systems. From designing recommendation engines at Netflix to mentoring future engineers as a TA, I thrive on building and sharing knowledge.</p>
    </section>

    <section class="education">
        <h2>Education</h2>
        <p>📚 <strong>Carnegie Mellon University</strong></p>
        <p>B.S. Artificial Intelligence</p>
        <p><em>Dean’s List with High Honors (Graduating May 2024)</em></p>
        <p>Relevant Coursework: Search Engines, Advanced NLP, Modern Regression, Deep RL.</p>
    </section>

    <section class="experience">
        <h2>Experience</h2>
        <div class="job">
            <h3>Netflix, Software Engineer Intern</h3>
            <p>🚀 Proposed and integrated two features into the recommendation ecosystem.</p>
            <p>⚡ Boosted product integration speed by 200% with a service for mock recommendations.</p>
        </div>
        <div class="job">
            <h3>Meta, Software Engineer Intern</h3>
            <p>💰 Led the creation of a new ad format for Facebook Reels, projected to generate $4M annually.</p>
            <p>🤝 Collaborated across four teams and three codebases.</p>
        </div>
    </section>

    <section class="projects">
        <h2>Selected Projects</h2>
        <div class="project">
            <h3>🎯 Chess Moves For Itself</h3>
            <p>Built an autonomous chess board using Raspberry Pi and Google Voice API.</p>
        </div>
        <div class="project">
            <h3>🥬 TerraBot</h3>
            <p>Designed an autonomous greenhouse with ROS and OpenCV to grow vegetables.</p>
        </div>
        <div class="project">
            <h3>🏓 PogPong</h3>
            <p>Created a 3D ping-pong game using Python with motion-tracking controls.</p>
        </div>
    </section>

    <section class="skills">
        <h2>Skills</h2>
        <ul>
            <li>💻 Programming: Java, Python, JavaScript, HTML/CSS</li>
            <li>🔧 Frameworks: React, PyTorch, Node.js</li>
            <li>📈 Other Skills: Git, Wireframing, MVC/OOP</li>
        </ul>
    </section>

    <footer class="footer">
        <p>Built with passion. Let's connect!</p>
        <div class="links">
            <a href="#">🔗 GitHub</a> | <a href="#">🔗 LinkedIn</a> | <a href="#">🔗 YouTube</a>
        </div>
    </footer>
    <script src="script.js"></script>
</body>
</html>
`,
  cssFile: `body {
    font-family: 'Inter', sans-serif;
    margin: 0;
    padding: 0;
    color: #333;
    background-color: #fff;
    line-height: 1.6;
}

.hero {
    text-align: center;
    padding: 50px;
    background-color: #fff;
}

.hero h1 {
    font-size: 3em;
    font-weight: bold;
    margin-bottom: 10px;
}

.hero h3 {
    font-size: 1.5em;
    font-style: italic;
    margin-bottom: 20px;
    color: #555;
}

.hero .contact a {
    color: #1E90FF;
    text-decoration: none;
    margin: 0 10px;
    font-weight: bold;
}

.hero .contact a:hover {
    text-decoration: underline;
}

section {
    padding: 40px 10%;
    background-color: #F8F9FA;
    margin: 20px 0;
}

h2 {
    font-size: 2em;
    border-bottom: 2px solid #1E90FF;
    display: inline-block;
    margin-bottom: 20px;
}

footer {
    background-color: #000;
    color: #fff;
    text-align: center;
    padding: 20px;
}

footer .links a {
    color: #1E90FF;
    text-decoration: none;
}

footer .links a:hover {
    text-decoration: underline;
}
`,
  jsFile: `document.addEventListener('DOMContentLoaded', () => {
    console.log('Welcome to Nathaniel Marquez’s Personal Website!');
});
`,
};

export const getProject = async (): Promise<Project> => {
  const user = auth.currentUser; // Get the current user
  if (!user) {
    throw new Error("User is not authenticated");
  }

  const token = await user.getIdToken(); // Get the token
  const response = await fetch("/api/project/get", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
    },
  });
  const project = response.json();
  return project;
};

export const editProject = async (editText: string): Promise<Project> => {
  const user = auth.currentUser; // Get the current user
  if (!user) {
    throw new Error("User is not authenticated");
  }

  const token = await user.getIdToken(); // Get the token
  const formData = new FormData();
  formData.append("editText", editText);

  const response = await fetch("/api/project/edit", {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
    },
    body: formData,
  });
  const project = response.json();
  return project;
};

export const resetProject = async (): Promise<void> => {
  // Simulate API request
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });
};
