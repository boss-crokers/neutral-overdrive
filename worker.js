export default {
  async fetch(request, env) {
    // Serves static assets from the "./out" directory mapped in wrangler.json
    return env.ASSETS.fetch(request);
  }
};
