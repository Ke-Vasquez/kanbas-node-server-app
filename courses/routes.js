import Database from "../Database/index.js";


function CourseRoutes(app) {
    // Add a course to the list
    app.post("/api/courses", (req, res) => {
        const course = { ...req.body,
          _id: {
            $oid: new Date().getTime().toString(),
          },
        };
        Database.courses.push(course);
        res.send(course);
      });    

    // Get the courses from the list 
    app.get("/api/courses", (req, res) => {
        const courses = Database.courses;
        res.send(courses);
    });

    // Delete a course from the list
  app.delete("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    Database.courses = Database.courses
      .filter((c) => c._id.$oid !== id);
    res.sendStatus(204);
  });

  // Update the course in the list
  app.put("/api/courses/:id", (req, res) => {
    const { id } = req.params;
    const course = req.body;
    Database.courses = Database.courses
      .map((c) => c._id.$oid === id ? { ...c, ... course } : c);
    return res.sendStatus(204);
  });

  // Retrieve the course by ID
  app.get("/api/courses/:number", (req, res) => {
    const { number } = req.params;
    const course = Database.courses
      .find((c) => c.number === number);
    if (!course) {
      res.status(404).send("Course not found");
      return;
    }
    res.send(course);
  });

       
}

export default CourseRoutes;