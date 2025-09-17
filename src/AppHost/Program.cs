var builder = DistributedApplication.CreateBuilder(args);

builder.AddNpmApp("client", "../WebClient", "dev")
    .WithHttpEndpoint(env: "PORT")
    .WithUrlForEndpoint("http", static url => url.DisplayText = "🏠 Home")
    .WithExternalHttpEndpoints()
    .WithHttpHealthCheck("/");

await builder.Build().RunAsync();
