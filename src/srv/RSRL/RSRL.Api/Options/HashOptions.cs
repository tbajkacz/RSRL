namespace RSRL.Api.Options
{
    public class HashOptions
    {
        public int? SaltSize { get; set; }

        public int? Iterations { get; set; }

        public int? KeySize { get; set; }

        public string HashAlgorithmName { get; set; }
    }
}
