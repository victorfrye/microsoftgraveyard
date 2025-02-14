var builder = DistributedApplication.CreateBuilder(args);

builder.AddNpmApp("client", "../WebClient", "dev")
    .WithHttpEndpoint(env: "VITE_PORT")
    .WithExternalHttpEndpoints();

await builder.Build().RunAsync();
