

document.addEventListener("DOMContentLoaded", async () => {
    const projectsButton = document.querySelector("#Projects");
    const dropdown = document.querySelector("#DropDown_Projects");
    const homeButton = document.querySelector("#TitleBar")

    hoveredProject = false;

    fetch('./projects.json')
        .then(response => response.text())
        .then(text => {
            console.log('Response text:', text);
            return JSON.parse(text);
        })
        .then(data => {
            const projects = data.ProjectsTab;
            const showcases = data.Showcases;

            for (const project of projects) {
                const projectLabel = document.createElement("button");
                projectLabel.id = "BaseDropDown_Projects"
                projectLabel.innerHTML = project.name;
                dropdown.appendChild(projectLabel);

                projectLabel.addEventListener("click", () => {

                    window.location.href = project.url;

                });

            }

            for (const showcase of showcases) {
                
                const showcaseLabel = document.createElement("div");
                showcaseLabel.id = "ProjectContent";
                
                const titleTag = document.createElement("h2");
                titleTag.id = "titleTag"
                titleTag.innerHTML = showcase.name;
                showcaseLabel.appendChild(titleTag);
                mainContent.appendChild(showcaseLabel);

            }

            })
        .catch(error => {
            console.error('Error fetching projects:', error);
        });

    projectsButton.addEventListener("mouseover", () => {

        hoveredProject = true;
        dropdown.style.display = "block";

    });

    dropdown.addEventListener("mouseover", () => {

        hoveredProject = true;
        dropdown.style.display = "block";

    });

    dropdown.addEventListener("mouseout", () => {

        hoveredProject = false;
        dropdown.style.display = "none";

    });

    document.addEventListener("mouseleave", () => {

        hoveredProject = false;
        dropdown.style.display = "none";

    });

    homeButton.addEventListener("click", () => {

        window.location.href = "https://dukegumball.github.io/Duke-Portfolio";

    });


});