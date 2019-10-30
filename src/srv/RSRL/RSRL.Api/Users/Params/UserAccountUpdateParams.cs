﻿using System.Collections.Generic;

namespace RSRL.Api.Users.Params
{
    public class UserAccountUpdateParams
    {
        public int Id { get; set; }

        public string Login { get; set; }

        public IList<string> Roles { get; set; } = new List<string>();
    }
}
