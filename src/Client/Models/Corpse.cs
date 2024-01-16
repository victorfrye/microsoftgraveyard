namespace VictorFrye.MicrosoftGraveyard.Client.Models;

public class Corpse
{
    public string Slug { get; set; }
    public string Name { get; set; }
    public string? Subtitle { get; set; }
    public DateOnly? BirthDate { get; set; }

    public DateOnly DeathDate { get; set; }
    public string Description { get; set; }
    public string Link { get; set; }

    public Corpse() { }

    public Corpse(string slug, string name, string? subtitle, DateOnly? birthDate, DateOnly deathDate, string description, string? link)
    {
        Slug = slug;
        Name = name;
        Subtitle = subtitle;
        BirthDate = birthDate;
        DeathDate = deathDate;
        Description = description;
        Link = link;
    }

    public bool IsDead()
    {
        return DeathDate <= DateOnly.FromDateTime(DateTime.Now);
    }
}