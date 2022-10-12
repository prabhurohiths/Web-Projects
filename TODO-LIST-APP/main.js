(function () {
    'use strict';
    let date = new Date(),
        dayString = date.toLocaleDateString("default", {
            weekday: "long"
        });

    let day = date.getDate(),
        month = date.toLocaleDateString("default", {
            month: "long"
        });

    document.querySelector("h1.day").textContent = dayString;
    document.querySelector("h2.month").textContent = day + " " + month;

    let userInput = document.querySelector("input.add-item"),
        taskList = document.querySelector("ul.items-list"),
        card = document.querySelector("div.card"),
        info = document.querySelector("p.empty-info"),
        idleBackground = document.querySelector("img.idle");

    function addNewTask() {
        // Check if the first and only task being entered is an empty string
        if (userInput.value.trim() == "" && taskList.hasChildNodes() == false) {
            idleBackground.src = "images/angry.png";
            info.textContent = "Enter a proper task 😕";

            // Otherwise, create a new task if a proper string is provided
        } else if (userInput.value.trim() != "") {
            idleBackground.src = "images/relaxed.jpg";
            info.textContent = "No items in list, add some new";

            // Default card view is not needed because a list will appear now, so hide this
            document.querySelector("div.empty-list").style.display = "none"

            let newElement = document.createElement("li");
            taskList.appendChild(newElement);
            newElement.classList.add("list-items");

            let iconUnchecked = document.createElement("i"),
                iconChecked = document.createElement("i"),
                paragraph = document.createElement("p"),
                deleteIcon = document.createElement("i");

            newElement.appendChild(iconUnchecked);
            newElement.appendChild(iconChecked);
            newElement.appendChild(paragraph);
            newElement.appendChild(deleteIcon);

            iconUnchecked.classList.add("material-icons", "task-status");
            iconUnchecked.textContent = "panorama_fish_eye";
            iconChecked.classList.add("material-icons", "task-status", "checked");
            iconChecked.textContent = "check_circle";

            paragraph.textContent = userInput.value;

            deleteIcon.classList.add("material-icons", "delete");
            deleteIcon.textContent = "delete";

            // Once the task is created, the input should become empty again
            userInput.value = "";

            // Now when the task gets completed, we can make it visually recognisable with relevant styles
            newElement.addEventListener("click", () => {

                paragraph.classList.toggle("task-complete");

                if (paragraph.classList.contains("task-complete")) {
                    iconChecked.style.transform = "scale(.9)";
                } else {
                    iconChecked.style.transform = "scale(0)";
                }
            });

            // Event to be triggered for delete button
            deleteIcon.addEventListener("click", () => {
                newElement.remove();

                // And if there are no tasks in list, we're back to the default card view
                if (taskList.hasChildNodes() == false) {
                    document.querySelector("div.empty-list").style.display = "block";
                }
            });
        }
    }

    document.querySelector("i.add-item-icon").addEventListener("click", () => {
        addNewTask();
    });

    userInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            addNewTask();
        }
    });
}());