import * as shell from "shelljs";

shell.cp("-R", "src/server/public", "build/");
shell.rm("-R", "build/controllers/graphql/types");
shell.cp("-R", "src/server/controllers/graphql/types/", "build/controllers/graphql");
