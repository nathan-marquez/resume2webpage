import { Project } from "@/types/project";

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
  <title>John Doe - Portfolio</title>
  <link rel="stylesheet" href="styles.css">
  <script defer src="main.js"></script>
</head>
<body>
  <header class="hero">
      <nav>
          <div class="logo">JD</div>
          <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#experience">Experience</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#contact">Contact</a></li>
          </ul>
      </nav>
      <div class="hero-content">
          <h1>John Doe</h1>
          <p class="title">Full Stack Developer</p>
          <div class="social-links">
              <a href="#" class="social-link">GitHub</a>
              <a href="#" class="social-link">LinkedIn</a>
              <a href="#" class="social-link">Twitter</a>
          </div>
      </div>
  </header>
  <main>
      <section id="about" class="section">
          <h2>About Me</h2>
          <p>Passionate developer with 5 years of experience building modern web applications. Specialized in React, Node.js, and cloud technologies.</p>
      </section>
      <section id="experience" class="section">
          <h2>Experience</h2>
          <div class="timeline">
              <div class="timeline-item">
                  <div class="date">2020 - Present</div>
                  <div class="content">
                      <h3>Senior Developer</h3>
                      <p>Tech Corp Inc.</p>
                  </div>
              </div>
              <div class="timeline-item">
                  <div class="date">2018 - 2020</div>
                  <div class="content">
                      <h3>Full Stack Developer</h3>
                      <p>Web Solutions Ltd.</p>
                  </div>
              </div>
          </div>
      </section>
  </main>
  <footer>
      <p>&copy; 2024 John Doe. All rights reserved.</p>
  </footer>
</body>
</html>`,
  cssFile: `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

:root {
  --primary: #2563eb;
  --primary-dark: #1d4ed8;
  --text: #1f2937;
  --text-light: #6b7280;
  --background: #ffffff;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  line-height: 1.6;
  color: var(--text);
  background: var(--background);
}

.hero {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 2rem;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
}

nav ul {
  display: flex;
  gap: 2rem;
  list-style: none;
}

nav a {
  text-decoration: none;
  color: var(--text);
  font-weight: 500;
  transition: color 0.3s;
}

nav a:hover {
  color: var(--primary);
}

.hero-content {
  max-width: 800px;
  margin: 8rem auto 0;
  text-align: center;
}

h1 {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: fadeIn 1s ease-out;
}

.title {
  font-size: 1.5rem;
  color: var(--text-light);
  margin-bottom: 2rem;
  animation: slideUp 1s ease-out 0.2s both;
}

.social-links {
  display: flex;
  gap: 1rem;
  justify-content: center;
  animation: slideUp 1s ease-out 0.4s both;
}

.social-link {
  padding: 0.5rem 1rem;
  border: 2px solid var(--primary);
  border-radius: 9999px;
  color: var(--primary);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
}

.social-link:hover {
  background: var(--primary);
  color: white;
}

.section {
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: var(--primary);
}

.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--primary);
}

.timeline-item {
  position: relative;
  margin-bottom: 2rem;
  padding-left: 1rem;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: -1.4rem;
  top: 0.5rem;
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  background: var(--primary);
}

.date {
  font-size: 0.875rem;
  color: var(--text-light);
  margin-bottom: 0.5rem;
}

footer {
  text-align: center;
  padding: 2rem;
  background: #f8fafc;
  color: var(--text-light);
}

@keyframes fadeIn {
  from {
      opacity: 0;
  }
  to {
      opacity: 1;
  }
}

@keyframes slideUp {
  from {
      opacity: 0;
      transform: translateY(20px);
  }
  to {
      opacity: 1;
      transform: translateY(0);
  }
}`,
  jsFile: `document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for navigation links
  document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', (e) => {
          e.preventDefault();
          const target = document.querySelector(link.getAttribute('href'));
          target.scrollIntoView({ behavior: 'smooth' });
      });
  });

  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('animate');
          }
      });
  }, { threshold: 0.1 });

  // Observe all sections
  document.querySelectorAll('.section').forEach(section => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(20px)';
      section.style.transition = 'all 0.6s ease-out';
      observer.observe(section);
  });

  // Add animation class
  document.querySelectorAll('.section.animate').forEach(section => {
      section.style.opacity = '1';
      section.style.transform = 'translateY(0)';
  });

  // Typing effect for the title
  const title = document.querySelector('.title');
  const text = title.textContent;
  title.textContent = '';
  let i = 0;

  function typeWriter() {
      if (i < text.length) {
          title.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 100);
      }
  }

  setTimeout(typeWriter, 1000);
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
  <title>John Doe - Portfolio</title>
  <link rel="stylesheet" href="styles.css">
  <script defer src="main.js"></script>
