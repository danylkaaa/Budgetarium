import {IConfig} from "config";
require("dotenv").config();
process.env.NODE_CONFIG_DIR = __dirname;
import config from "config";
export default config;