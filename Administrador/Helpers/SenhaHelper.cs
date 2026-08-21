using Microsoft.AspNetCore.Identity;

namespace ControllHub.Administrador.Helpers;

public static class SenhaHelper
{
    private static readonly PasswordHasher<object> Hasher = new();

    public static string GerarHash(string senha)
    {
        return Hasher.HashPassword(null!, senha);
    }

    public static bool VerificarSenha(string senha, string hash)
    {
        var resultado = Hasher.VerifyHashedPassword(
            null!,
            hash,
            senha
        );

        return resultado == PasswordVerificationResult.Success ||
               resultado == PasswordVerificationResult.SuccessRehashNeeded;
    }
}