var builder = DistributedApplication.CreateBuilder(args);

builder.AddJavaScriptApp("client", "../WebClient", "dev")
       .WithIconName("Globe")
       .WithNpm(install: true)
       .WithHttpEndpoint(env: "PORT")
       .WithUrlForEndpoint("http", static url => url.DisplayText = "🏠 Home")
       .WithExternalHttpEndpoints()
       .WithHttpHealthCheck("/");

// The CLI tool is a developer utility — it starts on-demand only.
// Launch it from the Aspire dashboard by clicking Start on the 'graveyard' resource.
builder.AddProject<Projects.VictorFrye_MicrosoftGraveyard_CommandLine>("graveyard")
       .WithExplicitStart();

await builder.Build().RunAsync();
