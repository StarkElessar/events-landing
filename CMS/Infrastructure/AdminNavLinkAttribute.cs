namespace CMS.Infrastructure;

[AttributeUsage(AttributeTargets.Method)]
public sealed class AdminNavLinkAttribute(string label, int order = 0) : Attribute
{
    public string Label { get; } = label;

    public int Order { get; } = order;
}
