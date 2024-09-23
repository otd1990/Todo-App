# Task Description
We want you to build a simple To-Do List Application using Vue 3 and Vite. 

You can add tasks, mark them as done, and delete them. 

The tasks should be stored in the browser's local storage or indexedDB to persist even after the page is reloaded.

>[!CAUTION]
> All installed packages need to be mentioned unless they were pre-installed

### Requirements
1. **Vue.js Framework**: Use Vue.js to build the front-end of the application.[info](#vuejs-framework)

2. **Component-Based Architecture**: Organize the application into reusable components for better maintainability. 

3. **State Management**: Implement state management using Pinia to store and manage the list of tasks. [info](#state-management)

4. **CRUD Operations**: Allow users to create, read, update, and delete tasks. [info](#crud)
   
5. **Persistence**: Store the task data locally using localStorage or a similar mechanism. [info](#persistence)

6. **UI**: Design a clean and user-friendly interface with the following features:

    6.1 Input field for adding new tasks.

    6.2 List of tasks with checkboxes for marking completion.

    6.3 Buttons for editing and deleting tasks.

    6.4 Clear completed tasks functionality.

### Additional Considerations:
- Testing
- Accessibility
- Performance Optimization

### Evaluation Criteria:
- **Correctness**: The Application should function as described and meet all the requirements
- **Code Quality**: The code should be well-structure, readable and maintainable
- **Testing**: The application should have adequate unit tests
- **Efficiency**: The application should perform well, even with large number of tasks
- **Accessibility**: The application should be accessible to users with disabilities
- **Creativity**: The application should demonstrate creativity and innovation

# Additional Information

### Vue.js Framework
It's required to use vue version 3 since the versions before are going EOL.
Part of the job will require migrating vue 2 to vue 3. 
Although specific vue 3 is required you can use Nuxt version 3 to create the task.
This project is just a way to speed up the setup.

### State management
Use vuex or pinia, both are good options

### CRUD

Implement a service like CRUD operations. To fetch fake data you can use [JSON place holder](https://jsonplaceholder.typicode.com/guide/) `/users/1/todos` to retrieve fake data to display.

### Persistence

Implement one of the two local stores to persist the data.

- [indexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

to speed up your progress you are allowed to use external packages, just refer in README what packages did you used.
