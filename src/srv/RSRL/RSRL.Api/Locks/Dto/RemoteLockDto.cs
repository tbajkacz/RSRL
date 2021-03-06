﻿using RSRL.Api.AccessCards.Dto;
using System.Collections.Generic;

namespace RSRL.Api.Locks.Dto
{
    public class RemoteLockDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Url { get; set; }

        public string SecretKey { get; set; }

        public IList<AccessCardDto> AllowedAccessCards { get; set; }
    }
}
