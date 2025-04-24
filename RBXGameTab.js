

document.addEventListener("DOMContentLoaded", async () => {
    const projectsButton = document.querySelector("#Projects");
    const dropdown = document.querySelector("#DropDown_Projects");
    const homeButton = document.querySelector("#TitleBar")
    const mainContent = document.querySelector("#MainContent")

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
                showcaseLabel.id = "showcaseLabel";
                const titleTag = document.createElement("h2");
                const aboutTag = document.createElement("p");
                const mainImage = document.createElement("img");
                const aboutLabel = document.createElement("h3");
                const breakElement = document.createElement("br");
                const breakElement2 = document.createElement("br");
                const imageSlide = document.createElement("div");
                const slider = document.createElement("div");

                titleTag.id = "titleTag"
                titleTag.innerHTML = showcase.name;
                titleTag.style.textAlign = "center";
                aboutTag.id = "aboutTag";
                aboutTag.innerHTML = showcase.About;
                mainImage.src = showcase.MainImage;
                mainImage.id = "ProjectImage";
                aboutLabel.id = "aboutLabel";
                aboutLabel.innerHTML = "About:"
                imageSlide.id = "imageSlide";
                slider.id = "sliderBox";

                showcaseLabel.appendChild(titleTag);
                showcaseLabel.appendChild(aboutLabel);
                showcaseLabel.appendChild(aboutTag);
                showcaseLabel.appendChild(mainImage);
                mainContent.appendChild(showcaseLabel);
                showcaseLabel.appendChild(breakElement);
                showcaseLabel.appendChild(imageSlide);
                showcaseLabel.appendChild(breakElement2);
                imageSlide.appendChild(slider);

                const mediaAmount = showcase.media.length;
                const range = 50 * mediaAmount;
                const per = (2 * range) / (mediaAmount-1); 

                for (let i = 0; i < mediaAmount; i++) {
                    const block = document.createElement("button");
                    block.id = "squares"; 

                    block.style.marginRight = -range + per * i + "px";

                    imageSlide.appendChild(block);
                }

            };
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