import * as shell from "shelljs";

shell.cp("-R", "src/server/public", "build/server/public");
shell.cp("-R","src/server/controllers/graphql/types/","build/server/controllers/graphql");