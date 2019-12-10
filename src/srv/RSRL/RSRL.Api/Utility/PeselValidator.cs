using RSRL.Api.Exceptions;
using System.Linq;

namespace RSRL.Api.Utility
{
    public class PeselValidator
    {
        private static readonly int[] multipliers = { 1, 3, 7, 9, 1, 3, 7, 9, 1, 3 };

        public static bool IsValid(string pesel)
        {
            if (pesel.Length != 11 || !pesel.All(char.IsDigit))
            {
                return false;
            }

            var digits = pesel.ToCharArray()
                .Select(c => int.Parse(c.ToString()))
                .ToArray();

            var sum = 0;
            for (int i = 0; i < digits.Length - 1; i++)
            {
                sum += digits[i] * multipliers[i];
            }
            var mod = sum % 10;

            return mod == 0 ? digits[10] == mod : (10 - mod) == digits[10];
        }
    }
}
