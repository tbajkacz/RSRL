﻿using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using RSRL.Api.Locks.Dto;
using RSRL.Api.Locks.Models;
using RSRL.Api.Locks.Params;
using RSRL.Api.Locks.Services;
using RSRL.Api.Utility;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RSRL.Api.Controllers
{
    [ApiController]
    [DefaultRoute]
    public class LocksController : ControllerBase
    {
        private readonly ILockHttpService lockHttpService;
        private readonly IRemoteLockRepository lockRepository;
        private readonly IMapper mapper;

        public LocksController(ILockHttpService lockHttpService, IRemoteLockRepository lockRepository, IMapper mapper)
        {
            this.lockHttpService = lockHttpService;
            this.lockRepository = lockRepository;
            this.mapper = mapper;
        }

        [HttpGet]
        public IEnumerable<RemoteLockDto> GetLocks()
        {
            return lockRepository.Get()
                .Select(l => mapper.Map<RemoteLock, RemoteLockDto>(l));
        }

        [HttpPost]
        public async Task Add(RemoteLockAddParams param)
        {
            var remoteLock = mapper.Map<RemoteLockAddParams, RemoteLock>(param);
            await lockRepository.AddAsync(remoteLock);
        }

        [HttpPost]
        public async Task Unlock(UnlockParams param)
        {
            await lockHttpService.UnlockAsync(param.LockId);
        }

        [HttpPost]
        public async Task ToggleBlock(ToggleBlockParams param)
        {
            await lockHttpService.ToggleBlockAsync(param.LockId, param.TargetState);
        }
    }
}