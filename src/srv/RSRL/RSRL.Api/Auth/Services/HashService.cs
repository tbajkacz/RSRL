using Microsoft.Extensions.Options;
using RSRL.Api.Options;
using System;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace RSRL.Api.Auth.Services
{
    public class HashService : IHashService
    {
        private readonly HashOptions options;

        public HashService(IOptions<HashOptions> options)
        {
            this.options = options.Value;
        }

        public bool CompareHashes(string password, string hash)
        {
            var passwordInfo = hash.Split(".");
            if (passwordInfo.Length != 4)
            {
                return false;
            }
            var passwordSalt = Convert.FromBase64String(passwordInfo[2]);
            if (!int.TryParse(passwordInfo[0], out int iterations))
            {
                return false;
            }
            var algorithmName = Encoding.ASCII.GetString(Convert.FromBase64String(passwordInfo[1]));

            using var rfc = new Rfc2898DeriveBytes(password, passwordSalt, iterations, new HashAlgorithmName(algorithmName));

            var originalBytes = Convert.FromBase64String(passwordInfo[3]);
            var newBytes = rfc.GetBytes(Convert.FromBase64String(passwordInfo[3]).Length);
            return newBytes.SequenceEqual(originalBytes);

        }

        public string Hash(string password)
        {
            using var rfc = new Rfc2898DeriveBytes(password, options.SaltSize.Value, options.Iterations.Value, new HashAlgorithmName(options.HashAlgorithmName));

            var algorithmName = Convert.ToBase64String(Encoding.ASCII.GetBytes(options.HashAlgorithmName));
            var hash = Convert.ToBase64String(rfc.GetBytes(options.KeySize.Value));
            var salt = Convert.ToBase64String(rfc.Salt);

            return $"{options.Iterations}.{algorithmName}.{salt}.{hash}";

        }
    }
}