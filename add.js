document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const taskNotes = document.getElementById("taskNotes");
    const taskTime = document.getElementById("taskTime");
    const taskCategory = document.getElementById("taskCategory");
    const addTaskButton = document.getElementById("addTaskButton");
    const taskList = document.getElementById("taskList");
    const completedTasksList = document.getElementById("completedTasksList");

    // Get category from URL
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category");

    // Display the selected category in the title
    document.getElementById("categoryTitle").textContent = `Category: ${category || "All"}`;

    // Set the category dropdown to the selected category
    taskCategory.value = category;

    // Set current time in taskTime
    const now = new Date();
    taskTime.value = now.toISOString().slice(0, 16); // Current time

    // Function to handle task completion
    function markTaskAsCompleted(taskRow) {
        taskRow.querySelector(".completedButton").disabled = true;
        taskRow.querySelector(".taskStatus").textContent = "Task Completed!";
        taskRow.querySelector(".completedButton").style.display = "none";

        // Move the task to the completed list
        completedTasksList.appendChild(taskRow);
    }

    // Add task
    addTaskButton.addEventListener("click", () => {
        const taskValue = taskInput.value.trim();
        const taskNotesValue = taskNotes.value.trim();
        const taskTimeValue = taskTime.value;

        if (taskValue) {
            const row = document.createElement("tr");
            row.classList.add("taskRow");

            row.innerHTML = `
                <td>${taskValue}</td>
                <td>${new Date(taskTimeValue).toLocaleString()}</td>
                <td>${taskNotesValue || "No note"}</td>
                <td class="taskStatus">Pending</td>
                <td><button class="completedButton">Complete Task</button></td>
            `;

            // Add functionality for marking the task as completed
            const completeButton = row.querySelector(".completedButton");
            completeButton.addEventListener("click", () => {
                markTaskAsCompleted(row);
            });

            taskList.appendChild(row);

            // Clear inputs after adding the task
            taskInput.value = "";
            taskNotes.value = "";
            taskTime.value = now.toISOString().slice(0, 16); // Reset to current time
        } else {
            alert("Please provide a task title.");
        }
    });
});
