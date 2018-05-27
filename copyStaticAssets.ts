import * as shell from "shelljs";

shell.rm("-R","build/public");
shell.mkdir("build/public");
shell.cp("-R", "src/client/build/*", "build/public");
// shell.rm("-R", "build/controllers/graphql/types");
// shell.cp("-R", "src/server/controllers/graphql/types/", "build/controllers/graphql");
