using Microsoft.Extensions.DependencyInjection;

using Spectre.Console.Cli;

using VictorFrye.MicrosoftGraveyard.CommandLine.Commands;
using VictorFrye.MicrosoftGraveyard.CommandLine.Commands.Corpses;
using VictorFrye.MicrosoftGraveyard.CommandLine.Services;
using VictorFrye.MicrosoftGraveyard.CommandLine.Validation;

namespace VictorFrye.MicrosoftGraveyard.CommandLine;

/// <summary>
/// Configures the Spectre.Console command pipeline and routes command activation through the shared DI container.
/// </summary>
public static class Program
{
    /// <summary>
    /// Builds the command tree and executes the selected command.
    /// </summary>
    /// <param name="args">Command-line arguments supplied by the user.</param>
    /// <returns>The process exit code returned by Spectre.Console.Cli.</returns>
    public static int Main(string[] args)
    {
        using TypeRegistrar registrar = BuildRegistrar();
        CommandApp app = new(registrar);

        app.Configure(configurator =>
        {
            // Keep the branch definition centralized so future commands can hang off a single, discoverable root.
            configurator.AddBranch(CorpsesCommand.Name, corpses =>
            {
                corpses.SetDescription(CorpsesCommand.Description);
                corpses.AddCommand<SortCommand>(SortCommand.CommandName).WithDescription(SortCommand.CommandDescription);
                corpses.AddCommand<AddCommand>(AddCommand.CommandName).WithDescription(AddCommand.CommandDescription);
                corpses.AddCommand<ShowCommand>(ShowCommand.CommandName).WithDescription(ShowCommand.CommandDescription);
                corpses.AddCommand<ListCommand>(ListCommand.CommandName).WithDescription(ListCommand.CommandDescription);
            });
        });

        return app.Run(args);
    }

    private static TypeRegistrar BuildRegistrar()
    {
        ServiceCollection services = new();

        // Commands resolve through DI, so register both the orchestration services and the commands that consume them.
        services.AddSingleton<CorpsesRepository>();
        services.AddSingleton<ObitWriter>();
        services.AddSingleton<CorpseSorter>();
        services.AddSingleton<CorpseValidator>();

        services.AddTransient<SortCommand>();
        services.AddTransient<AddCommand>();
        services.AddTransient<ShowCommand>();
        services.AddTransient<ListCommand>();

        return new TypeRegistrar(services);
    }

    private sealed class TypeRegistrar(IServiceCollection services) : ITypeRegistrar, IDisposable
    {
        private readonly IServiceCollection services = services;

        public ITypeResolver Build()
        {
            return new TypeResolver(services.BuildServiceProvider());
        }

        public void Register(Type service, Type implementation)
        {
            services.AddSingleton(service, implementation);
        }

        public void RegisterInstance(Type service, object implementation)
        {
            services.AddSingleton(service, implementation);
        }

        public void RegisterLazy(Type service, Func<object> factory)
        {
            services.AddSingleton(service, _ => factory());
        }

        public void Dispose()
        {
        }
    }

    private sealed class TypeResolver(ServiceProvider serviceProvider) : ITypeResolver, IDisposable
    {
        private readonly ServiceProvider serviceProvider = serviceProvider;

        public object? Resolve(Type? type)
        {
            return type is null ? null : serviceProvider.GetService(type);
        }

        public void Dispose()
        {
            serviceProvider.Dispose();
        }
    }
}
