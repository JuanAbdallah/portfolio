using System;

namespace RecantosApi;

public class Aviso
{
    public long Id { get; set; }
    public string? Texto { get; set; }
    public DateOnly Data { get; set; }

}
