var builder = DistributedApplication.CreateBuilder(args);

builder.AddNpmApp("client", "../WebClient", "dev")
    .WithHttpEndpoint(port: 5173, env: "VITE_PORT")
    .WithExternalHttpEndpoints();

await builder.Build().RunAsync();
