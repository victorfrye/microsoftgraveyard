var builder = DistributedApplication.CreateBuilder(args);

builder.AddNpmApp(name: "client", workingDirectory: "../WebClient", scriptName: "dev")
    .WithHttpEndpoint(env: "VITE_PORT")
    .WithExternalHttpEndpoints();

builder.AddProject<Projects.CommandLine>(name: "cli", launchProfileName: null);

await builder.Build().RunAsync();
