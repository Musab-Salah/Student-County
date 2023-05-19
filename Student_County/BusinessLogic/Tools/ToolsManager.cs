﻿using Microsoft.EntityFrameworkCore;
using Student_County.BusinessLogic.Tools;
using Student_County.DAL;

namespace Student_County.BusinessLogic.Tools
{
    public class ToolsManager : IToolsManager
    {
        protected readonly StudentCountyContext _context;
        public ToolsManager(StudentCountyContext context)
        {
            _context = context;
        }
        public async Task<List<ToolsEntity>> GetAll() => await _context.Toolss.Where(entity => !entity.IsDeleted).ToListAsync();
        public async Task<List<ToolsEntity>> GetMyAllTools(string userid) => await _context.Toolss.Where(entity => !entity.IsDeleted && entity.StudentId == userid).ToListAsync();

        public async Task Delete(int id)
        {
            var entity = await _context.Toolss.FirstOrDefaultAsync(entity => entity.Id == id);
            if (entity == null)
                throw new Exception("Tools Not Found");
            else if (!entity.IsDeleted)
            {
                entity.IsDeleted = true;
                _context.Update(entity);
                await _context.SaveChangesAsync();
            }
        }
        public async Task<ToolsEntity> GetTools(int id)
        {
            var entity = await _context.Toolss.FirstOrDefaultAsync(x => x.Id == id);
            if (entity == null || id == 0)
                throw new Exception("Tools Not Found");
            else if (entity.IsDeleted)
                throw new Exception("Tools Is Deleted");
            return entity;
        }
        public async Task<ToolsEntity> CreateUpdate(ToolsBo bo, string userName, int id = 0)
        {
            var entity = bo.MapBoToEntity();
            if (id == 0)
            {
                entity.CreatedBy = userName;
                _context.Add(entity);
            }
            else if (id != 0)
            {
                entity.ModifiedBy = userName;
                entity.ModifiedOn = DateTime.UtcNow;
                _context.Update(entity);
            }
            await _context.SaveChangesAsync();
            return entity;
        }
    }
}
