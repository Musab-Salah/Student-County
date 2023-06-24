using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Student_County.BusinessLogic.Auth.Models;
using Student_County.BusinessLogic.Tools;
using Student_County.DAL;

namespace Student_County.BusinessLogic.Tools
{
    public class ToolsManager : IToolsManager
    {
        protected readonly StudentCountyContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public ToolsManager(StudentCountyContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;

        }
        
        public async Task<List<ToolsEntity>> GetAll() => await _context.Toolss
            .Where(entity => !entity.IsDeleted).ToListAsync();
        public async Task<List<ToolsEntity>> GetMyAllTools(string userid) => await _context.Toolss
            .Where(entity => !entity.IsDeleted && entity.StudentId == userid).ToListAsync();

        public async Task<List<ToolsEntity>> GetMyAllToolsWithDeleted(string userid) => await _context.Toolss
        .Where(entity => entity.StudentId == userid)
        .OrderByDescending(entity => entity.ModifiedOn > entity.CreatedOn ? entity.ModifiedOn : entity.CreatedOn)
        .Take(5)
        .ToListAsync();

        public async Task Delete(int id)
        {
            var entity = await _context.Toolss.FirstOrDefaultAsync(entity => entity.Id == id);
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == entity.StudentId);

            if (entity == null)
                throw new Exception("Tools Not Found");
            else if (!entity.IsDeleted)
            {
                entity.ModifiedBy = user.UserName;
                entity.ModifiedOn = DateTimeOffset.Now;
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
        public async Task<ToolsEntity> CreateUpdate(ToolsBo bo, int id = 0)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.Id == bo.StudentId);
            var entity = bo.MapBoToEntity();
            entity.StudentName = user.FirstName + " " + user.LastName;

            if (id == 0)
            {
                entity.CreatedBy = user.UserName;
                _context.Add(entity);
            }
            else if (id != 0)
            {
                entity.ModifiedBy = user.UserName;
                entity.ModifiedOn = DateTimeOffset.Now;
                _context.Update(entity);
            }
            await _context.SaveChangesAsync();
            return entity;
        }
    }
}
