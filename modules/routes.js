import db from "../Database/index.js";

function ModuleRoutes(app) {
    // Retrive all modules
    app.get("/api/courses/:cid/modules", (req, res) => {
        const { cid } = req.params;
        const modules = db.modules.filter((m) => m.course === cid);
        res.send(modules);
    });

    // creating a new module 
    app.post("/api/courses/:cid/modules", (req, res) => {
        const { cid } = req.params;
        const { name } = req.body;
        const module = {
            _id: {
                $oid: new Date().getTime().toString(),
            },
            name,
            course: cid,
            lessons: []
        };
        db.modules.push(module);
        res.send(module);
    });

    // Delete a module
    app.delete("/api/modules/:mid", (req, res) => {
        const { mid } = req.params;
        db.modules = db.modules.filter((m) => m._id.$oid !== mid);
        res.sendStatus(200);
    });

    // Update a module
    app.put("/api/modules/:mid", (req, res) => {
        const { mid } = req.params;
        const moduleIndex = db.modules.findIndex(
          (m) => m._id.$oid === mid);
        db.modules[moduleIndex] = {
          ...db.modules[moduleIndex],
          ...req.body
        };
        res.sendStatus(204);
      });
    


}

export default ModuleRoutes;