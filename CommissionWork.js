function loadVideo(url, slider) {

    if (url.includes("youtube.com")) {
        const videoId = url.split("v=")[1].split("&")[0];
        const iframe = document.createElement("iframe");
        iframe.src = `https://www.youtube.com/embed/${videoId}?cc_load_policy=1&fs=1&modestbranding=1&rel=0`; // Enable captions, fullscreen, and disable related videos
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"; // Explicitly allow fullscreen
        iframe.setAttribute("allowfullscreen", "true"); // Ensure fullscreen is enabled
        iframe.id = "urlShowcase";
        slider.appendChild(iframe);

        return iframe;
    }
    else if (url.endsWith(".mp4")) {
        const videoLabel = document.createElement("video");
        videoLabel.src = url;
        videoLabel.controls = true;
        videoLabel.id = "urlShowcase";
        slider.appendChild(videoLabel);

        return videoLabel;
    }
    else if (url.endsWith(".png") || url.endsWith(".jpg") || url.endsWith(".jpeg")) {
        const imageLabel = document.createElement("img");
        imageLabel.src = url;
        imageLabel.id = "urlShowcase";
        slider.appendChild(imageLabel);

        return imageLabel;
    }
}

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
            const showcases = data.CommissionWork;

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
                const aboutLabel = document.createElement("h2");
                const breakElement = document.createElement("br");
                const breakElement2 = document.createElement("br");
                const imageSlide = document.createElement("div");
                const fitImage = document.createElement("div");
                const components = document.createElement("h2");
                const linkButton = document.createElement("button");

                titleTag.id = "titleTag"
                titleTag.innerHTML = showcase.name;
                titleTag.style.textAlign = "center";
                aboutTag.id = "DescText";
                aboutTag.innerHTML = showcase.About;
                mainImage.src = showcase.MainImage;
                mainImage.id = "ProjectImage";
                aboutLabel.id = "titleText";
                aboutLabel.innerHTML = "About:"
                imageSlide.id = "imageSlide";
                fitImage.id = "fitFrame";
                components.innerHTML = "Components:";
                components.id = "titleText"

                linkButton.textContent = "Game Link";
                linkButton.id = "linkButton";
                linkButton.onclick = () => {
                    window.location.href = showcase.showcaselink;
                };

                showcaseLabel.appendChild(titleTag);    

                if (showcase.showcaselink != "") {

                    showcaseLabel.appendChild(linkButton);

                }

                showcaseLabel.appendChild(aboutLabel);
                showcaseLabel.appendChild(aboutTag);
                showcaseLabel.appendChild(mainImage);
                mainContent.appendChild(showcaseLabel);
                showcaseLabel.appendChild(imageSlide);
                imageSlide.appendChild(fitImage);

                const mediaAmount = showcase.media.length;
                const range = 25 * mediaAmount;
                const per = (2 * range) / (mediaAmount - 1);
                const componentAmount = showcase.ComponentsList.length;

                loadVideo(showcase.media[0], fitImage);

                for (let i = 0; i < mediaAmount; i++) {
                    const block = document.createElement("button");
                    block.id = "squares";

                    block.style.marginRight = -range + per * i + "px";

                    imageSlide.appendChild(block);

                    block.addEventListener("click", () => {
                        const url = showcase.media[i];
                        const urlShowcase = showcaseLabel.querySelector("#urlShowcase");

                        const width = urlShowcase.offsetWidth;

                        const newVideo = loadVideo(url, fitImage);

                        urlShowcase.style.transform = `translateX(${-width}px)`;

                        newVideo.style.opacity = 0;
                        newVideo.style.transition = "none";
                        newVideo.style.transform = `translateX(${width}px)`;
                        setTimeout(() => {
                            urlShowcase.remove();
                            newVideo.style.transition = "transform 0.5s ease, opacity 0.5s ease";
                            newVideo.style.transform = "translateX(0px)";
                            newVideo.style.opacity = 1;
                        }, 600);


                    });


                }

                showcaseLabel.appendChild(components);

                for (let x = 0; x < componentAmount; x++) {

                    const currentBullet = showcase.ComponentsList[x]
                    const bulletLabel = document.createElement("li");
                    bulletLabel.id = "bulletLabel";
                    bulletLabel.innerHTML = currentBullet;

                    showcaseLabel.appendChild(bulletLabel);


                }

                showcaseLabel.appendChild(breakElement);


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