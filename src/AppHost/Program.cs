var builder = DistributedApplication.CreateBuilder(args);

builder.AddNpmApp("client", "../WebClient", "dev")
    .WithHttpEndpoint(env: "PORT")
    .WithExternalHttpEndpoints();

await builder.Build().RunAsync();
