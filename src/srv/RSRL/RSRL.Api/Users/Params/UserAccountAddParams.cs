﻿using System.Collections.Generic;

namespace RSRL.Api.Users.Params
{
    public class UserAccountAddParams
    {
        public string Name { get; set; }

        public string Surname { get; set; }

        public string Pesel { get; set; }

        public string Login { get; set; }

        public string Password { get; set; }

        public IList<string> Roles { get; set; }
    }
}
