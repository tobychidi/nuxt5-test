export default defineNitroPlugin((nitroApp) => {
   nitroApp.hooks.hook("request", (event) => {
      consola.info(`New request: ${getRequestURL(event)}`);
   });
   nitroApp.hooks.hook("error", (error) => {
      consola.error(error);
      consola.info(error.cause);
   });
});
