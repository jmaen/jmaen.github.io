<script>
    export let name
    export let description
    export let theme
    export let link

    function test() {
        if(link) {
            window.open(link, "_blank")
        } else {
            window.open(name, "_self")
        }
    }
</script>

<button class="project" on:click={test}>
    <div class="project-thumbnail" style="background-color: {theme};">
        <img src="/icons/{name}.svg" alt="">
    </div>
    <div class="project-info">
        <p class="project-title">/{name}</p>
        <p class="project-description">{description}</p>
    </div>
</button>

<style>
    .project {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 22rem;
        height: 6rem;
        padding: 0.5rem;
        border: 1px solid var(--border);
        border-radius: 5px;
        background-color: transparent;
        text-align: left;
        cursor: pointer;
    }

    .project:hover {
        box-shadow: 0 0 5px var(--border);
    }

    .project-thumbnail {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 4rem;
        width: 4rem;
        border-radius: 5px;
    }

    .project-thumbnail img {
        width: 2rem;
        height: 2rem;
        filter: brightness(0) invert(1);
        transition: transform 0.3s ease-in-out;
    }

    .project:hover .project-thumbnail img {
        transform: scale(1.25);
    }

    .project-info {
        margin-left: 1rem;
    }

    .project-title {
        color: var(--primary);
        font-weight: 600;
        text-decoration: none;
    }

    .project:hover .project-title {
        text-decoration: underline;
    }

    .project-description {
        width: 16rem;
        color: var(--secondary);
        font-size: 0.9rem;
    }
</style>