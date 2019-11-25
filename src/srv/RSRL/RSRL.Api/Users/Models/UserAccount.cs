using RSRL.Api.Db.Models;
using RSRL.Api.Exceptions;
using RSRL.Api.Utility;
using System.Collections.Generic;

namespace RSRL.Api.Users.Models
{
    public class UserAccount : Entity<int>
    {
        protected string pesel;

        public virtual string Name { get; set; }

        public virtual string Surname { get; set; }

        public virtual string Pesel
        {
            get => pesel;
            set
            {
                if (!PeselValidator.IsValid(value))
                {
                    throw new InvalidPeselException($"Pesel \"{value}\" is invalid");
                }
                pesel = value;
            }
        }

        public virtual string Login { get; set; }

        public virtual string PasswordHash { get; set; }

        public virtual IList<string> Roles { get; set; } = new List<string>();
    }

    public class UserAccountMap : EntityMap<UserAccount, int>
    {
        public UserAccountMap()
        {
            Map(x => x.Name)
                .Not.Nullable();
            Map(x => x.Surname)
                .Not.Nullable();
            Map(x => x.Pesel)
                .Not.Nullable();
            Map(x => x.Login)
                .Not.Nullable()
                .Unique();
            Map(x => x.PasswordHash)
                .Not.Nullable();
            HasMany(x => x.Roles)
                .Table("Roles")
                .Element("Role");
        }
    }
}
