const { program } = require("commander");
const crud = require("./crud");

program.version("1.0.0").description("A simple app");

program
  .command("create <data>")
  .description("Create a new record")
  .action(async (data) => {
    try {
      const response = await crud.create(data);
      console.log("Record created:", response);
      process.exit();
    } catch (error) {
      console.error("Error creating record:", error.message);
      process.exit();
    }
  });

program
  .command("read")
  .option("-i, --id <id>", "Read a single record by id")
  .description("Read records")
  .action(async (options) => {
    try {
      let response;
      options.id
        ? (response = await crud.read(options.id))
        : (response = await crud.readAll());
      console.log("Record:", response);
      process.exit();
    } catch (error) {
      console.error("Error reading record:", error.message);
      process.exit();
    }
  });

program
  .command("readall")
  .description("Read all records")
  .action(async () => {
    try {
      const response = await crud.readAll();
      console.log("Records:", response);
      process.exit();
    } catch (error) {
      console.error("Error reading records:", error.message);
      process.exit();
    }
  });

program
  .command("update <id> <data>")
  .description("Update a record by ID")
  .action(async (id, data) => {
    try {
      const response = await crud.update(id, data);
      console.log("Record updated:", response);
      process.exit();
    } catch (error) {
      console.error("Error updating record:", error.message);
      process.exit();
    }
  });

program
  .command("delete <id>")
  .description("Delete a record by ID")
  .action(async (id) => {
    try {
      const response = await crud.remove(id);
      console.log("Record deleted:", response);
      process.exit();
    } catch (error) {
      console.error("Error deleting record:", error.message);
      process.exit();
    }
  });

program.parse(process.argv);
