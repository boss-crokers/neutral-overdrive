export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);
    
    // Check if the request is for a file in the downloads folder
    const url = new URL(request.url);
    if (url.pathname.startsWith("/downloads/") && url.pathname.endsWith(".md")) {
      // Clone the response to modify headers (fetch responses are read-only)
      const newResponse = new Response(response.body, response);
      const filename = url.pathname.split("/").pop();
      newResponse.headers.set("Content-Disposition", `attachment; filename="${filename}"`);
      return newResponse;
    }
    
    return response;
  }
};
