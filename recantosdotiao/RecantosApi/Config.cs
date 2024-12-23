using System;

namespace RecantosApi;

public class Config
{
    public string? ChavePrivada { get; set; }

    public static Config Instancia => instancia ??= new Config{
        ChavePrivada = Environment.GetEnvironmentVariable("AUTH_PRIVATE_KEY")
    };
    

    private Config() {}

    private static Config? instancia = null;
}
