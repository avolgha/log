import logger from "./dist/log.esm.mjs";

logger.info("test info message.");
logger.debug("test debug message.");
logger.warn("test warn message.");
logger.fatal("test fatal message.");

const error = new Error("test error");
logger.error(error);
