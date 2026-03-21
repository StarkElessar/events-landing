namespace CMS.Models;

public class FileUploadModel
{
    public required string FieldName { get; init; }

    public required string Label { get; init; }

    public string? CurrentUrl { get; init; }
}