</head>
<body>
  <header class="hero">
      <nav>
          <div class="logo">JD</div>
          <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#experience">Experience</a></li>
              <li><a href="#projects">Projects</a></li>
              <li><a href="#contact">Contact</a></li>
          </ul>
      </nav>
      <div class="hero-content">
          <h1>EDITED</h1>
          <p class="title">Full Stack Developer</p>
          <div class="social-links">
              <a href="#" class="social-link">GitHub</a>
              <a href="#" class="social-link">LinkedIn</a>
              <a href="#" class="social-link">Twitter</a>
          </div>
      </div>
  </header>
  <main>
      <section id="about" class="section">
          <h2>About Me</h2>
          <p>Passionate developer with 5 years of experience building modern web applications. Specialized in React, Node.js, and cloud technologies.</p>
      </section>
      <section id="experience" class="section">
          <h2>Experience</h2>
          <div class="timeline">
              <div class="timeline-item">
                  <div class="date">2020 - Present</div>
                  <div class="content">
                      <h3>Senior Developer</h3>
                      <p>Tech Corp Inc.</p>
                  </div>
              </div>
              <div class="timeline-item">
                  <div class="date">2018 - 2020</div>
                  <div class="content">
                      <h3>Full Stack Developer</h3>
                      <p>Web Solutions Ltd.</p>
                  </div>
              </div>
          </div>
      </section>
  </main>
  <footer>
      <p>&copy; 2024 John Doe. All rights reserved.</p>
  </footer>
</body>
</html>`,
  cssFile: `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

:root {
  --primary: #2563eb;
  --primary-dark: #1d4ed8;
  --text: #1f2937;
  --text-light: #6b7280;
  --background: #ffffff;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  line-height: 1.6;
  color: var(--text);
  background: var(--background);
}

.hero {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  padding: 2rem;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 0;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary);
}

nav ul {
  display: flex;
  gap: 2rem;
  list-style: none;
}

nav a {
  text-decoration: none;
  color: var(--text);
  font-weight: 500;
  transition: color 0.3s;
}

nav a:hover {
  color: var(--primary);
}

.hero-content {
  max-width: 800px;
  margin: 8rem auto 0;
  text-align: center;
}

h1 {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: fadeIn 1s ease-out;
}

.title {
  font-size: 1.5rem;
  color: var(--text-light);
  margin-bottom: 2rem;
  animation: slideUp 1s ease-out 0.2s both;
}

.social-links {
  display: flex;
  gap: 1rem;
  justify-content: center;
  animation: slideUp 1s ease-out 0.4s both;
}

.social-link {
  padding: 0.5rem 1rem;
  border: 2px solid var(--primary);
  border-radius: 9999px;
  color: var(--primary);
  text-decoration: none;
  font-weight: 500;
  transition: all 0.3s;
}

.social-link:hover {
  background: var(--primary);
  color: white;
}

.section {
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: var(--primary);
}

.timeline {
  position: relative;
  padding-left: 2rem;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--primary);
}

.timeline-item {
  position: relative;
  margin-bottom: 2rem;
  padding-left: 1rem;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: -1.4rem;
  top: 0.5rem;
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 50%;
  background: var(--primary);
}

.date {
  font-size: 0.875rem;
  color: var(--text-light);
  margin-bottom: 0.5rem;
}

footer {
  text-align: center;
  padding: 2rem;
  background: #f8fafc;
  color: var(--text-light);
}

@keyframes fadeIn {
  from {
      opacity: 0;
  }
  to {
      opacity: 1;
  }
}

@keyframes slideUp {
  from {
      opacity: 0;
      transform: translateY(20px);
  }
  to {
      opacity: 1;
      transform: translateY(0);
  }
}`,
  jsFile: `document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for navigation links
  document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', (e) => {
          e.preventDefault();
          const target = document.querySelector(link.getAttribute('href'));
          target.scrollIntoView({ behavior: 'smooth' });
      });
  });

  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('animate');
          }
      });
  }, { threshold: 0.1 });

  // Observe all sections
  document.querySelectorAll('.section').forEach(section => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(20px)';
      section.style.transition = 'all 0.6s ease-out';
      observer.observe(section);
  });

  // Add animation class
  document.querySelectorAll('.section.animate').forEach(section => {
      section.style.opacity = '1';
      section.style.transform = 'translateY(0)';
  });

  // Typing effect for the title
  const title = document.querySelector('.title');
  const text = title.textContent;
  title.textContent = '';
  let i = 0;

  function typeWriter() {
      if (i < text.length) {
          title.textContent += text.charAt(i);
          i++;
          setTimeout(typeWriter, 100);
      }
  }

  setTimeout(typeWriter, 1000);
});`,
};
//TODO: Add error case
export const getProject = (): Promise<Project> => {
  // Simulate API request
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(PROJECT);
    }, 1000);
  });
};

export const editProject = async (editText: string): Promise<Project> => {
  // Simulate API request
  return new Promise((resolve) => {
    setTimeout(() => {
      PROJECT.editCount -= 1;
      resolve(EDITED_PROJECT);
    }, 1000);
  });
};
