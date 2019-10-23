using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RSRL.Api.AccessCards.Dto;
using RSRL.Api.AccessCards.Models;
using RSRL.Api.AccessCards.Params;
using RSRL.Api.AccessCards.Services;
using RSRL.Api.Auth.Constants;
using RSRL.Api.Utility;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSRL.Api.Controllers
{
    [ApiController]
    [DefaultRoute]
    [Authorize(Policy = Policies.Admin)]
    public class AccessCardController : ControllerBase
    {
        private readonly IAccessCardRepository accessCardRepository;
        private readonly IMapper mapper;

        public AccessCardController(IAccessCardRepository accessCardRepository, IMapper mapper)
        {
            this.accessCardRepository = accessCardRepository;
            this.mapper = mapper;
        }

        [HttpGet]
        public IEnumerable<AccessCardDto> GetAccessCards()
        {
            return accessCardRepository.Get()
                .Select(c => mapper.Map<AccessCard, AccessCardDto>(c));
        }

        [HttpPost]
        public async Task Add(AccessCardAddParams param)
        {
            var card = mapper.Map<AccessCardAddParams, AccessCard>(param);
            await accessCardRepository.AddAsync(card);
        }
    }
}
