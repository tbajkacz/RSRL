using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using RSRL.Api.AccessCards.Dto;
using RSRL.Api.AccessCards.Models;
using RSRL.Api.AccessCards.Params;
using RSRL.Api.AccessCards.Services;
using RSRL.Api.Auth.Constants;
using RSRL.Api.Db.Services;
using RSRL.Api.Utility;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSRL.Api.Controllers
{
    [ApiController]
    [DefaultRoute]
    [Authorize(Policy = Policies.AtLeastLockManager)]
    public class AccessCardsController : ControllerBase
    {
        private readonly IAccessCardRepository accessCardRepository;
        private readonly IMapper mapper;
        private readonly IUnitOfWork uow;

        public AccessCardsController(IAccessCardRepository accessCardRepository, IMapper mapper, IUnitOfWork uow)
        {
            this.accessCardRepository = accessCardRepository;
            this.mapper = mapper;
            this.uow = uow;
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
            await uow.CommitAsync();
        }

        [HttpPost]
        public async Task Update(AccessCardUpdateParams param)
        {
            var card = mapper.Map<AccessCardUpdateParams, AccessCard>(param);
            await accessCardRepository.UpdateAsync(card);
            await uow.CommitAsync();
        }

        [HttpPost]
        public async Task Remove(AccessCardRemoveParams param)
        {
            await accessCardRepository.DeleteAsync(param.Id);
            await uow.CommitAsync();
        }
    }
}
