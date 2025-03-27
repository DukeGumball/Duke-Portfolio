document.addEventListener("DOMContentLoaded", async() => {
    const projectsButton = document.querySelector("#Projects");
    const dropdown = document.querySelector("#DropDown");

    const hoveredProject = false;

    projectsButton.addEventListener("mouseover", () => {

        hoveredProject = true;
        dropdown.style.display = "block";

    });

    dropdown.addEventListener("mouseover", () => {

        hoveredProject = true;
        dropdown.style.display = "block";

    });

    projectsButton.addEventListener("mouseout", () => {

        hoveredProject = false;
        dropdown.style.display = "none";

    });


});