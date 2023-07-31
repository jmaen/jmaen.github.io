<script>
  import projects from './assets/projects.json'
  import Project from './lib/Project.svelte'
  import ThemeSwitch from './lib/ThemeSwitch.svelte'
</script>

<main>
  <div>
    <div>
      <h1>Hello, welcome to my website!</h1>
      <h2>Here you can find a collection of some of my personal projects.</h2>
    </div>
    <div class="projects">
      <div class="projects-grid">
        {#each projects as project}
          <Project name={project.name} description={project.description} theme={project.theme} link={project.link}/>
        {/each}
      </div>
    </div>
  </div>
  <div class="theme-switch">
    <ThemeSwitch/>
  </div>
  <div class="socials">
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
      <a href="https://github.com/jmaen">/jmaen</a>
    </div>
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
      <a href="https://www.linkedin.com/in/jannikmaenzer/">/jannikmaenzer</a>
    </div>
  </div>
</main>

<style>
  :global(body) {
    --background: #2E3440;
    --primary: #DDDFE0;
    --secondary: #ACADAD;
    --border: #4F5768;
  }

  :global(body.light) {
    --background: #E8EBEE;
    --primary: #2E3440;
    --secondary: #6C7281;
    --border: #C2C8D1;
  }

  main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  /* Headline */

  h1 {
    position: relative;
    margin: 0 2vw;
    margin-bottom: 1.25rem;
    color: var(--primary);
    font-family: "JetBrains Mono", monospace;
    font-size: 4rem;
    text-align: center;
  }

  @keyframes typing {
    to {
      left: 100%;
    }
  }

  h1::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: var(--background);
    animation: typing 1.5s steps(29) 0.5s forwards;
  }

  @keyframes fade-in {
    to {
      opacity: 1;
    }
  }

  h2 {
    margin: 0 2vw;
    color: var(--secondary);
    font-size: 1.75rem;
    font-weight: 500;
    text-align: center;
    opacity: 0;
    animation: fade-in 2s 1.5s forwards;
  }

  @media screen and (max-width: 1024px) {
    h1 {
      font-size: 3.5rem;
    }

    h2 {
      font-size: 1.5rem;
    }
  }

  @media screen and (max-width: 900px) {
    h1 {
      font-size: 3rem;
    }

    h2 {
      font-size: 1.25rem;
    }
  }

  @media screen and (max-width: 768px) {
    h1 {
      opacity: 0;
      animation: fade-in 2s forwards;
    }

    h1::before {
      display: none;
    }

    h2 {
      animation: fade-in 2s forwards;
    }
  }

  /* Projects */

  .projects {
    display: flex;
    justify-content: center;
    margin-top: 10vh;
    opacity: 0;
    animation: fade-in 2s 2s forwards;
  }

  .projects-grid {
    display: inline-grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2rem;
  }

  @media screen and (max-width: 1024px) {
    .projects-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media screen and (max-width: 768px) {
    .projects {
      margin-top: 5vh;
      animation: fade-in 2s 0.5s forwards;
    }

    .projects-grid {
      grid-template-columns: 1fr;
    }
  }

  /* Theme switch */

  .theme-switch {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 1;
    margin: 1rem;
  }

  /* Socials */

  .socials {
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: 1;
    margin: 1rem;
  }

  .socials div {
    display: flex;
  }

  .socials div + div {
    margin-top: 1rem;
  }

  .socials svg {
    height: 1.5rem;
    margin-right: 0.5rem;
    fill: var(--primary);
  }

  .socials a {
    color: var(--primary);
    font-weight: 500;
    text-decoration: none;
  }

  .socials a:hover {
    text-decoration: underline;
  }
</style>
