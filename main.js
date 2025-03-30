

document.addEventListener("DOMContentLoaded", async() => {
    const projectsButton = document.querySelector("#Projects");
    const dropdown = document.querySelector("#DropDown_Projects");

    hoveredProject = false;

    fetch('./projects.json')
        .then(response => response.text())
        .then(text => {
            console.log('Response text:', text);
            return JSON.parse(text);
        })
        .then(data => {
            const projects = data.Projects;

            for (const project of projects) {
                const projectLabel = document.createElement("div");
                projectLabel.id = "BaseDropDown_Projects"
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


});