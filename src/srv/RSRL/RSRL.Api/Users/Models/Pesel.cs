using RSRL.Api.Db.Models;
using RSRL.Api.Exceptions;
using RSRL.Api.Utility;

namespace RSRL.Api.Users.Models
{
    public class Pesel : Entity<int>
    {
        private string value;

        public virtual string Value
        {
            get => value; 
            set
            {
                if (!PeselValidator.IsValid(value))
                {
                    throw new InvalidPeselException($"Pesel \"{value}\" is invalid");
                }
                this.value = value;
            }
        }

        public Pesel(string pesel)
        {
            Value = pesel;
        }

        protected Pesel()
        {
        }
    }

    public class PeselMap: EntityMap<Pesel, int>
    {
        public PeselMap()
        {
            Map(x => x.Value)
                .Not.Nullable()
                .Unique();
        }
    }
}
