var builder = DistributedApplication.CreateBuilder(args);

builder.AddJavaScriptApp("client", "../WebClient", "dev")
       .WithIconName("Globe")
       .WithNpm(install: true)
       .WithHttpEndpoint(env: "PORT")
       .WithUrlForEndpoint("http", static url => url.DisplayText = "🏠 Home")
       .WithExternalHttpEndpoints()
       .WithHttpHealthCheck("/");

await builder.Build().RunAsync();
