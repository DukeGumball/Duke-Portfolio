

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
                const videoBox = document.createElement("div");
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
                videoBox.id = "videoBox";
                imageSlide.id = "imageSlide";
                slider.id = "sliderBox";

                showcaseLabel.appendChild(titleTag);
                showcaseLabel.appendChild(aboutLabel);
                showcaseLabel.appendChild(aboutTag);
                showcaseLabel.appendChild(mainImage);
                mainContent.appendChild(showcaseLabel);
                showcaseLabel.appendChild(breakElement);
                showcaseLabel.appendChild(videoBox);
                showcaseLabel.appendChild(imageSlide);
                showcaseLabel.appendChild(breakElement2);
                imageSlide.appendChild(slider);

                for (const media of showcase.media) {
                    if (video.includes("youtube.com")) {
                        const videoId = video.split("v=")[1].split("&")[0];
                        const iframe = document.createElement("iframe");
                        iframe.src = `https://www.youtube.com/embed/${videoId}`;
                        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
                        iframe.allowFullscreen = true;
                        iframe.id = "videoShowcase";
                        videoBox.appendChild(iframe);
                    } else if (video.endsWith(".mp4")) {
                        const videoLabel = document.createElement("video");
                        videoLabel.src = video;
                        videoLabel.controls = true;
                        videoLabel.id = "videoShowcase";
                        videoBox.appendChild(videoLabel);
                    } else if (video.endsWith(".jpg") || video.endsWith(".png") || video.endsWith(".jpeg")) {
                        const imageLabel = document.createElement("img");
                        imageLabel.src = video;
                        imageLabel.id = "imageShowcase";
                        slider.appendChild(imageLabel);
                    } else if (video.endsWith(".gif")) {
                        const gifLabel = document.createElement("img");
                        gifLabel.src = video;
                        gifLabel.id = "gifShowcase";
                        slider.appendChild(gifLabel);
                    } else {
                        console.error("Unsupported media type:", media);

                    }
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