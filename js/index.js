let projects = document.getElementById("projects");
let currentRow = createRow();

$.getJSON("data/projects.json", function(projectData) {
    for(let i = 0; i < projectData.length; i++) {
        let projectName = projectData[i].name;
        let projectDescription = projectData[i].description;
        let projectTheme = projectData[i].theme;

        if(currentRow.childElementCount >= 2) {
            currentRow = createRow();
        }

        let project = document.createElement("div");
        project.className = "project";
        let thumbnail = document.createElement("div");
        thumbnail.className = "project-thumbnail";
        thumbnail.style.backgroundColor = projectTheme;
        let icon = document.createElement("img");
        icon.src = `icons/${projectName}/favicon.svg`;
        thumbnail.appendChild(icon);
        let info = document.createElement("div");
        info.className = "project-info";
        let headline = document.createElement("a");
        headline.href = `jmaen.github.io/${projectName}`;
        headline.innerHTML = `/${projectName}`;
        let description = document.createElement("p");
        description.innerHTML = projectDescription;
        info.appendChild(headline);
        info.appendChild(description);
        project.appendChild(thumbnail);
        project.appendChild(info);
        currentRow.appendChild(project);
    }
});

function createRow() {
    let row = document.createElement("div");
    row.className = "project-row";
    projects.appendChild(row);
    return row;
}
